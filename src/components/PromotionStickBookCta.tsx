import { PROMOTION_STICK_COPY } from "@/lib/promotion-stick";

/** Placeholder until checkout exists. No booking, payment, or calendar URL. */
export function PromotionStickBookCta() {
  return (
    <button
      type="button"
      className="btn btn-solid"
      aria-disabled="true"
      data-placeholder="booking-checkout-not-built"
    >
      {PROMOTION_STICK_COPY.hero.cta}
    </button>
  );
}
