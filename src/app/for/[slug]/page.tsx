import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  forPagePath,
  forPages,
  forPageTitle,
  getForPage,
  type ForPage,
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

export function ForPreviewArticle({ page }: { page: ForPage }) {
  return (
    <article className="blog-article">
      <meta name="robots" content="noindex, nofollow" />
      <header className="page-hero blog-hero">
        <div className="wrap-narrow">
          <h1>{page.h1}</h1>
          <hr className="rule" />
        </div>
      </header>

      <div className="wrap-narrow blog-prose">
        <h2>{page.topHeading}</h2>
        <p>{page.topBody}</p>

        <h2>{page.lookFirstHeading}</h2>
        <ul>
          {page.lookFirst.map((item) => (
            <li key={item.lead}>
              <strong>{item.lead}</strong> {item.rest}
            </li>
          ))}
        </ul>

        <h2>{page.agentHeading}</h2>
        <p>{page.agentIntro}</p>
        <ol>
          {page.questions.map((item) => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.text}
            </li>
          ))}
        </ol>

        <h2>{page.startHeading}</h2>
        <p>{page.startBody}</p>
        <p>{page.close}</p>

        <section className="blog-cta">
          <div className="btn-row">
            <Link className="btn btn-solid" href={page.ctaHref}>
              {page.ctaLabel}
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

export default async function ForSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getForPage(slug);
  if (!page) notFound();

  return <ForPreviewArticle page={page} />;
}
