import { existsSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { WhatShouldYourBusinessAiBeAllowedToDoArticle } from "@/components/blog/WhatShouldYourBusinessAiBeAllowedToDoArticle";
import {
  blogPosts,
  getPost,
  postUrl,
  whatShouldYourBusinessAiBeAllowedToDoFaqs,
} from "@/lib/blog";

const slug = "what-should-your-business-ai-be-allowed-to-do";
const post = getPost(slug);

describe("what should your business AI be allowed to do blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.title).toBe(
      "Before AI Clicks Submit: 4 Questions to Decide What Your Business AI Is Allowed to Do",
    );
    expect(post?.metaTitle).toBe(
      "Before AI Clicks Submit: 4 Questions | StorenTech AI",
    );
    expect(post?.description).toBe(
      "Before AI clicks a button for your business, answer 4 questions: what it can see, what it can change, what needs your yes, and who owns it.",
    );
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-10-17");
    expect(post?.faqs).toEqual(whatShouldYourBusinessAiBeAllowedToDoFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[2]?.slug).toBe(slug);
  });

  it("ships the 1600x900 header in webp and avif", () => {
    expect(post?.hero?.width).toBe(1600);
    expect(post?.hero?.height).toBe(900);
    for (const file of [post?.hero?.webp, post?.hero?.avif]) {
      expect(existsSync(join(process.cwd(), "public", file ?? "missing"))).toBe(
        true,
      );
    }
  });

  it("uses the header as the OG and Twitter image", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug }),
    });
    expect(JSON.stringify(meta.openGraph)).toContain(
      "/blog/what-should-your-business-ai-be-allowed-to-do.webp",
    );
    expect(JSON.stringify(meta.twitter)).toContain(
      "/blog/what-should-your-business-ai-be-allowed-to-do.webp",
    );
  });

  it("appears in the sitemap and renders without draft notes or contact info", () => {
    expect(sitemap().map((entry) => entry.url)).toContain(postUrl(slug));
    const { container } = render(
      <WhatShouldYourBusinessAiBeAllowedToDoArticle post={post!} />,
    );
    const text = container.textContent ?? "";
    expect(text).toContain(
      "Give every AI tool a job description: what it can see, what it can change, and what needs your yes.",
    );
    expect(text).not.toMatch(/DRAFT|Tony Traffic|DO NOT PUBLISH|Mary Marketer/);
    expect(text).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(text).not.toMatch(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute("alt", post?.hero?.alt);
  });
});
