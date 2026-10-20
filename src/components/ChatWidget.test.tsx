import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatWidget } from "@/components/ChatWidget";
import { BOOKING_CTA_HREF } from "@/lib/site";
import { FOR_CTA_HREF } from "@/lib/for-pages";

const contactPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

describe("ChatWidget", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("stays closed until the visitor opens it and does not publish contact details", async () => {
    const user = userEvent.setup();
    const { container } = render(<ChatWidget />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ask" })).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(contactPattern);
    expect(container.innerHTML).not.toContain("mailto:");
    expect(container.innerHTML).not.toContain("tel:");
    expect(container.innerHTML).not.toMatch(phonePattern);

    await user.click(screen.getByRole("button", { name: "Ask" }));

    const booking = screen.getByRole("link", { name: "Book a free 15-minute intro call" });
    expect(booking).toHaveAttribute("href", BOOKING_CTA_HREF);
    expect(booking.getAttribute("href")).toBe(FOR_CTA_HREF);
    expect(screen.getByRole("dialog").textContent).not.toMatch(/google ads|hubspot|zapier|sarah|vincent/i);
    expect(container.innerHTML).not.toMatch(contactPattern);
    expect(container.innerHTML).not.toContain("mailto:");
    expect(container.innerHTML).not.toContain("tel:");
  });

  it("posts email capture to the inquiry route without echoing the address", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: "Ask" }));
    await user.click(screen.getByRole("button", { name: "Leave your email" }));
    await user.type(screen.getByLabelText("Name"), "Ada");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Company"), "Northwind");
    await user.type(screen.getByLabelText("What should we know"), "Missed calls");
    await user.click(screen.getByRole("button", { name: "Send note" }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/inquiry",
      expect.objectContaining({ method: "POST" }),
    );
    const body = JSON.parse(String(fetchMock.mock.calls[0][1].body));
    expect(body).toEqual({
      name: "Ada",
      email: "ada@example.com",
      company: "Northwind",
      broken: "Website chat. Missed calls",
    });
    expect(screen.getByRole("status").textContent).toBe("Received. A StorenTech specialist will reply.");
    expect(screen.getByRole("status").textContent).not.toContain("ada@example.com");
  });

  it("keeps addresses and phone numbers out of the widget source", () => {
    const source = readFileSync(path.join(process.cwd(), "src/components/ChatWidget.tsx"), "utf8");
    expect(source).not.toMatch(contactPattern);
    expect(source).not.toContain("mailto:");
    expect(source).not.toContain("tel:");
    expect(source).not.toMatch(phonePattern);
    expect(source).not.toMatch(/\b(Sarah|Vincent|Vince)\b/);
  });
});
