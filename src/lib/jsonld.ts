import { site } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: ["StorenTech", "StorenTech AI"],
    url: site.url,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon`,
    description: site.description,
    telephone: site.phones.office.tel,
    email: site.emails.vincent,
    priceRange: "$$$",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.5965,
      longitude: -117.873,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Orange County" },
      { "@type": "City", name: "Newport Beach" },
      { "@type": "City", name: "Corona del Mar" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: site.hours.officeOpens,
      closes: site.hours.officeCloses,
    },
    openingHours: "Mo-Fr 08:00-18:00",
    knowsAbout: [
      "AI automation for SMBs",
      "AI voice agents",
      "Speed to lead",
      "Missed-call recovery",
      "Automation ROI analysis",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "StorenTech AI employees",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paid Automation ROI Analysis" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI voice agent" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website chat" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Speed-to-lead" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI SDR / appointment setting" } },
      ],
    },
    sameAs: ["https://storentechai.com"],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? site.url : `${site.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Orange County",
    serviceType: input.name,
  };
}
