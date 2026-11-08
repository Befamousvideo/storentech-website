import type { Metadata } from "next";
import { AdLandingTemplate } from "@/components/AdLandingTemplate";
import { adLandingMetadata, LAW_VERTICAL_PAGE } from "@/lib/ad-landing-pages";

export const metadata: Metadata = adLandingMetadata(LAW_VERTICAL_PAGE);

export default function LawPage() {
  return <AdLandingTemplate page={LAW_VERTICAL_PAGE} />;
}
