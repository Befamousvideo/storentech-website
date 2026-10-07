import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.brand.mark}`,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orange County",
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: [{ "@type": "AdministrativeArea", name: "Orange County" }],
    priceRange: "$$$",
    openingHours: "Mo-Fr 09:00-17:00",
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: site.offer.primaryTitle,
      itemListElement: [
        {
          "@type": "Offer",
          name: site.offer.primaryTitle,
          description: site.offer.primary,
          price: "1000",
          priceCurrency: "USD",
          itemOffered: {
            "@type": "Service",
            name: site.offer.primaryTitle,
            alternateName: site.offer.explanatoryName,
            description: `${site.offer.primary} ${site.offer.later}`,
            url: `${site.url}/roia`,
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
