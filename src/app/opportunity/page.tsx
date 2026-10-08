import type { Metadata } from "next";
import { IntakeLink } from "@/components/IntakeLink";
import { SarahPhoneImage } from "@/components/SarahContact";
import { StructuredData } from "@/components/StructuredData";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Opportunity Map",
  description: site.offer.primary,
  alternates: { canonical: "/opportunity" },
  openGraph: {
    title: "AI Opportunity Map · StorenTech AI",
    description: site.offer.primary,
    url: "/opportunity",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Opportunity Map · StorenTech AI",
    description: site.offer.primary,
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: site.offer.primaryTitle,
  alternateName: site.offer.explanatoryName,
  description: `${site.offer.primary} ${site.offer.later}`,
  url: `${site.url}/opportunity`,
  provider: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Orange County",
  },
  offers: {
    "@type": "Offer",
    name: site.offer.primaryTitle,
    description: site.offer.primary,
    price: "1000",
    priceCurrency: "USD",
  },
};

export default function AiOpportunityMapPage() {
  return (
    <>
      <StructuredData data={serviceLd} />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Starting at {site.prices.analysisTypical}</p>
          <h1>{site.offer.primaryTitle}</h1>
          <hr className="rule" />
          <p className="lede">
            An AI Opportunity Map shows where time or revenue leaks, and which AI moves pay back first. Starting at $1,000.
          </p>
          <div className="btn-row" style={{ marginTop: "1.7rem" }}>
            <IntakeLink className="btn btn-solid">{site.offer.cta}</IntakeLink>
            <SarahPhoneImage className="sarah-phone" />
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <p className="lede">
            {site.offer.later} {site.offer.services}
          </p>
        </div>
      </section>
    </>
  );
}
