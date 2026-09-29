from __future__ import annotations

import logging
import os
import tempfile
from contextlib import asynccontextmanager
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from fastapi import Depends, FastAPI, File, Form, Header, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.auth import hash_key, match_role
from app.config import Settings, load_settings
from app.questions import QuestionsError, RolePack, load_questions
from app.rate_limit import RateLimiter, bucket_token
from app.roles import Role
from app.store import FollowUpRow, MemoryStore, Store
from app.whisper import WhisperError, transcribe_file

logger = logging.getLogger("exec-interview")
logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s %(message)s")

ALLOWED_AUDIO_TYPES = {
    "audio/mp4",
    "audio/m4a",
    "audio/x-m4a",
    "audio/aac",
    "audio/webm",
    "audio/ogg",
    "audio/wav",
    "audio/x-wav",
    "audio/mpeg",
    "audio/mp3",
    "video/webm",
    "video/mp4",
    "application/octet-stream",
}

HOW_OFTEN = {"daily", "few_times_a_week", "weekly", "monthly", "other", ""}


@dataclass(frozen=True)
class Auth:
    role: Role
    closed: bool
    key_hash: str


class FollowUpIn(BaseModel):
    row_index: int = Field(ge=0, le=20)
    task_name: str = ""
    how_often: str = ""
    how_long: str = ""
    who_role: str = ""


class AnswerIn(BaseModel):
    question_id: str
    text: str = ""
    follow_ups: list[FollowUpIn] = Field(default_factory=list)


def _safe_filename(upload: UploadFile) -> str:
    name = Path(upload.filename or "clip").name
    suffix = Path(name).suffix.lower()
    if suffix not in {".mp4", ".m4a", ".aac", ".webm", ".ogg", ".wav", ".mp3", ".mpeg"}:
        guessed = {
            "audio/mp4": ".mp4",
            "audio/aac": ".aac",
            "audio/webm": ".webm",
            "video/webm": ".webm",
            "video/mp4": ".mp4",
            "audio/ogg": ".ogg",
            "audio/wav": ".wav",
            "audio/mpeg": ".mp3",
        }.get(upload.content_type or "", ".bin")
        return f"clip{guessed}"
    return f"clip{suffix}"


