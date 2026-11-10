import { hasPrivacyOptOut } from "@/lib/ad-consent";

export const GA_MEASUREMENT_ID = "G-HXZTCSVJ8F" as const;

export function isProductionAnalyticsEnv(
  env: {
    VERCEL_ENV?: string;
    NEXT_PUBLIC_VERCEL_ENV?: string;
  } = {
    VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
) {
  return (
    env.VERCEL_ENV === "production" ||
    env.NEXT_PUBLIC_VERCEL_ENV === "production"
  );
}

export function mayLoadGoogleAnalytics({
  storedChoice,
  globalPrivacyControl,
}: {
  storedChoice?: boolean | null;
  globalPrivacyControl?: boolean;
} = {}) {
  return !hasPrivacyOptOut({ storedChoice, globalPrivacyControl });
}

type Gtag = (...args: unknown[]) => void;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  if (params === undefined) {
    gtag("event", name);
    return;
  }
  gtag("event", name, params);
}

export function trackGenerateLead() {
  trackEvent("generate_lead");
}

export function trackOpportunityCtaClick() {
  trackEvent("opportunity_cta_click");
}
