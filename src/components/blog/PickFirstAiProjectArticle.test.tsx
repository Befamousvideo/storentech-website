import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { PickFirstAiProjectArticle } from "@/components/blog/PickFirstAiProjectArticle";
import {
  blogPosts,
  getPost,
  pickFirstAiProjectFaqs,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "pick-first-ai-project";
const post = getPost(slug);

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/PickFirstAiProjectArticle.tsx"),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "Start With One Problem: How a Small Business Should Pick Its First AI Project";
const description =
  "Don't start with an AI tool. Start with one problem. A simple way for small-business owners to pick a first AI project that pays off and is easy to check.";
const alt =
  "StorenTech AI blog header reading Start with one problem, beside a business owner holding a marker next to a whiteboard that lists Missed calls, Slow replies, Unpaid invoices, and After-hours calls, with Missed calls circled.";

describe("pick first AI project blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe("Start With One Problem | StorenTech AI");
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-10-30");
    expect(post?.faqs).toEqual(pickFirstAiProjectFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[0]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/pick-first-ai-project");
    expect(post?.hero).toEqual({
      avif: "/blog/pick-first-ai-project.avif",
      webp: "/blog/pick-first-ai-project.webp",
      width: 1600,
      height: 900,
      alt,
    });
  });

  it("ships a 1600x900 header in webp and avif under 300KB", async () => {
    const webpPath = join(process.cwd(), "public", post?.hero?.webp ?? "missing");
    const avifPath = join(process.cwd(), "public", post?.hero?.avif ?? "missing");
    expect(statSync(webpPath).size).toBeLessThan(300 * 1024);
    expect(statSync(avifPath).size).toBeLessThan(300 * 1024);
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

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/pick-first-ai-project"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-10-30"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/pick-first-ai-project",
    );
    expect(llmsSource.indexOf("pick-first-ai-project")).toBeLessThan(
      llmsSource.indexOf("ai-sorts-leads-service-requests"),
    );
    expect(llmsSource.indexOf("ai-sorts-leads-service-requests")).toBeLessThan(
      llmsSource.indexOf("ai-voice-agent-small-business"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/pick-first-ai-project`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-10-30"));
  });

  it("uses the header as the Open Graph and Twitter image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/pick-first-ai-project",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/pick-first-ai-project",
      images: [
        {
          url: "/blog/pick-first-ai-project.webp",
          width: 1600,
          height: 900,
          alt,
          type: "image/webp",
        },
        {
          url: "/blog/pick-first-ai-project.avif",
          width: 1600,
          height: 900,
          alt,
          type: "image/avif",
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: post?.metaTitle,
      description,
      images: [
        { url: "/blog/pick-first-ai-project.webp" },
        { url: "/blog/pick-first-ai-project.avif" },
      ],
    });
  });

  it("builds Article and FAQPage JSON-LD from the post, including the header image", async () => {
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
      datePublished: "2026-10-30",
      dateModified: "2026-10-30",
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/pick-first-ai-project.webp`,
        width: 1600,
        height: 900,
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
      pickFirstAiProjectFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      pickFirstAiProjectFaqs.map((item) => item.answer),
    );

    const encoded = JSON.stringify(blocks);
    expect(encoded).not.toContain("tel:");
    expect(encoded).not.toContain("mailto:");
    expect(encoded).not.toMatch(/HowTo/);
    expect(encoded).not.toMatch(emailPattern);
    expect(encoded).not.toMatch(phonePattern);
  });

  it("keeps draft notes and contact details out of the article", () => {
    expect(articleSource).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion|Vincent/,
    );
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("tel:");
    expect(articleSource).not.toContain("mailto:");
    expect(articleSource).not.toContain("https\\:");
    expect(articleSource).not.toMatch(emailPattern);
    expect(articleSource).not.toMatch(phonePattern);
    expect(articleSource).toContain('href="/opportunity"');
  });

  it("renders the approved body, header, and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <PickFirstAiProjectArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    const image = container.querySelector(".blog-hero-media img");
    expect(image).toHaveAttribute("src", "/blog/pick-first-ai-project.webp");
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "1600");
    expect(image).toHaveAttribute("height", "900");
    expect(html).toContain("/blog/pick-first-ai-project.avif");

    expect(text).toContain(
      "The best first AI project is one specific, repetitive problem that wastes your team's time every week, has a clear right answer and is easy to check. Don't start by picking a tool. Start by picking the problem, decide how you'll know it worked, and keep a person reviewing the results until you trust them.",
    );
    expect(text).toContain(
      "Most AI projects that disappoint started the other way around: someone saw an impressive demo and went looking for a place to use it.",
    );
    expect(text).toContain(
      "Pick the problem first. The tool is the last decision, not the first.",
    );
    expect(text).toContain('Why "start with the tool" goes wrong');
    expect(text).toContain(
      "It's easy to get excited about a new AI product. The demo looks great, a competitor mentions it, or a vendor promises it will handle everything.",
    );
    expect(text).toContain(
      "The trouble is that a tool without a clear job tends to drift. Nobody is sure what success looks like, the team uses it a little and then goes back to the old way, and a few months later it's another subscription nobody can explain.",
    );
    expect(text).toContain(
      "Starting with one problem flips that. You know exactly what the AI is supposed to do, who it helps and how you'll judge it.",
    );
    expect(text).toContain("What makes a good first problem");
    expect(text).toContain("Look for work that checks most of these boxes:");
    expect(text).toContain(
      "It happens often. Daily or weekly, not once a quarter.",
    );
    expect(text).toContain(
      "It follows a pattern. The same kinds of inputs and the same kinds of answers most of the time.",
    );
    expect(text).toContain(
      "It has a clear right answer. You'd recognize a mistake when you saw one.",
    );
    expect(text).toContain(
      "It's easy to check. A person can review the result in a minute or two.",
    );
    expect(text).toContain(
      "A mistake is fixable. If the AI gets one wrong, it's an inconvenience, not a disaster.",
    );
    expect(text).toContain(
      "People already complain about it. That's usually a sign the time cost is real.",
    );
    expect(text).toContain(
      "Common examples for Orange County service businesses include sorting incoming requests, drafting replies to routine questions, pulling details out of forms or invoices into a spreadsheet, summarizing calls or notes, and preparing a weekly report from data you already have.",
    );
    expect(text).toContain("What to leave for later");
    expect(text).toContain(
      "Some work makes a poor first project, even if AI might help with it eventually:",
    );
    expect(text).toContain(
      "Decisions about money, hiring or saying no to a customer. Keep a person in charge.",
    );
    expect(text).toContain(
      "Anything rare or unusual. If it only comes up a few times a year, there isn't much to gain.",
    );
    expect(text).toContain(
      "Work with no clear right answer. If your own team disagrees on the result, AI will struggle too.",
    );
    expect(text).toContain(
      "Processes that are already a mess. AI tends to speed up whatever process it's given, including a broken one. Clean up the steps first.",
    );
    expect(text).toContain(
      "Projects that touch every system at once. Save the big connected projects for after you've had a win.",
    );
    expect(text).toContain("A simple way to choose");
    expect(text).toContain(
      "Grab a notepad and spend thirty minutes on this with the people who do the work.",
    );
    expect(text).toContain(
      "List the repetitive tasks. Ask each person what they do every week that feels like copying, sorting, retyping or chasing.",
    );
    expect(text).toContain(
      "Estimate the time. Roughly how many hours a week does each one take across the team? A rough guess is fine.",
    );
    expect(text).toContain(
      "Rate the risk. For each task, ask: if it went wrong, how bad would it be? Low, medium or high.",
    );
    expect(text).toContain(
      "Circle the winner. Pick the task with the most time and the lowest risk.",
    );
    expect(text).toContain(
      'Define "worked." Write one sentence, such as "Requests get sorted by type before 9 a.m. and the team corrects fewer than a handful a week." Use your own numbers from your own business.',
    );
    expect(text).toContain(
      "Now you have a problem worth solving and a way to tell whether the solution is working.",
    );
    expect(text).toContain("Run it as a short trial");
    expect(text).toContain(
      "Treat the first project as an experiment, not a commitment:",
    );
    expect(text).toContain(
      "Keep it small. One task, one team, one inbox or form.",
    );
    expect(text).toContain(
      "Run it side by side. Let the AI work while your team keeps doing it the old way, and compare.",
    );
    expect(text).toContain(
      "Keep a person reviewing. Nothing goes to a customer without a check until you trust the results.",
    );
    expect(text).toContain(
      "Set a check-in date. Decide in advance when you'll look at the results and decide whether to keep going, adjust or stop.",
    );
    expect(text).toContain(
      "Make sure you own it. Whatever gets built should live in accounts your business controls.",
    );
    expect(text).toContain(
      "Security can stay simple at this stage: limit who has access, and know where your data goes.",
    );
    expect(text).toContain(
      "At StorenTech AI, we start every engagement by finding the one problem worth solving first, then we pick the tool that fits it.",
    );
    expect(text).toContain("Your first win makes the second one easier");
    expect(text).toContain(
      "Once one project works, your team trusts the process, you know what to measure, and the next project goes faster. That's how small businesses build up AI without betting the company on a single big purchase.",
    );
    expect(text).toContain(
      "If you'd like help finding that first problem, start your AI Opportunity Map. We look at how your team actually spends its week and point to the projects most likely to pay off, and the ones to leave for later.",
    );

    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("https\\:");
    expect(html).not.toMatch(emailPattern);
    expect(html).not.toMatch(phonePattern);
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    for (const item of pickFirstAiProjectFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
