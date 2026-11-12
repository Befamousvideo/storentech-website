import "server-only";

/**
 * Retired pay subdomain. Middleware still 307s these hosts to the homepage
 * (next.config.ts / vercel.json keep the matching host rules). Kept
 * server-only so a new checkout can be relinked later without shipping the
 * hosts in client JS.
 */
export const PAY_HOSTS = [
  "pay.storentechai.com",
  "www.pay.storentechai.com",
] as const;

/**
 * Retired Stripe Payment Link. No live route sends visitors here — /pay and
 * pay-host traffic already go to the homepage. Parked server-side so a new
 * link can be wired later without leaking into client chunks.
 */
export const RETIRED_ROI_PAYMENT_LINK =
  "https://buy.stripe.com/6oU14ngeE5w1a8wd7RdjO00";
