import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const CLIO_TRENDS_URL =
  "https://www.clio.com/blog/highlights-from-2024-legal-trends-report/";

export function LawFirmMissedCallsArticle({ post }: { post: BlogPost }) {
  const hero = post.hero;

  return (
    <article className="blog-article">
      <header className="page-hero blog-hero">
        <div className="wrap-narrow">
          <p className="kicker">
            <Link href="/blog">Blog</Link>
          </p>
          <h1>{post.title}</h1>
          <hr className="rule" />
        </div>
        {hero?.png ? (
          <figure className="blog-hero-media">
            <img
              src={hero.png}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              fetchPriority="high"
            />
          </figure>
        ) : null}
      </header>

      <div className="wrap-narrow blog-prose">
        <div className="blog-lead">
          <p>
            When a potential client calls your Orange County law firm at 7 p.m.
            or on a Saturday, they usually get voicemail, a full mailbox or no
            answer at all — and many of them never leave a message. The first
            fixes are simple: answer or return the call, capture a few basics,
            route anything urgent to a person and follow up the next morning.
            An AI intake line can help with the first steps; a lawyer still
            decides who becomes a client.
          </p>
          <p>
            <a
              href={CLIO_TRENDS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Clio&apos;s 2024 Legal Trends Report highlights
            </a>{" "}
            (from a secret shop of 500 firms) put numbers on how common this
            is. Clio wrote: &quot;Only 40% of firms answered our phone
            calls.&quot; Clio also wrote: &quot;In total, 52% of firms either
            answered our phone calls or phoned us back, meaning 48% were
            essentially unreachable by phone.&quot; And: &quot;Just 33%
            responded to our emails.&quot; Those are Clio&apos;s findings from
            that study, not StorenTech&apos;s.
          </p>
          <p>
            <strong>
              A missed after-hours call is not a message waiting for Monday.
              For many callers, it is a reason to dial the next firm on the
              list.
            </strong>
          </p>
        </div>

        <h2>What the caller experiences after hours</h2>
        <p>
          Picture someone who just found your number online. It is 7:15 p.m. on
          a weeknight, or mid-morning on Saturday. They have a problem that
          feels urgent to them — a deadline, a family matter, a business
          dispute — and they are calling firms in Orange County one by one.
        </p>
        <p>What they often hear:</p>
        <ul>
          <li>
            Voicemail that says to leave a name and number, with no promise of
            when anyone will call back.
          </li>
          <li>A full mailbox or a tone that cuts them off.</li>
          <li>No answer after several rings.</li>
          <li>
            An after-hours recording that points them to a website form they
            may not fill out.
          </li>
        </ul>
        <p>
          Plenty of people hang up instead of leaving a message. Clio&apos;s
          study of 500 firms helps explain why owners who feel busy during the
          day can still lose callers at night: if nearly half of firms in that
          secret shop were essentially unreachable by phone, a caller who tries
          two or three numbers may never reach a person.
        </p>

        <h2>What to fix first</h2>
        <p>
          You do not need a full rebuild of the phone system to improve the
          caller&apos;s night. Start with four moves, in order:
        </p>
        <ul>
          <li>
            Answer or return the call. Someone — a person or a well-briefed
            intake line — picks up, or you call back the same evening when it
            is urgent.
          </li>
          <li>
            Capture basics. Name, phone, email, what the matter is about and
            whether there is a hard deadline. Keep it short.
          </li>
          <li>
            Route to a person when it matters. Emergencies, existing clients
            and anything that sounds like legal advice go to a lawyer or intake
            staff, not into a black hole.
          </li>
          <li>
            Follow up next morning. A short call or email the next business
            day closes the loop even if you do not take the matter.
          </li>
        </ul>
        <p>
          Those four steps alone change what the caller remembers about your
          firm.
        </p>

        <h2>Where an AI intake line fits</h2>
        <p>
          An AI phone agent can answer every after-hours call, ask your intake
          questions, log the basics and send urgent matters to the right person
          on your team. It does not decide whether someone becomes a client.
          That stays with a lawyer.
        </p>
        <p>
          Use it for coverage and consistency. Keep a person in charge of
          judgment calls, unusual facts and anything that leaves the office.
          Check a sample of calls each week so the questions and routing still
          match how your firm works.
        </p>
        <p>
          <strong>
            StorenTech AI helps Orange County law firms cover after-hours calls
            with AI intake that asks your questions, captures the basics and
            hands urgent matters to your team — while a lawyer still decides
            who becomes a client.
          </strong>
        </p>
        <p>
          Security can stay simple for owners: know who can hear recordings and
          see caller details, and keep a human reviewing anything that goes
          outside the firm.
        </p>

        <h2>A Monday-morning check that takes ten minutes</h2>
        <p>
          Once a week, look at after-hours missed calls, returned calls and new
          inquiries that started on the phone. Ask:
        </p>
        <ul>
          <li>How many after-hours calls did we miss?</li>
          <li>How many left a message or got a callback the same night?</li>
          <li>How many turned into a scheduled consult?</li>
        </ul>
        <p>
          You do not need fancy software for this. A spreadsheet and last
          week&apos;s phone log are enough to see whether evenings and weekends
          are leaking work to the next firm on the list.
        </p>

        <h2>Next step</h2>
        <p>
          If you want a clear view of where calls and inquiries stall at your
          firm,{" "}
          <Link href="/opportunity">start with an AI Opportunity Map</Link>. It
          is built for Orange County owners who want practical next steps, not
          a sales pitch about tools.
        </p>

        <section className="blog-faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading">FAQ</h2>
          {post.faqs.map((item) => (
            <div className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="blog-cta">
          <div className="btn-row">
            <Link className="btn btn-solid" href="/opportunity">
              Start your AI Opportunity Map
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
