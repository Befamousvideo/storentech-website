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

const kickerBlock = css.match(/^\.kicker \{[\s\S]*?^\}/m)?.[0] ?? "";
const demoCardKickerBlock =
  css.match(/^\.demo-card \.kicker \{[\s\S]*?^\}/m)?.[0] ?? "";

describe("kicker contrast on cream and tan", () => {
  it("darkens cream/tan kicker text to #80623a without changing --gold", () => {
    expect(css).toContain("--gold: #9b7a4b");
    expect(css).toContain("--gold-soft: #b08d5c");
    expect(kickerBlock).toContain("color: #80623a");
    expect(kickerBlock).not.toContain("var(--gold)");
    expect(demoCardKickerBlock).toContain("color: var(--gold-soft)");
  });

  it("leaves decorative gold rules, numbers, and underlines on --gold", () => {
    expect(css).toMatch(/^\.rule \{[\s\S]*?background:\s*var\(--gold\)/m);
    expect(css).toMatch(/^\.card \.n \{[\s\S]*?color:\s*var\(--gold\)/m);
    expect(css).toMatch(
      /^\.underline-phrase::after \{[\s\S]*?background:\s*var\(--gold\)/m,
    );
    expect(css).toMatch(/^\.stat span \{[\s\S]*?color:\s*var\(--gold\)/m);
  });

  it("meets 4.5:1 on cream, tan, and cream-card", () => {
    const kicker = "#80623a";
    expect(contrastRatio(kicker, "#f4efe6")).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(kicker, "#f8f4ec")).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#b08d5c", "#0e1c2f")).toBeGreaterThanOrEqual(4.5);
    // #80623a on --cream-deep is 4.46:1. Tan kickers use a one-step darker
    // override so computed contrast still clears 4.5:1.
    const tanKicker =
      css.match(/^\.section-tan \.kicker \{[\s\S]*?color:\s*(#[0-9a-f]{6})/m)?.[1] ??
      "";
    expect(tanKicker).toMatch(/^#[0-9a-f]{6}$/i);
    expect(contrastRatio(tanKicker, "#ebe4d6")).toBeGreaterThanOrEqual(4.5);
  });
});
