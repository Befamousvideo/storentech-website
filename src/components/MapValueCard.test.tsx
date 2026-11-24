import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { MapValueCard } from "@/components/MapValueCard";
import { mapValue, site } from "@/lib/site";

describe("MapValueCard", () => {
  it("leads with value, then the $1,000 price", () => {
    const { container } = render(<MapValueCard />);
    const text = container.textContent ?? "";

    expect(screen.getByText(mapValue.heading)).toBeInTheDocument();
    expect(screen.getByText(mapValue.lede)).toBeInTheDocument();
    for (const bullet of mapValue.bullets) {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    }
    expect(text).toContain(site.offer.priceLine);
    expect(text).toContain(
      "A typical report identifies major cash and time savings and usually exceeds 40 pages.",
    );
    expect(screen.getByText(mapValue.keepLine)).toBeInTheDocument();
    expect(text).not.toMatch(/30\+/);
    expect(text).not.toContain("15-page");
    expect(text.indexOf(mapValue.lede)).toBeLessThan(text.indexOf("$1,000"));
    expect(text.indexOf(mapValue.bullets[2])).toBeLessThan(
      text.indexOf(mapValue.keepLine),
    );
    expect(text.indexOf(mapValue.keepLine)).toBeLessThan(text.indexOf("$1,000"));
    expect(text).not.toMatch(/\bROIA\b/);
    expect(text).not.toMatch(/Leak Map/i);
    expect(text).not.toMatch(/\bOpp\b/);
    expect(mapValue.keepLine).toContain("StorenTech");
    expect(mapValue.keepLine).not.toContain("Storentech");
  });

  it("keeps the keep-the-report line above the price on compact cards", () => {
    const { container } = render(<MapValueCard compact />);
    const text = container.textContent ?? "";

    expect(screen.getByText(mapValue.keepLine)).toBeInTheDocument();
    expect(text.indexOf(mapValue.keepLine)).toBeLessThan(text.indexOf("$1,000"));
  });

  it("keeps the homepage price behind the What you get card", () => {
    const { container } = render(<HomePage />);
    const hero = container.querySelector("section.hero");
    const text = hero?.textContent ?? "";
    const firstValue = text.indexOf(mapValue.heading);
    const firstPrice = text.indexOf("$1,000");

    expect(firstValue).toBeGreaterThan(-1);
    expect(firstPrice).toBeGreaterThan(firstValue);
    expect(hero?.querySelector(".map-value")).not.toBeNull();
    expect(
      container.querySelector("section.hero .btn-row a.btn-solid"),
    ).toHaveTextContent(site.offer.interviewCta);
  });
});

describe("price never appears without map value", () => {
  it("keeps $1,000 behind the value copy in public source", () => {
    const roots = ["src/app", "src/components", "src/lib", "README.md"];
    const skip = new Set(["node_modules"]);
    const files: string[] = [];

    function collect(root: string) {
      const abs = join(process.cwd(), root);
      const stat = statSync(abs);
      if (stat.isFile()) {
        files.push(abs);
        return;
      }
      for (const name of readdirSync(abs)) {
        if (skip.has(name)) continue;
        const child = join(root, name);
        const childAbs = join(process.cwd(), child);
        const childStat = statSync(childAbs);
        if (childStat.isDirectory()) collect(child);
        else if (/\.(ts|tsx|md)$/.test(name) && !/\.test\.(ts|tsx)$/.test(name)) {
          files.push(childAbs);
        }
      }
    }

    for (const root of roots) collect(root);

    for (const file of files) {
      const text = readFileSync(file, "utf8");
      const label = relative(process.cwd(), file);
      expect(text, label).not.toMatch(/\$1k\b/i);
      if (!text.includes("$1,000")) continue;
      const hasValue =
        text.includes("MapValueCard") ||
        text.includes("mapValue") ||
        text.includes("comprehensive deep-dive report") ||
        text.includes("Thrive After Your Promotion");
      expect(hasValue, label).toBe(true);
    }
  });
});

describe("FAQ helper mobile placement", () => {
  it("raises the launcher under the header on small screens", () => {
    const css = readFileSync(
      join(process.cwd(), "src/components/FaqHelper.module.css"),
      "utf8",
    );
    expect(css).toMatch(
      /@media \(max-width: 640px\) \{[\s\S]*?top: calc\(var\(--header-h\) \+ 0\.45rem\)/,
    );
    expect(css).toMatch(
      /@media \(max-width: 640px\) \{[\s\S]*?bottom: auto/,
    );
  });
});
