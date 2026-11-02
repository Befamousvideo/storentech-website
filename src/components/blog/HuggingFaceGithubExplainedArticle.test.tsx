import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { HuggingFaceGithubExplainedArticle } from "@/components/blog/HuggingFaceGithubExplainedArticle";
import {
  blogPosts,
  getPost,
  huggingFaceGithubExplainedFaqs,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "hugging-face-github-explained";
const post = getPost(slug);

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/HuggingFaceGithubExplainedArticle.tsx"),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "Hugging Face and GitHub, Explained: What They Are and Why Your AI Work Should Live There";
const description =
  "Hugging Face and GitHub in plain English: what each one does, why your AI tools and code should live there, and five questions to ask your developer.";

describe("Hugging Face and GitHub explained blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "Hugging Face and GitHub, Explained | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-10-28");
    expect(post?.faqs).toEqual(huggingFaceGithubExplainedFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[1]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/hugging-face-github-explained");
    expect(post?.hero).toBeUndefined();
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/hugging-face-github-explained"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-10-28"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/hugging-face-github-explained",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("ai-sorts-leads-service-requests"),
    );
    expect(llmsSource.indexOf("ai-sorts-leads-service-requests")).toBeLessThan(
      llmsSource.indexOf("ai-voice-agent-small-business"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/hugging-face-github-explained`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-10-28"));
  });

  it("sets canonical, title, and description without a hero image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/hugging-face-github-explained",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/hugging-face-github-explained",
    });
    expect(metadata.openGraph).not.toHaveProperty("images");
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
      datePublished: "2026-10-28",
      dateModified: "2026-10-28",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl(slug),
      },
      url: postUrl(slug),
      author: { "@type": "Person", name: site.founder.name },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
    });
    expect(article).not.toHaveProperty("image");

    const mainEntity = faq?.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(mainEntity).toHaveLength(5);
    expect(mainEntity.map((item) => item.name)).toEqual(
      huggingFaceGithubExplainedFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      huggingFaceGithubExplainedFaqs.map((item) => item.answer),
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

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <HuggingFaceGithubExplainedArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(text).toContain(
      "GitHub is where software code lives, with a full history of every change. Hugging Face is where AI models and the data behind them live, with notes on what each model is for and what its license allows. If someone builds AI tools for your business, the work should live in accounts like these that your business owns, so you can see it, keep it and hand it to someone else if you ever need to.",
    );
    expect(text).toContain(
      "You don't need to learn to code to benefit. You just need to know what to ask for.",
    );
    expect(text).toContain(
      "If your business paid for it, your business should own the account it lives in.",
    );
    expect(text).toContain("GitHub in plain English");
    expect(text).toContain(
      'GitHub is a website for storing and managing code. Each project lives in a "repository," which GitHub describes as holding all of a project\'s code, files and each file\'s revision history.',
    );
    expect(text).toContain(
      "That history is the important part for an owner. Every change is recorded: what changed, when and by whom. If an update breaks something, a developer can see exactly what changed and roll it back.",
    );
    expect(text).toContain("A few features worth knowing by name:");
    expect(text).toContain(
      "Private repositories. Only you and the people you invite can see the code.",
    );
    expect(text).toContain(
      "Secret scanning. GitHub looks for passwords and access keys that were accidentally saved in code and raises an alert. It runs automatically on public repositories; for private repositories owned by a company account, GitHub offers it as part of its Secret Protection option on certain plans.",
    );
    expect(text).toContain(
      "Dependabot alerts. Most software is built on other people's building blocks. GitHub warns you when one of those blocks has a known security problem so it can be updated.",
    );
    expect(text).toContain("Hugging Face in plain English");
    expect(text).toContain(
      "Hugging Face is a website for sharing and finding AI models, the data used to train them and small demo apps.",
    );
    expect(text).toContain("For a business owner, three things matter:");
    expect(text).toContain(
      "Model cards. Each model comes with a page describing what it's meant for, its known limitations and what data it was trained on. Think of it as the label on the box.",
    );
    expect(text).toContain(
      "Licenses. The model page shows its license. Some allow business use; others restrict it. Someone should check before a model goes into a customer-facing tool.",
    );
    expect(text).toContain(
      "Private and gated access. Companies can keep their own models and data private, and model authors can require people to request access before downloading.",
    );
    expect(text).toContain(
      "Like GitHub, Hugging Face keeps a version history, so you can tell which version of a model or dataset a tool is using.",
    );
    expect(text).toContain("Why your AI work should live in places like these");
    expect(text).toContain(
      "When a business hires someone to build an AI tool, the work often ends up scattered across the builder's laptop, personal accounts and a few cloud services. That works until something changes.",
    );
    expect(text).toContain(
      "Keeping the work in organized, business-owned accounts on platforms like GitHub and Hugging Face gives you:",
    );
    expect(text).toContain(
      "Ownership. The code and models sit in an account your business controls, not one tied to a single person.",
    );
    expect(text).toContain(
      "A record. You can see what changed and when, which makes problems faster to trace.",
    );
    expect(text).toContain(
      "A way back. If an update goes wrong, a previous version is still there.",
    );
    expect(text).toContain(
      "Easier handoffs. If you switch developers, the next person can pick up where the last one left off.",
    );
    expect(text).toContain(
      "Fewer surprises. Built-in alerts can catch leaked passwords and outdated building blocks early.",
    );
    expect(text).toContain(
      "For Orange County businesses that rely on one outside developer, the handoff point alone is worth it.",
    );
    expect(text).toContain("Five questions to ask your developer");
    expect(text).toContain(
      "You don't have to manage these platforms yourself. Ask whoever builds your AI tools:",
    );
    expect(text).toContain(
      "Whose account is the code in? It should be an organization account your business owns, with you as an owner.",
    );
    expect(text).toContain(
      "Is it private? Customer-related code and data should not be public.",
    );
    expect(text).toContain(
      "Are alerts turned on? Ask whether secret scanning and dependency alerts are active, and who reads them.",
    );
    expect(text).toContain(
      "What models are we using, and what do their licenses allow? Ask for the model card link for each one.",
    );
    expect(text).toContain(
      "If you left tomorrow, could someone else take over? The honest answer should be yes, with a short note explaining where everything lives.",
    );
    expect(text).toContain(
      "Keep security at the right level for your size: limit who has access, use separate access keys for separate tools, and remove people who no longer need access. A developer can set this up quickly.",
    );
    expect(text).toContain(
      "At StorenTech AI, we believe the business that pays for an AI tool should own it, see its history and be able to take it anywhere.",
    );
    expect(text).toContain("A sensible first step");
    expect(text).toContain(
      "If you already have AI tools or automations and aren't sure where they live or who controls them, that's a good place to start. Start your AI Opportunity Map and we'll look at what you have, where it lives and what to fix or build next.",
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

    for (const item of huggingFaceGithubExplainedFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
