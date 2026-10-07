import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandLogo } from "@/components/BrandLogo";
import { site } from "@/lib/site";

const ROOT = process.cwd();

const RETIRED_LOGO_PATHS = [
  "public/storentech-logo-orbit.png",
  "public/storentech-logo-orbit-dark.png",
  "public/brand/storentech-logo-orbit-light-hires.png",
];

const RETIRED_LOGO_SNIPPETS = [
  "storentech-logo-orbit.png",
  "storentech-logo-orbit-dark.png",
  "storentech-logo-orbit-light-hires.png",
  "wordmarkDark",
];

const SOURCE_ROOTS = ["src", "public/llms.txt", "README.md", "scripts"];
const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".json",
  ".css",
  ".md",
  ".txt",
]);

function collectFiles(root: string, acc: string[] = []): string[] {
  const abs = join(ROOT, root);
  const stat = statSync(abs);
  if (stat.isFile()) {
    acc.push(abs);
    return acc;
  }
  for (const name of readdirSync(abs)) {
    if (name === "node_modules") continue;
    const rel = join(root, name);
    const child = join(ROOT, rel);
    const childStat = statSync(child);
    if (childStat.isDirectory()) {
      collectFiles(rel, acc);
    } else if (SOURCE_EXTENSIONS.has(extname(name))) {
      acc.push(child);
    }
  }
  return acc;
}

function pngSize(path: string) {
  const buf = readFileSync(join(ROOT, path));
  expect(buf.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))).toBe(
    true,
  );
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

describe("Orbit v4 brand assets", () => {
  it("keeps the sphere mark path and drops lockup wordmark fields", () => {
    expect(site.brand.mark).toBe("/orbit-mark.png");
    expect(site.brand.master).toBe(
      "/brand/storentech-logo-orbit-2026-10-v4-clean.png",
    );
    expect(site.brand).not.toHaveProperty("wordmark");
    expect(site.brand).not.toHaveProperty("wordmarkDark");
  });

  it("renders BrandLogo from the sphere mark plus text wordmark", () => {
    const { container } = render(<BrandLogo />);
    const img = container.querySelector("img.logo-mark");
    expect(img).toHaveAttribute("src", "/orbit-mark.png");
    expect(container.querySelector(".logo-word")?.textContent).toBe(
      "StorenTech",
    );
    expect(container.querySelector(".logo-ai")?.textContent).toBe("AI");
    expect(container.textContent).toContain("StorenTech");
    expect(container.textContent).toContain("AI");
  });

  it("ships the expected transparent PNG sizes", () => {
    expect(pngSize("public/orbit-mark.png")).toEqual({
      width: 512,
      height: 512,
    });
    expect(pngSize("public/favicon-512.png")).toEqual({
      width: 512,
      height: 512,
    });
    expect(pngSize("public/favicon-32.png")).toEqual({ width: 32, height: 32 });
    expect(pngSize("public/apple-touch-icon.png")).toEqual({
      width: 180,
      height: 180,
    });
    expect(pngSize("src/app/icon.png")).toEqual({ width: 512, height: 512 });
    expect(pngSize("src/app/apple-icon.png")).toEqual({
      width: 180,
      height: 180,
    });
    expect(existsSync(join(ROOT, "public/favicon.ico"))).toBe(true);
    expect(
      existsSync(
        join(ROOT, "public/brand/storentech-logo-orbit-2026-10-v4-clean.png"),
      ),
    ).toBe(true);
    expect(
      pngSize("public/brand/storentech-logo-orbit-2026-10-v4-clean.png"),
    ).toEqual({ width: 2048, height: 2048 });
  });

  it("removes retired lockup files", () => {
    for (const path of RETIRED_LOGO_PATHS) {
      expect(existsSync(join(ROOT, path)), path).toBe(false);
    }
  });

  it("does not reference retired lockup filenames in site source", () => {
    const files = SOURCE_ROOTS.flatMap((root) => collectFiles(root));
    expect(files.length).toBeGreaterThan(10);

    for (const file of files) {
      const label = relative(ROOT, file);
      if (label.endsWith("brand-assets.test.tsx")) continue;
      const text = readFileSync(file, "utf8");
      for (const snippet of RETIRED_LOGO_SNIPPETS) {
        expect(text, `${label} still mentions ${snippet}`).not.toContain(
          snippet,
        );
      }
    }
  });
});
