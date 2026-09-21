import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { site } from "@/lib/site";

function isPayHost(hostHeader: string | null) {
  const host = hostHeader?.split(":")[0]?.toLowerCase() ?? "";
  return (site.payHosts as readonly string[]).includes(host);
}

function isPayPath(pathname: string) {
  return pathname === "/pay" || pathname.startsWith("/pay/");
}

export function middleware(request: NextRequest) {
  if (isPayHost(request.headers.get("host")) || isPayPath(request.nextUrl.pathname)) {
    return NextResponse.redirect(site.stripe.roiPaymentLink, 302);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
