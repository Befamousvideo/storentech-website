from __future__ import annotations

import argparse
import asyncio
import json
import os
from datetime import datetime, timezone
from pathlib import Path

from app.config import load_settings
from app.db import PostgresStore
from app.questions import load_questions
from app.roles import ROLES
from app.store import MemoryStore, Store


def _md_escape(text: str) -> str:
    return text.replace("\r\n", "\n")


async def _load_store(settings) -> Store:
    if settings.database_url:
        store = PostgresStore(settings.database_url)
        await store.connect()
        return store
    return MemoryStore()


async def export_role(role: str, out_dir: Path) -> tuple[Path, Path]:
    settings = load_settings()
    packs = load_questions(settings.questions_path)
    pack = packs[role]
    store = await _load_store(settings)
    try:
        session = await store.get_session(settings.company_code, role)
        answers = await store.list_answers(settings.company_code, role)
        transcripts = await store.list_transcripts(settings.company_code, role)
    finally:
        await store.close()

    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%MZ")
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = f"{settings.company_code}-{role}-{stamp}"
    json_path = out_dir / f"{stem}.json"
    md_path = out_dir / f"{stem}.md"

    payload = {
        "company_label": pack.company_label,
        "company_code": settings.company_code,
        "role": role,
        "role_title": pack.role_title,
        "status": session.status if session else "missing",
        "exported_at": datetime.now(timezone.utc).isoformat(),
        "intro": pack.intro,
        "questions": [],
    }
    lines = [
        f"# {pack.company_label} — {pack.role_title}",
        "",
        f"Status: {payload['status']}",
        "",
        pack.intro,
        "",
    ]
    by_question = {}
    for attempt in transcripts:
        by_question.setdefault(attempt.question_id, []).append(
            {
                "attempt_number": attempt.attempt_number,
                "text": attempt.text,
                "created_at": attempt.created_at.isoformat(),
            }
        )
    for question in pack.questions:
        answer = answers.get(question.id)
        item = {
            "id": question.id,
            "tag": question.tag,
            "text": question.text,
            "answer": answer.text if answer else "",
            "follow_ups": [row.as_public() for row in answer.follow_ups] if answer else [],
            "updated_at": answer.updated_at.isoformat() if answer else None,
            "transcript_attempts": by_question.get(question.id, []),
        }
        payload["questions"].append(item)
        required = "required" if question.tag == "must" else "if time"
        lines.append(f"## {question.id} ({required})")
        lines.append("")
        lines.append(_md_escape(question.text))
        lines.append("")
        lines.append("### Answer")
        lines.append("")
        lines.append(_md_escape(item["answer"]) or "_No answer._")
        lines.append("")
        if item["follow_ups"]:
            lines.append("### Follow-up rows")
            lines.append("")
            for row in item["follow_ups"]:
                task = row["task_name"] or "(primary)"
                lines.append(
                    f"- {task}: how often={row['how_often'] or '—'}; "
                    f"how long={row['how_long'] or '—'}; who={row['who_role'] or '—'}"
                )
            lines.append("")
        if item["transcript_attempts"]:
            lines.append("### Transcript attempts")
            lines.append("")
            for attempt in item["transcript_attempts"]:
                lines.append(f"- Attempt {attempt['attempt_number']}:")
                lines.append("")
                lines.append(_md_escape(attempt["text"]))
                lines.append("")

    json_path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    md_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    return md_path, json_path


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Write one role's answers to local Markdown and JSON. Never uploads."
    )
    parser.add_argument("--role", required=True, choices=ROLES)
    parser.add_argument(
        "--out",
        default=os.environ.get("EXPORT_DIR", str(Path(__file__).resolve().parent.parent / "exports")),
    )
    args = parser.parse_args()
    md_path, json_path = asyncio.run(export_role(args.role, Path(args.out)))
    print(f"Wrote {md_path}")
    print(f"Wrote {json_path}")


if __name__ == "__main__":
    main()
