import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const ANTHROPIC_SKILLS_URL =
  "https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation";

export function OfficeProceduresAiInstructionsArticle({
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
            Most AI help fails in a real office because nobody wrote down how
            the office already does the task. If you write one clear procedure
            — who answers, what to ask, what to escalate and what needs a
            human before anything leaves the building — a person or an AI
            assistant can follow the same steps. That habit helps any Orange
            County business; a law-firm new-inquiry checklist is a concrete
            example you can adapt.
          </p>
          <p>
            On Oct 22, 2026, Anthropic announced it donated{" "}
            <a
              href={ANTHROPIC_SKILLS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agent Skills
            </a>{" "}
            — which Anthropic calls &quot;the open standard that gives AI
            agents specialized knowledge and workflows&quot; — to the Agentic
            AI Foundation under the Linux Foundation. Anthropic says more than
            70 agent platforms have integrated it. Those are Anthropic&apos;s
            company claims from that announcement; treat them as the vendor&apos;s
            description of its work, not as independent proof for your office.
          </p>
          <p>
            <strong>
              If the steps only live in one person&apos;s head, neither a new
              hire nor an AI assistant can follow them reliably.
            </strong>
          </p>
        </div>

        <h2>Why &quot;just use AI&quot; stalls</h2>
        <p>
          Owners often try a chatbot or phone agent on a messy process: mixed
          scripts, tribal knowledge and exceptions that only the office manager
          knows. The tool then guesses, invents a tone or skips a step you care
          about. The fix is not a smarter model first. The fix is writing the
          procedure the way you would train a careful new person during their
          first week.
        </p>
        <p>Good instructions answer:</p>
        <ul>
          <li>When this process starts (phone, web form, walk-in, email).</li>
          <li>What to collect, in order.</li>
          <li>What never to say or promise.</li>
          <li>When to stop and get a person.</li>
          <li>
            What needs human approval before it leaves the office (emails,
            filings, calendar invites with details, payments).
          </li>
        </ul>

        <h2>Example: new-inquiry checklist (law firm, adaptable)</h2>
        <p>
          Use this as a template. Swap the matter types for your trade if you
          are not a law firm.
        </p>
        <p>
          Title: New inquiry — phone or web form
          <br />
          Owner: Intake lead (name a person)
          <br />
          Goal: Capture enough to book the right consult; do not give legal
          advice.
        </p>
        <p>Steps</p>
        <ul>
          <li>Greet and confirm the caller can talk for a few minutes.</li>
          <li>
            Ask for full name, best phone, email and preferred callback window.
          </li>
          <li>
            Ask what the matter is about in their words; do not coach them
            toward a legal theory.
          </li>
          <li>Ask whether there is a deadline or court date they already know.</li>
          <li>Ask how they found the firm.</li>
          <li>
            If they ask for legal advice, say a lawyer will review and follow
            up; do not answer the legal question.
          </li>
          <li>
            Offer the next open consult slot that matches the matter type, or
            take a message for callback.
          </li>
          <li>Log the answers in the intake sheet the same day.</li>
          <li>
            Stop for a person if the caller is an existing client in crisis,
            mentions opposing counsel already retained elsewhere in a way that
            needs conflict checks, or asks to send documents immediately.
          </li>
          <li>
            Human approval before anything leaves: no automatic email with case
            details, no document upload to a new tool and no text to a third
            party until the intake lead or a lawyer says yes.
          </li>
        </ul>
        <p>
          A plumber, HVAC shop or other Orange County service business can
          reuse the same shape: greet, capture contact and job details, never
          promise a price you have not approved, escalate emergencies, and keep
          a human approving outbound messages.
        </p>

        <h2>How to write the procedure so a person or AI can follow it</h2>
        <ul>
          <li>One page if you can. Long manuals get ignored.</li>
          <li>Number the steps. Assistants and people both do better with order.</li>
          <li>
            Use your words. Write the greeting and the &quot;we cannot advise
            on this call&quot; line exactly.
          </li>
          <li>Name the exits. Every procedure needs &quot;stop and get a person&quot; rules.</li>
          <li>Separate draft from send. Anything that leaves the office waits for a human.</li>
          <li>Store it where the team looks. Shared drive folder, not a private notebook.</li>
        </ul>
        <p>
          When you later connect an AI assistant, you are handing it this
          document — not hoping it invents your culture.
        </p>

        <h2>Where open &quot;skills&quot; fit (high level)</h2>
        <p>
          Vendors are packaging reusable instruction bundles so agents can load
          specialized workflows. Anthropic&apos;s Agent Skills donation to the
          Agentic AI Foundation (under the Linux Foundation), announced Oct 22,
          2026, is one example of that direction; Anthropic describes Skills as
          an open standard for specialized knowledge and workflows and claims
          broad platform uptake. For an owner, the useful takeaway is simple:
          clear, portable instructions are becoming the way teams share how
          work should run. Your one-page procedure is the local version of that
          idea.
        </p>
        <p>
          <strong>
            StorenTech AI helps Orange County businesses turn real office
            procedures into instructions people and AI assistants can follow —
            with a human approving anything that leaves the office.
          </strong>
        </p>
        <p>
          Skip the behind-the-scenes of any one vendor stack. Focus on writing
          the work down once.
        </p>

        <h2>Next step</h2>
        <p>
          Pick one process this week — new inquiry, after-hours call or
          appointment confirmations — and write the ten-step version. If you
          want help choosing which process pays back first,{" "}
          <Link href="/opportunity">start with an AI Opportunity Map</Link>.
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
