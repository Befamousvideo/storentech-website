export const AD_RETARGETING_STORAGE_KEY = "st_ad_retargeting";
export const AD_RETARGETING_COOKIE_NAME = "st_ad_retargeting";
export const AD_CONSENT_CHANGE_EVENT = "st-ad-consent-change";

/** Pages that must never load an ad tag, even if a later tag is added. */
export const AD_TAG_BLOCKED_PATHS = [
  "/privacy",
  "/privacy-choices",
  "/contact",
] as const;

export function isAdTagBlockedPath(pathname: string) {
  return AD_TAG_BLOCKED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function hasGlobalPrivacyControl(
  source?: { globalPrivacyControl?: boolean },
) {
  const nav =
    source ??
    (typeof navigator === "undefined"
      ? undefined
      : (navigator as { globalPrivacyControl?: boolean }));
  return nav?.globalPrivacyControl === true;
}

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split("; ");
  const match = parts.find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export function readStoredAdRetargetingChoice(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(AD_RETARGETING_STORAGE_KEY);
    if (stored === "0") return false;
    if (stored === "1") return true;
  } catch {
    // Ignore blocked storage and fall through to the cookie.
  }
  const cookie = readCookie(AD_RETARGETING_COOKIE_NAME);
  if (cookie === "0") return false;
  if (cookie === "1") return true;
  return null;
}

export function writeAdRetargetingChoice(enabled: boolean) {
  const value = enabled ? "1" : "0";
  try {
    window.localStorage.setItem(AD_RETARGETING_STORAGE_KEY, value);
  } catch {
    // Cookie still records the choice if storage is blocked.
  }
  writeCookie(AD_RETARGETING_COOKIE_NAME, value);
  window.dispatchEvent(new Event(AD_CONSENT_CHANGE_EVENT));
}

/**
 * GPC or the stored retargeting opt-out. Shared by ad tags and GA.
 */
export function hasPrivacyOptOut({
  storedChoice,
  globalPrivacyControl,
}: {
  storedChoice?: boolean | null;
  globalPrivacyControl?: boolean;
} = {}) {
  if (globalPrivacyControl ?? hasGlobalPrivacyControl()) return true;
  const stored =
    storedChoice !== undefined
      ? storedChoice
      : readStoredAdRetargetingChoice();
  return stored === false;
}

/**
 * Gate for every ad tag. Default is on unless the visitor turned
 * retargeting off, the browser sent Global Privacy Control, or the
 * page is a privacy/PII-form route.
 */
export function mayLoadAdTag({
  pathname = "",
  storedChoice,
  globalPrivacyControl,
}: {
  pathname?: string;
  storedChoice?: boolean | null;
  globalPrivacyControl?: boolean;
} = {}) {
  if (isAdTagBlockedPath(pathname)) return false;
  if (hasPrivacyOptOut({ storedChoice, globalPrivacyControl })) return false;
  return true;
}
