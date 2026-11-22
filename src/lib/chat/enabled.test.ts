import { describe, expect, it } from "vitest";
import {
  DEFAULT_AI_CHAT_MODEL,
  chatModelId,
  hasAiGatewayAccess,
  isAiChatLive,
  isAiChatRequested,
  isProductionDeployment,
} from "@/lib/chat/enabled";

describe("AI chat feature flag", () => {
  it("stays off in production even if requested", () => {
    const env = {
      AI_CHAT_ENABLED: "true",
      VERCEL_ENV: "production",
      AI_GATEWAY_API_KEY: "test-key",
    };
    expect(isProductionDeployment(env)).toBe(true);
    expect(isAiChatRequested(env)).toBe(true);
    expect(isAiChatLive(env)).toBe(false);
  });

  it("stays off without a gateway key or OIDC token", () => {
    const env = {
      AI_CHAT_ENABLED: "true",
      VERCEL_ENV: "preview",
    };
    expect(hasAiGatewayAccess(env)).toBe(false);
    expect(isAiChatLive(env)).toBe(false);
  });

  it("is live only on preview or development with a key", () => {
    const env = {
      AI_CHAT_ENABLED: "true",
      VERCEL_ENV: "preview",
      AI_GATEWAY_API_KEY: "test-key",
    };
    expect(isAiChatLive(env)).toBe(true);
    expect(chatModelId(env)).toBe(DEFAULT_AI_CHAT_MODEL);
  });

  it("accepts a custom model id", () => {
    expect(
      chatModelId({
        AI_GATEWAY_MODEL: "google/gemini-2.5-flash",
      }),
    ).toBe("google/gemini-2.5-flash");
  });
});
