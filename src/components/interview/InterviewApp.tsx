"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ClosedInterview } from "@/components/interview/ClosedInterview";
import { InterviewForm } from "@/components/interview/InterviewForm";
import {
  appendTranscript,
  captureFragmentKey,
  clearLocalDraft,
  isClosedStatus,
  extensionForMime,
  interviewApiBase,
  interviewFetch,
  KEY_STORAGE,
  mergeDrafts,
  pickRecorderMimeType,
  readLocalDraft,
  readLocalSession,
  writeLocalDraft,
  writeLocalSession,
  type DraftAnswer,
  type DraftMap,
  type InterviewSession,
} from "@/lib/interview";
import type { InterviewRole } from "@/lib/interview-paths";

type Gate = "boot" | "locked" | "offline" | "ready";
type SaveState = "idle" | "saving" | "saved" | "offline";

const LOCKED_COPY = "Please use the private link you were sent.";
const THANKS_COPY = "Thank you. Your answers are saved. You can close this page.";
const CLOSED_COPY = "This interview is closed. Thank you.";

export function InterviewApp({ role }: { role: InterviewRole }) {
  const [gate, setGate] = useState<Gate>("boot");
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [drafts, setDrafts] = useState<DraftMap>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcribingId, setTranscribingId] = useState<string | null>(null);
  const [micMessage, setMicMessage] = useState<string | null>(null);

  const keyRef = useRef<string | null>(null);
  const draftsRef = useRef<DraftMap>({});
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const pendingIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    draftsRef.current = drafts;
  }, [drafts]);

  const persistRemote = useCallback(async (questionId: string, draft: DraftAnswer) => {
    const key = keyRef.current;
    if (!key) return;
    const response = await interviewFetch("/answer", key, {
      method: "PUT",
      body: JSON.stringify({
        question_id: questionId,
        text: draft.text,
        follow_ups: draft.follow_ups,
      }),
    });
    if (response.status === 409) {
      setSubmitted(true);
      return;
    }
    if (!response.ok) {
      throw new Error("save_failed");
    }
  }, []);

  const flushSaves = useCallback(async () => {
    const key = keyRef.current;
    if (!key || !interviewApiBase()) {
      setSaveState("offline");
      return;
    }
    const ids = [...pendingIds.current];
    if (ids.length === 0) return;
    setSaveState("saving");
    try {
      for (const questionId of ids) {
        const draft = draftsRef.current[questionId];
        if (!draft) continue;
        await persistRemote(questionId, draft);
        pendingIds.current.delete(questionId);
      }
      setSaveState("saved");
    } catch {
      setSaveState("offline");
    }
  }, [persistRemote]);

  const queueSave = useCallback(
    (questionId: string) => {
      pendingIds.current.add(questionId);
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = window.setTimeout(() => {
        void flushSaves();
      }, 800);
    },
    [flushSaves],
  );

  const handleChange = useCallback(
    (questionId: string, draft: DraftAnswer) => {
      setDrafts((current) => {
        const next = { ...current, [questionId]: draft };
        writeLocalDraft(role, next);
        return next;
      });
      queueSave(questionId);
    },
    [queueSave, role],
  );

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const uploadRecording = useCallback(
    async (questionId: string, blob: Blob, mimeType: string) => {
      const key = keyRef.current;
      if (!key) return;
      setTranscribingId(questionId);
      setMicMessage(null);
      try {
        const form = new FormData();
        form.append("question_id", questionId);
        form.append("file", blob, `answer.${extensionForMime(mimeType)}`);
        const response = await interviewFetch("/transcribe", key, {
          method: "POST",
          body: form,
        });
        if (response.status === 409) {
          setSubmitted(true);
          return;
        }
        if (!response.ok) {
          throw new Error("transcribe_failed");
        }
        const payload = (await response.json()) as { text?: string };
        const incoming = payload.text ?? "";
        const current = draftsRef.current[questionId];
        handleChange(questionId, {
          text: appendTranscript(current?.text ?? "", incoming),
          follow_ups: current?.follow_ups ?? [],
          updatedAt: Date.now(),
        });
      } catch {
        setSaveState("offline");
        setMicMessage("We could not transcribe that recording. Your typed draft is still here.");
      } finally {
        setTranscribingId(null);
      }
    },
    [handleChange],
  );

  const startRecording = useCallback(
    async (questionId: string) => {
      setMicMessage(null);
      if (typeof MediaRecorder === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setMicMessage("This browser cannot record audio. Please type your answer.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const mimeType = pickRecorderMimeType();
        const recorder = mimeType
          ? new MediaRecorder(stream, { mimeType })
          : new MediaRecorder(stream);
        chunksRef.current = [];
        recorderRef.current = recorder;
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) chunksRef.current.push(event.data);
        };
        recorder.onstop = () => {
          const type = recorder.mimeType || mimeType || "audio/webm";
          const blob = new Blob(chunksRef.current, { type });
          chunksRef.current = [];
          stopTracks();
          setRecordingId(null);
          if (blob.size > 0) {
            void uploadRecording(questionId, blob, type);
          }
        };
        recorder.start();
        setRecordingSeconds(0);
        setRecordingId(questionId);
        timerRef.current = window.setInterval(() => {
          setRecordingSeconds((value) => value + 1);
        }, 1000);
      } catch (error) {
        stopTracks();
        const denied =
          error instanceof DOMException &&
          (error.name === "NotAllowedError" || error.name === "SecurityError");
        setMicMessage(
          denied
            ? "Microphone access was declined. You can type your answer instead."
            : "The microphone is not available. You can type your answer instead.",
        );
      }
    },
    [stopTracks, uploadRecording],
  );

  const toggleRecord = useCallback(
    (questionId: string) => {
      const active = recorderRef.current;
      if (recordingId && active && active.state !== "inactive") {
        active.stop();
        recorderRef.current = null;
        return;
      }
      void startRecording(questionId);
    },
    [recordingId, startRecording],
  );

  const handleSubmit = useCallback(async () => {
    const key = keyRef.current;
    if (!key) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await flushSaves();
      const response = await interviewFetch("/submit", key, { method: "POST" });
      if (response.status === 409) {
        clearLocalDraft(role);
        setSession((current) =>
          current
            ? { ...current, status: "closed", questions: [], answers: {}, intro: "" }
            : current,
        );
        setSubmitted(true);
        return;
      }
      if (!response.ok) {
        throw new Error("submit_failed");
      }
      clearLocalDraft(role);
      setSession((current) =>
        current
          ? { ...current, status: "complete", questions: [], answers: {}, intro: "" }
          : current,
      );
      setSubmitted(true);
      setSaveState("saved");
    } catch {
      setSaveState("offline");
      setSubmitError(
        "Couldn’t reach the server. Your draft is safe on this device — try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }, [flushSaves, role]);

  useEffect(() => {
    const key = captureFragmentKey();
    keyRef.current = key;
    if (!key) {
      setGate("locked");
      return;
    }

    let cancelled = false;
    async function load() {
      try {
        const response = await interviewFetch("/session", key as string);
        if (response.status === 401) {
          sessionStorage.removeItem(KEY_STORAGE);
          if (!cancelled) setGate("locked");
          return;
        }
        if (!response.ok) {
          throw new Error("session_failed");
        }
        const payload = (await response.json()) as InterviewSession;
        if (payload.role !== role) {
          if (!cancelled) setGate("locked");
          return;
        }
        if (!cancelled) {
          if (isClosedStatus(payload.status)) {
            clearLocalDraft(role);
            writeLocalSession(role, { ...payload, questions: [], answers: {}, intro: "" });
            setSession(payload);
            setSubmitted(true);
            setGate("ready");
            return;
          }
          const merged = mergeDrafts(payload, readLocalDraft(role));
          writeLocalSession(role, payload);
          setSession(payload);
          setDrafts(merged);
          setSubmitted(false);
          setGate("ready");
        }
      } catch {
        const cached = readLocalSession(role);
        const local = readLocalDraft(role);
        if (!cancelled) {
          setSaveState("offline");
          if (cached) {
            setSession(cached);
            setDrafts(mergeDrafts(cached, local));
            setGate("ready");
          } else {
            setGate("offline");
          }
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [role]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
      recorderRef.current?.stop();
      stopTracks();
    };
  }, [stopTracks]);

  if (gate === "boot") {
    return (
      <div className="interview-shell">
        <p className="fine">Loading…</p>
      </div>
    );
  }

  if (gate === "offline") {
    return (
      <div className="interview-shell interview-locked">
        <p className="kicker">Private page</p>
        <h1>Interview</h1>
        <hr className="rule" />
        <p className="lede">
          Couldn’t reach the server. Your draft is safe on this device — try again in a moment.
        </p>
      </div>
    );
  }

  if (gate === "locked" || !session) {
    return (
      <div className="interview-shell interview-locked">
        <p className="kicker">Private page</p>
        <h1>Interview</h1>
        <hr className="rule" />
        <p className="lede">{LOCKED_COPY}</p>
      </div>
    );
  }

  if (submitted || isClosedStatus(session.status)) {
    return (
      <ClosedInterview
        title={session.role_title || "Interview"}
        message={session.status === "closed" ? CLOSED_COPY : THANKS_COPY}
      />
    );
  }

  return (
    <div className="interview-shell">
      <InterviewForm
        session={session}
        drafts={drafts}
        saveState={saveState}
        submitting={submitting}
        submitted={submitted}
        recordingId={recordingId}
        recordingSeconds={recordingSeconds}
        transcribingId={transcribingId}
        micMessage={micMessage}
        submitError={submitError}
        onChange={handleChange}
        onToggleRecord={toggleRecord}
        onSubmit={() => void handleSubmit()}
      />
    </div>
  );
}
