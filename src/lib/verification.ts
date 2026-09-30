import type { Metadata } from "next";

function nonEmpty(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Search-engine verification tags. Only emit a tag when its env var is set
 * to a non-empty value — never output empty google-site-verification or
 * msvalidate.01 tags.
 */
export function verificationMetadata(
  env: Record<string, string | undefined> = process.env,
): Metadata["verification"] | undefined {
  const google = nonEmpty(env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION);
  const bing = nonEmpty(env.NEXT_PUBLIC_BING_SITE_VERIFICATION);

  if (!google && !bing) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}
