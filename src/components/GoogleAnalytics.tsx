"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { AD_CONSENT_CHANGE_EVENT } from "@/lib/ad-consent";
import {
  GA_MEASUREMENT_ID,
  mayLoadGoogleAnalytics,
} from "@/lib/analytics";

const GA_SCRIPT_SRC =
  `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}` as const;

function disableAndRemoveGoogleAnalytics() {
  (window as unknown as Record<string, unknown>)[
    `ga-disable-${GA_MEASUREMENT_ID}`
  ] = true;
  document
    .querySelectorAll(
      `script[src="${GA_SCRIPT_SRC}"], script#ga4, script#ga4-init`,
    )
    .forEach((node) => node.remove());
}

export function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    function sync() {
      const next = mayLoadGoogleAnalytics();
      setAllowed(next);
      if (!next) {
        disableAndRemoveGoogleAnalytics();
      }
    }

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(AD_CONSENT_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(AD_CONSENT_CHANGE_EVENT, sync);
    };
  }, []);

  if (!allowed) {
    return null;
  }

  return (
    <>
      <Script
        id="ga4"
        src={GA_SCRIPT_SRC}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
