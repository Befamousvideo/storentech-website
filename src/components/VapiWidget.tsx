"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

const SCRIPT_SRC = "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";

export function VapiWidget() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

  useEffect(() => {
    if (!publicKey) return;
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [publicKey]);

  if (!publicKey) return null;

  return (
    <vapi-widget
      public-key={publicKey}
      assistant-id={site.vapiAssistantId}
      mode="voice"
      theme="light"
      size="compact"
      position="bottom-right"
      accent-color="#9b7a4b"
      cta-button-color="#0e1c2f"
      cta-button-text-color="#f4efe6"
      title="Sarah"
      cta-title="Talk to Sarah"
      cta-subtitle="Live voice demo"
    />
  );
}
