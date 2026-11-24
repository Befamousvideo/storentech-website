import type { Metadata } from "next";
import { IntakeLink } from "@/components/IntakeLink";
import { InterviewLink } from "@/components/InterviewLink";
import { LeakCards } from "@/components/LeakCards";
import { LeakMention } from "@/components/LeakTooltip";
import { MapValueCard } from "@/components/MapValueCard";
import { SarahPhoneImage } from "@/components/SarahContact";
import { StructuredData } from "@/components/StructuredData";
import { opportunityLeakFaqs } from "@/lib/leak-copy";
import { siteFallbackOgImages } from "@/lib/seo";
import { mapValue, site } from "@/lib/site";
import { siteFaqPageLd } from "@/lib/site-faqs";

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
      <StructuredData data={siteFaqPageLd(opportunityLeakFaqs)} />
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Paid work</p>
          <h1>{site.offer.primaryTitle}</h1>
          <hr className="rule" />
          <p className="lede">
            <LeakMention>{site.offer.primary}</LeakMention>
          </p>
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

      <LeakCards />

      <section className="section">
        <div className="wrap">
          <p className="lede">
            {site.offer.later} {site.offer.services}
          </p>
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="opportunity-faq-heading">
        <div className="wrap">
          <p className="kicker">FAQ</p>
          <h2 id="opportunity-faq-heading">Common questions.</h2>
          <div className="site-faq">
            {opportunityLeakFaqs.map((item) => (
              <div className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
