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
    question: "What is an AI Opportunity Map?",
    answer:
      "At StorenTech AI (a full-service AI agency), every client starts with a paid AI Opportunity Map — an AI Opportunity Map: we map your workflows with your real numbers, rank which AI employee to hire first, and give a go/no-go. Typical fee $1,000 ($2,000–$3,000 when complex).",
  },
  {
    question: "How much does StorenTech’s AI Opportunity Map cost?",
    answer:
      "Typically $1,000. Complex scopes run $2,000–$3,000 (multi-location, messy stack, or broader than front-of-house).",
  },
  {
    question: "Is the AI audit free?",
    answer:
      "No. StorenTech’s AI Opportunity Map is never complimentary. Free audits are sales calls; this is a paid map.",
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
    question: "How is ongoing work priced after the analysis?",
    answer:
      "Ongoing operator partnership is scoped after the map. We do not name a monthly retainer until the AI Opportunity Map knows the workload and locations.",
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
    question: "How does security show up in the AI Opportunity Map?",
    answer:
      "Vendor and model security diligence is part of the paid AI Opportunity Map: what tools get connected, what data moves, what approvals exist, and whether the first hire’s access map is sane. See What Is an AI Opportunity Map?",
  },
  {
    question: "Is StorenTech a full-service AI agency?",
    answer:
      "Yes. StorenTech AI is a full-service AI agency. Every client starts with a paid AI Opportunity Map — never a complimentary sales call — then hire and retainer if the math and the access map hold. Path: How it works.",
  },
] as const satisfies readonly BlogFaq[];

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Do not invent $ savings, payback, or % cheaper. Class 107: no tel:/digits.
 */
export const mastermindHybridFaqs = [
  {
    question: "What is Mastermind hybrid AI?",
    answer:
      "It is StorenTech’s pattern of running local open-source models for volume, private, and already-solved work, and frontier models when judgment or quality earns the token spend — with orchestration (control plane) routing between them. Hardware such as DGX Spark–class local inference is optional and AI Opportunity Map–driven.",
  },
  {
    question: "Does StorenTech sell NVIDIA DGX Spark to every client?",
    answer:
      "No. Not every SMB needs a Spark. We design hybrid automation after a paid AI Opportunity Map; on-prem compute is in scope only when the workload and privacy case justify it.",
  },
  {
    question: "Will local inference eliminate frontier API costs?",
    answer:
      "No — and we do not claim a published % cheaper. Local inference (and the electricity that runs it) defrays what you would otherwise burn on volume frontier tokens. Frontier still earns its keep on hard jobs. Exact economics belong in your AI Opportunity Map, not a blog table.",
  },
  {
    question: "Is OpenClaw a product you sell off the shelf?",
    answer:
      "OpenClaw is part of the orchestration / control-plane approach we use and refine on our own stack (including StorenTechAI26). Client engagements are designed as ops automation — agents, workflows, routing, and governance — not a dump of internal tool names as a SKU list.",
  },
  {
    question: "How does security relate to hybrid Mastermind?",
    answer:
      "Keeping more repetitive and sensitive inference local can mean less data leaving the building by default. That is a teaser, not a Class how-to. Practices we claim publicly — retention discipline, least privilege, human approval, staging, diligence inside the AI Opportunity Map — are covered in AI Security for AI Employees.",
  },
  {
    question: "Is StorenTech a full-service AI agency?",
    answer:
      "Yes. StorenTech AI is a full-service AI agency. Every client starts with a paid AI Opportunity Map — never a complimentary sales call — then hire and retainer if the math holds. See How it works.",
  },
  {
    question: "How do I start?",
    answer:
      "1. Start your AI Opportunity Map — Contact (primary). 2. Hear the work live — Call Sarah (voice demo). 3. Read the commercial path — How it works.",
  },
] as const satisfies readonly BlogFaq[];

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the six on-page Q&As word for word. No HowTo schema.
 */
