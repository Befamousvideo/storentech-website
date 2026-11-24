"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IntakeLink } from "@/components/IntakeLink";
import { InterviewLink } from "@/components/InterviewLink";
import styles from "@/components/FaqHelper.module.css";
import { PUBLIC_AI_CHAT_ENABLED } from "@/lib/chat/public-flag";
import { answerFaqQuery, type FaqHelperResponse } from "@/lib/faq-helper";
import { offer } from "@/lib/site";

const SUGGESTIONS = [
  "What is an AI Opportunity Map?",
  "How does working with you start?",
  "How much is the map?",
] as const;

type Turn = {
  role: "user" | "helper";
  text: string;
  reply?: FaqHelperResponse;
  pending?: boolean;
};

type ChatApiPayload = {
  ok?: boolean;
  text?: string;
  intent?: FaqHelperResponse["intent"] | "ai";
  entryId?: string | null;
  knowledgeVersion?: string;
  sources?: FaqHelperResponse["sources"];
  matched?: boolean;
  showHandoff?: boolean;
  error?: string;
};

export function FaqHelper() {
  const panelId = useId();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const wasOpen = useRef(false);

  function closePanel() {
    setOpen(false);
  }

  function openPanel() {
    setOpen(true);
  }

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [open, turns]);

  function localReply(question: string): FaqHelperResponse {
    return answerFaqQuery(question);
  }

  async function remoteReply(
    question: string,
    history: Turn[],
  ): Promise<FaqHelperResponse> {
    const messages = [
      ...history
        .filter((turn) => !turn.pending)
        .map((turn) => ({
          role: turn.role === "user" ? "user" : "assistant",
          content: turn.text,
        })),
      { role: "user", content: question },
    ];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const payload = (await response.json()) as ChatApiPayload;
    if (!response.ok || !payload.ok || !payload.text) {
      throw new Error(payload.error || "unavailable");
    }
    return {
      intent: payload.intent === "ai" ? "faq" : (payload.intent ?? "unknown"),
      text: payload.text,
      entryId: payload.entryId ?? null,
      entryVersion: null,
      knowledgeVersion:
        payload.knowledgeVersion ?? localReply(question).knowledgeVersion,
      sources: payload.sources ?? [],
      showHandoff: payload.showHandoff ?? true,
      matched: payload.matched ?? false,
    };
  }

  async function ask(question: string) {
    const text = question.trim();
    if (!text || pending) return;
    setDraft("");
    const userTurn: Turn = { role: "user", text };
    setTurns((current) => [...current, userTurn]);

    if (!PUBLIC_AI_CHAT_ENABLED) {
      const reply = localReply(text);
      setTurns((current) => [
        ...current,
        { role: "helper", text: reply.text, reply },
      ]);
      return;
    }

    setPending(true);
    setTurns((current) => [
      ...current,
      { role: "helper", text: "One moment.", pending: true },
    ]);
    try {
      const history = turns;
      const reply = await remoteReply(text, history);
      setTurns((current) => [
        ...current.filter((turn) => !turn.pending),
        { role: "helper", text: reply.text, reply },
      ]);
    } catch {
      const reply = localReply(text);
      setTurns((current) => [
        ...current.filter((turn) => !turn.pending),
        { role: "helper", text: reply.text, reply },
      ]);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(draft);
  }

  return (
    <div className={styles.root}>
      {open ? (
        <section
          id={panelId}
          className={styles.panel}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <div className={styles.header}>
            <div>
              <h2 id={titleId} className={styles.title}>
                FAQ assistance
              </h2>
              <p className={styles.disclaimer}>
                {PUBLIC_AI_CHAT_ENABLED
                  ? "Grounded on reviewed StorenTech website facts. Cannot book appointments or take payments. If it is unknown, it stays unknown."
                  : "Reviewed website facts only. Not live generative AI. Cannot book appointments or take payments."}
              </p>
            </div>
            <button
              ref={closeRef}
              className={styles.close}
              type="button"
              aria-label="Close FAQ assistance"
              onClick={closePanel}
            >
              ×
            </button>
          </div>

          <div ref={logRef} className={styles.log} aria-live="polite">
            {turns.length === 0 ? (
              <div className={styles.empty}>
                Ask a service or process question. Unknowns stay unknown.
                <div className={styles.suggestions}>
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      className={styles.chip}
                      type="button"
                      disabled={pending}
                      onClick={() => ask(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              turns.map((turn, index) => (
                <div
                  key={`${turn.role}-${index}`}
                  className={`${styles.turn} ${
                    turn.role === "user" ? styles.turnUser : styles.turnHelper
                  }`}
                >
                  <span className={styles.turnLabel}>
                    {turn.role === "user" ? "You" : "FAQ assistance"}
                  </span>
                  <p>{turn.text}</p>
                  {turn.reply?.matched && turn.reply.sources[0] ? (
                    <p className={styles.source}>
                      Source: {turn.reply.sources.map((item) => item.label).join(", ")}{" "}
                      · {turn.reply.knowledgeVersion}
                    </p>
                  ) : null}
                </div>
              ))
            )}
          </div>

          <div className={styles.footer}>
            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.srOnly} htmlFor={`${panelId}-q`}>
                Question
              </label>
              <input
                id={`${panelId}-q`}
                className={styles.input}
                value={draft}
                maxLength={500}
                autoComplete="off"
                disabled={pending}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about services or process"
              />
              <button className={styles.submit} type="submit" disabled={pending}>
                {pending ? "Sending" : "Ask"}
              </button>
            </form>
            <div className={styles.handoffs}>
              <InterviewLink className={`btn btn-solid ${styles.handoff}`}>
                {offer.interviewCta}
              </InterviewLink>
              <IntakeLink className={`btn ${styles.handoff}`}>
                {offer.bookingCta}
              </IntakeLink>
            </div>
          </div>
        </section>
      ) : null}

      {open ? null : (
        <button
          ref={launcherRef}
          className={styles.launcher}
          type="button"
          aria-expanded={false}
          aria-controls={panelId}
          onClick={openPanel}
        >
          FAQ help
        </button>
      )}
    </div>
  );
}
