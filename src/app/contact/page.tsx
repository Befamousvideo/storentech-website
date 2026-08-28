import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Start the paid ROI analysis",
  description:
    "Start a paid Automation ROI analysis with StorenTech AI in Corona Del Mar from $1,000, or call Sarah at 714-613-8557. No free audit.",
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
          <h1>Start the paid analysis.</h1>
          <hr className="rule" />
          <p className="lede">
            Starts at {site.prices.analysisFrom}. More complex work can be higher.
            The fee may be credited toward implementation. Tell us what is broken.
            Call Sarah if you want to hear the first employee before you buy the
            map. Paid from day one — if the company cannot fund the analysis, we do
            not start.
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
                <div className="kicker">Email</div>
                <a href={`mailto:${site.emails.vincent}`}>{site.emails.vincent}</a>
                <br />
                <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>
              </div>
              <p>
                {site.founder.name}, {site.founder.title}.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
