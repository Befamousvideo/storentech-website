import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a paid Automation ROI Analysis with StorenTech AI in Corona Del Mar, or call Sarah at +1 714-613-8557.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Contact</p>
          <h1>Start the paid analysis.</h1>
          <hr className="rule" />
          <p className="lede">
            Typical fee {site.prices.analysisTypical}. {site.prices.analysisComplex}{" "}
            when the operation is complex. Tell us what is broken. Call Sarah if
            you want to hear the first employee before you buy the map.
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
                <div className="kicker">{site.phones.sarah.label}</div>
                <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>
              </div>
              <div>
                <div className="kicker">Email</div>
                <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>
                <br />
                <a href={`mailto:${site.emails.vincent}`}>{site.emails.vincent}</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
