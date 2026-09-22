import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SarahPhoneImage } from "@/components/SarahContact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a paid Automation ROI Analysis with StorenTech AI. Write us on the form, or talk to Sarah.",
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
            when the operation is complex. Tell us what is broken. The form is
            the written path; Sarah is the voice path.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap contact-grid">
          <ContactForm />
          <aside className="aside-box">
            <p className="kicker">Talk to Sarah</p>
            <h2>Orange County, CA</h2>
            <p>
              Prefer to talk before you buy the map? Leave a message or request
              a callback.
            </p>
            <SarahPhoneImage className="sarah-phone" />
          </aside>
        </div>
      </section>
    </>
  );
}
