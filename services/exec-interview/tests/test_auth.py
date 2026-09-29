from app.auth import generate_key, hash_key, match_role
from tests.conftest import CEO_KEY, CFO_KEY


def test_match_role_accepts_ceo_key(client):
    response = client.get("/session", headers={"X-Interview-Key": CEO_KEY})
    assert response.status_code == 200
    body = response.json()
    assert body["role"] == "ceo"
    assert body["company_label"] == "Company 111"
    assert body["role_title"] == "CEO"


def test_missing_key_is_unauthorized(client):
    response = client.get("/session")
    assert response.status_code == 401
    assert "ceo" not in response.text.lower()


def test_wrong_key_is_unauthorized(client):
    response = client.get("/session", headers={"X-Interview-Key": "totally-wrong-key"})
    assert response.status_code == 401


def test_query_string_key_is_ignored(client):
    response = client.get("/session", params={"key": CEO_KEY, "k": CEO_KEY})
    assert response.status_code == 401


def test_health_does_not_need_a_key(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["ok"] == "true"


def test_cfo_key_does_not_open_ceo_session(client):
    response = client.get("/session", headers={"X-Interview-Key": CFO_KEY})
    assert response.status_code == 200
    assert response.json()["role"] == "cfo"


def test_constant_time_compare_rejects_unknown_without_raising():
    raw = generate_key()
    hashes = {"ceo": hash_key("other-key")}
    assert match_role(raw, hashes) is None
    assert match_role("", hashes) is None
    matched = match_role("other-key", hashes)
    assert matched is not None
    assert matched.role == "ceo"
    assert matched.revoked is False
