import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FreeAiMapPage, { metadata } from "@/app/free-ai-map/page";
import sitemap from "@/app/sitemap";
import {
  FREE_AI_MAP_BULLETS,
  FREE_AI_MAP_CONVERSATION_PHRASE,
  FREE_AI_MAP_EMAIL_CAPTURE,
  FREE_AI_MAP_HEADLINE,
  FREE_AI_MAP_PAGE_STEPS,
  FREE_AI_MAP_PATH,
  FREE_AI_MAP_PRIVACY_LINE,
  FREE_AI_MAP_PROMPT,
  FREE_AI_MAP_SUBHEAD,
} from "@/lib/free-ai-map";
import { site } from "@/lib/site";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    usePathname: vi.fn(() => FREE_AI_MAP_PATH),
    useSearchParams: vi.fn(() => new URLSearchParams("utm_source=preview")),
  };
});

const SOURCE_FILES = [
  "src/app/free-ai-map/page.tsx",
  "src/app/api/free-ai-map/route.ts",
  "src/components/FreeAiMapCapture.tsx",
  "src/lib/free-ai-map.ts",
];

describe("/free-ai-map", () => {
  it("uses Tony's download-page copy, canonical, and sitemap entry", () => {
    const { container } = render(<FreeAiMapPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: FREE_AI_MAP_HEADLINE }),
    ).toBeInTheDocument();
    expect(screen.getByText(FREE_AI_MAP_SUBHEAD)).toBeInTheDocument();
    for (const bullet of FREE_AI_MAP_BULLETS) {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    }
    for (const step of FREE_AI_MAP_PAGE_STEPS) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
    expect(screen.getByText(FREE_AI_MAP_EMAIL_CAPTURE)).toBeInTheDocument();
    expect(container.textContent).toContain(FREE_AI_MAP_PRIVACY_LINE);
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(container.textContent).not.toContain(FREE_AI_MAP_PROMPT);
    expect(container.querySelector("[class*='chat']")).toBeNull();
    expect(container.textContent).not.toMatch(/chatbot/i);
    expect(metadata.alternates?.canonical).toBe(FREE_AI_MAP_PATH);
    expect(metadata.description).toBe(FREE_AI_MAP_SUBHEAD);
    expect(sitemap().some((entry) => entry.url === `${site.url}${FREE_AI_MAP_PATH}`)).toBe(
      true,
    );
  });

  it("keeps the free conversation wording and has no PII in source or DOM", () => {
    expect(FREE_AI_MAP_PROMPT).toContain(FREE_AI_MAP_CONVERSATION_PHRASE);
    expect(FREE_AI_MAP_PROMPT.trim().split(/\s+/)).toHaveLength(376);
    expect(FREE_AI_MAP_PROMPT).not.toMatch(/the full Map is free/i);
    expect(FREE_AI_MAP_PROMPT).not.toMatch(/free AI Opportunity Map(?! conversation)/);

    const { container } = render(<FreeAiMapPage />);
    const html = container.innerHTML;
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("buy.stripe.com");
    expect(html).not.toMatch(emailPattern);
    expect(html).not.toMatch(phonePattern);

    for (const file of SOURCE_FILES) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source, file).not.toContain("tel:");
      expect(source, file).not.toContain("mailto:");
      expect(source, file).not.toContain("buy.stripe.com");
      expect(source.replaceAll("storentechai.com/opportunity", ""), file).not.toMatch(
        emailPattern,
      );
      expect(source, file).not.toMatch(phonePattern);
    }
  });
});
