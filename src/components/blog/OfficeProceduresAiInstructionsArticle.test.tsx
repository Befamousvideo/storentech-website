import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { OfficeProceduresAiInstructionsArticle } from "@/components/blog/OfficeProceduresAiInstructionsArticle";
import {
  blogJsonLdDate,
  blogPosts,
  getPost,
  officeProceduresAiInstructionsFaqs,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "office-procedures-ai-instructions";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/OfficeProceduresAiInstructionsArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "Write It Down Once: Turning Your Office's Procedures into Instructions an AI Assistant Can Follow";
const description =
  "How Orange County owners can write one office procedure so a person or AI assistant can follow it — with a human approving anything that leaves the office.";
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

describe("office procedures as AI instructions blog post", () => {
  it("is registered with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Write It Down Once: Office Procedures as AI Instructions | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-13");
    expect(post?.faqs).toEqual(officeProceduresAiInstructionsFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[3]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/office-procedures-ai-instructions");
    expect(post?.hero).toEqual({
      png: "/blog/office-procedures-ai-instructions-1200x630.png",
      width: 1200,
      height: 630,
      alt,
    });
    expect(post?.ogImage).toEqual({
      src: "/blog/office-procedures-ai-instructions-1200x630.png",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    });
  });


  it("ships the header PNG and the 1200x630 Open Graph PNG", () => {
    expect(pngSize("public/blog/office-procedures-ai-instructions-1200x630.png")).toEqual({
      width: 1200,
      height: 630,
    });
    expect(pngSize("public/blog/office-procedures-ai-instructions-1200x630.png")).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain(
      'href="/blog/office-procedures-ai-instructions"',
    );
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-13"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/office-procedures-ai-instructions",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("questions-before-hiring-ai-developer"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(
      `${site.url}/blog/office-procedures-ai-instructions`,
    );
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-13"));
  });

  it("sets canonical, title, description, and the 1200x630 PNG as the Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/office-procedures-ai-instructions",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/office-procedures-ai-instructions",
      images: [
        {
          url: "/blog/office-procedures-ai-instructions-1200x630.png",
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
          url: "/blog/office-procedures-ai-instructions-1200x630.png",
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
      datePublished: blogJsonLdDate("2026-11-13"),
      dateModified: blogJsonLdDate("2026-11-13"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/office-procedures-ai-instructions-1200x630.png`,
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
    expect(mainEntity).toHaveLength(5);
    expect(mainEntity.map((item) => item.name)).toEqual(
      officeProceduresAiInstructionsFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      officeProceduresAiInstructionsFaqs.map((item) => item.answer),
    );

    const encoded = JSON.stringify(blocks);
    assertNoClass107ContactOrPay("json-ld", encoded);
    expect(encoded).not.toMatch(/HowTo/);
  });

  it("keeps draft notes, GBP copy, and Class 107 contact details out of the article", () => {
    expect(articleSource).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion|Vincent|Google Business Profile|GBP/,
    );
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("https\\:");
    assertNoClass107ContactOrPay("article source", articleSource);
    expect(articleSource).toContain(
      "https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation",
    );
    expect(articleSource).toContain('href="/opportunity"');
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <OfficeProceduresAiInstructionsArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute(
      "src",
      "/blog/office-procedures-ai-instructions-1200x630.png",
    );
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1200");
    expect(image).toHaveAttribute("height", "630");

    expect(text).toContain(
      "Most AI help fails in a real office because nobody wrote down how the office already does the task.",
    );
    expect(text).toContain(
      "If the steps only live in one person's head, neither a new hire nor an AI assistant can follow them reliably.",
    );
    expect(text).toContain('Why "just use AI" stalls');
    expect(text).toContain("Example: new-inquiry checklist (law firm, adaptable)");
    expect(text).toContain("How to write the procedure so a person or AI can follow it");
    expect(text).toContain('Where open "skills" fit (high level)');
    expect(text).toContain("Title: New inquiry — phone or web form");
    expect(text).toContain("start with an AI Opportunity Map");
    expect(text).not.toContain("Google Business Profile");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    expect(html).toContain(
      'href="https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation"',
    );
    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);

    for (const item of officeProceduresAiInstructionsFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
