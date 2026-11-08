import { Suspense } from "react";
import { AdLandingLeadCta } from "@/components/AdLandingLeadCta";
import { buildAdLandingLeadHref } from "@/lib/ad-landing-lead";
import type { AdLandingPage } from "@/lib/ad-landing-pages";

function LeadCtaFallback({ page }: { page: AdLandingPage }) {
  const href = buildAdLandingLeadHref({
    vertical: page.vertical,
    specialty: page.specialty,
  });

  return (
    <a className="btn btn-solid" href={href} rel="noopener noreferrer">
      {page.ctaLabel}
    </a>
  );
}

export function AdLandingTemplate({ page }: { page: AdLandingPage }) {
  return (
    <article className="ad-landing">
      <header className="page-hero">
        <div className="wrap-narrow">
          <h1>{page.h1}</h1>
          <hr className="rule" />
          <p className="lede">{page.subhead}</p>
          <div className="btn-row">
            <Suspense fallback={<LeadCtaFallback page={page} />}>
              <AdLandingLeadCta
                vertical={page.vertical}
                specialty={page.specialty}
                label={page.ctaLabel}
              />
            </Suspense>
          </div>
        </div>
      </header>

      {page.videoUrl ? (
        <figure className="ad-landing-media">
          <video
            src={page.videoUrl}
            controls
            playsInline
            preload="metadata"
            aria-label="Video"
          />
        </figure>
      ) : null}

      {page.elizabethVideoUrl ? (
        <figure className="ad-landing-media">
          <video
            src={page.elizabethVideoUrl}
            controls
            playsInline
            preload="metadata"
            aria-label="Spokesperson video"
          />
        </figure>
      ) : null}
    </article>
  );
}
