import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { CaliforniaLawFirmAiReceptionistArticle } from "@/components/blog/CaliforniaLawFirmAiReceptionistArticle";
import {
  blogJsonLdDate,
  blogPosts,
  californiaLawFirmAiReceptionistFaqs,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "california-law-firm-ai-receptionist";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/CaliforniaLawFirmAiReceptionistArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "Can a California Law Firm Use an AI Receptionist? What the State Bar's AI Guidance Asks of You";
const description =
  "What the State Bar of California's generative AI guidance asks of firms considering an AI receptionist. Not legal advice.";
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

describe("California law firm AI receptionist blog post", () => {
  it("is registered with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Can a California Law Firm Use an AI Receptionist? | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-11");
    expect(post?.faqs).toEqual(californiaLawFirmAiReceptionistFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[1]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/california-law-firm-ai-receptionist");
    expect(post?.hero).toEqual({
      png: "/blog/california-law-firm-ai-receptionist.png",
      width: 1920,
      height: 1080,
      alt,
    });
    expect(post?.ogImage).toEqual({
      src: "/blog/california-law-firm-ai-receptionist-1200x630.png",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    });
  });


  it("ships the header PNG and the 1200x630 Open Graph PNG", () => {
    expect(pngSize("public/blog/california-law-firm-ai-receptionist.png")).toEqual({
      width: 1920,
      height: 1080,
    });
    expect(pngSize("public/blog/california-law-firm-ai-receptionist-1200x630.png")).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain(
      'href="/blog/california-law-firm-ai-receptionist"',
    );
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-11"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/california-law-firm-ai-receptionist",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("questions-before-hiring-ai-developer"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(
      `${site.url}/blog/california-law-firm-ai-receptionist`,
    );
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-11"));
  });

  it("sets canonical, title, description, and the 1200x630 PNG as the Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/california-law-firm-ai-receptionist",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/california-law-firm-ai-receptionist",
      images: [
        {
          url: "/blog/california-law-firm-ai-receptionist-1200x630.png",
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
          url: "/blog/california-law-firm-ai-receptionist-1200x630.png",
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
      datePublished: blogJsonLdDate("2026-11-11"),
      dateModified: blogJsonLdDate("2026-11-11"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/california-law-firm-ai-receptionist.png`,
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
      californiaLawFirmAiReceptionistFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      californiaLawFirmAiReceptionistFaqs.map((item) => item.answer),
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
    expect(articleSource).toContain('href="/opportunity"');
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <CaliforniaLawFirmAiReceptionistArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute(
      "src",
      "/blog/california-law-firm-ai-receptionist.png",
    );
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1920");
    expect(image).toHaveAttribute("height", "1080");

    expect(text).toContain(
      "California law firms can look at AI receptionists and intake tools, but the State Bar of California's practical guidance on generative AI asks lawyers to keep meaningful supervision",
    );
    expect(text).toContain("This post is a plain-English summary for Orange County owners — it is not legal advice.");
    expect(text).toContain(
      "An AI receptionist is a tool for intake and routing. It is not a substitute for a lawyer's judgment about advice, conflicts or who the firm will represent.",
    );
    expect(text).toContain("What the guidance means by agentic AI and intake");
    expect(text).toContain("Supervision: legal advice still needs a lawyer");
    expect(text).toContain("Client information leaving the firm");
    expect(text).toContain("A practical checklist for Orange County owners");
    expect(text).toContain("require more than reliance on generalized marketing assurances.");
    expect(text).toContain("start with an AI Opportunity Map");
    expect(text).not.toContain("Google Business Profile");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);

    for (const item of californiaLawFirmAiReceptionistFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
