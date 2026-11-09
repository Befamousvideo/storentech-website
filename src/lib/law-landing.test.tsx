import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import LawPage, { metadata as lawMetadata } from "@/app/law/page";
import LawSpecialtyPage from "@/app/law/[specialty]/page";
import { SiteChrome } from "@/components/SiteChrome";
import { buildAdLandingLeadHref, LAW_INTAKE_URL } from "@/lib/ad-landing-lead";
import {
  LAW_CANONICAL_PATH,
  LAW_COPY,
  LAW_INTAKE_HOLD_NOTE,
} from "@/lib/law-landing";
import nextConfig from "../../next.config";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    usePathname: vi.fn(() => "/law"),
  };
});

const pageSource = readFileSync(
  join(process.cwd(), "src/app/law/page.tsx"),
  "utf8",
);
const landingSource = readFileSync(
  join(process.cwd(), "src/components/law/LawLanding.tsx"),
  "utf8",
);
const ctaSource = readFileSync(
  join(process.cwd(), "src/components/law/LawInertCta.tsx"),
  "utf8",
);
const copySource = readFileSync(
  join(process.cwd(), "src/lib/law-landing.ts"),
  "utf8",
);
const cssSource = readFileSync(
  join(process.cwd(), "src/app/globals.css"),
  "utf8",
);

