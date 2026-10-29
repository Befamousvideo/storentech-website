import { existsSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { WhenAiAgentsDontStopArticle } from "@/components/blog/WhenAiAgentsDontStopArticle";
import { blogPosts, getPost, postUrl, whenAiAgentsDontStopFaqs } from "@/lib/blog";

const post = getPost("when-ai-agents-dont-stop");

describe("When AI agents don't stop blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.title).toBe(
      "When AI Agents Don't Stop: What Anthropic's Report Means for Your Business",
    );
    expect(post?.description).toBe(
      "AI agents can take actions nobody intended, like submitting the wrong form. Here's what Anthropic's Oct 9 report means for small business owners.",
    );
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-10-12");
    expect(post?.faqs).toEqual(whenAiAgentsDontStopFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[7]?.slug).toBe("when-ai-agents-dont-stop");
  });

  it("ships the 1600x900 header in webp and avif", () => {
    expect(post?.hero?.width).toBe(1600);
    expect(post?.hero?.height).toBe(900);
    for (const file of [post?.hero?.webp, post?.hero?.avif]) {
      expect(existsSync(join(process.cwd(), "public", file ?? "missing"))).toBe(true);
    }
  });

  it("uses the header as the OG and Twitter image", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "when-ai-agents-dont-stop" }),
    });
    expect(JSON.stringify(meta.openGraph)).toContain("/blog/when-ai-agents-dont-stop.webp");
    expect(JSON.stringify(meta.twitter)).toContain("/blog/when-ai-agents-dont-stop.webp");
  });

  it("appears in the sitemap and renders without draft notes", () => {
    expect(sitemap().map((entry) => entry.url)).toContain(postUrl("when-ai-agents-dont-stop"));
    const { container } = render(<WhenAiAgentsDontStopArticle post={post!} />);
    const text = container.textContent ?? "";
    expect(text).toContain("an AI agent should hit a wall, not find a way around it.");
    expect(text).not.toMatch(/DRAFT|Tony Traffic|DO NOT PUBLISH/);
  });
});
