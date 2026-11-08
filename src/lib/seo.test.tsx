import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import HomePage from "@/app/page";
import { metadata as opportunityMetadata } from "@/app/opportunity/page";
import { metadata as privacyMetadata } from "@/app/privacy/page";
import { metadata as termsMetadata } from "@/app/terms/page";
import { SiteChrome } from "@/components/SiteChrome";
import { blogPosts, getPost, postPath } from "@/lib/blog";
import {
  RELATED_POST_COUNT,
  SITE_FALLBACK_OG_IMAGE,
  blogPostJsonLdImage,
  blogPostOgImages,
  organizationLd,
  relatedPostsFor,
  siteFallbackOgImages,
} from "@/lib/seo";
import { site } from "@/lib/site";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const placeholderPattern =
  /\bTODO\b|\bTBD\b|lorem ipsum|placeholder copy|\[insert|\bXXX\b/i;

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    usePathname: vi.fn(() => "/"),
  };
});

const SCHEDULED_UNMERGED_SLUGS = [
  "california-law-firm-ai-receptionist",
] as const;

function jsonLdBlocks(container: HTMLElement) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map(
    (node) => JSON.parse(node.textContent ?? "{}") as Record<string, unknown>,
  );
}

function topLevelTypes(blocks: Record<string, unknown>[]) {
  return blocks.flatMap((block) => {
    const type = block["@type"];
    return Array.isArray(type) ? type : [type];
  });
}

function assertNoPii(label: string, text: string) {
  expect(text, label).not.toContain("tel:");
  expect(text, label).not.toContain("mailto:");
  expect(text, label).not.toContain("buy.stripe.com");
  expect(text, label).not.toMatch(emailPattern);
  expect(text, label).not.toMatch(phonePattern);
}

describe("SEO-1: homepage canonical and Organization", () => {
  it("keeps the root layout self-canonical and does not invent homepage meta description", () => {
    const layoutSource = readFileSync(
      join(process.cwd(), "src/app/layout.tsx"),
      "utf8",
    );
    expect(layoutSource).toContain("canonical: \"/\"");
    expect(layoutSource).toContain("description: site.description");
    expect(layoutSource).not.toMatch(placeholderPattern);
  });

  it("renders one Organization schema on the homepage without duplicating types", () => {
    const { container } = render(<HomePage />);
    const blocks = jsonLdBlocks(container);
    const types = topLevelTypes(blocks);
    expect(types).toEqual(["Organization", "FAQPage"]);
    expect(new Set(types).size).toBe(types.length);
    expect(blocks.find((block) => block["@type"] === "Organization")).toEqual(
      organizationLd(),
    );
    expect(organizationLd().name).toBe("StorenTech AI");
    expect(organizationLd()).not.toHaveProperty("telephone");
    expect(organizationLd()).not.toHaveProperty("email");
    assertNoPii("homepage json-ld", JSON.stringify(blocks));
  });

  it("does not duplicate schema types when homepage chrome and page JSON-LD render together", () => {
    const { container } = render(
      <SiteChrome>
        <HomePage />
      </SiteChrome>,
    );
    const types = topLevelTypes(jsonLdBlocks(container));
    expect(types).toEqual([
      "LocalBusiness",
      "ProfessionalService",
      "Organization",
      "FAQPage",
    ]);
    expect(new Set(types).size).toBe(types.length);
  });
});

describe("SEO-1: Open Graph images", () => {
  it("uses the existing generated site image as the fallback", () => {
    expect(SITE_FALLBACK_OG_IMAGE.url).toBe("/opengraph-image");
    expect(siteFallbackOgImages()).toEqual([
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "StorenTech AI",
        type: "image/png",
      },
    ]);
  });

  it("adds the site fallback og:image on opportunity, privacy, and terms", () => {
    expect(opportunityMetadata.openGraph?.images).toEqual(siteFallbackOgImages());
    expect(opportunityMetadata.twitter?.images).toEqual(siteFallbackOgImages());
    expect(opportunityMetadata.description).toBe(site.offer.primary);
    expect(privacyMetadata.openGraph?.images).toEqual(siteFallbackOgImages());
    expect(termsMetadata.openGraph?.images).toEqual(siteFallbackOgImages());
    expect(String(opportunityMetadata.description)).not.toMatch(placeholderPattern);
    expect(String(privacyMetadata.description)).not.toMatch(placeholderPattern);
    expect(String(termsMetadata.description)).not.toMatch(placeholderPattern);
  });
});

