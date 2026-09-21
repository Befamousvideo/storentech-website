import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Red O",
  description: "Red O — Automation ROI Analysis.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/redo" },
};

export default function RedoPage() {
  const href = site.stripe.roiPaymentLink;

  return (
    <header className="page-hero redo-hero">
      <div className="wrap wrap-narrow">
        <p className="kicker">Red O</p>
        <h1>Automation ROI Analysis — {site.prices.analysisTypical}</h1>
        <hr className="rule" />
        <p className="lede">One location + corp HQ.</p>
        <div className="btn-row" style={{ marginTop: "1.7rem" }}>
          <a className="btn btn-solid" href={href}>
            Pay
          </a>
        </div>
        <p className="fine" style={{ marginTop: "1.35rem" }}>
          In Stripe checkout, include invoice #, company, and a phone so we can
          match payment.
        </p>
        <p className="fine" style={{ marginTop: "0.85rem" }}>
          <a href={`${site.url}/contact`}>Questions?</a>
        </p>
      </div>
    </header>
  );
}
