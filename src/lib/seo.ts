import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
};

export function pageMeta({ title, description, path, ogTitle }: PageMetaInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  const socialTitle = ogTitle ?? title;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: site.name,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
