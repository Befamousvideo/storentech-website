"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  FREE_AI_MAP_CAPTURE_LINE,
  FREE_AI_MAP_OPPORTUNITY_HREF,
  FREE_AI_MAP_PAGE_STEPS,
  FREE_AI_MAP_PATH,
  FREE_AI_MAP_PRIVACY_LINE,
  FREE_AI_MAP_PROMPT_STEPS,
  FREE_AI_MAP_SUBMIT_CTA,
  FREE_AI_MAP_THANK_YOU_CTA,
} from "@/lib/free-ai-map";

type Status = "idle" | "sending" | "ok" | "error";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function ThankYouCta() {
  const marker = "storentechai.com/opportunity";
  const index = FREE_AI_MAP_THANK_YOU_CTA.indexOf(marker);
  if (index < 0) {
    return <p className="lede">{FREE_AI_MAP_THANK_YOU_CTA}</p>;
  }
  return (
    <p className="lede">
      {FREE_AI_MAP_THANK_YOU_CTA.slice(0, index)}
      <Link href={FREE_AI_MAP_OPPORTUNITY_HREF}>{marker}</Link>
      {FREE_AI_MAP_THANK_YOU_CTA.slice(index + marker.length)}
    </p>
  );
}

export function FreeAiMapCapture() {
  const searchParams = useSearchParams();
  const utm = useMemo(() => {
    const values: Partial<Record<(typeof UTM_KEYS)[number], string>> = {};
    for (const key of UTM_KEYS) {
      const value = searchParams.get(key)?.trim();
      if (value) values[key] = value;
    }
    return values;
  }, [searchParams]);

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "ok" && prompt) {
      resultRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }
  }, [status, prompt]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") ?? "").trim()) {
      setStatus("ok");
      setMessage("");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/free-ai-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          business_type: data.get("business_type"),
          consent: data.get("consent") === "on",
          company_website: data.get("company_website"),
          source: FREE_AI_MAP_PATH.slice(1),
          utm_source: utm.utm_source ?? data.get("utm_source"),
          utm_medium: utm.utm_medium ?? data.get("utm_medium"),
          utm_campaign: utm.utm_campaign ?? data.get("utm_campaign"),
          utm_term: utm.utm_term ?? data.get("utm_term"),
          utm_content: utm.utm_content ?? data.get("utm_content"),
        }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        prompt?: string;
      };
      if (!response.ok || !payload.ok || !payload.prompt) {
        throw new Error(payload.error || "Could not complete this.");
      }
      setPrompt(payload.prompt);
      setStatus("ok");
      setCopied(false);
      track("free_ai_map_submit");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("The form did not go through. Try again.");
    }
  }

  async function copyPrompt() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (status === "ok" && prompt) {
    return (
      <div className="free-map-result" ref={resultRef}>
        <p className="kicker">How to use</p>
        <ol className="free-map-steps">
          {FREE_AI_MAP_PROMPT_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="prompt-toolbar">
          <button className="btn btn-solid" type="button" onClick={copyPrompt}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="prompt-box">
          <pre tabIndex={0}>{prompt}</pre>
        </div>
        <div className="free-map-after">
          <ThankYouCta />
        </div>
      </div>
    );
  }

  return (
    <div className="free-map-capture">
      <p className="kicker">How to use</p>
      <ol className="free-map-steps">
        {FREE_AI_MAP_PAGE_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <form className="form" onSubmit={onSubmit}>
      <p>{FREE_AI_MAP_CAPTURE_LINE}</p>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {UTM_KEYS.map((key) =>
        utm[key] ? (
          <input key={key} type="hidden" name={key} value={utm[key]} />
        ) : null,
      )}
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="field">
        <label htmlFor="business_type">Business type</label>
        <input
          id="business_type"
          name="business_type"
          required
          autoComplete="organization-title"
        />
      </div>
      <label className="field-check">
        <input id="consent" name="consent" type="checkbox" required />
        <span>
          {FREE_AI_MAP_PRIVACY_LINE}{" "}
          <Link href="/privacy">Privacy Policy</Link>
        </span>
      </label>
      <button
        className="btn btn-solid"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "One moment" : FREE_AI_MAP_SUBMIT_CTA}
      </button>
      {message ? (
        <p className="form-status" role="status">
          {message}
        </p>
      ) : null}
    </form>
    </div>
  );
}
