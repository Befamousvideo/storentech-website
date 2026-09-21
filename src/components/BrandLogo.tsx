import { site } from "@/lib/site";

export function BrandLogo() {
  return (
    <>
      <img
        className="logo-mark"
        src={site.brand.mark}
        alt=""
        width={512}
        height={512}
      />
      <span className="logo-word">{site.shortName}</span>
      <span className="logo-ai">AI</span>
    </>
  );
}
