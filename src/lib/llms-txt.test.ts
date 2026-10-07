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
      "- [What Does It Cost to Run an AI Agent?](https://www.storentechai.com/blog/ai-agent-cost-controls): How Orange County owners set budgets, hard caps, and cost-per-workflow tracking before surprise AI bills.",
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

  it('contains "Automation ROI Analysis" exactly once', () => {
    expect(text.match(/Automation ROI Analysis/g)).toEqual([
      "Automation ROI Analysis",
    ]);
  });

  it("uses only absolute www.storentechai.com links", () => {
    const hrefs = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(
      (match) => match[1],
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith(`${ORIGIN}/`)).toBe(true);
    }
    expect(text).toContain(`${ORIGIN}/ai-opportunity-map`);
    expect(text).not.toContain(`${ORIGIN}/roia`);
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

    const withoutMapPath = text.replaceAll(`${ORIGIN}/ai-opportunity-map`, "");
    expect(withoutMapPath).not.toMatch(/\bROIA\b/i);
    expect(text).toContain(`${ORIGIN}/ai-opportunity-map`);
    expect(text).not.toContain(`${ORIGIN}/roia`);
  });
});
