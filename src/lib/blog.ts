import { site } from "@/lib/site";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  datePublished: string;
  faqs: readonly BlogFaq[];
};

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Do not invent duration, rankings, traffic, ROI %, or case stats.
 */
export const roiAnalysisFaqs = [
  {
    question: "What is an Automation ROI Analysis?",
    answer:
      "At StorenTech AI (a full-service AI agency), every client starts with a paid Automation ROI Analysis: we map your workflows with your real numbers, rank which AI employee to hire first, and give a go/no-go. Typical fee $1,000 ($2,000–$3,000 when complex).",
  },
  {
    question: "How much does StorenTech’s ROI analysis cost?",
    answer:
      "Typically $1,000. Complex scopes run $2,000–$3,000 (multi-location, messy stack, or broader than front-of-house).",
  },
  {
    question: "Is the AI audit free?",
    answer:
      "No. StorenTech’s Automation ROI Analysis is never complimentary. Free audits are sales calls; this is a paid map.",
  },
  {
    question: "What happens if the numbers don’t work?",
    answer:
      "You keep the roadmap and we don’t push a hire. The analysis exists to produce a clear go/no-go — including no-go.",
  },
  {
    question: "What is the first AI employee usually hired to do?",
    answer:
      "Usually voice + chat for speed-to-lead, booking, and CRM — the front-of-house jobs where missed conversations cost the most.",
  },
  {
    question: "What’s the difference between the $5,000 and $7,500 retainers?",
    answer:
      "AI Employee ($5,000/mo): one bot, one workflow per month, reporting. Growth ($7,500/mo): two bots, outbound + inbox, weekly command center.",
  },
] as const satisfies readonly BlogFaq[];

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "what-is-an-automation-roi-analysis",
    title:
      "What Is an Automation ROI Analysis? (And Why StorenTech Won’t Start Free)",
    metaTitle: "What Is an Automation ROI Analysis? | StorenTech AI",
    description:
      "StorenTech AI is a full-service AI agency. Every client starts with a paid Automation ROI Analysis ($1,000 typ.) that maps leaks and ranks the first AI hire — never a free sales call.",
    datePublished: "2026-09-21",
    faqs: roiAnalysisFaqs,
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function postPath(slug: string) {
  return `/blog/${slug}`;
}

export function postUrl(slug: string) {
  return `${site.url}${postPath(slug)}`;
}
