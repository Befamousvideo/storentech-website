from pathlib import Path

import pytest

from app.questions import QuestionsError, load_questions
from tests.conftest import CEO_KEY, EXAMPLE


def test_example_file_has_all_roles_and_tags():
    packs = load_questions(EXAMPLE)
    assert set(packs) == {"ceo", "cfo", "ops"}
    for role, pack in packs.items():
        assert pack.company_label == "Company 111"
        assert pack.must_ids()
        assert any(item.tag == "if_time" and item.follow_ups is False for item in pack.questions)
        assert any(item.follow_ups for item in pack.questions)


def test_session_returns_runtime_questions_not_empty(client):
    body = client.get("/session", headers={"X-Interview-Key": CEO_KEY}).json()
    ids = [item["id"] for item in body["questions"]]
    assert ids == ["ceo-q1", "ceo-q2", "ceo-q3"]
    assert body["questions"][0]["follow_ups"] is True
    assert body["questions"][2]["tag"] == "if_time"


def test_answer_and_submit_round_trip(client):
    headers = {"X-Interview-Key": CEO_KEY}
    saved = client.put(
        "/answer",
        headers=headers,
        json={
            "question_id": "ceo-q1",
            "text": "Monday leadership meeting",
            "follow_ups": [
                {
                    "row_index": 0,
                    "task_name": "",
                    "how_often": "weekly",
                    "how_long": "90 minutes",
                    "who_role": "operations lead",
                }
            ],
        },
    )
    assert saved.status_code == 200
    client.put(
        "/answer",
        headers=headers,
        json={"question_id": "ceo-q2", "text": "Hiring plan", "follow_ups": []},
    )
    missing = client.post("/submit", headers=headers)
    assert missing.status_code == 200
    session = client.get("/session", headers=headers).json()
    assert session["status"] == "complete"
    assert session["questions"] == []
    assert session["answers"] == {}
    blocked = client.put(
        "/answer",
        headers=headers,
        json={"question_id": "ceo-q1", "text": "should not save"},
    )
    assert blocked.status_code == 409


def test_submit_requires_must_questions(client):
    headers = {"X-Interview-Key": CEO_KEY}
    response = client.post("/submit", headers=headers)
    assert response.status_code == 400


def test_rejects_unknown_question(client):
    response = client.put(
        "/answer",
        headers={"X-Interview-Key": CEO_KEY},
        json={"question_id": "not-real", "text": "x"},
    )
    assert response.status_code == 400


def test_missing_questions_file_raises():
    with pytest.raises(QuestionsError):
        load_questions(Path("/tmp/does-not-exist-questions.json"))
