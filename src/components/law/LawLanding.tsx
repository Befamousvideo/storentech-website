import Link from "next/link";
import { LawFaqItem } from "@/components/law/LawFaqItem";
import {
  LawClosingNote,
  LawHeroNote,
  LawInertCta,
} from "@/components/law/LawInertCta";
import { LawNumberedCard } from "@/components/law/LawNumberedCard";
import { LawProcessPanel } from "@/components/law/LawProcessPanel";
import { LawStep } from "@/components/law/LawStep";
import { LawWorkflowDiagram } from "@/components/law/LawWorkflowDiagram";
import { LAW_COPY, LAW_CTA_ANCHOR } from "@/lib/law-landing";

function MapLink({ className }: { className?: string }) {
  return (
    <Link className={className ?? "law-text-link"} href={LAW_COPY.hero.secondary.href}>
      {LAW_COPY.hero.secondary.label}
    </Link>
  );
}

export function LawLanding() {
  const lastCardIndex = LAW_COPY.opportunities.cards.length - 1;

  return (
    <article className="law-landing">
      <header className="law-hero">
        <div className="wrap law-hero-grid">
          <div className="law-hero-copy">
            <p className="law-audience">{LAW_COPY.hero.audience}</p>
            <h1>{LAW_COPY.hero.h1}</h1>
            <p className="law-subhead">{LAW_COPY.hero.subhead}</p>
            <div id={LAW_CTA_ANCHOR}>
              <LawInertCta
                label={LAW_COPY.hero.ctaLabel}
                noteId="law-cta-hold-hero"
              />
            </div>
            <LawHeroNote />
            <MapLink />
          </div>
          <LawWorkflowDiagram />
        </div>
      </header>

      <section className="law-section" aria-labelledby="law-opportunities-heading">
        <div className="wrap">
          <h2 id="law-opportunities-heading">{LAW_COPY.opportunities.heading}</h2>
          <div className="law-cards">
            {LAW_COPY.opportunities.cards.map((card, index) => (
              <LawNumberedCard
                key={card.n}
                n={card.n}
                title={card.title}
                body={card.body}
                featured={index === lastCardIndex}
              />
            ))}
          </div>
          <p className="law-section-foot">{LAW_COPY.opportunities.footer}</p>
        </div>
      </section>

      <section
        className="law-section law-section-tint"
        aria-labelledby="law-engagement-heading"
      >
        <div className="wrap">
          <h2 id="law-engagement-heading">{LAW_COPY.engagement.heading}</h2>
          <div className="law-steps">
            {LAW_COPY.engagement.steps.map((step) => (
              <LawStep
                key={step.n}
                n={step.n}
                title={step.title}
                subtitle={"subtitle" in step ? step.subtitle : undefined}
                body={step.body}
              />
            ))}
          </div>
          <p className="law-section-foot">
            <MapLink />
          </p>
        </div>
      </section>

      <section className="law-section" aria-labelledby="law-analysis-heading">
        <div className="wrap">
          <h2 id="law-analysis-heading">{LAW_COPY.analysis.heading}</h2>
          <LawProcessPanel />
        </div>
      </section>

      <section
        className="law-section law-section-tint"
        aria-labelledby="law-rules-heading"
      >
        <div className="wrap law-rules">
          <h2 id="law-rules-heading">{LAW_COPY.rules.heading}</h2>
          <p className="law-rules-intro">{LAW_COPY.rules.intro}</p>
          <ol className="law-rules-list">
            {LAW_COPY.rules.points.map((point, index) => (
              <li key={point.title}>
                <h3>
                  <span className="law-rules-n">{index + 1}.</span> {point.title}
                </h3>
                <p>{point.body}</p>
              </li>
            ))}
          </ol>
          <ul className="law-rules-links">
            {LAW_COPY.rules.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="law-rules-foot">{LAW_COPY.rules.footnote}</p>
        </div>
      </section>

      <section className="law-section" aria-labelledby="law-faq-heading">
        <div className="wrap law-faq">
          <h2 id="law-faq-heading">{LAW_COPY.faqHeading}</h2>
          {LAW_COPY.faqs.map((item) => (
            <LawFaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>

      <section
        className="law-section law-section-tint law-closing"
        aria-labelledby="law-closing-heading"
      >
        <div className="wrap">
          <h2 id="law-closing-heading">{LAW_COPY.closing.heading}</h2>
          <LawInertCta
            label={LAW_COPY.closing.ctaLabel}
            noteId="law-cta-hold-closing"
          />
          <LawClosingNote />
        </div>
      </section>
    </article>
  );
}
