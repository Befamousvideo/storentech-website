import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiModelSwitchDec1CheckArticle } from "@/components/blog/AiModelSwitchDec1CheckArticle";
import {
  aiModelSwitchDec1CheckFaqs,
  blogJsonLdDate,
  blogPosts,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { SITE_FALLBACK_OG_IMAGE } from "@/lib/seo";
import { site } from "@/lib/site";

const slug = "ai-model-switch-dec-1-check";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/AiModelSwitchDec1CheckArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title = "Before Dec. 1, Ask Which AI Model Your Tools Actually Use";
const description =
  "Some AI tools will quietly switch models on Dec. 1. Three questions an Orange County owner can ask a vendor this week, and what to test before it changes.";

function assertNoClass107ContactOrPay(label: string, text: string) {
  expect(text, label).not.toContain("tel:");
  expect(text, label).not.toContain("mailto:");
  expect(text, label).not.toContain("buy.stripe.com");
  expect(text, label).not.toContain("/pay");
  expect(text, label).not.toMatch(emailPattern);
  expect(text, label).not.toMatch(phonePattern);
}

describe("AI model switch Dec. 1 check blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Before Dec. 1, Ask Which AI Model Your Tools Use | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-21");
    expect(post?.faqs).toEqual(aiModelSwitchDec1CheckFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[0]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/ai-model-switch-dec-1-check");
    expect(post?.indexCta).toBe("Read the post");
    expect(post?.hero).toBeUndefined();
    expect(post?.ogImage).toBeUndefined();
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/ai-model-switch-dec-1-check"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-21"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/ai-model-switch-dec-1-check",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("law-firm-case-status-updates"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/ai-model-switch-dec-1-check`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-21"));
  });

  it("sets canonical, title, description, and the site fallback Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/ai-model-switch-dec-1-check",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/ai-model-switch-dec-1-check",
      images: [
        {
          url: SITE_FALLBACK_OG_IMAGE.url,
          width: SITE_FALLBACK_OG_IMAGE.width,
          height: SITE_FALLBACK_OG_IMAGE.height,
          alt: SITE_FALLBACK_OG_IMAGE.alt,
          type: SITE_FALLBACK_OG_IMAGE.type,
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: post?.metaTitle,
      description,
      images: [
        {
          url: SITE_FALLBACK_OG_IMAGE.url,
        },
      ],
    });
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
      datePublished: blogJsonLdDate("2026-11-21"),
      dateModified: blogJsonLdDate("2026-11-21"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}${SITE_FALLBACK_OG_IMAGE.url}`,
        width: SITE_FALLBACK_OG_IMAGE.width,
        height: SITE_FALLBACK_OG_IMAGE.height,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl(slug),
      },
      url: postUrl(slug),
      author: { "@type": "Person", name: site.founder.name },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
    });

    const mainEntity = faq?.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(mainEntity).toHaveLength(5);
    expect(mainEntity.map((item) => item.name)).toEqual(
      aiModelSwitchDec1CheckFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      aiModelSwitchDec1CheckFaqs.map((item) => item.answer),
    );

    const encoded = JSON.stringify(blocks);
    assertNoClass107ContactOrPay("json-ld", encoded);
    expect(encoded).not.toMatch(/HowTo/);
    expect(encoded).not.toContain("https\\:");
  });

  it("keeps draft notes, GBP copy, and Class 107 contact details out of the article", () => {
    expect(articleSource).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion|Vincent|Google Business Profile|GBP/,
    );
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("https\\:");
    assertNoClass107ContactOrPay("article source", articleSource);
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).toContain(
      'href="/blog/ai-phone-agent-changed-overnight"',
    );
    expect(articleSource).toContain(
      'href="/blog/ai-tool-cleanup-checklist"',
    );
    expect(articleSource).toContain('href="/blog/ai-agent-cost-controls"');
    expect(articleSource).toContain(
      'href="/blog/ai-model-retirement-nov-30-business-checklist"',
    );
  });

  it("renders the approved body and opportunity CTA without a hero image", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <AiModelSwitchDec1CheckArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(container.querySelector(".blog-hero-media img")).toBeNull();
    expect(container.querySelector(".blog-lead")).toBeTruthy();

    expect(text).toContain(
      "On Dec. 1, 2026, one major AI provider will automatically move requests from two of its older models to newer ones, and bill them at the newer models' rates.",
    );
    expect(text).toContain(
      "This is a smaller, quieter cousin of the model retirements we covered in October.",
    );
    expect(text).toContain("What is actually changing on Dec. 1?");
    expect(text).toContain(
      "Why should a business owner care about an automatic switch?",
    );
    expect(text).toContain(
      'Because "it still works" and "it still works the way we tested it" are not the same thing.',
    );
    expect(text).toContain(
      "Which tools in an office are most likely to be affected?",
    );
    expect(text).toContain(
      "What three questions should I ask my vendor before Dec. 1?",
    );
    expect(text).toContain(
      '"Which AI model does this tool use for our account?"',
    );
    expect(text).toContain("What should we test once the switch happens?");
    expect(text).toContain(
      "How do we stop being surprised by model changes?",
    );
    expect(text).toContain("Your AI Phone Agent May Have Changed Overnight");
    expect(text).toContain("AI tool cleanup checklist");
    expect(text).toContain("keeping AI bills predictable");
    expect(text).toContain("Nov. 30 model retirement");
    expect(text).toContain("Where StorenTech AI fits");
    expect(text).not.toContain("Related posts");
    expect(text).not.toContain("Google Business Profile");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    expect(html).toContain(
      'href="/blog/ai-phone-agent-changed-overnight"',
    );
    expect(html).toContain('href="/blog/ai-tool-cleanup-checklist"');
    expect(html).toContain('href="/blog/ai-agent-cost-controls"');
    expect(html).toContain(
      'href="/blog/ai-model-retirement-nov-30-business-checklist"',
    );
    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");

    for (const item of aiModelSwitchDec1CheckFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
