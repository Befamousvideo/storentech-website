"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slim = pathname === "/redo";
  const legal = pathname === "/privacy" || pathname === "/terms";

  return (
    <>
      {slim || legal ? null : <JsonLd />}
      <Header slim={slim} />
      <main id="main">{children}</main>
      {slim ? null : <Footer />}
    </>
  );
}
