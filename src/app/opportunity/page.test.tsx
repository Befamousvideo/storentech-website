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
    expect(container.textContent).toContain(
      "A security or control gap that hasn't cost you yet but could later. Nothing looks broken today, which is why it's easy to miss.",
    );
    expect(container.textContent).toContain(
      "weak or reused passwords, shared logins, ex-employee accounts still active, customer data sitting in a tool nobody controls, no regular check of who has access, work that depends on one person, AI tools nobody owns or checks.",
    );
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
    expect(screen.getByText(
      "A risk leak is a security or control gap that hasn't cost the business anything yet but could later. Common examples are weak or reused passwords, shared logins, former employees who can still log in, customer data in a tool nobody controls, and work that only one person knows how to do.",
    )).toBeInTheDocument();
  });
});
