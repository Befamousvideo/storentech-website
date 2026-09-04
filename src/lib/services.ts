export type ServiceGroupId = "front-of-house" | "revenue" | "operations" | "growth";

export type Service = {
  slug: string;
  group: ServiceGroupId;
  title: string;
  h1: string;
  kicker: string;
  summary: string;
  description: string;
  lede: string;
  forWho: string;
  includes: string[];
  how: {
    intake: string;
    build: string;
    handoff: string;
    measurement: string;
  };
};

export const serviceGroups: {
  id: ServiceGroupId;
  label: string;
  title: string;
  lede: string;
}[] = [
  {
    id: "front-of-house",
    label: "Front of house",
    title: "The first job is usually the phone and the site.",
    lede: "Website chat, voice agents, and speed-to-lead. Almost every SMB leaks money here. That is the wedge — not the whole firm.",
  },
  {
    id: "revenue",
    label: "Revenue",
    title: "Booked meetings. Not a lead dump.",
    lede: "An AI SDR / appointment-setter pod aimed at the calendar you already run, plus the follow-up that keeps pipeline from going quiet.",
  },
  {
    id: "operations",
    label: "Operations",
    title: "The work that never makes the highlight reel.",
    lede: "Fractional AI ops, a Monday command center, and HR screening. How a small firm stays in the P&L after the demo.",
  },
  {
    id: "growth",
    label: "Growth",
    title: "Available when the first employee is earning.",
    lede: "Reviews, content and distribution, the implementation studio, white-label, and CTV/OTT through Brandzooka. Part of the firm. Not the homepage headline.",
  },
];

