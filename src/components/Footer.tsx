import Link from "next/link";
import { IntakeLink } from "@/components/IntakeLink";
import { SarahContact } from "@/components/SarahContact";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo-word">{site.shortName}</span>
              <span className="logo-ai">AI</span>
            </Link>
            <p>
              Full-service AI agency in {site.location.kicker}.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <IntakeLink>Start the paid analysis</IntakeLink>
          </nav>
          <div className="footer-contact">
            <div>{site.location.full}</div>
            <SarahContact
              className="sarah-contact"
              primaryClassName="sarah-contact-primary"
              secondaryClassName="sarah-contact-secondary"
            />
            <Link href="/contact">Write us</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <span>Orange County, California</span>
        </div>
      </div>
    </footer>
  );
}
