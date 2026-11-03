import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AdLandingLayout } from "@/components/AdLandingLayout";
import { AdPixel, AD_PIXEL_LOADER_SRC, initAdPixel } from "@/components/AdPixel";
import {
  AD_LANDING_ROUTE_PREFIXES,
  isAdLandingPath,
} from "@/lib/ad-landing-routes";

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const vendorCopy = /Trade Desk|TradeDesk|Brandzooka/i;

const pixelSource = readFileSync(
  join(process.cwd(), "src/components/AdPixel.tsx"),
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

function collectSourceFiles(root: string, acc: string[] = []): string[] {
  const abs = join(process.cwd(), root);
  const stat = statSync(abs);
  if (stat.isFile()) {
    acc.push(abs);
    return acc;
  }
  for (const name of readdirSync(abs)) {
    if (name === "node_modules" || name === ".next") continue;
    const child = join(abs, name);
    if (statSync(child).isDirectory()) {
      collectSourceFiles(relative(process.cwd(), child), acc);
    } else if ([".ts", ".tsx", ".css", ".md", ".example"].includes(extname(name)) || name === ".env.example") {
      acc.push(child);
    }
  }
  return acc;
}

describe("ad landing retargeting pixel", () => {
  it("covers law and contractor ad routes, including specialty children", () => {
    expect(AD_LANDING_ROUTE_PREFIXES).toEqual(["/law", "/contractors"]);
    expect(isAdLandingPath("/law")).toBe(true);
    expect(isAdLandingPath("/law/sample")).toBe(true);
    expect(isAdLandingPath("/contractors")).toBe(true);
    expect(isAdLandingPath("/contractors/sample")).toBe(true);
  });

  it("does not cover the rest of the site", () => {
    expect(isAdLandingPath("/")).toBe(false);
    expect(isAdLandingPath("/privacy")).toBe(false);
    expect(isAdLandingPath("/contact")).toBe(false);
    expect(isAdLandingPath("/for/veritech-plumbing")).toBe(false);
    expect(isAdLandingPath("/blog/after-hours-calls-contractors")).toBe(false);
    expect(isAdLandingPath("/thank-you")).toBe(false);
  });

  it("loads the pixel loader with next/script and runs init only onLoad", () => {
    const { container } = render(<AdPixel />);
    const script = container.querySelector("#ad-pixel");

    expect(script).not.toBeNull();
    expect(script).toHaveAttribute("data-src", AD_PIXEL_LOADER_SRC);
    expect(script).toHaveAttribute(
      "data-src",
      "https://js.adsrvr.org/up_loader.1.1.0.js",
    );
    expect(script).toHaveAttribute("data-type", "text/javascript");
    expect(script).toHaveAttribute("data-strategy", "afterInteractive");
    expect(script).toHaveAttribute("data-has-onload", "true");
    expect(pixelSource).toContain("onLoad={initAdPixel}");
    expect(pixelSource).not.toMatch(/initAdPixel\(\);/);
  });

  it("keeps the pixel advertiser, pixel, and track values exact", () => {
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

    initAdPixel();

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(
      "32fv0sy",
      ["z5qm8kl"],
      "https://insight.adsrvr.org/track/up",
    );

    vi.unstubAllGlobals();
  });

  it("does not init when the pixel API is missing after the loader", () => {
    const ready = vi.fn((callback: () => void) => {
      callback();
    });
    vi.stubGlobal("ttd_dom_ready", ready);
    vi.stubGlobal("TTDUniversalPixelApi", undefined);

    expect(() => initAdPixel()).not.toThrow();
    expect(ready).toHaveBeenCalledTimes(1);

    vi.unstubAllGlobals();
  });

  it("is scoped to /law and /contractors layouts, not the root layout", () => {
    expect(contractorsLayoutSource).toContain("AdLandingLayout");
    expect(lawLayoutSource).toContain("AdLandingLayout");
    expect(layoutSource).not.toContain("AdLanding");
    expect(layoutSource).not.toContain("AdPixel");
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

  it("does not name the pixel vendor in comments, component names, or file names", () => {
    const files = ["src", ".env.example"].flatMap((root) =>
      collectSourceFiles(root),
    );

    for (const file of files) {
      const rel = relative(process.cwd(), file);
      expect(rel, rel).not.toMatch(/tradedesk|brandzooka/i);
      const text = readFileSync(file, "utf8");
      const comments = text.match(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g) ?? [];
      for (const comment of comments) {
        expect(comment, rel).not.toMatch(vendorCopy);
      }
    }

    expect(pixelSource).not.toMatch(vendorCopy);
    expect(pixelSource).toContain("export function AdPixel");
    expect(pixelSource).not.toContain("id=\"ttd-universal-pixel\"");
  });

  it("adds no phone, email, or payment PII", () => {
    const { container } = render(<AdPixel />);
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
