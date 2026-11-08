import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function CaliforniaLawFirmAiReceptionistArticle({
  post,
}: {
  post: BlogPost;
}) {
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
            California law firms can look at AI receptionists and intake tools,
            but the State Bar of California&apos;s practical guidance on
            generative AI asks lawyers to keep meaningful supervision, avoid
            unsupervised legal advice from agentic systems and put safeguards
            around anything that sends client information outside the firm.
            This post is a plain-English summary for Orange County owners — it
            is not legal advice. Read the guidance yourself and talk with your
            own ethics counsel before you change how intake works.
          </p>
          <p>
            The guidance is the State Bar of California document titled
            Practical Guidance for the Use of Generative Artificial
            Intelligence in the Practice of Law. The PDF is published on
            calbar.ca.gov. Nothing here tells you what you must or may do. It
            only points at topics the guidance raises that matter when someone
            asks about an &quot;AI receptionist.&quot;
          </p>
          <p>
            <strong>
              An AI receptionist is a tool for intake and routing. It is not a
              substitute for a lawyer&apos;s judgment about advice, conflicts
              or who the firm will represent.
            </strong>
          </p>
        </div>

        <h2>What the guidance means by agentic AI and intake</h2>
        <p>
          The State Bar&apos;s guidance discusses generative AI that can take
          actions, not only draft text. In that discussion, it lists
          &quot;autonomously facilitating client intake&quot; as an example of
          agentic AI.
        </p>
        <p>
          That single phrase is why receptionists and intake bots show up in
          this conversation. An after-hours line that answers, asks questions,
          books a consult and sends a summary is closer to &quot;facilitating
          client intake&quot; than to a spell-check tool. Owners should treat
          it as something that needs rules, review and a clear handoff to
          people — not as a set-and-forget gadget.
        </p>

        <h2>Supervision: legal advice still needs a lawyer</h2>
        <p>
          The guidance is careful about systems that talk to the public.
          Lawyers must not deploy agentic systems that &quot;communicate legal
          advice ... without meaningful lawyer supervision and review&quot;
          (wording from the guidance; ellipsis ours where we shorten for
          length — check the PDF for the full sentence).
        </p>
        <p>
          In owner terms: an AI receptionist can collect facts your firm asks
          for. It should not answer &quot;do I have a case?&quot; or
          &quot;what should I file?&quot; as if it were counsel. Anything that
          sounds like legal advice needs a lawyer&apos;s meaningful supervision
          and review, not a silent autopilot.
        </p>
        <p>
          Keep that line bright when you write scripts and when you sample
          calls each week.
        </p>

        <h2>Client information leaving the firm</h2>
        <p>
          The guidance also warns against autonomous external transmission of
          client information, &quot;including automated communications,
          filings, or data transfers, without appropriate safeguards and human
          review.&quot;
        </p>
        <p>
          The guidance also says checking out a generative AI product takes
          real effort: reasonable efforts &quot;require more than reliance on
          generalized marketing assurances.&quot; In practice, that means
          reading the terms of use and privacy policy and understanding how the
          product collects, uses, stores and discloses the information you give
          it.
        </p>
        <p>For an AI receptionist, that points at everyday habits:</p>
        <ul>
          <li>Who can hear call recordings or read transcripts?</li>
          <li>When does a summary email leave the building, and who approves it?</li>
          <li>Are vendors and tools checked before client details flow through them?</li>
          <li>Is there a person who can stop or correct an automated message?</li>
        </ul>
        <p>
          You do not need a security lecture to start. Know where caller and
          client information goes, and keep a human in the loop before anything
          sensitive is sent out.
        </p>

        <h2>A practical checklist for Orange County owners</h2>
        <p>
          If you are weighing an AI receptionist, walk through these questions
          with whoever owns intake at your firm — and with ethics counsel as
          needed:
        </p>
        <ul>
          <li>
            What can the system say? Stick to your intake questions and
            scheduling rules. Block advice-style answers.
          </li>
          <li>
            Who reviews unusual calls? Name a person for same-day review of
            anything odd.
          </li>
          <li>
            What leaves the firm automatically? Turn off or gate automated
            outbound messages until a person approves them.
          </li>
          <li>
            How will you sample quality? Listen to a few calls every week and
            update the script.
          </li>
          <li>
            Where is the guidance? Keep the State Bar PDF handy and revisit it
            when you change tools.
          </li>
        </ul>
        <p>
          The guidance raises two more topics worth a conversation with your
          counsel. On client disclosure, it says a lawyer must consider telling
          clients that they intend to use AI in the representation. On fees, it
          says subscription fees for generative AI tools that provide general
          office functionality typically constitute overhead and should be
          absorbed within the lawyer&apos;s fee rather than charged separately
          to clients.
        </p>
        <p>
          <strong>
            StorenTech AI helps Orange County law firms plan AI intake and
            receptionist workflows with clear human review — without pretending
            a tool replaces a lawyer.
          </strong>
        </p>
        <p>
          Again: this article is not legal advice and does not say any
          particular setup meets the State Bar&apos;s expectations. Your
          counsel and the full guidance are the right sources for that
          judgment.
        </p>

        <h2>Next step</h2>
        <p>
          If you want a structured look at where intake, after-hours coverage
          and follow-up fit in your firm,{" "}
          <Link href="/opportunity">start with an AI Opportunity Map</Link>.
          Bring the State Bar PDF to that conversation so recommendations stay
          tied to how your office already works.
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
