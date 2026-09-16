import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { technologySections } from "@/lib/technology";

export const metadata = pageMeta({
  title: "How StorenTech delivers — RAG, voice, handoff, evaluation",
  description:
    "Practical notes on RAG, AI voice agents, local vs cloud, human handoff, and evaluation — how StorenTech actually delivers AI automation for SMBs.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ])}
      />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Technology</p>
          <h1>How the tools actually work.</h1>
          <hr className="rule" />
          <p className="lede">
            Practical notes, not a research blog. This is how we wire an AI
            employee so it can do a named job for an SMB — and how we know when it
            is paying. For the commercial path, see{" "}
            <Link href="/how-it-works">How it works</Link>.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="engagement">
            {technologySections.map((section, index) => (
              <article className="engagement-row" key={section.id} id={section.id}>
                <div className="n">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="fine" style={{ marginTop: "2rem" }}>
            Hear a voice employee now:{" "}
            <a href={`tel:${site.phones.sarah.tel}`}>Sarah at {site.phones.sarah.display}</a>
            . Then pay for the map.
          </p>
        </div>
      </section>

      <CtaBand title="The stack follows the job. The job follows the math." />
    </>
  );
}
