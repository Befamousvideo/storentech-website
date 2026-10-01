import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const ROBOTS_DISALLOW_PATHS = [
  "/api/",
  "/pay",
  "/redo",
] as const;

export default function robots(): MetadataRoute.Robots {
  const disallow = [...ROBOTS_DISALLOW_PATHS];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
