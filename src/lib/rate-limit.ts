type Bucket = number[];

const buckets = new Map<string, Bucket>();

export const FREE_MAP_RATE_LIMIT = {
  windowMs: 10 * 60 * 1000,
  max: 5,
} as const;

export function resetRateLimit() {
  buckets.clear();
}

export function checkRateLimit(
  key: string,
  windowMs = FREE_MAP_RATE_LIMIT.windowMs,
  max = FREE_MAP_RATE_LIMIT.max,
) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= max) {
    buckets.set(key, recent);
    const retryAfterSec = Math.max(
      1,
      Math.ceil((recent[0] + windowMs - now) / 1000),
    );
    return { ok: false as const, retryAfterSec };
  }
  recent.push(now);
  buckets.set(key, recent);
  return { ok: true as const };
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