export const zapierWebhooksAiAgentsFaqs = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. You don't build anything. StorenTech sets it up, tests it, and shows your team how to review and approve the drafts.",
  },
  {
    question: "Is Zapier expensive? Do I need a paid plan?",
    answer:
      "Zapier has a Free plan, but the webhook feature we use to connect apps instantly isn't on it. Zapier lists that feature on its paid plans (Professional, Team, and Enterprise). Zapier's plans and pricing change, so check their current plan page. We'll tell you which plan your setup needs during the AI Opportunity Map.",
  },
  {
    question: "Will the AI send emails on its own?",
    answer:
      "No. In StorenTech builds, the agent drafts and prepares. A person approves every outgoing email, every public reply, and anything involving money.",
  },
  {
    question: "What if something breaks?",
    answer:
      "Because a person approves anything that goes out, a hiccup shouldn't turn into a wrong email landing in a customer's inbox. We test with sample data before going live, and a Zap can be turned off at any time. There's also an emergency stop, which we walk through with you during setup.",
  },
  {
    question: "Is my customer data safe?",
    answer:
      "It can be, with good habits. Zapier's own advice is to treat a webhook address like a password. We send the agent only the details it needs for the job, keep passwords and keys out of shared places, and limit what each agent can access.",
  },
  {
    question: "What should I automate first?",
    answer:
      "Whatever is costing you the most time or money right now. For many Orange County businesses, that's answering leads or following up. But the honest answer comes from your own workflows. That's what the paid AI Opportunity Map is for.",
  },
] as const satisfies readonly BlogFaq[];

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the eight on-page Q&As word for word.
 */
/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the seven on-page Q&As word for word. No HowTo schema.
 */
export const aiAgentCostControlsFaqs = [
  {
    question: "How much does it cost to run an AI agent?",
    answer:
      "It depends on the job, how often it runs, which model you use, and how many tools it calls. There is no honest flat number that fits every Orange County business. What you can do is set a budget, hard caps, and cost-per-workflow tracking so the bill doesn't surprise you. That's part of what a paid AI Opportunity Map is for.",
  },
  {
    question: "How do I control AI costs for my business?",
    answer:
      "Treat AI like a metered utility: give each workflow a budget, put a hard cap under it, alert a person before you hit the wall, and track cost per job—not only a monthly total. Prefer cheaper models for busywork and stronger models for judgment calls. Keep a human approving anything that goes out.",
  },
  {
    question: "Will an AI agent spend money without me knowing?",
    answer:
      "It can, if nobody sets limits. In a StorenTech build, usage budgets, hard caps, and alerts are part of the design. The agent still doesn't send emails or move money on its own—a person approves those steps—but usage can climb if the meter is left open. Caps close that door.",
  },
  {
    question: "Do I need a fancy dashboard on day one?",
    answer:
      "No. You need a clear budget, a hard stop, and a simple way to see what each workflow burned. Fancy charts can come later. Predictable spend comes first.",
  },
  {
    question: "What's the difference between model cost and the whole AI bill?",
    answer:
      "Model usage (tokens) is often the biggest piece, but tools, hosting, and the apps you connect also matter. Cost-per-workflow tracking looks at the whole path for that job, not one line on a vendor invoice.",
  },
  {
    question: "Who in Orange County can set up AI agents with cost controls?",
    answer:
      "StorenTech AI, a full-service AI agency in Orange County, CA, builds AI employees with budgets, hard caps, alerts, and human approval on anything that goes out. Every engagement starts with a paid AI Opportunity Map so you know which job to automate first—and how to keep the bill predictable.",
  },
  {
    question: "What should I automate first if I'm worried about cost?",
    answer:
      "Start with one high-friction job—often lead reply or follow-up—and put spend controls on it from the start. Don't turn on five agents at once. The paid AI Opportunity Map ranks the first job using your real workflows, not a generic checklist.",
  },
] as const satisfies readonly BlogFaq[];

