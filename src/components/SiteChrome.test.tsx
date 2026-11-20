import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SiteChrome } from "@/components/SiteChrome";
import { nav, site } from "@/lib/site";

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
    const primary = screen.getByRole("navigation", { name: "Primary" });
    for (const item of nav) {
      expect(
        within(primary).getByRole("link", { name: item.label }),
      ).toBeInTheDocument();
    }
  });

  it("keeps primary nav available while the helper is open", async () => {
    const user = userEvent.setup();
    render(
      <SiteChrome>
        <p>home</p>
      </SiteChrome>,
    );

    await user.click(screen.getByRole("button", { name: "FAQ help" }));
    expect(screen.getByRole("dialog", { name: "FAQ assistance" })).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
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
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/");
  });

  it("omits the phone badge and compact interview CTA from the marketing header bar", () => {
    const { container } = render(
      <SiteChrome>
        <p>home</p>
      </SiteChrome>,
    );
    const header = container.querySelector("header.site-header");
    const actions = header?.querySelector(".header-actions");
    expect(actions?.querySelector(".header-sarah-phone")).toBeNull();
    expect(actions?.querySelector("a.btn-solid")).toBeNull();
    expect(
      header?.querySelector(".mobile-actions a.btn-solid"),
    ).toHaveTextContent(site.offer.interviewCta);
  });

  it("keeps desktop nav in the remaining header space after dropping header boxes", () => {
    const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
    expect(css).toMatch(
      /\.site-header:not\(\.site-header-law\) \.header-inner:not\(\.header-inner-slim\) \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\)/,
    );
    expect(css).toMatch(
      /@media \(min-width: 981px\) \{[\s\S]*?\.site-header:not\(\.site-header-law\) \.header-actions \{[\s\S]*?display: none/,
    );
    expect(css).toMatch(
      /@media \(max-width: 980px\) \{[\s\S]*?\.site-header:not\(\.site-header-law\) \.header-actions \{[\s\S]*?display: flex/,
    );
  });
});
