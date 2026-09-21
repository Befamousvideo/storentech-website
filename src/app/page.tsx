import Link from "next/link";
import { SarahContact } from "@/components/SarahContact";
import { site, verticals } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">{site.name}</p>
            <h1 className="brand-line">{site.tagline}</h1>
            <hr className="rule" />
            <p className="lede">
              Ask Sarah anything, or call{" "}
              <a href={`tel:${site.phones.sarah.tel}`}>714-613-8557</a>.
            </p>
            <div className="btn-row">
              <a className="btn btn-solid" href={`tel:${site.phones.sarah.tel}`}>
                Call Sarah
              </a>
              <Link className="btn" href="/contact">
                Start the paid analysis
              </Link>
            </div>
            <div className="fine hero-contact">
              <SarahContact
                className="sarah-contact"
                primaryClassName="sarah-contact-primary"
                secondaryClassName="sarah-contact-secondary"
              />
              <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>
            </div>
          </div>

          <aside className="demo-card" aria-label={site.contactCopy.primary}>
            <SarahContact
              className="sarah-contact"
              primaryClassName="sarah-contact-primary"
              secondaryClassName="sarah-contact-secondary"
            />
          </aside>
        </div>
      </section>

      <section className="section" id="offer">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">{site.prices.analysisTypical}</p>
              <h2>{site.offer.primaryTitle}</h2>
            </div>
            <p className="lede">
              {site.offer.primary} {site.offer.later}
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tan" id="capacity">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Human touch</p>
              <h2>More output with the people you have.</h2>
            </div>
            <p className="lede">{site.offer.capacity}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Clients</p>
              <h2>Selective about clients, not exclusive to an industry.</h2>
            </div>
            <div>
              <p className="lede">
                Fit is a volume of conversations, a calendar that matters, and an
                operator who will give us real numbers. The door is open for
                manufacturing and the right larger project.
              </p>
              <div className="pill-row">
                {verticals.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tan cta-band">
        <div className="wrap">
          <p className="kicker">Next</p>
          <h2>Call Sarah, or start the paid analysis.</h2>
          <p className="lede" style={{ marginBottom: "1.6rem" }}>
            The analysis is {site.prices.analysisTypical} typical,{" "}
            {site.prices.analysisComplex} when complex. It is not a complimentary
            sales call.
          </p>
          <div className="btn-row">
            <a className="btn btn-solid" href={`tel:${site.phones.sarah.tel}`}>
              Call Sarah
            </a>
            <Link className="btn" href="/contact">
              Start analysis
            </Link>
            <Link className="btn" href="/work">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
