import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { VapiWidget } from "@/components/VapiWidget";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "StorenTech AI — Orange County AI agency for SMBs",
    template: "%s · StorenTech AI",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder.name }],
  creator: site.founder.name,
  keywords: [
    "Orange County AI agency",
    "AI automation for SMBs",
    "AI voice agent",
    "speed to lead",
    "missed-call recovery",
    "ROI analysis",
    "Newport Beach",
    "Corona Del Mar",
    "Vincent Jackson",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "StorenTech AI — Orange County AI agency for SMBs",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "StorenTech AI — Orange County AI agency for SMBs",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <VapiWidget />
      </body>
    </html>
  );
}
