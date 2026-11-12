import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqHelper } from "@/components/FaqHelper";
import { BOOKING_CTA_HREF, site } from "@/lib/site";

describe("FaqHelper", () => {
  it("stays closed until opened, then is labeled as FAQ assistance", async () => {
    const user = userEvent.setup();
    render(<FaqHelper />);

    const launcher = screen.getByRole("button", { name: "FAQ help" });
    expect(launcher).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: site.offer.cta })).not.toBeInTheDocument();

    await user.click(launcher);
    expect(screen.getByRole("dialog", { name: "FAQ assistance" })).toBeInTheDocument();
    expect(screen.getByText(/not live generative AI/i)).toBeInTheDocument();
    expect(screen.getByText(/cannot book appointments/i)).toBeInTheDocument();

    const handoff = screen.getByRole("link", { name: site.offer.cta });
    expect(handoff).toHaveAttribute("href", BOOKING_CTA_HREF);
  });

  it("answers a known question and returns focus after Escape", async () => {
    const user = userEvent.setup();
    render(<FaqHelper />);
    await user.click(screen.getByRole("button", { name: "FAQ help" }));
    await user.type(
      screen.getByRole("textbox", { name: "Question" }),
      "What is an AI Opportunity Map?",
    );
    await user.click(screen.getByRole("button", { name: "Ask" }));

    expect(screen.getByText(/time or revenue leaks/i)).toBeInTheDocument();
    expect(screen.getByText(/2026-11-07\.preview\.1/)).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "FAQ help" })).toHaveFocus();
  });

  it("does not expose contact or pay details for those requests", async () => {
    const user = userEvent.setup();
    render(<FaqHelper />);
    await user.click(screen.getByRole("button", { name: "FAQ help" }));
    await user.type(
      screen.getByRole("textbox", { name: "Question" }),
      "What's your phone number and Stripe link?",
    );
    await user.keyboard("{Enter}");

    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).toMatch(/does not collect/i);
    expect(dialog.innerHTML).not.toContain("tel:");
    expect(dialog.innerHTML).not.toContain("mailto:");
    expect(dialog.textContent).not.toContain("714");
    expect(dialog.textContent).not.toContain("buy.stripe.com");
    expect(dialog.textContent).not.toContain("6oU14ngeE5w1a8wd7RdjO00");
  });
});
