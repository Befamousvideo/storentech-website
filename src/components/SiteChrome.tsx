"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { isForPreviewPath } from "@/lib/for-pages";

function hideJsonLd(pathname: string) {
  return (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    isForPreviewPath(pathname)
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const quiet = isForPreviewPath(pathname);

  return (
    <>
      {hideJsonLd(pathname) ? null : <JsonLd />}
      <Header quiet={quiet} />
      <main id="main">{children}</main>
      <Footer quiet={quiet} />
    </>
  );
}
