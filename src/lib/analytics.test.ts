import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AD_RETARGETING_COOKIE_NAME,
  writeAdRetargetingChoice,
} from "@/lib/ad-consent";
import {
  GA_MEASUREMENT_ID,
  isProductionAnalyticsEnv,
  mayLoadGoogleAnalytics,
  trackEvent,
  trackGenerateLead,
  trackOpportunityCtaClick,
} from "@/lib/analytics";

afterEach(() => {
  window.localStorage.clear();
  document.cookie = `${AD_RETARGETING_COOKIE_NAME}=; Path=/; Max-Age=0`;
  vi.unstubAllGlobals();
});

describe("GA production env gate", () => {
  it("is off unless Vercel env is production", () => {
    expect(isProductionAnalyticsEnv({})).toBe(false);
    expect(isProductionAnalyticsEnv({ VERCEL_ENV: "preview" })).toBe(false);
    expect(isProductionAnalyticsEnv({ VERCEL_ENV: "development" })).toBe(false);
    expect(isProductionAnalyticsEnv({ VERCEL_ENV: "production" })).toBe(true);
    expect(
      isProductionAnalyticsEnv({ NEXT_PUBLIC_VERCEL_ENV: "production" }),
    ).toBe(true);
  });
});

describe("mayLoadGoogleAnalytics", () => {
  it("defaults to on when there is no stored choice and no GPC", () => {
    expect(
      mayLoadGoogleAnalytics({
        storedChoice: null,
        globalPrivacyControl: false,
      }),
    ).toBe(true);
  });

  it("is off when Global Privacy Control is set", () => {
    expect(
      mayLoadGoogleAnalytics({
        storedChoice: true,
        globalPrivacyControl: true,
      }),
    ).toBe(false);
  });

  it("is off when the visitor turns the existing opt-out on", () => {
    writeAdRetargetingChoice(false);
    expect(mayLoadGoogleAnalytics({ globalPrivacyControl: false })).toBe(false);
  });

  it("still loads on /privacy and /contact unlike ad tags", () => {
    expect(
      mayLoadGoogleAnalytics({
        storedChoice: true,
        globalPrivacyControl: false,
      }),
    ).toBe(true);
  });
});

describe("GA event helper", () => {
  it("no-ops when gtag is absent", () => {
    expect(() => trackGenerateLead()).not.toThrow();
    expect(() => trackOpportunityCtaClick()).not.toThrow();
  });

  it("sends named events with no PII params", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);

    trackGenerateLead();
    trackOpportunityCtaClick();
    trackEvent("generate_lead");

    expect(gtag).toHaveBeenCalledWith("event", "generate_lead");
    expect(gtag).toHaveBeenCalledWith("event", "opportunity_cta_click");
    for (const args of gtag.mock.calls) {
      expect(JSON.stringify(args)).not.toMatch(/email|phone|name/i);
    }
    expect(GA_MEASUREMENT_ID).toBe("G-HXZTCSVJ8F");
  });

  it("wires generate_lead and opportunity_cta_click without PII params", () => {
    const contactSource = readFileSync(
      join(process.cwd(), "src/components/ContactForm.tsx"),
      "utf8",
    );
    const opportunitySource = readFileSync(
      join(process.cwd(), "src/app/opportunity/page.tsx"),
      "utf8",
    );
    const homeSource = readFileSync(
      join(process.cwd(), "src/app/page.tsx"),
      "utf8",
    );

    expect(contactSource).toContain("trackGenerateLead()");
    expect(contactSource).not.toContain("trackGenerateLead({");
    expect(opportunitySource).toContain(
      'analyticsEvent="opportunity_cta_click"',
    );
    expect(homeSource).not.toContain("analyticsEvent");
  });
});
