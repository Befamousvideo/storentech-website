import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { IntakeLink } from "@/components/IntakeLink";
import { SarahContact } from "@/components/SarahContact";
import { nav, site } from "@/lib/site";

export function Footer({ quiet = false }: { quiet?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="StorenTech AI">
              <BrandLogo />
            </Link>
            <p>Full-service AI agency in {site.location.kicker}.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            {quiet ? null : <IntakeLink>{site.offer.cta}</IntakeLink>}
          </nav>
          <div className="footer-contact">
            <div>{site.location.kicker}</div>
            {quiet ? null : (
              <SarahContact
                className="sarah-contact"
                primaryClassName="sarah-contact-primary"
                secondaryClassName="sarah-contact-secondary"
              />
            )}
            {quiet ? null : <Link href="/contact">Write us</Link>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <nav className="footer-legal" aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
          <span>Orange County, California</span>
        </div>
      </div>
    </footer>
  );
}
