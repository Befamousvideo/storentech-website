import { offer } from "@/lib/site";

function isTruthy(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "on" || normalized === "yes";
}

/**
 * Client-safe flag. Preview builds set NEXT_PUBLIC_AI_CHAT_ENABLED.
 * Production builds must leave it unset so the widget stays on the
 * local scripted FAQ matcher.
 */
export const PUBLIC_AI_CHAT_ENABLED = isTruthy(
  process.env.NEXT_PUBLIC_AI_CHAT_ENABLED,
);

export const CHAT_INTERVIEW_CTA = offer.interviewCta;
export const CHAT_BOOK_CTA = offer.bookingCta;
