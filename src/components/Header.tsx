"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { IntakeLink } from "@/components/IntakeLink";
import { nav, site } from "@/lib/site";

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
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {slim ? null : (
          <div className="header-actions">
            <a className="btn" href={`tel:${site.phones.sarah.tel}`}>
              Call Sarah
            </a>
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
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-actions">
            <a className="btn" href={`tel:${site.phones.sarah.tel}`}>
              Call Sarah
            </a>
            <IntakeLink className="btn btn-solid" onClick={() => setOpen(false)}>
              Start analysis
            </IntakeLink>
          </div>
        </div>
      )}
    </header>
  );
}
