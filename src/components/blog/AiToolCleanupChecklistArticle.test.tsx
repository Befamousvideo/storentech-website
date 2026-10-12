import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiToolCleanupChecklistArticle } from "@/components/blog/AiToolCleanupChecklistArticle";
import {
  aiToolCleanupChecklistFaqs,
  blogPosts,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/AiToolCleanupChecklistArticle.tsx"),
  "utf8",
);

const blogSource = readFileSync(join(process.cwd(), "src/lib/blog.ts"), "utf8");
const slugPageSource = readFileSync(
  join(process.cwd(), "src/app/blog/[slug]/page.tsx"),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const post = getPost("ai-tool-cleanup-checklist");
const webpPath = join(
  process.cwd(),
  "public/blog/ai-tool-cleanup-checklist.webp",
);
const avifPath = join(
  process.cwd(),
  "public/blog/ai-tool-cleanup-checklist.avif",
);

const clientNames = [
  "Kei Concepts",
  "RJB Restaurant Group",
  "Bluewater Grill",
  "DKN Hotels",
  "King's Seafood",
  "VeriTech Plumbing",
  "Sea Pointe",
];

const draftNotes = [
  "DRAFT STATUS",
  "DO NOT PUBLISH",
  "BOB BLOCK",
  "GUARDRAILS",
  "Tony Traffic",
  "META (Bob",
];

describe("AI tool cleanup checklist blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post).toBeDefined();
    expect(post?.slug).toBe("ai-tool-cleanup-checklist");
    expect(post?.title).toBe(
      "Your Business Probably Has More AI Tools Than You Think. Here's a Cleanup Checklist",
    );
    expect(post?.metaTitle).toBe(
      "AI Tool Cleanup Checklist for Small Business | StorenTech AI",
    );
    expect(post?.description).toBe(
      "Your business likely uses more AI than you think. A quick checklist to count every AI tool, who owns it, and what it can touch.",
    );
    expect(post?.datePublished).toBe("2026-10-12");
    expect(post?.faqs).toEqual(aiToolCleanupChecklistFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts.map((item) => item.slug)).toContain(
      "ai-tool-cleanup-checklist",
    );
    expect(postPath("ai-tool-cleanup-checklist")).toBe(
      "/blog/ai-tool-cleanup-checklist",
    );
  });

  it("appears on the blog index list, in llms.txt, and in the sitemap", () => {
    expect(blogPosts.map((item) => item.slug)).toContain(
      "ai-tool-cleanup-checklist",
    );
    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/ai-tool-cleanup-checklist",
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/ai-tool-cleanup-checklist`);
    expect(urls).toContain(postUrl("ai-tool-cleanup-checklist"));

    const entry = sitemap().find((item) =>
      item.url.endsWith("/blog/ai-tool-cleanup-checklist"),
    );
    expect(entry?.lastModified).toEqual(new Date("2026-10-12"));
  });

  it("mirrors the five visible FAQ Q&As word for word", () => {
    expect(aiToolCleanupChecklistFaqs).toEqual([
      {
        question: "How do I find out which AI tools my business is using?",
        answer:
          "Check your subscriptions and credit card statements, look at the settings in the software you already pay for, and ask your team, without blame, what they use. Put it all in one list with who uses each tool and what it can reach.",
      },
      {
        question: 'What is "shadow AI"?',
        answer:
          "Shadow AI is any AI tool someone uses for work without the business knowing about it, like a no-cost assistant an employee signed up for on their own. It's usually well-meant, but it can mean company information is going somewhere nobody is watching.",
      },
      {
        question: "Should I ban employees from using AI tools?",
        answer:
          "Usually not. Banning tends to push use out of sight. A short list of approved tools, plus a simple rule that a person approves anything that sends, pays or deletes, works better.",
      },
      {
        question: "How often should a small business review its AI tools?",
        answer:
          "Once a quarter is a good habit. Software updates keep adding new AI features, often switched on by default.",
      },
      {
        question:
          "Can StorenTech AI help an Orange County business find every AI tool it's using?",
        answer:
          "Yes. StorenTech AI starts every engagement with an AI Opportunity Map, and counting the AI tools a business already uses is part of it. The map shows what's in use, what overlaps, what each tool can reach, and which AI moves pay back first.",
      },
    ]);
  });

  it("ships a 1600x900 webp and avif hero in public/blog", async () => {
    expect(existsSync(webpPath)).toBe(true);
    expect(existsSync(avifPath)).toBe(true);
    expect(post?.hero).toEqual({
      avif: "/blog/ai-tool-cleanup-checklist.avif",
      webp: "/blog/ai-tool-cleanup-checklist.webp",
      width: 1600,
      height: 900,
      alt: "StorenTech AI blog header showing Count your AI tools before you add another one, beside a checklist labeled AI tools and keep or cut choices for chat, calendar, email, documents, voice, and other apps.",
    });

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

  it("sets the title, description, and hero as the Open Graph and Twitter image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "ai-tool-cleanup-checklist" }),
    });

    expect(metadata.title).toEqual({
      absolute: "AI Tool Cleanup Checklist for Small Business | StorenTech AI",
    });
    expect(metadata.description).toBe(post?.description);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description: post?.description,
      url: "/blog/ai-tool-cleanup-checklist",
      images: [
        {
          url: "/blog/ai-tool-cleanup-checklist.webp",
          width: 1600,
          height: 900,
          alt: post?.hero?.alt,
          type: "image/webp",
        },
        {
          url: "/blog/ai-tool-cleanup-checklist.avif",
          width: 1600,
          height: 900,
          alt: post?.hero?.alt,
          type: "image/avif",
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: [
        { url: "/blog/ai-tool-cleanup-checklist.webp" },
        { url: "/blog/ai-tool-cleanup-checklist.avif" },
      ],
    });
  });

  it("builds Article and FAQPage JSON-LD from the post", async () => {
    const page = await BlogPostPage({
      params: Promise.resolve({ slug: "ai-tool-cleanup-checklist" }),
    });
    const { container } = render(page);
    const blocks = [...container.querySelectorAll('script[type="application/ld+json"]')].map(
      (node) => JSON.parse(node.textContent ?? "{}") as Record<string, unknown>,
    );

    const article = blocks.find((block) => {
      const type = block["@type"];
      return Array.isArray(type) && type.includes("BlogPosting") && type.includes("Article");
    });
    const faq = blocks.find((block) => block["@type"] === "FAQPage");

    expect(article).toMatchObject({
      headline: post?.title,
      description: post?.description,
      datePublished: "2026-10-12",
      dateModified: "2026-10-12",
      image: {
        "@type": "ImageObject",
        url: `${site.url}/blog/ai-tool-cleanup-checklist.webp`,
        width: 1600,
        height: 900,
      },
      author: { "@type": "Person", name: site.founder.name },
      publisher: { "@type": "Organization", name: site.name },
    });

    const mainEntity = faq?.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(mainEntity).toHaveLength(5);
    expect(mainEntity.map((item) => item.name)).toEqual(
      aiToolCleanupChecklistFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      aiToolCleanupChecklistFaqs.map((item) => item.answer),
    );

    const encoded = JSON.stringify(blocks);
    expect(encoded).not.toContain("tel:");
    expect(encoded).not.toContain("mailto:");
    expect(encoded).not.toMatch(/HowTo/);
  });

  it("keeps draft notes, contact details, client names, and video out of the article", () => {
    const corpus = [articleSource, blogSource, post?.title ?? "", post?.description ?? ""].join(
      "\n",
    );

    for (const note of draftNotes) {
      expect(articleSource).not.toContain(note);
      expect(corpus).not.toContain(note);
    }
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("tel:");
    expect(articleSource).not.toContain("mailto:");
    expect(articleSource.toLowerCase()).not.toContain("bunny");
    expect(articleSource).not.toContain("<video");
    expect(articleSource).not.toContain("<iframe");
    expect(articleSource).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(articleSource).not.toMatch(/\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/);
    expect(articleSource).toContain('href="/opportunity"');
    expect(articleSource).not.toContain('href="/contact"');
    expect(articleSource).toContain("/blog/ai-security-for-ai-employees");
    expect(articleSource).toContain("/blog/nvidia-ai-agent-safety-explained");
    expect(articleSource).toContain("/blog/what-is-an-automation-roi-analysis");
    expect(articleSource).toContain('href="/how-it-works"');
    expect(blogSource).toContain('slug: "ai-tool-cleanup-checklist"');
    expect(slugPageSource).toContain("AiToolCleanupChecklistArticle");
    for (const name of clientNames) {
      expect(articleSource).not.toContain(name);
    }
  });

  it("renders the approved body, hero, and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <AiToolCleanupChecklistArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(
      getByRole("heading", {
        level: 1,
        name: "Your Business Probably Has More AI Tools Than You Think. Here's a Cleanup Checklist",
      }),
    ).toBeInTheDocument();

    const image = container.querySelector("img");
    expect(image).toHaveAttribute("src", "/blog/ai-tool-cleanup-checklist.webp");
    expect(image).toHaveAttribute("alt", post?.hero?.alt);
    expect(image).toHaveAttribute("width", "1600");
    expect(image).toHaveAttribute("height", "900");
    expect(html).toContain('type="image/avif"');
    expect(html).toContain("/blog/ai-tool-cleanup-checklist.avif");
    expect(html).toContain('type="image/webp"');

    expect(text).toContain(
      "Yes, your business very likely uses more AI tools than you realize, because AI now ships inside the email, CRM, accounting and design software you already pay for.",
    );
    expect(text).toContain(
      'Ask most Orange County business owners how many AI tools their company uses, and you\'ll hear "two, maybe three." Then you start counting.',
    );
    expect(text).toContain("Count your AI tools before you add another one.");
    expect(text).toContain("raised $55 million");
    expect(text).toContain(
      "Tool, Who uses it, What it can touch, Who pays, Keep or cut.",
    );
    expect(text).toContain("List the AI you bought on purpose (5 minutes)");
    expect(text).toContain("List the AI that came along for the ride (5 minutes)");
    expect(text).toContain("Ask your team what they signed up for (10 minutes)");
    expect(text).toContain("Write down what each tool can reach (5 minutes)");
    expect(text).toContain("Decide keep, cut or check (5 minutes)");
    expect(text).toContain('What to do with the "check" pile');
    expect(text).toContain("Where StorenTech AI fits");
    expect(text).toContain(
      "what NVIDIA's agent safety push means for your business. For most owners, the list above is the right first step.",
    );
    expect(text).toContain(
      "If you'd like help with the count, start your AI Opportunity Map. Curious how it works first? See how it works or read how we figure out where automation pays.",
    );
    expect(text).toContain("start your AI Opportunity Map");
    expect(text).toContain("Start your AI Opportunity Map");

    expect(html).toContain('href="/opportunity"');
    expect(html).toContain('href="/how-it-works"');
    expect(html).toContain('href="/blog/ai-security-for-ai-employees"');
    expect(html).toContain('href="/blog/nvidia-ai-agent-safety-explained"');
    expect(html).toContain('href="/blog/what-is-an-automation-roi-analysis"');
    expect(html).not.toContain('href="/contact"');
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("bunny");
    expect(html).not.toContain("$1,000");
    expect(html).not.toContain("$2,000");
    expect(html).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(text).not.toMatch(/\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/);

    for (const item of aiToolCleanupChecklistFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
    for (const name of clientNames) {
      expect(text).not.toContain(name);
    }
  });
});
