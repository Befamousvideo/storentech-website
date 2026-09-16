export const businessTypes = [
  "Service / home services",
  "Dental / med spa",
  "Insurance",
  "Contractor",
  "Professional services",
  "Manufacturing",
  "Other",
] as const;

export const companySizes = ["Just me", "2–10", "11–50", "51–200", "200+"] as const;

export const solutionChips = [
  "Voice / missed calls",
  "Website chat",
  "Speed-to-lead",
  "Booking",
  "Follow-up / CRM",
  "Ops / inbox",
  "Not sure yet",
] as const;

export const timelineChips = ["ASAP", "This month", "Next quarter", "Just exploring"] as const;

export const budgetChips = ["Under $5k", "$5k–$15k", "$15k–$50k", "$50k+", "Not sure"] as const;

export const scheduleMethods = [
  { id: "phone", label: "Phone" },
  { id: "in-person", label: "In person (OC)" },
] as const;

export type ScheduleMethod = (typeof scheduleMethods)[number]["id"];

export type IntakeAnswers = {
  mode: "prospect" | "existing" | "";
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  size: string;
  location: string;
  pain: string;
  solutions: string[];
  timeline: string;
  budget: string;
  skipSchedule: boolean;
  scheduleMethod: ScheduleMethod | "";
  preferredTimes: string;
};

export const emptyAnswers = (): IntakeAnswers => ({
  mode: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: "",
  size: "",
  location: "",
  pain: "",
  solutions: [],
  timeline: "",
  budget: "",
  skipSchedule: false,
  scheduleMethod: "",
  preferredTimes: "",
});

export type InferredJob = { title: string; why: string };

const typeDefaults: Record<string, InferredJob[]> = {
  "Service / home services": [
    { title: "Voice agent / missed-call recovery", why: "After-hours and on-the-job calls are the usual leak." },
    { title: "Speed-to-lead", why: "Web and ad leads go cold if the truck is already out." },
    { title: "Booking on the real calendar", why: "A hold beats a callback queue." },
    { title: "Fractional AI operations", why: "Inbox and CRM rot while the owner is in the field." },
  ],
  "Dental / med spa": [
    { title: "Voice agent on the published number", why: "New-patient calls still arrive by phone." },
    { title: "Website chat", why: "After-hours site traffic should not hit a black hole." },
    { title: "Booking / appointment setting", why: "New vs existing rules belong on the real calendar." },
    { title: "Review and reputation engine", why: "Happy visits walk out unless someone asks." },
  ],
  Insurance: [
    { title: "Speed-to-lead", why: "Paid leads die in the five-minute window." },
    { title: "AI SDR / appointment setting", why: "The product is a meeting on the calendar, not a lead dump." },
    { title: "Sales follow-up", why: "Quotes and households go quiet without a nudge." },
    { title: "Website chat", why: "Form fills still need an immediate reply." },
  ],
  Contractor: [
    { title: "Voice agent / missed-call recovery", why: "The published number is the job board." },
    { title: "Speed-to-lead", why: "The first reply usually wins the estimate." },
    { title: "Owner’s weekly command center", why: "Monday should not be a scavenger hunt." },
    { title: "Fractional AI operations", why: "Estimates and vendor mail sit while the crew works." },
  ],
  "Professional services": [
    { title: "Sales follow-up", why: "Pipeline dies after the first meeting, not during it." },
    { title: "Weekly command center", why: "The principal is the ops team." },
    { title: "Website chat", why: "Site visitors ask the same pre-sale questions." },
    { title: "AI content and distribution", why: "The offer needs a planned set of assets, not a social intern." },
  ],
  Manufacturing: [
    { title: "Fractional AI operations", why: "Handoffs and re-entry are where hours leak." },
    { title: "Weekly command center", why: "The owner needs five actions, not forty tabs." },
    { title: "Implementation studio", why: "Named jobs on the tools you already run." },
    { title: "Speed-to-lead", why: "Inbound RFQs still wait on a person." },
  ],
  Other: [
    { title: "Voice agent / missed-call recovery", why: "The phone is still how most SMBs leak money first." },
    { title: "Website chat", why: "The site should capture intent overnight." },
    { title: "Speed-to-lead", why: "Seconds, not a callback queue." },
    { title: "Fractional AI operations", why: "Inbox and CRM are the quiet P&L." },
  ],
};

const painRules: { re: RegExp; job: InferredJob }[] = [
  {
    re: /missed call|voicemail|after.?hours|phone|receptionist/i,
    job: { title: "Voice agent / missed-call recovery", why: "You named the phone as the leak." },
  },
  {
    re: /speed|lead|form|ads|callback|lsa/i,
    job: { title: "Speed-to-lead", why: "Inbound is arriving faster than the desk." },
  },
  {
    re: /chat|website|site visitor/i,
    job: { title: "Website chat", why: "The site is already a lead source." },
  },
  {
    re: /book|appoint|calendar|schedul/i,
    job: { title: "Booking / appointment setting", why: "The calendar is the scarce asset." },
  },
  {
    re: /follow.?up|pipeline|crm|quote|proposal|nurture/i,
    job: { title: "Sales follow-up", why: "The file goes quiet after the first touch." },
  },
  {
    re: /inbox|admin|ops|report|paperwork/i,
    job: { title: "Fractional AI operations", why: "Repetitive admin is eating owner time." },
  },
  {
    re: /hir|recruit|staff|employee inbox/i,
    job: { title: "HR screening desk", why: "Hiring is dying in the inbox." },
  },
  {
    re: /review|reputat|google|yelp/i,
    job: { title: "Review and reputation engine", why: "Reputation is leftover work." },
  },
];

export function looksLikeOrangeCounty(location: string) {
  return /orange county|\boc\b|newport|corona del mar|irvine|costa mesa|huntington|laguna|anaheim|tustin|santa ana/i.test(
    location,
  );
}

export function inferAutomations(answers: IntakeAnswers): {
  items: InferredJob[];
  first: InferredJob;
} {
  const byType = typeDefaults[answers.businessType] ?? typeDefaults.Other;
  const fromPain = painRules.filter((rule) => rule.re.test(answers.pain)).map((rule) => rule.job);
  const fromChips = answers.solutions
    .filter((chip) => chip !== "Not sure yet")
    .map((chip) => ({ title: chip, why: "You marked this as of interest." }));

  const merged: InferredJob[] = [];
  for (const job of [...fromPain, ...fromChips, ...byType]) {
    if (!merged.some((item) => item.title === job.title)) merged.push(job);
  }

  const items = merged.slice(0, 5);
  const first = fromPain[0] ?? items[0];
  return { items, first };
}

export function isWorkEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
