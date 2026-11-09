import type { AdLandingVertical } from "@/lib/ad-landing-routes";

export const DEFAULT_ONB1_LEAD_URL = "https://onboarding.storentechai.com";

/** Intended /law intake route. Unresolved (NXDOMAIN) — do not use as a live href. */
export const LAW_INTAKE_URL =
  "https://onboarding.storentechai.com/?vertical=law&src=ad" as const;

/**
 * Flip to true once LAW_INTAKE_URL is verified. That enables the live href
 * and removes the preview-only hold note. Keep false while the host is NXDOMAIN.
 */
export const LAW_INTAKE_READY = false;

export function resolveOnb1LeadUrl(
  raw: string | undefined = process.env.NEXT_PUBLIC_ONB1_LEAD_URL,
) {
  const candidate = raw?.trim();
  if (!candidate) return DEFAULT_ONB1_LEAD_URL;
  try {
    return new URL(candidate).toString();
  } catch {
    return DEFAULT_ONB1_LEAD_URL;
  }
}

export function buildAdLandingLeadHref({
  vertical,
  specialty,
  search,
}: {
  vertical: AdLandingVertical;
  specialty?: string;
  search?: string | URLSearchParams;
}) {
  const url = new URL(resolveOnb1LeadUrl());
  url.searchParams.set("vertical", vertical);
  if (specialty) {
    url.searchParams.set("specialty", specialty);
  }
  url.searchParams.set("src", "ad");

  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;
  if (params) {
    for (const [key, value] of params.entries()) {
      if (key.startsWith("utm_") && value) {
        url.searchParams.set(key, value);
      }
    }
  }

  return url.toString();
}
