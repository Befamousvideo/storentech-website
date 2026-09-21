import type { Metadata } from "next";
import { PayRedirect } from "@/app/pay/PayRedirect";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pay",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pay" },
};

export default function PayPage() {
  const href = site.stripe.roiPaymentLink;

  return (
    <>
      <PayRedirect href={href} />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Pay</p>
          <h1>Continue to the Automation ROI Analysis.</h1>
          <hr className="rule" />
          <p className="lede">
            <a href={href}>Pay $1,000 for the Automation ROI Analysis</a>
          </p>
        </div>
      </header>
    </>
  );
}
