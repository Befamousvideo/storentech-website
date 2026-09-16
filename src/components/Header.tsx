"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-word">{site.shortName}</span>
          <span className="logo-ai">AI</span>
        </Link>

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

        <div className="header-actions">
          <a className="btn" href={`tel:${site.phones.sarah.tel}`}>
            Call Sarah
          </a>
          <Link className="btn btn-solid" href="/roi-analysis">
            Start analysis
          </Link>
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
      </div>

      <div id="mobile-nav" className={`mobile-drawer wrap${open ? " open" : ""}`}>
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
          <Link href="/technology" onClick={() => setOpen(false)}>
            Technology
          </Link>
          <Link href="/patterns" onClick={() => setOpen(false)}>
            Patterns
          </Link>
        </nav>
        <div className="mobile-actions">
          <a className="btn" href={`tel:${site.phones.sarah.tel}`}>
            Call Sarah
          </a>
          <Link className="btn btn-solid" href="/roi-analysis" onClick={() => setOpen(false)}>
            Start analysis
          </Link>
        </div>
      </div>
    </header>
  );
}
