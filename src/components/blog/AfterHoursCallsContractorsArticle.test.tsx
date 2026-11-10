import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AfterHoursCallsContractorsArticle } from "@/components/blog/AfterHoursCallsContractorsArticle";
import {
  afterHoursCallsContractorsFaqs,
  blogJsonLdDate,
  blogPosts,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { BOOKING_CTA_HREF, site } from "@/lib/site";

const slug = "after-hours-calls-contractors";
const post = getPost(slug);

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/AfterHoursCallsContractorsArticle.tsx"),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "What After-Hours Calls Are Worth to a Plumbing or HVAC Business";
const description =
  "A simple way for Orange County plumbing, HVAC and other contractors to work out what missed after-hours calls cost, using your own numbers.";
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

describe("after-hours calls contractors blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "What After-Hours Calls Are Worth | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-11-02");
    expect(post?.faqs).toEqual(afterHoursCallsContractorsFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[5]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/after-hours-calls-contractors");
    expect(post?.hero).toEqual({
      png: "/blog/after-hours-calls-contractors.png",
      width: 1920,
      height: 1080,
      alt,
    });
    expect(post?.ogImage).toEqual({
      src: "/blog/after-hours-calls-contractors-1200x630.png",
      width: 1200,
      height: 630,
      alt,
      type: "image/png",
    });
  });

  it("ships the 1920x1080 header PNG and the 1200x630 Open Graph PNG", () => {
    expect(pngSize("public/blog/after-hours-calls-contractors.png")).toEqual({
      width: 1920,
      height: 1080,
    });
    expect(
      pngSize("public/blog/after-hours-calls-contractors-1200x630.png"),
    ).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/after-hours-calls-contractors"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-11-02"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/after-hours-calls-contractors",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("hugging-face-github-explained"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/after-hours-calls-contractors`);
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
      canonical: "/blog/after-hours-calls-contractors",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/after-hours-calls-contractors",
      images: [
        {
          url: "/blog/after-hours-calls-contractors-1200x630.png",
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
          url: "/blog/after-hours-calls-contractors-1200x630.png",
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
      datePublished: blogJsonLdDate("2026-11-02"),
      dateModified: blogJsonLdDate("2026-11-02"),
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/after-hours-calls-contractors.png`,
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
      afterHoursCallsContractorsFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      afterHoursCallsContractorsFaqs.map((item) => item.answer),
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
    expect(articleSource).toContain('href="/contractors"');
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).toContain("BOOKING_CTA_HREF");
  });

  it("renders the approved body, header image, intro-call CTA, and FAQ without Class 107 leaks", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <AfterHoursCallsContractorsArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();

    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute(
      "src",
      "/blog/after-hours-calls-contractors.png",
    );
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1920");
    expect(image).toHaveAttribute("height", "1080");

    expect(text).toContain(
      "An after-hours call is often the most valuable call a contractor gets all week, because the person calling usually has a problem right now and will hire whoever answers first.",
    );
    expect(text).toContain(
      "A missed call at 9 p.m. isn't a message waiting for you in the morning. For many callers, it's a reason to call the next company.",
    );
    expect(text).toContain("Why after-hours calls are different");
    expect(text).toContain("A simple worksheet with your own numbers");
    expect(text).toContain("Weekly after-hours jobs you're missing = A × B × C.");
    expect(text).toContain("Weekly value you're missing = A × B × C × D.");
    expect(text).toContain("6 × 1/2 × 1/2 = 1.5 jobs a week");
    expect(text).toContain("1.5 × 52 = 78 jobs");
    expect(text).toContain(
      "StorenTech AI helps Orange County contractors answer after-hours calls with AI phone agents that ask your questions, follow your booking rules and hand urgent jobs to your team.",
    );
    expect(text).toContain("book a 15-minute intro call");

    const contractors = container.querySelector('a[href="/contractors"]');
    expect(contractors).toHaveTextContent("contractors page");

    const intro = [...container.querySelectorAll("a")].find((node) =>
      node.getAttribute("href") === BOOKING_CTA_HREF &&
      node.textContent?.includes("book a 15-minute intro call"),
    );
    expect(intro).toBeTruthy();

    const opportunity = container.querySelector('a[href="/opportunity"]');
    expect(opportunity).toHaveTextContent("AI Opportunity Map");

    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", BOOKING_CTA_HREF);
    expect(cta).toHaveTextContent("Book a 15-minute intro call");

    assertNoClass107ContactOrPay("rendered html", html);
    expect(html).not.toContain("https\\:");
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    for (const item of afterHoursCallsContractorsFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
