import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ZapierWebhooksAiAgentsArticle } from "@/components/blog/ZapierWebhooksAiAgentsArticle";
import { getPost, zapierWebhooksAiAgentsFaqs } from "@/lib/blog";

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/ZapierWebhooksAiAgentsArticle.tsx"),
  "utf8",
);

const post = getPost("zapier-webhooks-ai-agents");

describe("Zapier + AI Agents blog post", () => {
  it("is registered with the approved slug, title, meta, date, and six FAQs", () => {
    expect(post).toBeDefined();
    expect(post?.slug).toBe("zapier-webhooks-ai-agents");
    expect(post?.title).toBe(
      "Zapier + AI Agents, Explained for Business Owners: Get the Busywork Done (and Keep the Final Say)",
    );
    expect(post?.metaTitle).toBe(
      "Zapier + AI Agents for Business Owners | StorenTech AI",
    );
    expect(post?.description).toBe(
      "New to automation? Learn what Zapier does, how an AI assistant can handle busywork, and why a person still approves anything that goes out.",
    );
    expect(post?.datePublished).toBe("2026-09-28");
    expect(post?.faqs).toEqual(zapierWebhooksAiAgentsFaqs);
    expect(post?.faqs).toHaveLength(6);
  });

  it("mirrors the six visible FAQ Q&As word for word", () => {
    expect(zapierWebhooksAiAgentsFaqs).toEqual([
      {
        question: "Do I need to know how to code?",
        answer:
          "No. You don't build anything. StorenTech sets it up, tests it, and shows your team how to review and approve the drafts.",
      },
      {
        question: "Is Zapier expensive? Do I need a paid plan?",
        answer:
          "Zapier has a Free plan, but the webhook feature we use to connect apps instantly isn't on it. Zapier lists that feature on its paid plans (Professional, Team, and Enterprise). Zapier's plans and pricing change, so check their current plan page. We'll tell you which plan your setup needs during the AI Opportunity Map.",
      },
      {
        question: "Will the AI send emails on its own?",
        answer:
          "No. In StorenTech builds, the agent drafts and prepares. A person approves every outgoing email, every public reply, and anything involving money.",
      },
      {
        question: "What if something breaks?",
        answer:
          "Because a person approves anything that goes out, a hiccup shouldn't turn into a wrong email landing in a customer's inbox. We test with sample data before going live, and a Zap can be turned off at any time. There's also an emergency stop, which we walk through with you during setup.",
      },
      {
        question: "Is my customer data safe?",
        answer:
          "It can be, with good habits. Zapier's own advice is to treat a webhook address like a password. We send the agent only the details it needs for the job, keep passwords and keys out of shared places, and limit what each agent can access.",
      },
      {
        question: "What should I automate first?",
        answer:
          "Whatever is costing you the most time or money right now. For many Orange County businesses, that's answering leads or following up. But the honest answer comes from your own workflows. That's what the paid AI Opportunity Map is for.",
      },
    ]);
  });

  it("keeps unpublished draft notes, vendor names, and scrapeable contact out of the article", () => {
    const bannedVendor = ["gr", "ok"].join("");
    expect(articleSource.toLowerCase()).not.toContain(bannedVendor);
    expect(articleSource).not.toContain("NOTES FOR BOB");
    expect(articleSource).not.toContain("GUARDRAILS");
    expect(articleSource).not.toContain("META DRAFT");
    expect(articleSource).not.toContain("tel:");
    expect(articleSource).not.toContain("mailto:");
    expect(articleSource).not.toContain("mastermind-hybrid-ai");
    expect(articleSource).not.toMatch(/HowTo/);
    expect(articleSource).not.toMatch(/ROIA/);
    expect(articleSource).not.toMatch(/Blueprint/i);
  });

  it("renders the body without forbidden strings or extra dollar figures", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <ZapierWebhooksAiAgentsArticle post={post!} />,
    );
    const html = container.innerHTML;

    expect(
      getByRole("heading", {
        level: 1,
        name: "Zapier + AI Agents, Explained for Business Owners: Get the Busywork Done (and Keep the Final Say)",
      }),
    ).toBeInTheDocument();
    expect(html.toLowerCase()).not.toContain(["gr", "ok"].join(""));
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("NOTES FOR BOB");
    expect(html).not.toContain("GUARDRAILS");
    expect(html).not.toContain("mastermind-hybrid-ai");
    expect(html).not.toMatch(/ROIA/);
    expect(html).not.toMatch(/Blueprint/i);
    expect(html).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

    const dollars = html.match(/\$[\d,]+(?:–\$[\d,]+)?/g) ?? [];
    expect([...new Set(dollars)].sort()).toEqual(
      ["$1,000", "$2,000–$3,000"].sort(),
    );
    expect(html).toContain(
      "We start with an AI Opportunity Map (our Automation ROI Analysis).",
    );
    expect(html).toContain("Build Plan.");
    expect(
      (html.match(/Automation ROI Analysis/g) ?? []).length,
    ).toBe(1);
  });
});
