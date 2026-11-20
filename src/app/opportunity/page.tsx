import type { Metadata } from "next";
import { IntakeLink } from "@/components/IntakeLink";
import { InterviewLink } from "@/components/InterviewLink";
import { MapValueCard } from "@/components/MapValueCard";
import { SarahPhoneImage } from "@/components/SarahContact";
import { StructuredData } from "@/components/StructuredData";
import { siteFallbackOgImages } from "@/lib/seo";
import { mapValue, site } from "@/lib/site";

const opportunityDescription = `${mapValue.lede} ${site.offer.priceLine}`;

const ogImages = siteFallbackOgImages();

export const metadata: Metadata = {
  title: "AI Opportunity Map",
  description: opportunityDescription,
  alternates: { canonical: "/opportunity" },
  openGraph: {
    title: "AI Opportunity Map · StorenTech AI",
    description: opportunityDescription,
    url: "/opportunity",
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Opportunity Map · StorenTech AI",
    description: opportunityDescription,
    images: ogImages,
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
    description: opportunityDescription,
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
          <p className="kicker">Paid work</p>
          <h1>{site.offer.primaryTitle}</h1>
          <hr className="rule" />
          <p className="lede">{site.offer.primary}</p>
          <MapValueCard />
          <div className="btn-row" style={{ marginTop: "0.4rem" }}>
            <InterviewLink
              className="btn btn-solid"
              analyticsEvent="opportunity_cta_click"
            >
              {site.offer.interviewCta}
            </InterviewLink>
            <IntakeLink className="btn">{site.offer.bookingCta}</IntakeLink>
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
