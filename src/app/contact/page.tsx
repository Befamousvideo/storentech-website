import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact the office",
  description:
    "Write StorenTech AI in Corona Del Mar. Office +1 714-794-9199, 8:00 AM – 6:00 PM Pacific. Sarah +1 714-613-8557. Paid ROI analysis starts on /roi-analysis.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Contact</p>
          <h1>Write the office.</h1>
          <hr className="rule" />
          <p className="lede">
            For a paid ROI analysis,{" "}
            <Link href="/roi-analysis">start the interview</Link> — it starts at{" "}
            {site.prices.analysisFrom}. This page is for a short note to the office.
            Office hours are {site.hours.office}. Bookable Zoom or in-person
            appointments are {site.hours.appointments}. {site.hours.appointmentsNote}{" "}
            Call Sarah at {site.phones.sarah.display} if you want to hear the first
            employee. The office line is {site.phones.office.display}.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap contact-grid">
          <ContactForm />
          <aside className="aside-box">
            <p className="kicker">The office</p>
            <h2>Corona Del Mar.</h2>
            <p>{site.location.full}</p>
            <div className="stack">
              <div>
                <div className="kicker">Sarah</div>
                <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>
              </div>
              <div>
                <div className="kicker">Office</div>
                <a href={`tel:${site.phones.office.tel}`}>{site.phones.office.display}</a>
              </div>
              <div>
                <div className="kicker">Hours</div>
                <p>Office {site.hours.office}.</p>
                <p>
                  Bookable Zoom or in person: {site.hours.appointments}.{" "}
                  {site.hours.appointmentsNote}
                </p>
              </div>
              <div>
                <div className="kicker">Email</div>
                <a href={`mailto:${site.emails.vincent}`}>{site.emails.vincent}</a>
                <br />
                <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>
              </div>
              <p>
                {site.founder.name}, {site.founder.title}.
              </p>
              <Link className="btn btn-gold" href="/roi-analysis">
                Start the ROI Analysis
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
