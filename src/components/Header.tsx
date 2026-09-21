"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { IntakeLink } from "@/components/IntakeLink";
import { SarahPhoneImage } from "@/components/SarahContact";
import { nav } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ slim = false }: { slim?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className={`wrap header-inner${slim ? " header-inner-slim" : ""}`}>
        <Link
          href={slim ? "/redo" : "/"}
          className="logo"
          onClick={() => setOpen(false)}
          aria-label="StorenTech AI"
        >
          <BrandLogo />
        </Link>

        {slim ? null : (
          <nav className="nav-desktop" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {slim ? null : (
          <div className="header-actions">
            <SarahPhoneImage className="sarah-phone header-sarah-phone" />
            <IntakeLink className="btn btn-solid">Start analysis</IntakeLink>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
            </button>
          </div>
        )}
      </div>

      {slim ? null : (
        <div
          id="mobile-nav"
          className={`mobile-drawer wrap${open ? " open" : ""}`}
        >
          <nav aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-actions">
            <SarahPhoneImage className="sarah-phone header-sarah-phone" />
            <IntakeLink className="btn btn-solid" onClick={() => setOpen(false)}>
              Start analysis
            </IntakeLink>
          </div>
        </div>
      )}
    </header>
  );
}
