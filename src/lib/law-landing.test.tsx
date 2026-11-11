import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import LawPage, { metadata as lawMetadata } from "@/app/law/page";
import LawSpecialtyPage from "@/app/law/[specialty]/page";
import sitemap from "@/app/sitemap";
import { SiteChrome } from "@/components/SiteChrome";
import {
  buildAdLandingLeadHref,
  LAW_INTAKE_READY,
  LAW_INTAKE_URL,
  LAW_ROOT_INDEX,
  lawRootIndexPolicy,
} from "@/lib/ad-landing-lead";
import {
  LAW_CANONICAL_PATH,
  LAW_COPY,
  LAW_CTA_ANCHOR,
  LAW_INTAKE_HOLD_NOTE,
} from "@/lib/law-landing";
import { BOOKING_CTA_HREF, site } from "@/lib/site";
import nextConfig from "../../next.config";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const pathnameMock = vi.fn(() => "/law");

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    usePathname: () => pathnameMock(),
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
const headerSource = readFileSync(
  join(process.cwd(), "src/components/Header.tsx"),
  "utf8",
);
const footerSource = readFileSync(
  join(process.cwd(), "src/components/Footer.tsx"),
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

afterEach(() => {
  pathnameMock.mockReturnValue("/law");
});

describe("/law landing page", () => {
  it("keeps the intended intake URL in one constant and gates the live href + hold note", () => {
    expect(LAW_INTAKE_URL).toBe(
      "https://onboarding.storentechai.com/?vertical=law&src=ad",
    );
    expect(LAW_INTAKE_URL).toBe(buildAdLandingLeadHref({ vertical: "law" }));
    expect(LAW_INTAKE_READY).toBe(false);
    expect(ctaSource).toContain("LAW_INTAKE_READY");
    expect(ctaSource).toContain("LAW_INTAKE_HOLD_NOTE");
    expect(landingSource).not.toContain("calendar.app.google");
    expect(landingSource).not.toContain("onb1-demo");
    expect(copySource).not.toContain("calendar.app.google");
    expect(copySource).not.toContain("onb1-demo.vercel.app");
  });

  it("locks the approved /law title, description, headline, subhead, and CTA", () => {
    expect(LAW_COPY.meta.title).toBe(
      "AI Intake and Admin Help for Small Law Firms | StorenTech AI",
    );
    expect(LAW_COPY.meta.description).toBe(
      "StorenTech AI helps small law firms find where intake and admin work slips, starting with a free conversation. Attorneys keep every legal decision.",
    );
    expect(LAW_COPY.hero.h1).toBe("Less of your firm's day on intake and admin");
    expect(LAW_COPY.hero.subhead).toBe(
      "We find where calls, inquiries and follow-ups slip through the cracks, then help fix the ones worth fixing. Attorneys keep legal judgment.",
    );
    expect(LAW_COPY.hero.ctaLabel).toBe("Find what to fix");
    expect(LAW_COPY.closing.ctaLabel).toBe("Find what to fix");
    expect(copySource).not.toContain("TODO");
    expect(pageSource).not.toContain("TODO");
  });

  it("gates /law indexing on LAW_INTAKE_READY and keeps specialty noindex", async () => {
    expect(LAW_INTAKE_READY).toBe(false);
    expect(LAW_ROOT_INDEX).toEqual(lawRootIndexPolicy(false));
    expect(lawRootIndexPolicy(true)).toEqual({
      robots: { index: true, follow: true },
      includeInSitemap: true,
      sendNoindexHeader: false,
    });
    expect(pageSource).toContain("LAW_ROOT_INDEX");
    expect(
      readFileSync(join(process.cwd(), "src/app/sitemap.ts"), "utf8"),
    ).toContain("LAW_ROOT_INDEX.includeInSitemap");
    expect(
      readFileSync(join(process.cwd(), "next.config.ts"), "utf8"),
    ).toContain("LAW_ROOT_INDEX.sendNoindexHeader");

    expect(lawMetadata).toMatchObject({
      title: { absolute: LAW_COPY.meta.title },
      description: LAW_COPY.meta.description,
      robots: { index: false, follow: false },
      alternates: { canonical: LAW_CANONICAL_PATH },
      openGraph: {
        title: LAW_COPY.meta.title,
        description: LAW_COPY.meta.description,
      },
      twitter: {
        title: LAW_COPY.meta.title,
        description: LAW_COPY.meta.description,
      },
    });

    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/law"))).toBe(
      LAW_ROOT_INDEX.includeInSitemap,
    );
    expect(urls.some((url) => url.endsWith("/law"))).toBe(false);
    expect(urls.some((url) => url.includes("/law/"))).toBe(false);

    const headers = await nextConfig.headers?.();
    const sources = (headers ?? []).map((rule) => rule.source);
    expect(sources).toContain("/law");
    expect(sources).not.toContain("/law/:path*");
    expect(sources).toContain("/law/:path+");
    expect(headers?.find((rule) => rule.source === "/law")?.headers).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
    expect(
      headers?.find((rule) => rule.source === "/law/:path+")?.headers,
    ).toEqual([{ key: "X-Robots-Tag", value: "noindex, nofollow" }]);
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
    expect(container.querySelector(`#${LAW_CTA_ANCHOR}`)).not.toBeNull();

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

  it("keeps a single H1, a visible FAQ heading, and ordered heading levels", () => {
    const { container } = render(<LawPage />);
    const headings = headingLevels(container);

    expect(headings[0]).toEqual({ level: 1, text: LAW_COPY.hero.h1 });
    expect(headings.filter((heading) => heading.level === 1)).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 2, name: "Common questions" }),
    ).toBeInTheDocument();

    let previous = 1;
    for (const heading of headings) {
      expect(heading.level).toBeGreaterThanOrEqual(1);
      expect(heading.level - previous).toBeLessThanOrEqual(1);
      previous = heading.level;
    }
  });

  it("numbers the hero diagram steps and uses CSS arrow connectors", () => {
    const { container } = render(<LawPage />);
    const numbers = [...container.querySelectorAll(".law-diagram-n")].map(
      (node) => node.textContent?.trim(),
    );
    expect(numbers).toEqual(["1", "2", "3"]);
    expect(container.querySelectorAll(".law-diagram-arrow")).toHaveLength(2);
    expect(cssSource).toContain(".law-diagram-arrow::before");
    expect(cssSource).toContain(".law-diagram-arrow::after");
    expect(cssSource).toMatch(/border-top:\s*12px solid var\(--navy\)/);
    expect(cssSource).not.toContain(".law-process-col-2 li:last-child");
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

  it("closes the mobile menu on Escape and returns focus to the toggle", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SiteChrome>
        <LawPage />
      </SiteChrome>,
    );
    const toggle = container.querySelector("button.menu-toggle");
    expect(toggle).not.toBeNull();
    await user.click(toggle as HTMLButtonElement);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(container.querySelector(".mobile-drawer")).toHaveClass("open");
    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector(".mobile-drawer")).not.toHaveClass("open");
    expect(toggle).toHaveFocus();
  });

  it("darkens only the header logo AI mark and leaves --gold and the footer mark unchanged", () => {
    expect(cssSource).toMatch(/--gold:\s*#9b7a4b;/);
    expect(cssSource).toMatch(
      /\.logo-ai \{[\s\S]*?font-size:\s*0\.72rem;[\s\S]*?color:\s*var\(--gold\);/,
    );
    expect(cssSource).toMatch(/\.site-header \.logo-ai \{[\s\S]*?color:\s*#80623a;/);
    expect(cssSource).toMatch(
      /\.site-footer \.logo-ai \{[\s\S]*?color:\s*var\(--gold-soft\);/,
    );
    expect(cssSource).not.toMatch(/--gold:\s*#80623a/);
    expect(cssSource).not.toMatch(/\.site-footer \.logo-ai \{[\s\S]*?#80623a/);
  });

  it("on /law only, swaps the header map CTA for an in-page conversation anchor", () => {
    const { container } = render(
      <SiteChrome>
        <LawPage />
      </SiteChrome>,
    );
    const header = container.querySelector("header.site-header");
    const footer = container.querySelector("footer.site-footer");
    expect(header).not.toBeNull();
    expect(footer).not.toBeNull();

    const compactCta = header?.querySelector(".header-actions a.btn-solid");
    const drawerCta = header?.querySelector(".mobile-actions a.btn-solid");
    expect(compactCta).toHaveTextContent(LAW_COPY.headerCtaCompactLabel);
    expect(drawerCta).toHaveTextContent(LAW_COPY.headerCtaLabel);
    expect(compactCta).toHaveAttribute("href", `#${LAW_CTA_ANCHOR}`);
    expect(drawerCta).toHaveAttribute("href", `#${LAW_CTA_ANCHOR}`);
    expect(header?.innerHTML).not.toContain("calendar.app.google");
    expect(
      within(header as HTMLElement).queryByRole("link", {
        name: site.offer.ctaShort,
      }),
    ).toBeNull();

    const badge = header?.querySelector(
      `img.header-sarah-phone[src="${site.phones.sarah.image}"]`,
    );
    expect(badge).not.toBeNull();
    expect(badge).toHaveAttribute("alt", "Call Sarah");
    expect(header?.querySelector("a[href^='tel:']")).toBeNull();
    expect(header?.textContent ?? "").not.toMatch(phonePattern);

    const footerMap = within(footer as HTMLElement).getByRole("link", {
      name: site.offer.cta,
    });
    expect(footerMap).toHaveAttribute("href", BOOKING_CTA_HREF);
    expect(footerSource).toContain("IntakeLink");
    expect(headerSource).toContain("pathname === \"/law\"");
  });

  it("keeps the existing calendar header CTA on / and /contractors", () => {
    pathnameMock.mockReturnValue("/");
    const home = render(
      <SiteChrome>
        <div />
      </SiteChrome>,
    );
    const homeHeader = home.container.querySelector("header.site-header");
    const homeCtas = within(homeHeader as HTMLElement).getAllByRole("link", {
      name: site.offer.ctaShort,
    });
    expect(homeCtas.length).toBeGreaterThanOrEqual(1);
    for (const cta of homeCtas) {
      expect(cta).toHaveAttribute("href", BOOKING_CTA_HREF);
    }
    expect(
      within(homeHeader as HTMLElement).queryByRole("link", {
        name: LAW_COPY.headerCtaLabel,
      }),
    ).toBeNull();
    expect(
      within(homeHeader as HTMLElement).queryByRole("link", {
        name: LAW_COPY.headerCtaCompactLabel,
      }),
    ).toBeNull();
    home.unmount();

    pathnameMock.mockReturnValue("/contractors");
    const contractors = render(
      <SiteChrome>
        <div />
      </SiteChrome>,
    );
    const contractorsHeader = contractors.container.querySelector(
      "header.site-header",
    );
    const contractorCtas = within(
      contractorsHeader as HTMLElement,
    ).getAllByRole("link", { name: site.offer.ctaShort });
    expect(contractorCtas.length).toBeGreaterThanOrEqual(1);
    for (const cta of contractorCtas) {
      expect(cta).toHaveAttribute("href", BOOKING_CTA_HREF);
    }
    expect(
      within(contractorsHeader as HTMLElement).queryByRole("link", {
        name: LAW_COPY.headerCtaLabel,
      }),
    ).toBeNull();
    expect(
      within(contractorsHeader as HTMLElement).queryByRole("link", {
        name: LAW_COPY.headerCtaCompactLabel,
      }),
    ).toBeNull();
  });

  it("keeps visible 2px focus styles and a disabled look on the pending CTA", () => {
    expect(cssSource).toMatch(/\.law-landing :focus-visible \{[\s\S]*?outline: 2px solid/);
    expect(cssSource).toMatch(/\.law-cta \{[\s\S]*?text-transform: none/);
    expect(cssSource).toMatch(/\.law-cta \{[\s\S]*?min-height: 48px/);
    expect(cssSource).toMatch(
      /\.law-cta\[aria-disabled="true"\] \{[\s\S]*?opacity: 0\.65/,
    );
    expect(cssSource).toMatch(
      /\.law-cta\[aria-disabled="true"\] \{[\s\S]*?cursor: not-allowed/,
    );
  });

  it("leaves /law/sample on the placeholder template without visible TODO", async () => {
    const { container } = render(
      await LawSpecialtyPage({
        params: Promise.resolve({ specialty: "sample" }),
      }),
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Sample law firm workflow",
      }),
    ).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\bTODO\b/);
  });
});
