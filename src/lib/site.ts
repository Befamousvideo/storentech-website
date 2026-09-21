const DEFAULT_SITE_URL = "https://storentech.com";

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
  tagline: "Hire an AI employee after the math, not before.",
  description:
    "Vincent Jackson’s full-service AI agency in Newport Beach and Corona Del Mar. Start with a paid Automation ROI Analysis. If the numbers work, the first AI employee is live in 30 days.",
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
      display: "+1 714-613-8557",
      tel: "+17146138557",
      label: "Sarah",
    },
    // Public contact / footer phone is Sarah. Kept as `office`
    // so older call sites stay pointed at the same published number.
    office: {
      display: "+1 714-613-8557",
      tel: "+17146138557",
      label: "Sarah",
    },
  },
  contactCopy: {
    primary: "Sarah, Operator · 714-613-8557",
    secondary:
      "Prefer to talk? Call Sarah — leave a message or request a callback.",
  },
  emails: {
    support: "support@StorenTech.com",
    vincent: "vincent@storentech.com",
  },
  prices: {
    analysisTypical: "$1,000",
    analysisComplex: "$2,000–$3,000",
    employee: "$5,000",
    growth: "$7,500",
  },
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const verticals = [
  "Dental and med spa",
  "Insurance",
  "Residential contractors",
  "Wealth and mortgage",
  "Professional services",
  "Home services",
  "Manufacturing, when the project is right",
] as const;

export const offerSteps = [
  {
    n: "01",
    title: "Paid ROI analysis",
    body: `${site.prices.analysisTypical} typical. ${site.prices.analysisComplex} when the operation is complex. A ranked roadmap for the first AI employee and the work around it. Paid. Never complimentary.`,
  },
  {
    n: "02",
    title: "First employee in 30 days",
    body: "If the numbers work, the first named AI employee goes live in 30 days — usually on the phone, the site, and the calendar, because that is where most operators leak money first.",
  },
  {
    n: "03",
    title: "Then a retainer",
    body: `${site.prices.employee}/mo AI Employee: one bot, one workflow a month, reporting. ${site.prices.growth}/mo Growth: two bots, outbound and inbox, weekly command center.`,
  },
] as const;

export const retainers = [
  {
    name: "AI Employee",
    price: `${site.prices.employee} / month`,
    summary: "The working hire, once the analysis says it will pay.",
    points: [
      "One production bot on a named job",
      "One new workflow each month",
      "Reporting the owner can actually read",
    ],
  },
  {
    name: "Growth",
    price: `${site.prices.growth} / month`,
    summary: "Two employees and a weekly operating rhythm.",
    points: [
      "Two production bots",
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
    title: "The first job is usually the phone and the inbox.",
    lede: "Almost every SMB leaks money here. That is why chat and voice are the common first hire — the wedge, not the whole firm.",
    jobs: [
      {
        title: "Speed-to-lead + after-hours closer",
        body: "Every web, call, and chat lead is touched fast, booked or qualified. The practice is closed. The contractor is on a roof. The employee still takes the job.",
      },
      {
        title: "Website chat + voice",
        body: `The same employee on the number you publish and the site you already have. Sarah is the live demo — ${site.phones.sarah.display} — handling the first jobs an AI employee actually does.`,
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
    lede: "Once the front door holds, the next hire works the follow-up that operators never quite staff.",
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
        body: "Google and Yelp asks, response drafts, competitor watch. Sold as an add-on or as an entry hire when reputation is the leak.",
      },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    title: "Available when the first employee is earning.",
    lede: "These lines are part of the firm. They are not the homepage headline, and they are not year-one-only work — they are ready when the map says so.",
    jobs: [
      {
        title: "AI content + distribution",
        body: "Site, YouTube, LinkedIn, and email — a planned set of 12–20 assets, written to the offer, not a promise to “post on Instagram.”",
      },
      {
        title: "Grok Bot / AI-employee implementation studio",
        body: "Design the bots, connect the tools, write the routines, train the owner, and stay on as operator.",
      },
      {
        title: "White-label fulfillment",
        body: "Other agencies keep the client relationship. We build and run the employee behind their brand.",
      },
      {
        title: "CTV / OTT creative + media",
        body: "Creative and placement through Brandzooka. A later, available line for the right account — not the hero offer.",
      },
    ],
  },
];
