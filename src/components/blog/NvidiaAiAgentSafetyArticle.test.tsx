import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { NvidiaAiAgentSafetyArticle } from "@/components/blog/NvidiaAiAgentSafetyArticle";
import {
  blogPosts,
  getPost,
  nvidiaAiAgentSafetyFaqs,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/NvidiaAiAgentSafetyArticle.tsx"),
  "utf8",
);

const blogSource = readFileSync(join(process.cwd(), "src/lib/blog.ts"), "utf8");
const slugPageSource = readFileSync(
  join(process.cwd(), "src/app/blog/[slug]/page.tsx"),
  "utf8",
);

const post = getPost("nvidia-ai-agent-safety-explained");
const bannedVendor = ["gr", "ok"].join("");

function collectText(...chunks: string[]) {
  return chunks.join("\n");
}

describe("NVIDIA AI agent safety blog post", () => {
  it("is registered with the approved slug, title, meta, date, and eight FAQs", () => {
    expect(post).toBeDefined();
    expect(post?.slug).toBe("nvidia-ai-agent-safety-explained");
    expect(post?.title).toBe(
      "NVIDIA Just Put Guardrails Around AI Agents. Here's What It Means for Your Business",
    );
    expect(post?.metaTitle).toBe(
      "NVIDIA's AI Agent Guardrails, Explained for Business Owners",
    );
    expect(post?.description).toBe(
      "NVIDIA launched new safety tools for AI agents. Here's what OpenShell and Sentry mean for Orange County business owners, in plain English.",
    );
    expect(post?.datePublished).toBe("2026-09-29");
    expect(post?.faqs).toEqual(nvidiaAiAgentSafetyFaqs);
    expect(post?.faqs).toHaveLength(8);
    expect(blogPosts[0]?.slug).toBe("nvidia-ai-agent-safety-explained");
  });

  it("appears on the blog index list and in the sitemap", () => {
    expect(blogPosts.map((item) => item.slug)).toContain(
      "nvidia-ai-agent-safety-explained",
    );
    expect(postPath("nvidia-ai-agent-safety-explained")).toBe(
      "/blog/nvidia-ai-agent-safety-explained",
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(
      `${site.url}/blog/nvidia-ai-agent-safety-explained`,
    );
    expect(urls).toContain(postUrl("nvidia-ai-agent-safety-explained"));
  });

  it("mirrors the eight visible FAQ Q&As word for word", () => {
    expect(nvidiaAiAgentSafetyFaqs).toEqual([
      {
        question: "Who can help an Orange County business set up AI agents safely?",
        answer:
          "StorenTech AI can help. It starts with the AI Opportunity Map, then builds agents with limits, logging, and human approval on risky actions.",
      },
      {
        question: "What is an AI agent, in plain English?",
        answer:
          "It's software powered by AI that can take actions on its own to finish a task, like updating records, moving files, or sending messages.",
      },
      {
        question: "Can an AI agent really get around its own rules?",
        answer:
          "NVIDIA says that in recent security incidents, agents got around security controls at the application layer to complete their assigned tasks. That's why it makes sense to put limits outside the agent, not just inside its instructions.",
      },
      {
        question: "Do I need NVIDIA hardware to use AI agents safely?",
        answer:
          "Not necessarily. Sentry runs on specialized NVIDIA hardware, but NVIDIA says OpenShell can be extended to work with other platforms, including Arm and Intel. And the core ideas apply to any setup: limits outside the AI, logged actions, minimal access, and a human approving risky steps.",
      },
      {
        question: 'What does "open source" mean for OpenShell?',
        answer:
          "It means the code is public. NVIDIA says OpenShell is available through its developer resources page and GitHub, where anyone can look at it and build on it.",
      },
      {
        question: "What should I ask an AI vendor before I sign?",
        answer:
          "Ask where the limits live, whether every action is logged, who can stop the agent, what access it needs, and whether it was tested in a sandbox first.",
      },
      {
        question: "Will StorenTech AI train AI on my business data?",
        answer:
          "No. We don't train on client data, and we keep data retention to a minimum. We also use least-privilege access and audit logs.",
      },
      {
        question: "How do I get started?",
        answer:
          "Start with an AI Opportunity Map. It shows where AI can help your business and includes vendor diligence. Contact us to book yours.",
      },
    ]);
  });

  it("builds FAQPage JSON-LD from the same eight visible Q&As", () => {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: nvidiaAiAgentSafetyFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    expect(faqLd.mainEntity).toHaveLength(8);
    expect(faqLd.mainEntity.map((item) => item.name)).toEqual(
      nvidiaAiAgentSafetyFaqs.map((item) => item.question),
    );
    expect(faqLd.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      nvidiaAiAgentSafetyFaqs.map((item) => item.answer),
    );
    expect(JSON.stringify(faqLd).toLowerCase()).not.toContain(bannedVendor);
    expect(JSON.stringify(faqLd)).not.toMatch(/ROIA/);
    expect(JSON.stringify(faqLd)).not.toMatch(/Blueprint/i);
  });

  it("keeps unpublished draft notes, vendor names, and scrapeable contact out of the article", () => {
    const metadata = collectText(
      post?.title ?? "",
      post?.metaTitle ?? "",
      post?.description ?? "",
      ...nvidiaAiAgentSafetyFaqs.flatMap((item) => [item.question, item.answer]),
    );
    const corpus = collectText(articleSource, metadata);

    expect(corpus.toLowerCase()).not.toContain(bannedVendor);
    expect(corpus).not.toContain("Notes for Bob");
    expect(corpus).not.toContain("not published");
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("tel:");
    expect(articleSource).not.toContain("mailto:");
    expect(articleSource).not.toContain("mastermind-hybrid-ai");
    expect(corpus).not.toMatch(/ROIA/);
    expect(corpus).not.toMatch(/Blueprint/i);
    expect(articleSource).toContain('rel="noopener noreferrer"');
    expect(articleSource).toContain(
      "https://nvidianews.nvidia.com/news/open-agent-safety-platform",
    );
    expect(articleSource).toContain(
      "https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell",
    );
    expect(articleSource).toContain("/blog/ai-security-for-ai-employees");
    expect(articleSource).toContain("/blog/zapier-webhooks-ai-agents");
    expect(articleSource).toContain('href="/contact"');
    expect(blogSource).toContain('slug: "nvidia-ai-agent-safety-explained"');
    expect(slugPageSource).toContain("NvidiaAiAgentSafetyArticle");
  });

  it("renders the body without forbidden strings or extra dollar figures", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <NvidiaAiAgentSafetyArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = container.textContent ?? "";

    expect(
      getByRole("heading", {
        level: 1,
        name: "NVIDIA Just Put Guardrails Around AI Agents. Here's What It Means for Your Business",
      }),
    ).toBeInTheDocument();

    expect(html.toLowerCase()).not.toContain(bannedVendor);
    expect(text.toLowerCase()).not.toContain(bannedVendor);
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("Notes for Bob");
    expect(html).not.toContain("not published");
    expect(html).not.toContain("<!--");
    expect(html).not.toContain("mastermind-hybrid-ai");
    expect(html).not.toMatch(/ROIA/);
    expect(html).not.toMatch(/Blueprint/i);
    expect(html).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(html).not.toMatch(/tel:/i);
    expect(text).not.toMatch(/\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/);

    const dollars = html.match(/\$\d{1,3}(?:,\d{3})*/g) ?? [];
    expect([...new Set(dollars)].sort()).toEqual(
      ["$1,000", "$2,000", "$3,000"].sort(),
    );
    expect(text).toContain("$1,000");
    expect(text).toContain("$2,000 to $3,000");
    expect((text.match(/Automation ROI Analysis/g) ?? []).length).toBe(1);
    expect(text).toContain(
      "But we do build these kinds of agent safety controls for our clients: clear boundaries on what each agent can touch, a record of every action, and a person approving anything risky. For StorenTech AI, the highest level of security is the starting point, not an add-on.",
    );
    expect(text).toContain(
      "StorenTech AI is a full-service AI agency in Orange County, CA that sets up AI agents for businesses with security built in from day one.",
    );
    expect(text).toContain("Our Mastermind hybrid post is coming soon, too.");
    expect(html).not.toMatch(/href=["'][^"']*mastermind-hybrid-ai/);

    for (const item of nvidiaAiAgentSafetyFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }

    expect(html).toContain(
      "https://nvidianews.nvidia.com/news/open-agent-safety-platform",
    );
    expect(html).toContain(
      "https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell",
    );
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
