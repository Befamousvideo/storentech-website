import { BOOKING_CTA_HREF } from "@/lib/site";

/**
 * Visitor-facing copy for /contractors.
 * Edit this file when the draft changes. Editorial labels from the draft
 * (Meta, Hero, Section numbers, drive links) are not rendered.
 *
 * Primary buttons use "free 15-minute intro call" and BOOKING_CTA_HREF.
 * The draft button text was "Book a 15-minute intro call".
 */

export const CONTRACTORS_PATH = "/contractors" as const;

export const CONTRACTORS_CANONICAL_URL =
  "https://www.storentechai.com/contractors" as const;

export const CONTRACTORS_CTA_LABEL = "Book a free 15-minute intro call";

export const CONTRACTORS_SECONDARY_CTA_LABEL = "Get your AI Opportunity Map";

export const CONTRACTORS_SECONDARY_CTA_SUPPORT =
  "Want the full picture? A paid deep-dive into where AI saves you time and money.";

export const contractorsVideo = {
  src: "/videos/ai-voice-agent-small-business.mp4",
  poster: "/videos/ai-voice-agent-small-business-poster.jpg",
  width: 1080,
  height: 1080,
  caption: "Three calls after hours. Three jobs on the calendar by morning.",
} as const;

export const contractorsPage = {
  metaTitle: "AI Phone Agent for SoCal Contractors | StorenTech AI",
  metaDescription:
    "Rain season means more calls than your crew can answer. An AI phone agent from StorenTech AI answers every call, day or night, and books the job on your calendar. Orange County, CA.",
  h1: "Every call answered. Every job booked. Even when you're on a roof.",
  subhead:
    "StorenTech AI sets up an AI phone agent that answers your calls after hours and during the rain-season rush, asks the right questions, and puts the job on your calendar. You wake up to booked work, not voicemails.",
  ctaLabel: CONTRACTORS_CTA_LABEL,
  ctaHref: BOOKING_CTA_HREF,
  ctaSupport:
    "We'll talk through your calls and jobs and whether AI fits.",
  heroSecondary: {
    label: CONTRACTORS_SECONDARY_CTA_LABEL,
    href: "/opportunity",
    support: CONTRACTORS_SECONDARY_CTA_SUPPORT,
  },
  problem: {
    heading: "The problem: rain season fills your phone, not your calendar",
    paragraphs: [
      'When the rain hits Southern California, the phone lights up: leaks, backed-up drains, storm damage, "can you come out today?" Your crew is already on a job, the office has gone home, and the call goes to voicemail.',
      "Most homeowners don't leave a message. They call the next company on the list. That job was yours, and you never knew it rang.",
    ],
    costsLabel: "What it costs you:",
    costs: [
      "After-hours and weekend calls that roll to voicemail",
      "Callers who hang up and dial a competitor",
      "Owners and techs answering the phone instead of doing the work",
      "Estimates that go out and never get a follow-up",
    ],
  },
  agent: {
    heading: "What the AI phone agent does for you",
    intro:
      "You get a phone agent that picks up on the first ring, every time, and sounds like part of your team.",
    points: [
      {
        lead: "Answers 24/7.",
        rest: "Nights, weekends, holidays and the storm-day rush.",
      },
      {
        lead: "Asks your questions.",
        rest: "What's the problem, where's the property, how urgent is it, new or existing customer.",
      },
      {
        lead: "Books on your real calendar.",
        rest: "It holds the slot using the rules you already use, so you don't get double-booked.",
      },
      {
        lead: "Flags the urgent ones.",
        rest: "A true emergency gets routed to the person you choose, the way you set it up.",
      },
      {
        lead: "Hands you a clean summary.",
        rest: "Every call comes with a short note, so your team knows what they're walking into.",
      },
    ],
    close:
      "Your people stay out front with customers. The AI takes the grind of answering, qualifying and booking.",
  },
  grind: {
    heading: "More of the grind, handled",
    intro:
      "Once the phone is covered, the same approach works on the follow-up work that never quite gets done:",
    points: [
      {
        lead: "Estimate follow-ups.",
        rest: 'Polite nudges on open estimates, so a "let me think about it" doesn\'t go quiet.',
      },
      {
        lead: "Review requests.",
        rest: "A review ask after the job is done, plus draft replies for you to approve.",
      },
      {
        lead: "Dispatch and arrival updates.",
        rest: "Text updates that tell customers when the tech is on the way.",
      },
      {
        lead: "Website chat.",
        rest: "The same coverage on the site you already have, so web leads get booked too.",
      },
      {
        lead: "Owner's Monday brief.",
        rest: "Pipeline, stalled jobs, reviews and five things to do this week, in one place.",
      },
    ],
    close:
      "Built for roofers, remodelers, solar and pool companies, and plumbing and HVAC shops running several trucks.",
  },
  start: {
    heading: "How it starts",
    steps: [
      {
        lead: "Book a 15-minute intro call at no cost.",
        rest: "Tell us how calls come in today and where jobs slip away.",
      },
      {
        lead: "Get your AI Opportunity Map.",
        rest: "A paid analysis that shows where time and revenue leak in your business, and which AI fixes pay back first.",
      },
      {
        lead: "Build what pays.",
        rest: "We set up the phone agent (and anything else the map ranks first), with people in the loop and clear limits on what the AI is allowed to do.",
      },
    ],
    close:
      "Your calls and customer details are handled with care, and the AI only does what you've approved. Ask us about safeguards on the intro call.",
  },
  example: {
    heading: "Example math (illustration only, not a promise)",
    label: "Example only.",
    setup:
      "Say rain season brings you 17 extra jobs a month that would otherwise have gone to voicemail, and your average job is $600.",
    equation: "17 jobs × $600 =",
    result: "about $10,200 a month in work you'd otherwise miss.",
    disclaimer:
      "These are made-up numbers to show the math. Your numbers will be different; the AI Opportunity Map works from your real call volume and job values.",
  },
  faqs: [
    {
      question: "What does StorenTech AI do for contractors?",
      answer:
        "StorenTech AI sets up AI phone agents and automations for Southern California contractors. The phone agent answers every call, day or night, asks your intake questions and books the job on your calendar, so leads don't go to the next company.",
    },
    {
      question: "Will the AI phone agent sound like a robot to my customers?",
      answer:
        "StorenTech AI builds the agent to sound like part of your team, using your company name, your questions and your booking rules. Callers get a real answer and a booked appointment instead of voicemail.",
    },
    {
      question: "What happens with an emergency call at 2 a.m.?",
      answer:
        "You decide. StorenTech AI sets the agent up to flag urgent calls, such as an active leak, and route them to the person you choose, while routine calls get booked for the next open slot.",
    },
    {
      question: "Does it work with the calendar my office already uses?",
      answer:
        "StorenTech AI books on your real calendar and follows the rules you already use, like service areas, job types and new versus existing customers. Exact setup is scoped on the intro call.",
    },
    {
      question: "What kinds of contractors does StorenTech AI work with?",
      answer:
        "Roofers, remodelers, solar and pool companies, and plumbing and HVAC shops with several trucks across Orange County and Southern California. A good fit is a business with steady call volume and a calendar that matters.",
    },
    {
      question: "How do I get started with StorenTech AI?",
      answer:
        "Book a 15-minute intro call at no cost. If there's a fit, the next step is a paid AI Opportunity Map that shows which fixes pay back first.",
    },
  ],
  finalCta: {
    headline: "Rain season is coming. Make sure every call gets answered.",
    body: "In 15 minutes, we'll look at how calls reach you today and where jobs are slipping to the next company. The intro call is at no cost.",
    secondaryLabel: CONTRACTORS_SECONDARY_CTA_LABEL,
    secondaryHref: "/opportunity",
    secondarySupport: CONTRACTORS_SECONDARY_CTA_SUPPORT,
  },
  signoff: "StorenTech AI · Full-service AI agency · Orange County, CA",
} as const;
