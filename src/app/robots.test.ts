import { describe, expect, it } from "vitest";
import robots, { ROBOTS_DISALLOW_PATHS } from "@/app/robots";
import sitemap from "@/app/sitemap";
import { site } from "@/lib/site";

const CANONICAL_ORIGIN = "https://www.storentechai.com";
const RETIRED_INTERVIEW_PATHS = ["/ceo", "/cfo", "/ops"];

describe("robots disallow list", () => {
  it("disallows api and pay for * and has no named-bot rules", () => {
    const doc = robots();
    const rules = Array.isArray(doc.rules) ? doc.rules : [doc.rules];
    const expected = ["/api/", "/pay"];

    expect([...ROBOTS_DISALLOW_PATHS]).toEqual(expected);
    expect(expected).not.toContain("/redo");
    expect(expected).not.toContain("/break-glass");
    expect(expected).not.toEqual(
      expect.arrayContaining(RETIRED_INTERVIEW_PATHS),
    );

    expect(rules).toHaveLength(1);
    const star = rules.find((rule) => rule.userAgent === "*");
    expect(star?.disallow).toEqual(expected);
  });

  it("keeps retired interview routes out of the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const path of RETIRED_INTERVIEW_PATHS) {
      expect(urls.some((url) => url.endsWith(path))).toBe(false);
    }
    expect(urls.some((url) => url.includes("/redo"))).toBe(false);
    expect(urls.some((url) => url.includes("/break-glass"))).toBe(false);
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
