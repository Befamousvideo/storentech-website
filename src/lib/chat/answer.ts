import {
  CHAT_MAX_ASSISTANT_CHARS,
  CHAT_MAX_TURNS,
  CHAT_MAX_USER_CHARS,
  allowChatRequest,
  ensureNextStep,
  filterReply,
  founderReply,
  freeIntroReply,
  injectionReply,
  isBuyingIntent,
  isFreeIntroQuestion,
  isIdentityQuestion,
  isOffTopic,
  isPaidMapQuestion,
  isPromptInjection,
  notInKnowledgeReply,
  paidMapReply,
  turnLimitReply,
} from "@/lib/chat/guardrails";
import { loadChatKnowledgeBase } from "@/lib/chat/knowledge";
import { buildChatInstructions } from "@/lib/chat/prompt";

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ChatComplete = (input: {
  instructions: string;
  messages: ChatTurn[];
}) => Promise<string>;

export type ChatResult = {
  ok: boolean;
  status: number;
  reply?: string;
  error?: string;
  userTurns: number;
  userChars: number;
};

const UNAVAILABLE =
  "Chat is unavailable. You can book a free 15-minute intro call or leave your email.";

function logChat(result: ChatResult) {
  console.info(
    JSON.stringify({
      scope: "chat",
      outcome: result.ok ? "reply" : "reject",
      status: result.status,
      userTurns: result.userTurns,
      userChars: result.userChars,
    }),
  );
}

function finish(result: ChatResult) {
  logChat(result);
  return result;
}

function reject(status: number, error: string, userTurns = 0, userChars = 0) {
  return finish({ ok: false, status, error, userTurns, userChars });
}

function reply(text: string, userTurns: number, userChars: number) {
  return finish({ ok: true, status: 200, reply: text, userTurns, userChars });
}

function asRecord(value: unknown) {
  return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

export async function answerChat(input: {
  body: unknown;
  ip: string;
  complete: ChatComplete;
  now?: number;
}) {
  const record = asRecord(input.body);
  const rawMessages = record?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return reject(400, "Send a question.");
  }

  const messages: ChatTurn[] = [];
  for (const item of rawMessages) {
    const message = asRecord(item);
    const role = message?.role;
    const content = message?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return reject(400, "Send a question.");
    }
    const text = content.replace(/\u0000/g, "").trim();
    if (!text) return reject(400, "Send a question.");
    if (role === "user" && text.length > CHAT_MAX_USER_CHARS) {
      return reject(400, "Keep each message under 500 characters.", messages.length, text.length);
    }
    if (role === "assistant" && text.length > CHAT_MAX_ASSISTANT_CHARS) {
      return reject(400, "A message is too long.");
    }
    messages.push({ role, content: text });
  }

  const userMessages = messages.filter((message) => message.role === "user");
  const latest = messages[messages.length - 1];
  const userChars = latest?.role === "user" ? latest.content.length : 0;
  const userTurns = userMessages.length;

  if (!latest || latest.role !== "user") {
    return reject(400, "Send a question.", userTurns, userChars);
  }

  if (!allowChatRequest(input.ip || "unknown", input.now)) {
    return reject(
      429,
      "Too many messages from this network. Try again shortly, or book a free 15-minute intro call or leave your email.",
      userTurns,
      userChars,
    );
  }

  const knowledgeBase = loadChatKnowledgeBase();
  const say = (text: string) => reply(filterReply(text, knowledgeBase), userTurns, userChars);

  if (userTurns > CHAT_MAX_TURNS || messages.length > CHAT_MAX_TURNS * 2) {
    return say(turnLimitReply());
  }

  if (userMessages.some((message) => isPromptInjection(message.content))) {
    return say(injectionReply());
  }

  if (isIdentityQuestion(latest.content)) {
    return say(founderReply(knowledgeBase));
  }

  if (isFreeIntroQuestion(latest.content)) {
    return say(freeIntroReply(knowledgeBase));
  }

  if (isPaidMapQuestion(latest.content)) {
    return say(paidMapReply());
  }

  if (isOffTopic(latest.content)) {
    return say(notInKnowledgeReply());
  }

  let generated = "";
  try {
    generated = await input.complete({
      instructions: buildChatInstructions(knowledgeBase),
      messages,
    });
  } catch (error) {
    console.info(
      JSON.stringify({
        scope: "chat",
        outcome: "upstream",
        name: error instanceof Error ? error.name : "Error",
      }),
    );
    return reject(503, UNAVAILABLE, userTurns, userChars);
  }

  let text = filterReply(generated, knowledgeBase);
  if (isBuyingIntent(latest.content)) text = filterReply(ensureNextStep(text), knowledgeBase);
  return reply(text, userTurns, userChars);
}
