export const CHAT_MAX_USER_CHARS = 500;
export const CHAT_MAX_TURNS = 12;
export const CHAT_MAX_ASSISTANT_CHARS = 2000;
export const CHAT_RATE_LIMIT = 20;
export const CHAT_RATE_WINDOW_MS = 10 * 60 * 1000;

const PERSON_NAMES = ["Vincent Jackson", "Sarah", "Vincent", "Vince", "Jackson", "Mary"];

const VENDOR_NAMES = [
  "google ads",
  "google",
  "adwords",
  "meta",
  "facebook",
  "instagram",
  "tiktok",
  "tik tok",
  "youtube",
  "microsoft ads",
  "bing ads",
  "brandzooka",
  "trade desk",
  "taboola",
  "outbrain",
  "amazon ads",
  "snapchat",
  "pinterest",
  "dv360",
  "hubspot",
  "salesforce",
  "zapier",
  "openai",
  "anthropic",
  "chatgpt",
  "chat gpt",
  "claude",
  "gemini",
  "twilio",
  "stripe",
  "mailchimp",
  "klaviyo",
  "semrush",
  "linkedin ads",
  "twitter",
  "reddit ads",
];

const INJECTION = [
  /ignore (all |any |the )?(previous|prior|above|your) (instructions|rules|prompts|directions)/i,
  /disregard (all |any |the )?(previous|prior|above|your)/i,
  /\byou are now\b/i,
  /\bpretend (you are|to be)\b/i,
  /\b(system|developer) prompt\b/i,
  /\bjailbreak\b/i,
  /\bDAN\b/,
  /\bdo anything now\b/i,
  /reveal (your |the )?(hidden |system )?(prompt|instructions|knowledge base)/i,
  /\bnew (role|persona|instructions)\b/i,
  /\boverride (the |your )?(rules|instructions|system)/i,
  /<\s*\/?\s*(system|instructions)\s*>/i,
];

const IDENTITY = [
  /\bwho (is|was) (the |your |storen ?tech(?: ai)?'s )?(founder|owner|president|ceo|principal|operator)\b/i,
  /\bwho founded\b/i,
  /\b(founder|owner|president|ceo)'s name\b/i,
  /\bwhat(?:'s| is) (the |your )?(founder|owner|president|ceo)'s name\b/i,
  /\bwho (runs|owns|leads) (storen ?tech|the (company|agency|firm))\b/i,
  /\bwho is [A-Z][a-z]{2,}\b/,
];

const OFF_TOPIC = [
  /\bweather\b/i,
  /\bforecast\b/i,
  /\brecipe\b/i,
  /\bpoem\b/i,
  /\bhomework\b/i,
  /\bcapital of\b/i,
  /\bwho won\b/i,
  /\bwrite (me )?(a |an )?(poem|essay|story|song|code|script)\b/i,
  /\b(stock tip|crypto price|bitcoin price)\b/i,
  /\bdiagnos(e|is)\b/i,
  /\btranslate (this|the following)\b/i,
  /\bhoroscope\b/i,
];

const ON_TOPIC =
  /\b(storen|opportunity|map|price|cost|pricing|retainer|build|agent|voice|chat|book|industry|dental|spa|insurance|contractor|mortgage|wealth|manufactur|orange county|founder|owner|president|service|automation|lead|hire|hiring|review|content|white-label|white label|partner|free|complimentary|timeline|security|human|grind|revenue|calendar|appointment|inbox|recruit|located|client|engagement|paid|fee)\b/i;

const BUYING = [
  /\b(buy|purchase|get started|sign me up)\b/i,
  /\bi (want|need) to (start|book|hire|schedule)\b/i,
  /\bhow do i start\b/i,
  /\bbook a (15-minute|15 minute|call|conversation|time)\b/i,
  /\bready to (start|buy|move)\b/i,
];

const buckets = new Map<string, number[]>();

export function resetChatRateLimit() {
  buckets.clear();
}

export function allowChatRequest(ip: string, now = Date.now()) {
  const recent = (buckets.get(ip) ?? []).filter((stamp) => now - stamp < CHAT_RATE_WINDOW_MS);
  if (recent.length >= CHAT_RATE_LIMIT) {
    buckets.set(ip, recent);
    return false;
  }
  recent.push(now);
  buckets.set(ip, recent);
  return true;
}

export function isPromptInjection(text: string) {
  return INJECTION.some((pattern) => pattern.test(text));
}

export function isIdentityQuestion(text: string) {
  return IDENTITY.some((pattern) => pattern.test(text));
}

export function isOffTopic(text: string) {
  return OFF_TOPIC.some((pattern) => pattern.test(text)) && !ON_TOPIC.test(text);
}

export function isBuyingIntent(text: string) {
  return BUYING.some((pattern) => pattern.test(text));
}

export function injectionReply() {
  return "I can't change roles or ignore StorenTech's published answers. You can ask about the work, book a free 15-minute intro call, or leave your email.";
}

export function notInKnowledgeReply() {
  return "I don't want to guess — that isn't in what StorenTech publishes. You can book a free 15-minute intro call or leave your email, and a StorenTech specialist can help with the next step.";
}

export function turnLimitReply() {
  return "This chat has reached its limit. You can book a free 15-minute intro call or leave your email, and a StorenTech specialist can continue.";
}

export function founderReply(knowledgeBase: string) {
  const fact = "Principal-led. Founded in 2023, with 16+ years of work on messy business tech.";
  const lead = knowledgeBase.includes(fact)
    ? `StorenTech AI is ${fact}`
    : "StorenTech AI is principal-led.";
  return `${lead} A StorenTech specialist can walk you through the next step. You can book a free 15-minute intro call or leave your email.`;
}

export function isFreeIntroQuestion(text: string) {
  const aboutIntro =
    /\b(intro call|first call|15[- ]minutes?(?: intro)? call|15[- ]min(?:ute)? intro|the intro)\b/i.test(
      text,
    );
  const aboutPrice = /\b(free|complimentary|cost|costs|price)\b/i.test(text);
  return aboutIntro && aboutPrice;
}

export function isPaidMapQuestion(text: string) {
  return /\bopportunity map\b/i.test(text) && /\b(free|complimentary)\b/i.test(text);
}

export function freeIntroReply(knowledgeBase: string) {
  const marker = "Yes. The 15-minute intro call is free";
  const start = knowledgeBase.indexOf(marker);
  if (start === -1) {
    return "Yes. The 15-minute intro call is free. The AI Opportunity Map, the actual analysis, is paid and starts at $1,000.";
  }
  const end = knowledgeBase.indexOf("\n", start);
  return knowledgeBase.slice(start, end === -1 ? undefined : end).trim();
}

export function paidMapReply() {
  return "No. The AI Opportunity Map is paid and starts at $1,000. The 15-minute intro call is free.";
}

export function publishedPriceReply(knowledgeBase: string) {
  const start = knowledgeBase.indexOf("The AI Opportunity Map starts at $1,000.");
  const endNeedle = "scoped from the map.";
  const end = knowledgeBase.indexOf(endNeedle, Math.max(start, 0));
  const price =
    start !== -1 && end !== -1
      ? knowledgeBase.slice(start, end + endNeedle.length)
      : "The AI Opportunity Map is paid work.";
  return `${price} You can book a free 15-minute intro call or leave your email, and a StorenTech specialist can help with the next step.`;
}

const NEXT_STEP =
  "You can book a free 15-minute intro call or leave your email, and a StorenTech specialist can take the next step.";

export function ensureNextStep(reply: string) {
  if (/book a free 15-minute intro call|leave your email/i.test(reply)) return reply;
  return `${reply.trim()} ${NEXT_STEP}`;
}

function moneyTokens(text: string) {
  const patterns = [
    /\$\s?\d[\d,]*(?:\.\d+)?(?:\s*[-–—-]\s*\$\s?\d[\d,]*(?:\.\d+)?)?/g,
    /\b\d[\d,]*(?:\.\d+)?\s*(?:dollars|usd)\b/gi,
    /\busd\s*\$?\s*\d[\d,]*(?:\.\d+)?\b/gi,
  ];
  const tokens: string[] = [];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) tokens.push(match[0]);
  }
  return tokens;
}

