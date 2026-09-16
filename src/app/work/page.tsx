import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { serviceGroups, servicesByGroup } from "@/lib/services";
import { retainers, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "AI employees for SMBs — chat, voice, ops, and growth",
  description:
    "StorenTech AI work: website chat, voice agents, speed-to-lead, SDR, fractional ops, command center, HR screening, reviews, content, and CTV. Orange County.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Work</p>
          <h1>
            <span className="underline-phrase">The jobs</span> we hire AI employees
            to do.
          </h1>
          <hr className="rule" />
          <p className="lede">
            Chat and voice are the common first job because almost every SMB has
            pain there. They are the wedge. Open any job for what it includes, how
            it is built, who it is for, and how we measure it. Then{" "}
            <Link href="/how-it-works">the commercial path</Link>: paid ROI analysis,
            first employee in about 30 days, retainer.
          </p>
        </div>
      </header>

      {serviceGroups.map((group, index) => (
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
              <div className={`job-grid${servicesByGroup(group.id).length === 3 ? "" : " two"}`}>
                {servicesByGroup(group.id).map((job) => (
                  <article className="card" key={job.slug}>
                    <h3>
                      <Link href={`/work/${job.slug}`}>{job.title}</Link>
                    </h3>
                    <p>{job.summary}</p>
                    <p className="fine" style={{ marginTop: "0.9rem" }}>
                      <Link href={`/work/${job.slug}`}>What it includes</Link>
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Retainers</p>
              <h2>Stay on as operator once it is earning.</h2>
            </div>
            <p className="lede">
              Around {site.prices.employee}/mo for one named employee.{" "}
              {site.prices.growth}/mo Growth. Same path: paid map, first hire, then
              a monthly employee. See{" "}
              <Link href="/how-it-works">How it works</Link>.
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

      <CtaBand
        kicker="Start"
        title="Hear the first employee. Then pay for the map."
      />
    </>
  );
}
