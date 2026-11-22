import { mapValue, site } from "@/lib/site";

export function MapValueCard({
  compact = false,
  showComplex = false,
}: {
  compact?: boolean;
  showComplex?: boolean;
}) {
  return (
    <aside className={`card map-value${compact ? " map-value-compact" : ""}`}>
      <p className="kicker">{mapValue.heading}</p>
      <p className="map-value-lede">{mapValue.lede}</p>
      {compact ? null : (
        <ul>
          {mapValue.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <p className="map-value-keep">{mapValue.keepLine}</p>
      <p className="price map-value-price">
        {site.offer.priceLine}
        {showComplex
          ? ` Complex work runs ${site.prices.analysisComplex}.`
          : null}
      </p>
    </aside>
  );
}
