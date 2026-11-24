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

describe("header brand lockup scale", () => {
  it("doubles the previous desktop lockup and enlarges AI relative to the wordmark", () => {
    expect(css).toMatch(/--header-h:\s*120px;/);
    expect(css).toMatch(/--logo-mark:\s*80px;/);
    expect(css).toMatch(/--logo-word:\s*2\.9rem;/);
    expect(css).toMatch(/--logo-ai:\s*1\.8rem;/);
    expect(css).toMatch(/--logo-gap:\s*1\.1rem;/);
    // Previous: 40px mark, 1.45rem word, 0.72rem AI (AI was 49.7% of the word).
    expect(80 / 40).toBe(2);
    expect(2.9 / 1.45).toBe(2);
    expect(1.1 / 0.55).toBe(2);
    expect(1.8 / 2.9).toBeGreaterThan(0.72 / 1.45);
  });

  it("uses 2× of the previous mobile mark from 641px, and the largest fit at 360/390", () => {
    expect(css).toMatch(
      /@media \(max-width: 980px\) \{[\s\S]*?--logo-mark:\s*68px;/,
    );
    expect(css).toMatch(
      /@media \(max-width: 640px\) \{[\s\S]*?--logo-mark:\s*clamp\(52px, 14\.45vw, 68px\)/,
    );
    expect(css).toContain(
      "390px lands at about 1.66× the old mobile mark",
    );
  });

  it("darkens header AI one step without changing --gold or the footer mark", () => {
    expect(css).toMatch(/--gold:\s*#9b7a4b;/);
    expect(css).toMatch(/\.site-header \.logo-ai \{[\s\S]*?color:\s*#745833;/);
    expect(css).toMatch(
      /\.site-footer \.logo-ai \{[\s\S]*?color:\s*var\(--gold-soft\);/,
    );
    expect(contrastRatio("#745833", "#f4efe6")).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#745833", "#f4efe6")).toBeGreaterThan(
      contrastRatio("#80623a", "#f4efe6"),
    );
    expect(contrastRatio("#b08d5c", "#0e1c2f")).toBeGreaterThanOrEqual(4.5);
  });
});
