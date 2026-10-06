"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";

function hideJsonLd(pathname: string) {
  return (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/for" ||
    pathname.startsWith("/for/")
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  return (
    <>
      {hideJsonLd(pathname) ? null : <JsonLd />}
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
