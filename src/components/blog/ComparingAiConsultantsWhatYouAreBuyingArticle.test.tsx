import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { ComparingAiConsultantsWhatYouAreBuyingArticle } from "@/components/blog/ComparingAiConsultantsWhatYouAreBuyingArticle";
import {
  blogJsonLdDate,
  blogPosts,
  comparingAiConsultantsWhatYouAreBuyingFaqs,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { SITE_FALLBACK_OG_IMAGE } from "@/lib/seo";
import { site } from "@/lib/site";

const slug = "comparing-ai-consultants-what-you-are-buying";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/ComparingAiConsultantsWhatYouAreBuyingArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "Comparing AI Help? Know Whether You're Buying a Checklist, a Working Pilot or a Monthly Service";
const description =
  "An AI audit, a working pilot and a monthly service are different things. Five plain questions an Orange County owner can use to compare AI proposals.";

function assertNoClass107ContactOrPay(label: string, text: string) {
  expect(text, label).not.toContain("tel:");
  expect(text, label).not.toContain("mailto:");
  expect(text, label).not.toContain("buy.stripe.com");
  expect(text, label).not.toContain("/pay");
  expect(text, label).not.toMatch(emailPattern);
  expect(text, label).not.toMatch(phonePattern);
}

describe("comparing AI consultants what you are buying blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Comparing AI Proposals? Know What You're Buying | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-24");
    expect(post?.faqs).toEqual(comparingAiConsultantsWhatYouAreBuyingFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[0]?.slug).toBe(slug);
    expect(postPath(slug)).toBe(
      "/blog/comparing-ai-consultants-what-you-are-buying",
    );
    expect(post?.hero).toBeUndefined();
    expect(post?.ogImage).toBeUndefined();
    expect(post?.indexCta).toBe("Read the post");
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain(
      'href="/blog/comparing-ai-consultants-what-you-are-buying"',
    );
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-24"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/comparing-ai-consultants-what-you-are-buying",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("law-firm-case-status-updates"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(
      `${site.url}/blog/comparing-ai-consultants-what-you-are-buying`,
    );
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-24"));
  });

  it("sets canonical, title, description, and the site fallback Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/comparing-ai-consultants-what-you-are-buying",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/comparing-ai-consultants-what-you-are-buying",
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
      datePublished: blogJsonLdDate("2026-11-24"),
      dateModified: blogJsonLdDate("2026-11-24"),
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
      comparingAiConsultantsWhatYouAreBuyingFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      comparingAiConsultantsWhatYouAreBuyingFaqs.map((item) => item.answer),
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
    expect(articleSource).not.toMatch(/\$[\d,]+/);
    assertNoClass107ContactOrPay("article source", articleSource);
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).toContain(
      'href="/blog/questions-before-hiring-ai-developer"',
    );
    expect(articleSource).toContain(
      'href="/blog/what-should-your-business-ai-be-allowed-to-do"',
    );
    expect(articleSource).toContain('href="/blog/pick-first-ai-project"');
    expect(articleSource).toContain(
      'href="/blog/what-is-an-automation-roi-analysis"',
    );
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <ComparingAiConsultantsWhatYouAreBuyingArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(container.querySelector(".blog-hero-media img")).toBeNull();

    expect(text).toContain(
      "When an owner lines up AI proposals side by side, they are often comparing three different things",
    );
    expect(text).toContain(
      "If two proposals look hard to compare, it is usually because they are not selling the same thing.",
    );
    expect(text).toContain(
      "What are the three kinds of AI help a small business gets offered?",
    );
    expect(text).toContain("operational bottlenecks");
    expect(text).toContain("5 Questions to Ask Before Hiring an AI Developer");
    expect(text).toContain("what your business AI should be allowed to do");
    expect(text).toContain("picking a first AI project");
    expect(text).toContain("what an AI Opportunity Map is");
    expect(text).toContain(
      "StorenTech AI's AI Opportunity Map sits between a checklist and a pilot.",
    );
    expect(text).not.toContain("Related posts");
    expect(text).not.toContain("Google Business Profile");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );
    expect(text).not.toMatch(/\$[\d,]+/);

    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");

    for (const item of comparingAiConsultantsWhatYouAreBuyingFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
