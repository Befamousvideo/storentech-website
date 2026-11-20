"use client";

import type { ReactNode } from "react";
import {
  trackInterviewCtaClick,
  trackOpportunityCtaClick,
} from "@/lib/analytics";
import { INTERVIEW_CTA_ATTR, interviewCtaHref } from "@/lib/site";

type InterviewLinkProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  analyticsEvent?: "opportunity_cta_click";
};

export function InterviewLink({
  className,
  children,
  onClick,
  analyticsEvent,
}: InterviewLinkProps) {
  return (
    <a
      className={className}
      href={interviewCtaHref}
      data-cta={INTERVIEW_CTA_ATTR}
      onClick={() => {
        trackInterviewCtaClick();
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
