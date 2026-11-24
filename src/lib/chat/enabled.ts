import "server-only";

export const DEFAULT_AI_CHAT_MODEL = "openai/gpt-4o-mini" as const;

function isTruthy(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "on" || normalized === "yes";
}

type Env = Record<string, string | undefined>;

export function isProductionDeployment(
  env: Env = process.env,
) {
  return (
    env.VERCEL_ENV === "production" || env.NEXT_PUBLIC_VERCEL_ENV === "production"
  );
}

export function isAiChatRequested(env: Env = process.env) {
  return isTruthy(env.AI_CHAT_ENABLED);
}

export function chatModelId(env: Env = process.env) {
  const model = env.AI_CHAT_MODEL?.trim() || env.AI_GATEWAY_MODEL?.trim() || "";
  const provider = env.AI_GATEWAY_PROVIDER?.trim() || "";
  if (!model) return DEFAULT_AI_CHAT_MODEL;
  if (model.includes("/") || !provider) return model;
  return `${provider}/${model}`;
}

export function hasAiGatewayAccess(env: Env = process.env) {
  return Boolean(env.AI_GATEWAY_API_KEY?.trim() || env.VERCEL_OIDC_TOKEN?.trim());
}

/**
 * Live generative answers only when explicitly enabled, never in production,
 * and only when AI Gateway credentials exist. Missing keys do not buy anything;
 * the scripted FAQ stays in place.
 */
export function isAiChatLive(env: Env = process.env) {
  return (
    isAiChatRequested(env) &&
    !isProductionDeployment(env) &&
    hasAiGatewayAccess(env)
  );
}
