"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { isForPreviewPath } from "@/lib/for-pages";

const ChatWidget = dynamic(
  () => import("@/components/ChatWidget").then((mod) => mod.ChatWidget),
  { ssr: false },
);

function hideJsonLd(pathname: string) {
  return (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/contractors" ||
    pathname.startsWith("/contractors/") ||
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
      {quiet ? null : <ChatWidget />}
    </>
  );
}
