import { siteFaqPageLd, type SiteFaq } from "@/lib/site-faqs";
import { site } from "@/lib/site";

export const PROMOTION_STICK_PATH = "/make-the-promotion-stick" as const;
export const PROMOTION_STICK_ORIGIN = "https://www.storentechai.com" as const;
export const PROMOTION_STICK_CANONICAL_URL =
  `${PROMOTION_STICK_ORIGIN}${PROMOTION_STICK_PATH}` as const;

export const PROMOTION_STICK_COPY = {
  meta: {
    title:
      "Make the Promotion Stick: a 4-hour, one-on-one AI setup for your new role | StorenTech AI",
    description:
      "Just stepped into a bigger job? In one 4-hour, one-on-one session, StorenTech AI sets up AI around the real work of your new role. You review and approve everything.",
  },
  hero: {
    offerName: "Make the Promotion Stick",
    headline: "Hit the ground ready.",
    subhead:
      "You earned the role. In 4 hours, we set up AI for the work your new seat demands, with less stress and you approving every important output.",
    supportingLine: "4 hours · one-on-one · you approve everything",
    cta: "Book your 4 hours",
  },
  who: {
    heading: "For people who just took on more",
    intro: "Make the Promotion Stick is for you if:",
    bullets: [
      "You were recently promoted or took on a role you are still learning.",
      "There is more on your plate, more people counting on you, and plenty you are still figuring out.",
      "You have tried an AI chatbot and it did not do what you needed, like reformatting a file or a set of charts your boss sent.",
      "You have paid for an AI subscription for a year or less and are not sure how to get real value from it.",
      "You do not want a lecture on AI. You want help with your actual job.",
    ],
    close:
      "You do not need to know one AI tool from another. That is our job.",
  },
  session: {
    heading: "What happens in the 4 hours",
    steps: [
      {
        n: "1",
        title: "Map your new role.",
        body: "We start with you, not the technology. What do you now own? What is still unclear? Where do your time and stress actually go?",
      },
      {
        n: "2",
        title: "Set up Agentic* AI around that work.",
        body: "We set up AI and agents for the tasks that matter in your role, using the tools you already have wherever we can. No generic tour.",
        note: "* AI agents that draft the work while you approve every important output.",
      },
      {
        n: "3",
        title: "Practice on a real task.",
        body: "Bring something real from your job. We work through it together. You review the output and decide what is right.",
      },
      {
        n: "4",
        title: "Leave with your playbook.",
        body: "You walk away with a simple, written playbook for your week, plus a clear next step if you want more help. The next step is optional.",
      },
    ],
  },
  how: {
    heading: "How we work",
    points: [
      {
        title: "Keep costs down.",
        body: "We start with what you already pay for before suggesting anything new.",
      },
      {
        title: "Keep security high.",
        body: "We use least-privilege access and keep sensitive information out of places it does not need to be.",
      },
      {
        title: "Own your data.",
        body: "Your files, accounts, and work stay yours.",
      },
      {
        title: "You make the important calls.",
        body: "AI drafts and organizes. You review and approve. Important decisions always pass through a human.",
      },
    ],
    resultsVary:
      "Many people find they get routine work done faster once AI is set up around their role. Results vary.",
  },
  not: {
    heading: "What this is not",
    points: [
      {
        title: "Not a generic AI class.",
        body: "Everything is built around your role and your real work.",
      },
      {
        title: "Not a sales pitch.",
        body: "You leave with a working setup and a playbook, whether or not you ever work with us again.",
      },
      {
        title: "Not about replacing anyone.",
        body: "AI handles the busywork so you can focus on the parts of the job that need you.",
      },
      {
        title: "Not the AI Opportunity Map.",
        body: "The AI Opportunity Map is our business diagnostic for owners and operators. It looks at a whole company. Make the Promotion Stick is for one person and one role: yours. If you run a business and want the company-level view, see the AI Opportunity Map.",
      },
    ],
  },
  price: {
    heading: "What you get",
    lead: "Make the Promotion Stick: one 4-hour, one-on-one session.",
    includes:
      "Includes: role mapping, AI setup for your work, hands-on practice on a real task, and your written playbook.",
    booking:
      "After you book, we start a short onboarding so your session is set up around your new role. Pay when you book, or choose to pay at your session. Your first session is usually scheduled 2–4 days after you book.",
  },
  next: {
    heading: "After your session",
    intro:
      "Your Make the Promotion Stick playbook is yours to keep and use on your own. If you want to keep going, here's an easy next step:",
    point: {
      title: "When your company is ready.",
      body: "If your team or company wants the bigger picture, the AI Opportunity Map is the place to start.",
    },
    close: "No pressure, and no long-term commitment.",
  },
  cta: {
    heading: "Ready to make your new role a little lighter?",
    body: "One session. Four hours. Built around your work, with you in charge.",
  },
  faqHeading: "FAQ",
  faqs: [
    {
      question: "I only use AI a little. Is this too advanced for me?",
      answer:
        "No. This session is built for people with little to moderate AI experience. We start with your job, use plain language, and go at your pace.",
    },
    {
      question: "Do I need to know which AI tool to use?",
      answer:
        "No. We look at what you already have and help you get value from it. If something else would help, we explain why and what it costs before you decide.",
    },
    {
      question: "What should I bring?",
      answer:
        "A rough list of what your new role involves, and one or two real tasks you would like help with. Leave out anything you are not allowed to share. We will talk through what is safe to use.",
    },
    {
      question: "Will AI make decisions for me?",
      answer:
        "No. AI drafts, sorts, and organizes. You review and approve the output. Important decisions always pass through a human.",
    },
    {
      question: "What happens to my data?",
      answer:
        "Your data is yours. Keeping your work session is opt-in: we only keep it if you ask us to. Nothing is shared. Your data is encrypted, and it isn't stored in the cloud. It stays in our own AI center.",
    },
    {
      question: "Is this the same as the AI Opportunity Map?",
      answer:
        "No. The AI Opportunity Map is a business diagnostic for owners and operators. Make the Promotion Stick is a one-on-one session for an individual in a new role.",
    },
    {
      question: "Will I get faster at my job?",
      answer:
        "Many people find routine work goes faster once AI is set up around their role. Results vary, and the goal is a calmer, more manageable week, not a promise of a number.",
    },
    {
      question: "Is it in person or online?",
      answer:
        "Meet in person in Orange County, CA, or by video from anywhere. If we meet in person somewhere other than your office, or you're more than 15 minutes from our office, a travel or meeting-space fee may apply. We'll quote it before you book.",
    },
    {
      question: "Can I split the 4 hours?",
      answer:
        "Take the 4 hours in one session or split them into shorter sessions.",
    },
    {
      question: "What if I need to reschedule or cancel?",
      answer:
        "Reschedule free with more than 24 hours' notice; within 24 hours there's a $20 fee. Cancel at least 24 hours ahead for a full refund. Cancel within 24 hours and we'll refund 50%, or work out what's fair together.",
    },
    {
      question: "How much does it cost?",
      answer: "$1,000 for the 4-hour, one-on-one session.",
    },
    {
      question: "How do I pay, and when is my session?",
      answer:
        "After you book, we start a short onboarding so your session is set up around your new role. Pay when you book, or choose to pay at your session. Your first session is usually scheduled 2–4 days after you book.",
    },
  ] as const satisfies readonly SiteFaq[],
} as const;

export function promotionStickFaqPageLd() {
  return siteFaqPageLd(PROMOTION_STICK_COPY.faqs);
}

export function promotionStickServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: PROMOTION_STICK_COPY.hero.offerName,
    description: PROMOTION_STICK_COPY.meta.description,
    url: PROMOTION_STICK_CANONICAL_URL,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: PROMOTION_STICK_ORIGIN,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Orange County",
    },
  };
}
