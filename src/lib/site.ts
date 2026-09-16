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
    "Vincent Jackson’s full-service AI agency in Newport Beach and Corona Del Mar. Paid ROI analysis from $1,000, then a first AI employee in about 30 days if the numbers work.",
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
    office: {
      display: "+1 714-794-9199",
      tel: "+17147949199",
      label: "Office",
    },
  },
  hours: {
    office: "8:00 AM – 6:00 PM Pacific",
    officeOpens: "08:00",
    officeCloses: "18:00",
    appointments: "Monday–Thursday, 10:00 AM – 4:00 PM Pacific",
    appointmentsNote: "Other times available by special request.",
  },
  emails: {
    support: "support@StorenTech.com",
    vincent: "vincent@storentech.com",
  },
  prices: {
    analysisFrom: "$1,000",
    analysisComplex: "$2,000–$3,000",
    employee: "$5,000",
    growth: "$7,500",
  },
  vapiAssistantId: "9e0a6184-ccc7-49d2-9ef0-31acfac1cf59",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  { href: "/work", label: "Work" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/technology", label: "Technology" },
  { href: "/patterns", label: "Patterns" },
  { href: "/roi-analysis", label: "ROI analysis" },
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
    body: `Starts at ${site.prices.analysisFrom}. More complex work can run higher. You get a ranked map for the first AI employee. The fee may be credited toward implementation. Paid from day one.`,
  },
  {
    n: "02",
    title: "First employee in about 30 days",
    body: "If the numbers work, a named AI employee goes live in about 30 days — usually on the phone, the site, and the calendar, because that is where most operators leak money first.",
  },
  {
    n: "03",
    title: "Then a retainer",
    body: "Once the hire is earning, we stay on as operator. Around $5,000 a month for one named employee, or $7,500 for Growth. The path is on How it works — this page is not a menu.",
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

export const faqs = [
  {
    q: "What does the ROI analysis cost?",
    a: "It starts at $1,000. More complex operations can run higher, often in the $2,000–$3,000 range. The fee may be credited toward implementation if we proceed. It is paid work, not a complimentary sales call.",
  },
  {
    q: "Is there a free audit?",
    a: "No. If a company cannot fund the analysis, we do not start. Paid work from day one keeps the map honest.",
  },
  {
    q: "How fast is the first AI employee live?",
    a: "About 30 days after the analysis says the numbers work. The first job is often chat or voice — missed-call recovery, speed-to-lead, booking — because that is where most SMBs leak money.",
  },
  {
    q: "Do you only build chatbots?",
    a: "Chat and voice are the common first job, not the whole firm. The same engagement can take revenue work, operations, reviews, content, and an implementation studio once the first hire is earning.",
  },
  {
    q: "Who is this for?",
    a: "Operators with a volume of conversations, a calendar that matters, and real numbers. Selective about clients, not locked to one industry — dental and med spa, insurance, contractors, wealth and mortgage, professional services, home services. Manufacturing and larger projects when the fit is right.",
  },
  {
    q: "Can I hear an example before I pay?",
    a: `Call Sarah at ${site.phones.sarah.display}. She is a live voice agent. If the conversation holds, start the paid ROI analysis.`,
  },
  {
    q: "When is the office open, and when can we book?",
    a: `Office hours are ${site.hours.office}. Bookable Zoom or in-person appointments are ${site.hours.appointments}. ${site.hours.appointmentsNote} Sarah, the live voice demo, is ${site.phones.sarah.display}. The office line is ${site.phones.office.display}.`,
  },
];
