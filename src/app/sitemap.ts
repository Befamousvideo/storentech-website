import type { MetadataRoute } from "next";
import { blogPosts, postPath } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/how-it-works", "/about", "/contact", "/blog"];
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/blog" ? 0.7 : 0.8,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${site.url}${postPath(post.slug)}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
