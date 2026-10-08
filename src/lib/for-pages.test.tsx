import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { ROBOTS_DISALLOW_PATHS } from "@/app/robots";
import ForSlugPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/for/[slug]/page";
import { ForPreviewArticle } from "@/components/ForPreviewArticle";
import { SiteChrome } from "@/components/SiteChrome";
import {
  FOR_CTA_HREF,
  FOR_CTA_LABEL,
  forPageDescription,
  forPages,
  forPagePath,
  forPageSlugs,
  forPageTitle,
  getForPage,
} from "@/lib/for-pages";
import { site } from "@/lib/site";
import nextConfig from "../../next.config";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    notFound: vi.fn(() => {
      throw new Error("NEXT_NOT_FOUND");
    }),
    usePathname: vi.fn(() => "/for/kei-concepts"),
  };
});

const FORBIDDEN_HTML = [
  "714",
  "tel:",
  "mailto:",
  "@storentech",
  "client",
  "ROIA",
] as const;

const BANNED_COPY = [
  /\bclient\b/i,
  /\bBuild Plan\b/,
  /\bLaunch\b/,
  /\bAscent\b/,
  /\bOrbit\b/,
  /\bROIA\b/,
  /\bfree\b/i,
  /scraping/i,
];

const EXPECTED_SLUGS = [
  "kei-concepts",
  "rjb-restaurant-group",
  "bluewater-grill",
  "dkn-hotels",
  "kings-seafood",
  "veritech-plumbing",
  "sea-pointe",
] as const;

const PUBLIC_SURFACES = [
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/lib/site.ts",
  "src/lib/blog.ts",
  "src/app/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/how-it-works/page.tsx",
  "src/app/work/page.tsx",
  "src/app/opportunity/page.tsx",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "public/llms.txt",
];

function renderedHtml(container: HTMLElement) {
  return `${document.head.innerHTML}${container.innerHTML}`;
}

function assertCleanPreviewHtml(label: string, html: string) {
  expect(html, label).toContain('name="robots"');
  expect(html, label).toContain("noindex, nofollow");
  for (const snippet of FORBIDDEN_HTML) {
    expect(html, `${label} ${snippet}`).not.toContain(snippet);
  }
  for (const pattern of BANNED_COPY) {
    expect(html, `${label} ${pattern}`).not.toMatch(pattern);
  }
}

function collectFiles(root: string, acc: string[] = []): string[] {
  const abs = join(process.cwd(), root);
  if (!existsSync(abs)) return acc;
  const stat = statSync(abs);
  if (stat.isFile()) {
    acc.push(abs);
    return acc;
  }
  for (const name of readdirSync(abs)) {
    if (name === "node_modules") continue;
    const child = join(root, name);
    const childAbs = join(process.cwd(), child);
    if (statSync(childAbs).isDirectory()) {
      collectFiles(child, acc);
    } else if (
      [".ts", ".tsx", ".js", ".json", ".md", ".txt"].includes(extname(name)) &&
      !/\.test\.(ts|tsx)$/.test(name)
    ) {
      acc.push(childAbs);
    }
  }
  return acc;
}

