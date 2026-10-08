import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

const HOMEPAGE = "https://www.storentechai.com/";
const INTERVIEW_SOURCES = [
  "/ceo",
  "/ceo/:path*",
  "/cfo",
  "/cfo/:path*",
  "/ops",
  "/ops/:path*",
] as const;
const REDO_SOURCES = ["/redo", "/redo/:path*"] as const;
const PERMANENT_SOURCES = [...INTERVIEW_SOURCES, ...REDO_SOURCES] as const;
const OPPORTUNITY_SOURCES = [
  "/ai-opportunity-map",
  "/ai-opportunity-map/",
  "/map",
  "/map/",
  "/roia",
  "/roia/",
] as const;
const OPPORTUNITY_DESTINATION = "/opportunity";

type RedirectRule = {
  source: string;
  destination: string;
  permanent?: boolean;
  statusCode?: number;
  has?: { type: string; value: string }[];
};

function loadVercelRedirects() {
  return JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8"))
    .redirects as RedirectRule[];
}

function isPermanentSource(source: string) {
  return PERMANENT_SOURCES.includes(
    source as (typeof PERMANENT_SOURCES)[number],
  );
}

function isPayHostRoot(rule: RedirectRule) {
  return (
    rule.source === "/" &&
    Boolean(rule.has?.some((item) => item.value.includes("pay.storentechai.com")))
  );
}

function findRule(
  redirects: RedirectRule[],
  source: string,
  host?: string,
) {
  return redirects.find((rule) => {
    if (rule.source !== source) return false;
    if (!host) return !rule.has?.length;
    return rule.has?.some((item) => item.type === "host" && item.value === host);
  });
}

function assertPermanentBeforePay(label: string, redirects: RedirectRule[]) {
  const firstPayHost = redirects.findIndex(isPayHostRoot);
  const firstPayPath = redirects.findIndex(
    (rule) => rule.source === "/pay" || rule.source === "/pay/:path*",
  );
  const firstPermanent = redirects.findIndex((rule) =>
    isPermanentSource(rule.source),
  );
  const firstRedo = redirects.findIndex((rule) =>
    REDO_SOURCES.includes(rule.source as (typeof REDO_SOURCES)[number]),
  );

  for (const source of PERMANENT_SOURCES) {
    expect(
      redirects.find((rule) => rule.source === source),
      `${label} ${source}`,
    ).toEqual({
      source,
      destination: HOMEPAGE,
      permanent: true,
    });
  }
  expect(firstPermanent, `${label} 308 rules present`).toBeGreaterThanOrEqual(0);
  expect(firstRedo, `${label} /redo present`).toBeGreaterThanOrEqual(0);
  expect(firstPayPath, `${label} /pay after 308s`).toBeGreaterThan(firstPermanent);
  expect(firstPayHost, `${label} pay-host / after 308s`).toBeGreaterThan(
    firstPermanent,
  );
  expect(firstPayPath, `${label} /pay after /redo`).toBeGreaterThan(firstRedo);
  expect(firstPayHost, `${label} pay-host / after /redo`).toBeGreaterThan(
    firstRedo,
  );
}

function assertTemporaryHomepage(
  label: string,
  rule: RedirectRule | undefined,
) {
  expect(rule, label).toEqual(
    expect.objectContaining({
      destination: HOMEPAGE,
      permanent: false,
    }),
  );
}

function collectFiles(root: string, acc: string[] = []): string[] {
  const abs = join(process.cwd(), root);
  if (!existsSync(abs)) return acc;
  const stat = statSync(abs);
  if (stat.isFile()) {
    acc.push(abs);
    return acc;
  }
  for (const name of readdirSync(abs)) {
    const child = join(root, name);
    const childAbs = join(process.cwd(), child);
    if (statSync(childAbs).isDirectory()) {
      collectFiles(child, acc);
    } else if (/\.(?:ts|tsx|js|json|md)$/.test(name) && !/\.test\.(ts|tsx)$/.test(name)) {
      acc.push(childAbs);
    }
  }
  return acc;
}

