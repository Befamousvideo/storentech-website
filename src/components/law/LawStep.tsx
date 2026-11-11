export function LawStep({
  n,
  title,
  subtitle,
  body,
}: {
  n: string;
  title: string;
  subtitle?: string;
  body: string;
}) {
  return (
    <article className="law-step">
      <p className="law-step-n">Step {n}</p>
      <h3>{title}</h3>
      {subtitle ? <p className="law-step-subtitle">{subtitle}</p> : null}
      <p>{body}</p>
    </article>
  );
}
