import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPage from "@/app/privacy/page";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const vendorCopy = /Trade Desk|TradeDesk|Brandzooka|adsrvr/i;

const source = readFileSync(
  join(process.cwd(), "src/app/privacy/page.tsx"),
  "utf8",
);

describe("/privacy advertising and retargeting", () => {
  it("dates the policy November 9, 2026 and describes the ad landing pixel", () => {
    const { container } = render(<PrivacyPage />);

    expect(screen.getByText(/Effective date: November 9, 2026/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Advertising and retargeting",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/law firm and contractor pages/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/connected-TV advertising partner/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not collect what you type into our forms/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We honor Global Privacy Control signals/i),
    ).toBeInTheDocument();
    const advertising = screen.getByRole("heading", {
      level: 2,
      name: "Advertising and retargeting",
    }).parentElement;
    expect(
      advertising?.querySelector('a[href="/privacy-choices"]'),
    ).toHaveTextContent("Your Privacy Choices");
    expect(advertising?.querySelector('a[href="/contact"]')).toHaveTextContent(
      "contact form",
    );
    expect(container.textContent).not.toMatch(/\bMeta\b/);
    expect(source).not.toMatch(/\bMeta\b/);

    expect(container.textContent).toMatch(
      /Google Analytics and Vercel Analytics to understand site traffic/i,
    );
    expect(container.textContent).toMatch(/Google Analytics sets cookies/i);
    expect(
      screen.getAllByRole("link", { name: "Google's browser add-on" })[0],
    ).toHaveAttribute("href", "https://tools.google.com/dlpage/gaoptout");
    expect(container.textContent).toMatch(/cookie-free/i);
    expect(container.textContent).toMatch(/Vercel Analytics/i);
    expect(container.textContent).not.toMatch(
      /does not currently load a third-party analytics or advertising pixel/i,
    );
    expect(container.textContent).not.toMatch(
      /This site does not load advertising pixels/i,
    );
    expect(container.textContent).not.toMatch(
      /We do not currently use analytics or advertising cookies/i,
    );
    expect(container.textContent).not.toMatch(
      /We do not\s+use analytics or advertising cookies/i,
    );
  });

  it("does not name a pixel vendor or put email or phone in the DOM", () => {
    const { container } = render(<PrivacyPage />);
    const html = container.innerHTML;

    expect(html).not.toMatch(vendorCopy);
    expect(source).not.toMatch(vendorCopy);
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toMatch(emailPattern);
    expect(html).not.toMatch(phonePattern);
    expect(source).not.toContain("mailto:");
  });
});
