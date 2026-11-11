import { LAW_COPY } from "@/lib/law-landing";

export function LawWorkflowDiagram() {
  const { steps, caption } = LAW_COPY.hero.diagram;

  return (
    <figure className="law-diagram" aria-label={LAW_COPY.meta.diagramAlt}>
      <ol className="law-diagram-flow">
        {steps.map((step, index) => (
          <li key={step}>
            <div className="law-diagram-step">
              <span className="law-diagram-n" aria-hidden="true">
                {index + 1}
              </span>
              <span className="law-diagram-label">{step}</span>
            </div>
            {index < steps.length - 1 ? (
              <span className="law-diagram-arrow" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
