"use client";

import type { ReactNode } from "react";
import { trackInterviewCtaClick } from "@/lib/analytics";
import { INTERVIEW_CTA_ATTR, interviewCtaHref } from "@/lib/site";

type InterviewLinkProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function InterviewLink({
  className,
  children,
  onClick,
}: InterviewLinkProps) {
  return (
    <a
      className={className}
      href={interviewCtaHref}
      data-cta={INTERVIEW_CTA_ATTR}
      onClick={() => {
        trackInterviewCtaClick();
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
