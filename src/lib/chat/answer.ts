import { isAiChatLive } from "@/lib/chat/enabled";
import { aiReply, faqFallback, type ChatReply } from "@/lib/chat/faq-fallback";
import {
  CHAT_MAX_ASSISTANT_CHARS,
  CHAT_MAX_TURNS,
  CHAT_MAX_USER_CHARS,
  CHAT_RATE_LIMIT,
  CHAT_RATE_WINDOW_MS,
  bookingReply,
  contactPaymentReply,
  ensureNextStep,
  filterReply,
  founderReply,
  injectionReply,
  isBuyingIntent,
  isIdentityQuestion,
  isOffTopic,
  isPromptInjection,
  offTopicReply,
  rateLimitReply,
  turnLimitReply,
} from "@/lib/chat/guardrails";
import { CHAT_KNOWLEDGE_BASE } from "@/lib/chat/knowledge-base";
import { buildChatInstructions } from "@/lib/chat/prompt";
import { classifyFaqIntent } from "@/lib/faq-helper";
import { checkRateLimit } from "@/lib/rate-limit";

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ChatComplete = (input: {
  instructions: string;
  messages: ChatTurn[];
}) => Promise<string>;

export type ChatAnswerResult =
  | { ok: true; status: 200; reply: ChatReply; userTurns: number; userChars: number }
  | {
      ok: false;
      status: number;
      error: string;
      userTurns: number;
      userChars: number;
    };

function asRecord(value: unknown) {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function logChat(payload: Record<string, unknown>) {
  console.info(JSON.stringify({ scope: "chat", ...payload }));
}

export async function answerChat(input: {
  body: unknown;
  ip: string;
  complete: ChatComplete;
  now?: number;
  env?: Record<string, string | undefined>;
}): Promise<ChatAnswerResult> {
  const record = asRecord(input.body);
  const rawMessages = record?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return { ok: false, status: 400, error: "Send a question.", userTurns: 0, userChars: 0 };
  }

  const messages: ChatTurn[] = [];
  for (const item of rawMessages) {
    const message = asRecord(item);
    const role = message?.role;
    const content = message?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return { ok: false, status: 400, error: "Send a question.", userTurns: 0, userChars: 0 };
    }
    const text = content.replace(/\u0000/g, "").trim();
    if (!text) {
      return { ok: false, status: 400, error: "Send a question.", userTurns: 0, userChars: 0 };
    }
    if (role === "user" && text.length > CHAT_MAX_USER_CHARS) {
      return {
        ok: false,
        status: 400,
        error: "Keep each message under 500 characters.",
        userTurns: messages.filter((row) => row.role === "user").length,
        userChars: text.length,
      };
    }
    if (role === "assistant" && text.length > CHAT_MAX_ASSISTANT_CHARS) {
      return { ok: false, status: 400, error: "A message is too long.", userTurns: 0, userChars: 0 };
    }
    messages.push({ role, content: text });
  }

  const userMessages = messages.filter((message) => message.role === "user");
  const latest = messages[messages.length - 1];
  const userChars = latest?.role === "user" ? latest.content.length : 0;
  const userTurns = userMessages.length;

  if (!latest || latest.role !== "user") {
    return { ok: false, status: 400, error: "Send a question.", userTurns, userChars };
  }

  const limited = checkRateLimit(
    `chat:${input.ip || "unknown"}`,
    CHAT_RATE_WINDOW_MS,
    CHAT_RATE_LIMIT,
  );
  if (!limited.ok) {
    return {
      ok: true,
      status: 200,
      reply: {
        ...faqFallback(latest.content),
        text: rateLimitReply(),
        intent: "unsupported",
        matched: false,
      },
      userTurns,
      userChars,
    };
  }

  const ok = (reply: ChatReply): ChatAnswerResult => ({
    ok: true,
    status: 200,
    reply,
    userTurns,
    userChars,
  });

  if (userTurns > CHAT_MAX_TURNS || messages.length > CHAT_MAX_TURNS * 2) {
    return ok({
      ...faqFallback(latest.content),
      text: turnLimitReply(),
      matched: false,
    });
  }

  const live = isAiChatLive(input.env ?? process.env);
  if (!live) {
    logChat({ outcome: "faq", userTurns, userChars });
    return ok(faqFallback(latest.content));
  }

  if (userMessages.some((message) => isPromptInjection(message.content))) {
    return ok({
      ...faqFallback(latest.content),
      text: injectionReply(),
      intent: "injection",
      matched: false,
    });
  }

  const classified = classifyFaqIntent(latest.content);
  if (classified === "booking") {
    return ok({
      ...faqFallback(latest.content),
      text: bookingReply(),
      intent: "booking",
      matched: false,
    });
  }
  if (classified === "contact_payment") {
    return ok({
      ...faqFallback(latest.content),
      text: contactPaymentReply(),
      intent: "contact_payment",
      matched: false,
    });
  }
  if (classified === "injection") {
    return ok({
      ...faqFallback(latest.content),
      text: injectionReply(),
      intent: "injection",
      matched: false,
    });
  }

  if (isIdentityQuestion(latest.content)) {
    return ok({
      ...faqFallback(latest.content),
      text: founderReply(),
      matched: false,
    });
  }

  if (isOffTopic(latest.content) || classified === "off_topic") {
    return ok({
      ...faqFallback(latest.content),
      text: offTopicReply(),
      intent: "off_topic",
      matched: false,
    });
  }

  let generated = "";
  try {
    generated = await input.complete({
      instructions: buildChatInstructions(CHAT_KNOWLEDGE_BASE),
      messages,
    });
  } catch (error) {
    logChat({
      outcome: "upstream-fallback",
      name: error instanceof Error ? error.name : "Error",
      userTurns,
      userChars,
    });
    return ok(faqFallback(latest.content));
  }

  let text = filterReply(generated, CHAT_KNOWLEDGE_BASE);
  if (isBuyingIntent(latest.content)) {
    text = filterReply(ensureNextStep(text), CHAT_KNOWLEDGE_BASE);
  }

  logChat({ outcome: "ai", userTurns, userChars });
  return ok(aiReply(text, latest.content));
}
