import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import nextConfig from "../../../next.config";
import sitemap from "@/app/sitemap";
import { BreakGlassActions } from "@/components/BreakGlassActions";
import {
  assembleEmail,
  assemblePhone,
  assembleTelHref,
  assembleVCard,
  VCARD_FILENAME,
} from "@/lib/break-glass-contact";
import { nav } from "@/lib/site";
import BreakGlassPage, { metadata } from "@/app/break-glass/page";

const PHONE_TAIL = ["613", "8557"].join("");
const EMAIL = ["vincent", "@", "storentech.com"].join("");
const TEL_HREF = ["tel:", "+", "1", "714", PHONE_TAIL].join("");
const E164 = TEL_HREF.slice("tel:".length);

const SOURCE_FILES = [
  "src/app/break-glass/page.tsx",
  "src/components/BreakGlassActions.tsx",
  "src/lib/break-glass-contact.ts",
];

const BUILD_HTML_GLOBS = [
  ".next/server/app/break-glass.html",
  ".next/server/app/break-glass.rsc",
];

function assertNoScrapeablePii(label: string, text: string) {
  expect(text, label).not.toContain(PHONE_TAIL);
  expect(text, label).not.toContain("613-8557");
  expect(text, label).not.toContain("613.8557");
  expect(text, label).not.toContain("613 8557");
  expect(text, label).not.toContain(EMAIL);
  expect(text, label).not.toContain("vincent%40storentech.com");
  expect(text, label).not.toMatch(/tel:/i);
  expect(text, label).not.toMatch(/mailto:/i);
}

function collectFiles(root: string, acc: string[] = []): string[] {
  const abs = join(process.cwd(), root);
  if (!existsSync(abs)) return acc;
  const stat = statSync(abs);
  if (stat.isFile()) {
    acc.push(abs);
    return acc;
  }
  for (const name of readdirSync(abs)) {
    collectFiles(join(root, name), acc);
  }
  return acc;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("break-glass contact assembly", () => {
  it("decodes the operator line and vCard only from obfuscated parts", () => {
    expect(assemblePhone()).toBe(E164);
    expect(assembleEmail()).toBe(EMAIL);
    expect(assembleTelHref()).toBe(TEL_HREF);
    expect(assembleVCard()).toContain(`FN:Sarah – StorenTech Break Glass`);
    expect(assembleVCard()).toContain("ORG:StorenTech");
    expect(assembleVCard()).toContain(`TEL;TYPE=VOICE,WORK:${E164}`);
    expect(assembleVCard()).toContain(`EMAIL;TYPE=WORK:${EMAIL}`);
    expect(VCARD_FILENAME).toBe("Sarah - StorenTech Break Glass.vcf");
  });
});

describe("break-glass page", () => {
  it("is noindex/nofollow and not linked from sitemap, nav, or chrome", () => {
    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
    expect(nav.some((item) => item.href.includes("break-glass"))).toBe(false);
    expect(sitemap().some((entry) => entry.url.includes("/break-glass"))).toBe(
      false,
    );
    expect(readFileSync(join(process.cwd(), "src/components/Header.tsx"), "utf8")).not.toContain(
      "break-glass",
    );
    expect(readFileSync(join(process.cwd(), "src/components/Footer.tsx"), "utf8")).not.toContain(
      "break-glass",
    );
    expect(readFileSync(join(process.cwd(), "public/llms.txt"), "utf8")).not.toContain(
      "break-glass",
    );
  });

  it("renders two action buttons and no scrapeable contact PII", () => {
    const { container } = render(<BreakGlassPage />);
    expect(
      screen.getByRole("heading", { name: "Break Glass" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Call Sarah" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save contact" }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("button")).toHaveLength(2);
    expect(container.querySelector("a[href^='tel:']")).toBeNull();
    expect(container.querySelector("a[href^='mailto:']")).toBeNull();
    assertNoScrapeablePii("break-glass render", container.innerHTML);
    assertNoScrapeablePii("break-glass text", container.textContent ?? "");
  });

  it("dials from a click without writing tel into the DOM", async () => {
    const hrefs: string[] = [];
    vi.stubGlobal("location", {
      get href() {
        return "http://localhost/break-glass";
      },
      set href(value: string) {
        hrefs.push(value);
      },
    });

    const { container } = render(<BreakGlassActions />);
    await userEvent.click(screen.getByRole("button", { name: "Call Sarah" }));
    expect(hrefs).toEqual([TEL_HREF]);
    assertNoScrapeablePii("after call click", container.innerHTML);
  });

  it("downloads a vCard blob on click without writing email into the DOM", async () => {
    const blobs: Blob[] = [];
    const createObjectURL = vi.fn((value: Blob) => {
      blobs.push(value);
      return "blob:test-vcard";
    });
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });

    const downloads: string[] = [];
    const originalCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tagName, options) => {
      const el = originalCreate(tagName, options);
      if (String(tagName).toLowerCase() === "a") {
        el.click = () => {
          downloads.push((el as HTMLAnchorElement).download);
        };
      }
      return el;
    });

    const { container } = render(<BreakGlassActions />);
    await userEvent.click(screen.getByRole("button", { name: "Save contact" }));

    expect(blobs).toHaveLength(1);
    const text = await blobs[0]!.text();
    expect(text).toContain(`TEL;TYPE=VOICE,WORK:${E164}`);
    expect(text).toContain(`EMAIL;TYPE=WORK:${EMAIL}`);
    expect(downloads).toEqual([VCARD_FILENAME]);
    assertNoScrapeablePii("after save click", container.innerHTML);
  });
});

describe("break-glass Class 107 source and build HTML", () => {
  it("keeps phone and email out of page modules and static files", () => {
    for (const file of SOURCE_FILES) {
      assertNoScrapeablePii(file, readFileSync(join(process.cwd(), file), "utf8"));
    }

    const publicFiles = collectFiles("public");
    for (const file of publicFiles) {
      expect(file.endsWith(".vcf"), relative(process.cwd(), file)).toBe(false);
    }
  });

  it("sets an X-Robots-Tag header on the route", async () => {
    const headers = (await nextConfig.headers?.()) ?? [];
    expect(headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/break-glass",
          headers: [
            expect.objectContaining({
              key: "X-Robots-Tag",
              value: "noindex, nofollow",
            }),
          ],
        }),
      ]),
    );
  });

  it("keeps scrapeable contact PII out of the built HTML when a production build is present", () => {
    const files = [
      ...BUILD_HTML_GLOBS.flatMap((hint) => collectFiles(hint)),
      ...collectFiles(".next/server/app").filter((file) => {
        const name = relative(process.cwd(), file);
        return (
          name.includes("break-glass") &&
          (name.endsWith(".html") || name.endsWith(".rsc"))
        );
      }),
    ];
    const unique = [...new Set(files)];

    if (unique.length === 0) {
      expect(
        existsSync(join(process.cwd(), ".next")),
        "expected a Next build so /break-glass HTML can be scanned; run npm run build",
      ).toBe(false);
      return;
    }

    expect(unique.length).toBeGreaterThan(0);
    for (const file of unique) {
      assertNoScrapeablePii(
        relative(process.cwd(), file),
        readFileSync(file, "utf8"),
      );
    }
  });
});
