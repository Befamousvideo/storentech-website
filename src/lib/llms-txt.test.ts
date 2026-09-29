import { describe, expect, it } from "vitest";
import { GET } from "@/app/llms.txt/route";
import { blogPosts, postPath } from "@/lib/blog";
import { LLMS_ORIGIN, llmsTxt } from "@/lib/llms-txt";

const PRIVATE_PATHS = ["/ceo", "/cfo", "/ops", "/pay", "/redo", "/api"];

describe("llms.txt", () => {
  const text = llmsTxt();

  it("follows the llms.txt convention with existing site copy only", () => {
    expect(text.startsWith("# StorenTech AI\n")).toBe(true);
    expect(text).toContain(
      "> StorenTech AI is a full-service AI agency in Orange County, CA that starts every client engagement with an AI Opportunity Map",
    );
    expect(text).toContain("## Pages");
    expect(text).toContain("## Blog");
  });

  it("lists the live marketing pages and each live post on the www origin", () => {
    const required = [
      LLMS_ORIGIN,
      `${LLMS_ORIGIN}/blog`,
      `${LLMS_ORIGIN}/about`,
      `${LLMS_ORIGIN}/contact`,
      `${LLMS_ORIGIN}/roia`,
      `${LLMS_ORIGIN}/work`,
      `${LLMS_ORIGIN}/how-it-works`,
      ...blogPosts.map((post) => `${LLMS_ORIGIN}${postPath(post.slug)}`),
    ];
    for (const url of required) {
      expect(text).toContain(url);
    }
    expect(text).not.toContain("https://storentech.com");
  });

  it("keeps private, payment, and API paths out of the file", () => {
    for (const path of PRIVATE_PATHS) {
      expect(text).not.toContain(path);
    }
  });

  it("has no scrapeable phone, email, payment PII, prices, or banned terms", () => {
    expect(text).not.toContain("tel:");
    expect(text).not.toContain("mailto:");
    expect(text).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(text).not.toMatch(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    expect(text).not.toMatch(/\$[\d,]+/);
    expect(text).not.toContain("buy.stripe.com");
    expect(text.toLowerCase()).not.toContain(["gr", "ok"].join(""));
    expect(text).not.toMatch(/ROIA/);
    expect(text).not.toMatch(/Blueprint/i);
  });

  it("serves text/plain from the route handler", async () => {
    const response = GET();
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );
    await expect(response.text()).resolves.toBe(text);
  });
});
