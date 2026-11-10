import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/ContactForm";

const trackGenerateLead = vi.fn();

vi.mock("@/lib/analytics", () => ({
  trackGenerateLead: () => trackGenerateLead(),
}));

afterEach(() => {
  trackGenerateLead.mockReset();
  vi.unstubAllGlobals();
});

describe("ContactForm generate_lead", () => {
  it("fires generate_lead on a successful submit with no PII in the analytics call", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Company"), "Analytical Engines");
    await user.type(
      screen.getByLabelText("What’s broken"),
      "Leads sit in voicemail.",
    );
    await user.click(
      screen.getByRole("button", { name: "Start your AI Opportunity Map" }),
    );

    await waitFor(() => {
      expect(trackGenerateLead).toHaveBeenCalledTimes(1);
    });
    expect(trackGenerateLead).toHaveBeenCalledWith();
  });

  it("does not fire generate_lead when the honeypot is filled", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Bot");
    await user.type(screen.getByLabelText("Email"), "bot@example.com");
    await user.type(screen.getByLabelText("Company"), "Spam");
    await user.type(screen.getByLabelText("What’s broken"), "n/a");
    const honeypot = document.getElementById("company_website");
    expect(honeypot).toBeInstanceOf(HTMLInputElement);
    await user.type(honeypot as HTMLInputElement, "https://spam.test");
    await user.click(
      screen.getByRole("button", { name: "Start your AI Opportunity Map" }),
    );

    await waitFor(() => {
      expect(
        screen.getByText("Received. We will reply from the office."),
      ).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(trackGenerateLead).not.toHaveBeenCalled();
  });
});
