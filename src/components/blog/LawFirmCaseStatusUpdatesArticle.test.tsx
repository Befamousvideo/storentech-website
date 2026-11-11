import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { LawFirmCaseStatusUpdatesArticle } from "@/components/blog/LawFirmCaseStatusUpdatesArticle";
import {
  blogJsonLdDate,
  blogPosts,
  getPost,
  lawFirmCaseStatusUpdatesFaqs,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "law-firm-case-status-updates";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/LawFirmCaseStatusUpdatesArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "When Clients Keep Calling for Case Updates, What Should an Orange County Firm Try First?";
const description =
  "Existing clients calling for case updates eat staff time. What an Orange County firm can try first, and why a person should approve every status update.";
const alt =
  "Calm law office reception desk with a phone and a screen showing a short case-update note ready to review.";

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

describe("law firm case status updates blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "When Clients Keep Calling for Case Updates | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-20");
    expect(post?.faqs).toEqual(lawFirmCaseStatusUpdatesFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[0]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/law-firm-case-status-updates");
    expect(post?.hero).toEqual({
      png: "/blog/law-firm-case-status-updates.png",
      width: 1920,
      height: 1080,
      alt,
    });
    expect(post?.ogImage).toEqual({
      src: "/blog/law-firm-case-status-updates-1200x630.png",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    });
  });

  it("ships the header PNG and the 1200x630 Open Graph PNG", () => {
    expect(pngSize("public/blog/law-firm-case-status-updates.png")).toEqual({
      width: 1920,
      height: 1080,
    });
    expect(
      pngSize("public/blog/law-firm-case-status-updates-1200x630.png"),
    ).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/law-firm-case-status-updates"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-20"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/law-firm-case-status-updates",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("weekly-report-download-rebuild"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/law-firm-case-status-updates`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-20"));
  });

  it("sets canonical, title, description, and the 1200x630 PNG as the Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/law-firm-case-status-updates",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/law-firm-case-status-updates",
      images: [
        {
          url: "/blog/law-firm-case-status-updates-1200x630.png",
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
          url: "/blog/law-firm-case-status-updates-1200x630.png",
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
      datePublished: blogJsonLdDate("2026-11-20"),
      dateModified: blogJsonLdDate("2026-11-20"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/law-firm-case-status-updates.png`,
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
      lawFirmCaseStatusUpdatesFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      lawFirmCaseStatusUpdatesFaqs.map((item) => item.answer),
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
      "https://www.clio.com/guides/client-intake-legal-trends/",
    );
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).toContain(
      'href="/blog/california-law-firm-ai-receptionist"',
    );
    expect(articleSource).toContain('href="/blog/law-firm-missed-calls"');
    expect(articleSource).not.toContain('href="/law"');
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <LawFirmCaseStatusUpdatesArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute(
      "src",
      "/blog/law-firm-case-status-updates.png",
    );
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1920");
    expect(image).toHaveAttribute("height", "1080");

    expect(text).toContain(
      'When existing clients keep calling to ask "What\'s happening with my case?", the first fix is usually not a new tool.',
    );
    expect(text).toContain(
      "Most status calls are not really about new information. They are about not knowing when the client will hear from you next.",
    );
    expect(text).toContain("Why the calls keep coming");
    expect(text).toContain("What to try first, before any AI");
    expect(text).toContain("Where AI can help, with a person in charge");
    expect(text).toContain("only 36% could explain the process and next steps.");
    expect(text).toContain(
      "When shoppers were able to connect with a law firm, 73% of them were unlikely to recommend the ones they spoke with.",
    );
    expect(text).toContain("Can a California Law Firm Use an AI Receptionist?");
    expect(text).toContain(
      "what happens when a potential client calls after hours",
    );
    expect(text).toContain(
      "StorenTech AI helps Orange County law firms cut down on status calls with drafted case updates and AI phone coverage, while a person at the firm reviews every update before it reaches a client.",
    );
    expect(text).toContain("start with an AI Opportunity Map");
    expect(text).not.toContain("Google Business Profile");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    expect(html).toContain(
      'href="https://www.clio.com/guides/client-intake-legal-trends/"',
    );
    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");

    for (const item of lawFirmCaseStatusUpdatesFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
