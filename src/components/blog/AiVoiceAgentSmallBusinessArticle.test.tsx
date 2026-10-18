import { existsSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiVoiceAgentSmallBusinessArticle } from "@/components/blog/AiVoiceAgentSmallBusinessArticle";
import {
  aiVoiceAgentSmallBusinessFaqs,
  blogPosts,
  getPost,
  postUrl,
} from "@/lib/blog";

const slug = "ai-voice-agent-small-business";
const post = getPost(slug);

describe("ai voice agent small business blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.title).toBe(
      "What a Voice Agent Can Do for a Small Business: Answer, Book, Sell",
    );
    expect(post?.metaTitle).toBe(
      "Voice Agent for Small Business: Answer, Book, Sell | StorenTech AI",
    );
    expect(post?.description).toBe(
      "An AI voice agent can answer every call, book appointments and handle sales questions for contractors and field service firms, while your team owns the customer.",
    );
    expect(post?.datePublished).toBe("2026-10-21");
    expect(post?.faqs).toEqual(aiVoiceAgentSmallBusinessFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[0]?.slug).toBe(slug);
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
      "/blog/ai-voice-agent-small-business.webp",
    );
    expect(JSON.stringify(meta.twitter)).toContain(
      "/blog/ai-voice-agent-small-business.webp",
    );
  });

  it("appears in the sitemap and renders without draft notes or contact info", () => {
    expect(sitemap().map((entry) => entry.url)).toContain(postUrl(slug));
    const { container } = render(
      <AiVoiceAgentSmallBusinessArticle post={post!} />,
    );
    const text = container.textContent ?? "";
    expect(text).toContain(
      "A voice agent that knows your business and never runs out of patience turns missed calls into booked jobs.",
    );
    expect(text).not.toMatch(/DRAFT|Tony Traffic|DO NOT PUBLISH|Mary Marketer/);
    expect(text).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(text).not.toMatch(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute("alt", post?.hero?.alt);
  });
});
