import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

import { usePathname } from "next/navigation";

describe("SiteChrome FAQ helper mount", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/");
  });

  it("mounts the closed FAQ helper on marketing pages", () => {
    render(
      <SiteChrome>
        <p>home</p>
      </SiteChrome>,
    );

    expect(screen.getByRole("button", { name: "FAQ help" })).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: site.offer.interviewCtaShort }).length,
    ).toBeGreaterThan(0);
  });

  it("keeps the header analysis CTA available while the helper is open", async () => {
    const user = userEvent.setup();
    render(
      <SiteChrome>
        <p>home</p>
      </SiteChrome>,
    );

    await user.click(screen.getByRole("button", { name: "FAQ help" }));
    expect(screen.getByRole("dialog", { name: "FAQ assistance" })).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: site.offer.interviewCtaShort }).length,
    ).toBeGreaterThan(0);
  });

  it("does not mount the FAQ helper on quiet /for pages", () => {
    vi.mocked(usePathname).mockReturnValue("/for/kei-concepts");
    render(
      <SiteChrome>
        <p>preview</p>
      </SiteChrome>,
    );

    expect(screen.queryByRole("button", { name: "FAQ help" })).not.toBeInTheDocument();
    expect(screen.queryByText("FAQ assistance")).not.toBeInTheDocument();
  });
});

describe("header layout", () => {
  it("sizes logo and actions to content so the phone badge cannot cover About", () => {
    const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
    expect(css).toMatch(
      /\.header-inner \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto/,
    );
    expect(css).toMatch(/\.header-actions \{[\s\S]*?min-width: min-content/);
  });
});
