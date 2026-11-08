"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DISMISS_KEY = "st_ad_cookie_notice_dismissed";

export function AdLandingCookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") {
        return;
      }
    } catch {
      // Show the notice if storage is blocked.
    }
    setVisible(true);
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Dismiss for this visit even if storage is blocked.
    }
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <aside className="ad-cookie-notice" role="note">
      <p>
        We use cookies, including ad retargeting cookies, to show you relevant
        ads.{" "}
        <Link href="/privacy-choices">Your Privacy Choices</Link>.
      </p>
      <button
        type="button"
        className="ad-cookie-notice-dismiss"
        onClick={dismiss}
        aria-label="Dismiss cookie notice"
      >
        Close
      </button>
    </aside>
  );
}
