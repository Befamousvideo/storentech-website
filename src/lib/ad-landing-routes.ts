/**
 * Ad landing routes that load the retargeting pixel.
 * Keep this list route-scoped — do not add the homepage or other site pages.
 */
export const AD_LANDING_ROUTE_PREFIXES = ["/law", "/contractors"] as const;

export const AD_LANDING_VERTICALS = ["law", "contractors"] as const;

export type AdLandingVertical = (typeof AD_LANDING_VERTICALS)[number];

export function isAdLandingPath(pathname: string) {
  return AD_LANDING_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function adLandingPath(
  vertical: AdLandingVertical,
  specialty?: string,
) {
  return specialty ? `/${vertical}/${specialty}` : `/${vertical}`;
}
