import { heygenScript, site } from "@/lib/site";

export function HeyGenBlock({ eyebrow = "From Vincent" }: { eyebrow?: string }) {
  const embed = process.env.NEXT_PUBLIC_HEYGEN_EMBED_URL;

  return (
    <section className="section" id="vincent">
      <div className="wrap heygen-grid">
        <div>
          <p className="kicker">{eyebrow}</p>
          <h2>A short word from the office.</h2>
          <hr className="rule" />
          <p className="lede">
            About a minute. Who we are, the first job, the paid analysis, and Sarah
            on the line. Call {site.phones.sarah.display} if you want the live version.
          </p>
        </div>
        <div>
          {embed ? (
            <div className="heygen-frame">
              <iframe
                src={embed}
                title="Vincent Jackson, StorenTech AI"
                allow="autoplay; fullscreen"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="heygen-frame heygen-placeholder" role="img" aria-label="Vincent Jackson film placeholder">
              <p className="kicker">About a minute</p>
              <p>
                Vincent’s film sits here. Read the spoken script below, or call
                Sarah for the live version on the phone.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="wrap">
        <figure className="transcript">
          <figcaption className="kicker">Spoken script / on-page transcript</figcaption>
          {heygenScript.split("\n\n").map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </figure>
      </div>
    </section>
  );
}
