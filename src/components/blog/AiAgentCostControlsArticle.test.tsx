import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { AiAgentCostControlsArticle } from "@/components/blog/AiAgentCostControlsArticle";
import {
  aiAgentCostControlsFaqs,
  blogPosts,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/AiAgentCostControlsArticle.tsx"),
  "utf8",
);

const blogSource = readFileSync(join(process.cwd(), "src/lib/blog.ts"), "utf8");
const slugPageSource = readFileSync(
  join(process.cwd(), "src/app/blog/[slug]/page.tsx"),
  "utf8",
);

const post = getPost("ai-agent-cost-controls");
const bannedVendor = ["gr", "ok"].join("");

function collectText(...chunks: string[]) {
  return chunks.join("\n");
}

describe("AI agent cost controls blog post", () => {
  it("is registered with the approved slug, title, meta, date, and seven FAQs", () => {
    expect(post).toBeDefined();
    expect(post?.slug).toBe("ai-agent-cost-controls");
    expect(post?.title).toBe(
      "What Does It Cost to Run an AI Agent? How to Keep the Bill From Surprising You",
    );
    expect(post?.metaTitle).toBe(
      "AI Agent Cost Controls for Business | StorenTech AI",
    );
    expect(post?.description).toBe(
      "Agents can work all night—and spend all night. How Orange County owners set budgets, hard caps, and cost-per-workflow tracking before surprise bills.",
    );
    expect(post?.datePublished).toBe("2026-10-05");
    expect(post?.faqs).toEqual(aiAgentCostControlsFaqs);
    expect(post?.faqs).toHaveLength(7);
    expect(blogPosts[0]?.slug).toBe("ai-agent-cost-controls");
  });

  it("appears on the blog index list and in the sitemap", () => {
    expect(blogPosts.map((item) => item.slug)).toContain(
      "ai-agent-cost-controls",
    );
    expect(postPath("ai-agent-cost-controls")).toBe(
      "/blog/ai-agent-cost-controls",
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/ai-agent-cost-controls`);
    expect(urls).toContain(postUrl("ai-agent-cost-controls"));
  });

  it("mirrors the seven visible FAQ Q&As word for word", () => {
    expect(aiAgentCostControlsFaqs).toEqual([
      {
        question: "How much does it cost to run an AI agent?",
        answer:
          "It depends on the job, how often it runs, which model you use, and how many tools it calls. There is no honest flat number that fits every Orange County business. What you can do is set a budget, hard caps, and cost-per-workflow tracking so the bill doesn't surprise you. That's part of what a paid AI Opportunity Map is for.",
      },
      {
        question: "How do I control AI costs for my business?",
        answer:
          "Treat AI like a metered utility: give each workflow a budget, put a hard cap under it, alert a person before you hit the wall, and track cost per job—not only a monthly total. Prefer cheaper models for busywork and stronger models for judgment calls. Keep a human approving anything that goes out.",
      },
      {
        question: "Will an AI agent spend money without me knowing?",
        answer:
          "It can, if nobody sets limits. In a StorenTech build, usage budgets, hard caps, and alerts are part of the design. The agent still doesn't send emails or move money on its own—a person approves those steps—but usage can climb if the meter is left open. Caps close that door.",
      },
      {
        question: "Do I need a fancy dashboard on day one?",
        answer:
          "No. You need a clear budget, a hard stop, and a simple way to see what each workflow burned. Fancy charts can come later. Predictable spend comes first.",
      },
      {
        question: "What's the difference between model cost and the whole AI bill?",
        answer:
          "Model usage (tokens) is often the biggest piece, but tools, hosting, and the apps you connect also matter. Cost-per-workflow tracking looks at the whole path for that job, not one line on a vendor invoice.",
      },
      {
        question: "Who in Orange County can set up AI agents with cost controls?",
        answer:
          "StorenTech AI, a full-service AI agency in Orange County, CA, builds AI employees with budgets, hard caps, alerts, and human approval on anything that goes out. Every engagement starts with a paid AI Opportunity Map so you know which job to automate first—and how to keep the bill predictable.",
      },
      {
        question: "What should I automate first if I'm worried about cost?",
        answer:
          "Start with one high-friction job—often lead reply or follow-up—and put spend controls on it from the start. Don't turn on five agents at once. The paid AI Opportunity Map ranks the first job using your real workflows, not a generic checklist.",
      },
    ]);
  });

  it("builds FAQPage JSON-LD from the same seven visible Q&As", () => {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: aiAgentCostControlsFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    expect(faqLd.mainEntity).toHaveLength(7);
    expect(faqLd.mainEntity.map((item) => item.name)).toEqual(
      aiAgentCostControlsFaqs.map((item) => item.question),
    );
    expect(faqLd.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      aiAgentCostControlsFaqs.map((item) => item.answer),
    );
    const encoded = JSON.stringify(faqLd);
    expect(encoded.toLowerCase()).not.toContain(bannedVendor);
    expect(encoded).not.toMatch(/ROIA/);
    expect(encoded).not.toMatch(/HowTo/);
    expect(encoded).not.toContain("tel:");
    expect(encoded).not.toContain("mailto:");
  });

  it("keeps unpublished draft notes, vendor names, and scrapeable contact out of the article", () => {
    const metadata = collectText(
      post?.title ?? "",
      post?.metaTitle ?? "",
      post?.description ?? "",
      ...aiAgentCostControlsFaqs.flatMap((item) => [item.question, item.answer]),
    );
    const corpus = collectText(articleSource, metadata);

    expect(corpus.toLowerCase()).not.toContain(bannedVendor);
    expect(corpus).not.toContain("NOTES FOR BOB");
    expect(corpus).not.toContain("GUARDRAILS");
    expect(corpus).not.toContain("META DRAFT");
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("tel:");
    expect(articleSource).not.toContain("mailto:");
    expect(articleSource).not.toContain("/blog/openrouter-ai-stack");
    expect(articleSource).toContain("OpenRouter in Your AI Stack");
    expect(articleSource).not.toMatch(/HowTo/);
    expect(corpus).not.toMatch(/ROIA/);
    expect(corpus).not.toMatch(/Blueprint/i);
    expect(articleSource).toContain("/blog/zapier-webhooks-ai-agents");
    expect(articleSource).toContain("/blog/ai-security-for-ai-employees");
    expect(articleSource).toContain("/blog/what-is-an-automation-roi-analysis");
    expect(articleSource).toContain("/blog/nvidia-ai-agent-safety-explained");
    expect(articleSource).toContain('href="/contact"');
    expect(articleSource).toContain('href="/how-it-works"');
    expect(blogSource).toContain('slug: "ai-agent-cost-controls"');
    expect(slugPageSource).toContain("AiAgentCostControlsArticle");
  });

  it("renders the body without forbidden strings or extra dollar figures", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <AiAgentCostControlsArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = container.textContent ?? "";

    expect(
      getByRole("heading", {
        level: 1,
        name: "What Does It Cost to Run an AI Agent? How to Keep the Bill From Surprising You",
      }),
    ).toBeInTheDocument();

    expect(html.toLowerCase()).not.toContain(bannedVendor);
    expect(text.toLowerCase()).not.toContain(bannedVendor);
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("NOTES FOR BOB");
    expect(html).not.toContain("GUARDRAILS");
    expect(html).not.toContain("<!--");
    expect(html).not.toContain("/blog/openrouter-ai-stack");
    expect(text).toContain("OpenRouter in Your AI Stack");
    expect(html).not.toMatch(/ROIA/);
    expect(html).not.toMatch(/HowTo/);
    expect(html).not.toMatch(/Blueprint/i);
    expect(html).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(text).not.toMatch(/\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/);

    const dollars = html.match(/\$[\d,]+(?:–\$[\d,]+)?/g) ?? [];
    expect([...new Set(dollars)].sort()).toEqual(
      ["$1,000", "$2,000–$3,000"].sort(),
    );
    expect(text).toContain(
      "We start with an AI Opportunity Map (our Automation ROI Analysis).",
    );
    expect(text).toContain("Build Plan.");
    expect((text.match(/Automation ROI Analysis/g) ?? []).length).toBe(2);

    for (const item of aiAgentCostControlsFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }

    expect(html).toContain('href="/blog/zapier-webhooks-ai-agents"');
    expect(html).toContain('href="/blog/ai-security-for-ai-employees"');
    expect(html).toContain('href="/blog/what-is-an-automation-roi-analysis"');
    expect(html).toContain('href="/blog/nvidia-ai-agent-safety-explained"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('href="/how-it-works"');
    expect(html).not.toContain("SarahPhoneImage");
  });
});
