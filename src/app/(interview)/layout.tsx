import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private interview",
  description: "Private interview",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  referrer: "no-referrer",
  openGraph: {
    title: "Private interview",
    description: "Private interview",
  },
};

export default function InterviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
