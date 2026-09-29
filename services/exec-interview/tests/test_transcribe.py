from pathlib import Path

from tests.conftest import CEO_KEY


def test_audio_temp_file_deleted_after_success(client, transcribe_stub):
    response = client.post(
        "/transcribe",
        headers={"X-Interview-Key": CEO_KEY},
        data={"question_id": "ceo-q1"},
        files={"file": ("clip.webm", b"fake-audio-bytes", "audio/webm")},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["text"] == "transcribed draft"
    assert body["attempt_number"] == 1
    assert transcribe_stub.seen["path_exists_during_call"] is True
    assert not Path(transcribe_stub.seen["last_path"]).exists()


def test_audio_temp_file_deleted_after_whisper_failure(store, packs):
    from app.main import create_app
    from app.whisper import WhisperError
    from fastapi.testclient import TestClient
    from tests.conftest import make_settings

    seen = {}

    async def boom(settings, path: Path, content_type: str) -> str:
        seen["path"] = str(path)
        seen["existed"] = path.exists()
        raise WhisperError("whisper_failed")

    app = create_app(settings=make_settings(), store=store, packs=packs, transcribe_audio=boom)
    with TestClient(app) as client:
        response = client.post(
            "/transcribe",
            headers={"X-Interview-Key": CEO_KEY},
            data={"question_id": "ceo-q1"},
            files={"file": ("clip.mp4", b"x" * 128, "audio/mp4")},
        )
    assert response.status_code == 502
    assert seen["existed"] is True
    assert not Path(seen["path"]).exists()
    assert "transcribed" not in response.text.lower()


def test_rejects_oversized_audio(client, transcribe_stub):
    too_big = b"a" * (25 * 1024 * 1024 + 2048)
    response = client.post(
        "/transcribe",
        headers={"X-Interview-Key": CEO_KEY},
        data={"question_id": "ceo-q1"},
        files={"file": ("clip.webm", too_big, "audio/webm")},
    )
    assert response.status_code == 413
    assert transcribe_stub.seen["calls"] == 0


def test_second_attempt_increments(client):
    headers = {"X-Interview-Key": CEO_KEY}
    first = client.post(
        "/transcribe",
        headers=headers,
        data={"question_id": "ceo-q1"},
        files={"file": ("clip.webm", b"one", "audio/webm")},
    )
    second = client.post(
        "/transcribe",
        headers=headers,
        data={"question_id": "ceo-q1"},
        files={"file": ("clip.webm", b"two", "audio/webm")},
    )
    assert first.json()["attempt_number"] == 1
    assert second.json()["attempt_number"] == 2
