import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "StorenTech AI is a principal-led firm in Orange County. The front door is a paid Automation ROI Analysis. After the map, AI does the grind; people stay.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">About</p>
          <h1>{site.name}.</h1>
          <hr className="rule" />
          <p className="lede">
            A principal-led firm in Orange County. We map where time or revenue
            leaks, then fix what pays. Human touch stays.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">The firm</p>
            <h2>Principal-led on purpose.</h2>
          </div>
          <div className="copy">
            <p>
              You work with a principal, not a bench of account coordinators.
              {site.founder.name} runs the work. When a project needs a
              specialist — voice, CRM, a tighter integration, creative, media —
              we bring them in. The standard is the same: the work has to pay.
            </p>
            <p>
              StorenTech AI is a full-service AI agency based in Orange County,
              California. The front door is a paid Automation ROI Analysis. After
              the map, AI does the grind humans hate; people stay with the
              customer and stay accountable. Multiple times human productivity
              gains is real — more output while human touch stays.
            </p>
            <p>
              Call Sarah from the header, or write us from{" "}
              <Link href="/contact">Contact</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tan">
        <div className="wrap split">
          <div>
            <p className="kicker">How we choose</p>
            <h2>Selective, not exclusive.</h2>
          </div>
          <div className="copy">
            <p>
              We choose clients. We are not locked to one industry. Fit is a
              volume of conversations, a calendar that matters, and an operator
              who will give us real numbers. Examples we already understand:
              dental and med spa, insurance, residential contractors, wealth and
              mortgage, professional services, home services. Manufacturing and
              the right larger project are on the table.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="stats">
            <div className="stat">
              <strong>16+</strong>
              <span>Years on messy business-tech</span>
            </div>
            <div className="stat">
              <strong>2023</strong>
              <span>StorenTech AI founded</span>
            </div>
            <div className="stat">
              <strong>OC</strong>
              <span>Orange County, CA</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
