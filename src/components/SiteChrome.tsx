"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slim = pathname === "/redo";

  return (
    <>
      <Header slim={slim} />
      <main id="main">{children}</main>
      {slim ? null : <Footer />}
    </>
  );
}
