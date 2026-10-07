import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { site } from "@/lib/site";

const HOMEPAGE_UNDER_HEADLINE =
  "Whether you call it AI or Super Intelligence (SI), the first step is the same: find where it actually pays in your business.";

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
