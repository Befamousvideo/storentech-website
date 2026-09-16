import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/onboard", destination: "/roi-analysis", permanent: false }];
  },
};

export default nextConfig;
