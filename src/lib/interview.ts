import type { InterviewRole } from "@/lib/interview-paths";

export type QuestionTag = "must" | "if_time";

export type InterviewQuestion = {
  id: string;
  text: string;
  tag: QuestionTag;
  follow_ups: boolean;
};

export type FollowUpRow = {
  row_index: number;
  task_name: string;
  how_often: string;
  how_long: string;
  who_role: string;
};

export type SavedAnswer = {
  text: string;
  updated_at?: string;
  follow_ups: FollowUpRow[];
};

export type InterviewSession = {
  role: InterviewRole;
  company_label: string;
  role_title: string;
  intro: string;
  questions: InterviewQuestion[];
  answers: Record<string, SavedAnswer>;
  status: "in_progress" | "complete" | "closed";
};

export function isClosedStatus(status: InterviewSession["status"] | undefined): boolean {
  return status === "complete" || status === "closed";
}

export type DraftAnswer = {
  text: string;
  follow_ups: FollowUpRow[];
  updatedAt: number;
};

export type DraftMap = Record<string, DraftAnswer>;

export const HOW_OFTEN_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "few_times_a_week", label: "A few times a week" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "other", label: "Other" },
] as const;

export const KEY_HEADER = "X-Interview-Key";
export const KEY_STORAGE = "interview-access-key";
const DRAFT_PREFIX = "interview-draft:";
const SESSION_PREFIX = "interview-session:";

export function interviewApiBase(): string {
  return (process.env.NEXT_PUBLIC_INTERVIEW_API ?? "").trim().replace(/\/$/, "");
}

export function draftStorageKey(role: InterviewRole): string {
  return `${DRAFT_PREFIX}${role}`;
}

export function emptyFollowUp(rowIndex: number): FollowUpRow {
  return {
    row_index: rowIndex,
    task_name: "",
    how_often: "",
    how_long: "",
    who_role: "",
  };
}

export function emptyDraft(question: InterviewQuestion): DraftAnswer {
  return {
    text: "",
    follow_ups: question.follow_ups ? [emptyFollowUp(0)] : [],
    updatedAt: 0,
  };
}

export function answersFromSession(session: InterviewSession): DraftMap {
  const next: DraftMap = {};
  for (const question of session.questions) {
    const saved = session.answers[question.id];
    if (!saved) {
      next[question.id] = emptyDraft(question);
      continue;
    }
    next[question.id] = {
      text: saved.text ?? "",
      follow_ups:
        question.follow_ups
          ? saved.follow_ups.length > 0
            ? saved.follow_ups
            : [emptyFollowUp(0)]
          : [],
      updatedAt: saved.updated_at ? Date.parse(saved.updated_at) || 0 : 0,
    };
  }
  return next;
}

export function mergeDrafts(session: InterviewSession, local: DraftMap | null): DraftMap {
  const server = answersFromSession(session);
  if (!local) return server;
  const merged = { ...server };
  for (const question of session.questions) {
    const localAnswer = local[question.id];
    if (!localAnswer) continue;
    if ((localAnswer.updatedAt || 0) >= (server[question.id]?.updatedAt || 0)) {
      merged[question.id] = localAnswer;
    }
  }
  return merged;
}

export function requiredAnswered(session: InterviewSession, drafts: DraftMap): number {
  return session.questions.filter(
    (question) => question.tag === "must" && drafts[question.id]?.text.trim(),
  ).length;
}

export function requiredTotal(session: InterviewSession): number {
  return session.questions.filter((question) => question.tag === "must").length;
}

export function canSubmit(session: InterviewSession, drafts: DraftMap): boolean {
  return requiredAnswered(session, drafts) === requiredTotal(session);
}

export function appendTranscript(existing: string, incoming: string): string {
  const next = incoming.trim();
  if (!next) return existing;
  const current = existing.trim();
  if (!current) return next;
  return `${current}\n\n${next}`;
}

export function captureFragmentKey(): string | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash || "";
  const match = raw.match(/(?:^|#|&)k=([^&]+)/);
  if (!match) {
    return sessionStorage.getItem(KEY_STORAGE);
  }
  const key = decodeURIComponent(match[1] ?? "").trim();
  if (key) {
    sessionStorage.setItem(KEY_STORAGE, key);
  }
  const url = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", url);
  return key || sessionStorage.getItem(KEY_STORAGE);
}

export function readLocalDraft(role: InterviewRole): DraftMap | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(draftStorageKey(role));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftMap;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function writeLocalDraft(role: InterviewRole, drafts: DraftMap): void {
  localStorage.setItem(draftStorageKey(role), JSON.stringify(drafts));
}

export function clearLocalDraft(role: InterviewRole): void {
  localStorage.removeItem(draftStorageKey(role));
  localStorage.removeItem(`${SESSION_PREFIX}${role}`);
}

export function readLocalSession(role: InterviewRole): InterviewSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${SESSION_PREFIX}${role}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as InterviewSession;
    if (!parsed || typeof parsed !== "object") return null;
    if (isClosedStatus(parsed.status)) return parsed;
    if (!parsed.questions?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeLocalSession(role: InterviewRole, session: InterviewSession): void {
  localStorage.setItem(
    `${SESSION_PREFIX}${role}`,
    JSON.stringify({
      role: session.role,
      company_label: session.company_label,
      role_title: session.role_title,
      intro: session.intro,
      questions: session.questions,
      answers: {},
      status: session.status,
    }),
  );
}

export function pickRecorderMimeType(): string {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) {
    return "";
  }
  const candidates = [
    "audio/mp4",
    "audio/mp4;codecs=mp4a.40.2",
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

export async function interviewFetch(
  path: string,
  key: string,
  init: RequestInit = {},
): Promise<Response> {
  const base = interviewApiBase();
  if (!base) {
    throw new Error("offline");
  }
  const headers = new Headers(init.headers);
  headers.set(KEY_HEADER, key);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${base}${path}`, {
    ...init,
    headers,
    referrerPolicy: "no-referrer",
  });
}

export function extensionForMime(mime: string): string {
  if (mime.includes("mp4") || mime.includes("m4a") || mime.includes("aac")) return "mp4";
  if (mime.includes("ogg")) return "ogg";
  if (mime.includes("wav")) return "wav";
  return "webm";
}
