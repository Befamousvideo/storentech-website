import type { Metadata } from "next";
import { ContractorsLanding } from "@/components/ContractorsLanding";
import { StructuredData } from "@/components/StructuredData";
import {
  CONTRACTORS_CANONICAL_URL,
  contractorsPage,
  contractorsVideo,
} from "@/lib/contractors-page";
import {
  contractorsBreadcrumbLd,
  contractorsServiceLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: contractorsPage.metaTitle },
  description: contractorsPage.metaDescription,
  alternates: { canonical: CONTRACTORS_CANONICAL_URL },
  openGraph: {
    title: contractorsPage.metaTitle,
    description: contractorsPage.metaDescription,
    url: CONTRACTORS_CANONICAL_URL,
    type: "website",
    images: [
      {
        url: contractorsVideo.poster,
        width: contractorsVideo.width,
        height: contractorsVideo.height,
        alt: contractorsVideo.caption,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: contractorsPage.metaTitle,
    description: contractorsPage.metaDescription,
    images: [contractorsVideo.poster],
  },
};

export default function ContractorsPage() {
  return (
    <>
      <StructuredData data={contractorsServiceLd()} />
      <StructuredData data={contractorsBreadcrumbLd()} />
      <ContractorsLanding />
    </>
  );
}
