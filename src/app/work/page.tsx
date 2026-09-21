import type { Metadata } from "next";
import Link from "next/link";
import { retainers, site, workGroups } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Map leaks first. Then build what pays — people still in the loop, out front with customers. Front of house, revenue, operations, and growth.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Work</p>
          <h1>
            <span className="underline-phrase">The grind</span> we put AI on.
            Humans stay in the loop.
          </h1>
          <hr className="rule" />
          <p className="lede">
            {site.offer.services} {site.offer.capacity}
          </p>
        </div>
      </header>

      {workGroups.map((group, index) => (
        <section
          key={group.id}
          id={group.id}
          className={`section${index % 2 === 1 ? " section-tan" : ""}`}
        >
          <div className="wrap">
            <div className="work-group">
              <div className="work-group-head">
                <p className="kicker">{group.label}</p>
                <h2>{group.title}</h2>
                <p className="lede">{group.lede}</p>
              </div>
              <div className={`job-grid${group.jobs.length === 3 ? "" : " two"}`}>
                {group.jobs.map((job) => (
                  <article className="card" key={job.title}>
                    <h3>{job.title}</h3>
                    <p>{job.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section" id="capacity">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">After the map</p>
              <h2>Stay on as operator once it is paying.</h2>
            </div>
            <p className="lede">
              {site.prices.employee}/mo Capacity. {site.prices.growth}/mo
              Growth. The path is the same: paid map, then 10× production —
              humans in the loop, a calmer office.
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

      <section className="section section-tan cta-band">
        <div className="wrap">
          <p className="kicker">Start</p>
          <h2>Pay for the map. Then we build what pays.</h2>
          <div className="btn-row" style={{ marginTop: "1.5rem" }}>
            <a className="btn btn-solid" href={`tel:${site.phones.sarah.tel}`}>
              Call Sarah {site.phones.sarah.display}
            </a>
            <Link className="btn" href="/contact">
              Start the paid analysis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
