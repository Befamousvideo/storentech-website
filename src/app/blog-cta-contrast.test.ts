import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function channel(hex: string) {
  const value = parseInt(hex, 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hexColor: string) {
  const hex = hexColor.replace("#", "");
  const r = channel(hex.slice(0, 2));
  const g = channel(hex.slice(2, 4));
  const b = channel(hex.slice(4, 6));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

describe("blog CTA button contrast", () => {
  it("keeps solid article CTAs cream-on-navy so blog-prose links cannot override them", () => {
    expect(css).toMatch(/\.blog-prose a\.btn-solid[\s\S]*?color:\s*var\(--cream\)/);
    expect(css).toContain("--cream: #f4efe6");
    expect(css).toContain("--navy: #0e1c2f");

    const ratio = contrastRatio("#f4efe6", "#0e1c2f");
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
