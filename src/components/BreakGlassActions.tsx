"use client";

import {
  dialAssembledTel,
  downloadAssembledVCard,
} from "@/lib/break-glass-contact";

export function BreakGlassActions() {
  return (
    <div className="break-glass-actions">
      <button
        type="button"
        className="btn btn-solid break-glass-btn"
        onClick={dialAssembledTel}
      >
        Call Sarah
      </button>
      <button
        type="button"
        className="btn break-glass-btn"
        onClick={downloadAssembledVCard}
      >
        Save contact
      </button>
    </div>
  );
}
