import type { Metadata } from "next";
import { Suspense } from "react";
import { FreeAiMapCapture } from "@/components/FreeAiMapCapture";
import {
  FREE_AI_MAP_BULLETS,
  FREE_AI_MAP_HEADLINE,
  FREE_AI_MAP_PAGE_STEPS,
  FREE_AI_MAP_PATH,
  FREE_AI_MAP_SUBHEAD,
} from "@/lib/free-ai-map";
import { siteFallbackOgImages } from "@/lib/seo";

const ogImages = siteFallbackOgImages();

export const metadata: Metadata = {
  title: { absolute: FREE_AI_MAP_HEADLINE },
  description: FREE_AI_MAP_SUBHEAD,
  alternates: { canonical: FREE_AI_MAP_PATH },
  openGraph: {
    title: FREE_AI_MAP_HEADLINE,
    description: FREE_AI_MAP_SUBHEAD,
    url: FREE_AI_MAP_PATH,
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: FREE_AI_MAP_HEADLINE,
    description: FREE_AI_MAP_SUBHEAD,
    images: ogImages,
  },
};

function CaptureFallback() {
  return (
    <p className="lede" role="status">
      {FREE_AI_MAP_SUBHEAD}
    </p>
  );
}

export default function FreeAiMapPage() {
  return (
    <article className="ad-landing">
      <header className="page-hero">
        <div className="wrap-narrow">
          <h1 className="free-map-title">{FREE_AI_MAP_HEADLINE}</h1>
          <hr className="rule" />
          <p className="lede">{FREE_AI_MAP_SUBHEAD}</p>
          <ul className="free-map-points">
            {FREE_AI_MAP_BULLETS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow">
          <p className="kicker">How to use</p>
          <ol className="free-map-steps">
            {FREE_AI_MAP_PAGE_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Suspense fallback={<CaptureFallback />}>
            <FreeAiMapCapture />
          </Suspense>
        </div>
      </section>
    </article>
  );
}
