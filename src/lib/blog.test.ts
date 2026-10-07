import { describe, expect, it } from "vitest";
import { blogPosts, getPost } from "@/lib/blog";
import sitemap from "@/app/sitemap";

describe("live blog post dates", () => {
  it("uses the approved datePublished values and lists newest first", () => {
    expect(
      blogPosts.map((post) => ({
        slug: post.slug,
        datePublished: post.datePublished,
      })),
    ).toEqual([
      { slug: "ai-agent-cost-controls", datePublished: "2026-10-05" },
      {
        slug: "nvidia-ai-agent-safety-explained",
        datePublished: "2026-09-29",
      },
      { slug: "zapier-webhooks-ai-agents", datePublished: "2026-09-28" },
      { slug: "mastermind-hybrid-ai", datePublished: "2026-09-25" },
      { slug: "ai-security-for-ai-employees", datePublished: "2026-09-23" },
      {
        slug: "what-is-an-automation-roi-analysis",
        datePublished: "2026-09-21",
      },
    ]);

    const dates = blogPosts.map((post) => post.datePublished);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(getPost("ai-agent-cost-controls")).toBeDefined();
    expect(getPost("nvidia-ai-agent-safety-explained")).toBeDefined();
  });

  it("feeds Article dates and sitemap lastModified from datePublished", () => {
    const posts = sitemap().filter((entry) =>
      entry.url.includes("/blog/"),
    );
    expect(posts).toHaveLength(blogPosts.length);

    for (const post of blogPosts) {
      const entry = posts.find((item) => item.url.endsWith(`/blog/${post.slug}`));
      expect(entry, post.slug).toBeTruthy();
      expect(entry?.lastModified).toEqual(new Date(post.datePublished));
    }
  });
});
