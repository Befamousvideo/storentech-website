from typing import Literal

Role = Literal["ceo", "cfo", "ops"]
ROLES: tuple[Role, ...] = ("ceo", "cfo", "ops")


def is_role(value: str) -> bool:
    return value in ROLES
