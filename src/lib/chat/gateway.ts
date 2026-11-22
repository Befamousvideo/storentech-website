import "server-only";

import { generateText, type LanguageModel } from "ai";
import { chatModelId } from "@/lib/chat/enabled";
import type { ChatComplete } from "@/lib/chat/answer";

export const completeWithGateway: ChatComplete = async ({
  instructions,
  messages,
}) => {
  const { text } = await generateText({
    model: chatModelId() as LanguageModel,
    instructions,
    messages,
    maxOutputTokens: 320,
    temperature: 0.2,
  });

  return text;
};
