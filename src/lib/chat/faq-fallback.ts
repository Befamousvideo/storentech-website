import { answerFaqQuery, type FaqHelperResponse } from "@/lib/faq-helper";
import { CHAT_KNOWLEDGE_VERSION } from "@/lib/chat/knowledge-base";

export type ChatMode = "faq" | "ai";

export type ChatReply = {
  mode: ChatMode;
  text: string;
  intent: FaqHelperResponse["intent"] | "ai";
  entryId: string | null;
  knowledgeVersion: string;
  sources: FaqHelperResponse["sources"];
  matched: boolean;
  showHandoff: boolean;
};

export function faqFallback(query: string, mode: ChatMode = "faq"): ChatReply {
  const reply = answerFaqQuery(query);
  return {
    mode,
    text: reply.text,
    intent: reply.intent,
    entryId: reply.entryId,
    knowledgeVersion: reply.knowledgeVersion,
    sources: reply.sources,
    matched: reply.matched,
    showHandoff: reply.showHandoff,
  };
}

export function aiReply(text: string, fallbackQuery: string): ChatReply {
  const retrieved = answerFaqQuery(fallbackQuery);
  return {
    mode: "ai",
    text,
    intent: "ai",
    entryId: retrieved.matched ? retrieved.entryId : null,
    knowledgeVersion: CHAT_KNOWLEDGE_VERSION,
    sources: retrieved.matched ? retrieved.sources : [],
    matched: retrieved.matched,
    showHandoff: true,
  };
}
