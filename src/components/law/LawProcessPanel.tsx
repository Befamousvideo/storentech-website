import { LAW_COPY } from "@/lib/law-landing";

export function LawProcessPanel() {
  const { columns, caption, supporting } = LAW_COPY.analysis;

  return (
    <figure className="law-process">
      <div className="law-process-grid">
        {columns.map((column) => (
          <article key={column.title} className="law-process-col">
            <h3>{column.title}</h3>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <figcaption>{caption}</figcaption>
      <p className="law-process-support">{supporting}</p>
    </figure>
  );
}
