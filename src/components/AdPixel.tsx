"use client";

import Script from "next/script";

export const AD_PIXEL_LOADER_SRC =
  "https://js.adsrvr.org/up_loader.1.1.0.js" as const;

type AdPixelApi = {
  init: (advertiserId: string, pixelIds: string[], src: string) => void;
};

type AdPixelGlobals = Window & {
  ttd_dom_ready?: (callback: () => void) => void;
  TTDUniversalPixelApi?: new () => AdPixelApi;
};

export function initAdPixel() {
  const globals = window as AdPixelGlobals;
  const ready = globals.ttd_dom_ready;
  if (typeof ready !== "function") {
    return;
  }

  ready(function () {
    const Api = globals.TTDUniversalPixelApi;
    if (typeof Api === "function") {
      const pixelApi = new Api();
      pixelApi.init(
        "32fv0sy",
        ["z5qm8kl"],
        "https://insight.adsrvr.org/track/up",
      );
    }
  });
}

export function AdPixel() {
  return (
    <Script
      id="ad-pixel"
      src={AD_PIXEL_LOADER_SRC}
      type="text/javascript"
      strategy="afterInteractive"
      onLoad={initAdPixel}
    />
  );
}
