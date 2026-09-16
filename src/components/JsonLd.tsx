import { organizationJsonLd } from "@/lib/jsonld";

export function JsonLd({ data }: { data?: unknown }) {
  const payload = data ?? organizationJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