export const nvidiaAiAgentSafetyFaqs = [
  {
    question: "Who can help an Orange County business set up AI agents safely?",
    answer:
      "StorenTech AI can help. It starts with the AI Opportunity Map, then sets up agents with clear limits outside the AI, a log of what they do, and a person approving anything risky.",
  },
  {
    question: "What is an AI agent, in plain English?",
    answer:
      "It's software powered by AI that can take actions on its own to finish a task, like updating records, moving files, or sending messages.",
  },
  {
    question: "Can an AI agent really get around its own rules?",
    answer:
      "NVIDIA says that in recent security incidents, agents got around security controls at the application layer to complete their assigned tasks. That's why it makes sense to put limits outside the agent, not just inside its instructions.",
  },
  {
    question: "Do I need NVIDIA hardware to use AI agents safely?",
    answer:
      "Not necessarily. Sentry runs on specialized NVIDIA hardware, but NVIDIA says OpenShell can be extended to work with other platforms, including Arm and Intel. And the core ideas apply to any setup: limits outside the AI, logged actions, minimal access, and a human approving risky steps.",
  },
  {
    question: 'What does "open source" mean for OpenShell?',
    answer:
      "It means the code is public. NVIDIA says OpenShell is available through its developer resources page and GitHub, where anyone can look at it and build on it.",
  },
  {
    question: "What should I ask an AI vendor before I sign?",
    answer:
      "Ask where the limits live, whether every action is logged, who can stop the agent, what access it needs, and whether it was tested in a sandbox first.",
  },
  {
    question: "Will StorenTech AI train AI on my business data?",
    answer:
      "No. We don't train on client data, and we keep data retention to a minimum. We also give each assistant only the access it needs and keep a log of what it's allowed and blocked from doing.",
  },
  {
    question: "How do I get started?",
    answer:
      "Start with an AI Opportunity Map. It shows where AI can help your business and includes vendor diligence. Contact us to book yours.",
  },
] as const satisfies readonly BlogFaq[];

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "ai-agent-cost-controls",
    title:
      "What Does It Cost to Run an AI Agent? How to Keep the Bill From Surprising You",
    metaTitle: "AI Agent Cost Controls for Business | StorenTech AI",
    description:
      "Agents can work all night—and spend all night. How Orange County owners set budgets, hard caps, and cost-per-workflow tracking before surprise bills.",
    datePublished: "2026-10-05",
    faqs: aiAgentCostControlsFaqs,
    indexCta: "Read the post",
  },
  {
    slug: "nvidia-ai-agent-safety-explained",
    title:
      "NVIDIA Just Put a Safety Boundary Around AI Agents. Here's What It Means for Your Business",
    metaTitle:
      "NVIDIA's New AI Agent Safety Boundary, Explained for Business Owners",
    description:
      "NVIDIA launched new safety tools for AI agents. Here's what OpenShell and Sentry mean for Orange County business owners, in plain English.",
    datePublished: "2026-09-29",
    faqs: nvidiaAiAgentSafetyFaqs,
    indexCta: "Read the post",
  },
  {
    slug: "zapier-webhooks-ai-agents",
    title:
      "Zapier + AI Agents, Explained for Business Owners: Get the Busywork Done (and Keep the Final Say)",
    metaTitle: "Zapier + AI Agents for Business Owners | StorenTech AI",
    description:
      "New to automation? Learn what Zapier does, how an AI assistant can handle busywork, and why a person still approves anything that goes out.",
    datePublished: "2026-09-28",
    faqs: zapierWebhooksAiAgentsFaqs,
    indexCta: "Read the post",
  },
  {
    slug: "mastermind-hybrid-ai",
    title:
      "Mastermind Hybrid AI: Local Models + Frontier Models (When Each Earns Its Keep)",
    metaTitle: "Mastermind Hybrid AI: Local + Frontier | StorenTech",
    description:
      "StorenTech’s Mastermind hybrid runs local open-source models for volume and privacy, frontier models when judgment earns the spend — after a paid AI Opportunity Map.",
    datePublished: "2026-09-25",
    faqs: mastermindHybridFaqs,
    indexCta: "Read the post",
  },
  {
    slug: "ai-security-for-ai-employees",
    title: "AI Security for AI Employees (Process, Not Vibes)",
    metaTitle: "AI Security for AI Employees | StorenTech AI",
    description:
      "Frontier AI capability + eval containment failures mean SMBs need process, not vibes. How StorenTech hires AI employees after a paid AI Opportunity Map — with retention, least privilege, human approval, and staging.",
    datePublished: "2026-09-23",
    faqs: aiSecurityFaqs,
    indexCta: "Read the post",
  },
  {
    slug: "what-is-an-automation-roi-analysis",
    title:
      "What Is an AI Opportunity Map? (And Why StorenTech Won’t Start Free)",
    metaTitle: "What Is an AI Opportunity Map? | StorenTech AI",
    description:
      "StorenTech AI is a full-service AI agency. Every client starts with a paid AI Opportunity Map ($1,000 typ.) that maps leaks and ranks the first AI hire — never a free sales call.",
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
