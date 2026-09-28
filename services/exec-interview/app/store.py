from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from threading import Lock
from typing import Any, Protocol

from app.roles import Role


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


@dataclass
class FollowUpRow:
    row_index: int
    task_name: str = ""
    how_often: str = ""
    how_long: str = ""
    who_role: str = ""

    def as_public(self) -> dict[str, Any]:
        return {
            "row_index": self.row_index,
            "task_name": self.task_name,
            "how_often": self.how_often,
            "how_long": self.how_long,
            "who_role": self.who_role,
        }


@dataclass
class AnswerRecord:
    question_id: str
    text: str = ""
    updated_at: datetime = field(default_factory=utcnow)
    follow_ups: list[FollowUpRow] = field(default_factory=list)

    def as_public(self) -> dict[str, Any]:
        return {
            "text": self.text,
            "updated_at": self.updated_at.isoformat(),
            "follow_ups": [row.as_public() for row in sorted(self.follow_ups, key=lambda r: r.row_index)],
        }


CLOSED_STATUSES = frozenset({"complete", "closed"})


@dataclass
class SessionRecord:
    company_code: str
    role: Role
    status: str = "in_progress"
    created_at: datetime = field(default_factory=utcnow)
    updated_at: datetime = field(default_factory=utcnow)
    completed_at: datetime | None = None
    revoked_at: datetime | None = None

    @property
    def is_closed(self) -> bool:
        return self.status in CLOSED_STATUSES or self.revoked_at is not None


@dataclass
class TranscriptAttempt:
    question_id: str
    attempt_number: int
    text: str
    created_at: datetime = field(default_factory=utcnow)


class Store(Protocol):
    async def ensure_session(self, company_code: str, role: Role) -> SessionRecord: ...
    async def get_session(self, company_code: str, role: Role) -> SessionRecord | None: ...
    async def list_answers(self, company_code: str, role: Role) -> dict[str, AnswerRecord]: ...
    async def upsert_answer(
        self,
        company_code: str,
        role: Role,
        question_id: str,
        text: str,
        follow_ups: list[FollowUpRow],
    ) -> AnswerRecord: ...
    async def add_transcript(
        self, company_code: str, role: Role, question_id: str, text: str
    ) -> TranscriptAttempt: ...
    async def list_transcripts(
        self, company_code: str, role: Role
    ) -> list[TranscriptAttempt]: ...
    async def mark_complete(self, company_code: str, role: Role) -> SessionRecord: ...
    async def close_role(self, company_code: str, role: Role) -> SessionRecord: ...
    async def revoke_key(self, company_code: str, role: Role, key_hash: str) -> None: ...
    async def revoked_hashes(self) -> dict[str, Role]: ...
    async def close(self) -> None: ...


class MemoryStore:
    """Used by tests. Production uses PostgresStore."""

    def __init__(self) -> None:
        self._sessions: dict[tuple[str, Role], SessionRecord] = {}
        self._answers: dict[tuple[str, Role, str], AnswerRecord] = {}
        self._transcripts: list[tuple[str, Role, TranscriptAttempt]] = []
        self._revoked: dict[str, Role] = {}
        self._lock = Lock()

    async def ensure_session(self, company_code: str, role: Role) -> SessionRecord:
        key = (company_code, role)
        with self._lock:
            existing = self._sessions.get(key)
            if existing:
                return existing
            record = SessionRecord(company_code=company_code, role=role)
            self._sessions[key] = record
            return record

    async def get_session(self, company_code: str, role: Role) -> SessionRecord | None:
        return self._sessions.get((company_code, role))

    async def list_answers(self, company_code: str, role: Role) -> dict[str, AnswerRecord]:
        out: dict[str, AnswerRecord] = {}
        for (code, stored_role, qid), record in self._answers.items():
            if code == company_code and stored_role == role:
                out[qid] = record
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
        record = AnswerRecord(
            question_id=question_id,
            text=text,
            updated_at=utcnow(),
            follow_ups=list(follow_ups),
        )
        self._answers[(company_code, role, question_id)] = record
        session = self._sessions[(company_code, role)]
        session.updated_at = record.updated_at
        return record

    async def add_transcript(
        self, company_code: str, role: Role, question_id: str, text: str
    ) -> TranscriptAttempt:
        await self.ensure_session(company_code, role)
        existing = [
            item
            for code, stored_role, item in self._transcripts
            if code == company_code and stored_role == role and item.question_id == question_id
        ]
        attempt = TranscriptAttempt(
            question_id=question_id,
            attempt_number=len(existing) + 1,
            text=text,
        )
        self._transcripts.append((company_code, role, attempt))
        return attempt

    async def list_transcripts(
        self, company_code: str, role: Role
    ) -> list[TranscriptAttempt]:
        return [
            item
            for code, stored_role, item in self._transcripts
            if code == company_code and stored_role == role
        ]

    async def mark_complete(self, company_code: str, role: Role) -> SessionRecord:
        session = await self.ensure_session(company_code, role)
        now = utcnow()
        session.status = "complete"
        session.completed_at = now
        session.revoked_at = now
        session.updated_at = now
        return session

    async def close_role(self, company_code: str, role: Role) -> SessionRecord:
        session = await self.ensure_session(company_code, role)
        now = utcnow()
        if session.status != "complete":
            session.status = "closed"
        session.revoked_at = now
        session.updated_at = now
        return session

    async def revoke_key(self, company_code: str, role: Role, key_hash: str) -> None:
        if key_hash:
            self._revoked[key_hash.lower()] = role
        await self.close_role(company_code, role)

    async def revoked_hashes(self) -> dict[str, Role]:
        return dict(self._revoked)

    async def close(self) -> None:
        return None
