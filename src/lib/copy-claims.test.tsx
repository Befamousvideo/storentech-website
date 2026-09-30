import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HowItWorksPage from "@/app/how-it-works/page";
import HomePage from "@/app/page";
import WorkPage from "@/app/work/page";
import { site } from "@/lib/site";

const MULTIPLE_TIMES = ["multiple", " times"].join("");
const PRODUCTIVE_CAPACITY = ["productive", " capacity"].join("");
const TIMES_THE = ["times", " the"].join("");
const TIMES_MORE = ["times", " more"].join("");

const COPY_ROOTS = [
  "src/app",
  "src/components",
  "src/lib",
  "public/llms.txt",
  "README.md",
];
const COPY_EXTENSIONS = new Set([".ts", ".tsx", ".txt", ".md", ".json"]);

function isTestFile(file: string) {
  return /\.test\.(ts|tsx)$/.test(file);
}

function collectCopyFiles(root: string, acc: string[] = []): string[] {
  const abs = join(process.cwd(), root);
  const stat = statSync(abs);
  if (stat.isFile()) {
    acc.push(abs);
    return acc;
  }
  for (const name of readdirSync(abs)) {
    const rel = join(root, name);
    if (name === "node_modules") continue;
    const child = join(process.cwd(), rel);
    const childStat = statSync(child);
    if (childStat.isDirectory()) {
      collectCopyFiles(rel, acc);
    } else if (COPY_EXTENSIONS.has(extname(name)) && !isTestFile(name)) {
      acc.push(child);
    }
  }
  return acc;
}

function withoutIconSizes(text: string) {
  return text.replace(/\b\d+x\d+\b/g, "");
}

function assertNoMultiplierClaims(label: string, text: string) {
  expect(text, label).not.toContain(MULTIPLE_TIMES);
  expect(text, label).not.toContain(PRODUCTIVE_CAPACITY);
  expect(text, label).not.toMatch(new RegExp(`\\b${TIMES_THE}\\b`, "i"));
  expect(text, label).not.toMatch(new RegExp(`\\b${TIMES_MORE}\\b`, "i"));
  expect(withoutIconSizes(text), label).not.toMatch(/\b\d+\s*[x×]\b/);
}

describe("marketing copy has no multiplier claims", () => {
  it("keeps the shared capacity sentence free of multiplier language", () => {
    expect(site.offer.capacity).toBe(
      "When AI takes the grind, your people get time back for the work that needs a human, so more gets done and the human touch stays where customers feel it.",
    );
    assertNoMultiplierClaims("site.offer.capacity", site.offer.capacity);
    expect(site.offer.primaryTitle).toBe("AI Opportunity Map");
    expect(site.offer.later).toContain("Build Plan");
    expect(site.offer.capacity).not.toMatch(/Opportunity Blueprint/i);
    expect(site.offer.capacity).not.toMatch(/\bROIA\b/);
  });

  it("keeps source copy and metadata free of multiplier claims", () => {
    const files = COPY_ROOTS.flatMap((root) => collectCopyFiles(root));
    expect(files.length).toBeGreaterThan(10);

    for (const file of files) {
      const label = relative(process.cwd(), file);
      assertNoMultiplierClaims(label, readFileSync(file, "utf8"));
    }
  });

  it("does not render multiplier claims on home, how-it-works, or work", () => {
    const pages = [
      { name: "/", node: <HomePage /> },
      { name: "/how-it-works", node: <HowItWorksPage /> },
      { name: "/work", node: <WorkPage /> },
    ];

    for (const page of pages) {
      const { container } = render(page.node);
      const html = container.innerHTML;
      const text = container.textContent ?? "";

      assertNoMultiplierClaims(`${page.name} text`, text);
      assertNoMultiplierClaims(`${page.name} html`, html);
      expect(text).toContain(site.offer.capacity);
      expect(html).not.toContain("tel:");
      expect(html).not.toContain("mailto:");
      expect(html).not.toMatch(/Opportunity Blueprint/i);
      expect(html.replaceAll("/roia", "")).not.toMatch(/\bROIA\b/);
    }
  });
});
