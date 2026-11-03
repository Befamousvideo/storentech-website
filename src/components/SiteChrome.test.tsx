import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteChrome } from "@/components/SiteChrome";

const nav = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
}));

describe("SiteChrome chat", () => {
  it("renders the launcher after the footer and skips /for pages", async () => {
    nav.pathname = "/";
    const { rerender } = render(
      <SiteChrome>
        <p>Home</p>
      </SiteChrome>,
    );

    const launcher = await screen.findByRole("button", { name: "Ask" });
    const footer = document.querySelector("footer");
    expect(footer).not.toBeNull();
    expect(footer!.compareDocumentPosition(launcher) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    nav.pathname = "/for/kei-concepts";
    rerender(
      <SiteChrome>
        <p>Quiet</p>
      </SiteChrome>,
    );
    expect(screen.queryByRole("button", { name: "Ask" })).not.toBeInTheDocument();

    nav.pathname = "/for";
    rerender(
      <SiteChrome>
        <p>Index</p>
      </SiteChrome>,
    );
    expect(screen.queryByRole("button", { name: "Ask" })).not.toBeInTheDocument();
  });
});
