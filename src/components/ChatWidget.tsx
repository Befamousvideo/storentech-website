"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { BOOKING_CTA_HREF } from "@/lib/site";

type Turn = {
  role: "user" | "assistant";
  content: string;
};

const MAX_TURNS = 12;

export function ChatWidget() {
  const titleId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const [note, setNote] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailNote, setEmailNote] = useState("");
  const [emailPending, setEmailPending] = useState(false);

  const userTurns = turns.filter((turn) => turn.role === "user").length;
  const closed = userTurns >= MAX_TURNS;

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function onAsk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || pending || closed) return;

    const history = [...turns, { role: "user" as const, content }];
    setTurns(history);
    setDraft("");
    setPending(true);
    setNote("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const payload = (await response.json()) as { ok?: boolean; reply?: string; error?: string };
      const replyText = payload.reply;
      if (!response.ok || !payload.ok || !replyText) {
        throw new Error(payload.error || "Chat is unavailable.");
      }
      setTurns((current) => [...current, { role: "assistant", content: replyText }]);
    } catch (error) {
      setNote(
        error instanceof Error && error.message
          ? error.message
          : "Chat is unavailable. You can book a free 15-minute intro call or leave your email.",
      );
    } finally {
      setPending(false);
    }
  }

  async function onEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") ?? "").trim()) {
      setEmailNote("Received. A StorenTech specialist will reply.");
      form.reset();
      return;
    }

    setEmailPending(true);
    setEmailNote("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          broken: `Website chat. ${String(data.get("broken") ?? "").trim()}`,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean };
      if (!response.ok || !payload.ok) {
        throw new Error("Could not send.");
      }
      setEmailNote("Received. A StorenTech specialist will reply.");
      form.reset();
    } catch {
      setEmailNote("The note did not send. Book a free 15-minute intro call, or try again.");
    } finally {
      setEmailPending(false);
    }
  }

  return (
    <div className="chat-widget">
      {open ? (
        <section
          className="chat-panel"
          id="chat-widget-panel"
          role="dialog"
          aria-labelledby={titleId}
        >
          <p className="chat-kicker" id={titleId}>
            Ask StorenTech
          </p>
          <p className="chat-lede">
            Published answers only. The 15-minute intro call is free. The AI Opportunity Map is paid.
          </p>

          <div className="chat-log" aria-live="polite">
            {turns.map((turn, index) => (
              <p key={`${turn.role}-${index}`} className={turn.role === "user" ? "chat-user" : "chat-assistant"}>
                {turn.content}
              </p>
            ))}
            {pending ? <p className="chat-assistant">One moment.</p> : null}
          </div>

          {note ? (
            <p className="chat-status" role="status">
              {note}
            </p>
          ) : null}

          <form className="chat-compose" onSubmit={onAsk}>
            <label className="chat-label" htmlFor="chat-question">
              Question
            </label>
            <textarea
              id="chat-question"
              ref={inputRef}
              value={draft}
              maxLength={500}
              rows={2}
              disabled={pending || closed}
              placeholder={closed ? "Book a time or leave your email" : "Ask about the work"}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <button className="chat-send" type="submit" disabled={pending || closed || !draft.trim()}>
              {pending ? "Sending" : "Send"}
            </button>
          </form>

          <div className="chat-actions">
            <a href={BOOKING_CTA_HREF} target="_blank" rel="noopener noreferrer">
              Book a free 15-minute intro call
            </a>
            <button type="button" onClick={() => setEmailOpen((value) => !value)}>
              Leave your email
            </button>
          </div>

          {emailOpen ? (
            <form className="chat-email" onSubmit={onEmail}>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="chat-company-website">Company website</label>
                <input id="chat-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="chat-label" htmlFor="chat-name">
                Name
              </label>
              <input id="chat-name" name="name" required autoComplete="name" maxLength={200} />
              <label className="chat-label" htmlFor="chat-email">
                Email
              </label>
              <input id="chat-email" name="email" type="email" required autoComplete="email" maxLength={200} />
              <label className="chat-label" htmlFor="chat-company">
                Company
              </label>
              <input id="chat-company" name="company" required autoComplete="organization" maxLength={200} />
              <label className="chat-label" htmlFor="chat-broken">
                What should we know
              </label>
              <textarea id="chat-broken" name="broken" required maxLength={2000} rows={2} />
              <button className="chat-send" type="submit" disabled={emailPending}>
                {emailPending ? "Sending" : "Send note"}
              </button>
              {emailNote ? (
                <p className="chat-status" role="status">
                  {emailNote}
                </p>
              ) : null}
            </form>
          ) : null}
        </section>
      ) : null}

      <button
        type="button"
        className="chat-launcher"
        aria-expanded={open}
        aria-controls="chat-widget-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Ask"}
      </button>
    </div>
  );
}
