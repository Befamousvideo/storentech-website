import type { Metadata } from "next";
import { BreakGlassActions } from "@/components/BreakGlassActions";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Break Glass",
  description: "Emergency contact for StorenTech.",
  alternates: { canonical: "/break-glass" },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function BreakGlassPage() {
  return (
    <section className="break-glass">
      <div className="wrap break-glass-inner">
        <p className="kicker">StorenTech</p>
        <h1>Break Glass</h1>
        <hr className="rule" />
        <p className="lede">
          If you need StorenTech right now, call Sarah or save the contact.
        </p>
        <BreakGlassActions />
      </div>
    </section>
  );
}
