"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  budgetChips,
  businessTypes,
  companySizes,
  emptyAnswers,
  inferAutomations,
  isWorkEmail,
  looksLikeOrangeCounty,
  scheduleMethods,
  solutionChips,
  timelineChips,
  type IntakeAnswers,
} from "@/lib/onboarding";
import { site } from "@/lib/site";

type Step =
  | "welcome"
  | "mode"
  | "existing"
  | "identity"
  | "business"
  | "pain"
  | "inference"
  | "schedule"
  | "summary"
  | "done";

const PROGRESS: Step[] = ["welcome", "mode", "identity", "business", "pain", "inference", "schedule", "summary"];

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export function RoiInterview() {
  const [step, setStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<IntakeAnswers>(emptyAnswers);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [handoff, setHandoff] = useState("");
  const inferred = useMemo(() => inferAutomations(answers), [answers]);

  const progressIndex = Math.max(0, PROGRESS.indexOf(step === "existing" || step === "done" ? "summary" : step));
  const progress = step === "done" || step === "existing" ? 100 : Math.round((progressIndex / (PROGRESS.length - 1)) * 100);

  function patch(partial: Partial<IntakeAnswers>) {
    setAnswers((current) => ({ ...current, ...partial }));
  }

  function ocHint() {
    if (looksLikeOrangeCounty(answers.location) && !answers.scheduleMethod) {
      patch({ scheduleMethod: "in-person" });
    }
  }

  async function submit() {
    setStatus("sending");
    setHandoff("");
    try {
      const response = await fetch("/api/roi-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          inferred: {
            first: inferred.first.title,
            why: inferred.first.why,
            items: inferred.items.map((item) => item.title),
          },
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; delivered?: boolean; error?: string };
      if (!response.ok && !payload.ok) {
        throw new Error(payload.error || "Could not send.");
      }
      setStatus("ok");
      setStep("done");
      if (payload.delivered === false) {
        setHandoff(
          payload.error ||
            "Copy the summary and email vincent@storentech.com, or call the office.",
        );
      }
    } catch (error) {
      setStatus("error");
      setHandoff(error instanceof Error ? error.message : "Could not send.");
    }
  }

  const canJumpToSummary = Boolean(answers.name && answers.email && answers.company && answers.pain);

  return (
    <div className="interview">
      <div className="interview-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="fine interview-meta">About two minutes · {progress}% through</p>

      <div className="bubbles">
        {step !== "welcome" ? null : (
          <>
            <p className="bubble assistant">
              Welcome to StorenTech AI. This is the paid ROI analysis — it starts at $1,000, runs higher when the
              operation is complex, and may be credited toward implementation. If the company cannot pay, we do not
              do the work. No free audit.
            </p>
            <p className="bubble assistant">Takes about two minutes. One step at a time.</p>
          </>
        )}
        {answers.mode ? <p className="bubble user">{answers.mode === "existing" ? "Existing client" : "New prospect"}</p> : null}
        {answers.name ? (
          <p className="bubble user">
            {answers.name}
            {answers.email ? ` · ${answers.email}` : ""}
            {answers.phone ? ` · ${answers.phone}` : ""}
          </p>
        ) : null}
        {answers.company ? (
          <p className="bubble user">
            {answers.company}
            {answers.businessType ? ` · ${answers.businessType}` : ""}
            {answers.size ? ` · ${answers.size}` : ""}
            {answers.location ? ` · ${answers.location}` : ""}
          </p>
        ) : null}
        {answers.pain && step !== "pain" ? <p className="bubble user">{answers.pain}</p> : null}

        {step === "mode" ? (
          <p className="bubble assistant">Are you a new prospect, or already a client?</p>
        ) : null}
        {step === "existing" ? (
          <>
            <p className="bubble assistant">
              Existing-client login is not on the public site yet. Email the office or call the line — we will pick
              you up from there. No one-time code in this flow.
            </p>
            <p className="bubble assistant">
              Office {site.phones.office.display} · {site.emails.vincent}
            </p>
          </>
        ) : null}
        {step === "identity" ? (
          <p className="bubble assistant">Great. Name, work email, and a phone in case we need you quickly.</p>
        ) : null}
        {step === "business" ? (
          <p className="bubble assistant">Tell us about the company. Location helps us route in-person versus phone.</p>
        ) : null}
        {step === "pain" ? (
          <p className="bubble assistant">
            What repetitive work or missed revenue is hurting most right now? Optional chips after that — skip them
            if you want.
          </p>
        ) : null}
        {step === "inference" ? (
          <>
            <p className="bubble assistant">
              From what you said, these are the likely first jobs — not a quote, a working hypothesis. We would
              start with <strong>{inferred.first.title}</strong>. {inferred.first.why}
            </p>
            <ul className="infer-list">
              {inferred.items.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.why}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {step === "schedule" ? (
          <p className="bubble assistant">
            Optional: preferred times for the paid analysis. Bookable Zoom or in-person appointments are{" "}
            {site.hours.appointments}. {site.hours.appointmentsNote} Orange County can be in person. The office
            line is {site.hours.office}. Skip if you would rather we propose times.
          </p>
        ) : null}
        {step === "summary" ? (
          <p className="bubble assistant">
            Here’s the brief. The analysis starts at $1,000. If you cannot pay, we do not do the work. Look right?
          </p>
        ) : null}
        {step === "done" ? (
          <p className="bubble assistant">
            Thanks, {firstName(answers.name)}. If the handoff reached the office, we will reply within a business
            day. Call Sarah at {site.phones.sarah.display} if you want the live voice employee while you wait.
          </p>
        ) : null}
      </div>

      <div className="composer">
        {step === "welcome" ? (
          <div className="chips">
            <button type="button" className="chip chip-solid" onClick={() => setStep("mode")}>
              Get started
            </button>
          </div>
        ) : null}

        {step === "mode" ? (
          <div className="chips">
            <button
              type="button"
              className="chip chip-solid"
              onClick={() => {
                patch({ mode: "prospect" });
                setStep("identity");
              }}
            >
              I’m new here
            </button>
            <button
              type="button"
              className="chip"
              onClick={() => {
                patch({ mode: "existing" });
                setStep("existing");
              }}
            >
              Existing client
            </button>
          </div>
        ) : null}

        {step === "existing" ? (
          <div className="chips">
            <a className="chip chip-solid" href={`tel:${site.phones.office.tel}`}>
              Call the office
            </a>
            <a className="chip" href={`mailto:${site.emails.vincent}`}>
              Email Vincent
            </a>
            <Link className="chip" href="/">
              Home
            </Link>
          </div>
        ) : null}

        {step === "identity" ? (
          <form
            className="step-form"
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              if (!isWorkEmail(answers.email)) return;
              setStep("business");
            }}
          >
            <label>
              Full name
              <input value={answers.name} onChange={(e) => patch({ name: e.target.value })} required autoComplete="name" />
            </label>
            <label>
              Work email
              <input
                type="email"
                value={answers.email}
                onChange={(e) => patch({ email: e.target.value })}
                required
                autoComplete="email"
              />
            </label>
            <label>
              Phone <span className="optional">optional</span>
              <input value={answers.phone} onChange={(e) => patch({ phone: e.target.value })} autoComplete="tel" />
            </label>
            <button className="btn btn-solid" type="submit">
              Continue
            </button>
          </form>
        ) : null}

        {step === "business" ? (
          <form
            className="step-form"
            onSubmit={(event) => {
              event.preventDefault();
              ocHint();
              setStep("pain");
            }}
          >
            <label>
              Company
              <input value={answers.company} onChange={(e) => patch({ company: e.target.value })} required />
            </label>
            <fieldset>
              <legend>Type</legend>
              <div className="chips">
                {businessTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`chip${answers.businessType === type ? " chip-on" : ""}`}
                    onClick={() => patch({ businessType: type })}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Size</legend>
              <div className="chips">
                {companySizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={`chip${answers.size === size ? " chip-on" : ""}`}
                    onClick={() => patch({ size })}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>
            <label>
              Location / service area
              <input
                value={answers.location}
                onChange={(e) => patch({ location: e.target.value })}
                placeholder="City or region — Orange County routes in-person"
              />
            </label>
            <button className="btn btn-solid" type="submit" disabled={!answers.businessType}>
              Continue
            </button>
          </form>
        ) : null}

        {step === "pain" ? (
          <form
            className="step-form"
            onSubmit={(event) => {
              event.preventDefault();
              setStep("inference");
            }}
          >
            <label>
              What’s broken
              <textarea
                value={answers.pain}
                onChange={(e) => patch({ pain: e.target.value })}
                required
                placeholder="Repetitive work, missed calls, slow follow-up, a calendar that should have been filled…"
              />
            </label>
            <fieldset>
              <legend>Interest <span className="optional">optional</span></legend>
              <div className="chips">
                {solutionChips.map((chip) => (
                  <button
                    type="button"
                    key={chip}
                    className={`chip${answers.solutions.includes(chip) ? " chip-on" : ""}`}
                    onClick={() =>
                      patch({
                        solutions: answers.solutions.includes(chip)
                          ? answers.solutions.filter((item) => item !== chip)
                          : [...answers.solutions, chip],
                      })
                    }
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Timeline <span className="optional">optional</span></legend>
              <div className="chips">
                {timelineChips.map((chip) => (
                  <button
                    type="button"
                    key={chip}
                    className={`chip${answers.timeline === chip ? " chip-on" : ""}`}
                    onClick={() => patch({ timeline: chip })}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Budget <span className="optional">optional</span></legend>
              <div className="chips">
                {budgetChips.map((chip) => (
                  <button
                    type="button"
                    key={chip}
                    className={`chip${answers.budget === chip ? " chip-on" : ""}`}
                    onClick={() => patch({ budget: chip })}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </fieldset>
            <button className="btn btn-solid" type="submit">
              Continue
            </button>
          </form>
        ) : null}

        {step === "inference" ? (
          <div className="chips">
            <button type="button" className="chip chip-solid" onClick={() => setStep("schedule")}>
              Continue
            </button>
          </div>
        ) : null}

        {step === "schedule" ? (
          <form
            className="step-form"
            onSubmit={(event) => {
              event.preventDefault();
              setStep("summary");
            }}
          >
            <fieldset>
              <legend>How to meet</legend>
              <div className="chips">
                {scheduleMethods.map((method) => (
                  <button
                    type="button"
                    key={method.id}
                    className={`chip${answers.scheduleMethod === method.id ? " chip-on" : ""}`}
                    onClick={() => patch({ scheduleMethod: method.id, skipSchedule: false })}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <label>
              Preferred times
              <textarea
                value={answers.preferredTimes}
                onChange={(e) => patch({ preferredTimes: e.target.value, skipSchedule: false })}
                placeholder="e.g. Tuesday or Thursday, 11:00 AM–2:00 PM Pacific"
              />
            </label>
            <div className="chips">
              <button className="btn btn-solid" type="submit">
                Continue
              </button>
              <button
                type="button"
                className="chip"
                onClick={() => {
                  patch({ skipSchedule: true, scheduleMethod: "", preferredTimes: "" });
                  setStep("summary");
                }}
              >
                Skip this step
              </button>
            </div>
          </form>
        ) : null}

        {step === "summary" ? (
          <div className="step-form">
            <dl className="brief">
              <div>
                <dt>Who</dt>
                <dd>
                  {answers.name} · {answers.email}
                  {answers.phone ? ` · ${answers.phone}` : ""}
                </dd>
              </div>
              <div>
                <dt>Company</dt>
                <dd>
                  {answers.company} · {answers.businessType}
                  {answers.size ? ` · ${answers.size}` : ""}
                  {answers.location ? ` · ${answers.location}` : ""}
                </dd>
              </div>
              <div>
                <dt>Pain</dt>
                <dd>{answers.pain}</dd>
              </div>
              <div>
                <dt>First job (hypothesis)</dt>
                <dd>
                  {inferred.first.title}. {inferred.first.why}
                </dd>
              </div>
              <div>
                <dt>Also likely</dt>
                <dd>{inferred.items.map((item) => item.title).join(" · ")}</dd>
              </div>
              <div>
                <dt>Schedule</dt>
                <dd>
                  {answers.skipSchedule
                    ? "Skipped — office will propose times."
                    : `${answers.scheduleMethod || "Not chosen"} · ${answers.preferredTimes || "No windows given"}`}
                </dd>
              </div>
              <div>
                <dt>Fee</dt>
                <dd>
                  Starts at {site.prices.analysisFrom}. Higher if complex. May be credited toward implementation.
                  Not free.
                </dd>
              </div>
            </dl>
            <button className="btn btn-solid" type="button" onClick={() => void submit()} disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Submit the brief"}
            </button>
            {status === "error" ? <p className="form-status">{handoff}</p> : null}
          </div>
        ) : null}

        {step === "done" ? (
          <div className="step-form">
            {handoff ? <p className="form-status">{handoff}</p> : null}
            <div className="chips">
              <Link className="chip chip-solid" href="/">
                Home
              </Link>
              <a className="chip" href={`tel:${site.phones.sarah.tel}`}>
                Call Sarah
              </a>
            </div>
          </div>
        ) : null}

        {canJumpToSummary && step !== "summary" && step !== "done" && step !== "existing" && step !== "welcome" ? (
          <button type="button" className="end-now" onClick={() => setStep("summary")}>
            End and send now
          </button>
        ) : null}
      </div>
    </div>
  );
}
