import { readFileSync } from "node:fs";
import path from "node:path";

let cached: string | undefined;

export function loadChatKnowledgeBase() {
  if (cached === undefined) {
    cached = readFileSync(path.join(process.cwd(), "content/chatbot-kb.md"), "utf8");
  }
  return cached;
}
