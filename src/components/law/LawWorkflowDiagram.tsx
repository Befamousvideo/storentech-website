import { LAW_COPY } from "@/lib/law-landing";

export function LawWorkflowDiagram() {
  const { steps, caption } = LAW_COPY.hero.diagram;

  return (
    <figure className="law-diagram" aria-label={LAW_COPY.meta.diagramAlt}>
      <ol className="law-diagram-flow">
        {steps.map((step) => (
          <li key={step}>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
