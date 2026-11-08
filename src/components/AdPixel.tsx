"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AD_CONSENT_CHANGE_EVENT,
  mayLoadAdTag,
} from "@/lib/ad-consent";

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

function removeLoadedAdPixel() {
  document
    .querySelectorAll(`script[src="${AD_PIXEL_LOADER_SRC}"]`)
    .forEach((node) => node.remove());
}

export function AdPixel() {
  const pathname = usePathname() ?? "";
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function sync() {
      const next = mayLoadAdTag({ pathname });
      setAllowed(next);
      if (!next) {
        removeLoadedAdPixel();
      }
    }

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(AD_CONSENT_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(AD_CONSENT_CHANGE_EVENT, sync);
    };
  }, [pathname]);

  if (!allowed) {
    return null;
  }

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
