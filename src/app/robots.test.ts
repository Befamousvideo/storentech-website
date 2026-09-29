import { describe, expect, it } from "vitest";
import {
  INTERVIEW_CRAWLER_AGENTS,
  INTERVIEW_PATHS,
  INTERVIEW_ROBOTS_TAG,
} from "@/lib/interview-paths";
import robots, { ROBOTS_DISALLOW_PATHS } from "@/app/robots";
import sitemap from "@/app/sitemap";
import { site } from "@/lib/site";

const CANONICAL_ORIGIN = "https://www.storentechai.com";

describe("interview crawler blocks", () => {
  it("uses the full X-Robots-Tag token list", () => {
    expect(INTERVIEW_ROBOTS_TAG).toBe(
      "noindex, nofollow, noarchive, nosnippet, noimageindex",
    );
  });

  it("disallows the full private list for * and every named crawler", () => {
    const doc = robots();
    const rules = Array.isArray(doc.rules) ? doc.rules : [doc.rules];
    const expected = [...ROBOTS_DISALLOW_PATHS];

    expect(expected).toEqual(
      expect.arrayContaining(["/api/", "/pay", "/redo", ...INTERVIEW_PATHS]),
    );

    const star = rules.find((rule) => rule.userAgent === "*");
    expect(star?.disallow).toEqual(expected);

    for (const agent of INTERVIEW_CRAWLER_AGENTS) {
      const rule = rules.find((item) => item.userAgent === agent);
      expect(rule, `${agent} should have an explicit robots rule`).toBeTruthy();
      expect(rule?.disallow).toEqual(expected);
    }
  });

  it("keeps interview routes out of the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const path of INTERVIEW_PATHS) {
      expect(urls.some((url) => url.endsWith(path))).toBe(false);
    }
  });
});

describe("canonical www.storentechai.com origin", () => {
  it("defaults site.url, robots Host/Sitemap, and sitemap locs to the www origin", () => {
    expect(site.url).toBe(CANONICAL_ORIGIN);

    const doc = robots();
    expect(doc.host).toBe(CANONICAL_ORIGIN);
    expect(doc.sitemap).toBe(`${CANONICAL_ORIGIN}/sitemap.xml`);

    const urls = sitemap().map((entry) => entry.url);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url.startsWith(`${CANONICAL_ORIGIN}/`) || url === CANONICAL_ORIGIN).toBe(
        true,
      );
      expect(url).not.toContain("https://storentech.com/");
    }
  });
});
