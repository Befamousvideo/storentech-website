import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand({
  kicker = "Next",
  title = "Call Sarah, or start the paid analysis.",
  lede,
}: {
  kicker?: string;
  title?: string;
  lede?: string;
}) {
  return (
    <section className="section section-tan cta-band">
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        {lede ? <p className="lede" style={{ marginBottom: "1.6rem" }}>{lede}</p> : null}
        <div className="btn-row">
          <a className="btn btn-solid" href={`tel:${site.phones.sarah.tel}`}>
            Call Sarah {site.phones.sarah.display}
          </a>
          <Link className="btn" href="/contact">
            Start the paid analysis
          </Link>
        </div>
      </div>
    </section>
  );
}
