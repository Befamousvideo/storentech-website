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
  it("sends legacy map URLs to /opportunity as a single 301", () => {
    const wwwCases = [
      ["/opportunity/", "/opportunity"],
      ["/ai-opportunity-map", "/opportunity"],
      ["/ai-opportunity-map/", "/opportunity"],
      ["/ai-opportunity-map?utm=1", "/opportunity?utm=1"],
      ["/ai-opportunity-map/?utm=1", "/opportunity?utm=1"],
      ["/map", "/opportunity"],
      ["/map/", "/opportunity"],
      ["/map?from=old", "/opportunity?from=old"],
      ["/map/?from=old", "/opportunity?from=old"],
      ["/roia", "/opportunity"],
      ["/roia/", "/opportunity"],
      ["/roia?q=keep", "/opportunity?q=keep"],
      ["/roia/?q=keep", "/opportunity?q=keep"],
    ] as const;

    for (const [path, dest] of wwwCases) {
      const req = request(`https://www.storentechai.com${path}`);
      const res = middleware(req);
      expect(res.status, req.url).toBe(301);
      expect(res.headers.get("location"), req.url).toBe(
        `https://www.storentechai.com${dest}`,
      );
    }

    const payReq = request(
      "https://pay.storentechai.com/roia?q=keep",
      "pay.storentechai.com",
    );
    const payRes = middleware(payReq);
    expect(payRes.status).toBe(301);
    expect(payRes.headers.get("location")).toBe(
      "https://www.storentechai.com/opportunity?q=keep",
    );
  });

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

  it("sends /redo on every host to the www homepage, including pay hosts", () => {
    const cases = [
      request("https://www.storentechai.com/redo"),
      request("https://www.storentechai.com/redo/", "www.storentechai.com"),
      request("https://www.storentechai.com/redo?invoice=1"),
      request("https://storentechai.com/redo", "storentechai.com"),
      request("https://pay.storentechai.com/redo", "pay.storentechai.com"),
      request("https://pay.storentechai.com/redo/", "pay.storentechai.com"),
      request(
        "https://www.pay.storentechai.com/redo?ref=invoice",
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

  it("temporarily sends unmatched pay-host paths to the www homepage", () => {
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
});
