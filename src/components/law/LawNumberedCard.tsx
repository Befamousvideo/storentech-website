export function LawNumberedCard({
  n,
  title,
  body,
  featured = false,
}: {
  n: string;
  title: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "law-card law-card-featured" : "law-card"}>
      <p className="law-card-n">{n}</p>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
