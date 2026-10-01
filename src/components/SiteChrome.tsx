"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const legal = pathname === "/privacy" || pathname === "/terms";

  return (
    <>
      {legal ? null : <JsonLd />}
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