describe("SEO-1: blog Article JSON-LD, og:image, and related posts", () => {
  it("does not cherry-pick unmerged scheduled law/office posts", () => {
    const slugs = blogPosts.map((post) => post.slug);
    for (const slug of SCHEDULED_UNMERGED_SLUGS) {
      expect(slugs).not.toContain(slug);
      expect(getPost(slug)).toBeUndefined();
    }
  });

  it("emits BlogPosting+Article JSON-LD with required fields and an image for every live post", async () => {
    expect(blogPosts.length).toBeGreaterThanOrEqual(2);

    for (const post of blogPosts) {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: post.slug }),
      });
      expect(metadata.description, post.slug).toBe(post.description);
      expect(post.description, post.slug).not.toMatch(placeholderPattern);
      expect(metadata.openGraph?.images, post.slug).toEqual(blogPostOgImages(post));
      expect(metadata.twitter?.images, post.slug).toEqual(blogPostOgImages(post));
      expect(blogPostOgImages(post).length, post.slug).toBeGreaterThan(0);

      const page = await BlogPostPage({
        params: Promise.resolve({ slug: post.slug }),
      });
      const view = render(page);
      const { container } = view;
      const blocks = jsonLdBlocks(container);
      const types = topLevelTypes(blocks);
      expect(new Set(types).size, post.slug).toBe(types.length);

      const article = blocks.find((block) => {
        const type = block["@type"];
        return (
          Array.isArray(type) &&
          type.includes("BlogPosting") &&
          type.includes("Article")
        );
      });
      expect(article, post.slug).toMatchObject({
        headline: post.title,
        datePublished: post.datePublished,
        author: { "@type": "Person", name: site.founder.name },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        image: blogPostJsonLdImage(post),
      });
      expect(article?.image, post.slug).toBeTruthy();

      const related = relatedPostsFor(post.slug);
      expect(related.length, post.slug).toBe(RELATED_POST_COUNT);
      expect(related.map((item) => item.slug), post.slug).not.toContain(post.slug);
      expect(new Set(related.map((item) => item.slug)).size, post.slug).toBe(
        related.length,
      );
      for (const item of related) {
        expect(blogPosts.some((live) => live.slug === item.slug), item.slug).toBe(
          true,
        );
        expect(SCHEDULED_UNMERGED_SLUGS, item.slug).not.toContain(item.slug);
      }

      const relatedSection = container.querySelector(".related-posts");
      const heading = relatedSection?.querySelector("h2");
      expect(heading, post.slug).toHaveTextContent("Related posts");
      const relatedLinks = [
        ...container.querySelectorAll(".related-posts-list a"),
      ];
      expect(relatedLinks).toHaveLength(related.length);
      expect(relatedLinks.map((link) => link.getAttribute("href"))).toEqual(
        related.map((item) => postPath(item.slug)),
      );
      expect(relatedLinks.map((link) => link.textContent)).toEqual(
        related.map((item) => item.title),
      );

      const cta = container.querySelector("a.btn-solid");
      expect(cta, post.slug).toBeTruthy();
      expect(cta?.closest(".related-posts"), post.slug).toBeNull();

      assertNoPii(`${post.slug} json-ld`, JSON.stringify(blocks));
      assertNoPii(
        `${post.slug} related`,
        relatedSection?.innerHTML ?? "",
      );
      view.unmount();
    }
  });

  it("wraps related posts through the live catalog without self links", () => {
    const last = blogPosts[blogPosts.length - 1];
    const related = relatedPostsFor(last.slug);
    expect(related.map((post) => post.slug)).toEqual(
      blogPosts.slice(0, RELATED_POST_COUNT).map((post) => post.slug),
    );
  });
});