describe("company preview /for pages", () => {
  it("registers the seven approved slugs and 404s unknown ones", () => {
    expect(forPageSlugs).toEqual([...EXPECTED_SLUGS]);
    expect(generateStaticParams()).toEqual(
      EXPECTED_SLUGS.map((slug) => ({ slug })),
    );
    expect(getForPage("not-a-company")).toBeUndefined();
  });

  it("renders each route with verbatim copy, the calendar CTA, and noindex HTML", async () => {
    for (const page of forPages) {
      const ui = await ForSlugPage({
        params: Promise.resolve({ slug: page.slug }),
      });
      const { container, unmount } = render(ui);

      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        page.h1,
      );
      expect(screen.getByText(page.topHeading)).toBeInTheDocument();
      expect(screen.getByText(page.topBody)).toBeInTheDocument();
      expect(screen.getByText(page.lookFirstHeading)).toBeInTheDocument();
      for (const item of page.lookFirst) {
        expect(container.textContent).toContain(`${item.lead} ${item.rest}`);
      }
      expect(screen.getByText(page.agentIntro)).toBeInTheDocument();
      expect(screen.getByText(page.startBody)).toBeInTheDocument();
      expect(screen.getByText(page.close)).toBeInTheDocument();

      const cta = screen.getByRole("link", {
        name: page.ctaLabel,
      });
      expect(FOR_CTA_LABEL).toBe("Book a 15-minute conversation");
      expect(page.ctaLabel).toBe(FOR_CTA_LABEL);
      expect(page.close).toContain("A 15-minute conversation");
      expect(`${page.ctaLabel} ${page.close}`).not.toMatch(/20-minute/);
      expect(`${page.ctaLabel} ${page.close}`).not.toMatch(/30-minute/);
      expect(FOR_CTA_HREF).toBe(
        "https://calendar.app.google/7KkoctujrZtnzhjU7",
      );
      expect(FOR_CTA_HREF).not.toMatch(/HMPtGz/);
      expect(page.ctaHref).toBe(FOR_CTA_HREF);
      expect(cta).toHaveAttribute("href", FOR_CTA_HREF);
      expect(cta).toHaveAttribute("target", "_blank");
      expect(cta).toHaveAttribute("rel", "noopener noreferrer");

      assertCleanPreviewHtml(`/for/${page.slug}`, renderedHtml(container));
      unmount();
    }
  });

  it("scopes VeriTech and Sea Pointe Maps to each company's ops", () => {
    const veritech = getForPage("veritech-plumbing");
    const seaPointe = getForPage("sea-pointe");
    expect(veritech).toBeDefined();
    expect(seaPointe).toBeDefined();
    if (!veritech || !seaPointe) return;

    expect(veritech.startBody).toBe(
      "With an AI Opportunity Map scoped to VeriTech ops (scheduling, dispatch, quoting, follow-up), so the first Map stays focused. We talk with your leadership and key staff, map where time or revenue leaks, and rank the fixes by payoff and effort. You come away knowing what to fix first, and why, with no surprise costs. Human touch stays.",
    );
    expect(seaPointe.startBody).toBe(
      "With an AI Opportunity Map scoped to Sea Pointe ops, so the first Map stays focused. We talk with your leadership and key staff, map where time or revenue leaks, and rank the fixes by payoff and effort. You come away knowing what to fix first, and why, with no surprise costs. Human touch stays.",
    );
  });

  it("scopes the King's Seafood page to corporate HQ marketing, not KSD or Fish House", () => {
    const page = getForPage("kings-seafood");
    expect(page).toBeDefined();
    if (!page) return;

    expect(page.topHeading).toBe(
      "Six brands, 23 restaurants. Three questions before AI acts for any of them.",
    );
    expect(page.lookFirst).toEqual([
      {
        lead: "Marketing across six brands.",
        rest: "Promo drafts built from each brand's own guidelines, approved by your team before anything goes out.",
      },
      {
        lead: "One weekly rollup for corporate.",
        rest: "Sales, labor and marketing results from every restaurant in one weekly view for leadership.",
      },
      {
        lead: "Approvals on anything AI sends or buys.",
        rest: "Sign-off steps, spending caps, logs and an off switch, set once for the whole group.",
      },
    ]);
    expect(page.startBody).toBe(
      "With an AI Opportunity Map scoped to the corporate office, so the first Map stays focused. We talk with your leadership and key staff, map where time or revenue leaks, and rank the fixes by payoff and effort. The Map shows where custom AI would save the corporate team the most time or money, ranked so you know where to start. You come away knowing what to fix first, and why, with no surprise costs. Human touch stays.",
    );
    expect(page.agentIntro).toBe(
      "Before an AI agent touches a campaign, a booking or a purchase, we'll walk your corporate team through three questions, at no cost and with no obligation:",
    );

    const copy = [
      page.topHeading,
      page.topBody,
      ...page.lookFirst.map((item) => `${item.lead} ${item.rest}`),
      page.agentIntro,
      page.startBody,
      page.close,
    ].join("\n");
    expect(copy).not.toMatch(/KSD/);
    expect(copy).not.toMatch(/Fish House/);
    expect(copy).not.toMatch(/Santa Ana facility/);
    expect(copy).not.toMatch(/every KSD order/);
    expect(copy).not.toMatch(/one division/);
    expect(copy).not.toMatch(/3185 Airway Ave/);
    expect(copy).not.toMatch(/714-432-0400|714-613-8557/);
  });

  it("sets noindex metadata titles from the company name and skips JSON-LD", async () => {
    for (const page of forPages) {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: page.slug }),
      });
      const title = forPageTitle(page);
      expect(title).toBe(
        `${page.company}: what we'd look at first | StorenTech AI`,
      );
      expect(metadata.title).toEqual({ absolute: title });
      expect(page.description).toBe(forPageDescription(page.company));
      expect(metadata.description).toBe(forPageDescription(page.company));
      expect(metadata.robots).toEqual({ index: false, follow: false });
      expect(metadata.alternates).toEqual({
        canonical: forPagePath(page.slug),
      });

      const serialized = JSON.stringify(metadata);
      for (const snippet of FORBIDDEN_HTML) {
        expect(serialized, `${page.slug} metadata ${snippet}`).not.toContain(
          snippet,
        );
      }
      for (const pattern of BANNED_COPY) {
        expect(serialized, `${page.slug} metadata ${pattern}`).not.toMatch(
          pattern,
        );
      }
      expect(serialized).not.toMatch(/application\/ld\+json/i);
    }
  });

  it("returns 404 for an unknown slug", async () => {
    await expect(
      ForSlugPage({ params: Promise.resolve({ slug: "not-a-company" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "not-a-company" }) }),
    ).resolves.toEqual({});
  });

  it("keeps /for pages out of the sitemap, robots.txt, and public nav surfaces", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/for"))).toBe(false);
    expect([...ROBOTS_DISALLOW_PATHS]).not.toEqual(
      expect.arrayContaining(["/for", "/for/"]),
    );

    for (const file of PUBLIC_SURFACES) {
      const text = readFileSync(join(process.cwd(), file), "utf8");
      expect(text, file).not.toContain("/for/");
      expect(text, file).not.toContain(forPagePath("kei-concepts"));
    }
  });

  it("does not add /for links from other marketing source files", () => {
    const allowed = new Set([
      join(process.cwd(), "src/lib/for-pages.ts"),
      join(process.cwd(), "src/app/for/layout.tsx"),
      join(process.cwd(), "src/app/for/[slug]/page.tsx"),
      join(process.cwd(), "src/components/ForPreviewArticle.tsx"),
      join(process.cwd(), "src/components/SiteChrome.tsx"),
      join(process.cwd(), "next.config.ts"),
    ]);

    const files = ["src/app", "src/components", "src/lib", "public"].flatMap(
      (root) => collectFiles(root),
    );

    for (const file of files) {
      if (allowed.has(file) || file.includes("/for/")) continue;
      const text = readFileSync(file, "utf8");
      expect(text, relative(process.cwd(), file)).not.toMatch(/\/for\/[a-z0-9-]+/);
    }
  });

  it("sends X-Robots-Tag noindex on /for routes", async () => {
    const headers = (await nextConfig.headers?.()) ?? [];
    const values = headers
      .filter(
        (rule) => rule.source === "/for" || rule.source === "/for/:path*",
      )
      .flatMap((rule) => rule.headers);

    expect(values).toEqual(
      expect.arrayContaining([
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
      ]),
    );
    expect(values).toHaveLength(2);
  });

  it("renders preview chrome without JSON-LD, tel, mailto, or client/ROIA copy", () => {
    const page = getForPage("kei-concepts");
    expect(page).toBeDefined();
    if (!page) return;

    const { container } = render(
      <SiteChrome>
        <ForPreviewArticle page={page} />
      </SiteChrome>,
    );
    const html = renderedHtml(container).replaceAll("/roia", "");

    expect(html).not.toContain("application/ld+json");
    expect(html).toContain("noindex, nofollow");
    expect(html).not.toContain(site.phones.sarah.image);
    expect(html).not.toContain("Call Sarah");
    expect(html).not.toContain(site.offer.ctaShort);
    expect(html).not.toContain(site.offer.cta);
    expect(container.querySelector(`img[src="${site.phones.sarah.image}"]`)).toBeNull();
    expect(container.querySelector('img[alt="Call Sarah"]')).toBeNull();
    for (const snippet of FORBIDDEN_HTML) {
      expect(html, snippet).not.toContain(snippet);
    }
    for (const pattern of BANNED_COPY) {
      expect(html, `${pattern}`).not.toMatch(pattern);
    }
  });
});
