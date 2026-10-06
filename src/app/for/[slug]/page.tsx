import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ForPreviewArticle } from "@/components/ForPreviewArticle";
import {
  forPagePath,
  forPages,
  forPageTitle,
  getForPage,
} from "@/lib/for-pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return forPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getForPage(slug);
  if (!page) return {};

  const title = forPageTitle(page);

  return {
    title: { absolute: title },
    description: page.description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: { canonical: forPagePath(page.slug) },
    openGraph: {
      title,
      description: page.description,
      url: forPagePath(page.slug),
    },
    twitter: {
      card: "summary",
      title,
      description: page.description,
    },
  };
}

export default async function ForSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getForPage(slug);
  if (!page) notFound();

  return <ForPreviewArticle page={page} />;
}
