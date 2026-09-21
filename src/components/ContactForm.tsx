"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") ?? "").trim()) {
      setStatus("ok");
      setMessage("Received. We will reply from the office.");
      form.reset();
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          broken: data.get("broken"),
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Could not send.");
      }

      setStatus("ok");
      setMessage("Received. We will reply from the office — this is the start of a paid analysis, not a complimentary audit.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        `The form did not send. Call ${site.phones.sarah.label} at ${site.phones.sarah.display} or write ${site.emails.support}.`,
      );
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" required autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="broken">What’s broken</label>
        <textarea
          id="broken"
          name="broken"
          required
          placeholder="Where money, time, or conversations leak. The analysis is paid; this form is how it starts."
        />
      </div>
      <button className="btn btn-solid" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : "Start the paid analysis"}
      </button>
      {message ? (
        <p className={`form-status${status === "ok" ? " ok" : ""}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
