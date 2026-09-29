from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from app.roles import ROLES, Role


def _strip(value: str | None) -> str:
    return (value or "").strip()


@dataclass(frozen=True)
class Settings:
    site_public_url: str
    company_code: str
    questions_path: Path
    database_url: str
    database_admin_url: str
    database_name: str
    database_user: str
    database_password: str
    cors_dev_origin: str
    port: int
    whisper_url: str
    whisper_mode: str
    whisper_path: str
    whisper_file_field: str
    whisper_model: str
    whisper_timeout_seconds: float
    rate_limit_per_minute: int
    transcribe_limit_per_minute: int
    key_hashes: dict[Role, str]
    max_audio_bytes: int = 25 * 1024 * 1024

    @property
    def cors_origins(self) -> list[str]:
        origins = [
            "https://www.storentechai.com",
            "https://storentechai.com",
        ]
        extra = self.cors_dev_origin.rstrip("/")
        if extra and extra not in origins:
            origins.append(extra)
        return origins


def load_settings() -> Settings:
    hashes: dict[Role, str] = {}
    for role in ROLES:
        raw = _strip(os.environ.get(f"INTERVIEW_KEY_HASH_{role.upper()}"))
        if raw:
            hashes[role] = raw.lower()
    return Settings(
        site_public_url=_strip(os.environ.get("SITE_PUBLIC_URL"))
        or "https://www.storentechai.com",
        company_code=_strip(os.environ.get("COMPANY_CODE")) or "111",
        questions_path=Path(
            _strip(os.environ.get("QUESTIONS_PATH")) or "/app/questions.json"
        ),
        database_url=_strip(os.environ.get("DATABASE_URL")),
        database_admin_url=_strip(os.environ.get("DATABASE_ADMIN_URL")),
        database_name=_strip(os.environ.get("DATABASE_NAME")) or "exec_interviews",
        database_user=_strip(os.environ.get("DATABASE_USER")) or "exec_interview",
        database_password=_strip(os.environ.get("DATABASE_PASSWORD")),
        cors_dev_origin=_strip(os.environ.get("CORS_DEV_ORIGIN")),
        port=int(_strip(os.environ.get("PORT")) or "8443"),
        whisper_url=_strip(os.environ.get("WHISPER_URL")) or "http://whisper:8000",
        whisper_mode=(_strip(os.environ.get("WHISPER_MODE")) or "multipart").lower(),
        whisper_path=_strip(os.environ.get("WHISPER_PATH")) or "/transcribe",
        whisper_file_field=_strip(os.environ.get("WHISPER_FILE_FIELD")) or "file",
        whisper_model=_strip(os.environ.get("WHISPER_MODEL")) or "whisper-1",
        whisper_timeout_seconds=float(
            _strip(os.environ.get("WHISPER_TIMEOUT_SECONDS")) or "180"
        ),
        rate_limit_per_minute=int(
            _strip(os.environ.get("RATE_LIMIT_PER_MINUTE")) or "60"
        ),
        transcribe_limit_per_minute=int(
            _strip(os.environ.get("TRANSCRIBE_LIMIT_PER_MINUTE")) or "8"
        ),
        key_hashes=hashes,
    )
