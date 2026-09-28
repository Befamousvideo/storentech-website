from __future__ import annotations

import argparse
import asyncio
import os
import re
from pathlib import Path

from app.config import load_settings
from app.db import PostgresStore
from app.roles import ROLES, Role, is_role
from app.store import MemoryStore, Store


ENV_PATH = Path(__file__).resolve().parent.parent / ".env"


def _clear_env_hash(path: Path, key: str) -> None:
    if not path.is_file():
        return
    text = path.read_text(encoding="utf-8")
    pattern = re.compile(rf"^{re.escape(key)}=.*$", re.MULTILINE)
    if pattern.search(text):
        path.write_text(pattern.sub(f"{key}=", text), encoding="utf-8")


async def _store(settings) -> Store:
    if settings.database_url:
        store = PostgresStore(settings.database_url)
        await store.connect()
        return store
    return MemoryStore()


async def revoke_roles(roles: list[Role], clear_env: bool) -> None:
    settings = load_settings()
    store = await _store(settings)
    try:
        for role in roles:
            digest = settings.key_hashes.get(role, "")
            await store.revoke_key(settings.company_code, role, digest)
            session = await store.get_session(settings.company_code, role)
            status = session.status if session else "closed"
            env_key = f"INTERVIEW_KEY_HASH_{role.upper()}"
            if clear_env:
                _clear_env_hash(ENV_PATH, env_key)
            print(f"Role {role} is {status}. The old private link no longer opens the form.")
            if digest:
                print(f"Revoked {env_key}.")
            else:
                print(f"{env_key} was empty; role marked closed anyway.")
    finally:
        await store.close()
    print("Answers stay in local Postgres. Recreate the API container after clearing .env hashes.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Revoke or close a role so its private link stops working."
    )
    parser.add_argument("--role", choices=ROLES, help="One role to close.")
    parser.add_argument("--all", action="store_true", help="Close ceo, cfo, and ops.")
    parser.add_argument(
        "--clear-env",
        action="store_true",
        help="Blank INTERVIEW_KEY_HASH_* in services/exec-interview/.env. Never prints the raw key.",
    )
    args = parser.parse_args()
    roles: list[Role]
    if args.all:
        roles = list(ROLES)
    elif args.role and is_role(args.role):
        roles = [args.role]
    else:
        raise SystemExit("Pass --role ceo|cfo|ops or --all")
    if not os.environ.get("DATABASE_URL") and not load_settings().database_url:
        print("No DATABASE_URL; revocation is in-memory only and will not survive restart.")
    asyncio.run(revoke_roles(roles, args.clear_env))


if __name__ == "__main__":
    main()
