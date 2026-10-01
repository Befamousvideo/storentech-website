import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { site } from "@/lib/site";

const HOMEPAGE = "https://www.storentechai.com/";
const STRIPE = "https://buy.stripe.com/6oU14ngeE5w1a8wd7RdjO00";
const INTERVIEW_SOURCES = [
  "/ceo",
  "/ceo/:path*",
  "/cfo",
  "/cfo/:path*",
  "/ops",
  "/ops/:path*",
] as const;

type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
  has?: { type: string; value: string }[];
};

function isInterviewSource(source: string) {
  return INTERVIEW_SOURCES.includes(
    source as (typeof INTERVIEW_SOURCES)[number],
  );
}

function isPayHostRoot(rule: RedirectRule) {
  return (
    rule.source === "/" &&
    Boolean(rule.has?.some((item) => item.value.includes("pay.storentechai.com")))
  );
}

function assertInterviewBeatsPayHost(label: string, redirects: RedirectRule[]) {
  const firstPayHost = redirects.findIndex(isPayHostRoot);
  const firstInterview = redirects.findIndex((rule) =>
    isInterviewSource(rule.source),
  );

  for (const source of INTERVIEW_SOURCES) {
    expect(
      redirects.find((rule) => rule.source === source),
      `${label} ${source}`,
    ).toEqual({
      source,
      destination: HOMEPAGE,
      permanent: true,
    });
  }
  expect(firstInterview, `${label} interview before pay-host /`).toBeGreaterThanOrEqual(
    0,
  );
  expect(firstPayHost, `${label} pay-host /`).toBeGreaterThan(firstInterview);
}

function assertPayUnchanged(label: string, redirects: RedirectRule[]) {
  expect(
    redirects.find((rule) => rule.source === "/pay"),
    `${label} /pay`,
  ).toMatchObject({
    source: "/pay",
    destination: STRIPE,
    permanent: false,
  });
  expect(
    redirects.find((rule) => rule.source === "/pay/:path*"),
    `${label} /pay/:path*`,
  ).toMatchObject({
    source: "/pay/:path*",
    destination: STRIPE,
    permanent: false,
  });
}

describe("legacy interview and /pay redirects", () => {
  it("permanently sends /ceo /cfo /ops to the www homepage in vercel.json and next.config", async () => {
    const vercel = JSON.parse(
      readFileSync(join(process.cwd(), "vercel.json"), "utf8"),
    ) as { redirects: RedirectRule[] };
    const nextRedirects = (await nextConfig.redirects?.()) as RedirectRule[];

    assertInterviewBeatsPayHost("vercel.json", vercel.redirects);
    assertInterviewBeatsPayHost("next.config.ts", nextRedirects);
  });

  it("keeps /pay on the unchanged Stripe Payment Link", async () => {
    const vercel = JSON.parse(
      readFileSync(join(process.cwd(), "vercel.json"), "utf8"),
    ) as { redirects: RedirectRule[] };
    const nextRedirects = (await nextConfig.redirects?.()) as RedirectRule[];

    expect(site.stripe.roiPaymentLink).toBe(STRIPE);
    assertPayUnchanged("vercel.json", vercel.redirects);
    assertPayUnchanged("next.config.ts", nextRedirects);
  });
});
