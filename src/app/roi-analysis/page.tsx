import { JsonLd } from "@/components/JsonLd";
import { RoiInterview } from "@/components/RoiInterview";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Start the paid ROI analysis",
  description:
    "Begin StorenTech’s paid Automation ROI analysis. Starts at $1,000. About two minutes. No free audit. Orange County AI agency.",
  path: "/roi-analysis",
});

export default function RoiAnalysisPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "ROI analysis", path: "/roi-analysis" },
        ])}
      />
      <header className="page-hero">
        <div className="wrap-narrow">
          <p className="kicker">Paid work</p>
          <h1>Start the ROI analysis.</h1>
          <hr className="rule" />
          <p className="lede">
            Starts at {site.prices.analysisFrom}. More complex work can be higher. The fee may be credited toward
            implementation. If the company cannot pay, we do not do the work. This is not a complimentary audit.
          </p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap-narrow">
          <RoiInterview />
        </div>
      </section>
    </>
  );
}
