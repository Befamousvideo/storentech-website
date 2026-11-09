/**
 * Tony Traffic copy for /free-ai-map. Do not rewrite.
 * Prompt box is verbatim from section 1 (376 words).
 */
export const FREE_AI_MAP_PATH = "/free-ai-map";

export const FREE_AI_MAP_HEADLINE =
  "Free Opportunity Map Prompt for owners";

export const FREE_AI_MAP_SUBHEAD =
  "Six questions. A rough first look at which tasks AI could help your staff with — with people still in charge.";

export const FREE_AI_MAP_BULLETS = [
  "Walks through your business, team, drop points, tools, and what eats your time — one question at a time.",
  "Lists three tasks to try first, with simple how-to steps and a clear \"keep human\" section.",
  "Hour estimates are labeled as your own sketch from your answers — not a StorenTech claim.",
] as const;

/** Section 2 download-page how-to. */
export const FREE_AI_MAP_PAGE_STEPS = [
  "Copy the prompt.",
  "Paste it into your favorite AI assistant.",
  "Answer each question as it asks.",
  "Use the output as a starting sketch — then decide what to try with your team.",
] as const;

/** Section 1 how-to, shown with the prompt after submit. */
export const FREE_AI_MAP_PROMPT_STEPS = [
  "Copy everything inside the box below.",
  "Paste it into your favorite AI assistant.",
  "Answer each question as it asks — one at a time.",
  'Read the top-3 list and the "keep human" section carefully. Treat hour estimates as your own sketch, not a promise.',
] as const;

export const FREE_AI_MAP_EMAIL_CAPTURE =
  "Enter your email and we'll send the prompt.";

export const FREE_AI_MAP_PRIVACY_LINE =
  "We'll email you the prompt and occasional tips; unsubscribe anytime.";

export const FREE_AI_MAP_THANK_YOU_CTA =
  "Want this done properly with your real numbers? Book a free AI Opportunity Map conversation at storentechai.com/opportunity.";

export const FREE_AI_MAP_CONVERSATION_PHRASE =
  "free AI Opportunity Map conversation";

export const FREE_AI_MAP_OPPORTUNITY_HREF = "/opportunity";

/** Tony did not supply a submit CTA. Listed in the PR. */
export const FREE_AI_MAP_SUBMIT_CTA_PLACEHOLDER =
  "TODO: send-prompt CTA — Tony writes copy";

export const FREE_AI_MAP_CONSENT_TEXT_VERSION = "tony-download-privacy-v1";

export const FREE_AI_MAP_PROMPT = `You are helping a small-business owner sketch a rough, first-pass look at where AI could help their team — not replace people. Ask exactly these six questions, ONE AT A TIME. Wait for each answer before asking the next. Do not skip ahead. Do not invent numbers the owner did not give you.

Questions (ask in this order, one per turn):
1. What kind of business do you run, and what do you sell or deliver?
2. About how many people are on the team, including you?
3. What tasks does the team repeat every week (phone, booking, follow-up, quotes, invoicing, scheduling, or similar)?
4. Where do calls, leads, or emails most often get dropped or delayed?
5. What tools do you already use day to day (phone, email, calendar, CRM, forms, accounting — name what you have)?
6. What eats YOUR time as the owner that you wish someone — or something — could draft or handle first, with you still reviewing?

After all six answers, produce this output only:

A. Top 3 tasks to automate first
Three tasks drawn only from what the owner described. For each: one sentence on why it fits (repeatable, rules-based, or a known drop point).

B. Rough hours per week each could free
For each task, a rough hours-per-week range. Label every figure: "Your estimate, based on what you told me — not a guarantee and not a StorenTech claim." If detail is missing, say so and ask one clarifying question — never invent a number.

C. Simple how-to steps for each
For each task, 4–6 plain steps a careful staff person could follow this week. Keep AI as a helper: draft, route, remind, summarize — with a person approving anything that leaves the office or talks to a customer.

D. What to keep human
List what stays with people: judgment calls, promises to customers, money or sensitive details leaving the building, and final say on tone. Frame AI as help for staff, never as a replacement.

Tone: plain, warm, specific. No hype. No invented customers, metrics, or case studies. End your entire reply with exactly this line and nothing after it:

Want this done properly with your real numbers? Book a free AI Opportunity Map conversation at storentechai.com/opportunity.`;
