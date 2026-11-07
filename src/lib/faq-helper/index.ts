export {
  FAQ_HELPER_KNOWLEDGE_VERSION,
  FAQ_HELPER_HANDOFF,
  faqKnowledgeEntries,
  getFaqKnowledgeEntry,
} from "@/lib/faq-helper/knowledge";
export { answerFaqQuery, classifyFaqIntent } from "@/lib/faq-helper/respond";
export type { FaqHelperIntent, FaqHelperResponse } from "@/lib/faq-helper/respond";
export { retrieveFaqEntry, scoreFaqEntry } from "@/lib/faq-helper/retrieve";
