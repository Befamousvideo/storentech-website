import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import PrivacyChoicesPage from "@/app/privacy-choices/page";
import { Footer } from "@/components/Footer";
import {
  AD_RETARGETING_COOKIE_NAME,
  mayLoadAdTag,
  writeAdRetargetingChoice,
} from "@/lib/ad-consent";

const vendorCopy = /Trade Desk|TradeDesk|Brandzooka|adsrvr|\bMeta\b|\bGoogle\b/i;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const source = readFileSync(
  join(process.cwd(), "src/app/privacy-choices/page.tsx"),
  "utf8",
);

afterEach(() => {
  window.localStorage.clear();
  document.cookie = `${AD_RETARGETING_COOKIE_NAME}=; Path=/; Max-Age=0`;
});

describe("/privacy-choices", () => {
  it("lets a visitor turn ad retargeting cookies off", async () => {
    writeAdRetargetingChoice(true);
    const user = userEvent.setup();
    render(<PrivacyChoicesPage />);

    const toggle = await screen.findByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "true");

    await user.click(toggle);
    await waitFor(() => {
      expect(toggle).toHaveAttribute("aria-checked", "false");
    });
    expect(
      mayLoadAdTag({
        pathname: "/law/sample",
        globalPrivacyControl: false,
      }),
    ).toBe(false);
  });

  it("links data requests to the contact form and names no vendor", () => {
    const { container } = render(<PrivacyChoicesPage />);

    expect(
      screen.getByRole("heading", { name: "Your Privacy Choices" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Do Not Sell or Share My Personal Information/),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "contact form" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(container.innerHTML).not.toMatch(vendorCopy);
    expect(source).not.toMatch(vendorCopy);
    expect(container.innerHTML).not.toMatch(emailPattern);
    expect(container.innerHTML).not.toContain("mailto:");
  });
});

describe("site footer privacy choices", () => {
  it("links Your Privacy Choices from every footer", () => {
    render(<Footer />);
    const choices = screen.getAllByRole("link", { name: "Your Privacy Choices" });
    expect(choices.length).toBeGreaterThan(0);
    expect(choices[0]).toHaveAttribute("href", "/privacy-choices");
    expect(
      screen.getByRole("link", {
        name: "Do Not Sell or Share My Personal Information",
      }),
    ).toHaveAttribute("href", "/privacy-choices");
  });
});
