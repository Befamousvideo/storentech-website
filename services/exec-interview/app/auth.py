from __future__ import annotations

import hashlib
import hmac
import secrets

from app.roles import ROLES, Role


def hash_key(raw: str) -> str:
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def generate_key() -> str:
    return secrets.token_urlsafe(32)


def match_role(raw_key: str, hashes: dict[Role, str]) -> Role | None:
    """Return the role for a raw key using a constant-time compare against every hash."""
    if not raw_key or not hashes:
        dummy = hash_key("not-a-configured-key")
        hmac.compare_digest(dummy, dummy)
        return None

    candidate = hash_key(raw_key)
    matched: Role | None = None
    for role in ROLES:
        stored = hashes.get(role)
        if stored is None:
            hmac.compare_digest(candidate, candidate)
            continue
        if hmac.compare_digest(candidate, stored):
            matched = role
    return matched
