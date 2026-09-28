import type { Metadata } from "next";
import { IntakeLink } from "@/components/IntakeLink";
import { SarahPhoneImage } from "@/components/SarahContact";
import { site } from "@/lib/site";

// Mary locked Step 03 verbatim (Partner after the map). Do not rewrite that step.

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Paid AI Opportunity Map first: an Automation ROI Analysis of time, revenue, and risk leaks. Map leaks first. Then the Build Plan — people still in the loop, out front with customers.",
  alternates: { canonical: "/how-it-works" },
};

const moves = [
  {
    n: "01",
    title: "AI Opportunity Map",
    body: `Typical fee ${site.prices.analysisTypical}. ${site.prices.analysisComplex} when the operation is complex — multiple locations, a messy stack, or a wider catalog. You get a ranked map: where time and revenue hide, what to fix first, what can wait. This is paid work. It is not a complimentary sales call.`,
  },
  {
    n: "02",
    title: "Build Plan",
    body: "When AI takes the grind, teams can unlock multiple times the productive capacity of people who stay human — more output, human touch stays. Builds may include voice agents, website chat, operations automation, web apps, mobile apps, and custom-built solutions.",
  },
  {
    n: "03",
    title: "Partner after the map",
    body: "After the written map, we scope an ongoing partnership from the evidence — what to run, what to measure, and when to expand. Terms follow what the analysis shows. No public retainer menu on this site.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h1>Pay for the map. Then the Build Plan.</h1>
          <hr className="rule" />
          <p className="lede">
            The door is a paid AI Opportunity Map. {site.offer.services}{" "}
            {site.offer.capacity} Call Sarah if you want to talk before you buy
            the map.
          </p>
          <div className="btn-row" style={{ marginTop: "1.7rem" }}>
            <IntakeLink className="btn btn-solid">{site.offer.cta}</IntakeLink>
            <SarahPhoneImage className="sarah-phone" />
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
            <h2>Pay for the map. Then the Build Plan.</h2>
          </div>
          <div className="copy">
            <p>
              When AI takes the grind, teams can unlock multiple times the
              productive capacity of people who stay human — more output, human
              touch stays.
            </p>
            <p>
              The analysis prices the first build against your real numbers —
              conversation volume, close rate, after-hours leakage, owner time.
              Humans stay in the loop. AI does the grind humans hate; humans
              do what AI can’t. We stay on as operator.
            </p>
            <p>
              Proof is process, not a case-study reel: call Sarah, pay for the
              map, build what pays if it earns.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
