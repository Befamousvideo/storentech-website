import { site } from "@/lib/site";
import { siteFaqs as homepageFaqs } from "@/lib/site-faqs";

export const FAQ_HELPER_KNOWLEDGE_VERSION = "2026-11-07.preview.1" as const;

export type FaqKnowledgeSource = {
  path: string;
  label: string;
};

export type FaqKnowledgeEntry = {
  id: string;
  version: typeof FAQ_HELPER_KNOWLEDGE_VERSION;
  question: string;
  answer: string;
  sources: readonly FaqKnowledgeSource[];
  matchPhrases: readonly string[];
  keywords: readonly string[];
  requiredAny: readonly (readonly string[])[];
};

const SI_FAQ = homepageFaqs[0];

export const FAQ_HELPER_HANDOFF = {
  label: site.offer.cta,
  hrefFrom: "site.intakeUrl",
} as const;

export const faqKnowledgeEntries = [
  {
    id: "who-we-are",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "What does StorenTech AI do?",
    answer:
      "StorenTech AI is a principal-led automation firm based in Orange County, California. We find where time or revenue leaks, then fix what pays — human touch stays.",
    sources: [
      { path: "src/app/about/page.tsx", label: "About" },
      { path: "src/lib/site.ts", label: "Site copy" },
    ],
    matchPhrases: [
      "what does storentech",
      "what is storentech",
      "who is storentech",
      "who are you",
      "what do you do",
      "what does your firm",
      "tell me about storentech",
    ],
    keywords: ["storentech", "firm", "company", "automation"],
    requiredAny: [
      ["storentech"],
      ["who", "you"],
      ["what", "do"],
      ["what", "firm"],
      ["about", "storentech"],
    ],
  },
  {
    id: "opportunity-map",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "What is an AI Opportunity Map?",
    answer: `${site.offer.primary} It is paid work, not a complimentary sales call.`,
    sources: [
      { path: "src/lib/site.ts", label: "Site copy" },
      { path: "src/app/opportunity/page.tsx", label: "Opportunity Map" },
      { path: "src/app/how-it-works/page.tsx", label: "How it works" },
    ],
    matchPhrases: [
      "opportunity map",
      "opportunity mapping",
      "automation roi analysis",
      "what is the map",
      "what's the map",
    ],
    keywords: ["opportunity", "map", "analysis", "leaks"],
    requiredAny: [
      ["opportunity", "map"],
      ["opportunity", "mapping"],
      ["roi", "analysis"],
      ["what", "map"],
    ],
  },
  {
    id: "how-it-works",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "How does working with StorenTech start?",
    answer:
      "The engagement has three moves, in that order: a paid AI Opportunity Map, then a Build Plan, then partnership scoped from the written map. Map leaks first. Then the Build Plan — people still in the loop, out front with customers.",
    sources: [
      { path: "src/app/how-it-works/page.tsx", label: "How it works" },
      { path: "src/lib/site.ts", label: "Site copy" },
    ],
    matchPhrases: [
      "how it works",
      "how does it work",
      "how do you work",
      "how we start",
      "how do i start",
      "how does working",
      "working with you",
      "get started",
      "three moves",
      "engagement steps",
    ],
    keywords: ["works", "process", "start", "steps", "engagement", "working"],
    requiredAny: [
      ["how", "work"],
      ["how", "start"],
      ["how", "process"],
      ["three", "moves"],
      ["engagement"],
    ],
  },
  {
    id: "map-price",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "How much is an AI Opportunity Map?",
    answer: `Typical fee ${site.prices.analysisTypical}. ${site.prices.analysisComplex} when the operation is complex — multiple locations, a messy stack, or a wider catalog. This is paid work. It is not a complimentary sales call.`,
    sources: [
      { path: "src/app/how-it-works/page.tsx", label: "How it works" },
      { path: "src/lib/site.ts", label: "Site copy" },
      { path: "src/app/about/page.tsx", label: "About" },
    ],
    matchPhrases: [
      "how much is the map",
      "how much does the map",
      "map cost",
      "map fee",
      "opportunity map cost",
      "opportunity map price",
      "starting at $1,000",
      "starting at 1000",
    ],
    keywords: ["cost", "price", "fee", "much", "1000", "$1,000"],
    requiredAny: [
      ["map", "cost"],
      ["map", "price"],
      ["map", "fee"],
      ["map", "much"],
      ["analysis", "cost"],
      ["analysis", "price"],
      ["opportunity", "cost"],
      ["opportunity", "price"],
    ],
  },
  {
    id: "build-plan",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "What happens after the map?",
    answer: `${site.offer.later} ${site.offer.services}`,
    sources: [
      { path: "src/lib/site.ts", label: "Site copy" },
      { path: "src/app/opportunity/page.tsx", label: "Opportunity Map" },
    ],
    matchPhrases: [
      "build plan",
      "after the map",
      "what do you build",
      "what happens after",
    ],
    keywords: ["build", "plan", "after", "voice", "chat"],
    requiredAny: [
      ["build", "plan"],
      ["after", "map"],
      ["what", "build"],
    ],
  },
  {
    id: "retainers",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "Do you publish retainer pricing?",
    answer:
      "We do not publish retainers on this site. Ongoing work is scoped from the evidence in your analysis. Terms follow what the analysis shows. No public retainer menu on this site.",
    sources: [
      { path: "src/app/about/page.tsx", label: "About" },
      { path: "src/app/how-it-works/page.tsx", label: "How it works" },
      { path: "src/app/work/page.tsx", label: "Work" },
    ],
    matchPhrases: [
      "retainer",
      "monthly fee",
      "ongoing pricing",
      "partner after the map",
    ],
    keywords: ["retainer", "retainers", "ongoing", "menu"],
    requiredAny: [
      ["retainer"],
      ["retainers"],
      ["ongoing", "pric"],
      ["ongoing", "fee"],
      ["partner", "after"],
    ],
  },
  {
    id: "who-we-serve",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "Who do you work with?",
    answer:
      "We are selective about clients, not exclusive to an industry. Examples we already understand: dental and med spa, insurance, residential contractors, wealth and mortgage, professional services, home services. Manufacturing and the right larger project are on the table.",
    sources: [
      { path: "src/app/about/page.tsx", label: "About" },
      { path: "src/lib/site.ts", label: "Site copy" },
      { path: "src/app/page.tsx", label: "Home" },
    ],
    matchPhrases: [
      "who do you work with",
      "what industries",
      "who are your clients",
      "do you work with contractors",
      "dental",
      "med spa",
    ],
    keywords: [
      "industries",
      "contractors",
      "dental",
      "insurance",
      "manufacturing",
    ],
    requiredAny: [
      ["who", "work"],
      ["what", "industries"],
      ["contractors"],
      ["dental"],
      ["med", "spa"],
      ["insurance"],
      ["manufacturing"],
      ["who", "serve"],
    ],
  },
  {
    id: "super-intelligence",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: SI_FAQ.question,
    answer: SI_FAQ.answer,
    sources: [
      { path: "src/lib/site-faqs.ts", label: "Home FAQ" },
      { path: "src/app/page.tsx", label: "Home" },
    ],
    matchPhrases: [
      "super intelligence",
      "is si different",
      "si different from ai",
      "si vs ai",
    ],
    keywords: ["super", "intelligence", "si"],
    requiredAny: [
      ["super", "intelligence"],
      ["si", "ai"],
      ["si", "different"],
    ],
  },
  {
    id: "humans-in-loop",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "Do humans stay in the loop?",
    answer: site.offer.capacity,
    sources: [
      { path: "src/lib/site.ts", label: "Site copy" },
      { path: "src/app/page.tsx", label: "Home" },
    ],
    matchPhrases: [
      "human touch",
      "humans in the loop",
      "human in the loop",
      "people in the loop",
    ],
    keywords: ["human", "humans", "loop", "touch"],
    requiredAny: [
      ["human", "loop"],
      ["humans", "loop"],
      ["human", "touch"],
      ["people", "loop"],
    ],
  },
  {
    id: "confidentiality",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "Do you publish client names?",
    answer:
      "You won't find client logos here. At StorenTech AI, privacy, security, and confidentiality come first, so we don't publish or share who our clients are, not on this site and not in meetings. We'll gladly walk you through anonymized examples of the work.",
    sources: [{ path: "src/app/about/page.tsx", label: "About" }],
    matchPhrases: [
      "client logos",
      "publish clients",
      "who are your customers",
      "case studies",
      "confidential",
    ],
    keywords: ["logos", "confidential", "privacy", "names"],
    requiredAny: [
      ["logo"],
      ["logos"],
      ["confidential"],
      ["privacy"],
      ["publish", "client"],
      ["customer", "names"],
      ["case", "stud"],
    ],
  },
  {
    id: "location",
    version: FAQ_HELPER_KNOWLEDGE_VERSION,
    question: "Where is StorenTech AI based?",
    answer: `StorenTech AI is based in ${site.location.full}.`,
    sources: [
      { path: "src/app/about/page.tsx", label: "About" },
      { path: "src/lib/site.ts", label: "Site copy" },
    ],
    matchPhrases: [
      "where are you based",
      "where is storentech",
      "where are you located",
      "where are you",
      "what city",
    ],
    keywords: ["located", "based", "where", "orange", "county"],
    requiredAny: [
      ["where", "based"],
      ["where", "located"],
      ["where", "storentech"],
      ["where", "you"],
      ["what", "city"],
      ["orange", "county", "based"],
      ["orange", "county", "located"],
      ["orange", "county", "you"],
    ],
  },
] as const satisfies readonly FaqKnowledgeEntry[];

export type FaqKnowledgeId = (typeof faqKnowledgeEntries)[number]["id"];

export function getFaqKnowledgeEntry(id: string) {
  return faqKnowledgeEntries.find((entry) => entry.id === id);
}
