import { describe, expect, it } from "vitest";
import {
  INTERVIEW_CRAWLER_AGENTS,
  INTERVIEW_PATHS,
  INTERVIEW_ROBOTS_TAG,
} from "@/lib/interview-paths";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("interview crawler blocks", () => {
  it("uses the full X-Robots-Tag token list", () => {
    expect(INTERVIEW_ROBOTS_TAG).toBe(
      "noindex, nofollow, noarchive, nosnippet, noimageindex",
    );
  });

  it("disallows interview paths for * and named Google/AI crawlers", () => {
    const doc = robots();
    const rules = Array.isArray(doc.rules) ? doc.rules : [doc.rules];
    const star = rules.find((rule) => rule.userAgent === "*");
    expect(star?.disallow).toEqual(expect.arrayContaining([...INTERVIEW_PATHS]));

    for (const agent of INTERVIEW_CRAWLER_AGENTS) {
      const rule = rules.find((item) => item.userAgent === agent);
      expect(rule, `${agent} should have an explicit robots rule`).toBeTruthy();
      expect(rule?.disallow).toEqual([...INTERVIEW_PATHS]);
    }
  });

  it("keeps interview routes out of the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const path of INTERVIEW_PATHS) {
      expect(urls.some((url) => url.endsWith(path))).toBe(false);
    }
  });
});
