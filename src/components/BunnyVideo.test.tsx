import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  BUNNY_IFRAME_ALLOW,
  BunnyVideo,
  blogVideoJsonLd,
  bunnyAspectRatio,
  bunnyEmbedSrc,
} from "@/components/BunnyVideo";
import { NvidiaAiAgentSafetyArticle } from "@/components/blog/NvidiaAiAgentSafetyArticle";
import { blogPosts, getPost } from "@/lib/blog";
import nextConfig from "../../next.config";

const LIBRARY_ID = "12345";
const VIDEO_ID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
const EMBED_SRC = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${VIDEO_ID}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;

const costPost = getPost("ai-agent-cost-controls");

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("BunnyVideo", () => {
  it("shows a placeholder and no iframe when the library id or video id is missing", () => {
    const missing = [
      { bunnyId: undefined, libraryId: undefined },
      { bunnyId: VIDEO_ID, libraryId: undefined },
      { bunnyId: undefined, libraryId: LIBRARY_ID },
      { bunnyId: "   ", libraryId: "  " },
    ];

    for (const props of missing) {
      const { container, unmount } = render(
        <BunnyVideo title="What it costs to run an AI agent" {...props} />,
      );
      expect(container.textContent).toContain("Video coming soon");
      expect(container.querySelector("iframe")).toBeNull();
      expect(container.innerHTML).not.toContain("iframe.mediadelivery.net");
      expect(container.innerHTML).not.toContain("tel:");
      expect(container.innerHTML).not.toContain("mailto:");
      unmount();
    }
  });

  it("embeds the Bunny player when both ids are present", () => {
    const { container } = render(
      <BunnyVideo
        bunnyId={VIDEO_ID}
        libraryId={LIBRARY_ID}
        title="What it costs to run an AI agent"
        aspect="4:5"
      />,
    );
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();
    expect(iframe).toHaveAttribute("src", EMBED_SRC);
    expect(iframe).toHaveAttribute("title", "What it costs to run an AI agent");
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveAttribute("allow", BUNNY_IFRAME_ALLOW);
    expect(iframe).toHaveAttribute("allowfullscreen");
    expect(container.querySelector(".bunny-video")).toHaveStyle({
      aspectRatio: "4 / 5",
    });
    expect(container.textContent).not.toContain("Video coming soon");
  });

  it("defaults the frame to 16:9 and reads the public library id", () => {
    expect(bunnyAspectRatio()).toBe("16 / 9");
    expect(bunnyAspectRatio("16:9")).toBe("16 / 9");
    expect(bunnyAspectRatio("4 / 5")).toBe("4 / 5");
    expect(bunnyAspectRatio("nope")).toBe("16 / 9");

    vi.stubEnv("NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID", ` ${LIBRARY_ID} `);
    const { container } = render(
      <BunnyVideo bunnyId={` ${VIDEO_ID} `} title="Spokesperson" />,
    );
    expect(container.querySelector("iframe")).toHaveAttribute("src", EMBED_SRC);
    expect(container.querySelector(".bunny-video")).toHaveStyle({
      aspectRatio: "16 / 9",
    });
  });

  it("keeps a slash in an id inside one path segment", () => {
    expect(bunnyEmbedSrc("12/34", "ab cd")).toBe(
      "https://iframe.mediadelivery.net/embed/12%2F34/ab%20cd?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
    );
  });

  it("adds VideoObject JSON-LD only when a real video id and library id exist", () => {
    expect(costPost?.video).toEqual({
      title: "What it costs to run an AI agent",
      aspect: "16:9",
    });
    expect(costPost?.video?.bunnyId).toBeUndefined();
    expect(blogPosts.filter((post) => post.video).map((post) => post.slug)).toEqual([
      "ai-agent-cost-controls",
    ]);
    expect(blogVideoJsonLd(costPost!, LIBRARY_ID)).toBeNull();
    expect(
      blogVideoJsonLd(
        {
          description: costPost!.description,
          datePublished: costPost!.datePublished,
          video: { bunnyId: "   ", title: "What it costs to run an AI agent" },
        },
        LIBRARY_ID,
      ),
    ).toBeNull();

    const ld = blogVideoJsonLd(
      {
        description: costPost!.description,
        datePublished: costPost!.datePublished,
        video: {
          bunnyId: VIDEO_ID,
          title: "What it costs to run an AI agent",
        },
      },
      LIBRARY_ID,
    );
    expect(ld).toMatchObject({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "What it costs to run an AI agent",
      description: costPost!.description,
      uploadDate: "2026-10-05",
      embedUrl: EMBED_SRC,
      publisher: {
        "@type": "Organization",
        name: "StorenTech AI",
      },
    });
    const encoded = JSON.stringify(ld);
    expect(encoded).not.toContain("tel:");
    expect(encoded).not.toContain("mailto:");
  });

  it("leaves posts without video metadata alone", () => {
    const post = getPost("nvidia-ai-agent-safety-explained");
    expect(post?.video).toBeUndefined();
    const { container } = render(<NvidiaAiAgentSafetyArticle post={post!} />);
    expect(container.textContent).not.toContain("Video coming soon");
    expect(container.querySelector("iframe")).toBeNull();
  });
});

describe("Bunny Stream frame-src", () => {
  it("allows iframe.mediadelivery.net in next.config.ts and vercel.json", async () => {
    const expected = {
      key: "Content-Security-Policy",
      value:
        "frame-src 'self' https://iframe.mediadelivery.net https://vercel.live",
    };
    const nextHeaders = (await nextConfig.headers?.()) ?? [];
    const nextCsp = nextHeaders
      .filter((rule) => rule.source === "/(.*)")
      .flatMap((rule) => rule.headers);
    const vercel = JSON.parse(
      readFileSync(join(process.cwd(), "vercel.json"), "utf8"),
    ) as {
      headers: { source: string; headers: { key: string; value: string }[] }[];
    };
    const vercelCsp = vercel.headers
      .filter((rule) => rule.source === "/(.*)")
      .flatMap((rule) => rule.headers);

    expect(nextCsp).toEqual([expected]);
    expect(vercelCsp).toEqual([expected]);
    expect(nextCsp[0]?.value).toContain("https://iframe.mediadelivery.net");
  });
});
