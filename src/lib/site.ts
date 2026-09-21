const DEFAULT_SITE_URL = "https://storentech.com";
const DEFAULT_INTAKE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScjOa8fFyqRLRAmOyDNtk7oFLlVwGwNdyML7VQNvWIUtlsXRg/viewform";
const ONB1_INTAKE_URL = "https://onboarding.storentechai.com";

function resolveIntakeUrl(raw: string | undefined) {
  const candidate = raw?.trim();
  return candidate || DEFAULT_INTAKE_URL;
}

function resolveSiteUrl(raw: string | undefined) {
  const candidate = raw?.trim();
  if (!candidate) return DEFAULT_SITE_URL;
  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const site = {
  name: "StorenTech AI",
  shortName: "StorenTech",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  // Vince locked brand mark: ORBIT. Not the hybrid glow orb.
  brand: {
    mark: "/orbit-mark.png",
    wordmark: "/storentech-logo-orbit.png",
  },
  tagline:
    "Most operators can’t see the leaks until someone maps them. We find where time or revenue hides — then fix what pays. Human touch stays.",
  brandLine:
    "StorenTech AI finds where time or revenue leaks, then fixes what pays — human touch stays. Ask Sarah anything.",
  description:
    "Most operators can’t see the leaks until someone maps them. We find where time or revenue hides — then fix what pays. Human touch stays. Automation ROI Analysis: a written map of time, revenue, and risk leaks. Ask Sarah anything.",
  offer: {
    primaryTitle: "Automation ROI Analysis",
    primary:
      "Automation ROI Analysis — written map of time/revenue/risk leaks vs their software, what to fix first. Clarity before spend.",
    later:
      "After the map, we build what pays — may include voice, website chat, other ops. Implementation ≠ the $1k product.",
    capacity:
      "Automation here is about 10× what your people can ship — more human touch with customers, humans out front where they shine. Not fewer jobs.",
    toward:
      "AI does the grind humans hate; humans do what AI can’t. More touch, 10×, a calmer office.",
    services:
      "Map leaks first. Then build what pays — people still in the loop, out front with customers.",
  },
  founder: {
    name: "Vincent Jackson",
    title: "President",
  },
  location: {
    kicker: "Newport Beach / Corona Del Mar",
    street: "401 Orchid St. Suite 372",
    city: "Corona Del Mar",
    region: "CA",
    postal: "92625",
    country: "US",
    full: "401 Orchid St. Suite 372, Corona Del Mar, CA 92625",
  },
  phones: {
    sarah: {
      // Visible number is public/sarah-phone.png only. Never render digits.
      tel: "+17146138557",
      label: "Sarah",
      image: "/sarah-phone.png",
    },
    // Public contact / footer phone is Sarah. Kept as `office`
    // so older call sites stay pointed at the same published number.
    office: {
      tel: "+17146138557",
      label: "Sarah",
    },
  },
  contactCopy: {
    primary: "Sarah, Operator",
    secondary:
      "Prefer to talk? Call Sarah — leave a message or request a callback.",
  },
  prices: {
    analysisTypical: "$1,000",
    analysisComplex: "$2,000–$3,000",
    employee: "$5,000",
    growth: "$7,500",
  },
  // Start analysis CTA. Form now; set NEXT_PUBLIC_INTAKE_URL to ONB1 when gated live.
  intakeUrl: resolveIntakeUrl(process.env.NEXT_PUBLIC_INTAKE_URL),
  intakeOnb1Url: ONB1_INTAKE_URL,
  stripe: {
    roiPaymentLink: "https://buy.stripe.com/6oU14ngeE5w1a8wd7RdjO00",
  },
  payHosts: ["pay.storentechai.com", "www.pay.storentechai.com"],
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// HOLD: Mary is drafting homepage Clients labels. Do not rewrite this list.
export const verticals = [
  "Dental and med spa",
  "Insurance",
  "Residential contractors",
  "Wealth and mortgage",
  "Professional services",
  "Home services",
  "Manufacturing, when the project is right",
] as const;

// HOLD with How it works: Mary is drafting the engagement steps. Do not rewrite yet.
export const offerSteps = [
  {
    n: "01",
    title: site.offer.primaryTitle,
    body: `${site.prices.analysisTypical}. Written map of time/revenue/risk leaks vs their software, what to fix first. Clarity before spend. Paid. Never complimentary.`,
  },
  {
    n: "02",
    title: "After the map",
    body: site.offer.later,
  },
  {
    n: "03",
    title: "Stay on the grind",
    body: `${site.prices.employee}/mo Capacity: one production workflow a month, reporting. ${site.prices.growth}/mo Growth: two workflows, outbound and inbox, weekly command center.`,
  },
] as const;

export const retainers = [
  {
    name: "Capacity",
    price: `${site.prices.employee} / month`,
    summary: "AI on the grind, once the map says it pays. Humans stay in the loop.",
    points: [
      "One production workflow on a named leak",
      "One new workflow each month",
      "Reporting the owner can actually read",
    ],
  },
  {
    name: "Growth",
    price: `${site.prices.growth} / month`,
    summary: "Two workflows and a weekly operating rhythm.",
    points: [
      "Two production workflows",
      "Outbound plus inbox coverage",
      "Weekly command center with the owner",
    ],
  },
] as const;

export type WorkGroup = {
  id: string;
  label: string;
  title: string;
  lede: string;
  jobs: { title: string; body: string }[];
};

export const workGroups: WorkGroup[] = [
  {
    id: "wedge",
    label: "Wedge / front of house",
    title: "The first leak is usually the phone and the inbox.",
    lede: "Almost every SMB leaks money here. After the map, that grind is a common first build — not the whole firm, and not the $1k product.",
    jobs: [
      {
        title: "Speed-to-lead + after-hours closer",
        body: "Every web, call, and chat lead is touched fast, booked or qualified. The practice is closed. The contractor is on a roof. The grind still gets covered.",
      },
      {
        title: "Website chat + voice",
        body: "The same coverage on the number you publish and the site you already have. AI does the grind humans hate. Humans stay out front with customers.",
      },
      {
        title: "Booking / appointment setting",
        body: "Holds on the real calendar, with the rules you already use for new versus existing patients or clients.",
      },
    ],
  },
  {
    id: "revenue",
    label: "Revenue",
    title: "Named pipeline work. Booked meetings, not a lead dump.",
    lede: "Once the front door holds, the next build works the follow-up grind that never quite gets finished.",
    jobs: [
      {
        title: "AI SDR / appointment-setter pod",
        body: "Outbound and inbound setting aimed at booked meetings on the calendar — not a pile of “unlimited leads.”",
      },
      {
        title: "Sales follow-up",
        body: "Meeting notes into tasks, email, and CRM. Proposal nudges. Pipeline hygiene so stalled deals do not go quiet.",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    title: "The work that never makes the highlight reel.",
    lede: "Inbox, CRM, the Monday brief, hiring, reviews. This is how a small firm stays in the P&L after the demo.",
    jobs: [
      {
        title: "Fractional AI operations team",
        body: "Inbox triage, CRM hygiene, follow-up drafts, and a weekly ops report. The unglamorous work that always shows up in the numbers.",
      },
      {
        title: "Owner’s weekly command center",
        body: "A Monday brief: cash, pipeline, stalled deals, reviews, ads, and five actions. The owner walks in knowing what to do.",
      },
      {
        title: "Recruiting / HR screening desk",
        body: "Role posts, inbound screen, scheduling, scorecards. Screening and coordination — not legal advice.",
      },
      {
        title: "Review + reputation engine",
        body: "Google and Yelp asks, response drafts, competitor watch. Sold as an add-on or as an entry build when reputation is the leak.",
      },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    title: "Available when the first build is paying.",
    lede: "These lines are part of the firm. They are not the homepage headline, and they are not year-one-only work — they are ready when the map says so.",
    jobs: [
      {
        title: "AI content + distribution",
        body: "Site, YouTube, LinkedIn, and email — a planned set of 12–20 assets, written to the offer, not a promise to “post on Instagram.”",
      },
      {
        title: "Implementation studio",
        body: "Design the workflows, connect the tools, write the routines, train the owner, and stay on as operator. Humans in the loop. AI does the grind humans hate; humans do what AI can’t.",
      },
      {
        title: "White-label fulfillment",
        body: "Other agencies keep the client relationship. We build and run the grind behind their brand.",
      },
      {
        title: "CTV / OTT creative + media",
        body: "Creative and placement through Brandzooka. A later, available line for the right account — not the hero offer.",
      },
    ],
  },
];
