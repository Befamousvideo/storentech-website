export type ForLookFirstItem = {
  lead: string;
  rest: string;
};

export type ForAgentQuestion = {
  label: string;
  text: string;
};

export const FOR_CTA_LABEL = "Book a 30-minute conversation";
export const FOR_CTA_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3_M6l66KiiwO3HU9p0jzoWXWaJ4hTlaGvhTvVO2pXQcfq1vFVisX-ebfTTEv4_NOYhA3plJTnB" as const;

export type ForPage = {
  slug: string;
  company: string;
  h1: string;
  topHeading: string;
  topBody: string;
  description: string;
  lookFirstHeading: string;
  lookFirst: ForLookFirstItem[];
  agentHeading: string;
  agentIntro: string;
  questions: ForAgentQuestion[];
  startHeading: string;
  startBody: string;
  close: string;
  ctaLabel: string;
  ctaHref: typeof FOR_CTA_HREF;
};

export const FOR_AGENT_QUESTIONS: ForAgentQuestion[] = [
  {
    label: "Approvals",
    text: "who signs off before an AI tool sends, books or buys anything?",
  },
  {
    label: "Cost limits",
    text: "does each AI tool have a hard spending cap?",
  },
  {
    label: "Off switch",
    text: "who can turn it off, and how?",
  },
];

export const FOR_LOOK_FIRST_HEADING = "Three places we'd look first";
export const FOR_AGENT_HEADING = "3-question AI agent check, at no cost";
export const FOR_START_HEADING = "How we'd start";

export function forPageDescription(company: string) {
  return `${company}: three places we'd look first, plus a 3-question AI agent check at no cost.`;
}

export function isForPreviewPath(pathname: string) {
  return pathname === "/for" || pathname.startsWith("/for/");
}

const howWeStartShared =
  "With an AI Opportunity Map. We talk with your leadership and key staff, map where time or revenue leaks, and rank the fixes by payoff and effort. You come away knowing what to fix first, and why, with no surprise costs. Human touch stays.";

