import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { MoneyTimeRiskLeaksArticle } from "@/components/blog/MoneyTimeRiskLeaksArticle";
import nextConfig from "../../../next.config";
import {
  blogJsonLdDate,
  blogPosts,
  getPost,
  moneyTimeRiskLeaksFaqs,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "money-time-risk-leaks";
const post = getPost(slug);

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/MoneyTimeRiskLeaksArticle.tsx"),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "Money, Time and Risk Leaks: Where Small Businesses Lose Revenue and Hours";
const description =
  "What money, time and risk leaks are, where Orange County small businesses lose revenue and hours, and how to find and rank the leaks in your own business.";

describe("money, time and risk leaks blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Money, Time and Risk Leaks in Small Business | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-24");
    expect(post?.faqs).toEqual(moneyTimeRiskLeaksFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(post?.index).toBe(false);
    expect(blogPosts[0]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/money-time-risk-leaks");
    expect(post?.hero).toBeUndefined();
    expect(post?.ogImage).toBeUndefined();
    expect(post?.indexCta).toBe("Read the post");
  });

  it("appears on the blog index and in llms.txt, but not in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/money-time-risk-leaks"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-24"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/money-time-risk-leaks",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("comparing-ai-consultants-what-you-are-buying"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).not.toContain(`${site.url}/blog/money-time-risk-leaks`);
    expect(urls).not.toContain(postUrl(slug));
  });

  it("sets canonical, title, description, fallback OG image, and noindex", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/money-time-risk-leaks",
    });
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/money-time-risk-leaks",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "StorenTech AI",
          type: "image/png",
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: post?.metaTitle,
      description,
      images: [
        {
          url: "/opengraph-image",
        },
      ],
    });

    const headers = (await nextConfig.headers?.()) ?? [];
    expect(
      headers.find((rule) => rule.source === "/blog/money-time-risk-leaks")
        ?.headers,
    ).toEqual([{ key: "X-Robots-Tag", value: "noindex, nofollow" }]);
  });

  it("builds Article and FAQPage JSON-LD from the post", async () => {
    const page = await BlogPostPage({
      params: Promise.resolve({ slug }),
    });
    const { container } = render(page);
    const blocks = [
      ...container.querySelectorAll('script[type="application/ld+json"]'),
    ].map((node) => JSON.parse(node.textContent ?? "{}") as Record<string, unknown>);

    const article = blocks.find((block) => {
      const type = block["@type"];
      return (
        Array.isArray(type) &&
        type.includes("BlogPosting") &&
        type.includes("Article")
      );
    });
    const faq = blocks.find((block) => block["@type"] === "FAQPage");

    expect(article).toMatchObject({
      headline: title,
      description,
      datePublished: blogJsonLdDate("2026-11-24"),
      dateModified: blogJsonLdDate("2026-11-24"),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl(slug),
      },
      url: postUrl(slug),
      author: { "@type": "Person", name: site.founder.name },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      image: {
        "@type": "ImageObject",
        url: `${site.url}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    });

    const mainEntity = faq?.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(mainEntity).toHaveLength(5);
    expect(mainEntity.map((item) => item.name)).toEqual(
      moneyTimeRiskLeaksFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      moneyTimeRiskLeaksFaqs.map((item) => item.answer),
    );

    const encoded = JSON.stringify(blocks);
    expect(encoded).not.toContain("tel:");
    expect(encoded).not.toContain("mailto:");
    expect(encoded).not.toMatch(/HowTo/);
    expect(encoded).not.toMatch(emailPattern);
    expect(encoded).not.toMatch(phonePattern);
  });

  it("keeps draft notes, vendor names, prices, and contact details out of the article", () => {
    expect(articleSource).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion|Vincent/,
    );
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("tel:");
    expect(articleSource).not.toContain("mailto:");
    expect(articleSource).not.toContain("https\\:");
    expect(articleSource).not.toMatch(emailPattern);
    expect(articleSource).not.toMatch(phonePattern);
    expect(articleSource).not.toMatch(/\$[\d,]+/);
    expect(articleSource).not.toMatch(/\bROIA\b/);
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).toContain('href="/blog/law-firm-missed-calls"');
    expect(articleSource).toContain(
      'href="/blog/weekly-report-download-rebuild"',
    );
    expect(articleSource).toContain('href="/blog/ai-tool-cleanup-checklist"');
  });

  it("renders the approved body, opportunity CTA, and FAQ", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <MoneyTimeRiskLeaksArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(container.querySelector(".blog-hero-media")).toBeNull();
    expect(text).toContain(
      "A leak is any spot where your business quietly loses something it should keep.",
    );
    expect(text).toContain(
      "The good news: most leaks are ordinary, fixable problems.",
    );
    expect(text).toContain("What is a money leak?");
    expect(text).toContain(
      "A money leak is revenue you should have earned but didn't.",
    );
    expect(text).toContain(
      "what happens when a potential client calls your law firm after hours",
    );
    expect(text).toContain("What is a time leak?");
    expect(text).toContain(
      "the weekly report your office still downloads and rebuilds by hand",
    );
    expect(text).toContain("What is a risk leak?");
    expect(text).toContain("AI tool cleanup checklist");
    expect(text).toContain("Why do leaks stay hidden?");
    expect(text).toContain("How do you find the leaks in your business?");
    expect(text).toContain("Which leak should you fix first?");
    expect(text).toContain("How does StorenTech AI find leaks?");
    expect(text).toContain("start your AI Opportunity Map");
    expect(html).toContain('href="/blog/law-firm-missed-calls"');
    expect(html).toContain('href="/blog/weekly-report-download-rebuild"');
    expect(html).toContain('href="/blog/ai-tool-cleanup-checklist"');
    expect(html).toContain('href="/opportunity"');

    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toMatch(emailPattern);
    expect(html).not.toMatch(phonePattern);
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );
    expect(text).not.toMatch(/\bROIA\b/);

    for (const item of moneyTimeRiskLeaksFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
