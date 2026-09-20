"use client";

import Script from "next/script";
import { site } from "@/lib/site";

export function StripeBuyButton() {
  return (
    <div className="stripe-checkout">
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />
      <stripe-buy-button
        buy-button-id={site.stripe.buyButtonId}
        publishable-key={site.stripe.publishableKey}
      />
      <p className="fine stripe-fallback">
        Prefer a payment link, or paying an invoice? Use the same Stripe
        checkout:{" "}
        <a href={site.stripe.paymentLink} rel="noopener noreferrer">
          Pay {site.prices.analysisTypical} for the typical analysis
        </a>
        .
      </p>
    </div>
  );
}
