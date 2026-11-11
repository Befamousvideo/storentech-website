import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adLandingMetadata, LAW_VERTICAL_PAGE } from "@/lib/ad-landing-pages";

export const metadata: Metadata = adLandingMetadata(LAW_VERTICAL_PAGE);

export default function LawPage() {
  notFound();
}
