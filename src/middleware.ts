import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { site } from "@/lib/site";

function requestHosts(request: NextRequest) {
  const raw = [
    request.headers.get("x-forwarded-host"),
    request.headers.get("host"),
    request.nextUrl.hostname,
  ];
  return raw.flatMap((value) =>
    (value ?? "")
      .split(",")
      .map((part) => part.trim().split(":")[0]?.toLowerCase() ?? "")
      .filter(Boolean),
  );
}

function isPayHost(request: NextRequest) {
  const allowed = site.payHosts as readonly string[];
  return requestHosts(request).some((host) => allowed.includes(host));
}

function isPayPath(pathname: string) {
  return pathname === "/pay" || pathname.startsWith("/pay/");
}

export function middleware(request: NextRequest) {
  if (isPayHost(request) || isPayPath(request.nextUrl.pathname)) {
    return NextResponse.redirect(site.stripe.roiPaymentLink, 302);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
