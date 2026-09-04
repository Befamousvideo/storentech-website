import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { faqs, retainers, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "How it works — paid ROI analysis, then a 30-day hire",
  description:
    "StorenTech’s path: paid Automation ROI analysis from $1,000, first AI employee live in about 30 days if the numbers work, then a named retainer. Never a free audit.",
  path: "/how-it-works",
});

const moves = [
  {
    n: "01",
    title: "Automation ROI Analysis",
    body: `Starts at ${site.prices.analysisFrom}. More complex work can run higher — often ${site.prices.analysisComplex} when there are multiple locations, a messy stack, or a wider catalog than one front-of-house hire. You get a ranked roadmap: which named employee to hire first, what it should earn, and what comes after. The fee may be credited toward implementation. This is paid work. If a company cannot fund the analysis, we do not start.`,
  },
  {
    n: "02",
    title: "First AI employee in about 30 days",
    body: "If the numbers work, we hire. The first employee is usually voice and chat for speed-to-lead, missed-call recovery, and booking — because that is where the leak is. The analysis may put a different job first. Either way, a named employee is live in about 30 days, on the calendar and tools you already run.",
  },
  {
    n: "03",
    title: "Retainer once it is earning",
    body: `Around ${site.prices.employee}/month for one named employee: one bot, one workflow a month, reporting. Around ${site.prices.growth}/month for Growth: two bots, outbound and inbox, weekly command center. From there the firm can take revenue work, operations, reviews, content, the implementation studio, white-label, or CTV when the map calls for it.`,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How it works", path: "/how-it-works" },
        ])}
      />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h1>Pay for the map. Then we hire.</h1>
          <hr className="rule" />
          <p className="lede">
            StorenTech is a full-service AI agency. The commercial path is one
            sequence: a paid Automation ROI Analysis, a first AI employee if the
            math holds, then a retainer. Call Sarah if you want to hear the work
            before you buy the map.
          </p>
          <div className="btn-row" style={{ marginTop: "1.7rem" }}>
            <Link className="btn btn-solid" href="/roi-analysis">
              Start the ROI Analysis
            </Link>
            <a className="btn" href={`tel:${site.phones.sarah.tel}`}>
              Call Sarah first
            </a>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <p className="kicker">The engagement</p>
          <h2 className="faq-title">Three moves. In that order.</h2>
          <div className="engagement">
            {moves.map((move) => (
              <article className="engagement-row" key={move.n}>
                <div className="n">{move.n}</div>
                <div>
                  <h3>{move.title}</h3>
                  <p>{move.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tan">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">When we stay</p>
              <h2>Named monthly employees. Not a pile of hours.</h2>
            </div>
            <p className="lede">
              These numbers belong here, not as a homepage menu. The product is the
              employee and the weekly rhythm.
            </p>
          </div>
          <div className="card-grid-2">
            {retainers.map((plan) => (
              <article className="card" key={plan.name}>
                <p className="kicker">{plan.name}</p>
                <p className="price">{plan.price}</p>
                <h3>{plan.summary}</h3>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">What you buy</p>
            <h2>A named employee and an outcome.</h2>
          </div>
          <div className="copy">
            <p>
              The analysis prices the first hire against your real numbers —
              conversation volume, close rate, after-hours leakage, owner time.
              Proof is process: call Sarah at{" "}
              <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>,
              pay for the map, hire in about 30 days if it earns.
            </p>
            <p>
              The office is open {site.hours.office}. Bookable Zoom or in-person
              appointments are {site.hours.appointments}. {site.hours.appointmentsNote}{" "}
              Call Sarah at{" "}
              <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>{" "}
              for the live voice demo. The office line is{" "}
              <a href={`tel:${site.phones.office.tel}`}>{site.phones.office.display}</a>.
            </p>
            <p>
              How we wire it is on <Link href="/technology">Technology</Link>. How it
              shows up in an ordinary week is on{" "}
              <Link href="/patterns">Patterns</Link> — composites, not testimonials.
            </p>
          </div>
        </div>
      </section>

      <Faq items={faqs} />
      <CtaBand />
    </>
  );
}
