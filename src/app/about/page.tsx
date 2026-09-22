import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "StorenTech AI is a principal-led automation firm based in Orange County, California. We start with a $1,000 Automation ROI Analysis — a written map of where time or revenue leaks, what to fix first, and how that shows up as lower cost or more revenue.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">About</p>
          <h1 className="about-title">
            StorenTech AI · Orange County, California
          </h1>
          <hr className="rule" />
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow copy">
          <p>
            StorenTech AI is a principal-led automation firm based in Orange
            County, California. We start with a $1,000 Automation ROI Analysis
            — a written map of where time or revenue leaks, what to fix first,
            and how that shows up as lower cost or more revenue.
          </p>
          <p>
            After the map, we put AI on the grind so your people can stay out
            front where human touch matters. More output. Human touch stays.
          </p>
          <p>
            We do not publish retainers on this site. Ongoing work is scoped
            from the evidence in your analysis.
          </p>
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
