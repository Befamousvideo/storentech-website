"use client";

import { useSearchParams } from "next/navigation";
import { buildAdLandingLeadHref } from "@/lib/ad-landing-lead";
import type { AdLandingVertical } from "@/lib/ad-landing-routes";

export function AdLandingLeadCta({
  vertical,
  specialty,
  label,
}: {
  vertical: AdLandingVertical;
  specialty?: string;
  label: string;
}) {
  const searchParams = useSearchParams();
  const href = buildAdLandingLeadHref({
    vertical,
    specialty,
    search: searchParams,
  });

  return (
    <a className="btn btn-solid" href={href} rel="noopener noreferrer">
      {label}
    </a>
  );
}
