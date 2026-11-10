import { createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FREE_AI_MAP_CONSENT_TEXT_VERSION, FREE_AI_MAP_PROMPT } from "@/lib/free-ai-map";
import { resetRateLimit } from "@/lib/rate-limit";

const insertFreeMapLead = vi.fn();

vi.mock("@/lib/free-map-leads", () => ({
  insertFreeMapLead: (...args: unknown[]) => insertFreeMapLead(...args),
}));

function post(body: unknown, headers?: HeadersInit) {
  return new Request("http://localhost/api/free-ai-map", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const valid = {
  name: "Owner Name",
  email: "owner@example.com",
  business_type: "Plumbing",
  consent: true,
  source: "free-ai-map",
  utm_source: "linkedin",
  utm_medium: "social",
  utm_campaign: "prompt",
};

describe("POST /api/free-ai-map", () => {
  beforeEach(() => {
    insertFreeMapLead.mockReset();
    insertFreeMapLead.mockResolvedValue({ stored: true, id: "lead-1" });
    resetRateLimit();
  });

  afterEach(() => {
    resetRateLimit();
  });

  it("rejects missing fields, invalid email, and missing consent", async () => {
    const { POST } = await import("./route");

    const missing = await POST(post({ name: "A" }));
    expect(missing.status).toBe(400);
    expect(await missing.json()).toMatchObject({
      ok: false,
      error: "Name, email, and business type are required.",
    });
    expect(insertFreeMapLead).not.toHaveBeenCalled();

    const badEmail = await POST(
      post({ ...valid, email: "not-an-email" }),
    );
    expect(badEmail.status).toBe(400);
    expect(await badEmail.json()).toMatchObject({
      ok: false,
      error: "Enter a valid email.",
    });
    expect(insertFreeMapLead).not.toHaveBeenCalled();

    const noConsent = await POST(post({ ...valid, consent: false }));
    expect(noConsent.status).toBe(400);
    expect(await noConsent.json()).toMatchObject({
      ok: false,
      error: "Consent is required.",
    });
    expect(insertFreeMapLead).not.toHaveBeenCalled();
  });

  it("inserts a valid lead with utm fields and a user-agent hash", async () => {
    const { POST } = await import("./route");
    const ua = "Mozilla/5.0 test-agent";
    const response = await POST(
      post(valid, { "user-agent": ua, "x-forwarded-for": "203.0.113.10" }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, prompt: FREE_AI_MAP_PROMPT });
    expect(insertFreeMapLead).toHaveBeenCalledTimes(1);
    const row = insertFreeMapLead.mock.calls[0][0];
    expect(row).toMatchObject({
      name: "Owner Name",
      email: "owner@example.com",
      businessType: "Plumbing",
      consentTextVersion: FREE_AI_MAP_CONSENT_TEXT_VERSION,
      source: "free-ai-map",
      utmSource: "linkedin",
      utmMedium: "social",
      utmCampaign: "prompt",
      utmTerm: null,
      utmContent: null,
    });
    expect(row.consentAt).toBeInstanceOf(Date);
    expect(row.userAgentHash).toBe(
      createHash("sha256").update(ua).digest("hex"),
    );
    expect(row.userAgentHash).not.toBe(ua);
  });

  it("skips insert on honeypot and rate-limits repeated posts", async () => {
    const { POST } = await import("./route");
    const honey = await POST(
      post(
        { ...valid, company_website: "https://spam.example" },
        { "x-forwarded-for": "198.51.100.20" },
      ),
    );
    expect(honey.status).toBe(200);
    expect(await honey.json()).toEqual({ ok: true, prompt: FREE_AI_MAP_PROMPT });
    expect(insertFreeMapLead).not.toHaveBeenCalled();

    const headers = { "x-forwarded-for": "198.51.100.21" };
    for (let i = 0; i < 5; i += 1) {
      const ok = await POST(post(valid, headers));
      expect(ok.status).toBe(200);
    }
    const limited = await POST(post(valid, headers));
    expect(limited.status).toBe(429);
    expect(await limited.json()).toMatchObject({ ok: false });
    expect(insertFreeMapLead).toHaveBeenCalledTimes(5);
  });
});
