from __future__ import annotations

from pathlib import Path
from typing import Any

import psycopg
from psycopg.rows import dict_row
from psycopg.types.json import Json

from app.roles import Role
from app.store import (
    AnswerRecord,
    FollowUpRow,
    SessionRecord,
    TranscriptAttempt,
    utcnow,
)

SCHEMA_PATH = Path(__file__).resolve().parent.parent / "sql" / "001_init.sql"


class PostgresStore:
    def __init__(self, database_url: str) -> None:
        self._database_url = database_url
        self._conn: psycopg.AsyncConnection | None = None

    async def connect(self) -> None:
        if self._conn is None or self._conn.closed:
            self._conn = await psycopg.AsyncConnection.connect(
                self._database_url,
                autocommit=True,
                row_factory=dict_row,
            )

    async def close(self) -> None:
        if self._conn is not None and not self._conn.closed:
            await self._conn.close()
        self._conn = None

    async def _conn_ready(self) -> psycopg.AsyncConnection:
        await self.connect()
        assert self._conn is not None
        return self._conn

    async def apply_schema(self) -> None:
        sql = SCHEMA_PATH.read_text(encoding="utf-8")
        conn = await self._conn_ready()
        await conn.execute(sql)

    async def ensure_session(self, company_code: str, role: Role) -> SessionRecord:
        conn = await self._conn_ready()
        row = await conn.execute(
            """
            INSERT INTO sessions (company_code, role)
            VALUES (%s, %s)
            ON CONFLICT (company_code, role) DO UPDATE
              SET updated_at = sessions.updated_at
            RETURNING company_code, role, status, created_at, updated_at, completed_at, revoked_at
            """,
            (company_code, role),
        )
        data = await row.fetchone()
        assert data is not None
        return _session(data)

    async def get_session(self, company_code: str, role: Role) -> SessionRecord | None:
        conn = await self._conn_ready()
        result = await conn.execute(
            """
            SELECT company_code, role, status, created_at, updated_at, completed_at, revoked_at
            FROM sessions
            WHERE company_code = %s AND role = %s
            """,
            (company_code, role),
        )
        data = await result.fetchone()
        return _session(data) if data else None

    async def list_answers(self, company_code: str, role: Role) -> dict[str, AnswerRecord]:
        conn = await self._conn_ready()
        result = await conn.execute(
            """
            SELECT question_id, text, updated_at, follow_ups
            FROM answers
            WHERE company_code = %s AND role = %s
            """,
            (company_code, role),
        )
        rows = await result.fetchall()
        out: dict[str, AnswerRecord] = {}
        for row in rows:
            out[row["question_id"]] = AnswerRecord(
                question_id=row["question_id"],
                text=row["text"] or "",
                updated_at=row["updated_at"],
                follow_ups=_follow_ups(row.get("follow_ups")),
            )
        return out

    async def upsert_answer(
        self,
        company_code: str,
        role: Role,
        question_id: str,
        text: str,
        follow_ups: list[FollowUpRow],
    ) -> AnswerRecord:
        await self.ensure_session(company_code, role)
        now = utcnow()
        payload = [row.as_public() for row in follow_ups]
        conn = await self._conn_ready()
        result = await conn.execute(
            """
            INSERT INTO answers (company_code, role, question_id, text, follow_ups, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (company_code, role, question_id) DO UPDATE
              SET text = EXCLUDED.text,
                  follow_ups = EXCLUDED.follow_ups,
                  updated_at = EXCLUDED.updated_at
            RETURNING question_id, text, updated_at, follow_ups
            """,
            (company_code, role, question_id, text, Json(payload), now),
        )
        row = await result.fetchone()
        assert row is not None
        await conn.execute(
            """
            UPDATE sessions
            SET updated_at = %s
            WHERE company_code = %s AND role = %s
            """,
            (now, company_code, role),
        )
        await _replace_follow_up_rows(conn, company_code, role, question_id, follow_ups)
        return AnswerRecord(
            question_id=row["question_id"],
            text=row["text"] or "",
            updated_at=row["updated_at"],
            follow_ups=_follow_ups(row.get("follow_ups")),
        )

    async def add_transcript(
        self, company_code: str, role: Role, question_id: str, text: str
    ) -> TranscriptAttempt:
        await self.ensure_session(company_code, role)
        conn = await self._conn_ready()
        result = await conn.execute(
            """
            INSERT INTO transcription_attempts (
              company_code, role, question_id, attempt_number, text
            )
            VALUES (
              %s, %s, %s,
              COALESCE((
                SELECT MAX(attempt_number)
                FROM transcription_attempts
                WHERE company_code = %s AND role = %s AND question_id = %s
              ), 0) + 1,
              %s
            )
            RETURNING question_id, attempt_number, text, created_at
            """,
            (company_code, role, question_id, company_code, role, question_id, text),
        )
        row = await result.fetchone()
        assert row is not None
        return TranscriptAttempt(
            question_id=row["question_id"],
            attempt_number=row["attempt_number"],
            text=row["text"],
            created_at=row["created_at"],
        )

    async def list_transcripts(
        self, company_code: str, role: Role
    ) -> list[TranscriptAttempt]:
        conn = await self._conn_ready()
        result = await conn.execute(
            """
            SELECT question_id, attempt_number, text, created_at
            FROM transcription_attempts
            WHERE company_code = %s AND role = %s
            ORDER BY created_at ASC
            """,
            (company_code, role),
        )
        rows = await result.fetchall()
        return [
            TranscriptAttempt(
                question_id=row["question_id"],
                attempt_number=row["attempt_number"],
                text=row["text"],
                created_at=row["created_at"],
            )
            for row in rows
        ]

    async def mark_complete(self, company_code: str, role: Role) -> SessionRecord:
        session = await self.ensure_session(company_code, role)
        now = utcnow()
        conn = await self._conn_ready()
        result = await conn.execute(
            """
            UPDATE sessions
            SET status = 'complete',
                completed_at = COALESCE(completed_at, %s),
                revoked_at = COALESCE(revoked_at, %s),
                updated_at = %s
            WHERE company_code = %s AND role = %s
            RETURNING company_code, role, status, created_at, updated_at, completed_at, revoked_at
            """,
            (now, now, now, company_code, role),
        )
        row = await result.fetchone()
        assert row is not None
        return _session(row) or session

    async def close_role(self, company_code: str, role: Role) -> SessionRecord:
        session = await self.ensure_session(company_code, role)
        now = utcnow()
        conn = await self._conn_ready()
        result = await conn.execute(
            """
            UPDATE sessions
            SET status = CASE WHEN status = 'complete' THEN 'complete' ELSE 'closed' END,
                revoked_at = COALESCE(revoked_at, %s),
                updated_at = %s
            WHERE company_code = %s AND role = %s
            RETURNING company_code, role, status, created_at, updated_at, completed_at, revoked_at
            """,
            (now, now, company_code, role),
        )
        row = await result.fetchone()
        assert row is not None
        return _session(row) or session

    async def revoke_key(self, company_code: str, role: Role, key_hash: str) -> None:
        await self.close_role(company_code, role)
        digest = (key_hash or "").strip().lower()
        if not digest:
            return
        conn = await self._conn_ready()
        await conn.execute(
            """
            INSERT INTO revoked_keys (company_code, role, key_hash)
            VALUES (%s, %s, %s)
            ON CONFLICT (key_hash) DO UPDATE
              SET role = EXCLUDED.role
            """,
            (company_code, role, digest),
        )

    async def revoked_hashes(self) -> dict[str, Role]:
        conn = await self._conn_ready()
        result = await conn.execute("SELECT key_hash, role FROM revoked_keys")
        rows = await result.fetchall()
        return {row["key_hash"]: row["role"] for row in rows}


