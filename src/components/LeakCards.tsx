import {
  LEAK_CARDS_CAPTION,
  LEAK_CARDS_HEADING,
  leakCards,
} from "@/lib/leak-copy";

export function LeakCards() {
  return (
    <section className="section" id="leaks">
      <div className="wrap">
        <h2 className="leak-cards-heading">{LEAK_CARDS_HEADING}</h2>
        <div className="card-grid-3 leak-cards">
          {leakCards.map((card) => (
            <article className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.definition}</p>
              <p>
                <strong>Common spots:</strong> {card.spots}
              </p>
            </article>
          ))}
        </div>
        <p className="lede leak-cards-caption">{LEAK_CARDS_CAPTION}</p>
      </div>
    </section>
  );
}
