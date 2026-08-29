import Link from "next/link";
import { footerNav, site } from "@/lib/site";

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
              Full-service AI agency in {site.location.kicker}.{" "}
              {site.founder.name}, {site.founder.title}.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/roi-analysis">Start the ROI Analysis</Link>
          </nav>
          <div className="footer-contact">
            <div>{site.location.full}</div>
            <a href={`tel:${site.phones.office.tel}`}>
              Office {site.phones.office.display}
            </a>
            <a href={`tel:${site.phones.sarah.tel}`}>
              Sarah {site.phones.sarah.display}
            </a>
            <a href={`mailto:${site.emails.vincent}`}>{site.emails.vincent}</a>
            <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>
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
