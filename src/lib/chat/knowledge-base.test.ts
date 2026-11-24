import { describe, expect, it } from "vitest";
import { CHAT_KNOWLEDGE_BASE, CHAT_KNOWLEDGE_VERSION } from "@/lib/chat/knowledge-base";
import { faqKnowledgeEntries } from "@/lib/faq-helper/knowledge";
import { site } from "@/lib/site";

describe("ported chatbot knowledge", () => {
  it("is versioned and includes reviewed site prices only", () => {
    expect(CHAT_KNOWLEDGE_VERSION).toMatch(/preview/);
    expect(CHAT_KNOWLEDGE_BASE).toContain(site.prices.analysisTypical);
    expect(CHAT_KNOWLEDGE_BASE).toContain(site.prices.analysisComplex);
    expect(CHAT_KNOWLEDGE_BASE).toContain("AI Opportunity Map");
    expect(CHAT_KNOWLEDGE_BASE).toContain("Automation ROI Analysis");
    expect(CHAT_KNOWLEDGE_BASE).not.toMatch(/\bOpp\b/);
    expect(CHAT_KNOWLEDGE_BASE).not.toMatch(/\bROIA\b/);
    expect(CHAT_KNOWLEDGE_BASE).not.toMatch(/\$500/);
    expect(CHAT_KNOWLEDGE_BASE).not.toMatch(/\$99/);
    expect(CHAT_KNOWLEDGE_BASE).not.toMatch(/\$1,500/);
    expect(CHAT_KNOWLEDGE_BASE).not.toMatch(/\bHIPAA\b/);
    expect(CHAT_KNOWLEDGE_BASE).not.toMatch(/pci[-\s]?dss/i);
  });

  it("never states a DGX Spark inventory count", () => {
    expect(CHAT_KNOWLEDGE_BASE).toMatch(/DGX Spark/);
    expect(CHAT_KNOWLEDGE_BASE).toMatch(/Never state how many DGX Sparks/);
    expect(CHAT_KNOWLEDGE_BASE).not.toMatch(
      /\b(?:\d+|one|two|three|four|five)\s+DGX Sparks?\b/i,
    );
  });

  it("covers the scripted FAQ allowlist topics", () => {
    const blob = CHAT_KNOWLEDGE_BASE.toLowerCase();
    for (const entry of faqKnowledgeEntries) {
      expect(blob.length).toBeGreaterThan(40);
      if (entry.id === "super-intelligence") {
        expect(blob).toContain("super intelligence");
      }
      if (entry.id === "map-price") {
        expect(blob).toContain("1,000");
      }
    }
  });
});
