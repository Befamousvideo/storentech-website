"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  LEAK_TOOLTIP_HREF,
  LEAK_TOOLTIP_LINK_LABEL,
  LEAK_TOOLTIP_TEXT,
} from "@/lib/leak-copy";

const LEAK_WORD = /\bleak(?:s|ing)?\b/i;
const VIEWPORT_PAD = 12;
const GAP = 8;
const MAIN_CTA_SELECTOR =
  ".hero .btn-row .btn-solid, .page-hero .btn-row .btn-solid";

function rectsOverlap(a: DOMRect, b: DOMRect) {
  return !(
    a.bottom <= b.top ||
    a.top >= b.bottom ||
    a.right <= b.left ||
    a.left >= b.right
  );
}

function overlapsMainCta(panel: DOMRect) {
  return [...document.querySelectorAll(MAIN_CTA_SELECTOR)].some((node) =>
    rectsOverlap(panel, node.getBoundingClientRect()),
  );
}

export function LeakTooltip({ children }: { children: ReactNode }) {
  const triggerId = useId();
  const panelId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLSpanElement>(null);
  const pointerTypeRef = useRef("mouse");
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const openPanel = useCallback(() => setOpen(true), []);

  const placePanel = useCallback(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const triggerRect = trigger.getBoundingClientRect();
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    let left = triggerRect.left + triggerRect.width / 2 - width / 2;
    left = Math.min(
      Math.max(VIEWPORT_PAD, left),
      window.innerWidth - width - VIEWPORT_PAD,
    );

    let top = triggerRect.bottom + GAP;
    const below = new DOMRect(left, top, width, height);
    const wouldOverflowBottom =
      top + height > window.innerHeight - VIEWPORT_PAD;
    if (wouldOverflowBottom || overlapsMainCta(below)) {
      top = triggerRect.top - height - GAP;
    }
    if (top < VIEWPORT_PAD) {
      top = VIEWPORT_PAD;
      const pinned = new DOMRect(left, top, width, height);
      if (overlapsMainCta(pinned)) {
        const ctas = [...document.querySelectorAll(MAIN_CTA_SELECTOR)];
        const ctaTop = Math.min(
          ...ctas.map((node) => node.getBoundingClientRect().top),
        );
        if (Number.isFinite(ctaTop)) {
          top = Math.max(VIEWPORT_PAD, ctaTop - height - GAP);
        }
      }
    }

    panel.style.position = "fixed";
    panel.style.top = `${Math.round(top)}px`;
    panel.style.left = `${Math.round(left)}px`;
    panel.style.transform = "none";
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  }, []);

  useEffect(() => {
    if (!open) return;
    placePanel();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        triggerRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const root = rootRef.current;
      const target = event.target;
      if (root && target instanceof Node && !root.contains(target)) {
        close();
      }
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", placePanel);
    window.addEventListener("scroll", placePanel, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", placePanel, true);
    };
  }, [open, close, placePanel]);

  function onPointerEnter(event: ReactPointerEvent<HTMLSpanElement>) {
    if (event.pointerType === "mouse") openPanel();
  }

  function onPointerLeave(event: ReactPointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== "mouse") return;
    const next = event.relatedTarget;
    if (next instanceof Node && rootRef.current?.contains(next)) return;
    if (document.activeElement === triggerRef.current) return;
    close();
  }

  return (
    <span
      ref={rootRef}
      className="leak-tooltip"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        className="leak-tooltip-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-describedby={panelId}
        onPointerDown={(event) => {
          pointerTypeRef.current = event.pointerType;
        }}
        onClick={() => {
          if (pointerTypeRef.current === "mouse") {
            openPanel();
            return;
          }
          setOpen((current) => !current);
        }}
        onFocus={openPanel}
      >
        <span className="leak-tooltip-term">{children}</span>
        <span className="leak-tooltip-hint" aria-hidden="true">
          (?)
        </span>
      </button>
      <span
        ref={panelRef}
        id={panelId}
        className={`leak-tooltip-panel${open ? " is-open" : ""}`}
        role="tooltip"
      >
        <button
          type="button"
          className="leak-tooltip-close"
          aria-label="Close"
          onClick={close}
        >
          ×
        </button>
        <span className="leak-tooltip-text">{LEAK_TOOLTIP_TEXT}</span>
        <Link className="leak-tooltip-link" href={LEAK_TOOLTIP_HREF}>
          {LEAK_TOOLTIP_LINK_LABEL}
        </Link>
      </span>
    </span>
  );
}

export function LeakMention({ children }: { children: string }) {
  const match = children.match(LEAK_WORD);
  if (!match || match.index === undefined) return children;
  const word = match[0];
  const start = match.index;
  return (
    <>
      {children.slice(0, start)}
      <LeakTooltip>{word}</LeakTooltip>
      {children.slice(start + word.length)}
    </>
  );
}
