import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage, { metadata } from "@/app/page";
import {
  HOME_META_DESCRIPTION,
  HOME_META_TITLE,
  HOME_NVIDIA_SPARK_HREF,
  homeCopy,
} from "@/lib/home";
import { organizationLd } from "@/lib/seo";
import { BOOKING_CTA_HREF, site } from "@/lib/site";

function homepageLd() {
  const { container } = render(<HomePage />);
  const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')];
  return scripts.map((script) => JSON.parse(script.textContent ?? "{}"));
}

function homepageText() {
  const { container } = render(<HomePage />);
  return {
    container,
    text: container.textContent ?? "",
    html: container.innerHTML,
  };
}

describe("Home page copy", () => {
  it("renders the approved headline, subhead, proof strip, pillars, and CTA in order", () => {
    const { container } = render(<HomePage />);
    const text = container.textContent ?? "";

    const headline = screen.getByRole("heading", {
      level: 1,
      name: homeCopy.headline,
    });
    expect(headline).toHaveClass("home-headline");
    expect(headline.nextElementSibling).toHaveTextContent(homeCopy.subhead);
    expect(container.querySelectorAll("h1")).toHaveLength(1);

    const order = [
      homeCopy.headline,
      homeCopy.subhead,
      homeCopy.proof,
      homeCopy.proofLinkLabel,
      homeCopy.costTitle,
      homeCopy.costBody,
      homeCopy.securityTitle,
      homeCopy.securityBody,
      homeCopy.dataTitle,
      homeCopy.dataBody,
      homeCopy.productivityTitle,
      homeCopy.productivityBody,
      homeCopy.productivityFootnote,
      homeCopy.cta,
    ];
    let cursor = 0;
    for (const chunk of order) {
      const index = text.indexOf(chunk, cursor);
      expect(index, chunk).toBeGreaterThanOrEqual(0);
      cursor = index + chunk.length;
    }
  });

  it("keeps the productivity block visually smaller than the three pillars", () => {
    const { container } = render(<HomePage />);
    const productivity = container.querySelector("#productivity");
    const cost = container.querySelector("#costs");

    expect(productivity).toHaveClass("home-productivity");
    expect(cost).toHaveClass("home-pillar");
    expect(productivity?.querySelector("h2")).toHaveTextContent(
      homeCopy.productivityTitle,
    );
    expect(productivity?.querySelector(".home-footnote")).toHaveTextContent(
      homeCopy.productivityFootnote,
    );
  });

  it("links the NVIDIA proof strip in a new tab and the CTA to the existing intake URL", () => {
    render(<HomePage />);

    const nvidia = screen.getByRole("link", { name: homeCopy.proofLinkLabel });
    expect(nvidia).toHaveAttribute("href", HOME_NVIDIA_SPARK_HREF);
    expect(nvidia).toHaveAttribute("target", "_blank");
    expect(nvidia).toHaveAttribute("rel", "noopener");

    const cta = screen.getByRole("link", { name: homeCopy.cta });
    expect(cta).toHaveAttribute("href", site.intakeUrl);
    expect(cta).toHaveAttribute("href", BOOKING_CTA_HREF);
    expect(cta).toHaveClass("btn", "btn-solid");
  });
});

describe("Home page positioning guards", () => {
  it("does not keep the old hero, prices, FAQ, or banned terms on the homepage", () => {
    const { text, html } = homepageText();

    expect(text).not.toContain("Whether you call it AI or Super Intelligence");
    expect(text).not.toContain("Humans in the loop");
    expect(text).not.toContain("Selective about clients");
    expect(text).not.toContain("Common questions");
    expect(text).not.toContain("Talk to Sarah");
    expect(text).not.toContain("Starting at");
    expect(text).not.toContain("$1,000");
    expect(text).not.toContain(site.prices.analysisTypical);
    expect(text).not.toMatch(/\bROIA\b/);
    expect(text).not.toMatch(/\bOpp\b/);
    expect(text.toLowerCase()).not.toMatch(/\bfree\b/);
    expect(text.toLowerCase()).not.toContain("complimentary");
    expect(text.toLowerCase()).not.toMatch(/on-?premises/);
    expect(text).not.toMatch(
      /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+DGX Sparks?\b/i,
    );
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
  });

  it("sets homepage title and description from the approved copy, with no price", () => {
    expect(metadata.title).toEqual({ absolute: HOME_META_TITLE });
    expect(metadata.description).toBe(HOME_META_DESCRIPTION);
    expect(metadata.openGraph?.title).toBe(HOME_META_TITLE);
    expect(metadata.openGraph?.description).toBe(HOME_META_DESCRIPTION);
    expect(HOME_META_TITLE).toContain(homeCopy.headline);
    expect(HOME_META_DESCRIPTION).toBe(homeCopy.subhead);
    expect(JSON.stringify(metadata)).not.toMatch(/\$[\d,]+/);
    expect(JSON.stringify(metadata).toLowerCase()).not.toMatch(/\bfree\b/);
    expect(JSON.stringify(metadata)).not.toMatch(/\bROIA\b/);
    expect(JSON.stringify(metadata).toLowerCase()).not.toMatch(/on-?premises/);
    expect(JSON.stringify(metadata)).not.toMatch(
      /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+DGX Sparks?\b/i,
    );
  });
});

describe("Home page SEO", () => {
  it("emits a single Organization JSON-LD block without FAQPage or priced copy", () => {
    const blocks = homepageLd();
    const types = blocks.map((block) => block["@type"]);
    expect(types).toEqual(["Organization"]);
    expect(blocks[0]).toEqual(
      organizationLd({ description: HOME_META_DESCRIPTION }),
    );
    expect(JSON.stringify(blocks)).not.toContain("tel:");
    expect(JSON.stringify(blocks)).not.toContain("mailto:");
    expect(JSON.stringify(blocks)).not.toMatch(/\$[\d,]+/);
    expect(JSON.stringify(blocks)).not.toContain("FAQPage");
    expect(JSON.stringify(blocks).toLowerCase()).not.toMatch(/on-?premises/);
    expect(JSON.stringify(blocks)).not.toMatch(
      /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+DGX Sparks?\b/i,
    );
  });
});
