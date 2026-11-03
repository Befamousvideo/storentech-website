"use client";

import Script from "next/script";

export const TTD_UP_LOADER_SRC =
  "https://js.adsrvr.org/up_loader.1.1.0.js" as const;

declare global {
  function ttd_dom_ready(callback: () => void): void;
  class TTDUniversalPixelApi {
    init(advertiserId: string, pixelIds: string[], src: string): void;
  }
}

export function initTradeDeskUniversalPixel() {
  ttd_dom_ready(function () {
    if (typeof TTDUniversalPixelApi === "function") {
      const universalPixelApi = new TTDUniversalPixelApi();
      universalPixelApi.init(
        "32fv0sy",
        ["z5qm8kl"],
        "https://insight.adsrvr.org/track/up",
      );
    }
  });
}

export function AdLandingRetargetingPixel() {
  return (
    <Script
      id="ttd-universal-pixel"
      src={TTD_UP_LOADER_SRC}
      type="text/javascript"
      strategy="afterInteractive"
      onLoad={initTradeDeskUniversalPixel}
    />
  );
}
