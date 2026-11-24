import type { Metadata } from "next";
import { PromotionStickBookCta } from "@/components/PromotionStickBookCta";
import { StructuredData } from "@/components/StructuredData";
import {
  PROMOTION_STICK_CANONICAL_URL,
  PROMOTION_STICK_COPY,
  promotionStickFaqPageLd,
  promotionStickServiceLd,
} from "@/lib/promotion-stick";
import { siteFallbackOgImages } from "@/lib/seo";

const copy = PROMOTION_STICK_COPY;
const ogImages = siteFallbackOgImages();

export const metadata: Metadata = {
  title: { absolute: copy.meta.title },
  description: copy.meta.description,
  robots: { index: false, follow: false },
  alternates: { canonical: PROMOTION_STICK_CANONICAL_URL },
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    url: PROMOTION_STICK_CANONICAL_URL,
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
    images: ogImages,
  },
};

export default function MakeThePromotionStickPage() {
  return (
    <article className="promotion-stick">
      <StructuredData data={promotionStickServiceLd()} />
      <StructuredData data={promotionStickFaqPageLd()} />

      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">{copy.hero.offerName}</p>
          <h1 className="promotion-stick-title">{copy.hero.headline}</h1>
          <hr className="rule" />
          <p className="lede">{copy.hero.subhead}</p>
          <p className="fine">{copy.hero.supportingLine}</p>
          <div className="btn-row" style={{ marginTop: "1.7rem" }}>
            <PromotionStickBookCta />
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="promotion-stick-who-heading">
        <div className="wrap-narrow">
          <h2 id="promotion-stick-who-heading" className="promotion-stick-heading">
            {copy.who.heading}
          </h2>
          <p className="lede">{copy.who.intro}</p>
          <ul className="copy-points">
            {copy.who.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="lede" style={{ marginTop: "1.15rem" }}>
            {copy.who.close}
          </p>
        </div>
      </section>

      <section
        className="section section-tan"
        aria-labelledby="promotion-stick-session-heading"
      >
        <div className="wrap">
          <h2
            id="promotion-stick-session-heading"
            className="promotion-stick-heading"
          >
            {copy.session.heading}
          </h2>
          <div className="engagement">
            {copy.session.steps.map((step) => (
              <article className="engagement-row" key={step.n}>
                <div className="n">{step.n}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {"note" in step ? (
                    <p className="fine promotion-stick-step-note">{step.note}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="promotion-stick-how-heading">
        <div className="wrap-narrow">
          <h2 id="promotion-stick-how-heading" className="promotion-stick-heading">
            {copy.how.heading}
          </h2>
          <ul className="copy-points">
            {copy.how.points.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong> {item.body}
              </li>
            ))}
          </ul>
          <p className="lede" style={{ marginTop: "1.15rem" }}>
            {copy.how.resultsVary}
          </p>
        </div>
      </section>

      <section
        className="section section-tan"
        aria-labelledby="promotion-stick-not-heading"
      >
        <div className="wrap-narrow">
          <h2 id="promotion-stick-not-heading" className="promotion-stick-heading">
            {copy.not.heading}
          </h2>
          <ul className="copy-points">
            {copy.not.points.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong> {item.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="promotion-stick-price-heading">
        <div className="wrap-narrow">
          <h2
            id="promotion-stick-price-heading"
            className="promotion-stick-heading"
          >
            {copy.price.heading}
          </h2>
          <p className="lede">{copy.price.includes}</p>
          <p className="lede" style={{ marginTop: "1.15rem" }}>
            {copy.price.booking}
          </p>
          <div className="btn-row" style={{ marginTop: "1.7rem" }}>
            <PromotionStickBookCta />
          </div>
        </div>
      </section>

      <section
        className="section section-tan"
        aria-labelledby="promotion-stick-next-heading"
      >
        <div className="wrap-narrow">
          <h2 id="promotion-stick-next-heading" className="promotion-stick-heading">
            {copy.next.heading}
          </h2>
          <p className="lede">{copy.next.intro}</p>
          <ul className="copy-points">
            <li>
              <strong>{copy.next.point.title}</strong> {copy.next.point.body}
            </li>
          </ul>
          <p className="lede" style={{ marginTop: "1.15rem" }}>
            {copy.next.close}
          </p>
        </div>
      </section>

      <section
        className="section cta-band"
        aria-labelledby="promotion-stick-cta-heading"
      >
        <div className="wrap">
          <h2 id="promotion-stick-cta-heading">{copy.cta.heading}</h2>
          <p className="lede">{copy.cta.body}</p>
          <div className="btn-row" style={{ marginTop: "1.5rem" }}>
            <PromotionStickBookCta />
          </div>
        </div>
      </section>

      <section
        className="section section-tan"
        id="faq"
        aria-labelledby="promotion-stick-faq-heading"
      >
        <div className="wrap">
          <h2 id="promotion-stick-faq-heading">{copy.faqHeading}</h2>
          <div className="site-faq">
            {copy.faqs.map((item) => (
              <div className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
