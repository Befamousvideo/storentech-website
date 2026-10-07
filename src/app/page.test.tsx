import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { site } from "@/lib/site";
import { siteFaqPageLd, siteFaqs } from "@/lib/site-faqs";

const HOMEPAGE_UNDER_HEADLINE =
  "Whether you call it AI or Super Intelligence (SI), the first step is the same: find where it actually pays in your business.";
const SI_QUESTION = "Is Super Intelligence (SI) different from AI?";
const SI_ANSWER =
  "For a business, it's the same family of tools under a newer name. What matters is where it saves time or brings in revenue, and that's what an AI Opportunity Map shows you.";

function homepageFaqLd() {
  const { container } = render(<HomePage />);
  const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')];
  const parsed = scripts.map((script) => JSON.parse(script.textContent ?? "{}"));
  return parsed.find((data) => data["@type"] === "FAQPage");
}

describe("Home page hero", () => {
  it("renders the SI under-headline immediately below the main headline", () => {
    const { container } = render(<HomePage />);

    const headline = screen.getByRole("heading", {
      level: 1,
      name: site.offer.primaryTitle,
    });
    const underHeadline = screen.getByText(HOMEPAGE_UNDER_HEADLINE);

    expect(headline).toHaveClass("service-title");
    expect(underHeadline).toHaveClass("lede");
    expect(headline.nextElementSibling).toBe(underHeadline);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});

describe("Home page FAQ", () => {
  it("renders the exact Super Intelligence Q&A on the homepage FAQ", () => {
    render(<HomePage />);

    expect(siteFaqs).toEqual([{ question: SI_QUESTION, answer: SI_ANSWER }]);
    expect(
      screen.getByRole("heading", { level: 2, name: "Common questions." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: SI_QUESTION }),
    ).toBeInTheDocument();
    expect(screen.getByText(SI_ANSWER)).toBeInTheDocument();
  });

  it("keeps FAQPage JSON-LD in sync with the visible homepage Q&A", () => {
    const faqLd = homepageFaqLd();

    expect(faqLd).toEqual(siteFaqPageLd());
    expect(faqLd.mainEntity).toHaveLength(1);
    expect(faqLd.mainEntity[0]).toEqual({
      "@type": "Question",
      name: SI_QUESTION,
      acceptedAnswer: {
        "@type": "Answer",
        text: SI_ANSWER,
      },
    });
  });

  it("does not invent extra SI claims or scrapeable contact in the new FAQ copy", () => {
    const { container } = render(<HomePage />);
    const faq = container.querySelector("#faq");
    const text = faq?.textContent ?? "";
    const html = faq?.innerHTML ?? "";

    expect(text).not.toMatch(/OpenAI|Google|Anthropic|Meta|Nvidia|NVIDIA/i);
    expect(text).not.toMatch(/renamed|rebrand/i);
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
  });
});