def _session(row: dict[str, Any] | None) -> SessionRecord | None:
    if not row:
        return None
    return SessionRecord(
        company_code=row["company_code"],
        role=row["role"],
        status=row["status"],
        created_at=row["created_at"],
        updated_at=row["updated_at"],
        completed_at=row.get("completed_at"),
        revoked_at=row.get("revoked_at"),
    )


def _follow_ups(raw: Any) -> list[FollowUpRow]:
    if not raw:
        return []
    rows: list[FollowUpRow] = []
    for item in raw:
        if not isinstance(item, dict):
            continue
        rows.append(
            FollowUpRow(
                row_index=int(item.get("row_index") or 0),
                task_name=str(item.get("task_name") or ""),
                how_often=str(item.get("how_often") or ""),
                how_long=str(item.get("how_long") or ""),
                who_role=str(item.get("who_role") or ""),
            )
        )
    return rows


async def _replace_follow_up_rows(
    conn: psycopg.AsyncConnection,
    company_code: str,
    role: Role,
    question_id: str,
    follow_ups: list[FollowUpRow],
) -> None:
    await conn.execute(
        """
        DELETE FROM follow_up_rows
        WHERE company_code = %s AND role = %s AND question_id = %s
        """,
        (company_code, role, question_id),
    )
    for row in follow_ups:
        await conn.execute(
            """
            INSERT INTO follow_up_rows (
              company_code, role, question_id, row_index,
              task_name, how_often, how_long, who_role
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                company_code,
                role,
                question_id,
                row.row_index,
                row.task_name,
                row.how_often,
                row.how_long,
                row.who_role,
            ),
        )
