import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  FAQ_HELPER_KNOWLEDGE_VERSION,
  faqKnowledgeEntries,
} from "@/lib/faq-helper/knowledge";
import { site } from "@/lib/site";
import { siteFaqs } from "@/lib/site-faqs";

const PII = [
  "tel:",
  "mailto:",
  "@storentech",
  "714-613",
  "714-794",
  "buy.stripe.com",
  "stripe.com",
  "@gmail",
  "@yahoo",
];

describe("FAQ helper knowledge allowlist", () => {
  it("stays small, versioned, and source-traced", () => {
    expect(FAQ_HELPER_KNOWLEDGE_VERSION).toBe("2026-11-07.preview.1");
    expect(faqKnowledgeEntries.length).toBeGreaterThanOrEqual(6);
    expect(faqKnowledgeEntries.length).toBeLessThanOrEqual(12);

    for (const entry of faqKnowledgeEntries) {
      expect(entry.version).toBe(FAQ_HELPER_KNOWLEDGE_VERSION);
      expect(entry.sources.length).toBeGreaterThan(0);
      expect(entry.answer.length).toBeGreaterThan(40);
      for (const source of entry.sources) {
        const text = readFileSync(join(process.cwd(), source.path), "utf8");
        expect(text.length).toBeGreaterThan(20);
      }
    }
  });

  it("keeps the homepage Super Intelligence answer verbatim", () => {
    const entry = faqKnowledgeEntries.find((item) => item.id === "super-intelligence");
    expect(entry?.question).toBe(siteFaqs[0].question);
    expect(entry?.answer).toBe(siteFaqs[0].answer);
  });

  it("quotes only published Opportunity Map fees, not retainer amounts", () => {
    const price = faqKnowledgeEntries.find((item) => item.id === "map-price");
    expect(price?.answer).toContain(site.prices.analysisTypical);
    expect(price?.answer).toContain(site.prices.analysisComplex);
    expect(price?.answer).toContain("not a complimentary sales call");

    const retainers = faqKnowledgeEntries.find((item) => item.id === "retainers");
    expect(retainers?.answer).toContain("do not publish retainers");
    expect(retainers?.answer).not.toMatch(/\$\d/);
  });

  it("does not ship scrapeable contact, pay, or secret material", () => {
    const blob = faqKnowledgeEntries
      .map((entry) => `${entry.question}\n${entry.answer}`)
      .join("\n");

    for (const snippet of PII) {
      expect(blob, snippet).not.toContain(snippet);
    }
    expect(blob).not.toMatch(/appointment booked/i);
    expect(blob).not.toMatch(/pci[-\s]?dss/i);
    expect(blob).not.toMatch(/\bhipaa\b/i);
  });
});
