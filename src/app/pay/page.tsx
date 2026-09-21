import type { Metadata } from "next";
import Link from "next/link";
import { StripeBuyButton } from "@/components/StripeBuyButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pay for the Automation ROI Analysis",
  description:
    "Pay $1,000 for the Automation ROI Analysis — one location plus corporate HQ. This is paid work, not a complimentary sales call.",
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
            The {site.prices.analysisTypical} Automation ROI Analysis covers one
            location plus corporate HQ. This is paid work. It is not a
            complimentary sales call. Call Sarah if you want to hear the first
            employee before you buy the map.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap contact-grid">
          <article className="card pay-card">
            <p className="kicker">One location + HQ</p>
            <p className="price">{site.prices.analysisTypical}</p>
            <h2>Pay for the map.</h2>
            <p>
              A ranked roadmap for the first named AI employee and the work
              around it — one location plus corporate HQ. $2,000 or $3,000 is
              for a complex or multi-site analysis only when that wider scope is
              agreed. It is not the base product. If you need that wider scope,
              start from <Link href="/contact">Contact</Link>.
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
