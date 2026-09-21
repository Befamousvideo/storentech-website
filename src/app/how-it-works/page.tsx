import type { Metadata } from "next";
import { IntakeLink } from "@/components/IntakeLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Paid Automation ROI Analysis first: a written map of time, revenue, and risk leaks. Map leaks first. Then build what pays — people still in the loop, out front with customers.",
  alternates: { canonical: "/how-it-works" },
};

const moves = [
  {
    n: "01",
    title: "Automation ROI Analysis",
    body: `Typical fee ${site.prices.analysisTypical}. ${site.prices.analysisComplex} when the operation is complex — multiple locations, a messy stack, or a wider catalog. You get a ranked map: where time and revenue hide, what to fix first, what can wait. This is paid work. It is not a complimentary sales call.`,
  },
  {
    n: "02",
    title: "After the map, build what pays",
    body: "If the numbers work, AI does the grind humans hate and humans stay in the loop — more touch, 10×, a calmer office. Implementation is not the $1k product. Voice, website chat, or other ops may come later, when the map says so.",
  },
  {
    n: "03",
    title: "Stay on the grind",
    body: `Capacity at ${site.prices.employee}/month: one production workflow a month, reporting. Growth at ${site.prices.growth}/month: two workflows, outbound and inbox, weekly command center. From there the firm can take revenue work, operations, content, implementation studio, white-label, or CTV when the map calls for it.`,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h1>Pay for the map. Then we build what pays.</h1>
          <hr className="rule" />
          <p className="lede">
            The door is a paid Automation ROI Analysis. {site.offer.services}{" "}
            {site.offer.capacity} Call Sarah if you want to talk before you buy
            the map.
          </p>
          <div className="btn-row" style={{ marginTop: "1.7rem" }}>
            <IntakeLink className="btn btn-solid">Start the paid analysis</IntakeLink>
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
            <h2>A map, then 10× capacity.</h2>
          </div>
          <div className="copy">
            <p>
              The analysis prices the first build against your real numbers —
              conversation volume, close rate, after-hours leakage, owner time.
              Humans stay in the loop. AI does the grind humans hate; humans
              do what AI can’t. We stay on as operator.
            </p>
            <p>
              Proof is process, not a case-study reel: call Sarah at{" "}
              <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>
              , pay for the map, build what pays if it earns.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
