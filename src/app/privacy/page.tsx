import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How StorenTech AI collects, uses, and protects information, including contact forms, calls, and SMS follow-up.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy · StorenTech AI",
    description:
      "How StorenTech AI collects, uses, and protects information, including contact forms, calls, and SMS follow-up.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Legal</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <hr className="rule" />
          <p className="lede">
            Effective date: September 28, 2026. This policy explains how
            StorenTech AI (“we,” “us”) handles information when you use this
            website or ask us to follow up.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow blog-prose">
          <h2>Who we are</h2>
          <p>
            StorenTech AI is an AI automation consulting firm based in Orange
            County, California. Our lead offer is the AI Opportunity Map, also
            called an Automation ROI Analysis. After the map, some clients
            choose an optional Build Plan. If you ask us to follow up, we may
            use an AI phone assistant and SMS or phone calls through
            communications providers.
          </p>

          <h2>Information we collect</h2>
          <p>We collect only what we need to respond and to run the business:</p>
          <ul>
            <li>
              <strong>Contact form submissions.</strong> The site form asks for
              your name, email address, company, and a short description of
              what is broken. If you use another request form we publish, we
              collect the fields you choose to send.
            </li>
            <li>
              <strong>Calls and texts.</strong> If you request a call or text,
              or you reach us by phone or SMS, we may collect the contact
              details you provide, the content of those conversations or
              messages, and notes needed to follow up or schedule.
            </li>
            <li>
              <strong>Technical and usage data.</strong> Our hosting provider
              may record basic request logs, such as the page requested, time,
              and general browser or device information. This site does not
              currently load a third-party analytics or advertising pixel.
            </li>
            <li>
              <strong>Cookies.</strong> The site may use essential cookies or
              similar storage so pages and forms can function. We do not
              currently use analytics or advertising cookies.
            </li>
          </ul>

          <h2>How we use information</h2>
          <p>We use this information to:</p>
          <ul>
            <li>Reply to inquiries and schedule conversations</li>
            <li>
              Deliver consulting work you ask for, including the AI Opportunity
              Map and any later Build Plan
            </li>
            <li>
              Send appointment and service follow-ups by call or text when you
              have opted in
            </li>
            <li>Operate, secure, and improve this website</li>
            <li>Meet legal, accounting, and compliance duties</li>
          </ul>
          <p>We do not sell personal information.</p>

          <h2>Who we share it with</h2>
          <p>
            We share information with service providers who process it on our
            behalf — for example, website hosting, form delivery, and the
            communications providers we use to place or receive calls and send
            texts when you ask us to follow up. Those providers may use the
            information only to perform work for us.
          </p>
          <p>
            We may also disclose information if the law requires it, or to
            protect people, the business, or the public. We do not share
            personal information with third parties or affiliates for their
            own marketing.
          </p>

          <h2>SMS and text messaging</h2>
          <p>
            If you opt in, we may text you about appointments and service
            follow-up related to your request. Message frequency varies.
            Message and data rates may apply.
          </p>
          <p>
            Reply STOP to cancel. Reply HELP for help. You can also reach us
            through our{" "}
            <Link href="/contact">contact form</Link>.
          </p>
          <p>
            No mobile information will be shared with third parties or
            affiliates for marketing or promotional purposes. All the above
            categories exclude text messaging originator opt-in data and
            consent; this information will not be shared with any third
            parties.
          </p>

          <h2>How long we keep information</h2>
          <p>
            We keep information as long as we reasonably need it to reply,
            deliver services, resolve disputes, and meet legal duties. When we
            no longer need it, we delete it or reduce it so it no longer
            identifies you, unless the law requires a longer hold.
          </p>

          <h2>Security</h2>
          <p>
            We use reasonable administrative and technical safeguards to
            protect information. No method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have the right to ask what
            personal information we hold, request a copy, ask us to correct
            it, or ask us to delete it, subject to legal exceptions. To make a
            request, use our <Link href="/contact">contact form</Link>. We
            will take reasonable steps to verify the request before we act.
          </p>

          <h3>California (CCPA / CPRA)</h3>
          <p>
            If you are a California resident, you have the right to know what
            personal information we collect and how we use and share it; to
            delete personal information we hold, with legal exceptions; to
            correct inaccurate personal information; to opt out of the sale or
            sharing of personal information (we do not sell or share personal
            information as those terms are defined under California law); to
            limit the use of sensitive personal information if we collect it
            for purposes that require that choice; and not to receive
            discriminatory treatment for exercising these rights.
          </p>
          <p>
            You may use the <Link href="/contact">contact form</Link> to
            exercise these rights, or have an authorized agent do so on your
            behalf. We will not require you to create an account to make a
            request.
          </p>

          <h2>Children’s privacy</h2>
          <p>
            This site and our services are for businesses and adults. We do
            not knowingly collect personal information from children. If you
            believe a child has submitted information to us, please use the{" "}
            <Link href="/contact">contact form</Link> and we will delete it.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy from time to time. When we do, we will
            post the revised version on this page and update the effective
            date above. Continued use of the site after a change means you
            accept the updated policy.
          </p>

          <h2>How to contact us</h2>
          <p>
            Questions about this policy, or requests about your information,
            should go through our <Link href="/contact">contact form</Link>.
            StorenTech AI is based in Orange County, California.
          </p>
        </div>
      </section>
    </>
  );
}
