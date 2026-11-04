import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";
import { verificationMetadata } from "@/lib/verification";
import "./globals.css";

const verification = verificationMetadata();

// Local files: next/font/google throws TypeError if the Google CSS fetch fails at build.
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "StorenTech AI — AI Opportunity Map",
    template: "%s · StorenTech AI",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AI agency Orange County",
    "AI Opportunity Map",
    "Automation ROI analysis",
    "voice agent",
    "Orange County",
    "StorenTech AI",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "StorenTech AI — AI Opportunity Map",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "StorenTech AI — AI Opportunity Map",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(verification ? { verification } : {}),
  // Vince locked brand mark: Orbit v4 (clean).
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
        <SiteAnalytics />
      </body>
    </html>
  );
}
