"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { shouldDropAnalyticsUrl } from "@/lib/analytics";

export function SiteAnalytics() {
  return (
    <>
      <Analytics
        beforeSend={(event) =>
          shouldDropAnalyticsUrl(event.url) ? null : event
        }
      />
      <SpeedInsights
        beforeSend={(event) =>
          shouldDropAnalyticsUrl(event.url) ? null : event
        }
      />
    </>
  );
}
