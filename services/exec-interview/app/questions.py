from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Literal

from app.roles import ROLES, Role

Tag = Literal["must", "if_time"]


@dataclass(frozen=True)
class Question:
    id: str
    text: str
    tag: Tag
    follow_ups: bool

    def as_public(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "text": self.text,
            "tag": self.tag,
            "follow_ups": self.follow_ups,
        }


@dataclass(frozen=True)
class RolePack:
    role: Role
    company_label: str
    role_title: str
    intro: str
    questions: tuple[Question, ...]

    def question_ids(self) -> set[str]:
        return {item.id for item in self.questions}

    def must_ids(self) -> list[str]:
        return [item.id for item in self.questions if item.tag == "must"]


class QuestionsError(ValueError):
    pass


def _require_str(data: dict[str, Any], key: str, where: str) -> str:
    value = data.get(key)
    if not isinstance(value, str) or not value.strip():
        raise QuestionsError(f"{where} is missing a non-empty {key}")
    return value.strip()


def load_questions(path: Path) -> dict[Role, RolePack]:
    if not path.is_file():
        raise QuestionsError(f"Questions file is missing: {path}")
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise QuestionsError("Questions file is not valid JSON") from exc
    if not isinstance(payload, dict):
        raise QuestionsError("Questions file must be an object")

    company_label = _require_str(payload, "company_label", "root")
    roles_raw = payload.get("roles")
    if not isinstance(roles_raw, dict):
        raise QuestionsError("Questions file must include a roles object")

    packs: dict[Role, RolePack] = {}
    for role in ROLES:
        block = roles_raw.get(role)
        if not isinstance(block, dict):
            raise QuestionsError(f"Missing role block: {role}")
        questions_raw = block.get("questions")
        if not isinstance(questions_raw, list) or not questions_raw:
            raise QuestionsError(f"{role} needs at least one question")
        questions: list[Question] = []
        seen: set[str] = set()
        for index, item in enumerate(questions_raw):
            if not isinstance(item, dict):
                raise QuestionsError(f"{role} question {index} must be an object")
            qid = _require_str(item, "id", f"{role} question {index}")
            if qid in seen:
                raise QuestionsError(f"Duplicate question id: {qid}")
            seen.add(qid)
            tag = item.get("tag")
            if tag not in ("must", "if_time"):
                raise QuestionsError(f"{qid} tag must be must or if_time")
            follow = item.get("follow_ups")
            if not isinstance(follow, bool):
                raise QuestionsError(f"{qid} follow_ups must be a boolean")
            questions.append(
                Question(
                    id=qid,
                    text=_require_str(item, "text", qid),
                    tag=tag,
                    follow_ups=follow,
                )
            )
        packs[role] = RolePack(
            role=role,
            company_label=company_label,
            role_title=_require_str(block, "role_title", role),
            intro=_require_str(block, "intro", role),
            questions=tuple(questions),
        )
    return packs
