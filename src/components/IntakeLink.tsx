"use client";

import type { ReactNode } from "react";
import { trackOpportunityCtaClick } from "@/lib/analytics";
import { site } from "@/lib/site";

type IntakeLinkProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  analyticsEvent?: "opportunity_cta_click";
};

export function IntakeLink({
  className,
  children,
  onClick,
  analyticsEvent,
}: IntakeLinkProps) {
  return (
    <a
      className={className}
      href={site.intakeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (analyticsEvent === "opportunity_cta_click") {
          trackOpportunityCtaClick();
        }
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
