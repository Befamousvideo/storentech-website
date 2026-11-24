import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OpportunityPage from "@/app/opportunity/page";
import {
  LEAK_CARDS_CAPTION,
  LEAK_CARDS_HEADING,
  leakCards,
  opportunityLeakFaqs,
} from "@/lib/leak-copy";
import { siteFaqPageLd } from "@/lib/site-faqs";

function jsonLdBlocks(container: HTMLElement) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map(
    (node) => JSON.parse(node.textContent ?? "{}") as Record<string, unknown>,
  );
}

describe("/opportunity leak cards and FAQ", () => {
  it("renders the three leak cards under the hero with the approved copy", () => {
    const { container } = render(<OpportunityPage />);
    const section = container.querySelector("#leaks");
    expect(section).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: LEAK_CARDS_HEADING }),
    ).toBeInTheDocument();
    expect(container.textContent).not.toContain("Two kinds of leaks");

    for (const card of leakCards) {
      expect(
        screen.getByRole("heading", { level: 3, name: card.title }),
      ).toBeInTheDocument();
      expect(container.textContent).toContain(card.definition);
      expect(container.textContent).toContain(card.spots);
    }
    expect(container.textContent).toContain(LEAK_CARDS_CAPTION);
    expect(container.textContent).toContain("Common spots:");
  });

  it("keeps visible FAQ copy in sync with a single FAQPage JSON-LD block", () => {
    const { container } = render(<OpportunityPage />);
    const blocks = jsonLdBlocks(container);
    const faqs = blocks.filter((block) => block["@type"] === "FAQPage");
    expect(faqs).toHaveLength(1);
    expect(faqs[0]).toEqual(siteFaqPageLd(opportunityLeakFaqs));

    for (const item of opportunityLeakFaqs) {
      expect(
        screen.getByRole("heading", { level: 3, name: item.question }),
      ).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });
});
