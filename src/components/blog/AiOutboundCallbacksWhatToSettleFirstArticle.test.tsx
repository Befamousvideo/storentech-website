import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiOutboundCallbacksWhatToSettleFirstArticle } from "@/components/blog/AiOutboundCallbacksWhatToSettleFirstArticle";
import {
  aiOutboundCallbacksWhatToSettleFirstFaqs,
  blogJsonLdDate,
  blogPosts,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "ai-outbound-callbacks-what-to-settle-first";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/AiOutboundCallbacksWhatToSettleFirstArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title = "Should AI Call Your Clients Back? What to Settle Before It Dials";
const description =
  "AI can now place outbound calls through your existing phone line. What an Orange County firm or contractor should settle before letting AI call anyone.";

function assertNoClass107ContactOrPay(label: string, text: string) {
  expect(text, label).not.toContain("tel:");
  expect(text, label).not.toContain("mailto:");
  expect(text, label).not.toContain("buy.stripe.com");
  expect(text, label).not.toContain("/pay");
  expect(text, label).not.toMatch(emailPattern);
  expect(text, label).not.toMatch(phonePattern);
}

describe("AI outbound callbacks what to settle first blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and four FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Should AI Call Your Clients Back? Settle This First | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-29");
    expect(post?.faqs).toEqual(aiOutboundCallbacksWhatToSettleFirstFaqs);
    expect(post?.faqs).toHaveLength(4);
    expect(blogPosts[0]?.slug).toBe(slug);
    expect(postPath(slug)).toBe(
      "/blog/ai-outbound-callbacks-what-to-settle-first",
    );
    expect(post?.hero).toBeUndefined();
    expect(post?.ogImage).toBeUndefined();
    expect(post?.indexCta).toBe("Read the post");
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain(
      'href="/blog/ai-outbound-callbacks-what-to-settle-first"',
    );
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-29"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/ai-outbound-callbacks-what-to-settle-first",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("law-firm-case-status-updates"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(
      `${site.url}/blog/ai-outbound-callbacks-what-to-settle-first`,
    );
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-29"));
  });

  it("sets canonical, title, and description with the site fallback Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/ai-outbound-callbacks-what-to-settle-first",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/ai-outbound-callbacks-what-to-settle-first",
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
          width: 1200,
          height: 630,
          alt: "StorenTech AI",
          type: "image/png",
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
      datePublished: blogJsonLdDate("2026-11-29"),
      dateModified: blogJsonLdDate("2026-11-29"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}/opengraph-image`,
        width: 1200,
        height: 630,
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
    expect(mainEntity).toHaveLength(4);
    expect(mainEntity.map((item) => item.name)).toEqual(
      aiOutboundCallbacksWhatToSettleFirstFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      aiOutboundCallbacksWhatToSettleFirstFaqs.map((item) => item.answer),
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
      'href="/blog/what-should-your-business-ai-be-allowed-to-do"',
    );
    expect(articleSource).toContain(
      'href="/blog/california-law-firm-ai-receptionist"',
    );
    expect(articleSource).toContain('href="/blog/law-firm-missed-calls"');
    expect(articleSource).toContain(
      'href="/blog/after-hours-calls-contractors"',
    );
    expect(articleSource).toContain(
      'href="/blog/law-firm-case-status-updates"',
    );
    expect(articleSource).not.toContain("Related posts");
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <AiOutboundCallbacksWhatToSettleFirstArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(container.querySelector(".blog-hero-media img")).toBeNull();

    expect(text).toContain(
      "AI voice tools can now place outbound calls through a business's existing phone provider, not just answer incoming ones.",
    );
    expect(text).toContain(
      "We've written about AI answering the phone after hours and handling case-status calls. This is the other direction, and it deserves more care.",
    );
    expect(text).toContain("What changed with AI and outbound calls?");
    expect(text).toContain(
      "Why is an outbound AI call different from an AI answering the phone?",
    );
    expect(text).toContain("Who approves each call list?");
    expect(text).toContain(
      "What may the AI say, and what must it never say?",
    );
    expect(text).toContain("Will the calls be recorded?");
    expect(text).toContain(
      "How should we test before AI calls a real client or customer?",
    );
    expect(text).toContain(
      "What's a safer first step than letting AI make calls?",
    );
    expect(text).toContain("Where StorenTech AI fits");
    expect(text).toContain(
      'This is the office of [firm name] returning your call. I can book a time for you to talk with someone.',
    );
    expect(text).toContain("what your business AI should be allowed to do");
    expect(text).toContain("Can a California Law Firm Use an AI Receptionist?");
    expect(text).toContain(
      "when a potential client calls your law firm after hours",
    );
    expect(text).toContain(
      "what after-hours calls are worth to a plumbing or HVAC business",
    );
    expect(text).toContain("case-status updates post");
    expect(text).not.toContain("Related posts");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");

    for (const item of aiOutboundCallbacksWhatToSettleFirstFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
