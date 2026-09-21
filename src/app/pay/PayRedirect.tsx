"use client";

import { useEffect } from "react";

export function PayRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return <meta httpEquiv="refresh" content={`0;url=${href}`} />;
}
