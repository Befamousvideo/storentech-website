import type { BlogPost } from "@/lib/blog";
import { blogPosts } from "@/lib/blog";
import { site } from "@/lib/site";

/** Existing generated Open Graph image (`src/app/opengraph-image.tsx`). */
export const SITE_FALLBACK_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "StorenTech AI",
  type: "image/png",
} as const;

export const RELATED_POST_COUNT = 3;

export function siteFallbackOgImages() {
  return [
    {
      url: SITE_FALLBACK_OG_IMAGE.url,
      width: SITE_FALLBACK_OG_IMAGE.width,
      height: SITE_FALLBACK_OG_IMAGE.height,
      alt: SITE_FALLBACK_OG_IMAGE.alt,
      type: SITE_FALLBACK_OG_IMAGE.type,
    },
  ];
}

export function blogPostOgImages(post: BlogPost) {
  if (post.ogImage) {
    return [
      {
        url: post.ogImage.src,
        width: post.ogImage.width,
        height: post.ogImage.height,
        alt: post.ogImage.alt,
        type: post.ogImage.type,
      },
    ];
  }

  if (post.hero?.webp && post.hero.avif) {
    return [
      {
        url: post.hero.webp,
        width: post.hero.width,
        height: post.hero.height,
        alt: post.hero.alt,
        type: "image/webp",
      },
      {
        url: post.hero.avif,
        width: post.hero.width,
        height: post.hero.height,
        alt: post.hero.alt,
        type: "image/avif",
      },
    ];
  }

  if (post.hero?.png) {
    return [
      {
        url: post.hero.png,
        width: post.hero.width,
        height: post.hero.height,
        alt: post.hero.alt,
        type: "image/png",
      },
    ];
  }

  return siteFallbackOgImages();
}

export function blogPostJsonLdImage(post: BlogPost) {
  if (post.hero) {
    return {
      "@type": "ImageObject" as const,
      url: `${site.url}${post.hero.webp ?? post.hero.png ?? post.hero.avif}`,
      width: post.hero.width,
      height: post.hero.height,
    };
  }

  if (post.ogImage) {
    return {
      "@type": "ImageObject" as const,
      url: `${site.url}${post.ogImage.src}`,
      width: post.ogImage.width,
      height: post.ogImage.height,
    };
  }

  return {
    "@type": "ImageObject" as const,
    url: `${site.url}${SITE_FALLBACK_OG_IMAGE.url}`,
    width: SITE_FALLBACK_OG_IMAGE.width,
    height: SITE_FALLBACK_OG_IMAGE.height,
  };
}

/**
 * Next 2–3 live posts after `slug` in the published list, wrapping, never
 * self or duplicates. Uses only existing catalog titles and slugs.
 */
export function relatedPostsFor(slug: string, count = RELATED_POST_COUNT) {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index < 0) return [];

  const related: BlogPost[] = [];
  for (let step = 1; step < blogPosts.length && related.length < count; step += 1) {
    const candidate = blogPosts[(index + step) % blogPosts.length];
    if (!candidate || candidate.slug === slug) continue;
    if (related.some((post) => post.slug === candidate.slug)) continue;
    related.push(candidate);
  }
  return related;
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.brand.mark}`,
    image: `${site.url}${SITE_FALLBACK_OG_IMAGE.url}`,
    description: site.description,
  };
}
