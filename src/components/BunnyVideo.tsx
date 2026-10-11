import { site } from "@/lib/site";

export const BUNNY_IFRAME_ALLOW =
  "accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen";

const EMBED_ORIGIN = "https://iframe.mediadelivery.net";
const PLAYER_QUERY =
  "autoplay=false&loop=false&muted=false&preload=true&responsive=true";

export type BunnyVideoProps = {
  bunnyId?: string;
  title: string;
  /** Ratio such as "16:9" (default) or "4:5". */
  aspect?: string;
  /** Overrides NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID. Useful in tests. */
  libraryId?: string;
};

function nonEmpty(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

export function bunnyStreamLibraryId(
  env: { NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID?: string } = process.env,
) {
  return nonEmpty(env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID);
}

/** CSS aspect-ratio value. Unknown input falls back to 16:9. */
export function bunnyAspectRatio(aspect?: string) {
  const raw = nonEmpty(aspect) ?? "16:9";
  const match = raw.match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/);
  if (!match || Number(match[2]) === 0) return "16 / 9";
  return `${match[1]} / ${match[2]}`;
}

export function bunnyEmbedSrc(libraryId: string, videoId: string) {
  return `${EMBED_ORIGIN}/embed/${encodeURIComponent(libraryId)}/${encodeURIComponent(videoId)}?${PLAYER_QUERY}`;
}

export function blogVideoJsonLd(
  post: {
    description: string;
    datePublished: string;
    video?: { bunnyId?: string; title: string };
  },
  libraryId = bunnyStreamLibraryId(),
) {
  const videoId = nonEmpty(post.video?.bunnyId);
  const title = nonEmpty(post.video?.title);
  const resolvedLibrary = nonEmpty(libraryId);
  if (!resolvedLibrary || !videoId || !title) return null;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description: post.description,
    uploadDate: post.datePublished,
    embedUrl: bunnyEmbedSrc(resolvedLibrary, videoId),
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function BunnyVideo({
  bunnyId,
  title,
  aspect,
  libraryId,
}: BunnyVideoProps) {
  const resolvedLibrary = nonEmpty(libraryId) ?? bunnyStreamLibraryId();
  const resolvedVideo = nonEmpty(bunnyId);
  const aspectRatio = bunnyAspectRatio(aspect);

  if (!resolvedLibrary || !resolvedVideo) {
    return (
      <div
        className="bunny-video bunny-video-placeholder"
        style={{ aspectRatio }}
      >
        <hr className="rule" />
        <p className="bunny-video-soon">Video coming soon</p>
      </div>
    );
  }

  return (
    <div className="bunny-video" style={{ aspectRatio }}>
      <iframe
        src={bunnyEmbedSrc(resolvedLibrary, resolvedVideo)}
        title={title}
        loading="lazy"
        allow={BUNNY_IFRAME_ALLOW}
        allowFullScreen
      />
    </div>
  );
}
