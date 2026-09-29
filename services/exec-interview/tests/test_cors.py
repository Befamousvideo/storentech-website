from tests.conftest import CEO_KEY


def test_allows_www_origin(client):
    response = client.options(
        "/session",
        headers={
            "Origin": "https://www.storentechai.com",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "X-Interview-Key",
        },
    )
    assert response.status_code in (200, 204)
    assert response.headers["access-control-allow-origin"] == "https://www.storentechai.com"
    assert "x-interview-key" in response.headers.get("access-control-allow-headers", "").lower()


def test_allows_apex_and_local_dev(client):
    for origin in ("https://storentechai.com", "http://localhost:3000"):
        response = client.get(
            "/health",
            headers={"Origin": origin},
        )
        assert response.headers["access-control-allow-origin"] == origin


def test_rejects_other_origins(client):
    response = client.get(
        "/session",
        headers={
            "Origin": "https://evil.example",
            "X-Interview-Key": CEO_KEY,
        },
    )
    assert "access-control-allow-origin" not in response.headers
