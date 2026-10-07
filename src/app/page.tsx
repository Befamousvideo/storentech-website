import Link from "next/link";
import { IntakeLink } from "@/components/IntakeLink";
import { SarahContact } from "@/components/SarahContact";
import { site, verticals } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">{site.name}</p>
            <h1 className="service-title">{site.offer.primaryTitle}</h1>
            <hr className="rule" />
            <p className="lede">{site.offer.primary}</p>
            <div className="btn-row">
              <IntakeLink className="btn">{site.offer.cta}</IntakeLink>
            </div>
            <div className="fine hero-contact">
              <Link href="/contact">Write us</Link>
            </div>
          </div>

          <aside className="demo-card" aria-label="Talk to Sarah">
            <p className="kicker">Talk to Sarah</p>
            <SarahContact
              className="sarah-contact"
              primaryClassName="sarah-contact-primary"
              secondaryClassName="sarah-contact-secondary"
              secondary="Leave a message or request a callback. We map the work before anyone prices ongoing help."
            />
            <p className="hero-panel-meta">{site.location.full}</p>
          </aside>
        </div>
      </section>

      <section className="section" id="offer">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Starting at {site.prices.analysisTypical}</p>
              <h2>
                <Link href="/ai-opportunity-map">{site.offer.primaryTitle}</Link>
              </h2>
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
              <h2>Humans in the loop.</h2>
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
          <h2>Start your AI Opportunity Map, or write us.</h2>
          <p className="lede" style={{ marginBottom: "1.6rem" }}>
            Starting at {site.prices.analysisTypical}. It is not a complimentary
            sales call. Sarah is in the header if you want to talk first.
          </p>
          <div className="btn-row">
            <IntakeLink className="btn">{site.offer.cta}</IntakeLink>
            <Link className="btn" href="/contact">
              Write us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
