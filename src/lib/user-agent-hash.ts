import { createHash } from "node:crypto";

export function hashUserAgent(userAgent: string | null) {
  const value = userAgent?.trim();
  if (!value) return null;
  return createHash("sha256").update(value).digest("hex");
}
