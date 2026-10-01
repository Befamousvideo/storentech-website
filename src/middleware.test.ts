import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { middleware } from "@/middleware";
import { site } from "@/lib/site";

const HOMEPAGE = "https://www.storentechai.com/";
const STRIPE = "https://buy.stripe.com/6oU14ngeE5w1a8wd7RdjO00";

function request(url: string, host?: string) {
  const headers = new Headers();
  if (host) {
    headers.set("host", host);
    headers.set("x-forwarded-host", host);
  }
  return new NextRequest(url, { headers });
}

describe("middleware redirects", () => {
  it("sends /ceo /cfo /ops on every host to the www homepage, including pay hosts", () => {
    const cases = [
      request("https://www.storentechai.com/ceo"),
      request("https://www.storentechai.com/ceo/", "www.storentechai.com"),
      request("https://www.storentechai.com/ceo?k=1"),
      request("https://storentechai.com/cfo", "storentechai.com"),
      request("https://www.storentechai.com/cfo/session"),
      request("https://pay.storentechai.com/ops", "pay.storentechai.com"),
      request("https://pay.storentechai.com/ops/", "pay.storentechai.com"),
      request(
        "https://www.pay.storentechai.com/ceo/extra?ref=link",
        "www.pay.storentechai.com",
      ),
    ];

    for (const req of cases) {
      const res = middleware(req);
      expect(res.status, req.url).toBe(308);
      expect(res.headers.get("location"), req.url).toBe(HOMEPAGE);
    }
  });

  it("still sends /pay and the pay-host root to the unchanged Stripe link", () => {
    expect(site.stripe.roiPaymentLink).toBe(STRIPE);

    const pay = middleware(request("https://www.storentechai.com/pay"));
    expect(pay.status).toBe(302);
    expect(pay.headers.get("location")).toBe(STRIPE);

    const payHost = middleware(
      request("https://pay.storentechai.com/", "pay.storentechai.com"),
    );
    expect(payHost.status).toBe(302);
    expect(payHost.headers.get("location")).toBe(STRIPE);
  });
});
