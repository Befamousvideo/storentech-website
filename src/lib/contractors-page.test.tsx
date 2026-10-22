import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import sharp from "sharp";
import { describe, expect, it, vi } from "vitest";
import ContractorsPage, { metadata } from "@/app/contractors/page";
import sitemap from "@/app/sitemap";
import { ContractorsLanding } from "@/components/ContractorsLanding";
import { SiteChrome } from "@/components/SiteChrome";
import {
  CONTRACTORS_CANONICAL_URL,
  CONTRACTORS_CTA_LABEL,
  CONTRACTORS_PATH,
  contractorsPage,
  contractorsVideo,
} from "@/lib/contractors-page";
import { BOOKING_CTA_HREF } from "@/lib/site";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    usePathname: vi.fn(() => CONTRACTORS_PATH),
  };
});

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const pageSource = readFileSync(
  join(process.cwd(), "src/app/contractors/page.tsx"),
  "utf8",
);
const landingSource = readFileSync(
  join(process.cwd(), "src/components/ContractorsLanding.tsx"),
  "utf8",
);
const copySource = readFileSync(
  join(process.cwd(), "src/lib/contractors-page.ts"),
  "utf8",
);

function assertNoContactOrPaymentMarkup(label: string, html: string) {
  expect(html, label).not.toContain("tel:");
  expect(html, label).not.toContain("mailto:");
  expect(html, label).not.toContain("application/ld+json");
  expect(html, label).not.toContain("buy.stripe.com");
  expect(html, label).not.toMatch(phonePattern);
  expect(html, label).not.toMatch(emailPattern);
}

describe("/contractors landing page", () => {
  it("keeps draft copy in one data file and points CTAs at the booking link", () => {
    expect(contractorsPage.ctaHref).toBe(BOOKING_CTA_HREF);
    expect(contractorsPage.ctaLabel).toBe(CONTRACTORS_CTA_LABEL);
    expect(CONTRACTORS_CTA_LABEL).toBe("Book a free 15-minute intro call");
    expect(CONTRACTORS_CTA_LABEL.toLowerCase()).toContain(
      "free 15-minute intro call",
    );
    expect(copySource).toContain(contractorsPage.h1);
    expect(copySource).toContain(contractorsPage.example.equation);
    expect(copySource).toContain(contractorsPage.example.result);
    expect(copySource).toContain("Example only.");
    expect(copySource).toContain("made-up numbers");
    expect(landingSource).not.toContain("calendar.app.google");
    expect(pageSource).not.toContain("application/ld+json");
    expect(landingSource).not.toContain("application/ld+json");
  });

  it("sets the canonical URL, title, and description", () => {
    expect(CONTRACTORS_CANONICAL_URL).toBe(
      "https://www.storentechai.com/contractors",
    );
    expect(metadata.title).toEqual({ absolute: contractorsPage.metaTitle });
    expect(metadata.description).toBe(contractorsPage.metaDescription);
    expect(metadata.alternates).toEqual({
      canonical: CONTRACTORS_CANONICAL_URL,
    });
    expect(metadata.openGraph).toMatchObject({
      title: contractorsPage.metaTitle,
      description: contractorsPage.metaDescription,
      url: CONTRACTORS_CANONICAL_URL,
    });
  });

  it("lists /contractors in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(CONTRACTORS_CANONICAL_URL);
  });

  it("embeds the square video with controls, a poster, and the draft caption", async () => {
    const videoPath = join(
      process.cwd(),
      "public",
      contractorsVideo.src.replace(/^\//, ""),
    );
    const posterPath = join(
      process.cwd(),
      "public",
      contractorsVideo.poster.replace(/^\//, ""),
    );
    expect(existsSync(videoPath)).toBe(true);
    expect(existsSync(posterPath)).toBe(true);

    const poster = await sharp(posterPath).metadata();
    expect(poster.format).toBe("jpeg");
    expect(poster.width).toBe(contractorsVideo.width);
    expect(poster.height).toBe(contractorsVideo.height);
    expect(poster.width).toBe(poster.height);

    render(<ContractorsLanding />);
    const video = document.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("src", contractorsVideo.src);
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("muted");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveAttribute("poster", contractorsVideo.poster);
    expect(video).toHaveAttribute("width", String(contractorsVideo.width));
    expect(video).toHaveAttribute("height", String(contractorsVideo.height));
    expect(video).not.toHaveAttribute("autoplay");
    expect(screen.getByText(contractorsVideo.caption)).toBeInTheDocument();
  });

  it("renders the draft sections, labeled example math, and booking CTAs", () => {
    render(<ContractorsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: contractorsPage.h1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(contractorsPage.subhead)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: contractorsPage.problem.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: contractorsPage.example.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(contractorsPage.example.label)).toBeInTheDocument();
    expect(screen.getByText(contractorsPage.example.disclaimer)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${contractorsPage.example.equation} ${contractorsPage.example.result}`,
      ),
    ).toBeInTheDocument();

    const ctas = screen.getAllByRole("link", { name: CONTRACTORS_CTA_LABEL });
    expect(ctas).toHaveLength(2);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", BOOKING_CTA_HREF);
      expect(cta).toHaveAttribute("target", "_blank");
      expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(
      screen.getByRole("link", { name: contractorsPage.heroSecondary.label }),
    ).toHaveAttribute("href", "/opportunity");
    expect(
      screen.getByRole("link", { name: contractorsPage.finalCta.secondaryLabel }),
    ).toHaveAttribute("href", "/opportunity");

    for (const item of contractorsPage.faqs) {
      expect(
        screen.getByRole("heading", { level: 3, name: item.question }),
      ).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it("does not put phone, email, payment links, or JSON-LD on the page", () => {
    const { container } = render(
      <SiteChrome>
        <ContractorsLanding />
      </SiteChrome>,
    );
    const html = container.innerHTML;

    assertNoContactOrPaymentMarkup("chrome", html);
    assertNoContactOrPaymentMarkup("page source", pageSource);
    assertNoContactOrPaymentMarkup("landing source", landingSource);
    assertNoContactOrPaymentMarkup("copy source", copySource);

    const alts = [...container.querySelectorAll("img")].map((img) =>
      img.getAttribute("alt"),
    );
    for (const alt of alts) {
      expect(alt ?? "").not.toMatch(/\d/);
    }
  });
});
