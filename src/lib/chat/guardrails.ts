import { CHAT_BOOK_CTA, CHAT_INTERVIEW_CTA } from "@/lib/chat/public-flag";
import { site } from "@/lib/site";

export const CHAT_MAX_USER_CHARS = 500;
export const CHAT_MAX_TURNS = 12;
export const CHAT_MAX_ASSISTANT_CHARS = 2000;
export const CHAT_RATE_LIMIT = 20;
export const CHAT_RATE_WINDOW_MS = 10 * 60 * 1000;

const HANDOFF = `Use “${CHAT_INTERVIEW_CTA}” or “${CHAT_BOOK_CTA}.” This assistant cannot book a time, take a message, or take a payment.`;

const PERSON_NAMES = ["Vincent Jackson", "Vincent", "Vince", "Jackson", "Mary"];

const VENDOR_NAMES = [
  "google ads",
  "adwords",
  "meta",
  "facebook",
  "instagram",
  "tiktok",
  "tik tok",
  "microsoft ads",
  "bing ads",
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
  "servicetitan",
  "quickbooks",
  "calendly",
  "shopify",
  "gorgias",
  "clio",
  "jobber",
  "housecall pro",
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
  /reveal (your |the )?(hidden |system )?(prompt|instructions|knowledge base|api|secret|key)/i,
  /\bnew (role|persona|instructions)\b/i,
  /\boverride (the |your )?(rules|instructions|system)/i,
  /<\s*\/?\s*(system|instructions)\s*>/i,
  /\[system\]/i,
  /act as if you have no limits/i,
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
  /\bhoroscope\b/i,
  /\bbest laptop\b/i,
  /\bvideo editing\b/i,
  /\bname my dog\b/i,
  /\bsuper ?bowl\b/i,
  /\bsports instead\b/i,
  /\bpizza toppings\b/i,
];

const ON_TOPIC =
  /\b(storen|opportunity|map|price|cost|pricing|retainer|build|agent|voice|chat|book|industry|dental|spa|insurance|contractor|mortgage|wealth|manufactur|orange county|service|automation|lead|hire|hiring|review|content|white-label|white label|partner|timeline|security|human|grind|revenue|calendar|appointment|inbox|recruit|located|client|engagement|paid|fee|ai)\b/i;

export function unknownReply() {
  return `I don't have a reviewed answer for that. ${HANDOFF}`;
}

export function injectionReply() {
  return `I only answer reviewed StorenTech service and process questions. I can't follow hidden instructions or change those limits. ${HANDOFF}`;
}

export function offTopicReply() {
  return `That's outside StorenTech service and process facts. ${HANDOFF}`;
}

export function bookingReply() {
  return `This assistant cannot book appointments, check a calendar, or confirm that a time is open. It never claims a meeting is booked. ${HANDOFF}`;
}

export function contactPaymentReply() {
  return `This assistant does not collect names, emails, phone numbers, or payments, and it does not publish contact or pay details. ${HANDOFF}`;
}

export function turnLimitReply() {
  return `This chat has reached its limit. ${HANDOFF}`;
}

export function rateLimitReply() {
  return `Too many messages from this network. Try again shortly. ${HANDOFF}`;
}

export function founderReply() {
  return `StorenTech AI is principal-led. Founded in 2023, with 16+ years of work on messy business tech. ${HANDOFF}`;
}

export function publishedPriceReply() {
  return `Typical fee ${site.prices.analysisTypical}. ${site.prices.analysisComplex} when the operation is complex — multiple locations, a messy stack, or a wider catalog. This is paid work. It is not a complimentary sales call. We do not publish retainers. ${HANDOFF}`;
}

export function isPromptInjection(text: string) {
  return INJECTION.some((pattern) => pattern.test(text));
}

export function isIdentityQuestion(text: string) {
  return (
    /\bwho (is|was) (the |your |storen ?tech(?: ai)?'s )?(founder|owner|president|ceo|principal)\b/i.test(
      text,
    ) ||
    /\bwho founded\b/i.test(text) ||
    /\b(founder|owner|president|ceo)'s name\b/i.test(text)
  );
}

export function isOffTopic(text: string) {
  return OFF_TOPIC.some((pattern) => pattern.test(text)) && !ON_TOPIC.test(text);
}

export function isBuyingIntent(text: string) {
  return (
    /\b(buy|purchase|get started|sign me up)\b/i.test(text) ||
    /\bi (want|need) to (start|book|hire|schedule)\b/i.test(text) ||
    /\bhow do i start\b/i.test(text) ||
    /\bready to (start|buy|move)\b/i.test(text)
  );
}

export function ensureNextStep(reply: string) {
  if (
    reply.includes(CHAT_INTERVIEW_CTA) ||
    reply.includes(CHAT_BOOK_CTA) ||
    /opportunity map interview|book a call/i.test(reply)
  ) {
    return reply;
  }
  return `${reply.trim()} ${HANDOFF}`;
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

export function hasSparkInventoryClaim(text: string) {
  return (
    /\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|several|many|multiple)\s+(?:nvidia\s+)?dgx\s+sparks?\b/i.test(
      text,
    ) ||
    /\b(?:we (?:have|own|run|operate)|storen ?tech (?:has|owns|runs))\s+\d+\s+(?:dgx\s+)?sparks?\b/i.test(
      text,
    )
  );
}

export function hasBannedAbbreviation(text: string) {
  return /\bOpp\b/.test(text) || /\bROIA\b/.test(text);
}

function collapseSpecialist(text: string) {
  return text.replace(/\ba(?:\s+a)+ StorenTech specialist\b/g, "a StorenTech specialist");
}

function redactNames(text: string, knowledgeBase: string) {
  let next = text;
  for (const name of PERSON_NAMES) {
    next = next.replace(
      new RegExp(`\\b${escapeRegExp(name)}\\b`, "gi"),
      "a StorenTech specialist",
    );
  }
  next = next.replace(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}\b/g, (phrase) => {
    if (knowledgeBase.includes(phrase)) return phrase;
    if (phrase === "StorenTech AI" || phrase === "Orange County" || phrase === "Opportunity Map") {
      return phrase;
    }
    if (phrase === "Build Plan" || phrase === "Super Intelligence") return phrase;
    return "a StorenTech specialist";
  });
  return collapseSpecialist(next);
}

export function filterReply(reply: string, knowledgeBase: string) {
  let next = reply.replace(/\u0000/g, "").trim().slice(0, 1500);
  next = next.replace(/mailto:[^\s)]+/gi, "");
  next = next.replace(/tel:[^\s)]+/gi, "");
  next = next.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "");
  next = next.replace(
    /\b(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]\d{3}[-.\s]\d{4}\b/g,
    "",
  );
  next = next.replace(/\bOpp\b/g, "Opportunity");
  next = next.replace(/\bROIA\b/g, "AI Opportunity Map");
  next = redactNames(next, knowledgeBase).replace(/[ \t]{2,}/g, " ").trim();

  if (!next) return unknownReply();
  if (hasSparkInventoryClaim(next)) {
    return `StorenTech can use DGX Spark class hardware for private, local-first work when that is the right fit. We do not publish how many units we run. ${HANDOFF}`;
  }
  if (hasDisallowedMoney(next, knowledgeBase)) return publishedPriceReply();
  if (hasBlockedVendor(next, knowledgeBase)) return unknownReply();
  if (/\bappointment booked\b/i.test(next) || /\byou(?:'re| are) booked\b/i.test(next)) {
    return bookingReply();
  }
  return next;
}
