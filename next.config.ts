import type { NextConfig } from "next";
import { site } from "./src/lib/site";

const stripe = site.stripe.roiPaymentLink;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path(ceo|cfo|ops)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/pay",
        destination: stripe,
        permanent: false,
      },
      {
        source: "/pay/:path*",
        destination: stripe,
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "host", value: "pay.storentechai.com" }],
        destination: stripe,
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "host", value: "www.pay.storentechai.com" }],
        destination: stripe,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
