import type { Metadata } from "next";
import Link from "next/link";
import { AdRetargetingToggle } from "@/components/AdRetargetingToggle";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Your Privacy Choices",
  description:
    "Turn ad retargeting cookies on or off for StorenTech AI ad landing pages.",
  alternates: { canonical: "/privacy-choices" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Your Privacy Choices · StorenTech AI",
    description:
      "Turn ad retargeting cookies on or off for StorenTech AI ad landing pages.",
    url: "/privacy-choices",
  },
  twitter: {
    card: "summary",
    title: "Your Privacy Choices · StorenTech AI",
    description:
      "Turn ad retargeting cookies on or off for StorenTech AI ad landing pages.",
  },
};

export default function PrivacyChoicesPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Legal</p>
          <h1 className="legal-title">Your Privacy Choices</h1>
          <hr className="rule" />
          <p className="lede">
            Do Not Sell or Share My Personal Information. Use this page to turn
            ad retargeting cookies on or off.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow blog-prose">
          <p>
            Some of our law firm and contractor ad landing pages can load an
            advertising pixel from a connected-TV advertising partner. That
            pixel is off unless you leave ad retargeting cookies on, and it
            stays off if your browser sends a Global Privacy Control signal.
          </p>
          <AdRetargetingToggle />
          <p>
            This choice is stored in your browser. More detail is on our{" "}
            <Link href="/privacy">Privacy Policy</Link>. To ask us about your
            data, use our <Link href="/contact">contact form</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