function headingLevels(container: HTMLElement) {
  return [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map(
    (node) => ({
      level: Number(node.tagName.slice(1)),
      text: node.textContent?.replace(/\s+/g, " ").trim(),
    }),
  );
}

function assertNoPii(label: string, html: string) {
  expect(html, label).not.toContain("tel:");
  expect(html, label).not.toContain("mailto:");
  expect(html, label).not.toContain("buy.stripe.com");
  expect(html, label).not.toMatch(phonePattern);
  expect(html, label).not.toMatch(emailPattern);
}

describe("/law landing page", () => {
  it("keeps the intended intake URL in one constant and does not use it as a live href", () => {
    expect(LAW_INTAKE_URL).toBe(
      "https://onboarding.storentechai.com/?vertical=law&src=ad",
    );
    expect(LAW_INTAKE_URL).toBe(buildAdLandingLeadHref({ vertical: "law" }));
    expect(ctaSource).toContain("data-intended-href={LAW_INTAKE_URL}");
    expect(ctaSource).not.toContain("<a");
    expect(ctaSource).not.toMatch(/\shref=/);
    expect(landingSource).not.toContain("calendar.app.google");
    expect(landingSource).not.toContain("onb1-demo");
    expect(copySource).not.toContain("calendar.app.google");
    expect(copySource).not.toContain("onb1-demo.vercel.app");
  });

  it("noindexes /law and keeps the robots header", async () => {
    expect(lawMetadata).toMatchObject({
      title: { absolute: LAW_COPY.meta.title },
      description: LAW_COPY.meta.description,
      robots: { index: false, follow: false },
      alternates: { canonical: LAW_CANONICAL_PATH },
    });

    const headers = await nextConfig.headers?.();
    const lawHeader = headers?.find((rule) => rule.source === "/law");
    expect(lawHeader?.headers).toEqual(
      expect.arrayContaining([
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
      ]),
    );
  });

  it("renders Tony's hero, inert consultation CTA, and free/paid distinction", () => {
    const { container } = render(<LawPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: LAW_COPY.hero.h1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(LAW_COPY.hero.audience)).toBeInTheDocument();
    expect(screen.getByText(LAW_COPY.hero.subhead)).toBeInTheDocument();
    expect(screen.getByText(LAW_COPY.hero.note)).toBeInTheDocument();
    expect(screen.getByText(LAW_COPY.closing.note)).toBeInTheDocument();

    const ctas = screen.getAllByRole("button", {
      name: LAW_COPY.hero.ctaLabel,
    });
    expect(ctas).toHaveLength(2);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("aria-disabled", "true");
      expect(cta).not.toHaveAttribute("href");
      expect(cta).toHaveAttribute("data-intended-href", LAW_INTAKE_URL);
      expect(cta.closest("a")).toBeNull();
    }
    expect(screen.getAllByText(LAW_INTAKE_HOLD_NOTE)).toHaveLength(2);

    const html = container.innerHTML;
    expect(html).not.toContain("calendar.app.google");
    expect(html).not.toContain("onb1-demo");
    expect(html).not.toContain("$1,000");
    expect(html).not.toContain("TODO");
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("keeps a single H1 and ordered heading levels", () => {
    const { container } = render(<LawPage />);
    const headings = headingLevels(container);

    expect(headings[0]).toEqual({ level: 1, text: LAW_COPY.hero.h1 });
    expect(headings.filter((heading) => heading.level === 1)).toHaveLength(1);

    let previous = 1;
    for (const heading of headings) {
      expect(heading.level).toBeGreaterThanOrEqual(1);
      expect(heading.level - previous).toBeLessThanOrEqual(1);
      previous = heading.level;
    }
  });

  it("renders workflow cards, engagement steps, process panel, rules, and FAQs", async () => {
    const user = userEvent.setup();
    render(<LawPage />);

    for (const card of LAW_COPY.opportunities.cards) {
      expect(screen.getByRole("heading", { level: 3, name: card.title })).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
    }
    expect(screen.getByText(LAW_COPY.opportunities.footer)).toBeInTheDocument();

    for (const step of LAW_COPY.engagement.steps) {
      expect(
        screen.getByRole("heading", { level: 3, name: step.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(step.body)).toBeInTheDocument();
    }
    expect(
      screen.getByText(LAW_COPY.engagement.steps[1].subtitle),
    ).toBeInTheDocument();

    expect(screen.getByText(LAW_COPY.analysis.caption)).toBeInTheDocument();
    expect(screen.getByText(LAW_COPY.analysis.supporting)).toBeInTheDocument();
    expect(screen.getByText(LAW_COPY.rules.footnote)).toBeInTheDocument();

    const stateBar = screen.getByRole("link", {
      name: LAW_COPY.rules.links[0].label,
    });
    const aba = screen.getByRole("link", {
      name: LAW_COPY.rules.links[1].label,
    });
    expect(stateBar).toHaveAttribute("href", LAW_COPY.rules.links[0].href);
    expect(aba).toHaveAttribute("href", LAW_COPY.rules.links[1].href);

    const mapLinks = screen.getAllByRole("link", {
      name: LAW_COPY.hero.secondary.label,
    });
    expect(mapLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of mapLinks) {
      expect(link).toHaveAttribute("href", "/opportunity");
    }

    const firstFaq = LAW_COPY.faqs[0];
    const faqItem = screen.getByText(firstFaq.question).closest("details");
    expect(faqItem).not.toBeNull();
    expect(faqItem).not.toHaveAttribute("open");
    await user.click(screen.getByText(firstFaq.question));
    expect(faqItem).toHaveAttribute("open");
    expect(screen.getByText(firstFaq.answer)).toBeInTheDocument();
    expect(LAW_COPY.faqs).toHaveLength(6);
  });

  it("adds no scrapeable contact PII, payment identifiers, or JSON-LD", () => {
    const { container } = render(
      <SiteChrome>
        <LawPage />
      </SiteChrome>,
    );
    const html = container.innerHTML;

    assertNoPii("rendered /law", html);
    expect(html).not.toContain("application/ld+json");
    expect(html).not.toMatch(/chatbot/i);
    assertNoPii("page source", pageSource);
    assertNoPii("landing source", landingSource);
    assertNoPii("copy source", copySource);
    expect(pageSource).not.toContain("application/ld+json");
  });

  it("keeps visible 2px focus styles and does not uppercase the consultation CTA", () => {
    expect(cssSource).toMatch(/\.law-landing :focus-visible \{[\s\S]*?outline: 2px solid/);
    expect(cssSource).toMatch(/\.law-cta \{[\s\S]*?text-transform: none/);
    expect(cssSource).toMatch(/\.law-cta \{[\s\S]*?min-height: 48px/);
  });

  it("leaves /law/sample on the placeholder template", async () => {
    render(
      await LawSpecialtyPage({
        params: Promise.resolve({ specialty: "sample" }),
      }),
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "TODO: law sample specialty headline — Tony writes copy",
      }),
    ).toBeInTheDocument();
  });
});
