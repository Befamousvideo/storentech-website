import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getPattern, patterns } from "@/lib/patterns";
import { getService } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return patterns.map((pattern) => ({ slug: pattern.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) return {};
  return pageMeta({
    title: `${pattern.title} — illustrative composite`,
    description: pattern.description,
    path: `/patterns/${pattern.slug}`,
  });
}

export default async function PatternPage({ params }: Props) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) notFound();

  const related = pattern.related
    .map((item) => getService(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Patterns", path: "/patterns" },
          { name: pattern.title, path: `/patterns/${pattern.slug}` },
        ])}
      />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">
            <Link href="/patterns">Patterns</Link>
            {" / "}
            {pattern.kicker}
          </p>
          <h1>{pattern.h1}</h1>
          <hr className="rule" />
          <p className="lede">
            {pattern.industry}. {pattern.theme}. Not a testimonial. Not a named
            client.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap copy-wide">
          <p className="notice">
            Illustrative composite. Built from a common bottleneck, not from a
            quoted customer.
          </p>
          <h2>The bottleneck</h2>
          <p>{pattern.bottleneck}</p>
          <h2>The automation pattern</h2>
          <p>{pattern.pattern}</p>
          <h2>How we would measure it</h2>
          <p>{pattern.measurement}</p>
          {related.length ? (
            <>
              <h2>Related jobs</h2>
              <p>
                {related.map((service, index) => (
                  <span key={service.slug}>
                    {index > 0 ? " · " : ""}
                    <Link href={`/work/${service.slug}`}>{service.title}</Link>
                  </span>
                ))}
              </p>
            </>
          ) : null}
        </div>
      </section>

      <CtaBand title="Pay for the map if this is the leak." />
    </>
  );
}
