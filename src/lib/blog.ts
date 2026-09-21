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
  indexCta?: string;
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

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Do not invent SOC2, certifications, case stats, or security product claims.
 */
export const aiSecurityFaqs = [
  {
    question: "Why should SMB operators care about frontier-lab eval incidents?",
    answer:
      "Because the same class of capability — models that can chain tools, search, and act — is what you’re buying when you hire an AI employee. Eval containment failures are a reminder that isolation and permissions have to be designed, not assumed.",
  },
  {
    question: "Does StorenTech train models on my call and chat data?",
    answer:
      "No. We do not train foundation models on client call/chat data. We minimize retention and prefer working in your systems.",
  },
  {
    question: "What is least privilege for an AI employee?",
    answer:
      "Only the integrations and scopes the named role needs — for example booking and CRM update for a front-of-house hire — plus audit logs so sensitive actions are reviewable. Not admin on every SaaS app.",
  },
  {
    question: "Who approves sensitive actions?",
    answer:
      "Humans. Sensitive agent actions require human approval. The AI employee does the grind; people stay accountable for irreversible or high-risk moves.",
  },
  {
    question: "Do you go straight to production?",
    answer:
      "No. We use sandbox / staging before promoting an AI employee to production on live channels and live customer data.",
  },
  {
    question: "How does security show up in the Automation ROI Analysis?",
    answer:
      "Vendor and model security diligence is part of the paid ROIA: what tools get connected, what data moves, what approvals exist, and whether the first hire’s access map is sane. See What Is an Automation ROI Analysis?",
  },
  {
    question: "Is StorenTech a full-service AI agency?",
    answer:
      "Yes. StorenTech AI is a full-service AI agency. Every client starts with a paid Automation ROI Analysis — never a complimentary sales call — then hire and retainer if the math and the access map hold. Path: How it works.",
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
  {
    slug: "ai-security-for-ai-employees",
    title: "AI Security for AI Employees (Process, Not Vibes)",
    metaTitle: "AI Security for AI Employees | StorenTech AI",
    description:
      "Frontier AI capability + eval containment failures mean SMBs need process, not vibes. How StorenTech hires AI employees after a paid Automation ROI Analysis — with retention, least privilege, human approval, and staging.",
    datePublished: "2026-09-21",
    faqs: aiSecurityFaqs,
    indexCta: "Read the post",
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
