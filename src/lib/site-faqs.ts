export type SiteFaq = {
  question: string;
  answer: string;
};

/**
 * Homepage FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Do not invent extra Super Intelligence claims or a market-wide rename.
 */
export const siteFaqs = [
  {
    question: "Is Super Intelligence (SI) different from AI?",
    answer:
      "For a business, it's the same family of tools under a newer name. What matters is where it saves time or brings in revenue, and that's what an AI Opportunity Map shows you.",
  },
] as const satisfies readonly SiteFaq[];

export function siteFaqPageLd(faqs: readonly SiteFaq[] = siteFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
