import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LawPage, { metadata as lawMetadata } from "@/app/law/page";
import LawSpecialtyPage, {
  generateMetadata as generateLawSpecialtyMetadata,
  generateStaticParams as generateLawSpecialtyParams,
} from "@/app/law/[specialty]/page";
import ContractorsSpecialtyPage, {
  generateMetadata as generateContractorsSpecialtyMetadata,
  generateStaticParams as generateContractorsSpecialtyParams,
} from "@/app/contractors/[specialty]/page";
import sitemap from "@/app/sitemap";
import { AdLandingTemplate } from "@/components/AdLandingTemplate";
import { SiteChrome } from "@/components/SiteChrome";
import { buildAdLandingLeadHref, DEFAULT_ONB1_LEAD_URL } from "@/lib/ad-landing-lead";
import {
  AD_LANDING_SPECIALTIES,
  adLandingMetadata,
  getAdLandingSpecialty,
  LAW_VERTICAL_PAGE,
} from "@/lib/ad-landing-pages";
import nextConfig from "../../next.config";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    notFound: vi.fn(() => {
      throw new Error("NEXT_NOT_FOUND");
    }),
    usePathname: vi.fn(() => "/law/sample"),
    useSearchParams: vi.fn(
      () => new URLSearchParams("utm_source=preview&utm_campaign=test&foo=skip"),
    ),
  };
});

const templateSource = readFileSync(
  join(process.cwd(), "src/components/AdLandingTemplate.tsx"),
  "utf8",
);
const configSource = readFileSync(
  join(process.cwd(), "src/lib/ad-landing-pages.ts"),
  "utf8",
);

describe("practice-area ad landing template", () => {
  it("keeps one placeholder sample specialty per vertical", () => {
    expect(AD_LANDING_SPECIALTIES).toHaveLength(2);
    expect(getAdLandingSpecialty("law", "sample")?.placeholder).toBe(true);
    expect(getAdLandingSpecialty("contractors", "sample")?.placeholder).toBe(
      true,
    );
    expect(LAW_VERTICAL_PAGE.placeholder).toBe(true);
    expect(configSource).toContain("TODO: Mary sends practice areas");
    expect(generateLawSpecialtyParams()).toEqual([{ specialty: "sample" }]);
    expect(generateContractorsSpecialtyParams()).toEqual([
      { specialty: "sample" },
    ]);
  });

  it("builds the lead URL with vertical, specialty, src=ad, and utm pass-through", () => {
    expect(
      buildAdLandingLeadHref({
        vertical: "law",
        specialty: "sample",
        search: "utm_source=preview&utm_campaign=test&foo=skip",
      }),
    ).toBe(
      `${DEFAULT_ONB1_LEAD_URL}/?vertical=law&specialty=sample&src=ad&utm_source=preview&utm_campaign=test`,
    );
    expect(buildAdLandingLeadHref({ vertical: "law" })).toBe(
      `${DEFAULT_ONB1_LEAD_URL}/?vertical=law&src=ad`,
    );
  });

  it("renders hero, analysis-first CTA, and hides empty video slots", () => {
    const { container } = render(
      <AdLandingTemplate page={getAdLandingSpecialty("law", "sample")!} />,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "TODO: law sample specialty headline — Tony writes copy",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("TODO: law sample specialty subhead — Tony writes copy"),
    ).toBeInTheDocument();
    const cta = screen.getByRole("link", {
      name: "TODO: analysis-first CTA label — Tony writes copy",
    });
    expect(cta).toHaveAttribute(
      "href",
      `${DEFAULT_ONB1_LEAD_URL}/?vertical=law&specialty=sample&src=ad&utm_source=preview&utm_campaign=test`,
    );
    expect(container.querySelector("video")).toBeNull();
    expect(container.textContent).not.toMatch(/Elizabeth/i);
    expect(templateSource).not.toMatch(/chatbot/i);
    expect(container.textContent).not.toMatch(/\d+%/);
    expect(container.textContent).not.toMatch(/\$\d/);
  });

  it("shows the video slots only when configured", () => {
    const { container } = render(
      <AdLandingTemplate
        page={{
          ...LAW_VERTICAL_PAGE,
          videoUrl: "/videos/sample.mp4",
          elizabethVideoUrl: "/videos/spokesperson.mp4",
        }}
      />,
    );

    const videos = container.querySelectorAll("video");
    expect(videos).toHaveLength(2);
    expect(videos[0]).toHaveAttribute("src", "/videos/sample.mp4");
    expect(videos[1]).toHaveAttribute("src", "/videos/spokesperson.mp4");
  });

  it("404s /law and /law specialty placeholders, and renders contractor sample", async () => {
    expect(() => LawPage()).toThrow("NEXT_NOT_FOUND");
    expect(lawMetadata).toMatchObject(adLandingMetadata(LAW_VERTICAL_PAGE));
    expect(() => LawSpecialtyPage()).toThrow("NEXT_NOT_FOUND");

    render(
      await ContractorsSpecialtyPage({
        params: Promise.resolve({ specialty: "sample" }),
      }),
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "TODO: contractors sample specialty headline — Tony writes copy",
      }),
    ).toBeInTheDocument();
  });

  it("404s unknown specialties and noindexes placeholder pages", async () => {
    expect(() => LawSpecialtyPage()).toThrow("NEXT_NOT_FOUND");
    await expect(
      generateLawSpecialtyMetadata({
        params: Promise.resolve({ specialty: "not-a-practice" }),
      }),
    ).resolves.toEqual({});
    await expect(
      generateContractorsSpecialtyMetadata({
        params: Promise.resolve({ specialty: "sample" }),
      }),
    ).resolves.toMatchObject({ robots: { index: false, follow: false } });
  });

  it("keeps placeholder routes out of the sitemap and noindexes them", async () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/law"))).toBe(false);
    expect(urls.some((url) => url.includes("/law/"))).toBe(false);
    expect(urls.some((url) => url.includes("/contractors/sample"))).toBe(false);

    const headers = await nextConfig.headers?.();
    const sources = (headers ?? []).map((rule) => rule.source);
    expect(sources).toEqual(
      expect.arrayContaining(["/law", "/law/:path*", "/contractors/:path+"]),
    );
    expect(sources).not.toContain("/contractors");
    expect(sources).not.toContain("/contractors/:path*");

    const robotsFor = (source: string) =>
      (headers ?? []).find((rule) => rule.source === source)?.headers;
    expect(robotsFor("/contractors")).toBeUndefined();
    expect(robotsFor("/contractors/:path+")).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
    expect(robotsFor("/for")).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
    expect(robotsFor("/for/:path*")).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
    expect(robotsFor("/law")).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
    expect(robotsFor("/law/:path*")).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
  });

  it("adds no phone, email, payment links, JSON-LD, or chatbot chrome", () => {
    const { container } = render(
      <SiteChrome>
        <AdLandingTemplate page={getAdLandingSpecialty("law", "sample")!} />
      </SiteChrome>,
    );
    const html = container.innerHTML;

    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("buy.stripe.com");
    expect(html).not.toContain("application/ld+json");
    expect(html).not.toMatch(phonePattern);
    expect(html).not.toMatch(emailPattern);
    expect(html).not.toMatch(/chatbot/i);
    expect(templateSource).not.toContain("tel:");
    expect(templateSource).not.toContain("mailto:");
    expect(configSource).not.toContain("tel:");
    expect(configSource).not.toContain("mailto:");
  });
});
