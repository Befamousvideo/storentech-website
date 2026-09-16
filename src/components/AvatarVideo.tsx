import { avatarTranscript, youtubeAvatar } from "@/lib/avatar";
import { site } from "@/lib/site";

export function AvatarVideo({ eyebrow = "Site avatar" }: { eyebrow?: string }) {
  return (
    <section className="section" id="avatar">
      <div className="wrap avatar-grid">
        <div>
          <p className="kicker">{eyebrow}</p>
          <h2>A short word from the office.</h2>
          <hr className="rule" />
          <p className="lede">
            The site avatar — a short film, not a live session. Call Sarah at{" "}
            {site.phones.sarah.display} if you want the voice employee on the phone.
          </p>
        </div>
        <div className="avatar-frame">
          <iframe
            src={youtubeAvatar.embed}
            title={youtubeAvatar.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
      <div className="wrap">
        <figure className="transcript">
          <figcaption className="kicker">Transcript</figcaption>
          {avatarTranscript.split("\n\n").map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </figure>
      </div>
    </section>
  );
}
