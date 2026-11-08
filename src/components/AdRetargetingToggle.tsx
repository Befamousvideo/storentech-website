"use client";

import { useEffect, useState } from "react";
import {
  hasGlobalPrivacyControl,
  mayLoadAdTag,
  writeAdRetargetingChoice,
} from "@/lib/ad-consent";

export function AdRetargetingToggle() {
  const [enabled, setEnabled] = useState(true);
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    const nextGpc = hasGlobalPrivacyControl();
    setGpc(nextGpc);
    setEnabled(mayLoadAdTag({ pathname: "/law", globalPrivacyControl: nextGpc }));
  }, []);

  function toggle() {
    if (gpc) return;
    const next = !enabled;
    writeAdRetargetingChoice(next);
    setEnabled(next);
  }

  return (
    <div className="privacy-choice">
      <button
        type="button"
        className="privacy-choice-switch"
        role="switch"
        aria-checked={enabled && !gpc}
        aria-disabled={gpc}
        disabled={gpc}
        onClick={toggle}
      >
        <span className="privacy-choice-knob" />
        <span className="privacy-choice-label">
          Ad retargeting cookies {gpc || !enabled ? "off" : "on"}
        </span>
      </button>
      {gpc ? (
        <p className="privacy-choice-note">
          Your browser sent a Global Privacy Control signal, so ad retargeting
          cookies stay off.
        </p>
      ) : null}
    </div>
  );
}
