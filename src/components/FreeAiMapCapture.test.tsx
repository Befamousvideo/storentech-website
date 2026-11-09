import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FreeAiMapCapture } from "@/components/FreeAiMapCapture";
import { FREE_AI_MAP_PROMPT, FREE_AI_MAP_PROMPT_STEPS } from "@/lib/free-ai-map";

const track = vi.fn();

vi.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => track(...args),
}));

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );
  return {
    ...actual,
    useSearchParams: vi.fn(() => new URLSearchParams("utm_source=preview")),
  };
});

describe("FreeAiMapCapture", () => {
  const writeText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    track.mockReset();
    writeText.mockClear();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, prompt: FREE_AI_MAP_PROMPT }),
      }),
    );
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
  });

  it("shows the prompt with a copied state after submit", async () => {
    const user = userEvent.setup();
    render(<FreeAiMapCapture />);

    await user.type(screen.getByLabelText("Name"), "Owner");
    await user.type(screen.getByLabelText("Email"), "owner@example.com");
    await user.type(screen.getByLabelText("Business type"), "Dental");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /TODO: send-prompt CTA/i }));

    expect(await screen.findByText(FREE_AI_MAP_PROMPT_STEPS[0])).toBeInTheDocument();
    expect(document.querySelector(".prompt-box pre")?.textContent).toBe(
      FREE_AI_MAP_PROMPT,
    );
    expect(track).toHaveBeenCalledWith("free_ai_map_submit");
    expect(fetch).toHaveBeenCalledWith(
      "/api/free-ai-map",
      expect.objectContaining({ method: "POST" }),
    );

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith(FREE_AI_MAP_PROMPT);
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
  });
});
