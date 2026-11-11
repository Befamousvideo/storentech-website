import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { LawFirmMissedCallsArticle } from "@/components/blog/LawFirmMissedCallsArticle";
import {
  blogJsonLdDate,
  blogPosts,
  getPost,
  lawFirmMissedCallsFaqs,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "law-firm-missed-calls";
const post = getPost(slug);

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/LawFirmMissedCallsArticle.tsx"),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "When a Potential Client Calls Your Law Firm After Hours, What Happens?";
const description =
  "What a potential client hears when they call an Orange County law firm after hours, and what to fix first so fewer callers hang up.";
const alt = title;


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

describe("law firm missed calls blog post", () => {
  it("is registered with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "When a Potential Client Calls Your Law Firm After Hours | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-09");
    expect(post?.faqs).toEqual(lawFirmMissedCallsFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[5]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/law-firm-missed-calls");
    expect(post?.hero).toEqual({
      png: "/blog/law-firm-missed-calls.png",
      width: 1920,
      height: 1080,
      alt,
    });
    expect(post?.ogImage).toEqual({
      src: "/blog/law-firm-missed-calls-1200x630.png",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    });
  });


  it("ships the header PNG and the 1200x630 Open Graph PNG", () => {
    expect(pngSize("public/blog/law-firm-missed-calls.png")).toEqual({
      width: 1920,
      height: 1080,
    });
    expect(pngSize("public/blog/law-firm-missed-calls-1200x630.png")).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/law-firm-missed-calls"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-09"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/law-firm-missed-calls",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("questions-before-hiring-ai-developer"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/law-firm-missed-calls`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-09"));
  });

  it("sets canonical, title, description, and the 1200x630 PNG as the Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/law-firm-missed-calls",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/law-firm-missed-calls",
      images: [
        {
          url: "/blog/law-firm-missed-calls-1200x630.png",
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
          url: "/blog/law-firm-missed-calls-1200x630.png",
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
      datePublished: blogJsonLdDate("2026-11-09"),
      dateModified: blogJsonLdDate("2026-11-09"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/law-firm-missed-calls.png`,
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
      lawFirmMissedCallsFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      lawFirmMissedCallsFaqs.map((item) => item.answer),
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
      "https://www.clio.com/blog/highlights-from-2024-legal-trends-report/",
    );
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).not.toContain("/law");
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <LawFirmMissedCallsArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute(
      "src",
      "/blog/law-firm-missed-calls.png",
    );
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1920");
    expect(image).toHaveAttribute("height", "1080");

    expect(text).toContain(
      "When a potential client calls your Orange County law firm at 7 p.m. or on a Saturday, they usually get voicemail, a full mailbox or no answer at all — and many of them never leave a message.",
    );
    expect(text).toContain(
      "A missed after-hours call is not a message waiting for Monday. For many callers, it is a reason to dial the next firm on the list.",
    );
    expect(text).toContain("What the caller experiences after hours");
    expect(text).toContain("What to fix first");
    expect(text).toContain("Where an AI intake line fits");
    expect(text).toContain("A Monday-morning check that takes ten minutes");
    expect(text).toContain("Only 40% of firms answered our phone calls.");
    expect(text).toContain(
      "StorenTech AI helps Orange County law firms cover after-hours calls with AI intake that asks your questions, captures the basics and hands urgent matters to your team — while a lawyer still decides who becomes a client.",
    );
    expect(text).toContain("start with an AI Opportunity Map");
    expect(text).not.toContain("Google Business Profile");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    expect(html).toContain(
      'href="https://www.clio.com/blog/highlights-from-2024-legal-trends-report/"',
    );
    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");

    for (const item of lawFirmMissedCallsFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
