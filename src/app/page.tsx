import Link from "next/link";
import { SarahContact } from "@/components/SarahContact";
import { offerSteps, retainers, site, verticals } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">{site.location.kicker}</p>
            <h1 className="brand-line">
              StorenTech AI finds where time or revenue leaks, then fixes what
              pays — human touch stays.
            </h1>
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
              <p className="kicker">The offer</p>
              <h2>One path. Named prices. Then a hire.</h2>
            </div>
            <p className="lede">
              Chat and voice are the common first job — speed-to-lead, after-hours,
              booking, the inbox — because almost every SMB has pain there. That is
              the wedge. Sell a named AI employee and an outcome. The rest of the
              catalog is ready when the map says so.
            </p>
          </div>
          <div className="card-grid-3">
            {offerSteps.map((step) => (
              <article className="card" key={step.n}>
                <div className="n">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tan" id="retainers">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Retainers</p>
              <h2>Named employees. Named monthly scope.</h2>
            </div>
            <p className="lede">
              After the first hire is earning, we stay on as operator. Hours are
              not the product. The employee and the weekly rhythm are.
            </p>
          </div>
          <div className="card-grid-2">
            {retainers.map((plan) => (
              <article className="card" key={plan.name}>
                <p className="kicker">{plan.name}</p>
                <p className="price">{plan.price}</p>
                <h3>{plan.summary}</h3>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
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
