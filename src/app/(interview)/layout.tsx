import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private interview",
  description: "Private interview",
  keywords: [],
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
      nocache: true,
    },
  },
  referrer: "no-referrer",
  alternates: {
    canonical: null,
  },
  openGraph: {
    title: "Private interview",
    description: "Private interview",
  },
  twitter: {
    title: "Private interview",
    description: "Private interview",
  },
};

export default function InterviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
