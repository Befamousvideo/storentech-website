import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  appendTranscript,
  canSubmit,
  captureFragmentKey,
  emptyFollowUp,
  isClosedStatus,
  mergeDrafts,
  readLocalSession,
  requiredAnswered,
  writeLocalSession,
  type InterviewSession,
} from "@/lib/interview";

const session: InterviewSession = {
  role: "ceo",
  company_label: "Company 111",
  role_title: "CEO",
  intro: "Intro",
  status: "in_progress",
  answers: {},
  questions: [
    { id: "q1", text: "Must-answer item A", tag: "must", follow_ups: true },
    { id: "q2", text: "Must-answer item B", tag: "must", follow_ups: false },
    { id: "q3", text: "Wishlist", tag: "if_time", follow_ups: false },
  ],
};

describe("interview helpers", () => {
  it("treats complete and closed as finished interviews", () => {
    expect(isClosedStatus("complete")).toBe(true);
    expect(isClosedStatus("closed")).toBe(true);
    expect(isClosedStatus("in_progress")).toBe(false);
  });

  it("restores a closed session even when questions were cleared", () => {
    localStorage.clear();
    writeLocalSession("ceo", {
      ...session,
      status: "complete",
      intro: "",
      questions: [],
      answers: {},
    });
    const cached = readLocalSession("ceo");
    expect(cached?.status).toBe("complete");
    expect(cached?.questions).toEqual([]);
  });

  it("requires every MUST answer before submit", () => {
    const drafts = {
      q1: { text: "yes", follow_ups: [emptyFollowUp(0)], updatedAt: 1 },
      q2: { text: "", follow_ups: [], updatedAt: 1 },
      q3: { text: "", follow_ups: [], updatedAt: 1 },
    };
    expect(canSubmit(session, drafts)).toBe(false);
    drafts.q2 = { text: "also yes", follow_ups: [], updatedAt: 2 };
    expect(canSubmit(session, drafts)).toBe(true);
    expect(requiredAnswered(session, drafts)).toBe(2);
  });

  it("appends a transcript when the box already has text", () => {
    expect(appendTranscript("", "hello")).toBe("hello");
    expect(appendTranscript("hello", "more")).toBe("hello\n\nmore");
  });

  it("prefers a newer local draft over the server copy", () => {
    const loaded: InterviewSession = {
      ...session,
      answers: {
        q1: { text: "server", updated_at: "2020-01-01T00:00:00.000Z", follow_ups: [] },
      },
    };
    const merged = mergeDrafts(loaded, {
      q1: { text: "local", follow_ups: [emptyFollowUp(0)], updatedAt: Date.parse("2024-01-01T00:00:00.000Z") },
    });
    expect(merged.q1.text).toBe("local");
  });

  it("reads the fragment key and strips it from the address bar", () => {
    sessionStorage.clear();
    window.history.replaceState(null, "", "/ceo#k=secret-token");
    expect(captureFragmentKey()).toBe("secret-token");
    expect(window.location.hash).toBe("");
    expect(sessionStorage.getItem("interview-access-key")).toBe("secret-token");
    expect(captureFragmentKey()).toBe("secret-token");
  });

  it("keeps example question text out of the Next.js interview sources", () => {
    const example = readFileSync(
      join(process.cwd(), "services/exec-interview/questions.example.json"),
      "utf8",
    );
    const unique = [
      "Which weekly meeting at your facility takes the most time, and what is it for?",
      "Which report for your facility do you rebuild most often?",
      "Which handoff between people at your facility breaks down most often?",
    ];
    expect(example).toContain("your AI Chief of Staff");
    const banned = new RegExp(
      [
        `${["rest", "aurant"].join("")}s?`,
        ["kit", "chen"].join(""),
        ["irv", "ine"].join(""),
        ["orange", " county"].join(""),
        ["red", " o"].join(""),
      ].join("|"),
      "i",
    );
    expect(example).not.toMatch(banned);
    for (const phrase of unique) {
      expect(example).toContain(phrase);
    }
    const sources = [
      "src/components/interview/InterviewApp.tsx",
      "src/components/interview/InterviewForm.tsx",
      "src/lib/interview.ts",
      "src/app/(interview)/ceo/page.tsx",
      "src/app/(interview)/cfo/page.tsx",
      "src/app/(interview)/ops/page.tsx",
    ];
    const featureSources = [
      ...sources,
      "src/lib/interview.test.ts",
      "src/components/interview/ClosedInterview.tsx",
      "services/exec-interview/DEPLOY.md",
      "services/exec-interview/questions.schema.json",
    ];
    for (const file of featureSources) {
      expect(readFileSync(join(process.cwd(), file), "utf8")).not.toMatch(banned);
    }
    for (const file of sources) {
      const text = readFileSync(join(process.cwd(), file), "utf8");
      for (const phrase of unique) {
        expect(text).not.toContain(phrase);
      }
      expect(text).not.toMatch(/questions\.example\.json/);
    }
  });
});
