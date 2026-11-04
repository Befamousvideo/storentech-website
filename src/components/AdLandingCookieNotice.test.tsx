import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AdLandingCookieNotice } from "@/components/AdLandingCookieNotice";
import { AdLandingLayout } from "@/components/AdLandingLayout";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    usePathname: vi.fn(() => "/law"),
  };
});

vi.mock("next/script", () => ({
  default: function Script() {
    return null;
  },
}));

afterEach(() => {
  window.localStorage.clear();
});

describe("ad landing cookie notice", () => {
  it("shows the notice with a Privacy Choices link and can be dismissed", async () => {
    const user = userEvent.setup();
    render(<AdLandingCookieNotice />);

    expect(
      await screen.findByText(/ad retargeting cookies/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Your Privacy Choices" }),
    ).toHaveAttribute("href", "/privacy-choices");

    await user.click(screen.getByRole("button", { name: "Dismiss cookie notice" }));
    await waitFor(() => {
      expect(
        screen.queryByText(/ad retargeting cookies/i),
      ).not.toBeInTheDocument();
    });
  });

  it("does not block ad landing content", async () => {
    const { container } = render(
      <AdLandingLayout>
        <p>landing body</p>
      </AdLandingLayout>,
    );

    expect(container).toHaveTextContent("landing body");
    expect(await screen.findByRole("note")).toBeInTheDocument();
    expect(container.querySelector(".ad-cookie-notice")).not.toBeNull();
    expect(container.querySelector("[aria-modal]")).toBeNull();
  });
});