def create_app(
    settings: Settings | None = None,
    store: Store | None = None,
    packs: dict[Role, RolePack] | None = None,
    transcribe_audio=transcribe_file,
) -> FastAPI:
    settings = settings or load_settings()
    limiter = RateLimiter()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        app.state.settings = settings
        app.state.store = store or MemoryStore()
        if packs is not None:
            app.state.packs = packs
        else:
            try:
                app.state.packs = load_questions(settings.questions_path)
            except QuestionsError:
                logger.error("questions_unavailable")
                app.state.packs = {}
        app.state.active_hashes = dict(settings.key_hashes)
        if hasattr(app.state.store, "connect"):
            await app.state.store.connect()  # type: ignore[union-attr]
        yield
        await app.state.store.close()

    app = FastAPI(
        title="Exec interview intake",
        docs_url=None,
        redoc_url=None,
        openapi_url=None,
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=False,
        allow_methods=["GET", "POST", "PUT", "OPTIONS"],
        allow_headers=["X-Interview-Key", "Content-Type", "Accept"],
        max_age=600,
    )

    def current_packs() -> dict[Role, RolePack]:
        loaded = getattr(app.state, "packs", None)
        if loaded:
            return loaded
        raise HTTPException(status_code=503, detail="unavailable")

    async def require_role(
        request: Request,
        x_interview_key: str | None = Header(default=None, alias="X-Interview-Key"),
    ) -> Auth:
        token = (x_interview_key or "").strip()
        bucket = bucket_token("key", token or request.client.host if request.client else "anon")
        if not limiter.allow(bucket, settings.rate_limit_per_minute):
            raise HTTPException(status_code=429, detail="rate_limited")
        revoked = await app.state.store.revoked_hashes()
        matched = match_role(token, app.state.active_hashes, revoked)
        if matched is None:
            raise HTTPException(status_code=401, detail="unauthorized")
        session = await app.state.store.get_session(settings.company_code, matched.role)
        closed = matched.revoked or bool(session and session.is_closed)
        return Auth(role=matched.role, closed=closed, key_hash=hash_key(token))

    def reject_if_closed(auth: Auth) -> None:
        if auth.closed:
            raise HTTPException(status_code=409, detail="closed")

    @app.get("/health")
    async def health() -> dict[str, str]:
        return {"ok": "true", "service": "interview-intake"}

    @app.get("/session")
    async def session(auth: Auth = Depends(require_role)) -> dict[str, Any]:
        pack = current_packs().get(auth.role)
        if pack is None:
            raise HTTPException(status_code=503, detail="unavailable")
        record = await app.state.store.ensure_session(settings.company_code, auth.role)
        if auth.closed or record.is_closed:
            return {
                "role": auth.role,
                "company_label": pack.company_label,
                "role_title": pack.role_title,
                "intro": "",
                "questions": [],
                "answers": {},
                "status": record.status if record.status in {"complete", "closed"} else "closed",
            }
        answers = await app.state.store.list_answers(settings.company_code, auth.role)
        return {
            "role": auth.role,
            "company_label": pack.company_label,
            "role_title": pack.role_title,
            "intro": pack.intro,
            "questions": [item.as_public() for item in pack.questions],
            "answers": {qid: answer.as_public() for qid, answer in answers.items()},
            "status": record.status,
        }

    @app.put("/answer")
    async def answer(body: AnswerIn, auth: Auth = Depends(require_role)) -> dict[str, Any]:
        reject_if_closed(auth)
        pack = current_packs().get(auth.role)
        if pack is None:
            raise HTTPException(status_code=503, detail="unavailable")
        if body.question_id not in pack.question_ids():
            raise HTTPException(status_code=400, detail="unknown_question")
        question = next(item for item in pack.questions if item.id == body.question_id)
        follow_ups: list[FollowUpRow] = []
        if question.follow_ups:
            for item in body.follow_ups:
                how = (item.how_often or "").strip()
                if how not in HOW_OFTEN:
                    raise HTTPException(status_code=400, detail="invalid_follow_up")
                follow_ups.append(
                    FollowUpRow(
                        row_index=item.row_index,
                        task_name=item.task_name.strip()[:200],
                        how_often=how,
                        how_long=item.how_long.strip()[:200],
                        who_role=item.who_role.strip()[:200],
                    )
                )
        record = await app.state.store.upsert_answer(
            settings.company_code,
            auth.role,
            body.question_id,
            body.text.strip(),
            follow_ups,
        )
        return {"ok": True, "answer": record.as_public()}

    @app.post("/transcribe")
    async def transcribe_audio_endpoint(
        auth: Auth = Depends(require_role),
        question_id: str = Form(...),
        file: UploadFile = File(...),
    ) -> dict[str, Any]:
        reject_if_closed(auth)
        pack = current_packs().get(auth.role)
        if pack is None:
            raise HTTPException(status_code=503, detail="unavailable")
        if question_id not in pack.question_ids():
            raise HTTPException(status_code=400, detail="unknown_question")
        if not limiter.allow(bucket_token("transcribe", auth.role), settings.transcribe_limit_per_minute):
            raise HTTPException(status_code=429, detail="rate_limited")

        content_type = (file.content_type or "").split(";")[0].strip().lower()
        if content_type and content_type not in ALLOWED_AUDIO_TYPES:
            raise HTTPException(status_code=415, detail="unsupported_media")

        tmp_path: str | None = None
        text = ""
        try:
            handle = tempfile.NamedTemporaryFile(delete=False, suffix=Path(_safe_filename(file)).suffix)
            tmp_path = handle.name
            written = 0
            while True:
                chunk = await file.read(64 * 1024)
                if not chunk:
                    break
                written += len(chunk)
                if written > settings.max_audio_bytes:
                    handle.close()
                    raise HTTPException(status_code=413, detail="too_large")
                handle.write(chunk)
            handle.close()
            text = await transcribe_audio(settings, Path(tmp_path), content_type)
        except HTTPException:
            raise
        except WhisperError:
            logger.error("transcribe_failed")
            raise HTTPException(status_code=502, detail="transcribe_failed") from None
        except Exception:
            logger.error("transcribe_error")
            raise HTTPException(status_code=500, detail="transcribe_failed") from None
        finally:
            if tmp_path:
                try:
                    os.remove(tmp_path)
                except FileNotFoundError:
                    pass
            try:
                await file.close()
            except Exception:
                pass

        attempt = await app.state.store.add_transcript(
            settings.company_code, auth.role, question_id, text
        )
        return {"text": text, "attempt_number": attempt.attempt_number}

    @app.post("/submit")
    async def submit(auth: Auth = Depends(require_role)) -> dict[str, Any]:
        pack = current_packs().get(auth.role)
        if pack is None:
            raise HTTPException(status_code=503, detail="unavailable")
        if auth.closed:
            return {"ok": True, "status": "complete"}
        answers = await app.state.store.list_answers(settings.company_code, auth.role)
        missing = [qid for qid in pack.must_ids() if not (answers.get(qid) and answers[qid].text.strip())]
        if missing:
            raise HTTPException(status_code=400, detail="missing_required")
        record = await app.state.store.mark_complete(settings.company_code, auth.role)
        await app.state.store.revoke_key(settings.company_code, auth.role, auth.key_hash)
        app.state.active_hashes.pop(auth.role, None)
        return {"ok": True, "status": record.status}

    return app


app = create_app()
