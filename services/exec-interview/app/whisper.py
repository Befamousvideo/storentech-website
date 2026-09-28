from __future__ import annotations

from pathlib import Path
from typing import Any

import httpx

from app.config import Settings


class WhisperError(RuntimeError):
    pass


def _extract_text(payload: Any) -> str:
    if isinstance(payload, str):
        return payload.strip()
    if not isinstance(payload, dict):
        return ""
    for key in ("text", "transcript", "transcription"):
        value = payload.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return ""


async def transcribe_file(settings: Settings, path: Path, content_type: str) -> str:
    filename = path.name
    data = path.read_bytes()
    timeout = httpx.Timeout(settings.whisper_timeout_seconds)
    base = settings.whisper_url.rstrip("/")

    if settings.whisper_mode == "openai":
        url = f"{base}/v1/audio/transcriptions"
        files = {settings.whisper_file_field: (filename, data, content_type or "application/octet-stream")}
        form = {"model": settings.whisper_model}
    else:
        url = f"{base}{settings.whisper_path}"
        files = {settings.whisper_file_field: (filename, data, content_type or "application/octet-stream")}
        form = {}

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(url, files=files, data=form)
    except httpx.HTTPError as exc:
        raise WhisperError("whisper_unreachable") from exc

    if response.status_code >= 400:
        raise WhisperError("whisper_failed")

    try:
        payload = response.json()
    except ValueError:
        payload = response.text
    text = _extract_text(payload)
    if not text:
        raise WhisperError("whisper_empty")
    return text