describe("legacy interview, /redo, and /pay redirects", () => {
  it("permanently moves legacy map URLs to /opportunity in next.config and vercel.json", async () => {
    const vercel = loadVercelRedirects();
    const nextRedirects = (await nextConfig.redirects?.()) as RedirectRule[];

    for (const [label, redirects] of [
      ["vercel.json", vercel],
      ["next.config.ts", nextRedirects],
    ] as const) {
      for (const source of OPPORTUNITY_SOURCES) {
        expect(findRule(redirects, source), `${label} ${source}`).toEqual({
          source,
          destination: OPPORTUNITY_DESTINATION,
          statusCode: 301,
        });
      }
      expect(
        redirects.some((rule) => rule.destination === "/ai-opportunity-map"),
        `${label} has no hop through /ai-opportunity-map`,
      ).toBe(false);
      expect(
        redirects.some((rule) => rule.destination === "/map"),
        `${label} has no hop through /map`,
      ).toBe(false);
    }
  });

  it("permanently sends /ceo /cfo /ops and /redo to the www homepage before /pay", async () => {
    const vercel = loadVercelRedirects();
    const nextRedirects = (await nextConfig.redirects?.()) as RedirectRule[];

    assertPermanentBeforePay("vercel.json", vercel);
    assertPermanentBeforePay("next.config.ts", nextRedirects);
  });

  it("sends /pay, /pay/:path*, and pay-host roots to the homepage as 307", async () => {
    const vercel = loadVercelRedirects();
    const nextRedirects = (await nextConfig.redirects?.()) as RedirectRule[];

    for (const [label, redirects] of [
      ["vercel.json", vercel],
      ["next.config.ts", nextRedirects],
    ] as const) {
      assertTemporaryHomepage(`${label} /pay`, findRule(redirects, "/pay"));
      assertTemporaryHomepage(
        `${label} /pay/:path*`,
        findRule(redirects, "/pay/:path*"),
      );
      assertTemporaryHomepage(
        `${label} pay.storentechai.com /`,
        findRule(redirects, "/", "pay.storentechai.com"),
      );
      assertTemporaryHomepage(
        `${label} www.pay.storentechai.com /`,
        findRule(redirects, "/", "www.pay.storentechai.com"),
      );

      for (const rule of redirects) {
        if (
          OPPORTUNITY_SOURCES.includes(
            rule.source as (typeof OPPORTUNITY_SOURCES)[number],
          )
        ) {
          continue;
        }
        expect(rule.destination, `${label} ${rule.source}`).toBe(HOMEPAGE);
        expect(rule.destination).not.toContain("buy.stripe.com");
      }
    }
  });

  it("does not send config or middleware to the retired Payment Link", () => {
    const reachable = [
      "vercel.json",
      "next.config.ts",
      "src/middleware.ts",
    ].flatMap((root) => collectFiles(root));

    for (const file of reachable) {
      const text = readFileSync(file, "utf8");
      expect(text, relative(process.cwd(), file)).not.toContain("buy.stripe.com");
      expect(text, relative(process.cwd(), file)).not.toContain("roiPaymentLink");
    }
  });

  it("removes the /pay and /redo pages so config and middleware own the redirect", () => {
    expect(existsSync(join(process.cwd(), "src/app/pay/page.tsx"))).toBe(false);
    expect(existsSync(join(process.cwd(), "src/app/pay/PayRedirect.tsx"))).toBe(
      false,
    );
    expect(existsSync(join(process.cwd(), "src/app/redo/page.tsx"))).toBe(false);
  });

  it("serves the AI Opportunity Map at /opportunity, not the legacy paths", () => {
    expect(existsSync(join(process.cwd(), "src/app/opportunity/page.tsx"))).toBe(
      true,
    );
    expect(
      existsSync(join(process.cwd(), "src/app/ai-opportunity-map/page.tsx")),
    ).toBe(false);
    expect(existsSync(join(process.cwd(), "src/app/map/page.tsx"))).toBe(false);
    expect(existsSync(join(process.cwd(), "src/app/roia/page.tsx"))).toBe(false);
  });
});
