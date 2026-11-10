import { NextResponse } from "next/server";
import {
  FREE_AI_MAP_CONSENT_TEXT_VERSION,
  FREE_AI_MAP_PATH,
  FREE_AI_MAP_PROMPT,
} from "@/lib/free-ai-map";
import { insertFreeMapLead } from "@/lib/free-map-leads";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { hashUserAgent } from "@/lib/user-agent-hash";

type Payload = {
  name?: unknown;
  email?: unknown;
  business_type?: unknown;
  consent?: unknown;
  company_website?: unknown;
  source?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_term?: unknown;
  utm_content?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asOptional(value: unknown, max = 200) {
  const text = asString(value);
  if (!text) return null;
  return text.length > max ? text.slice(0, max) : text;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasConsent(value: unknown) {
  return value === true || value === "true" || value === "on" || value === "1";
}

function jsonError(error: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = checkRateLimit(`free-ai-map:${ip}`);
  if (!limited.ok) {
    return jsonError("Try again in a few minutes.", 429, {
      retryAfterSec: limited.retryAfterSec,
    });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return jsonError("Invalid JSON.", 400);
  }

  if (asString(body.company_website)) {
    return NextResponse.json({ ok: true, prompt: FREE_AI_MAP_PROMPT });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const businessType = asString(body.business_type);

  if (!name || !email || !businessType) {
    return jsonError("Name, email, and business type are required.", 400);
  }
  if (!isEmail(email)) {
    return jsonError("Enter a valid email.", 400);
  }
  if (!hasConsent(body.consent)) {
    return jsonError("Consent is required.", 400);
  }
  if (name.length > 200 || email.length > 200 || businessType.length > 200) {
    return jsonError("A field is too long.", 400);
  }

  try {
    await insertFreeMapLead({
      name,
      email,
      businessType,
      consentAt: new Date(),
      consentTextVersion: FREE_AI_MAP_CONSENT_TEXT_VERSION,
      source: asOptional(body.source) ?? FREE_AI_MAP_PATH.slice(1),
      utmSource: asOptional(body.utm_source),
      utmMedium: asOptional(body.utm_medium),
      utmCampaign: asOptional(body.utm_campaign),
      utmTerm: asOptional(body.utm_term),
      utmContent: asOptional(body.utm_content),
      userAgentHash: hashUserAgent(request.headers.get("user-agent")),
    });
  } catch {
    return jsonError("Could not save this just now. Try again.", 502);
  }

  return NextResponse.json({ ok: true, prompt: FREE_AI_MAP_PROMPT });
}
