import { INTERVIEW_PATHS } from "@/lib/interview-paths";

function pathnameFromAnalyticsUrl(url: string) {
  try {
    return new URL(url, "https://www.storentechai.com").pathname;
  } catch {
    return url;
  }
}

/** Private interview pages stay out of Web Analytics and Speed Insights. */
export function shouldDropAnalyticsUrl(url: string) {
  const pathname = pathnameFromAnalyticsUrl(url);
  return INTERVIEW_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
