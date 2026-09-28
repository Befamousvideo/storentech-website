"use client";

import { useMemo } from "react";
import {
  HOW_OFTEN_OPTIONS,
  canSubmit,
  requiredAnswered,
  requiredTotal,
  type DraftAnswer,
  type DraftMap,
  type FollowUpRow,
  type InterviewQuestion,
  type InterviewSession,
} from "@/lib/interview";

type SaveState = "idle" | "saving" | "saved" | "offline";

type Props = {
  session: InterviewSession;
  drafts: DraftMap;
  saveState: SaveState;
  submitting: boolean;
  submitted: boolean;
  recordingId: string | null;
  recordingSeconds: number;
  transcribingId: string | null;
  micMessage: string | null;
  submitError: string | null;
  onChange: (questionId: string, draft: DraftAnswer) => void;
  onToggleRecord: (questionId: string) => void;
  onSubmit: () => void;
};

function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function updateFollowUp(rows: FollowUpRow[], index: number, patch: Partial<FollowUpRow>): FollowUpRow[] {
  return rows.map((row) => (row.row_index === index ? { ...row, ...patch } : row));
}

export function InterviewForm({
  session,
  drafts,
  saveState,
  submitting,
  submitted,
  recordingId,
  recordingSeconds,
  transcribingId,
  micMessage,
  submitError,
  onChange,
  onToggleRecord,
  onSubmit,
}: Props) {
  const requiredDone = requiredAnswered(session, drafts);
  const requiredCount = requiredTotal(session);
  const answeredAny = session.questions.filter((question) => drafts[question.id]?.text.trim()).length;
  const ready = useMemo(() => canSubmit(session, drafts), [session, drafts]);

  return (
    <div className="interview-form">
      <header className="interview-heading">
        <p className="kicker">{session.company_label}</p>
        <h1>{session.role_title}</h1>
        <hr className="rule" />
        <p className="lede">{session.intro}</p>
      </header>

      <div className="interview-progress" aria-live="polite">
        <div
          className="interview-progress-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={requiredCount || 1}
          aria-valuenow={requiredDone}
          aria-label="Required questions answered"
        >
          <span style={{ width: `${requiredCount ? (requiredDone / requiredCount) * 100 : 0}%` }} />
        </div>
        <p className="fine">
          {requiredDone} of {requiredCount} required answered
          {answeredAny - requiredDone > 0 ? ` · ${answeredAny - requiredDone} optional started` : ""}
        </p>
        <p className="interview-save-state" data-state={saveState}>
          {saveState === "saving"
            ? "Saving…"
            : saveState === "saved"
              ? "Saved"
              : saveState === "offline"
                ? "Couldn’t reach the server. Your draft is safe on this device — try again in a moment."
                : ""}
        </p>
      </div>

      {session.questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          index={index}
          total={session.questions.length}
          question={question}
          draft={drafts[question.id]}
          recording={recordingId === question.id}
          recordingSeconds={recordingId === question.id ? recordingSeconds : 0}
          transcribing={transcribingId === question.id}
          onChange={(draft) => onChange(question.id, draft)}
          onToggleRecord={() => onToggleRecord(question.id)}
        />
      ))}

      {micMessage ? (
        <p className="interview-note" role="status">
          {micMessage}
        </p>
      ) : null}

      {submitted ? (
        <p className="interview-thanks" role="status">
          Thank you. Your answers are saved. You can close this page.
        </p>
      ) : (
        <div className="interview-submit">
          <button
            className="btn btn-solid"
            type="button"
            onClick={onSubmit}
            disabled={!ready || submitting}
          >
            {submitting ? "Submitting" : "Submit answers"}
          </button>
          {!ready ? (
            <p className="fine">Required questions need a written answer before you submit.</p>
          ) : null}
          {submitError ? (
            <p className="interview-note" role="alert">
              {submitError}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

function QuestionCard({
  index,
  total,
  question,
  draft,
  recording,
  recordingSeconds,
  transcribing,
  onChange,
  onToggleRecord,
}: {
  index: number;
  total: number;
  question: InterviewQuestion;
  draft: DraftAnswer | undefined;
  recording: boolean;
  recordingSeconds: number;
  transcribing: boolean;
  onChange: (draft: DraftAnswer) => void;
  onToggleRecord: () => void;
}) {
  const current: DraftAnswer = draft ?? {
    text: "",
    follow_ups: question.follow_ups ? [{ row_index: 0, task_name: "", how_often: "", how_long: "", who_role: "" }] : [],
    updatedAt: 0,
  };

  return (
    <section className="interview-question" aria-labelledby={`${question.id}-label`}>
      <div className="interview-question-meta">
        <span className="fine">
          {index + 1} of {total}
        </span>
        <span className={`interview-tag interview-tag-${question.tag}`}>
          {question.tag === "must" ? "Required" : "If time"}
        </span>
      </div>
      <h2 id={`${question.id}-label`}>{question.text}</h2>
      <div className="field">
        <label className="sr-only" htmlFor={`${question.id}-text`}>
          Answer {index + 1}
        </label>
        <textarea
          id={`${question.id}-text`}
          value={current.text}
          required={question.tag === "must"}
          onChange={(event) =>
            onChange({
              ...current,
              text: event.target.value,
              updatedAt: Date.now(),
            })
          }
        />
      </div>
      <div className="interview-mic-row">
        <button
          className={`interview-mic${recording ? " is-recording" : ""}`}
          type="button"
          aria-pressed={recording}
          aria-label={recording ? "Stop recording" : "Record an answer"}
          onClick={onToggleRecord}
          disabled={transcribing}
        >
          {recording ? "Stop" : "Mic"}
        </button>
        {recording ? <span className="fine">{formatTimer(recordingSeconds)}</span> : null}
        {transcribing ? (
          <span className="fine" aria-live="polite">
            Transcribing…
          </span>
        ) : null}
      </div>

      {question.follow_ups ? (
        <div className="interview-followups">
          {current.follow_ups.map((row) => (
            <div className="interview-followup" key={`${question.id}-${row.row_index}`}>
              {row.row_index > 0 ? (
                <div className="field">
                  <label htmlFor={`${question.id}-task-${row.row_index}`}>Task name</label>
                  <input
                    id={`${question.id}-task-${row.row_index}`}
                    value={row.task_name}
                    onChange={(event) =>
                      onChange({
                        ...current,
                        follow_ups: updateFollowUp(current.follow_ups, row.row_index, {
                          task_name: event.target.value,
                        }),
                        updatedAt: Date.now(),
                      })
                    }
                  />
                </div>
              ) : null}
              <div className="interview-followup-grid">
                <div className="field">
                  <label htmlFor={`${question.id}-often-${row.row_index}`}>How often?</label>
                  <select
                    id={`${question.id}-often-${row.row_index}`}
                    value={row.how_often}
                    onChange={(event) =>
                      onChange({
                        ...current,
                        follow_ups: updateFollowUp(current.follow_ups, row.row_index, {
                          how_often: event.target.value,
                        }),
                        updatedAt: Date.now(),
                      })
                    }
                  >
                    <option value="">Choose one</option>
                    {HOW_OFTEN_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor={`${question.id}-long-${row.row_index}`}>About how long each time?</label>
                  <input
                    id={`${question.id}-long-${row.row_index}`}
                    value={row.how_long}
                    onChange={(event) =>
                      onChange({
                        ...current,
                        follow_ups: updateFollowUp(current.follow_ups, row.row_index, {
                          how_long: event.target.value,
                        }),
                        updatedAt: Date.now(),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor={`${question.id}-who-${row.row_index}`}>Who usually does it?</label>
                  <input
                    id={`${question.id}-who-${row.row_index}`}
                    value={row.who_role}
                    placeholder="Role"
                    onChange={(event) =>
                      onChange({
                        ...current,
                        follow_ups: updateFollowUp(current.follow_ups, row.row_index, {
                          who_role: event.target.value,
                        }),
                        updatedAt: Date.now(),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn"
            type="button"
            onClick={() =>
              onChange({
                ...current,
                follow_ups: [
                  ...current.follow_ups,
                  {
                    row_index: current.follow_ups.length,
                    task_name: "",
                    how_often: "",
                    how_long: "",
                    who_role: "",
                  },
                ],
                updatedAt: Date.now(),
              })
            }
          >
            + Add another task
          </button>
        </div>
      ) : null}
    </section>
  );
}
