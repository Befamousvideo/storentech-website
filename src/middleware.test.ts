import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { middleware } from "@/middleware";
import { site } from "@/lib/site";

const HOMEPAGE = "https://www.storentechai.com/";

function request(url: string, host?: string) {
  const headers = new Headers();
  if (host) {
    headers.set("host", host);
    headers.set("x-forwarded-host", host);
  }
  return new NextRequest(url, { headers });
}

function expectHomepage(req: NextRequest, status: number) {
  const res = middleware(req);
  expect(res.status, req.url).toBe(status);
  expect(res.headers.get("location"), req.url).toBe(HOMEPAGE);
  expect(res.headers.get("location"), req.url).not.toContain("buy.stripe.com");
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
      expectHomepage(req, 308);
    }
  });

  it("temporarily sends /pay on any host to the www homepage", () => {
    const cases = [
      request("https://www.storentechai.com/pay"),
      request("https://www.storentechai.com/pay/", "www.storentechai.com"),
      request("https://www.storentechai.com/pay/invoice"),
      request("https://storentechai.com/pay", "storentechai.com"),
      request("https://pay.storentechai.com/pay", "pay.storentechai.com"),
    ];

    for (const req of cases) {
      expectHomepage(req, 307);
    }
  });

  it("temporarily sends every path on site.payHosts to the www homepage", () => {
    expect(site.payHosts).toEqual([
      "pay.storentechai.com",
      "www.pay.storentechai.com",
    ]);

    const cases = site.payHosts.flatMap((host) => [
      request(`https://${host}/`, host),
      request(`https://${host}/anything`, host),
      request(`https://${host}/pay`, host),
      request(`https://${host}/old-checkout?ref=invoice`, host),
    ]);

    for (const req of cases) {
      expectHomepage(req, 307);
    }
  });

  it("still lets /redo through so that page can keep the retired Payment Link", () => {
    const redo = middleware(request("https://www.storentechai.com/redo"));
    expect(redo.status).toBe(200);
    expect(redo.headers.get("location")).toBeNull();

    const redoOnPay = middleware(
      request("https://pay.storentechai.com/redo", "pay.storentechai.com"),
    );
    expect(redoOnPay.status).toBe(200);
    expect(redoOnPay.headers.get("location")).toBeNull();
  });
});
