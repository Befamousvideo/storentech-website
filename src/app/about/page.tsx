import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vincent Jackson, President of StorenTech AI — a full-service AI agency in Corona Del Mar. Orange County operator and technical specialist. StorenTech AI since 2023.",
  authors: [{ name: site.founder.name }],
  creator: site.founder.name,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">About</p>
          <h1>
            {site.founder.name}, {site.founder.title}.
          </h1>
          <hr className="rule" />
          <p className="lede">
            Orange County operator and technical specialist. Sixteen-plus years
            solving messy business-tech for people who have a company to run.
            StorenTech AI since 2023.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">The firm</p>
            <h2>Small on purpose.</h2>
          </div>
          <div className="copy">
            <p>
              You work with a principal, not a bench of account coordinators.
              When a project needs a specialist — voice, CRM, a tighter
              integration, creative, media — we bring them in. The standard is
              the same: the hire has to pay.
            </p>
            <p>
              StorenTech is a full-service AI agency and a private firm in Corona
              Del Mar. The front door is a paid Automation ROI Analysis and a
              named AI employee. The studio behind that door can take the rest of
              the problem once the numbers work.
            </p>
            <p>
              The office is at {site.location.full}. Call{" "}
              {site.phones.sarah.label} at{" "}
              <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>
              , or write{" "}
              <a href={`mailto:${site.emails.vincent}`}>{site.emails.vincent}</a>.
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
              <span>Newport Beach / Corona Del Mar</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
