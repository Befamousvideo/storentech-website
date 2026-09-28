from __future__ import annotations

from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.auth import hash_key
from app.config import Settings
from app.main import create_app
from app.questions import load_questions
from app.store import MemoryStore

EXAMPLE = Path(__file__).resolve().parent.parent / "questions.example.json"
CEO_KEY = "ceo-test-key-aaaaaaaaaaaaaaaaaaaaaaaaaaaa"
CFO_KEY = "cfo-test-key-bbbbbbbbbbbbbbbbbbbbbbbbbbbb"


def make_settings(**overrides) -> Settings:
    base = Settings(
        site_public_url="https://www.storentechai.com",
        company_code="111",
        questions_path=EXAMPLE,
        database_url="",
        database_admin_url="",
        database_name="exec_interviews",
        database_user="exec_interview",
        database_password="",
        cors_dev_origin="http://localhost:3000",
        port=8443,
        whisper_url="http://whisper:8000",
        whisper_mode="multipart",
        whisper_path="/transcribe",
        whisper_file_field="file",
        whisper_model="whisper-1",
        whisper_timeout_seconds=5,
        rate_limit_per_minute=120,
        transcribe_limit_per_minute=40,
        key_hashes={
            "ceo": hash_key(CEO_KEY),
            "cfo": hash_key(CFO_KEY),
        },
    )
    return Settings(**{**base.__dict__, **overrides})


@pytest.fixture
def packs():
    return load_questions(EXAMPLE)


@pytest.fixture
def store():
    return MemoryStore()


@pytest.fixture
def transcribe_stub(tmp_path):
    seen = {"path_exists_during_call": None, "calls": 0}

    async def _fake(settings, path: Path, content_type: str) -> str:
        seen["calls"] += 1
        seen["path_exists_during_call"] = path.exists()
        seen["last_path"] = str(path)
        seen["content_type"] = content_type
        return "transcribed draft"

    _fake.seen = seen  # type: ignore[attr-defined]
    return _fake


@pytest.fixture
def client(store, packs, transcribe_stub):
    app = create_app(
        settings=make_settings(),
        store=store,
        packs=packs,
        transcribe_audio=transcribe_stub,
    )
    with TestClient(app) as test_client:
        yield test_client
