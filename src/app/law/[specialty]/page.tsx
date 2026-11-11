import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdLandingTemplate } from "@/components/AdLandingTemplate";
import {
  adLandingMetadata,
  getAdLandingSpecialty,
  listAdLandingSpecialties,
} from "@/lib/ad-landing-pages";

type Props = {
  params: Promise<{ specialty: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listAdLandingSpecialties("law").map((page) => ({
    specialty: page.specialty,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty } = await params;
  const page = getAdLandingSpecialty("law", specialty);
  if (!page) return {};
  return adLandingMetadata(page);
}

export default async function LawSpecialtyPage({ params }: Props) {
  const { specialty } = await params;
  const page = getAdLandingSpecialty("law", specialty);
  if (!page) notFound();
  return <AdLandingTemplate page={page} />;
}
