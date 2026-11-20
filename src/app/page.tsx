import type { Metadata } from "next";
import { IntakeLink } from "@/components/IntakeLink";
import { StructuredData } from "@/components/StructuredData";
import { HOME_META_DESCRIPTION, HOME_META_TITLE, HOME_NVIDIA_SPARK_HREF, homeCopy } from "@/lib/home";
import { organizationLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: HOME_META_TITLE },
  description: HOME_META_DESCRIPTION,
  openGraph: {
    title: HOME_META_TITLE,
    description: HOME_META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_META_TITLE,
    description: HOME_META_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationLd({ description: HOME_META_DESCRIPTION })} />

      <section className="hero">
        <div className="wrap">
          <div className="hero-home">
            <h1 className="home-headline">{homeCopy.headline}</h1>
            <p className="lede">{homeCopy.subhead}</p>
          </div>
        </div>
      </section>

      <section className="home-proof-strip" aria-label="Hardware">
        <div className="wrap">
          <p>{homeCopy.proof}</p>
          <a href={HOME_NVIDIA_SPARK_HREF} target="_blank" rel="noopener">
            {homeCopy.proofLinkLabel}
          </a>
        </div>
      </section>

      <section className="section home-pillar" id="costs">
        <div className="wrap">
          <h2>{homeCopy.costTitle}</h2>
          <p className="lede">{homeCopy.costBody}</p>
        </div>
      </section>

      <section className="section section-tan home-pillar" id="security">
        <div className="wrap">
          <h2>{homeCopy.securityTitle}</h2>
          <p className="lede">{homeCopy.securityBody}</p>
        </div>
      </section>

      <section className="section home-pillar" id="data">
        <div className="wrap">
          <h2>{homeCopy.dataTitle}</h2>
          <p className="lede">{homeCopy.dataBody}</p>
        </div>
      </section>

      <section className="home-productivity" id="productivity">
        <div className="wrap">
          <h2>{homeCopy.productivityTitle}</h2>
          <p>{homeCopy.productivityBody}</p>
          <p className="home-footnote">{homeCopy.productivityFootnote}</p>
        </div>
      </section>

      <section className="section cta-band home-cta">
        <div className="wrap">
          <IntakeLink className="btn btn-solid">{homeCopy.cta}</IntakeLink>
        </div>
      </section>
    </>
  );
}
