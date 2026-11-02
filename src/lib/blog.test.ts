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
      {
        slug: "pick-first-ai-project",
        datePublished: "2026-10-30",
      },
      {
        slug: "hugging-face-github-explained",
        datePublished: "2026-10-28",
      },
      {
        slug: "ai-sorts-leads-service-requests",
        datePublished: "2026-10-26",
      },
      {
        slug: "monthly-automation-check-up",
        datePublished: "2026-10-23",
      },
      {
        slug: "ai-voice-agent-small-business",
        datePublished: "2026-10-21",
      },
      {
        slug: "what-should-your-business-ai-be-allowed-to-do",
        datePublished: "2026-10-17",
      },
      {
        slug: "ai-pull-reports-from-vendor-portals",
        datePublished: "2026-10-17",
      },
      {
        slug: "ai-model-retirement-nov-30-business-checklist",
        datePublished: "2026-10-15",
      },
      { slug: "when-ai-agents-dont-stop", datePublished: "2026-10-12" },
      { slug: "ai-tool-cleanup-checklist", datePublished: "2026-10-12" },
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
