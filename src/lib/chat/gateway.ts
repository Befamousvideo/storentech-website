import { generateText, type LanguageModel } from "ai";
import type { ChatComplete } from "@/lib/chat/answer";

export function chatModelId() {
  const model = process.env.AI_GATEWAY_MODEL?.trim() ?? "";
  const provider = process.env.AI_GATEWAY_PROVIDER?.trim() ?? "";
  if (!model) return "";
  if (model.includes("/") || !provider) return model;
  return `${provider}/${model}`;
}

export const completeWithGateway: ChatComplete = async ({ instructions, messages }) => {
  const model = chatModelId();
  if (!model) {
    const error = new Error("Chat model is not configured");
    error.name = "ChatUnavailable";
    throw error;
  }

  const { text } = await generateText({
    model: model as LanguageModel,
    instructions,
    messages,
    maxOutputTokens: 280,
    temperature: 0.2,
  });

  return text;
};
