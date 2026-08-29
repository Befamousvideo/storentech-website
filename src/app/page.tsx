import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { AvatarVideo } from "@/components/AvatarVideo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { serviceGroups, servicesByGroup } from "@/lib/services";
import { faqs, offerSteps, site, verticals } from "@/lib/site";

export const metadata = pageMeta({
  title: "Orange County AI agency for SMBs",
  ogTitle: "StorenTech AI — Hire an AI employee after the math",
  description:
    "Full-service AI agency in Newport Beach and Corona Del Mar. Paid ROI analysis from $1,000. First AI employee in about 30 days if the numbers work. Call Sarah at 714-613-8557.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">{site.location.kicker}</p>
            <h1>Hire an AI employee after the math, not before.</h1>
            <hr className="rule" />
            <p className="lede">
              StorenTech is {site.founder.name}’s full-service AI agency in Orange
              County. We sell one thing first: a paid Automation ROI Analysis,
              starting at {site.prices.analysisFrom}. If the numbers work, the first
              AI employee is live in about 30 days — usually on the phone and the
              site, because that is where most operators leak money. The firm is
              built for the work after that.
            </p>
            <div className="btn-row">
              <Link className="btn btn-solid" href="/roi-analysis">
                Start the ROI Analysis
              </Link>
              <a className="btn" href={`tel:${site.phones.sarah.tel}`}>
                Call Sarah now
              </a>
            </div>
            <p className="fine hero-contact">
              Office:{" "}
              <a href={`tel:${site.phones.office.tel}`}>{site.phones.office.display}</a>
              {" · "}
              <a href={`mailto:${site.emails.vincent}`}>{site.emails.vincent}</a>
            </p>
          </div>

          <aside className="demo-card" aria-label="Live demo">
            <p className="kicker">Live demo</p>
            <h2>Call Sarah.</h2>
            <p>
              She is on the phone right now — a voice agent handling the first jobs
              an AI employee actually does: missed calls, speed-to-lead, booking.
            </p>
            <a className="demo-number" href={`tel:${site.phones.sarah.tel}`}>
              {site.phones.sarah.display}
            </a>
            <p className="proof">
              Ask her how the firm works. If the conversation holds, start the
              analysis. That is the proof. Not a reel, not a stock robot.
            </p>
            <a className="btn btn-gold" href={`tel:${site.phones.sarah.tel}`}>
              Tap to call Sarah
            </a>
          </aside>
        </div>
      </section>

      <section className="section" id="offer">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">How we work</p>
              <h2>Paid map. First hire. Then we stay.</h2>
            </div>
            <p className="lede">
              Chat and voice are the common first job —{" "}
              <Link href="/work/speed-to-lead">speed-to-lead</Link>, missed-call
              recovery,{" "}
              <Link href="/work/website-chat">website chat</Link> — because almost
              every SMB has pain there. That is the wedge.{" "}
              <Link href="/work">The catalog</Link> is the rest of the firm.
              Paid work from day one. If a company cannot fund the analysis, we do
              not start.
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
          <p className="fine" style={{ marginTop: "1.5rem" }}>
            The analysis fee may be credited toward implementation. Retainers, when
            they make sense, run around {site.prices.employee}/mo and{" "}
            {site.prices.growth}/mo Growth — detail on{" "}
            <Link href="/how-it-works">How it works</Link>.
          </p>
        </div>
      </section>

      <section className="section section-tan" id="catalog">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">The firm</p>
              <h2>Full-service. Named jobs. Named outcomes.</h2>
            </div>
            <p className="lede">
              Front of house, revenue, operations, and growth. Read{" "}
              <Link href="/work">what each hire includes</Link>, how{" "}
              <Link href="/technology">the tools actually work</Link>, or{" "}
              <Link href="/patterns">illustrative patterns</Link> from ordinary weeks
              — composites, not testimonials.
            </p>
          </div>
          <div className="card-grid-2">
            {serviceGroups.map((group) => (
              <article className="card" key={group.id}>
                <p className="kicker">{group.label}</p>
                <h3>
                  <Link href={`/work#${group.id}`}>{group.title}</Link>
                </h3>
                <p>{group.lede}</p>
                <p className="fine" style={{ marginTop: "0.9rem" }}>
                  {servicesByGroup(group.id).map((service, index) => (
                    <span key={service.slug}>
                      {index > 0 ? " · " : ""}
                      <Link href={`/work/${service.slug}`}>{service.title}</Link>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AvatarVideo />

      <section className="section section-tan">
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

      <Faq items={faqs} />

      <CtaBand
        lede={`The analysis starts at ${site.prices.analysisFrom}. More complex work can be higher. It is not a complimentary sales call.`}
      />
    </>
  );
}
