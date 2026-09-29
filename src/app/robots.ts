import type { MetadataRoute } from "next";
import { INTERVIEW_CRAWLER_AGENTS, INTERVIEW_PATHS } from "@/lib/interview-paths";
import { site } from "@/lib/site";

/** Named crawlers ignore the * group, so every group needs the full list. */
export const ROBOTS_DISALLOW_PATHS = [
  "/api/",
  "/pay",
  "/redo",
  ...INTERVIEW_PATHS,
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
      ...INTERVIEW_CRAWLER_AGENTS.map((userAgent) => ({
        userAgent,
        disallow,
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
