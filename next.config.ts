import type { NextConfig } from "next";

const homepage = "https://www.storentechai.com/";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/for",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/for/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/ai-opportunity-map",
        destination: "/opportunity",
        statusCode: 301,
      },
      {
        source: "/ai-opportunity-map/",
        destination: "/opportunity",
        statusCode: 301,
      },
      {
        source: "/map",
        destination: "/opportunity",
        statusCode: 301,
      },
      {
        source: "/map/",
        destination: "/opportunity",
        statusCode: 301,
      },
      {
        source: "/roia",
        destination: "/opportunity",
        statusCode: 301,
      },
      {
        source: "/roia/",
        destination: "/opportunity",
        statusCode: 301,
      },
      // Retired interview and /redo routes first so they beat pay-host catch-alls.
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
        source: "/redo",
        destination: homepage,
        permanent: true,
      },
      {
        source: "/redo/:path*",
        destination: homepage,
        permanent: true,
      },
      {
        source: "/pay",
        destination: homepage,
        permanent: false,
      },
      {
        source: "/pay/:path*",
        destination: homepage,
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "host", value: "pay.storentechai.com" }],
        destination: homepage,
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "host", value: "www.pay.storentechai.com" }],
        destination: homepage,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
