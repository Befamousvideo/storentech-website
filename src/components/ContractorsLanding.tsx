import Link from "next/link";
import {
  contractorsPage,
  contractorsVideo,
} from "@/lib/contractors-page";

function BookingCta() {
  return (
    <a
      className="btn btn-solid"
      href={contractorsPage.ctaHref}
      target="_blank"
      rel="noopener noreferrer"
    >
      {contractorsPage.ctaLabel}
    </a>
  );
}

export function ContractorsLanding() {
  const { problem, agent, grind, start, example, faqs, finalCta } =
    contractorsPage;

  return (
    <article className="blog-article">
      <header className="page-hero blog-hero">
        <div className="wrap-narrow">
          <h1>{contractorsPage.h1}</h1>
          <hr className="rule" />
          <p className="lede">{contractorsPage.subhead}</p>
          <div className="btn-row contractors-actions">
            <BookingCta />
          </div>
          <p className="contractors-text-link">
            <Link href={contractorsPage.heroSecondary.href}>
              {contractorsPage.heroSecondary.label}
            </Link>
          </p>
        </div>
      </header>

      <figure className="contractors-video">
        <video
          src={contractorsVideo.src}
          controls
          playsInline
          muted
          preload="metadata"
          poster={contractorsVideo.poster}
          width={contractorsVideo.width}
          height={contractorsVideo.height}
          aria-label={contractorsVideo.caption}
        />
        <figcaption>{contractorsVideo.caption}</figcaption>
      </figure>

      <div className="wrap-narrow blog-prose">
        <h2>{problem.heading}</h2>
        {problem.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>{problem.costsLabel}</p>
        <ul>
          {problem.costs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{agent.heading}</h2>
        <p>{agent.intro}</p>
        <ul>
          {agent.points.map((item) => (
            <li key={item.lead}>
              <strong>{item.lead}</strong> {item.rest}
            </li>
          ))}
        </ul>
        <p>{agent.close}</p>

        <h2>{grind.heading}</h2>
        <p>{grind.intro}</p>
        <ul>
          {grind.points.map((item) => (
            <li key={item.lead}>
              <strong>{item.lead}</strong> {item.rest}
            </li>
          ))}
        </ul>
        <p>{grind.close}</p>

        <h2>{start.heading}</h2>
        <ol>
          {start.steps.map((item) => (
            <li key={item.lead}>
              <strong>{item.lead}</strong> {item.rest}
            </li>
          ))}
        </ol>
        <p>{start.close}</p>

        <h2>{example.heading}</h2>
        <blockquote className="example-math">
          <p>
            <strong>{example.label}</strong> {example.setup}
          </p>
          <p>
            {example.equation} <strong>{example.result}</strong>
          </p>
          <p>{example.disclaimer}</p>
        </blockquote>

        <section className="blog-faq" aria-labelledby="contractors-faq-heading">
          <h2 id="contractors-faq-heading">FAQ</h2>
          {faqs.map((item) => (
            <div className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="blog-cta" aria-labelledby="contractors-final-cta">
          <h2 id="contractors-final-cta">{finalCta.headline}</h2>
          <p>{finalCta.body}</p>
          <div className="btn-row contractors-actions">
            <BookingCta />
          </div>
          <p className="contractors-text-link">
            <Link href={finalCta.secondaryHref}>{finalCta.secondaryLabel}</Link>
          </p>
        </section>

        <p className="contractors-signoff">{contractorsPage.signoff}</p>
      </div>
    </article>
  );
}
