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

function isRedoPath(pathname: string) {
  return pathname === "/redo" || pathname.startsWith("/redo/");
}

function isAssetPath(pathname: string) {
  return (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    /\.(?:avif|css|gif|ico|jpe?g|js|map|png|svg|txt|webp|woff2?|xml)$/i.test(
      pathname,
    )
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isRedoPath(pathname) || isAssetPath(pathname)) {
    return NextResponse.next();
  }

  if (isPayHost(request) || isPayPath(pathname)) {
    return NextResponse.redirect(site.stripe.roiPaymentLink, 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
