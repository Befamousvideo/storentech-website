import { existsSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiPullReportsFromVendorPortalsArticle } from "@/components/blog/AiPullReportsFromVendorPortalsArticle";
import {
  aiPullReportsFromVendorPortalsFaqs,
  blogPosts,
  getPost,
  postUrl,
} from "@/lib/blog";

const slug = "ai-pull-reports-from-vendor-portals";
const post = getPost(slug);

describe("AI pull reports from vendor portals blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.title).toBe(
      "Stop Losing Fridays to Portals. How AI Can Pull Reports From Websites That Don't Connect to Anything",
    );
    expect(post?.metaTitle).toBe(
      "AI That Pulls Reports From Vendor Portals | StorenTech AI",
    );
    expect(post?.description).toBe(
      "If your team logs into vendor websites to copy numbers into spreadsheets, AI can now do the reading while a person approves anything that changes.",
    );
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-10-17");
    expect(post?.faqs).toEqual(aiPullReportsFromVendorPortalsFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[6]?.slug).toBe(slug);
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
      "/blog/ai-pull-reports-from-vendor-portals.webp",
    );
    expect(JSON.stringify(meta.twitter)).toContain(
      "/blog/ai-pull-reports-from-vendor-portals.webp",
    );
  });

  it("appears in the sitemap and renders without draft notes or contact info", () => {
    expect(sitemap().map((entry) => entry.url)).toContain(postUrl(slug));
    const { container } = render(
      <AiPullReportsFromVendorPortalsArticle post={post!} />,
    );
    const text = container.textContent ?? "";
    expect(text).toContain(
      "Let AI do the reading. Keep a person on the approve button.",
    );
    expect(text).not.toMatch(/DRAFT|Tony Traffic|DO NOT PUBLISH|BOB BLOCK/);
    expect(text).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(text).not.toMatch(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute("alt", post?.hero?.alt);
  });
});
