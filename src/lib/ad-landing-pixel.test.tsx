import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AdLandingLayout } from "@/components/AdLandingLayout";
import {
  AdLandingRetargetingPixel,
  initTradeDeskUniversalPixel,
  TTD_UP_LOADER_SRC,
} from "@/components/AdLandingRetargetingPixel";
import {
  AD_LANDING_ROUTE_PREFIXES,
  isAdLandingPath,
} from "@/lib/ad-landing-routes";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const pixelSource = readFileSync(
  join(process.cwd(), "src/components/AdLandingRetargetingPixel.tsx"),
  "utf8",
);
const layoutSource = readFileSync(
  join(process.cwd(), "src/app/layout.tsx"),
  "utf8",
);
const contractorsLayoutSource = readFileSync(
  join(process.cwd(), "src/app/contractors/layout.tsx"),
  "utf8",
);
const lawLayoutSource = readFileSync(
  join(process.cwd(), "src/app/law/layout.tsx"),
  "utf8",
);

vi.mock("next/script", () => ({
  default: function Script(props: {
    id?: string;
    src?: string;
    type?: string;
    strategy?: string;
    onLoad?: () => void;
  }) {
    return (
      <div
        id={props.id}
        data-testid={props.id}
        data-strategy={props.strategy}
        data-src={props.src}
        data-type={props.type}
        data-has-onload={props.onLoad ? "true" : "false"}
      />
    );
  },
}));

describe("ad landing retargeting pixel", () => {
  it("covers law and contractor ad routes, including specialty children", () => {
    expect(AD_LANDING_ROUTE_PREFIXES).toEqual(["/law", "/contractors"]);
    expect(isAdLandingPath("/law")).toBe(true);
    expect(isAdLandingPath("/law/personal-injury")).toBe(true);
    expect(isAdLandingPath("/contractors")).toBe(true);
    expect(isAdLandingPath("/contractors/hvac")).toBe(true);
  });

  it("does not cover the rest of the site", () => {
    expect(isAdLandingPath("/")).toBe(false);
    expect(isAdLandingPath("/privacy")).toBe(false);
    expect(isAdLandingPath("/contact")).toBe(false);
    expect(isAdLandingPath("/for/veritech-plumbing")).toBe(false);
    expect(isAdLandingPath("/blog/after-hours-calls-contractors")).toBe(false);
    expect(isAdLandingPath("/thank-you")).toBe(false);
  });

  it("loads up_loader with next/script and runs init only onLoad", () => {
    const { container } = render(<AdLandingRetargetingPixel />);
    const script = container.querySelector("#ttd-universal-pixel") ??
      container.querySelector("[data-testid='ttd-universal-pixel']");

    expect(script).not.toBeNull();
    expect(script).toHaveAttribute("data-src", TTD_UP_LOADER_SRC);
    expect(script).toHaveAttribute(
      "data-src",
      "https://js.adsrvr.org/up_loader.1.1.0.js",
    );
    expect(script).toHaveAttribute("data-type", "text/javascript");
    expect(script).toHaveAttribute("data-strategy", "afterInteractive");
    expect(script).toHaveAttribute("data-has-onload", "true");
    expect(pixelSource).toContain("onLoad={initTradeDeskUniversalPixel}");
    expect(pixelSource).not.toMatch(/initTradeDeskUniversalPixel\(\);/);
  });

  it("keeps the Trade Desk advertiser, pixel, and track values exact", () => {
    const init = vi.fn();
    vi.stubGlobal("ttd_dom_ready", (callback: () => void) => {
      callback();
    });
    vi.stubGlobal(
      "TTDUniversalPixelApi",
      class {
        init = init;
      },
    );

    initTradeDeskUniversalPixel();

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(
      "32fv0sy",
      ["z5qm8kl"],
      "https://insight.adsrvr.org/track/up",
    );

    vi.unstubAllGlobals();
  });

  it("does not init when TTDUniversalPixelApi is missing after the loader", () => {
    const ready = vi.fn((callback: () => void) => {
      callback();
    });
    vi.stubGlobal("ttd_dom_ready", ready);
    vi.stubGlobal("TTDUniversalPixelApi", undefined);

    expect(() => initTradeDeskUniversalPixel()).not.toThrow();
    expect(ready).toHaveBeenCalledTimes(1);

    vi.unstubAllGlobals();
  });

  it("is scoped to /law and /contractors layouts, not the root layout", () => {
    expect(contractorsLayoutSource).toContain("AdLandingLayout");
    expect(lawLayoutSource).toContain("AdLandingLayout");
    expect(layoutSource).not.toContain("AdLanding");
    expect(layoutSource).not.toContain("adsrvr");
    expect(layoutSource).not.toContain("32fv0sy");
  });

  it("renders the pixel from the shared ad-landing layout", () => {
    const { container } = render(
      <AdLandingLayout>
        <p>landing</p>
      </AdLandingLayout>,
    );

    expect(
      container.querySelector(
        "[data-src='https://js.adsrvr.org/up_loader.1.1.0.js']",
      ),
    ).not.toBeNull();
    expect(container).toHaveTextContent("landing");
  });

  it("adds no phone, email, or payment PII", () => {
    const { container } = render(<AdLandingRetargetingPixel />);
    const html = container.innerHTML;

    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain("buy.stripe.com");
    expect(html).not.toMatch(phonePattern);
    expect(html).not.toMatch(emailPattern);
    expect(pixelSource).not.toContain("tel:");
    expect(pixelSource).not.toContain("mailto:");
    expect(pixelSource).not.toContain("buy.stripe.com");
    expect(pixelSource).not.toMatch(phonePattern);
    expect(pixelSource).not.toMatch(emailPattern);
  });
});
