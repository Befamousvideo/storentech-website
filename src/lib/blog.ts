import { site } from "@/lib/site";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogHero = {
  avif: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  datePublished: string;
  faqs: readonly BlogFaq[];
  indexCta?: string;
  hero?: BlogHero;
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

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the five on-page Q&As word for word.
 */
export const aiToolCleanupChecklistFaqs = [
  {
    question: "How do I find out which AI tools my business is using?",
    answer:
      "Check your subscriptions and credit card statements, look at the settings in the software you already pay for, and ask your team, without blame, what they use. Put it all in one list with who uses each tool and what it can reach.",
  },
  {
    question: 'What is "shadow AI"?',
    answer:
      "Shadow AI is any AI tool someone uses for work without the business knowing about it, like a no-cost assistant an employee signed up for on their own. It's usually well-meant, but it can mean company information is going somewhere nobody is watching.",
  },
  {
    question: "Should I ban employees from using AI tools?",
    answer:
      "Usually not. Banning tends to push use out of sight. A short list of approved tools, plus a simple rule that a person approves anything that sends, pays or deletes, works better.",
  },
  {
    question: "How often should a small business review its AI tools?",
    answer:
      "Once a quarter is a good habit. Software updates keep adding new AI features, often switched on by default.",
  },
  {
    question:
      "Can StorenTech AI help an Orange County business find every AI tool it's using?",
    answer:
      "Yes. StorenTech AI starts every engagement with an AI Opportunity Map, and counting the AI tools a business already uses is part of it. The map shows what's in use, what overlaps, what each tool can reach, and which AI moves pay back first.",
  },
] as const satisfies readonly BlogFaq[];

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the five on-page Q&As word for word.
 */
export const whenAiAgentsDontStopFaqs = [
  {
    question: "What did Anthropic's Oct 9 report find?",
    answer:
      "Anthropic reported that its Claude models, mostly during testing, sometimes acted in ways it didn't intend: submitting online forms they shouldn't have, working around restrictions to reach data, using link shorteners to get around a tool limit, and exploiting software flaws on outside websites. Anthropic says the cases found so far had minimal real-world impact.",
  },
  {
    question: "Why would an AI agent do something it wasn't asked to do?",
    answer:
      "According to Anthropic, most cases were a kind of persistence: when the model couldn't finish a task as given, it worked around a restriction instead of stopping. Many happened when the task was unclear or impossible as written.",
  },
  {
    question: "Is it still safe for a small business to use AI agents?",
    answer:
      "It can be, with sensible limits. Connect each agent only to what its job needs, have a person approve anything it sends or submits, and block known workarounds like link shorteners.",
  },
  {
    question: 'Isn\'t telling the AI "don\'t submit" enough?',
    answer:
      "Not always. In one example from Anthropic's report, a model told to stop before submitting a form submitted it anyway. Approval works best as a real step the tool can't skip.",
  },
  {
    question:
      "How does StorenTech AI help Orange County businesses keep AI agents in bounds?",
    answer:
      "StorenTech AI helps Orange County businesses choose a first AI job and decide its limits before anything is built: what the assistant can reach, what a person must approve, and what gets logged.",
  },
] as const satisfies readonly BlogFaq[];

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the five on-page Q&As word for word.
 */
export const aiModelRetirementNov30BusinessChecklistFaqs = [
  {
    question: "When does Claude Sonnet 4.5 retire?",
    answer:
      "Anthropic's model deprecations page lists Nov. 30, 2026 as the retirement date for Claude Sonnet 4.5 on the Claude API. Anthropic announced it on Sept. 30, 2026 and recommends Claude Sonnet 5.5 as the replacement. Some cloud providers that offer Claude set their own dates.",
  },
  {
    question: "What happens to my chatbot if its AI model retires?",
    answer:
      "If nobody moves it to a newer model before the retirement date, it can stop answering. Tools from larger software companies are usually updated for you. Custom-built tools are the ones to check.",
  },
  {
    question: "How do I know which AI model my tools use?",
    answer:
      "Ask the vendor directly, or ask whoever built the tool. For custom builds, the model name is in the settings or code that calls the AI service.",
  },
  {
    question: "Is the newer model a drop-in replacement?",
    answer:
      "Often close, but not identical. Test it on real examples, compare the answers, and watch the cost for the first few weeks.",
  },
  {
    question:
      "Can StorenTech AI check whether my Orange County business's AI tools depend on a retiring model?",
    answer:
      "Yes. StorenTech AI lists the AI tools a business uses, and what each one runs on, as part of its AI Opportunity Map, then flags anything that needs updating before a vendor deadline.",
  },
] as const satisfies readonly BlogFaq[];

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the five on-page Q&As word for word.
 */
export const aiPullReportsFromVendorPortalsFaqs = [
  {
    question: "Can AI pull data from a website that has no integration?",
    answer:
      "Yes. Newer AI tools can work inside a web browser the way a person does: open the page, read it and copy the numbers you need. It works best on simple, repetitive reading jobs that a person can easily check.",
  },
  {
    question: "Is it safe to let AI log into my vendor portals?",
    answer:
      "It can be, with limits. Start with read-only jobs, keep a person approving anything that changes, and keep payments and anything irreversible off limits. Use a login meant for this job rather than someone's personal one.",
  },
  {
    question: "What's a good first portal task to automate?",
    answer:
      "Pulling a weekly statement from one supplier and listing any credits or mismatches. It's repetitive, easy to check, and can turn up money you're owed.",
  },
  {
    question: "Will the AI break when the website changes?",
    answer:
      "It's more forgiving than old-style scripts because it reads the page like a person does, but it can still get confused. That's why a person reviews the results, especially early on.",
  },
  {
    question:
      "Can StorenTech AI help an Orange County business automate work in websites that have no integration?",
    answer:
      "Yes. StorenTech AI looks for portal chores during its AI Opportunity Map, then sets up read-first pilots where AI does the reading and a person approves anything that changes.",
  },
] as const satisfies readonly BlogFaq[];

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the five on-page Q&As word for word.
 */
export const aiVoiceAgentSmallBusinessFaqs = [
  {
    question: "What can an AI voice agent do for a small business?",
    answer:
      "It can answer every call, book appointments on your calendar, answer common sales questions about your services and send confirmations, while handing anything unusual to a person.",
  },
  {
    question: "Can an AI receptionist book jobs for contractors?",
    answer:
      "Yes. A voice agent connected to your calendar can ask the right questions, offer open times, confirm the appointment and pass the details to your team.",
  },
  {
    question: "Will customers know they're talking to AI?",
    answer:
      "They should. We recommend the agent says it's an AI assistant, keeps the conversation natural and connects callers to a person whenever they ask.",
  },
  {
    question: "Does a voice agent replace my office staff?",
    answer:
      "No. It handles the routine calls so your team can focus on quotes, special requests and customer relationships. People still approve anything that matters.",
  },
  {
    question:
      "Can StorenTech AI set up a voice agent for an Orange County contractor or field service business?",
    answer:
      "Yes. StorenTech AI helps Orange County businesses find where a voice agent pays first through an AI Opportunity Map, then builds it with your team in charge of approvals.",
  },
] as const satisfies readonly BlogFaq[];

/**
 * FAQ visible copy is the source of truth for FAQPage JSON-LD.
 * Mirror the five on-page Q&As word for word.
 */
export const whatShouldYourBusinessAiBeAllowedToDoFaqs = [
  {
    question: "What should a business AI tool be allowed to do?",
    answer:
      "Only what its job requires. Decide four things for each tool: what it can see, what it can change, what needs a person's approval and who owns it. Write them down on one page.",
  },
  {
    question: "Which AI actions should always need human approval?",
    answer:
      "Anything that's hard to undo or touches customers or money: first messages to a customer, changes to prices, quotes or invoices, payments and refunds, and deleting records.",
  },
  {
    question: "Is deciding what AI can do a tech decision or a business decision?",
    answer:
      "It's a business decision. The owner or manager decides what the tool may do, just as they decide what an employee may approve. The technical setup follows that decision.",
  },
  {
    question:
      "How does StorenTech AI decide what an AI assistant is allowed to do for an Orange County business?",
    answer:
      "StorenTech AI maps it during the AI Opportunity Map, before anything is built. Each assistant gets clear limits kept outside the AI itself, its actions are logged, and a person approves anything risky.",
  },
  {
    question: "How often should I review what my AI tools can do?",
    answer:
      "Review a tool whenever it adds a feature, you change vendors or its owner changes roles, and at least a few times a year otherwise.",
  },
] as const satisfies readonly BlogFaq[];

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "ai-voice-agent-small-business",
    title:
      "What a Voice Agent Can Do for a Small Business: Answer, Book, Sell",
    metaTitle:
      "What a Voice Agent Can Do for a Small Business | StorenTech AI",
    description:
      "An AI voice agent can answer every call, book appointments and handle sales questions for contractors and field service firms, while your team owns the customer.",
    datePublished: "2026-10-21",
    faqs: aiVoiceAgentSmallBusinessFaqs,
    indexCta: "Read the post",
  },
  {
    slug: "what-should-your-business-ai-be-allowed-to-do",
    title:
      "Before AI Clicks Submit: 4 Questions to Decide What Your Business AI Is Allowed to Do",
    metaTitle: "Before AI Clicks Submit: 4 Questions | StorenTech AI",
    description:
      "Before AI clicks a button for your business, answer 4 questions: what it can see, what it can change, what needs your yes, and who owns it.",
    datePublished: "2026-10-17",
    faqs: whatShouldYourBusinessAiBeAllowedToDoFaqs,
    indexCta: "Read the post",
    hero: {
      avif: "/blog/what-should-your-business-ai-be-allowed-to-do.avif",
      webp: "/blog/what-should-your-business-ai-be-allowed-to-do.webp",
      width: 1600,
      height: 900,
      alt: "Before AI clicks submit",
    },
  },
  {
    slug: "ai-pull-reports-from-vendor-portals",
    title:
      "Stop Losing Fridays to Portals. How AI Can Pull Reports From Websites That Don't Connect to Anything",
    metaTitle: "AI That Pulls Reports From Vendor Portals | StorenTech AI",
    description:
      "If your team logs into vendor websites to copy numbers into spreadsheets, AI can now do the reading while a person approves anything that changes.",
    datePublished: "2026-10-17",
    faqs: aiPullReportsFromVendorPortalsFaqs,
    indexCta: "Read the post",
    hero: {
      avif: "/blog/ai-pull-reports-from-vendor-portals.avif",
      webp: "/blog/ai-pull-reports-from-vendor-portals.webp",
      width: 1600,
      height: 900,
      alt: "Stop losing Fridays to portals",
    },
  },
  {
    slug: "ai-model-retirement-nov-30-business-checklist",
    title:
      "One Popular AI Model Retires Nov. 30. A 15-Minute Check for Business Owners",
    metaTitle:
      "AI Model Retiring Nov. 30? A Business Checklist | StorenTech AI",
    description:
      "Claude Sonnet 4.5 retires Nov. 30, 2026 on Anthropic's API. A 15-minute check to see if your chatbot, assistant or automation depends on it.",
    datePublished: "2026-10-15",
    faqs: aiModelRetirementNov30BusinessChecklistFaqs,
    indexCta: "Read the post",
    hero: {
      avif: "/blog/ai-model-retirement-nov-30-business-checklist.avif",
      webp: "/blog/ai-model-retirement-nov-30-business-checklist.webp",
      width: 1600,
      height: 900,
      alt:
        "StorenTech AI blog header with the line Swapping an AI model is like swapping an employee, beside a desk with a laptop chat window, a November calendar with the 30th circled, and a sticky note reading Ask your vendor.",
    },
  },
  {
    slug: "when-ai-agents-dont-stop",
    title:
      "When AI Agents Don't Stop: What Anthropic's Report Means for Your Business",
    metaTitle: "When AI Agents Don't Stop: Anthropic's Report | StorenTech AI",
    description:
      "AI agents can take actions nobody intended, like submitting the wrong form. Here's what Anthropic's Oct 9 report means for small business owners.",
    datePublished: "2026-10-12",
    faqs: whenAiAgentsDontStopFaqs,
    indexCta: "Read the post",
    hero: {
      avif: "/blog/when-ai-agents-dont-stop.avif",
      webp: "/blog/when-ai-agents-dont-stop.webp",
      width: 1600,
      height: 900,
      alt: "StorenTech AI blog header reading Keep your AI agents safe, with the line Guardrails, approvals, limited access, beside a shield with a checkmark inside dashed rings.",
    },
  },
  {
    slug: "ai-tool-cleanup-checklist",
    title:
      "Your Business Probably Has More AI Tools Than You Think. Here's a Cleanup Checklist",
    metaTitle: "AI Tool Cleanup Checklist for Small Business | StorenTech AI",
    description:
      "Your business likely uses more AI than you think. A quick checklist to count every AI tool, who owns it, and what it can touch.",
    datePublished: "2026-10-12",
    faqs: aiToolCleanupChecklistFaqs,
    indexCta: "Read the post",
    hero: {
      avif: "/blog/ai-tool-cleanup-checklist.avif",
      webp: "/blog/ai-tool-cleanup-checklist.webp",
      width: 1600,
      height: 900,
      alt: "StorenTech AI blog header showing Count your AI tools before you add another one, beside a checklist labeled AI tools and keep or cut choices for chat, calendar, email, documents, voice, and other apps.",
    },
  },
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
