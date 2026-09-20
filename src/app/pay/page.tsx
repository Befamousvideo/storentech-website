import type { Metadata } from "next";
import Link from "next/link";
import { StripeBuyButton } from "@/components/StripeBuyButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pay for the Automation ROI Analysis",
  description:
    "Pay $1,000 for the typical Automation ROI Analysis. This is paid work, not a complimentary sales call.",
  alternates: { canonical: "/pay" },
};

export default function PayPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Pay</p>
          <h1>Automation ROI Analysis.</h1>
          <hr className="rule" />
          <p className="lede">
            Typical fee {site.prices.analysisTypical}. This is paid work. It is
            not a complimentary sales call. Call Sarah if you want to hear the
            first employee before you buy the map.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap contact-grid">
          <article className="card pay-card">
            <p className="kicker">Typical analysis</p>
            <p className="price">{site.prices.analysisTypical}</p>
            <h2>Pay for the map.</h2>
            <p>
              A ranked roadmap for the first named AI employee and the work
              around it. Complex operations — multiple locations, a messy stack,
              or a wider catalog — are {site.prices.analysisComplex} and start
              from Contact.
            </p>
            <StripeBuyButton />
          </article>

          <aside className="aside-box">
            <p className="kicker">Before you pay</p>
            <h2>Hear Sarah first.</h2>
            <p>
              She is the live demo — the first jobs an AI employee actually does.
              If the conversation holds, buy the map.
            </p>
            <div className="stack">
              <div>
                <div className="kicker">Sarah</div>
                <a href={`tel:${site.phones.sarah.tel}`}>{site.phones.sarah.display}</a>
              </div>
              <div>
                <div className="kicker">Office</div>
                <a href={`tel:${site.phones.office.tel}`}>{site.phones.office.display}</a>
              </div>
              <div>
                <div className="kicker">Questions</div>
                <Link href="/contact">Send a brief from Contact</Link>
              </div>
              <p>
                {site.founder.name}, {site.founder.title}. Invoices use the same
                payment link as this page.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
