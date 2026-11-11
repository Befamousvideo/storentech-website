import { LAW_INTAKE_READY, LAW_INTAKE_URL } from "@/lib/ad-landing-lead";

/**
 * Approved /law hero and meta copy (Tony, 2026-11-11), stored as data so
 * the page cannot drift. Do not rewrite, embellish, or add marketing claims.
 */
export const LAW_COPY = {
  meta: {
    title: "AI Intake and Admin Help for Small Law Firms | StorenTech AI",
    description:
      "StorenTech AI helps small law firms find where intake and admin work slips, starting with a free conversation. Attorneys keep every legal decision.",
    diagramAlt:
      "Illustrative workflow: a new inquiry is organized for staff, then reviewed by a person at the firm.",
  },
  hero: {
    audience: "For small law firms",
    h1: "Less of your firm's day on intake and admin",
    subhead:
      "We find where calls, inquiries and follow-ups slip through the cracks, then help fix the ones worth fixing. Attorneys keep legal judgment.",
    ctaLabel: "Find what to fix",
    note: "A short form asks for your name, firm, practice area, phone and email, and nothing about your clients or their matters. We'll follow up to set up a free 15-minute conversation. The AI Opportunity Map is a separate, paid report.",
    secondary: {
      label: "How the AI Opportunity Map works",
      href: "/opportunity",
    },
    diagram: {
      steps: [
        "New inquiry",
        "Organized for your staff",
        "Reviewed by a person at your firm",
      ],
      caption: "Illustrative workflow, not a product screenshot.",
    },
  },
  opportunities: {
    heading: "Five places AI can take work off your staff's plate",
    cards: [
      {
        n: "01",
        title: "After-hours inquiries",
        body: "Calls and web inquiries that arrive after hours can be captured with basic contact details and a callback request. Your staff decides the next step in the morning, and legal questions go to an attorney.",
      },
      {
        n: "02",
        title: "Intake organization",
        body: "The details your firm already asks for can be gathered into one summary for review, instead of being retyped from email and notes. Staff checks it for completeness; an attorney decides what matters and what happens next.",
      },
      {
        n: "03",
        title: "Conflict-check preparation",
        body: "The names your firm needs for a conflict check can be collected up front, following your firm's instructions. Your attorneys run the check and make the decision.",
      },
      {
        n: "04",
        title: "Consultation requests and reminders",
        body: "Requests and reminders can follow the rules your firm sets. Staff confirms the calendar and handles exceptions.",
      },
      {
        n: "05",
        title: "Follow-up and document checklists",
        body: "Approved reminders and checklists can keep paperwork moving. A person your firm authorizes approves anything sensitive before it goes out, and advice stays with your attorneys.",
      },
    ],
    footer:
      "Which of these fit your firm, and how, is what the analysis is for.",
  },
  engagement: {
    heading: "How an engagement works",
    steps: [
      {
        n: "1",
        title: "Free initial conversation",
        body: "A 15-minute conversation about how intake and admin work move through your firm today, and whether AI is likely to help. No cost and no commitment.",
      },
      {
        n: "2",
        title: "AI Opportunity Map (paid report)",
        subtitle: "Automation ROI Analysis",
        body: "If there's a fit, we review your workflow in depth and deliver a written report: where time is going, which opportunities to consider, the assumptions behind them, and what to do first. It's an analysis, not a setup. Details and pricing are on the AI Opportunity Map page.",
      },
      {
        n: "3",
        title: "Build Plan (agreed separately)",
        body: "If you want to act on the report, we scope a Build Plan for the work you choose. It's a separate decision, made after you've read the report.",
      },
    ],
    secondary: {
      label: "How the AI Opportunity Map works",
      href: "/opportunity",
    },
  },
  analysis: {
    heading: "What the analysis looks like",
    columns: [
      {
        title: "What we look at",
        body: "how inquiries arrive today, the questions your firm already asks, who handles what, and what information is appropriate to use.",
        items: [
          "how inquiries arrive today",
          "the questions your firm already asks",
          "who handles what",
          "what information is appropriate to use",
        ],
      },
      {
        title: "How we map it",
        body: "each step of the workflow, with the points where a person reviews.",
        items: [
          "each step of the workflow",
          "the points where a person reviews",
        ],
      },
      {
        title: "What you get",
        body: "a workflow map, the assumptions behind it, candidate opportunities and the decisions left for your firm.",
        items: [
          "a workflow map",
          "the assumptions behind it",
          "candidate opportunities",
          "the decisions left for your firm",
        ],
      },
    ],
    caption:
      "Illustrative example with placeholder content, not a client case study or a sample of a delivered report.",
    supporting:
      "The AI Opportunity Map is a report. It tells you where AI could save your team time and where it isn't worth it, so you can decide what, if anything, to build.",
  },
  rules: {
    heading: "How attorneys stay in charge",
    intro:
      "Professional duties stay with your attorneys. We build around the State Bar of California's current Practical Guidance for the Use of Generative Artificial Intelligence in the Practice of Law and ABA Formal Opinion 512.",
    points: [
      {
        title: "Attorneys supervise",
        body: 'The State Bar\'s guidance names "autonomously facilitating client intake" as an example of agentic AI and says lawyers must not let such systems communicate legal advice "without meaningful attorney supervision and review." We design intake so your attorneys stay in charge of anything that touches legal judgment.',
      },
      {
        title: "Your firm decides what information is used",
        body: "We plan workflows around the information your firm decides is appropriate, with your attorneys deciding what's kept.",
      },
      {
        title: "A person reviews before sensitive messages go out",
        body: 'The guidance warns against "autonomous external transmission of client information, including automated communications, filings, or data transfers, without appropriate safeguards and human review." We plan for review before anything sensitive leaves the firm.',
      },
    ],
    links: [
      {
        label: "State Bar of California Practical Guidance (PDF)",
        href: "https://www.calbar.ca.gov/sites/default/files/portals/0/documents/ethics/Generative-AI-Practical-Guidance.pdf",
      },
      {
        label: "ABA on Formal Opinion 512",
        href: "https://www.americanbar.org/news/abanews/aba-news-archives/2024/07/aba-issues-first-ethics-guidance-ai-tools/",
      },
    ],
    footnote:
      "This is general information, not legal advice. Your attorneys decide what your duties require.",
  },
  faqs: [
    {
      question: "What happens in the free initial conversation?",
      answer:
        "It's 15 minutes. We ask how calls, inquiries and follow-ups move through your firm today and tell you honestly whether AI is likely to help. There's no cost and no commitment.",
    },
    {
      question: "What's paid, and what does the report include?",
      answer:
        "The AI Opportunity Map is a paid report. It maps your current workflow, lists the opportunities worth considering with their assumptions, and recommends what to do first. Pricing is on the AI Opportunity Map page.",
    },
    {
      question: "Is a build included in the report?",
      answer:
        "No. Any build is scoped in a separate Build Plan, and only if you decide to go ahead after reading the report.",
    },
    {
      question: "Who keeps legal judgment and staff responsibilities?",
      answer:
        "Your firm. Attorneys keep every legal decision, including advice, conflicts and who the firm represents. Staff keeps the handoffs. The tools handle administrative steps.",
    },
    {
      question: "What information should we share at this stage?",
      answer:
        "Only how your office works: how inquiries arrive, who handles them, and the tools you use. Please don't share client names or matter details in the form or the conversation.",
    },
    {
      question: "How do you decide what works with the tools we already use?",
      answer:
        "We review your current tools during the analysis. Whether something can connect depends on those tools, and the report says what's realistic.",
    },
  ],
  faqHeading: "Common questions",
  headerCtaLabel: "Free initial conversation",
  headerCtaCompactLabel: "Free conversation",
  closing: {
    heading: "Start with a free initial conversation",
    ctaLabel: "Find what to fix",
    note: "A short form, then a free 15-minute conversation. The AI Opportunity Map is a separate, paid report.",
  },
} as const;

export const LAW_INTAKE_HOLD_NOTE =
  "Preview only: the intake route is pending verification. This button is inactive.";

export { LAW_INTAKE_READY, LAW_INTAKE_URL };

export const LAW_CANONICAL_PATH = "/law";
export const LAW_CTA_ANCHOR = "free-initial-conversation";
