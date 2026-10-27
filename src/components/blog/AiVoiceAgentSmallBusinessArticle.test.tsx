import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiVoiceAgentSmallBusinessArticle } from "@/components/blog/AiVoiceAgentSmallBusinessArticle";
import {
  aiVoiceAgentSmallBusinessFaqs,
  blogPosts,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "ai-voice-agent-small-business";
const post = getPost(slug);

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/AiVoiceAgentSmallBusinessArticle.tsx"),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

describe("AI voice agent for small business blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(
      "What a Voice Agent Can Do for a Small Business: Answer, Book, Sell",
    );
    expect(post?.metaTitle).toBe(
      "What a Voice Agent Can Do for a Small Business | StorenTech AI",
    );
    expect(post?.description).toBe(
      "An AI voice agent can answer every call, book appointments and handle sales questions for contractors and field service firms, while your team owns the customer.",
    );
    expect(post?.datePublished).toBe("2026-10-21");
    expect(post?.faqs).toEqual(aiVoiceAgentSmallBusinessFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[1]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/ai-voice-agent-small-business");
    expect(post?.hero).toEqual({
      avif: "/blog/ai-voice-agent-small-business.avif",
      webp: "/blog/ai-voice-agent-small-business.webp",
      width: 1600,
      height: 900,
      alt: "StorenTech AI blog header reading Turn missed calls into booked jobs, beside a phone showing an incoming call answered by AI on the first ring and a Today calendar with a new job booked.",
    });
  });

  it("ships the 1600x900 header in webp and avif", async () => {
    const webpPath = join(process.cwd(), "public", post?.hero?.webp ?? "missing");
    const avifPath = join(process.cwd(), "public", post?.hero?.avif ?? "missing");
    expect(existsSync(webpPath)).toBe(true);
    expect(existsSync(avifPath)).toBe(true);
    const webp = await sharp(webpPath).metadata();
    const avif = await sharp(avifPath).metadata();
    expect(webp.format).toBe("webp");
    expect(webp.width).toBe(1600);
    expect(webp.height).toBe(900);
    expect(avif.format).toBe("heif");
    expect(avif.compression).toBe("av1");
    expect(avif.width).toBe(1600);
    expect(avif.height).toBe(900);
  });

  it("appears on the blog index list, in llms.txt, and in the sitemap", () => {
    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/ai-voice-agent-small-business",
    );
    expect(llmsSource.indexOf("ai-voice-agent-small-business")).toBeLessThan(
      llmsSource.indexOf("what-should-your-business-ai-be-allowed-to-do"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/ai-voice-agent-small-business`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) =>
      item.url.endsWith("/blog/ai-voice-agent-small-business"),
    );
    expect(entry?.lastModified).toEqual(new Date("2026-10-21"));
  });

  it("sets canonical, title, description, and the header as the Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(post?.description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/ai-voice-agent-small-business",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description: post?.description,
      url: "/blog/ai-voice-agent-small-business",
      images: [
        {
          url: "/blog/ai-voice-agent-small-business.webp",
          width: 1600,
          height: 900,
          alt: post?.hero?.alt,
          type: "image/webp",
        },
        {
          url: "/blog/ai-voice-agent-small-business.avif",
          width: 1600,
          height: 900,
          alt: post?.hero?.alt,
          type: "image/avif",
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: post?.metaTitle,
      description: post?.description,
      images: [
        { url: "/blog/ai-voice-agent-small-business.webp" },
        { url: "/blog/ai-voice-agent-small-business.avif" },
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
      headline: post?.title,
      description: post?.description,
      datePublished: "2026-10-21",
      dateModified: "2026-10-21",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl(slug),
      },
      url: postUrl(slug),
      author: { "@type": "Person", name: site.founder.name },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/ai-voice-agent-small-business.webp`,
        width: 1600,
        height: 900,
      },
    });

    const mainEntity = faq?.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(mainEntity).toHaveLength(5);
    expect(mainEntity.map((item) => item.name)).toEqual(
      aiVoiceAgentSmallBusinessFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      aiVoiceAgentSmallBusinessFaqs.map((item) => item.answer),
    );

    const encoded = JSON.stringify(blocks);
    expect(encoded).not.toContain("tel:");
    expect(encoded).not.toContain("mailto:");
    expect(encoded).not.toMatch(/HowTo/);
    expect(encoded).not.toMatch(emailPattern);
    expect(encoded).not.toMatch(phonePattern);
    expect(encoded).not.toContain("buy.stripe.com");
    expect(encoded).not.toMatch(/\$[\d,]+/);
  });

  it("keeps draft notes, contact details, and payment info out of the article", () => {
    expect(articleSource).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH/,
    );
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("tel:");
    expect(articleSource).not.toContain("mailto:");
    expect(articleSource).not.toContain("buy.stripe.com");
    expect(articleSource).not.toMatch(emailPattern);
    expect(articleSource).not.toMatch(phonePattern);
    expect(articleSource).not.toMatch(/\$[\d,]+/);
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).not.toContain('href="/contact"');
    expect(articleSource).not.toMatch(/chatbot|chat with us|start a chat/i);
  });

  it("renders the approved body, opportunity CTA, and header image", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <AiVoiceAgentSmallBusinessArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(
      getByRole("heading", {
        level: 1,
        name: "What a Voice Agent Can Do for a Small Business: Answer, Book, Sell",
      }),
    ).toBeInTheDocument();

    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute("src", "/blog/ai-voice-agent-small-business.webp");
    expect(image).toHaveAttribute("alt", post?.hero?.alt);
    expect(image).toHaveAttribute("width", "1600");
    expect(image).toHaveAttribute("height", "900");
    expect(html).toContain('type="image/avif"');
    expect(html).toContain("/blog/ai-voice-agent-small-business.avif");

    expect(text).toContain(
      "An AI voice agent can answer every call to your business, book the appointment on the spot and handle the sales questions callers ask before they buy.",
    );
    expect(text).toContain(
      "A voice agent that knows your business and never runs out of patience turns missed calls into booked jobs.",
    );
    expect(text).toContain(
      "The problem: the phone rings when nobody can answer",
    );
    expect(text).toContain(
      'Booking: from "Can someone come out?" to a confirmed time',
    );
    expect(text).toContain(
      "Selling: answering the questions buyers ask before they say yes",
    );
    expect(text).toContain("Your team still owns the customer");
    expect(text).toContain("What about website chat?");
    expect(text).toContain(
      "But for most contractors and field service companies, the phone is where the jobs come from, so it usually makes sense to start there.",
    );
    expect(text).toContain(
      "At StorenTech AI, we think the best AI receptionist is the one your customers remember as helpful, not as a robot.",
    );
    expect(text).toContain("Start your AI Opportunity Map");

    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");
    expect(html).not.toContain('href="/contact"');

    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("buy.stripe.com");
    expect(html).not.toMatch(emailPattern);
    expect(html).not.toMatch(phonePattern);
    expect(html).not.toMatch(/\$[\d,]+/);
    expect(text).not.toMatch(/DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH/);

    for (const item of aiVoiceAgentSmallBusinessFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
