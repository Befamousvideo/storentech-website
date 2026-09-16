import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <JsonLd data={faqJsonLd(items)} />
        <p className="kicker">Questions</p>
        <h2 className="faq-title">Straight answers.</h2>
        <div className="faq-list">
          {items.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
