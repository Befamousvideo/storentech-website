import { describe, expect, it } from "vitest";
import { siteFaqPageLd, siteFaqs } from "@/lib/site-faqs";

const SI_QUESTION = "Is Super Intelligence (SI) different from AI?";
const SI_ANSWER =
  "For a business, it's the same family of tools under a newer name. What matters is where it saves time or brings in revenue, and that's what an AI Opportunity Map shows you.";

describe("site FAQs", () => {
  it("keeps the Super Intelligence Q&A verbatim", () => {
    expect(siteFaqs).toEqual([
      {
        question: SI_QUESTION,
        answer: SI_ANSWER,
      },
    ]);
  });

  it("builds FAQPage JSON-LD from the same visible Q&As", () => {
    const faqLd = siteFaqPageLd();

    expect(faqLd["@type"]).toBe("FAQPage");
    expect(faqLd.mainEntity).toEqual([
      {
        "@type": "Question",
        name: SI_QUESTION,
        acceptedAnswer: {
          "@type": "Answer",
          text: SI_ANSWER,
        },
      },
    ]);
  });
});
