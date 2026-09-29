import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { InterviewForm } from "@/components/interview/InterviewForm";
import { emptyFollowUp, type InterviewSession } from "@/lib/interview";

const session: InterviewSession = {
  role: "ops",
  company_label: "Company 111",
  role_title: "Ops",
  intro: "Thank you for making time. Answer in your own words.",
  status: "in_progress",
  answers: {},
  questions: [
    { id: "ops-must", text: "Which handoff needs a closer look?", tag: "must", follow_ups: true },
    { id: "ops-wish", text: "What is on the optional wishlist?", tag: "if_time", follow_ups: false },
  ],
};

const drafts = {
  "ops-must": { text: "", follow_ups: [emptyFollowUp(0)], updatedAt: 0 },
  "ops-wish": { text: "", follow_ups: [], updatedAt: 0 },
};

describe("InterviewForm", () => {
  it("renders company label, role, intro, required and optional tags, and follow-ups only when flagged", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <InterviewForm
        session={session}
        drafts={drafts}
        saveState="idle"
        submitting={false}
        submitted={false}
        recordingId={null}
        recordingSeconds={0}
        transcribingId={null}
        micMessage={null}
        submitError={null}
        onChange={onChange}
        onToggleRecord={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByText("Company 111")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: "Ops" })).toBeTruthy();
    expect(screen.getByText(/Thank you for making time/)).toBeTruthy();
    expect(screen.getByText("Required")).toBeTruthy();
    expect(screen.getByText("If time")).toBeTruthy();
    expect(screen.getByText("Which handoff needs a closer look?")).toBeTruthy();
    expect(screen.getByText("What is on the optional wishlist?")).toBeTruthy();
    expect(screen.getByLabelText("How often?")).toBeTruthy();
    expect(screen.getByLabelText("About how long each time?")).toBeTruthy();
    expect(screen.getByLabelText("Who usually does it?")).toBeTruthy();
    expect(screen.getAllByLabelText("How often?")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "+ Add another task" }));
    expect(onChange).toHaveBeenCalled();
    const next = onChange.mock.calls[0][1];
    expect(next.follow_ups).toHaveLength(2);
  });

  it("marks required textareas and keeps submit disabled until required answers exist", () => {
    const onSubmit = vi.fn();
    const { rerender } = render(
      <InterviewForm
        session={session}
        drafts={drafts}
        saveState="saved"
        submitting={false}
        submitted={false}
        recordingId={null}
        recordingSeconds={0}
        transcribingId={null}
        micMessage={null}
        submitError={null}
        onChange={vi.fn()}
        onToggleRecord={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByLabelText("Answer 1")).toBeRequired();
    expect(screen.getByLabelText("Answer 2")).not.toBeRequired();
    expect(screen.getByRole("button", { name: "Submit answers" })).toBeDisabled();

    rerender(
      <InterviewForm
        session={session}
        drafts={{
          ...drafts,
          "ops-must": { text: "Front desk to billing", follow_ups: [emptyFollowUp(0)], updatedAt: 1 },
        }}
        saveState="saved"
        submitting={false}
        submitted={false}
        recordingId={null}
        recordingSeconds={0}
        transcribingId={null}
        micMessage={null}
        submitError={null}
        onChange={vi.fn()}
        onToggleRecord={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByRole("button", { name: "Submit answers" })).toBeEnabled();
  });

  it("shows the transcribing state on the active question", () => {
    render(
      <InterviewForm
        session={session}
        drafts={drafts}
        saveState="saving"
        submitting={false}
        submitted={false}
        recordingId={null}
        recordingSeconds={0}
        transcribingId="ops-must"
        micMessage={null}
        submitError={null}
        onChange={vi.fn()}
        onToggleRecord={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );
    expect(screen.getByText("Transcribing…")).toBeTruthy();
  });
});