export const forPages: ForPage[] = [
  {
    slug: "kei-concepts",
    company: "Kei Concepts",
    h1: "Kei Concepts: what we'd look at first",
    topHeading:
      "Software vendors are changing the rules. Kei Concepts can own its tools.",
    topBody:
      "Software access keeps shifting under restaurant groups. Tripadvisor set Aug 31, 2026 as the sunset date for its legacy Content API, and Restaurant365's newer Public API is closed to new participants for now. Kei Concepts runs 13 locations across nine concepts, from SUP Noodle Bar and VOX Kitchen to QUA and ROL Hand Roll Bar, with franchise locations and the first CPG products next. As co-CEO Ivy Ha told the Orange County Business Journal: \"You cannot scale just on hustle forever.\" Tools built on Kei's own accounts don't wait on a vendor's roadmap, and since Viet Nguyen built his own cloud POS, we expect a technical conversation and welcome it.",
    description: forPageDescription("Kei Concepts"),
    lookFirstHeading: FOR_LOOK_FIRST_HEADING,
    lookFirst: [
      {
        lead: "Training and SOPs across nine concepts.",
        rest: "One standards assistant built on your own recipes, checklists and playbooks.",
      },
      {
        lead: "Franchise-ready ops reporting.",
        rest: "Sales, labor and checklist results rolled up the same way for company units and franchisees.",
      },
      {
        lead: "CPG and catering order flow.",
        rest: "Orders captured, confirmed and turned into production lists, without more software seats.",
      },
    ],
    agentHeading: FOR_AGENT_HEADING,
    agentIntro:
      "On Sep 29, 2026, OpenAI released a tool that lets AI agents click buttons and complete tasks in a web browser. Before one touches an order, a schedule or a payment, we'll walk your team through three questions, at no cost and with no obligation:",
    questions: FOR_AGENT_QUESTIONS,
    startHeading: FOR_START_HEADING,
    startBody: howWeStartShared,
    close:
      "Who handles operations or technology decisions at Kei Concepts? A 30-minute conversation, no pitch deck. Vincent Jackson, StorenTech AI.",
    ctaLabel: FOR_CTA_LABEL,
    ctaHref: FOR_CTA_HREF,
  },
  {
    slug: "rjb-restaurant-group",
    company: "RJB Restaurant Group",
    h1: "RJB Restaurant Group: what we'd look at first",
    topHeading:
      "Creekside makes eight. See the busy nights coming at every RJB restaurant.",
    topBody:
      "RJB Restaurant Group, owned by Russ Bendel Jr. and partners, is opening Creekside at Sendero Marketplace in Rancho Mission Viejo this October, its eighth business in Orange County alongside Vine, Parlor Pizzeria, Bloom, Sapphire, The Pantry, Ironwood and Olea (Orange County Business Journal, Sep 15, 2026). Games, concerts and community events change how busy each room gets. We can watch public event feeds near each restaurant and flag the nights that need more staff, prep or product, with a person approving the plan.",
    description: forPageDescription("RJB Restaurant Group"),
    lookFirstHeading: FOR_LOOK_FIRST_HEADING,
    lookFirst: [
      {
        lead: "A local demand watch.",
        rest: "Events near each restaurant flagged ahead of time for staffing, prep and ordering.",
      },
      {
        lead: "A new-unit opening playbook.",
        rest: "One checklist that assigns tasks, tracks what's done and flags what's late, reusable for the next concept.",
      },
      {
        lead: "One weekly P&L rollup.",
        rest: "Each business's numbers in one weekly view for the partners, without another subscription.",
      },
    ],
    agentHeading: FOR_AGENT_HEADING,
    agentIntro:
      "On Sep 29, 2026, OpenAI released a tool that lets AI agents click buttons and complete tasks in a web browser. Before one touches a schedule, an order or a vendor payment, we'll walk the partners through three questions, at no cost and with no obligation:",
    questions: FOR_AGENT_QUESTIONS,
    startHeading: FOR_START_HEADING,
    startBody: howWeStartShared,
    close:
      "Who handles operations or technology decisions at RJB? A 30-minute conversation, no pitch deck. Vincent Jackson, StorenTech AI.",
    ctaLabel: FOR_CTA_LABEL,
    ctaHref: FOR_CTA_HREF,
  },
  {
    slug: "bluewater-grill",
    company: "Bluewater Grill",
    h1: "Bluewater Grill: what we'd look at first",
    topHeading:
      "Thirty years on the water. See the busy weekends coming at every Bluewater.",
    topBody:
      "Jim Ulcickas and Rick Staunton opened the first Bluewater Grill in Newport Beach in 1996, and 2026 is the 30th-anniversary year. Today there are eight Bluewater restaurants in California and Arizona, plus El Galleon on Catalina Island, Catalina Rum Company and the new Mia's in Solana Beach. Events near each location change staffing and seafood orders. We can watch public event feeds near each location, so busy weekends show up before the order goes in. As Ulcickas put it: \"It all comes down to blocking and tackling.\"",
    description: forPageDescription("Bluewater Grill"),
    lookFirstHeading: FOR_LOOK_FIRST_HEADING,
    lookFirst: [
      {
        lead: "A local demand watch for every location.",
        rest: "Nearby events flagged ahead of time for staffing, prep and seafood orders.",
      },
      {
        lead: "Seafood purchasing, yield and menu costing.",
        rest: "One view of what each kitchen buys and what each plate costs, updated when fish prices move.",
      },
      {
        lead: "One reporting layer for the whole family.",
        rest: "The Bluewater restaurants, El Galleon, Mia's and the rum brand in one consolidated view.",
      },
    ],
    agentHeading: FOR_AGENT_HEADING,
    agentIntro:
      "On Sep 29, 2026, OpenAI released a tool that lets AI agents click buttons and complete tasks in a web browser. Before one touches a seafood order or a vendor payment, we'll walk your team through three questions, at no cost and with no obligation:",
    questions: FOR_AGENT_QUESTIONS,
    startHeading: FOR_START_HEADING,
    startBody: howWeStartShared,
    close:
      "Who handles operations or technology decisions at Bluewater? A 30-minute conversation, no pitch deck. Vincent Jackson, StorenTech AI.",
    ctaLabel: FOR_CTA_LABEL,
    ctaHref: FOR_CTA_HREF,
  },
  {
    slug: "dkn-hotels",
    company: "DKN Hotels",
    h1: "DKN Hotels: what we'd look at first",
    topHeading: "AI agents can now work a web browser. Who at DKN signs off?",
    topBody:
      "On Sep 29, 2026, OpenAI released a tool that lets AI agents click buttons and complete tasks in a web browser. For a hotel company, the question is no longer whether AI can act, but who approved what it does. DKN Hotels, led by CEO Ana Almada, keeps adding properties: the Residence Inn San Diego Sorrento Mesa/Sorrento Valley acquisition with renovation from Q2 2026, the SpringHill Suites Ventura Oxnard opening (Feb 23, 2026), a management contract for the Courtyard Toledo Rossford/Perrysburg (Jun 16, 2026), and the TownePlace Suites Wildomar in 2027. Every new contract is a good time to set approvals, cost limits and an off switch.",
    description: forPageDescription("DKN Hotels"),
    lookFirstHeading: FOR_LOOK_FIRST_HEADING,
    lookFirst: [
      {
        lead: "Owner reporting across mixed PMS brands.",
        rest: "Owner reports drafted from the data already in your reporting and accounting systems, ready for review.",
      },
      {
        lead: "A local demand watch for each hotel.",
        rest: "Public event calendars near each property flagged early for staffing and revenue teams.",
      },
      {
        lead: "A takeover and pre-opening playbook.",
        rest: "One repeatable checklist for each new contract, from Toledo to Wildomar.",
      },
    ],
    agentHeading: FOR_AGENT_HEADING,
    agentIntro:
      "Before an AI agent touches a rate, a booking or a purchase, we'll walk your operations team through three questions, at no cost and with no obligation:",
    questions: FOR_AGENT_QUESTIONS,
    startHeading: FOR_START_HEADING,
    startBody: howWeStartShared,
    close:
      "Who handles operations or technology decisions at DKN Hotels? A 30-minute conversation, no pitch deck. Vincent Jackson, StorenTech AI.",
    ctaLabel: FOR_CTA_LABEL,
    ctaHref: FOR_CTA_HREF,
  },
  {
    slug: "kings-seafood",
    company: "King's Seafood Company",
    h1: "King's Seafood Company: what we'd look at first",
    topHeading:
      "AI agents can now click buttons. Three questions before one places an order.",
    topBody:
      "On Sep 29, 2026, OpenAI released a tool that lets AI agents complete tasks in a web browser, including ordering screens. King's Seafood Company runs 23 restaurants across six brands, and King's Seafood Distribution (KSD) in Santa Ana handles about 1 million pounds of fish a year (Orange County Business Journal). With President and COO Kelly Ellerman leading operations, any AI near ordering needs clear approvals, cost limits and an off switch before it goes live. Sam King's rule fits here too: \"Price is negotiable. Quality is not.\"",
    description: forPageDescription("King's Seafood Company"),
    lookFirstHeading: FOR_LOOK_FIRST_HEADING,
    lookFirst: [
      {
        lead: "Order forecasting from restaurant to KSD.",
        rest: "Orders forecast from covers, menu mix and season, so distribution buys closer to what kitchens use.",
      },
      {
        lead: "Inventory and yield at the Santa Ana facility.",
        rest: "What came in, what was cut and what shipped, reconciled daily.",
      },
      {
        lead: "Approvals on every KSD order.",
        rest: "Any AI that drafts or places an order gets a sign-off step, a spending cap, a log and an off switch.",
      },
    ],
    agentHeading: FOR_AGENT_HEADING,
    agentIntro:
      "Before an AI agent touches a seafood order, we'll walk your operations team through three questions, at no cost and with no obligation:",
    questions: FOR_AGENT_QUESTIONS,
    startHeading: FOR_START_HEADING,
    startBody:
      "With an AI Opportunity Map scoped to King's Seafood Distribution, so the first Map stays focused. We talk with your leadership and key staff, map where time or revenue leaks, and rank the fixes by payoff and effort. You come away knowing what to fix first, and why, with no surprise costs. Human touch stays.",
    close:
      "Who handles operations or technology decisions at King's Seafood? A 30-minute conversation, no pitch deck. Vincent Jackson, StorenTech AI.",
    ctaLabel: FOR_CTA_LABEL,
    ctaHref: FOR_CTA_HREF,
  },
];

export const forPageSlugs = forPages.map((page) => page.slug);

export function getForPage(slug: string) {
  return forPages.find((page) => page.slug === slug);
}

export function forPagePath(slug: string) {
  return `/for/${slug}`;
}

export function forPageTitle(page: ForPage) {
  return `${page.company}: what we'd look at first | StorenTech AI`;
}
