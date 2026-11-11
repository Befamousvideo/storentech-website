import type { MetadataRoute } from "next";
import { LAW_ROOT_INDEX } from "@/lib/ad-landing-lead";
import { blogPosts, postPath } from "@/lib/blog";
import { CONTRACTORS_PATH } from "@/lib/contractors-page";
import { LAW_CANONICAL_PATH } from "@/lib/law-landing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/opportunity",
    "/free-ai-map",
    ...(LAW_ROOT_INDEX.includeInSitemap ? [LAW_CANONICAL_PATH] : []),
    CONTRACTORS_PATH,
    "/work",
    "/how-it-works",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/privacy-choices",
    "/terms",
  ];
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/blog"
          ? 0.7
          : route === "/privacy" ||
              route === "/privacy-choices" ||
              route === "/terms"
            ? 0.4
            : 0.8,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${site.url}${postPath(post.slug)}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
