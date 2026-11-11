import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { LawFirmAiDataStorageCheckArticle } from "@/components/blog/LawFirmAiDataStorageCheckArticle";
import {
  blogJsonLdDate,
  blogPosts,
  getPost,
  lawFirmAiDataStorageCheckFaqs,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "law-firm-ai-data-storage-check";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/LawFirmAiDataStorageCheckArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "Before Your Law Firm Connects Client Data to a New AI Tool, Check These Storage Settings";
const description =
  "Before an Orange County law firm puts client data into an AI tool, check where prompts and uploads are stored, who sees them and what's on by default.";
const alt =
  "Law office desk with a laptop open to storage settings, a client file folder and a blank checklist.";

function pngSize(path: string) {
  const buf = readFileSync(join(process.cwd(), path));
  expect(
    buf.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  ).toBe(true);
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

function assertNoClass107ContactOrPay(label: string, text: string) {
  expect(text, label).not.toContain("tel:");
  expect(text, label).not.toContain("mailto:");
  expect(text, label).not.toContain("buy.stripe.com");
  expect(text, label).not.toContain("/pay");
  expect(text, label).not.toMatch(emailPattern);
  expect(text, label).not.toMatch(phonePattern);
}

describe("law firm AI data storage check blog post", () => {
  it("is registered with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Before Your Law Firm Connects Client Data to a New AI Tool | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.datePublished).toBe("2026-11-16");
    expect(post?.faqs).toEqual(lawFirmAiDataStorageCheckFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[2]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/law-firm-ai-data-storage-check");
    expect(post?.hero).toEqual({
      png: "/blog/law-firm-ai-data-storage-check.png",
      width: 1920,
      height: 1080,
      alt,
    });
    expect(post?.ogImage).toEqual({
      src: "/blog/law-firm-ai-data-storage-check-1200x630.png",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    });
  });

  it("ships the header PNG and the 1200x630 Open Graph PNG", () => {
    expect(pngSize("public/blog/law-firm-ai-data-storage-check.png")).toEqual({
      width: 1920,
      height: 1080,
    });
    expect(
      pngSize("public/blog/law-firm-ai-data-storage-check-1200x630.png"),
    ).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/law-firm-ai-data-storage-check"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-16"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/law-firm-ai-data-storage-check",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("office-procedures-ai-instructions"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/law-firm-ai-data-storage-check`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-16"));
  });

  it("sets canonical, title, description, and the 1200x630 PNG as the Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/law-firm-ai-data-storage-check",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/law-firm-ai-data-storage-check",
      images: [
        {
          url: "/blog/law-firm-ai-data-storage-check-1200x630.png",
          width: 1200,
          height: 630,
          alt,
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
          url: "/blog/law-firm-ai-data-storage-check-1200x630.png",
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
      datePublished: blogJsonLdDate("2026-11-16"),
      dateModified: blogJsonLdDate("2026-11-16"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/law-firm-ai-data-storage-check.png`,
        width: 1920,
        height: 1080,
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
      lawFirmAiDataStorageCheckFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      lawFirmAiDataStorageCheckFaqs.map((item) => item.answer),
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
    expect(articleSource).toContain(
      "https://ai.google.dev/gemini-api/docs/changelog",
    );
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).not.toContain('href="/law"');
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <LawFirmAiDataStorageCheckArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute(
      "src",
      "/blog/law-firm-ai-data-storage-check.png",
    );
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1920");
    expect(image).toHaveAttribute("height", "1080");

    expect(text).toContain(
      "Before your Orange County law firm sends client, caller or employee details into any new AI tool, find out three things: where your prompts and uploads are stored, who can open those records, and which storage settings are switched on by default.",
    );
    expect(text).toContain(
      'The question is not only "Is this AI tool smart?" It is "Where does our client information go after we hit send, and who decided that?"',
    );
    expect(text).toContain("Why this matters right now");
    expect(text).toContain('What "storage" actually means in an AI tool');
    expect(text).toContain("Six questions to ask before client data goes in");
    expect(text).toContain("Start with test data, not a real client file");
    expect(text).toContain(
      "New projects using the Generate Content API (generateContent, streamGenerateContent, and batchGenerateContent) on the paid tier now store requests by default (store=true)",
    );
    expect(text).toContain(
      "StorenTech AI can help Orange County law firms map where client information goes in each AI tool before anything goes live, so owners and their lawyers can decide what stays inside the firm.",
    );
    expect(text).toContain("start with an AI Opportunity Map");
    expect(text).not.toContain("Google Business Profile");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    expect(html).toContain(
      'href="https://ai.google.dev/gemini-api/docs/changelog"',
    );
    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");

    for (const item of lawFirmAiDataStorageCheckFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
