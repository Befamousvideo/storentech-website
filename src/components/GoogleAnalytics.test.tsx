import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import {
  AD_RETARGETING_COOKIE_NAME,
  writeAdRetargetingChoice,
} from "@/lib/ad-consent";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const layoutSource = readFileSync(
  join(process.cwd(), "src/app/layout.tsx"),
  "utf8",
);
const analyticsSource = readFileSync(
  join(process.cwd(), "src/components/GoogleAnalytics.tsx"),
  "utf8",
);
const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

vi.mock("next/script", () => ({
  default: function Script(props: {
    id?: string;
    src?: string;
    strategy?: string;
    children?: string;
  }) {
    return (
      <div
        id={props.id}
        data-testid={props.id}
        data-strategy={props.strategy}
        data-src={props.src}
      >
        {props.children}
      </div>
    );
  },
}));

afterEach(() => {
  window.localStorage.clear();
  document.cookie = `${AD_RETARGETING_COOKIE_NAME}=; Path=/; Max-Age=0`;
  vi.unstubAllGlobals();
});

describe("GoogleAnalytics", () => {
  it("loads gtag.js afterInteractive with the measurement ID", () => {
    const { container } = render(<GoogleAnalytics />);
    const script = container.querySelector("#ga4");

    expect(script).toHaveAttribute(
      "data-src",
      `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    );
    expect(script).toHaveAttribute("data-strategy", "afterInteractive");
    expect(container.querySelector("#ga4-init")).toHaveAttribute(
      "data-strategy",
      "afterInteractive",
    );
    expect(container.querySelector("#ga4-init")?.textContent).toContain(
      GA_MEASUREMENT_ID,
    );
    expect(analyticsSource).toContain('strategy="afterInteractive"');
  });

  it("is mounted from the root layout only in production", () => {
    expect(layoutSource).toContain("GoogleAnalytics");
    expect(layoutSource).toContain("isProductionAnalyticsEnv()");
    expect(layoutSource).toContain("<Analytics />");
    expect(layoutSource).toContain("<SiteAnalytics />");
  });

  it("does not load when Global Privacy Control is set", async () => {
    Object.defineProperty(navigator, "globalPrivacyControl", {
      configurable: true,
      value: true,
    });
    const { container } = render(<GoogleAnalytics />);
    await waitFor(() => {
      expect(container.querySelector("#ga4")).toBeNull();
    });
    Object.defineProperty(navigator, "globalPrivacyControl", {
      configurable: true,
      value: undefined,
    });
  });

  it("unloads when the existing opt-out is turned on", async () => {
    writeAdRetargetingChoice(true);
    const { container } = render(<GoogleAnalytics />);
    expect(container.querySelector("#ga4")).not.toBeNull();

    writeAdRetargetingChoice(false);
    await waitFor(() => {
      expect(container.querySelector("#ga4")).toBeNull();
    });
  });

  it("adds no phone, email, or payment PII", () => {
    const { container } = render(<GoogleAnalytics />);
    const html = container.innerHTML;

    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("buy.stripe.com");
    expect(html).not.toMatch(phonePattern);
    expect(html).not.toMatch(emailPattern);
    expect(analyticsSource).not.toMatch(phonePattern);
    expect(analyticsSource).not.toMatch(emailPattern);
  });
});
