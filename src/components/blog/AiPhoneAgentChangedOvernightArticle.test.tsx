import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiPhoneAgentChangedOvernightArticle } from "@/components/blog/AiPhoneAgentChangedOvernightArticle";
import {
  aiPhoneAgentChangedOvernightFaqs,
  blogPosts,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "ai-phone-agent-changed-overnight";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/AiPhoneAgentChangedOvernightArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "Your AI Phone Agent May Have Changed Overnight. Here's How to Tell.";
const description =
  "Many AI phone tools update themselves without asking. Here's how an owner can tell which version is running, test after an update and lock it.";
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

describe("AI phone agent changed overnight blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Your AI Phone Agent May Have Changed Overnight | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-02");
    expect(post?.faqs).toEqual(aiPhoneAgentChangedOvernightFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[4]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/ai-phone-agent-changed-overnight");
    expect(post?.hero).toEqual({
      png: "/blog/ai-phone-agent-changed-overnight.png",
      width: 1920,
      height: 1080,
      alt,
    });
    expect(post?.ogImage).toEqual({
      src: "/blog/ai-phone-agent-changed-overnight-1200x630.png",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    });
  });

  it("ships the 1920x1080 header PNG and the 1200x630 Open Graph PNG", () => {
    expect(pngSize("public/blog/ai-phone-agent-changed-overnight.png")).toEqual({
      width: 1920,
      height: 1080,
    });
    expect(
      pngSize("public/blog/ai-phone-agent-changed-overnight-1200x630.png"),
    ).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/ai-phone-agent-changed-overnight"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-02"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/ai-phone-agent-changed-overnight",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("hugging-face-github-explained"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/ai-phone-agent-changed-overnight`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-02"));
  });

  it("sets canonical, title, description, and the 1200x630 PNG as the Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/ai-phone-agent-changed-overnight",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/ai-phone-agent-changed-overnight",
      images: [
        {
          url: "/blog/ai-phone-agent-changed-overnight-1200x630.png",
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
          url: "/blog/ai-phone-agent-changed-overnight-1200x630.png",
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
      datePublished: "2026-11-02",
      dateModified: "2026-11-02",
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/ai-phone-agent-changed-overnight.png`,
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
      aiPhoneAgentChangedOvernightFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      aiPhoneAgentChangedOvernightFaqs.map((item) => item.answer),
    );

    const encoded = JSON.stringify(blocks);
    assertNoClass107ContactOrPay("json-ld", encoded);
    expect(encoded).not.toMatch(/HowTo/);
  });

  it("keeps draft notes and Class 107 contact details out of the article", () => {
    expect(articleSource).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion|Vincent/,
    );
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("https\\:");
    assertNoClass107ContactOrPay("article source", articleSource);
    expect(articleSource).toContain('href="/blog/monthly-automation-check-up"');
    expect(articleSource).toContain(
      'href="/blog/ai-voice-agent-small-business"',
    );
    expect(articleSource).toContain('href="/opportunity"');
  });

  it("renders the approved body, header image, opportunity CTA, and FAQ without Class 107 leaks", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <AiPhoneAgentChangedOvernightArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();

    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute(
      "src",
      "/blog/ai-phone-agent-changed-overnight.png",
    );
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1920");
    expect(image).toHaveAttribute("height", "1080");

    expect(text).toContain(
      'If your AI phone agent is set to use a "latest" version, the company behind it can swap in a new model without asking you',
    );
    expect(text).toContain(
      "Your phone agent is part of your front desk. Treat a silent update the way you'd treat a new hire's first day.",
    );
    expect(text).toContain('What a "latest" version actually means');
    expect(text).toContain("How to tell which version your agent runs");
    expect(text).toContain("A five-minute test after any update");
    expect(text).toContain(
      "StorenTech AI sets up phone agents so the business owner knows which version is running and gets a tested, planned path for every update.",
    );
    expect(text).toContain("start your AI Opportunity Map");

    expect(
      container.querySelector('a[href="/blog/monthly-automation-check-up"]'),
    ).toHaveTextContent("monthly automation check-up");
    expect(
      container.querySelector('a[href="/blog/ai-voice-agent-small-business"]'),
    ).toHaveTextContent("what an AI voice agent can do for a small business");

    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    for (const item of aiPhoneAgentChangedOvernightFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
