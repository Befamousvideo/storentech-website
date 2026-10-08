import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using the StorenTech AI website and SMS follow-up. Consulting work is governed by a separate written agreement.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms of Service · StorenTech AI",
    description:
      "Terms for using the StorenTech AI website and SMS follow-up. Consulting work is governed by a separate written agreement.",
    url: "/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service · StorenTech AI",
    description:
      "Terms for using the StorenTech AI website and SMS follow-up. Consulting work is governed by a separate written agreement.",
  },
};

export default function TermsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Legal</p>
          <h1 className="legal-title">Terms of Service</h1>
          <hr className="rule" />
          <p className="lede">
            Effective date: September 28, 2026. These terms govern your use of
            the StorenTech AI website. Paid consulting work is governed by a
            separate written agreement.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow blog-prose">
          <h2>Who we are</h2>
          <p>
            StorenTech AI is an AI automation consulting firm based in Orange
            County, California. By using this website, you agree to these
            terms. If you do not agree, please do not use the site.
          </p>

          <h2>Use of the site</h2>
          <p>
            You may use this site for lawful purposes: to learn about our
            work, submit an inquiry, or request a follow-up. You agree not to
            misuse the site — including attempting to break security, scrape
            or overload it, submit false information, or use it to harm
            others. We may suspend or block access if we believe these terms
            are being violated.
          </p>
          <p>
            Content on this site is for general information. It is not legal,
            financial, or professional advice for your specific situation.
          </p>

          <h2>Our services</h2>
          <p>
            We provide AI automation consulting. The lead offer on this site
            is the AI Opportunity Map:
            a paid written map of where time or revenue leaks and what is
            worth fixing first. After the map, some clients choose an optional
            Build Plan.
          </p>
          <p>
            Consulting engagements — including the map, a Build Plan, and any
            later partnership — are governed by a separate written agreement
            or master services agreement. These website terms do not replace
            that agreement. If the two conflict, the written agreement
            controls for the engagement.
          </p>

          <h2>No guarantees of specific results</h2>
          <p>
            We do not promise specific revenue, cost, or productivity outcomes.
            Any examples or descriptions of work are illustrative. Results
            depend on your operation, data, people, and follow-through.
            Decisions you make after reading the site or a map remain yours.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The site, including text, layout, graphics, and marks, is owned by
            StorenTech AI or used with permission. You may view and share
            pages for ordinary business inquiry. You may not copy, scrape, or
            reuse the site or our materials for your own commercial offering
            without our written consent.
          </p>
          <p>
            If you send us information or materials through a form or
            conversation, you grant us a limited license to use them to reply
            and, if we work together, to perform the engagement.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The site is provided “as is” and “as available.” To the fullest
            extent permitted by law, we disclaim all warranties, express or
            implied, including merchantability, fitness for a particular
            purpose, and non-infringement. We do not warrant that the site
            will be uninterrupted, error-free, or free of harmful components.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, StorenTech AI and its
            officers, employees, and agents are not liable for any indirect,
            incidental, special, consequential, or punitive damages, or for
            lost profits, data, or goodwill, arising from your use of the site
            or from these terms, even if we have been advised of the
            possibility.
          </p>
          <p>
            Our total liability arising from the site or these terms is
            limited to the amount you paid us, if any, for site-related
            access in the twelve months before the claim, or a nominal amount
            if you paid nothing. This limit does not apply where the law does
            not allow it. Liability for a paid consulting engagement is
            governed by that written agreement.
          </p>

          <h2>SMS terms</h2>
          <p>
            If you opt in, StorenTech AI may send SMS messages for appointment
            and service follow-ups related to your request. This is not an
            advertising blast list. We text people who have asked us to
            follow up.
          </p>
          <p>
            You can opt in through a form on this site or by giving verbal
            consent on a call. Message frequency varies. Message and data
            rates may apply. Reply STOP to cancel. Reply HELP for help. You
            can also use our <Link href="/contact">contact form</Link>.
          </p>
          <p>
            Wireless carriers are not liable for delayed or undelivered
            messages. Our handling of information, including mobile numbers
            and opt-in consent, is described in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
          <p>
            No mobile information will be shared with third parties or
            affiliates for marketing or promotional purposes. All the above
            categories exclude text messaging originator opt-in data and
            consent; this information will not be shared with any third
            parties.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of California,
            without regard to conflict-of-law rules. You agree that courts in
            Orange County, California have exclusive jurisdiction over
            disputes arising from the site or these terms, except where
            applicable law requires otherwise.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. The revised version
            will be posted on this page with a new effective date. Continued
            use of the site after a change means you accept the updated terms.
          </p>

          <h2>How to contact us</h2>
          <p>
            Questions about these terms should go through our{" "}
            <Link href="/contact">contact form</Link>. StorenTech AI is based
            in Orange County, California.
          </p>
        </div>
      </section>
    </>
  );
}
