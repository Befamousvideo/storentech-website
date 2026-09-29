from __future__ import annotations

import hashlib
import hmac
import secrets
from dataclasses import dataclass

from app.roles import ROLES, Role


def hash_key(raw: str) -> str:
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def generate_key() -> str:
    return secrets.token_urlsafe(32)


@dataclass(frozen=True)
class KeyMatch:
    role: Role
    revoked: bool


def match_role(
    raw_key: str,
    hashes: dict[Role, str],
    revoked_hashes: dict[str, Role] | None = None,
) -> KeyMatch | None:
    """Return the role for a raw key using a constant-time compare against every hash."""
    revoked_hashes = revoked_hashes or {}
    dummy = hash_key("not-a-configured-key")
    if not raw_key:
        hmac.compare_digest(dummy, dummy)
        return None

    candidate = hash_key(raw_key)
    matched: Role | None = None
    revoked_match: Role | None = None
    for role in ROLES:
        stored = hashes.get(role)
        if stored is None:
            hmac.compare_digest(candidate, dummy)
            continue
        if hmac.compare_digest(candidate, stored):
            matched = role
    for stored, role in revoked_hashes.items():
        if hmac.compare_digest(candidate, stored):
            revoked_match = role
    if revoked_match is not None:
        return KeyMatch(role=revoked_match, revoked=True)
    if matched is not None:
        return KeyMatch(role=matched, revoked=False)
    return None
