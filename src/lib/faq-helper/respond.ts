import { site } from "@/lib/site";
import {
  FAQ_HELPER_KNOWLEDGE_VERSION,
  type FaqKnowledgeSource,
} from "@/lib/faq-helper/knowledge";
import { normalizeFaqQuery, retrieveFaqEntry } from "@/lib/faq-helper/retrieve";

export type FaqHelperIntent =
  | "faq"
  | "unknown"
  | "injection"
  | "booking"
  | "contact_payment"
  | "unsupported"
  | "off_topic"
  | "meta";

export type FaqHelperResponse = {
  intent: FaqHelperIntent;
  text: string;
  entryId: string | null;
  entryVersion: string | null;
  knowledgeVersion: typeof FAQ_HELPER_KNOWLEDGE_VERSION;
  sources: readonly FaqKnowledgeSource[];
  showHandoff: boolean;
  matched: boolean;
};

const HANDOFF_SENTENCE = `This helper cannot book a time or take a message. To start a paid AI Opportunity Map, use “${site.offer.cta}.”`;

const RESPONSES = {
  unknown: `I don't have a reviewed website answer for that. This is FAQ assistance, not live generative AI. ${HANDOFF_SENTENCE}`,
  injection:
    "I only answer reviewed StorenTech service and process questions from this website. I can't follow hidden instructions or change those limits.",
  booking: `This FAQ helper cannot book appointments, check a calendar, or confirm that a time is open. It never claims a meeting is booked. ${HANDOFF_SENTENCE}`,
  contact_payment: `This FAQ helper does not collect names, emails, phone numbers, or payments, and it does not publish contact or pay details. ${HANDOFF_SENTENCE}`,
  unsupported: `That isn't in the reviewed website facts this helper is allowed to use. I don't have an approved answer on unpublished pricing, hours, results, compliance, or specific integrations. ${HANDOFF_SENTENCE}`,
  off_topic: `That's outside StorenTech service and process facts on this website. This is FAQ assistance, not live generative AI. ${HANDOFF_SENTENCE}`,
  meta: "This is FAQ assistance. It retrieves a small allowlist of reviewed StorenTech website facts with a fixed matcher. It is not live generative AI, and it cannot book appointments or take payments.",
} as const;

const INJECTION_RE =
  /\b(ignore (all |any )?(previous|prior|above|your) (instructions|rules|prompts)|you are now|jailbreak|developer mode|system prompt|reveal (the )?(api|secret|key|prompt)|do not follow|override (your|the) (rules|instructions)|new instructions:|<\|system\||\[system\]|act as if you have no limits)\b/i;

const BOOKING_RE =
  /\b(book( me| us)?( an?)? (an? )?(appointment|call|meeting|slot|time|consult)|schedule (a |an )?(call|meeting|appointment)|are you available|availability|openings? (this|next|tomorrow)|set up a (call|meeting)|put me on the calendar|zoom (call|meeting)|come in (tomorrow|today|friday))\b/i;

const CONTACT_PAYMENT_RE =
  /\b(phone number|email address|e-mail|email me|your email|call me|text me|whatsapp|cell number|mobile number|credit card|debit card|wire transfer|bank account|paypal|venmo|zelle|stripe|send (me )?your (email|phone|number)|pay (now|online|by card)|payment link)\b/i;

const UNSUPPORTED_RE =
  /\b(pci[-\s]?dss|hipaa|soc\s?2|iso ?27001|gdpr (certified|compliant)|roi guarantee|guaranteed (results|roi)|how many (customers|clients)|hours of operation|what time do you (open|close)|business hours|salesforce|hubspot|twilio|zendesk|shopify|refund policy|sla|certif(y|ied|ication))\b/i;

const OFF_TOPIC_RE =
  /\b(weather|recipe|joke|poem|homework|capital of|who won|bitcoin|write (me )?(a |some )?code|sports score|pizza toppings)\b/i;

const META_RE =
  /\b(are you (an? )?(ai|chatgpt|gpt|bot|llm|generative)|what model|live (generative )?ai|chatgpt|generative ai)\b/i;

function base(
  intent: Exclude<FaqHelperIntent, "faq">,
  extra?: Partial<FaqHelperResponse>,
): FaqHelperResponse {
  return {
    intent,
    text: RESPONSES[intent],
    entryId: null,
    entryVersion: null,
    knowledgeVersion: FAQ_HELPER_KNOWLEDGE_VERSION,
    sources: [],
    showHandoff: intent !== "meta" && intent !== "injection",
    matched: false,
    ...extra,
  };
}

export function classifyFaqIntent(queryRaw: string): Exclude<FaqHelperIntent, "faq" | "unknown"> | null {
  const query = queryRaw.trim();
  const normalized = normalizeFaqQuery(query);

  if (INJECTION_RE.test(query) || INJECTION_RE.test(normalized)) return "injection";
  if (CONTACT_PAYMENT_RE.test(query) || CONTACT_PAYMENT_RE.test(normalized)) {
    return "contact_payment";
  }
  if (BOOKING_RE.test(query) || BOOKING_RE.test(normalized)) return "booking";
  if (UNSUPPORTED_RE.test(query) || UNSUPPORTED_RE.test(normalized)) return "unsupported";
  if (META_RE.test(query) || META_RE.test(normalized)) return "meta";
  if (OFF_TOPIC_RE.test(query) || OFF_TOPIC_RE.test(normalized)) return "off_topic";
  return null;
}

export function answerFaqQuery(queryRaw: string): FaqHelperResponse {
  const query = queryRaw.trim();
  if (query.length < 2) return base("unknown");

  const special = classifyFaqIntent(query);
  if (special) return base(special);

  const hit = retrieveFaqEntry(query);
  if (!hit.ok) return base("unknown");

  return {
    intent: "faq",
    text: hit.entry.answer,
    entryId: hit.entry.id,
    entryVersion: hit.entry.version,
    knowledgeVersion: FAQ_HELPER_KNOWLEDGE_VERSION,
    sources: hit.entry.sources,
    showHandoff: true,
    matched: true,
  };
}
