import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SarahContact } from "@/components/SarahContact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a paid Automation ROI Analysis with StorenTech AI. Call Sarah or use the form.",
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
            you want to talk before you buy the map.
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
            <SarahContact
              className="sarah-contact"
              primaryClassName="sarah-contact-primary"
              secondaryClassName="sarah-contact-secondary"
            />
          </aside>
        </div>
      </section>
    </>
  );
}
