import { existsSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiModelRetirementNov30BusinessChecklistArticle } from "@/components/blog/AiModelRetirementNov30BusinessChecklistArticle";
import {
  aiModelRetirementNov30BusinessChecklistFaqs,
  blogPosts,
  getPost,
  postUrl,
} from "@/lib/blog";

const slug = "ai-model-retirement-nov-30-business-checklist";
const post = getPost(slug);

describe("AI model retirement Nov 30 business checklist blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.title).toBe(
      "One Popular AI Model Retires Nov. 30. A 15-Minute Check for Business Owners",
    );
    expect(post?.metaTitle).toBe(
      "AI Model Retiring Nov. 30? A Business Checklist | StorenTech AI",
    );
    expect(post?.description).toBe(
      "Claude Sonnet 4.5 retires Nov. 30, 2026 on Anthropic's API. A 15-minute check to see if your chatbot, assistant or automation depends on it.",
    );
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-10-15");
    expect(post?.faqs).toEqual(aiModelRetirementNov30BusinessChecklistFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[5]?.slug).toBe(slug);
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
      params: Promise.resolve({ slug }),
    });
    expect(JSON.stringify(meta.openGraph)).toContain(
      "/blog/ai-model-retirement-nov-30-business-checklist.webp",
    );
    expect(JSON.stringify(meta.twitter)).toContain(
      "/blog/ai-model-retirement-nov-30-business-checklist.webp",
    );
  });

  it("appears in the sitemap and renders without draft notes", () => {
    expect(sitemap().map((entry) => entry.url)).toContain(postUrl(slug));
    const { container } = render(
      <AiModelRetirementNov30BusinessChecklistArticle post={post!} />,
    );
    const text = container.textContent ?? "";
    expect(text).toContain("Swapping an AI model is like swapping an employee");
    expect(text).not.toMatch(/DRAFT|Tony Traffic|DO NOT PUBLISH|BOB BLOCK/);
    expect(text).toContain("Start your AI Opportunity Map");
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute("alt", post?.hero?.alt);
  });
});
