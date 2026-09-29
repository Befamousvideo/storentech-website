import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InterviewApp } from "@/components/interview/InterviewApp";

describe("InterviewApp gate", () => {
  it("shows only the private-link message when no key is present", async () => {
    sessionStorage.clear();
    window.history.replaceState(null, "", "/ceo");
    render(<InterviewApp role="ceo" />);
    expect(await screen.findByText("Please use the private link you were sent.")).toBeTruthy();
    expect(screen.queryByText("Required")).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
  });
});
