import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Paid Automation ROI Analysis, then the first AI employee in 30 days if the numbers work, then a named retainer. Never a complimentary audit.",
  alternates: { canonical: "/how-it-works" },
};

const moves = [
  {
    n: "01",
    title: "Automation ROI Analysis",
    body: `Typical fee ${site.prices.analysisTypical}. ${site.prices.analysisComplex} when the operation is complex — multiple locations, a messy stack, or a wider catalog than a single front-of-house hire. You get a ranked roadmap: which named employee to hire first, what it should earn, and what comes after. This is paid work. It is not a complimentary sales call.`,
  },
  {
    n: "02",
    title: "First AI employee in 30 days",
    body: "If the numbers work, we hire. The first employee is usually voice and chat for speed-to-lead, booking, and CRM — because that is where the leak is. The analysis may put a different job first. Either way, a named employee is live in 30 days, on the calendar and tools you already run.",
  },
  {
    n: "03",
    title: "Retainer once it is earning",
    body: `AI Employee at ${site.prices.employee}/month: one bot, one workflow a month, reporting. Growth at ${site.prices.growth}/month: two bots, outbound and inbox, weekly command center. From there the firm can take revenue work, operations, content, implementation studio, white-label, or CTV when the map calls for it.`,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h1>Pay for the map. Then we hire.</h1>
          <hr className="rule" />
          <p className="lede">
            StorenTech is a full-service AI agency. The commercial path is still
            one sequence: a paid Automation ROI Analysis, a first AI employee if
            the math holds, then a retainer. Call Sarah if you want to hear the
            work before you buy the map.
          </p>
          <div className="btn-row" style={{ marginTop: "1.7rem" }}>
            <Link className="btn btn-solid" href="/pay">
              Start the paid analysis
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
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.1rem)", margin: "0.7rem 0 2.2rem" }}>
            Three moves. In that order.
          </h2>
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
        <div className="wrap split">
          <div>
            <p className="kicker">What you buy</p>
            <h2>A named employee and an outcome.</h2>
          </div>
          <div className="copy">
            <p>
              The analysis prices the first hire against your real numbers —
              conversation volume, close rate, after-hours leakage, owner time.
              The product is a named employee and an outcome. We stay on as
              operator.
            </p>
            <p>
              Proof is process, not a case-study reel: call Sarah at{" "}
              <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>
              , pay for the map, hire in 30 days if it earns.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
