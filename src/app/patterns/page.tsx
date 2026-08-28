import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { patterns } from "@/lib/patterns";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Patterns — illustrative composites, not testimonials",
  description:
    "How AI automation shows up in ordinary SMB weeks: missed calls, speed-to-lead, booking, follow-up, ops, HR screening, reviews. Labeled composites, not client quotes.",
  path: "/patterns",
});

export default function PatternsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Patterns", path: "/patterns" },
        ])}
      />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Patterns</p>
          <h1>What this looks like in an ordinary week.</h1>
          <hr className="rule" />
          <p className="lede">
            These are labeled composites — industry-pattern stories, not named
            clients and not testimonials. No invented quotes, no fake lift
            percentages. Each one is a bottleneck we see, the employee that fits,
            and how we would measure it.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="notice">
            Illustrative only. If a story reads like your week, that is the point.
            It is not a case study about a specific company.
          </p>
          <div className="job-grid two" style={{ marginTop: "1.8rem" }}>
            {patterns.map((pattern) => (
              <article className="card" key={pattern.slug}>
                <p className="kicker">{pattern.industry}</p>
                <h3>
                  <Link href={`/patterns/${pattern.slug}`}>{pattern.title}</Link>
                </h3>
                <p>{pattern.bottleneck}</p>
                <p className="fine" style={{ marginTop: "0.9rem" }}>
                  <Link href={`/patterns/${pattern.slug}`}>Read the pattern</Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="If this is your week, start with the map." />
    </>
  );
}
