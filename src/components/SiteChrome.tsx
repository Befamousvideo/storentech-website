"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { isInterviewPath } from "@/lib/interview-paths";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slim = pathname === "/redo" || isInterviewPath(pathname);
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
