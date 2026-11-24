import { THRIVE_COPY } from "@/lib/thrive-after-your-promotion";

/** Placeholder until checkout exists. No booking, payment, or calendar URL. */
export function PromotionStickBookCta() {
  return (
    <button
      type="button"
      className="btn btn-solid"
      aria-disabled="true"
      data-placeholder="booking-checkout-not-built"
    >
      {THRIVE_COPY.hero.cta}
    </button>
  );
}
