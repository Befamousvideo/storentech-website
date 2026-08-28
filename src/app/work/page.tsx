import type { Metadata } from "next";
import Link from "next/link";
import { retainers, site, workGroups } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The jobs StorenTech hires AI employees to do: front of house, revenue, operations, and growth. Chat and voice are the common first hire — not the whole firm.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Work</p>
          <h1>
            <span className="underline-phrase">The jobs</span> we hire AI employees
            to do.
          </h1>
          <hr className="rule" />
          <p className="lede">
            Chatbots and voice agents are the common first job because almost every
            SMB has pain there. They are the wedge. The catalog below is the firm:
            revenue, operations, and growth — named employees, named outcomes.
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

      <section className="section" id="retainers">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Retainers</p>
              <h2>Stay on as operator once it is earning.</h2>
            </div>
            <p className="lede">
              {site.prices.employee}/mo AI Employee. {site.prices.growth}/mo
              Growth. The path is the same: paid map, first hire, then a named
              monthly employee.
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
          <h2>Hear the first employee. Then pay for the map.</h2>
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
