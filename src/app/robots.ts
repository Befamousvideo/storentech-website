import type { MetadataRoute } from "next";
import { INTERVIEW_CRAWLER_AGENTS, INTERVIEW_PATHS } from "@/lib/interview-paths";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const interview = [...INTERVIEW_PATHS];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/pay", "/redo", ...interview],
      },
      ...INTERVIEW_CRAWLER_AGENTS.map((userAgent) => ({
        userAgent,
        disallow: interview,
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
