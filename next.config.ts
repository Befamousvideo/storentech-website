import type { NextConfig } from "next";
import { site } from "./src/lib/site";

const homepage = "https://www.storentechai.com/";
const stripe = site.stripe.roiPaymentLink;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Retired interview routes first so they beat the pay-host Stripe rules.
      {
        source: "/ceo",
        destination: homepage,
        permanent: true,
      },
      {
        source: "/ceo/:path*",
        destination: homepage,
        permanent: true,
      },
      {
        source: "/cfo",
        destination: homepage,
        permanent: true,
      },
      {
        source: "/cfo/:path*",
        destination: homepage,
        permanent: true,
      },
      {
        source: "/ops",
        destination: homepage,
        permanent: true,
      },
      {
        source: "/ops/:path*",
        destination: homepage,
        permanent: true,
      },
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
