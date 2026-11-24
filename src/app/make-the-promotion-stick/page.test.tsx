import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";
import MakeThePromotionStickPage, {
  metadata,
} from "@/app/make-the-promotion-stick/page";
import sitemap from "@/app/sitemap";
import {
  PROMOTION_STICK_CANONICAL_URL,
  PROMOTION_STICK_COPY as copy,
  PROMOTION_STICK_ORIGIN,
  PROMOTION_STICK_PATH,
  promotionStickFaqPageLd,
  promotionStickServiceLd,
} from "@/lib/promotion-stick";
import { nav } from "@/lib/site";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const moneyOrPercent = /\$[\d,]+|\d+(?:\.\d+)?%/;
const SOURCE_FILES = [
  "src/app/make-the-promotion-stick/page.tsx",
  "src/components/PromotionStickBookCta.tsx",
  "src/lib/promotion-stick.ts",
];

function jsonLdBlocks(container: HTMLElement) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map(
    (node) => JSON.parse(node.textContent ?? "{}") as Record<string, unknown>,
  );
}

function pageSource() {
  return SOURCE_FILES.map((file) =>
    readFileSync(join(process.cwd(), file), "utf8"),
  ).join("\n");
}

describe("/make-the-promotion-stick", () => {
  it("uses v7.1 meta title, noindex, www canonical, and stays off the sitemap and nav", async () => {
    expect(copy.hero.offerName).toBe("Thrive after your promotion");
    expect(metadata.title).toEqual({ absolute: copy.meta.title });
    expect(copy.meta.title).toBe(
      "Thrive after your promotion: a 4-hour, one-on-one AI setup for your new role | StorenTech AI",
    );
    expect(metadata.description).toBe(copy.meta.description);
    expect(metadata.description).not.toMatch(moneyOrPercent);
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates?.canonical).toBe(PROMOTION_STICK_CANONICAL_URL);
    expect(PROMOTION_STICK_CANONICAL_URL).toBe(
      "https://www.storentechai.com/make-the-promotion-stick",
    );
    expect(metadata.openGraph?.title).toBe(copy.meta.title);
    expect(metadata.openGraph?.description).toBe(copy.meta.description);
    expect(metadata.openGraph?.url).toBe(PROMOTION_STICK_CANONICAL_URL);
    expect(metadata.twitter?.title).toBe(copy.meta.title);
    expect(String(metadata.openGraph?.description)).not.toMatch(moneyOrPercent);
    expect(String(metadata.twitter?.description)).not.toMatch(moneyOrPercent);

    expect(sitemap().some((entry) => entry.url.endsWith(PROMOTION_STICK_PATH))).toBe(
      false,
    );
    const hrefs: string[] = nav.map((item) => item.href);
    expect(hrefs).not.toContain(PROMOTION_STICK_PATH);

    const headers = await nextConfig.headers?.();
    const robotsFor = (source: string) =>
      (headers ?? []).find((rule) => rule.source === source)?.headers;
    expect(robotsFor(PROMOTION_STICK_PATH)).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
    expect(robotsFor(`${PROMOTION_STICK_PATH}/`)).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
  });

  it("renders the v7.1 copy, keeps Results vary, and confines prices to the FAQ", () => {
    const { container } = render(<MakeThePromotionStickPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: copy.hero.headline }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Thrive after your promotion", { selector: ".kicker" }),
    ).toBeInTheDocument();
    expect(container.textContent).not.toContain("Make the Promotion Stick");
    expect(screen.getByText(copy.hero.subhead)).toBeInTheDocument();
    expect(screen.getByText(copy.hero.supportingLine)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: copy.who.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(copy.who.intro)).toBeInTheDocument();
    for (const item of copy.who.bullets) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(screen.getByText(copy.who.close)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: copy.session.heading }),
    ).toBeInTheDocument();
    for (const step of copy.session.steps) {
      expect(
        screen.getByRole("heading", { level: 3, name: step.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(step.body)).toBeInTheDocument();
      if ("note" in step) {
        const note = screen.getByText(step.note);
        expect(note.tagName).toBe("EM");
        expect(note.closest("p")).toHaveClass(
          "fine",
          "promotion-stick-step-note",
        );
      }
    }
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Set up Agentic* AI around that work.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "* AI agents that draft the work while you approve every important output.",
      ).tagName,
    ).toBe("EM");

    expect(
      screen.getByRole("heading", { level: 2, name: copy.how.heading }),
    ).toBeInTheDocument();
    for (const item of copy.how.points) {
      expect(container.textContent).toContain(`${item.title} ${item.body}`);
    }
    expect(screen.getByText(copy.how.resultsVary)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: copy.not.heading }),
    ).toBeInTheDocument();
    for (const item of copy.not.points) {
      expect(container.textContent).toContain(`${item.title} ${item.body}`);
    }
    expect(
      screen.getByRole("heading", { level: 2, name: "What you get" }),
    ).toBeInTheDocument();
    expect(screen.getByText(copy.price.lead)).toBeInTheDocument();
    expect(copy.price.lead).not.toMatch(moneyOrPercent);
    expect(copy.price.heading).not.toMatch(moneyOrPercent);
    expect(screen.getByText(copy.price.includes)).toBeInTheDocument();
    expect(screen.getAllByText(copy.price.booking)).toHaveLength(2);

    expect(
      screen.getByRole("heading", { level: 2, name: copy.next.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(copy.next.intro)).toBeInTheDocument();
    expect(container.textContent).toContain(
      `${copy.next.point.title} ${copy.next.point.body}`,
    );
    expect(screen.getByText(copy.next.close)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: copy.cta.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(copy.cta.body)).toBeInTheDocument();

    const faq = container.querySelector("#faq");
    expect(faq).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: copy.faqHeading }),
    ).toBeInTheDocument();
    for (const item of copy.faqs) {
      expect(
        screen.getByRole("heading", { level: 3, name: item.question }),
      ).toBeInTheDocument();
      expect(
        within(faq as HTMLElement).getByText(item.answer),
      ).toBeInTheDocument();
    }

    const visible = [...container.querySelectorAll("header, section")]
      .map((node) => node.textContent ?? "")
      .join("\n");
    expect(visible.match(/Results vary/g)).toHaveLength(2);
    expect(container.querySelectorAll("h1")).toHaveLength(1);

    const nonFaq = [...container.querySelectorAll("header, section:not(#faq)")]
      .map((node) => node.textContent ?? "")
      .join("\n");
    expect(nonFaq).not.toMatch(moneyOrPercent);
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "How much does it cost?",
      }),
    ).toBeInTheDocument();
    expect(
      within(faq as HTMLElement).getByText(
        "$1,000 for the 4-hour, one-on-one session.",
      ),
    ).toBeInTheDocument();
    expect(faq?.textContent).toMatch(/\$1,000/);
    expect(faq?.textContent).toMatch(/\$20/);
    expect(faq?.textContent).toMatch(/50%/);
  });

  it("keeps Book your 4 hours as a disabled placeholder with no booking URL", () => {
    const { container } = render(<MakeThePromotionStickPage />);
    const buttons = screen.getAllByRole("button", { name: copy.hero.cta });

    expect(buttons).toHaveLength(3);
    for (const button of buttons) {
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveAttribute("data-placeholder", "booking-checkout-not-built");
      expect(button).not.toHaveAttribute("href");
      expect(button.closest("a")).toBeNull();
    }

    const html = container.innerHTML;
    expect(html).not.toContain("calendar.app.google");
    expect(html).not.toContain("calendly");
    expect(html).not.toContain("buy.stripe.com");
    expect(html).not.toContain("onb1-demo");
    expect(container.querySelector('a[href="/opportunity"]')).toBeNull();
    expect(container.textContent).not.toMatch(
      /newsletter|unsubscribe|sign up for/i,
    );
  });

  it("keeps FAQPage JSON-LD in sync, uses the www host, and omits prices from Service JSON-LD", () => {
    const { container } = render(<MakeThePromotionStickPage />);
    const blocks = jsonLdBlocks(container);
    const faqLd = blocks.find((block) => block["@type"] === "FAQPage");
    const serviceLd = blocks.find((block) => block["@type"] === "Service");

    expect(faqLd).toEqual(promotionStickFaqPageLd());
    expect(serviceLd).toEqual(promotionStickServiceLd());
    expect(promotionStickServiceLd().name).toBe("Thrive after your promotion");
    expect(promotionStickServiceLd().url).toBe(PROMOTION_STICK_CANONICAL_URL);
    expect(promotionStickServiceLd().provider.url).toBe(PROMOTION_STICK_ORIGIN);
    expect(serviceLd).not.toHaveProperty("offers");
    expect(JSON.stringify(serviceLd)).not.toMatch(moneyOrPercent);
    expect(JSON.stringify(faqLd)).toContain("How much does it cost?");
    expect(JSON.stringify(faqLd)).toContain(
      "$1,000 for the 4-hour, one-on-one session.",
    );
    expect(JSON.stringify(faqLd)).toMatch(/\$1,000/);

    const corpus = `${container.innerHTML}\n${JSON.stringify(blocks)}\n${pageSource()}`;
    expect(corpus).toContain("Thrive after your promotion");
    expect(corpus).not.toContain("Make the Promotion Stick");
    expect(corpus).not.toMatch(/\bROIA\b/);
    expect(corpus).not.toMatch(/DGX Spark/i);
    expect(corpus).not.toMatch(/\bSpark[s]?\b/);
    expect(container.innerHTML).not.toContain("tel:");
    expect(container.innerHTML).not.toContain("mailto:");
    expect(container.innerHTML).not.toMatch(emailPattern);
    expect(container.innerHTML).not.toMatch(phonePattern);
    expect(pageSource()).not.toMatch(/newsletter/i);
  });
});
