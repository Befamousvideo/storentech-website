import type { NextConfig } from "next";
import { site } from "./src/lib/site";

const stripe = site.stripe.roiPaymentLink;

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
        source: "/:path*",
        has: [{ type: "host", value: "pay.storentechai.com" }],
        destination: stripe,
        permanent: false,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pay.storentechai.com" }],
        destination: stripe,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
