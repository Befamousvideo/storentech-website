import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: site.name,
    url: site.url,
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
