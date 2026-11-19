import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function AiOutboundCallbacksWhatToSettleFirstArticle({
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
            <strong>Short answer:</strong> AI voice tools can now place
            outbound calls through a business&apos;s existing phone provider,
            not just answer incoming ones. Before an Orange County law firm or
            contractor lets AI call anyone, settle four things: who approves
            each call list, what the AI may and may not say, whether calls are
            recorded (ask your attorney), and how you&apos;ll test it on staff
            phones before any real client. For most offices, the safer first
            step is a callback list a person approves, not an AI that decides
            on its own whom to call.
          </p>
          <p>
            We&apos;ve written about AI answering the phone after hours and
            handling case-status calls. This is the other direction, and it
            deserves more care.
          </p>
        </div>

        <h2>What changed with AI and outbound calls?</h2>
        <p>
          Until recently, most AI phone tools small businesses used were built
          to answer: pick up after hours, take a message, book a time. In
          early November 2026, at least one major AI provider announced that
          its voice model can now place outbound calls for any of its
          developer customers, connected through the phone provider a business
          already uses.
        </p>
        <p>
          That means a developer can now set up an AI that calls people, using
          your business&apos;s number. The capability is real. Whether
          it&apos;s a good idea for your office depends on the answers below.
        </p>

        <h2>
          Why is an outbound AI call different from an AI answering the phone?
        </h2>
        <p>
          When someone calls you, they chose to call. When your business calls
          them, you chose to interrupt their day, using your name. A wrong
          answer on an inbound call is a bad experience. A wrong outbound
          call, to the wrong person or saying the wrong thing, can be a bigger
          problem for your reputation, and for a law firm, possibly for client
          confidentiality.
        </p>
        <p>
          So the rules for outbound calls should be tighter than the rules for
          answering.
        </p>

        <h2>Who approves each call list?</h2>
        <p>
          Decide this before anything else. The safest setup is simple: a
          person at your office approves every list of people the AI will
          call, every time.
        </p>
        <ul>
          <li>
            Who builds the list? (For example, yesterday&apos;s missed calls,
            or clients whose next hearing date was set.)
          </li>
          <li>Who checks it before calls go out?</li>
          <li>
            What keeps someone off the list? (Do-not-call requests, opposing
            parties, anyone who asked to be contacted only by email.)
          </li>
        </ul>
        <p>
          If the AI can add people to its own call list, that&apos;s a
          different, much riskier tool.
        </p>

        <h2>What may the AI say, and what must it never say?</h2>
        <p>
          Write it down in plain sentences before anyone builds anything. For
          example:
        </p>
        <ul>
          <li>
            <strong>May say:</strong> &quot;This is the office of [firm name]
            returning your call. I can book a time for you to talk with
            someone.&quot;
          </li>
          <li>
            <strong>Must not say:</strong> anything about the details of a
            case or job, prices or estimates, legal or technical advice, or
            anything that sounds like a promise.
          </li>
          <li>
            <strong>Must hand off:</strong> any question it isn&apos;t sure
            about, any upset caller and anyone who asks for a person.
          </li>
        </ul>
        <p>
          Our post on{" "}
          <Link href="/blog/what-should-your-business-ai-be-allowed-to-do">
            what your business AI should be allowed to do
          </Link>{" "}
          has a simple way to set those limits.
        </p>
        <p>
          This post is an owner&apos;s guide, not legal advice. For California
          law firms, we summarized the State Bar&apos;s guidance on
          supervising AI tools in{" "}
          <Link href="/blog/california-law-firm-ai-receptionist">
            Can a California Law Firm Use an AI Receptionist?
          </Link>{" "}
          Read the guidance itself and talk with your own ethics counsel.
        </p>

        <h2>Will the calls be recorded?</h2>
        <p>
          Many AI phone tools record or transcribe calls by default. California
          has its own rules about recording phone calls, and they can apply
          even when the business is the one calling. Check with your attorney
          before turning recording on, decide how callers are told, and decide
          who can see the recordings and transcripts and how long you keep
          them.
        </p>

        <h2>
          How should we test before AI calls a real client or customer?
        </h2>
        <p>
          Run a supervised test where the only people the AI calls are your
          own staff:
        </p>
        <ul>
          <li>
            Put three or four staff phone numbers on a test list.
          </li>
          <li>
            Have each person play a different caller: one who&apos;s happy,
            one who&apos;s confused, one who asks for a person, one who asks
            something the AI must not answer.
          </li>
          <li>
            Listen to every call, check what the AI said against your written
            rules, and fix anything that&apos;s off.
          </li>
          <li>
            Only then, try a short, approved list of real people, with a
            person reviewing every call afterward.
          </li>
        </ul>

        <h2>What&apos;s a safer first step than letting AI make calls?</h2>
        <p>
          For most Orange County offices, start one step back: let AI build
          the callback list, and let a person make or approve every call.
        </p>
        <ul>
          <li>
            AI answers after hours, logs who called and why, and drafts a
            callback list by morning. (See{" "}
            <Link href="/blog/law-firm-missed-calls">
              when a potential client calls your law firm after hours
            </Link>
            , or{" "}
            <Link href="/blog/after-hours-calls-contractors">
              what after-hours calls are worth to a plumbing or HVAC business
            </Link>
            .)
          </li>
          <li>
            A person reviews the list, decides who gets a call, and makes it,
            or approves an AI call for simple, low-risk ones like confirming
            an appointment.
          </li>
          <li>
            Status questions go into a regular update rhythm, as in our{" "}
            <Link href="/blog/law-firm-case-status-updates">
              case-status updates post
            </Link>
            , so fewer callbacks are needed at all.
          </li>
        </ul>
        <p>
          That way the AI does the sorting and drafting, and your people stay
          in charge of who hears from you.
        </p>

        <h2>Where StorenTech AI fits</h2>
        <p>
          When we build an AI Opportunity Map, we look at where calls come in,
          which ones get missed, which callbacks your team makes by hand, and
          where AI could help, including whether an outbound AI call makes
          sense yet or a person-approved callback list is the better first
          step.
        </p>
        <p>
          <Link href="/opportunity">Start your AI Opportunity Map</Link>
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
