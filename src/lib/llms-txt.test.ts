import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const LLMS_PATH = join(process.cwd(), "public/llms.txt");
const ORIGIN = "https://www.storentechai.com";
const PRIVATE_PATHS = ["/ceo", "/cfo", "/ops", "/pay", "/redo", "/api", "/for"];

describe("llms.txt", () => {
  const bytes = readFileSync(LLMS_PATH);
  const text = bytes.toString("utf8");

  it("is the approved static file with a trailing newline", () => {
    expect(bytes[bytes.length - 1]).toBe(0x0a);
    expect(text.startsWith("# StorenTech AI\n")).toBe(true);
    expect(text).toContain("## Pages");
    expect(text).toContain("## Blog");
    expect(text).toContain(
      "- [AI Can Sort Your Leads and Service Requests in Seconds. Here's Where a Person Should Still Decide.](https://www.storentechai.com/blog/ai-sorts-leads-service-requests): AI can now sort leads and service requests almost instantly. Here's what to let it sort, and the decisions a person in your business should still make.",
    );
    expect(text.indexOf("ai-sorts-leads-service-requests")).toBeLessThan(
      text.indexOf("ai-voice-agent-small-business"),
    );
    expect(text).toContain(
      "- [What a Voice Agent Can Do for a Small Business: Answer, Book, Sell](https://www.storentechai.com/blog/ai-voice-agent-small-business): An AI voice agent can answer every call, book appointments and handle sales questions for contractors and field service firms, while your team owns the customer.",
    );
    expect(text.indexOf("ai-voice-agent-small-business")).toBeLessThan(
      text.indexOf("what-should-your-business-ai-be-allowed-to-do"),
    );
    expect(text).toContain(
      "- [Before AI Clicks Submit: 4 Questions to Decide What Your Business AI Is Allowed to Do](https://www.storentechai.com/blog/what-should-your-business-ai-be-allowed-to-do): Before AI clicks a button for your business, answer 4 questions: what it can see, what it can change, what needs your yes, and who owns it.",
    );
    expect(text).toContain(
      "- [Stop Losing Fridays to Portals. How AI Can Pull Reports From Websites That Don't Connect to Anything](https://www.storentechai.com/blog/ai-pull-reports-from-vendor-portals): If your team logs into vendor websites to copy numbers into spreadsheets, AI can now do the reading while a person approves anything that changes.",
    );
    expect(
      text.indexOf("what-should-your-business-ai-be-allowed-to-do"),
    ).toBeLessThan(text.indexOf("ai-pull-reports-from-vendor-portals"));
    expect(text).toContain(
      "- [One Popular AI Model Retires Nov. 30. A 15-Minute Check for Business Owners](https://www.storentechai.com/blog/ai-model-retirement-nov-30-business-checklist): Claude Sonnet 4.5 retires Nov. 30, 2026 on Anthropic's API. A 15-minute check to see if your chatbot, assistant or automation depends on it.",
    );
    expect(text.indexOf("ai-pull-reports-from-vendor-portals")).toBeLessThan(
      text.indexOf("ai-model-retirement-nov-30-business-checklist"),
    );
    expect(text).toContain(
      "- [When AI Agents Don't Stop: What Anthropic's Report Means for Your Business](https://www.storentechai.com/blog/when-ai-agents-dont-stop): AI agents can take actions nobody intended, like submitting the wrong form. Here's what Anthropic's Oct 9 report means for small business owners.",
    );
    expect(text.indexOf("ai-model-retirement-nov-30-business-checklist")).toBeLessThan(
      text.indexOf("when-ai-agents-dont-stop"),
    );
    expect(text.indexOf("when-ai-agents-dont-stop")).toBeLessThan(
      text.indexOf("ai-tool-cleanup-checklist"),
    );
    expect(text).toContain(
      "- [Your Business Probably Has More AI Tools Than You Think. Here's a Cleanup Checklist](https://www.storentechai.com/blog/ai-tool-cleanup-checklist): Your business likely uses more AI than you think. A quick checklist to count every AI tool, who owns it, and what it can touch.",
    );
    expect(text).toContain(
      "- [What Does It Cost to Run an AI Agent?](https://www.storentechai.com/blog/ai-agent-cost-controls): How Orange County owners set budgets, hard caps, and cost-per-workflow tracking before surprise AI bills.",
    );
    expect(text.indexOf("ai-tool-cleanup-checklist")).toBeLessThan(
      text.indexOf("ai-agent-cost-controls"),
    );
    expect(text).toContain(
      "- [NVIDIA Just Put a Safety Boundary Around AI Agents](https://www.storentechai.com/blog/nvidia-ai-agent-safety-explained): What NVIDIA's new open agent safety platform means for small businesses, in plain English.",
    );
    expect(text.indexOf("ai-agent-cost-controls")).toBeLessThan(
      text.indexOf("nvidia-ai-agent-safety-explained"),
    );
    expect(text.indexOf("nvidia-ai-agent-safety-explained")).toBeLessThan(
      text.indexOf("zapier-webhooks-ai-agents"),
    );
  });

  it("does not use the retired Automation ROI Analysis name", () => {
    expect(text).not.toContain("Automation ROI Analysis");
    expect(text).toContain(
      "Every client starts with a paid AI Opportunity Map that shows",
    );
  });

  it("uses only absolute www.storentechai.com links", () => {
    const hrefs = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(
      (match) => match[1],
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith(`${ORIGIN}/`)).toBe(true);
    }
    expect(text).toContain(`${ORIGIN}/opportunity`);
    expect(text).not.toContain(`${ORIGIN}/ai-opportunity-map`);
    expect(text).not.toContain(`${ORIGIN}/roia`);
    expect(text).not.toContain(`${ORIGIN}/map`);
    expect(text).not.toContain("https://storentech.com");
  });

  it("keeps private, payment, and API paths out of the file", () => {
    for (const path of PRIVATE_PATHS) {
      expect(text).not.toContain(path);
    }
  });

  it("has no scrapeable phone, email, prices, or banned terms", () => {
    expect(text).not.toContain("tel:");
    expect(text).not.toContain("mailto:");
    expect(text).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(text).not.toMatch(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    expect(text).not.toMatch(/\$[\d,]+/);
    expect(text).not.toContain("buy.stripe.com");
    expect(text.toLowerCase()).not.toContain(["gr", "ok"].join(""));
    expect(text).not.toMatch(/Blueprint/i);

    const withoutMapPath = text.replaceAll(`${ORIGIN}/opportunity`, "");
    expect(withoutMapPath).not.toMatch(/\bROIA\b/i);
    expect(text).toContain(`${ORIGIN}/opportunity`);
    expect(text).not.toContain(`${ORIGIN}/ai-opportunity-map`);
    expect(text).not.toContain(`${ORIGIN}/roia`);
    expect(text).not.toContain(`${ORIGIN}/map`);
  });
});
