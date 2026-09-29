import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClosedInterview } from "@/components/interview/ClosedInterview";

describe("ClosedInterview", () => {
  it("shows a thank-you state with no questions", () => {
    render(
      <ClosedInterview
        title="CEO"
        message="Thank you. Your answers are saved. You can close this page."
      />,
    );
    expect(screen.getByRole("heading", { name: "CEO" })).toBeTruthy();
    expect(screen.getByText(/Thank you. Your answers are saved/)).toBeTruthy();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByText("Required")).toBeNull();
  });

  it("shows the closed copy with no form", () => {
    render(
      <ClosedInterview title="CFO" message="This interview is closed. Thank you." />,
    );
    expect(screen.getByText("This interview is closed. Thank you.")).toBeTruthy();
    expect(screen.queryByRole("textbox")).toBeNull();
  });
});
