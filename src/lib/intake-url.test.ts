import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import {
  BOOKING_CTA_HREF,
  DEFAULT_INTERVIEW_URL,
  INTERVIEW_UTM,
  site,
  withInterviewUtm,
} from "@/lib/site";

/** Retired Red O staff interview form — must not appear in public surfaces. */
const PRIVATE_FORM_ID = Buffer.from(
  "MUZBSXBRTFNjak9hOGZGeXFSTFJBbU95RE50azdvRkxsVndHd05keU1MN1ZRTnZXSVV0bHNYUmc=",
  "base64",
).toString("utf8");

const SCAN_ROOTS = [
  ".env.example",
  "public",
  "src",
  "next.config.ts",
  "vercel.json",
  "README.md",
];

const SKIP_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "services",
]);

function collectFiles(root: string): string[] {
  const abs = join(process.cwd(), root);
  if (!statSync(abs, { throwIfNoEntry: false })?.isDirectory()) {
    return [abs];
  }

  const out: string[] = [];
  for (const name of readdirSync(abs)) {
    if (SKIP_DIRS.has(name)) continue;
    const path = join(abs, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      out.push(...collectFiles(relative(process.cwd(), path)));
    } else {
      out.push(path);
    }
  }
  return out;
}

describe("intake CTA URL", () => {
  it("defaults to the Google Calendar booking link used on /for pages", () => {
    expect(site.intakeUrl).toBe(BOOKING_CTA_HREF);
    expect(site.intakeUrl).toBe("https://calendar.app.google/7KkoctujrZtnzhjU7");
  });

  it("defaults the public interview CTA to the ONB1 demo URL with UTM params", () => {
    expect(site.interviewUrl).toBe(DEFAULT_INTERVIEW_URL);
    expect(site.interviewUrl).toBe("https://onb1-demo.vercel.app/i/storentech");
    expect(site.interviewCtaHref).toBe(withInterviewUtm(DEFAULT_INTERVIEW_URL));
    expect(site.interviewCtaHref).toContain("utm_source=storentech-website");
    expect(site.interviewCtaHref).toContain("utm_medium=cta");
    expect(site.interviewCtaHref).toContain("utm_campaign=onb1-interview");
    expect(INTERVIEW_UTM).toEqual({
      utm_source: "storentech-website",
      utm_medium: "cta",
      utm_campaign: "onb1-interview",
    });
    expect(readFileSync(join(process.cwd(), ".env.example"), "utf8")).toContain(
      "NEXT_PUBLIC_INTERVIEW_URL=https://onb1-demo.vercel.app/i/storentech",
    );
  });

  it("does not reference the retired private Google Form anywhere in the repo", () => {
    const files = SCAN_ROOTS.flatMap((root) => collectFiles(root));

    for (const file of files) {
      if (file.endsWith("intake-url.test.ts")) continue;
      const text = readFileSync(file, "utf8");
      expect(text, relative(process.cwd(), file)).not.toContain(PRIVATE_FORM_ID);
      expect(text, relative(process.cwd(), file)).not.toMatch(
        /docs\.google\.com\/forms\/d\/e\//,
      );
    }
  });
});
