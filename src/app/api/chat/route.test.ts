import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resetRateLimit } from "@/lib/rate-limit";

const completeWithGateway = vi.fn();

vi.mock("@/lib/chat/gateway", () => ({
  completeWithGateway: (...args: unknown[]) => completeWithGateway(...args),
}));

function post(body: unknown, headers?: HeadersInit) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

describe("POST /api/chat", () => {
  beforeEach(() => {
    completeWithGateway.mockReset();
    resetRateLimit();
  });

  afterEach(() => {
    resetRateLimit();
  });

  it("returns the scripted FAQ when AI chat is not live", async () => {
    const { POST } = await import("./route");
    const response = await POST(
      post({ messages: [{ role: "user", content: "What is an AI Opportunity Map?" }] }),
    );
    const payload = await response.json();
    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.mode).toBe("faq");
    expect(payload.text).toContain("time or revenue leaks");
    expect(completeWithGateway).not.toHaveBeenCalled();
  });

  it("rejects invalid JSON", async () => {
    const { POST } = await import("./route");
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      }),
    );
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ ok: false });
  });
});
