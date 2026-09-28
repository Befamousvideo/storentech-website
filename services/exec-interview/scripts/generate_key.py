from __future__ import annotations

import argparse
import os
import re
from pathlib import Path

from app.auth import generate_key, hash_key
from app.roles import ROLES, is_role


ENV_PATH = Path(__file__).resolve().parent.parent / ".env"


def _upsert_env(path: Path, key: str, value: str) -> None:
    if path.is_file():
        text = path.read_text(encoding="utf-8")
    else:
        example = path.with_name(".env.example")
        text = example.read_text(encoding="utf-8") if example.is_file() else ""
    pattern = re.compile(rf"^{re.escape(key)}=.*$", re.MULTILINE)
    line = f"{key}={value}"
    if pattern.search(text):
        text = pattern.sub(line, text)
    else:
        if text and not text.endswith("\n"):
            text += "\n"
        text += line + "\n"
    path.write_text(text, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate or rotate a per-role interview access key. Prints the private link once."
    )
    parser.add_argument("--role", required=True, choices=ROLES)
    parser.add_argument(
        "--site-url",
        default=os.environ.get("SITE_PUBLIC_URL", "https://www.storentechai.com"),
        help="Public site origin used in the printed link.",
    )
    parser.add_argument(
        "--write-env",
        action="store_true",
        help="Write only the hash into services/exec-interview/.env. Never writes the raw key.",
    )
    parser.add_argument(
        "--revoke",
        action="store_true",
        help="Close this role and burn its current key instead of generating a new one.",
    )
    args = parser.parse_args()
    if not is_role(args.role):
        raise SystemExit("unknown role")
    if args.revoke:
        from scripts.revoke_key import main as revoke_main
        import sys

        sys.argv = ["revoke_key", "--role", args.role]
        revoke_main()
        return

    raw = generate_key()
    digest = hash_key(raw)
    site = args.site_url.rstrip("/")
    link = f"{site}/{args.role}#k={raw}"
    env_key = f"INTERVIEW_KEY_HASH_{args.role.upper()}"

    if args.write_env:
        _upsert_env(ENV_PATH, env_key, digest)

    print(f"Role: {args.role}")
    print(f"{env_key}={digest}")
    print(f"Private link: {link}")
    print("The raw key is not stored. Save the private link now.")


if __name__ == "__main__":
    main()
