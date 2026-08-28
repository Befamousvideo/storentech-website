import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    telephone: site.phones.office.tel,
    email: site.emails.support,
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.title,
      email: site.emails.vincent,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.street,
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      postalCode: site.location.postal,
      addressCountry: site.location.country,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Orange County" },
      { "@type": "City", name: "Newport Beach" },
      { "@type": "City", name: "Corona del Mar" },
    ],
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
