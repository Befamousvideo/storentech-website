import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { patterns } from "@/lib/patterns";
import { getService, services } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({
    title: service.title,
    description: service.description,
    path: `/work/${service.slug}`,
    ogTitle: `${service.title} · StorenTech AI`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const steps = [
    { n: "01", title: "Intake", body: service.how.intake },
    { n: "02", title: "Build", body: service.how.build },
    { n: "03", title: "Handoff", body: service.how.handoff },
    { n: "04", title: "Measurement", body: service.how.measurement },
  ];

  const relatedPatterns = patterns.filter((pattern) =>
    pattern.related.includes(service.slug),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: service.title, path: `/work/${service.slug}` },
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.description,
          path: `/work/${service.slug}`,
        })}
      />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">
            <Link href="/work">Work</Link>
            {" / "}
            {service.kicker}
          </p>
          <h1>{service.h1}</h1>
          <hr className="rule" />
          <p className="lede">{service.lede}</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap detail-grid">
          <article className="card">
            <p className="kicker">Who it is for</p>
            <h2>Fit.</h2>
            <p>{service.forWho}</p>
          </article>
          <article className="card">
            <p className="kicker">What it includes</p>
            <h2>The job.</h2>
            <ul>
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-tan">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h2 className="faq-title">Intake, build, handoff, measurement.</h2>
          <div className="engagement">
            {steps.map((step) => (
              <article className="engagement-row" key={step.n}>
                <div className="n">{step.n}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="fine" style={{ marginTop: "2rem" }}>
            Commercial path is the same for every hire:{" "}
            <Link href="/how-it-works">paid ROI analysis</Link>, first employee in
            about 30 days if the numbers work, then a retainer. Hear the pattern —
            call Sarah at{" "}
            <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>.
            {relatedPatterns.length ? (
              <>
                {" "}
                Illustrative week:{" "}
                {relatedPatterns.map((pattern, index) => (
                  <span key={pattern.slug}>
                    {index > 0 ? ", " : ""}
                    <Link href={`/patterns/${pattern.slug}`}>{pattern.title}</Link>
                  </span>
                ))}
                .
              </>
            ) : null}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