export function hasDisallowedMoney(text: string, knowledgeBase: string) {
  return moneyTokens(text).some((token) => !knowledgeBase.includes(token));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function hasBlockedVendor(text: string, knowledgeBase: string) {
  const kb = knowledgeBase.toLowerCase();
  return VENDOR_NAMES.some((name) => {
    if (kb.includes(name)) return false;
    return new RegExp(`\\b${escapeRegExp(name)}\\b`, "i").test(text);
  });
}

function collapseSpecialist(text: string) {
  return text.replace(/\ba(?:\s+a)+ StorenTech specialist\b/g, "a StorenTech specialist");
}

function redactNames(text: string, knowledgeBase: string) {
  let next = text;
  for (const name of PERSON_NAMES) {
    next = next.replace(new RegExp(`\\b${escapeRegExp(name)}\\b`, "gi"), "a StorenTech specialist");
  }
  next = next.replace(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}\b/g, (phrase) => {
    if (knowledgeBase.includes(phrase)) return phrase;
    return "a StorenTech specialist";
  });
  return collapseSpecialist(next);
}

export function filterReply(reply: string, knowledgeBase: string) {
  let next = reply.replace(/\u0000/g, "").trim().slice(0, 1500);
  next = next.replace(/mailto:[^\s)]+/gi, "");
  next = next.replace(/tel:[^\s)]+/gi, "");
  next = next.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "a StorenTech specialist");
  next = next.replace(
    /\b(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]\d{3}[-.\s]\d{4}\b/g,
    "a StorenTech specialist",
  );
  next = redactNames(next, knowledgeBase).replace(/[ \t]{2,}/g, " ").trim();

  if (!next) return notInKnowledgeReply();
  if (hasDisallowedMoney(next, knowledgeBase)) return publishedPriceReply(knowledgeBase);
  if (hasBlockedVendor(next, knowledgeBase)) return notInKnowledgeReply();
  return next;
}
