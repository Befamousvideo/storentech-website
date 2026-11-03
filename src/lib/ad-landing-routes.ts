/**
 * Ad landing routes that load the Trade Desk retargeting pixel.
 * Keep this list route-scoped — do not add the homepage or other site pages.
 */
export const AD_LANDING_ROUTE_PREFIXES = ["/law", "/contractors"] as const;

export function isAdLandingPath(pathname: string) {
  return AD_LANDING_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
