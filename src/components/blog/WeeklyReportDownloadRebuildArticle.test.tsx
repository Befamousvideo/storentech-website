import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { WeeklyReportDownloadRebuildArticle } from "@/components/blog/WeeklyReportDownloadRebuildArticle";
import {
  blogJsonLdDate,
  blogPosts,
  getPost,
  postPath,
  postUrl,
  weeklyReportDownloadRebuildFaqs,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "weekly-report-download-rebuild";
const post = getPost(slug);

const articleSource = readFileSync(
  join(
    process.cwd(),
    "src/components/blog/WeeklyReportDownloadRebuildArticle.tsx",
  ),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title = "The Weekly Report Your Office Still Downloads and Rebuilds by Hand";
const description =
  "If someone in your Orange County office rebuilds the same report every week from two portals, here is what to check first before reaching for AI.";
const alt =
  "Monday-morning desk with coffee, printouts and a laptop showing a spreadsheet rebuilt by hand.";

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

describe("weekly report download rebuild blog post", () => {
  it("is registered with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "The Weekly Report Your Office Still Downloads and Rebuilds by Hand | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-18");
    expect(post?.faqs).toEqual(weeklyReportDownloadRebuildFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[1]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/weekly-report-download-rebuild");
    expect(post?.hero).toEqual({
      png: "/blog/weekly-report-download-rebuild.png",
      width: 1920,
      height: 1080,
      alt,
    });
    expect(post?.ogImage).toEqual({
      src: "/blog/weekly-report-download-rebuild-1200x630.png",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    });
  });

  it("ships the header PNG and the 1200x630 Open Graph PNG", () => {
    expect(pngSize("public/blog/weekly-report-download-rebuild.png")).toEqual({
      width: 1920,
      height: 1080,
    });
    expect(
      pngSize("public/blog/weekly-report-download-rebuild-1200x630.png"),
    ).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/weekly-report-download-rebuild"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-18"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/weekly-report-download-rebuild",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("law-firm-ai-data-storage-check"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/weekly-report-download-rebuild`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-11-18"));
  });

  it("sets canonical, title, description, and the 1200x630 PNG as the Open Graph image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/weekly-report-download-rebuild",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/weekly-report-download-rebuild",
      images: [
        {
          url: "/blog/weekly-report-download-rebuild-1200x630.png",
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
          url: "/blog/weekly-report-download-rebuild-1200x630.png",
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
      datePublished: blogJsonLdDate("2026-11-18"),
      dateModified: blogJsonLdDate("2026-11-18"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/weekly-report-download-rebuild.png`,
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
      weeklyReportDownloadRebuildFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      weeklyReportDownloadRebuildFaqs.map((item) => item.answer),
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
    expect(articleSource).toContain(
      'href="/blog/ai-pull-reports-from-vendor-portals"',
    );
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <WeeklyReportDownloadRebuildArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute(
      "src",
      "/blog/weekly-report-download-rebuild.png",
    );
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1920");
    expect(image).toHaveAttribute("height", "1080");

    expect(text).toContain(
      "If someone in your office spends Monday morning downloading files from two or three websites and rebuilding the same spreadsheet, start by asking whether the software you already pay for can export or share that data on its own.",
    );
    expect(text).toContain(
      'The best first question is not "Can AI do this?" It is "Show me the report your manager rebuilds every week, and let\'s see whether your current software can simplify it first."',
    );
    expect(text).toContain("What the weekly rebuild usually looks like");
    expect(text).toContain("Step one: ask your existing software first");
    expect(text).toContain(
      "Step two: if a portal has no export, consider a supervised test",
    );
    expect(text).toContain(
      "Released the Computer Use tool to general availability (GA) across the Interactions and GenerateContent APIs.",
    );
    expect(text).toContain("Stop Losing Fridays to Portals");
    expect(text).toContain(
      "StorenTech AI helps Orange County businesses find the reports their teams rebuild every week, check what existing software can already do and test AI only where it clearly saves time, with a person still approving what goes out.",
    );
    expect(text).toContain("start with an AI Opportunity Map");
    expect(text).not.toContain("Google Business Profile");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    expect(html).toContain(
      'href="https://ai.google.dev/gemini-api/docs/changelog"',
    );
    expect(html).toContain(
      'href="/blog/ai-pull-reports-from-vendor-portals"',
    );
    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");

    for (const item of weeklyReportDownloadRebuildFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
