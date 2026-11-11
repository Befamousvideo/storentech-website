import type { Metadata } from "next";
import { LawLanding } from "@/components/law/LawLanding";
import { LAW_CANONICAL_PATH, LAW_COPY } from "@/lib/law-landing";

export const metadata: Metadata = {
  title: { absolute: LAW_COPY.meta.title },
  description: LAW_COPY.meta.description,
  alternates: { canonical: LAW_CANONICAL_PATH },
  openGraph: {
    title: LAW_COPY.meta.title,
    description: LAW_COPY.meta.description,
    url: LAW_CANONICAL_PATH,
  },
  twitter: {
    card: "summary",
    title: LAW_COPY.meta.title,
    description: LAW_COPY.meta.description,
  },
};

export default function LawPage() {
  return <LawLanding />;
}
