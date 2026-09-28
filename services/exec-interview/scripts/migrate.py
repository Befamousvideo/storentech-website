from __future__ import annotations

import argparse
import asyncio
from urllib.parse import urlparse, urlunparse

import psycopg
from psycopg import sql

from app.config import load_settings
from app.db import SCHEMA_PATH


def _admin_url_for_database(admin_url: str, database: str) -> str:
    parsed = urlparse(admin_url)
    return urlunparse(parsed._replace(path=f"/{database}"))


async def provision(settings) -> None:
    if not settings.database_admin_url:
        raise SystemExit("DATABASE_ADMIN_URL is required for --provision")
    if not settings.database_password:
        raise SystemExit("DATABASE_PASSWORD is required for --provision")

    conn = await psycopg.AsyncConnection.connect(settings.database_admin_url, autocommit=True)
    try:
        row = await conn.execute(
            "SELECT 1 FROM pg_database WHERE datname = %s",
            (settings.database_name,),
        )
        if await row.fetchone() is None:
            await conn.execute(
                sql.SQL("CREATE DATABASE {}").format(sql.Identifier(settings.database_name))
            )
        role_row = await conn.execute(
            "SELECT 1 FROM pg_roles WHERE rolname = %s",
            (settings.database_user,),
        )
        if await role_row.fetchone() is None:
            await conn.execute(
                sql.SQL("CREATE ROLE {} LOGIN PASSWORD {}").format(
                    sql.Identifier(settings.database_user),
                    sql.Literal(settings.database_password),
                )
            )
        else:
            await conn.execute(
                sql.SQL("ALTER ROLE {} LOGIN PASSWORD {}").format(
                    sql.Identifier(settings.database_user),
                    sql.Literal(settings.database_password),
                )
            )
        await conn.execute(
            sql.SQL("GRANT CONNECT ON DATABASE {} TO {}").format(
                sql.Identifier(settings.database_name),
                sql.Identifier(settings.database_user),
            )
        )
    finally:
        await conn.close()

    db_admin = await psycopg.AsyncConnection.connect(
        _admin_url_for_database(settings.database_admin_url, settings.database_name),
        autocommit=True,
    )
    try:
        await db_admin.execute(
            sql.SQL("GRANT USAGE, CREATE ON SCHEMA public TO {}").format(
                sql.Identifier(settings.database_user)
            )
        )
        await db_admin.execute(
            sql.SQL(
                "GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO {}"
            ).format(sql.Identifier(settings.database_user))
        )
        await db_admin.execute(
            sql.SQL(
                "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO {}"
            ).format(sql.Identifier(settings.database_user))
        )
        await db_admin.execute(
            sql.SQL("GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO {}").format(
                sql.Identifier(settings.database_user)
            )
        )
    finally:
        await db_admin.close()


async def apply_schema(settings) -> None:
    if not settings.database_url:
        raise SystemExit("DATABASE_URL is required")
    sql = SCHEMA_PATH.read_text(encoding="utf-8")
    conn = await psycopg.AsyncConnection.connect(settings.database_url, autocommit=True)
    try:
        await conn.execute(sql)
    finally:
        await conn.close()


async def run(provision_first: bool) -> None:
    settings = load_settings()
    if provision_first:
        await provision(settings)
    await apply_schema(settings)
    print("Migration complete.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Idempotent exec_interviews migration.")
    parser.add_argument(
        "--provision",
        action="store_true",
        help="Create the database and least-privilege role using DATABASE_ADMIN_URL.",
    )
    args = parser.parse_args()
    asyncio.run(run(args.provision))


if __name__ == "__main__":
    main()
