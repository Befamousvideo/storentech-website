import asyncio

from fastapi.testclient import TestClient

from app.auth import hash_key, match_role
from app.main import create_app
from tests.conftest import CEO_KEY, CFO_KEY, make_settings


def test_submit_revokes_key_and_returns_closed_session(client):
    headers = {"X-Interview-Key": CEO_KEY}
    client.put(
        "/answer",
        headers=headers,
        json={"question_id": "ceo-q1", "text": "done", "follow_ups": []},
    )
    client.put(
        "/answer",
        headers=headers,
        json={"question_id": "ceo-q2", "text": "also done", "follow_ups": []},
    )
    submitted = client.post("/submit", headers=headers)
    assert submitted.status_code == 200
    assert submitted.json()["status"] == "complete"

    closed = client.get("/session", headers=headers).json()
    assert closed["status"] == "complete"
    assert closed["questions"] == []
    assert closed["intro"] == ""
    assert client.post(
        "/transcribe",
        headers=headers,
        data={"question_id": "ceo-q1"},
        files={"file": ("clip.webm", b"x", "audio/webm")},
    ).status_code == 409

    # Other roles stay open.
    other = client.get("/session", headers={"X-Interview-Key": CFO_KEY})
    assert other.status_code == 200
    assert other.json()["questions"]


def test_revoked_hash_is_recognized_as_closed_not_unknown():
    digest = hash_key("used-once")
    matched = match_role("used-once", {"ceo": hash_key("other")}, {digest: "ceo"})
    assert matched is not None
    assert matched.role == "ceo"
    assert matched.revoked is True


def test_manual_revoke_closes_role_without_submit(store, packs, transcribe_stub):
    asyncio.run(store.revoke_key("111", "ceo", hash_key(CEO_KEY)))
    session = asyncio.run(store.get_session("111", "ceo"))
    assert session is not None
    assert session.status == "closed"
    assert session.is_closed
    assert asyncio.run(store.revoked_hashes())[hash_key(CEO_KEY)] == "ceo"

    app = create_app(
        settings=make_settings(),
        store=store,
        packs=packs,
        transcribe_audio=transcribe_stub,
    )
    with TestClient(app) as client:
        headers = {"X-Interview-Key": CEO_KEY}
        body = client.get("/session", headers=headers).json()
        assert body["status"] == "closed"
        assert body["questions"] == []
        assert body["intro"] == ""
        assert (
            client.put(
                "/answer",
                headers=headers,
                json={"question_id": "ceo-q1", "text": "no"},
            ).status_code
            == 409
        )
