export type Pattern = {
  slug: string;
  title: string;
  h1: string;
  kicker: string;
  industry: string;
  theme: string;
  description: string;
  bottleneck: string;
  pattern: string;
  measurement: string;
  related: string[];
};

export const patterns: Pattern[] = [
  {
    slug: "missed-calls",
    title: "Missed calls after hours",
    h1: "A typical home-services operator and the after-hours phone.",
    kicker: "Illustrative composite",
    industry: "Home services",
    theme: "Missed-call recovery",
    description:
      "Illustrative composite: a home-services operator whose after-hours voicemail is the leak, and the voice-employee pattern StorenTech uses to recover those calls.",
    bottleneck:
      "The trucks are on roofs and in attics until dark. The published number goes to voicemail at 5:01. Morning callbacks reach a competitor who answered. The website is fine. The leak is the phone.",
    pattern:
      "A voice employee on the published number, with the same qualification the owner uses on Saturday: service area, urgency, a calendar hold or a next-day window. Unhappy or unsafe jobs transfer or become a flagged callback. The desk reads a short log, not a pile of recordings.",
    measurement:
      "Answered after hours, holds set, recovered callbacks that become jobs. Compare a quiet month of voicemail against a month with the employee on the line — using the operator’s own job records.",
    related: ["voice-agents", "speed-to-lead"],
  },
  {
    slug: "speed-to-lead",
    title: "Speed-to-lead on paid traffic",
    h1: "A typical insurance book and the five-minute window.",
    kicker: "Illustrative composite",
    industry: "Insurance",
    theme: "Speed to lead",
    description:
      "Illustrative composite: an insurance operator buying leads that go cold, and the speed-to-lead pattern that touches every form and missed call fast.",
    bottleneck:
      "Leads arrive while the principal is in appointments. Forms sit. Missed calls sit. By the time someone dials, the household has already talked to two other books. Spend is not the problem. Time-to-first-touch is.",
    pattern:
      "Every web, call, and chat lead is touched immediately: qualify against lines of business you actually write, offer a meeting on the real calendar, log the CRM so a person is not starting from a blank note. Hot files escalate. After hours still answers.",
    measurement:
      "Minutes to first touch, meetings set from the same lead sources, and the share of leads that die untouched. The analysis uses the book’s real close rates, not a vendor’s.",
    related: ["speed-to-lead", "appointment-setting"],
  },
  {
    slug: "booking",
    title: "Booking on the real calendar",
    h1: "A typical dental practice and the new-patient calendar.",
    kicker: "Illustrative composite",
    industry: "Dental",
    theme: "Booking",
    description:
      "Illustrative composite: a dental practice that loses new patients between the first call and a held appointment, and the booking pattern on the real calendar.",
    bottleneck:
      "The front desk is excellent from nine to twelve and underwater after lunch. New patients hit voicemail or a “we will call you back.” Hygiene is full. New-patient slots are the scarce asset, and they are not being offered when people actually call.",
    pattern:
      "Chat on the site and voice on the published number, both allowed to hold new-patient and existing-patient rules the practice already uses. Insurance questions get an honest holding pattern. The employee does not invent clinical advice. A person still confirms anything unusual.",
    measurement:
      "New-patient holds, no-shows versus same-day fills, after-hours captures that become kept appointments. The practice’s PMS is the source of truth.",
    related: ["website-chat", "voice-agents"],
  },
  {
    slug: "follow-up",
    title: "Follow-up that dies in the CRM",
    h1: "A typical wealth or mortgage desk and the quiet pipeline.",
    kicker: "Illustrative composite",
    industry: "Wealth and mortgage",
    theme: "Sales follow-up",
    description:
      "Illustrative composite: a wealth or mortgage desk whose pipeline goes quiet after the first meeting, and the follow-up employee that writes notes into tasks and nudges.",
    bottleneck:
      "First meetings happen. Notes live in someone’s head. Proposals wait. A household that was ready two weeks ago has gone cold because nobody sent the next thing. The CRM is a filing cabinet.",
    pattern:
      "After each meeting, notes become tasks, a draft email, and a CRM update. Stalled files get a nudge on a schedule the principal sets. The employee does not give financial advice. It keeps the file warm and the next human action obvious.",
    measurement:
      "Next actions created, stalled files touched, meetings that return to the calendar. Pipeline hygiene is the point — not a volume of outbound for its own sake.",
    related: ["appointment-setting", "fractional-ops"],
  },
  {
    slug: "ops",
    title: "The owner is the operations team",
    h1: "A typical residential contractor and the Monday scavenger hunt.",
    kicker: "Illustrative composite",
    industry: "Residential contractors",
    theme: "Operations",
    description:
      "Illustrative composite: a residential contractor whose owner is the ops team, and the fractional AI ops plus Monday command-center pattern.",
    bottleneck:
      "Estimates, vendor emails, change orders, and a CRM that was last honest in March. Monday starts with rebuilding the week from memory. Nothing is broken in a dramatic way. Everything is slightly late.",
    pattern:
      "Fractional ops on the inbox and CRM: triage, drafts, missing fields, a weekly ops report. On top of that, a Monday brief — cash, pipeline, stalled jobs, reviews, ads, five actions. The owner still decides. They stop hunting.",
    measurement:
      "Inbox age, whether the Monday brief is opened, stalled jobs that moved, hours the owner no longer spends reconciling tabs. If the brief is ignored, the format is wrong.",
    related: ["fractional-ops", "command-center"],
  },
  {
    slug: "hr-screening",
    title: "Hiring that never quite screens",
    h1: "A typical growing field shop and the hiring inbox.",
    kicker: "Illustrative composite",
    industry: "Home services",
    theme: "HR screening",
    description:
      "Illustrative composite: a growing field business that is always about to hire, and the screening desk that posts, screens, schedules, and scorecards.",
    bottleneck:
      "A role has been “open” for months. Applications sit in a portal nobody opens. The owner interviews whoever yells. Good people drop out because nobody scheduled them. This is not a legal problem. It is an inbox problem.",
    pattern:
      "A screening desk: the post written from the job as it is done, inbound screen against a short scorecard, scheduling on the real calendar, a packet for anyone who should meet a human. Screening and coordination only — not legal advice, not a hiring decision.",
    measurement:
      "Time from application to first screen, interviews held, packets the manager actually used. Fill rate is a lagging number; screen speed is the leading one.",
    related: ["hr-screening"],
  },
  {
    slug: "reviews",
    title: "Reputation left to chance",
    h1: "A typical med spa and the review they never asked for.",
    kicker: "Illustrative composite",
    industry: "Med spa",
    theme: "Reviews",
    description:
      "Illustrative composite: a med spa that does good work and forgets to ask, and the review-engine pattern as a growth add-on.",
    bottleneck:
      "Happy visits walk out. Nobody asks. The listing is thinner than the work. An unhappy note sits unanswered over a weekend. The front of house is busy; reputation is leftover.",
    pattern:
      "An ask at the right moment after a completed visit, response drafts in the owner’s tone, a hold on anything unhappy before a public reply, a light watch on nearby listings. This sits on Growth — after the phone and the calendar are covered.",
    measurement:
      "Asks sent, reviews received, time-to-draft on the unhappy ones. We do not sell a star rating. We sell a system that remembers to ask and to answer.",
    related: ["reviews", "command-center"],
  },
];

export function getPattern(slug: string) {
  return patterns.find((pattern) => pattern.slug === slug);
}
