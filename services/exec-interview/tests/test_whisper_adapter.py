from pathlib import Path

import httpx
import pytest

from app.whisper import WhisperError, transcribe_file
from tests.conftest import make_settings


class FakeClient:
    def __init__(self, handler):
        self.handler = handler

    async def __aenter__(self):
        return self

    async def __aexit__(self, *args):
        return False

    async def post(self, url, files=None, data=None):
        return await self.handler(url, files, data)


@pytest.mark.asyncio
async def test_multipart_default_posts_file_field(tmp_path, monkeypatch):
    clip = tmp_path / "clip.webm"
    clip.write_bytes(b"abc")
    seen = {}

    async def handler(url, files, data):
        seen["url"] = url
        seen["files"] = files
        seen["data"] = data
        return httpx.Response(200, json={"text": "hello"})

    monkeypatch.setattr("app.whisper.httpx.AsyncClient", lambda timeout=None: FakeClient(handler))
    settings = make_settings()
    text = await transcribe_file(settings, clip, "audio/webm")
    assert text == "hello"
    assert seen["url"] == "http://whisper:8000/transcribe"
    assert "file" in seen["files"]


@pytest.mark.asyncio
async def test_openai_mode_uses_transcriptions_path(tmp_path, monkeypatch):
    clip = tmp_path / "clip.mp4"
    clip.write_bytes(b"abc")

    async def handler(url, files, data):
        assert url.endswith("/v1/audio/transcriptions")
        assert data["model"] == "whisper-1"
        return httpx.Response(200, json={"text": "ok"})

    monkeypatch.setattr("app.whisper.httpx.AsyncClient", lambda timeout=None: FakeClient(handler))
    settings = make_settings(whisper_mode="openai")
    assert await transcribe_file(settings, clip, "audio/mp4") == "ok"


@pytest.mark.asyncio
async def test_whisper_error_does_not_include_audio(tmp_path, monkeypatch):
    clip = tmp_path / "clip.webm"
    clip.write_bytes(b"secret-audio")

    async def handler(url, files, data):
        return httpx.Response(500, text="internal")

    monkeypatch.setattr("app.whisper.httpx.AsyncClient", lambda timeout=None: FakeClient(handler))
    with pytest.raises(WhisperError, match="whisper_failed"):
        await transcribe_file(make_settings(), clip, "audio/webm")
