import type { Metadata } from "next";
import {
  adLandingPath,
  type AdLandingVertical,
} from "@/lib/ad-landing-routes";

/**
 * Practice-area ad landing config.
 *
 * TODO: Mary sends practice areas. Tony writes copy.
 * Every entry below is a placeholder so the preview can render a template.
 * Do not treat this as live marketing copy.
 */
export type AdLandingPage = {
  vertical: AdLandingVertical;
  /** Empty on the vertical root (`/law`). */
  specialty?: string;
  placeholder: true;
  h1: string;
  subhead: string;
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
  /** Hide the video slot when empty. */
  videoUrl?: string;
  /** Hide the spokesperson video slot unless configured. */
  elizabethVideoUrl?: string;
};

export type AdLandingSpecialtyPage = AdLandingPage & { specialty: string };

export const LAW_VERTICAL_PAGE: AdLandingPage = {
  vertical: "law",
  placeholder: true,
  h1: "Less of your firm's day on intake and admin",
  subhead:
    "We find where calls, inquiries and follow-ups slip through the cracks, then help fix the ones worth fixing. Attorneys keep legal judgment.",
  ctaLabel: "Find what to fix",
  metaTitle: "AI Intake and Admin Help for Small Law Firms | StorenTech AI",
  metaDescription:
    "StorenTech AI helps small law firms find where intake and admin work slips, starting with a free conversation. Attorneys keep every legal decision.",
};

export const AD_LANDING_SPECIALTIES: AdLandingSpecialtyPage[] = [
  {
    vertical: "law",
    specialty: "sample",
    placeholder: true,
    h1: "TODO: law sample specialty headline — Tony writes copy",
    subhead: "TODO: law sample specialty subhead — Tony writes copy",
    ctaLabel: "TODO: analysis-first CTA label — Tony writes copy",
    metaTitle: "TODO: law sample specialty title — Tony writes copy",
    metaDescription: "TODO: law sample specialty description — Tony writes copy",
  },
  {
    vertical: "contractors",
    specialty: "sample",
    placeholder: true,
    h1: "TODO: contractors sample specialty headline — Tony writes copy",
    subhead: "TODO: contractors sample specialty subhead — Tony writes copy",
    ctaLabel: "TODO: analysis-first CTA label — Tony writes copy",
    metaTitle: "TODO: contractors sample specialty title — Tony writes copy",
    metaDescription:
      "TODO: contractors sample specialty description — Tony writes copy",
  },
];

export function listAdLandingSpecialties(vertical: AdLandingVertical) {
  return AD_LANDING_SPECIALTIES.filter((page) => page.vertical === vertical);
}

export function getAdLandingSpecialty(
  vertical: AdLandingVertical,
  specialty: string,
) {
  return AD_LANDING_SPECIALTIES.find(
    (page) => page.vertical === vertical && page.specialty === specialty,
  );
}

export function adLandingMetadata(page: AdLandingPage): Metadata {
  const path = adLandingPath(page.vertical, page.specialty);
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    robots: { index: false, follow: false },
    alternates: { canonical: path },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}