export const services: Service[] = [
  {
    slug: "website-chat",
    group: "front-of-house",
    title: "Website chat",
    h1: "Website chat that captures intent, not a widget.",
    kicker: "Front of house",
    summary:
      "The same employee on the site you already have. Answers, qualifies, and books — overnight, not a black hole.",
    description:
      "Website chat for SMBs from StorenTech AI in Orange County. Capture intent, qualify, and book from the site you already have. Paid ROI analysis first.",
    lede: "Visitors still type. Most shops let that thread die. The hire sits on the site, uses your rules, and hands a person a clean next step.",
    forWho:
      "Practices and operators whose website is already a lead source — dental, med spa, home services, professional firms — and who lose people after hours or while the owner is on a job.",
    includes: [
      "A named chat employee on the live site",
      "Answers drawn from your pages, FAQs, and pricing rules",
      "Qualification questions you already ask on the phone",
      "Booking or a warm handoff into the calendar or CRM",
      "A transcript the desk can actually read",
    ],
    how: {
      intake:
        "We walk the current site, the questions people actually ask, and the rules for new versus existing clients. The paid ROI analysis says whether chat is the first hire.",
      build:
        "The employee is grounded in your material, connected to the calendar or inbox, and tested against the messy questions — not a demo script.",
      handoff:
        "You get the widget, the prompt and tools, and a short operating note. The owner knows how to change hours, offers, and escalation.",
      measurement:
        "Threads started, qualified, booked, and handed to a human. We watch after-hours capture, not vanity chat counts.",
    },
  },
  {
    slug: "voice-agents",
    group: "front-of-house",
    title: "Voice agents",
    h1: "An AI voice agent on the number you publish.",
    kicker: "Front of house",
    summary:
      "Sarah is the live demo: +1 714-613-8557. Answer, qualify, book — on the phone, including after hours.",
    description:
      "AI voice agents for Orange County SMBs. Missed-call recovery, after-hours answering, and booking. Call Sarah at +1 714-613-8557, then a paid ROI analysis.",
    lede: "The published number is still how a lot of work arrives. A voice employee answers it, follows your rules, and books or qualifies instead of sending everyone to voicemail.",
    forWho:
      "Shops that live on inbound calls: home services, dental and med spa, insurance, anyone whose after-hours voicemail is a quiet leak.",
    includes: [
      "A named voice employee on a real telephone number",
      "Greeting, qualification, and booking rules you already use",
      "Calendar holds and CRM notes",
      "Warm transfer or a callback task when the job is out of scope",
      "Call recordings for review",
    ],
    how: {
      intake:
        "We listen to how the desk actually answers, the edge cases, and what must never be promised. Sarah is the proof of the pattern — your employee gets your voice and your rules.",
      build:
        "Telephony, tools (calendar, CRM, SMS), interruption handling, and a human handoff. We test against real call noise, not a quiet room.",
      handoff:
        "The number, the routing, and a one-page runbook. You know how to reach a person and how we change the script.",
      measurement:
        "Answered, booked, transferred, abandoned. Missed-call recovery is the number that matters, not minutes of audio.",
    },
  },
  {
    slug: "speed-to-lead",
    group: "front-of-house",
    title: "Speed-to-lead",
    h1: "Speed-to-lead and missed-call recovery.",
    kicker: "Front of house",
    summary:
      "Every web, call, and chat lead touched fast, booked or qualified. Seconds, not a callback queue.",
    description:
      "Speed-to-lead and missed-call recovery for SMBs. StorenTech AI in Orange County puts an employee on every inbound web, call, and chat lead.",
    lede: "The first reply is often the only reply that matters. Speed-to-lead is the system that touches every inbound lead — form, call, chat — before the prospect hires someone else.",
    forWho:
      "Operators who already buy ads or rank locally and then wait until morning to call back. Insurance, contractors, dental, home services.",
    includes: [
      "Coverage across web forms, missed calls, and chat",
      "After-hours and on-the-job response",
      "Qualification plus a booking attempt on the real calendar",
      "A record in the CRM so the desk is not starting from zero",
      "Escalation when the lead is hot or the job is unusual",
    ],
    how: {
      intake:
        "We map every inbound pipe — Ads, LSA, website, missed calls — and time-to-first-touch as it is today. The analysis prices the leak.",
      build:
        "The employee is wired to those pipes, not to a parallel toy inbox. Rules for new versus existing, service area, and what can be booked without a person.",
      handoff:
        "Routing is live. The owner sees a daily list of recovered conversations, not a dashboard nobody opens.",
      measurement:
        "Time-to-first-touch, recovered missed calls, booked from after-hours. We compare against the week before the hire, using your numbers.",
    },
  },
  {
    slug: "appointment-setting",
    group: "revenue",
    title: "SDR / appointment setting",
    h1: "AI SDR and appointment setting — booked meetings.",
    kicker: "Revenue",
    summary:
      "Outbound and inbound setting aimed at the calendar. Follow-up, proposal nudges, pipeline hygiene.",
    description:
      "AI SDR and appointment-setting for SMBs. Booked meetings, sales follow-up, and pipeline hygiene from StorenTech AI in Orange County.",
    lede: "The pod books meetings on the calendar you already run. It is not a pile of “unlimited leads.” Follow-up is part of the same hire: notes, tasks, nudges, a pipeline that does not go quiet.",
    forWho:
      "Wealth and mortgage, insurance, professional services, and any operator whose close rate dies in the follow-up, not in the first conversation.",
    includes: [
      "Inbound and outbound setting against named lists or inbound pipes",
      "Holds on the real calendar with your rules",
      "Meeting notes into tasks, email, and CRM",
      "Proposal and stalled-deal nudges",
      "A weekly view of meetings set versus meetings held",
    ],
    how: {
      intake:
        "We take the offer, the list or inbound source, the calendar rules, and what a qualified meeting actually means. The analysis says if this is hire two, not hire one.",
      build:
        "Sequences, voice or mail where it fits, CRM fields, and a stop rule so the pod does not pester a closed file.",
      handoff:
        "The setter is live on the calendar. The owner gets a short briefing on who is being touched and how to pause a name.",
      measurement:
        "Meetings booked, held, and advanced. We do not count dials as the win.",
    },
  },
  {
    slug: "fractional-ops",
    group: "operations",
    title: "Fractional AI operations",
    h1: "A fractional AI operations team.",
    kicker: "Operations",
    summary:
      "Inbox triage, CRM hygiene, follow-up drafts, a weekly ops report. The unglamorous work that shows up in the numbers.",
    description:
      "Fractional AI operations for SMBs: inbox triage, CRM hygiene, follow-up drafts, and a weekly ops report. StorenTech AI, Orange County.",
    lede: "Most operators do not need another dashboard. They need the inbox and the CRM to stop rotting. This hire triages, drafts, logs, and reports — then a person decides.",
    forWho:
      "Owners who are the operations team. Contractors, professional services, clinics that grew past a shoebox and never hired a COO.",
    includes: [
      "Inbox triage and draft replies in your voice",
      "CRM hygiene: tags, missing fields, stale records",
      "Follow-up drafts the desk can send",
      "A weekly ops report in plain language",
      "Escalation rules for anything that needs a principal",
    ],
    how: {
      intake:
        "We sit in the real inbox and CRM for a defined window during the analysis. The map names the three leaks that cost the most hours.",
      build:
        "Routines, not a pile of zaps. Each routine has an owner, a definition of done, and a human checkpoint.",
      handoff:
        "The weekly report starts. The owner knows what the employee may send unattended and what stays a draft.",
      measurement:
        "Hours returned, aging inbox, CRM completeness, follow-ups that actually went out. Quiet numbers.",
    },
  },
  {
    slug: "command-center",
    group: "operations",
    title: "Weekly command center",
    h1: "The owner’s weekly command center.",
    kicker: "Operations",
    summary:
      "A Monday brief: cash, pipeline, stalled deals, reviews, ads, and five actions. The owner walks in knowing what to do.",
    description:
      "A weekly AI command center for SMB owners. Monday brief covering cash, pipeline, stalled deals, reviews, and ads. StorenTech AI in Orange County.",
    lede: "Monday should not start with a scavenger hunt. The command center is a brief the owner can read in ten minutes, with five actions — not a 40-tab export.",
    forWho:
      "Operators who already have tools and still cannot see the week. Fits naturally on the Growth retainer; available as a named job when the first employee is stable.",
    includes: [
      "A Monday brief: cash, pipeline, stalled deals, reviews, ads",
      "Five recommended actions, ranked",
      "Sources named so you can distrust a number",
      "A short live or async review with the principal when you are on Growth",
      "A running log so last week’s actions do not vanish",
    ],
    how: {
      intake:
        "We agree which systems are source of truth and which numbers the owner actually uses to run the company.",
      build:
        "Pulls, a written brief, and a human pass so the five actions are not generic. The format stays boring on purpose.",
      handoff:
        "The brief arrives on the same morning every week. Changing a source is a one-line request.",
      measurement:
        "Actions completed, stalled deals moved, time-to-see-the-week. If the owner stops opening it, we failed.",
    },
  },
  {
    slug: "hr-screening",
    group: "operations",
    title: "HR screening",
    h1: "A recruiting and HR screening desk.",
    kicker: "Operations",
    summary:
      "Role posts, inbound screen, scheduling, scorecards. Screening and coordination — not legal advice.",
    description:
      "AI recruiting and HR screening for SMBs: posts, inbound screen, scheduling, and scorecards. Screening, not legal advice. StorenTech AI, Orange County.",
    lede: "Hiring dies in the inbox. This desk posts, screens inbound, schedules, and fills a scorecard so a person meets the short list — not the whole pile.",
    forWho:
      "Growing home-services and field businesses, clinics adding chairs, any operator who is always “about to hire” and never quite screens.",
    includes: [
      "Role posts written from the job as it is actually done",
      "Inbound screen against a scorecard you approve",
      "Scheduling on the real calendar",
      "A packet for each person who should meet a human",
      "A clear line: screening and coordination, not legal advice",
    ],
    how: {
      intake:
        "We take the role, the must-haves, the deal-breakers, and who is allowed to say yes. The analysis says if hiring is the leak or a distraction.",
      build:
        "The desk is wired to the posting, the inbox, and the calendar. Scorecards stay short enough that someone will use them.",
      handoff:
        "You get the packet format and the stop rules. Changing a must-have is a prompt edit, not a project.",
      measurement:
        "Time-to-screen, interviews held, no-shows, and whether the hiring manager actually used the packets.",
    },
  },
  {
    slug: "reviews",
    group: "growth",
    title: "Reviews and reputation",
    h1: "A review and reputation engine.",
    kicker: "Growth",
    summary:
      "Google and Yelp asks, response drafts, competitor watch. An add-on or an entry hire when reputation is the leak.",
    description:
      "Review and reputation automation for SMBs: Google and Yelp asks, response drafts, competitor watch. StorenTech AI, Orange County.",
    lede: "Reviews are operations with a public face. The engine asks at the right moment, drafts a response, and watches competitors — then a person hits send on anything that could burn.",
    forWho:
      "Local businesses where Google is the storefront: dental, med spa, home services, restaurants attached to a practice. Useful as an add-on once front-of-house is stable.",
    includes: [
      "Ask flows after a completed job or visit",
      "Response drafts in the owner’s tone",
      "A queue for anything unhappy before it goes public-facing",
      "A light competitor watch on the map pack",
      "A monthly read of volume and themes — not a vanity star chase",
    ],
    how: {
      intake:
        "We look at current ask timing, who is afraid to request a review, and what a bad week looks like on the listing.",
      build:
        "Triggers from the job system or calendar, draft replies, and an approval path. Public replies stay under human control.",
      handoff:
        "The queue is in a place the owner already opens. Themes land in the weekly brief if you have one.",
      measurement:
        "Asks sent, reviews received, response time on the unhappy ones. We do not promise a star rating.",
    },
  },
  {
    slug: "content",
    group: "growth",
    title: "Content and distribution",
    h1: "AI content and distribution on a plan.",
    kicker: "Growth",
    summary:
      "Site, YouTube, LinkedIn, and email — a planned set of 12–20 assets, written to the offer.",
    description:
      "AI content and distribution for SMBs: site, YouTube, LinkedIn, and email in a planned 12–20 asset set. StorenTech AI, Orange County.",
    lede: "A planned set of 12–20 assets, written to the offer you actually sell, placed on the site, YouTube, LinkedIn, and email. A calendar with a point.",
    forWho:
      "Operators who need the market to understand the offer, not a social intern. Professional services, wealth, clinics, and agencies that want fulfillment without giving up the client.",
    includes: [
      "A brief tied to the offer and the buyer",
      "12–20 assets in a defined window",
      "Placement on site, YouTube, LinkedIn, and email as agreed",
      "A simple distribution log",
      "Revision against the owner’s voice, not a generic model tone",
    ],
    how: {
      intake:
        "We take the offer, proof you are willing to stand behind, and the channels you will actually maintain.",
      build:
        "Outlines, drafts, owner pass, then production. Distribution is scheduled, not dumped.",
      handoff:
        "Files, captions, and a calendar. You can keep going or we stay on as operator.",
      measurement:
        "Assets shipped, owned-channel traffic, inquiries that mention the piece. We measure shipping and inquiries, not likes.",
    },
  },
  {
    slug: "implementation-studio",
    group: "growth",
    title: "Implementation studio",
    h1: "Grok Bot and AI-employee implementation studio.",
    kicker: "Growth",
    summary:
      "Design the bots, connect the tools, write the routines, train the owner, stay on as operator.",
    description:
      "AI-employee implementation studio: design bots, connect tools, write routines, train the owner, stay on as operator. StorenTech AI, Orange County.",
    lede: "Some clients already know the job. They need the studio: design the employee, connect the tools, write the routines, train the owner, and stay on so it does not rot.",
    forWho:
      "Operators and other agencies who have a named job and a stack, and need someone who will still be here on week twelve.",
    includes: [
      "Job design: tools, rules, escalation",
      "Connections into the CRM, calendar, phone, and inbox you already pay for",
      "Routines written down, not trapped in a chat log",
      "Owner training in a short session, recorded",
      "Ongoing operator time so the employee stays current",
    ],
    how: {
      intake:
        "The analysis still comes first unless you are already a client. We refuse to connect tools without a job definition and a number it should move.",
      build:
        "Build in the client’s environment. Evaluation on real tasks before anyone announces it to the staff.",
      handoff:
        "Runbook, credentials hygiene, and a named operator at StorenTech. Training is part of the job, not an optional PDF.",
      measurement:
        "The metric named in the analysis — bookings, time-to-lead, inbox age. If it does not move, we say so.",
    },
  },
  {
    slug: "white-label",
    group: "growth",
    title: "White-label fulfillment",
    h1: "White-label AI fulfillment for other agencies.",
    kicker: "Growth",
    summary:
      "You keep the client relationship. We build and run the employee behind your brand.",
    description:
      "White-label AI employee fulfillment for agencies. StorenTech builds and operates behind your brand. Orange County studio.",
    lede: "Other agencies keep the client. We build and run the employee behind their brand — voice, chat, ops — under a commercial path the agency can explain.",
    forWho:
      "Agencies that already have trust and do not want to staff a voice-and-ops bench. Not a marketplace listing; a named relationship.",
    includes: [
      "Delivery under your brand",
      "The same path: paid map, first employee, retainer",
      "A private operating channel between principals",
      "Clear scope so the end client is not surprised",
      "No claim that StorenTech is the agency of record",
    ],
    how: {
      intake:
        "Agency principal to Vincent. We agree what the end client will hear, what we will touch, and how money moves.",
      build:
        "Same studio as a direct hire. The agency stays in the room for handoff.",
      handoff:
        "The agency owns the relationship. We own the employee’s uptime and the weekly numbers.",
      measurement:
        "Whatever we sold the end client, reported to the agency first.",
    },
  },
  {
    slug: "ctv-ott",
    group: "growth",
    title: "CTV / OTT",
    h1: "CTV and OTT creative + media, when the map says so.",
    kicker: "Growth",
    summary:
      "Creative and placement through Brandzooka. An available line for the right account — not the hero offer.",
    description:
      "CTV and OTT creative and media via Brandzooka, as an available growth line from StorenTech AI in Orange County. Not the homepage offer.",
    lede: "Connected TV is an available line through Brandzooka: creative plus placement when the account is ready. It is not how we introduce the firm, and it is not a substitute for the first AI employee.",
    forWho:
      "Clients already earning from a front-of-house or revenue hire, with a geographic offer that belongs on television-sized screens. Local services with a real close path.",
    includes: [
      "A brief tied to the offer already proven on the phone or site",
      "Creative sized for CTV/OTT",
      "Placement through Brandzooka",
      "A landing path the voice or chat employee can finish",
      "A stop date and a read on whether inbound moved",
    ],
    how: {
      intake:
        "Only after there is a working inbound employee. We will not send traffic to a voicemail box.",
      build:
        "Creative, placement, and the on-site or phone close. One system, not a side campaign.",
      handoff:
        "Flight dates, codes, and who watches spend. The weekly brief includes the flight if you have a command center.",
      measurement:
        "Spend, inbound that can be tied, booked jobs. If we cannot tie it, we say so.",
    },
  },
];

export function servicesByGroup(id: ServiceGroupId) {
  return services.filter((service) => service.group === id);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
