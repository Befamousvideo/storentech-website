import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const DECISIONS_GUIDE_URL =
  "https://developers.openai.com/api/docs/guides/decisions";

export function AiSortsLeadsServiceRequestsArticle({
  post,
}: {
  post: BlogPost;
}) {
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
      </header>

      <div className="wrap-narrow blog-prose">
        <div className="blog-lead">
          <p>
            AI can now read a new lead, email or service request and sort it
            almost instantly: what kind of job it is, how urgent it is, and who
            should handle it. Let AI do the sorting. Keep a person on the
            decisions that cost money, affect someone&apos;s job, health or
            credit, or involve an upset customer, and on anything the AI
            isn&apos;t sure about.
          </p>
          <p>
            That split gets you the speed without handing your judgment to
            software.
          </p>
          <p>
            <strong>
              AI should sort the pile. People should make the calls that
              matter.
            </strong>
          </p>
        </div>

        <h2>What changed this month</h2>
        <p>
          On Oct. 6, OpenAI released a tool for developers called the Decisions
          API, and on Oct. 22 it moved from test mode to general availability.
          It doesn&apos;t write emails or chat. It answers narrow questions
          about a piece of text or a photo and returns a short, structured
          answer.
        </p>
        <p>
          According to{" "}
          <a
            href={DECISIONS_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI&apos;s guide
          </a>
          , it can give three kinds of answers:
        </p>
        <ul>
          <li>
            <strong>A likelihood</strong>, such as how likely it is that a photo
            shows visible damage
          </li>
          <li>
            <strong>A pick from a fixed list</strong>, such as which department
            should handle a complaint
          </li>
          <li>
            <strong>A score on a scale you define</strong>, such as how severe
            an issue is
          </li>
        </ul>
        <p>
          OpenAI says the tool is built to be faster and lower-cost than its
          general chat-style option. Treat that as the company&apos;s claim;
          your own results will depend on your setup.
        </p>
        <p>
          You don&apos;t need to know any of the technical details. What matters
          is that sorting by AI is becoming quick and inexpensive enough for
          everyday small-business work.
        </p>

        <h2>What AI sorting looks like in a small business</h2>
        <p>Think about the messages that pile up before real work can start:</p>
        <ul>
          <li>
            <strong>Web leads.</strong> Is this a real buyer, a job seeker, a
            vendor pitch or spam? Is it in your service area?
          </li>
          <li>
            <strong>Service requests.</strong> Is it an emergency, a routine
            repair or a quote request? Which crew or person should get it?
          </li>
          <li>
            <strong>Emails to a shared inbox.</strong> Billing question,
            scheduling change, complaint or something else?
          </li>
          <li>
            <strong>Photos from customers.</strong> Does the picture show the
            problem they described?
          </li>
        </ul>
        <p>
          Today someone on your team reads each one, decides what it is and
          passes it along. AI can do that first read and put each item in the
          right line, so your people start with the work instead of the
          sorting.
        </p>
        <p>
          For an Orange County contractor, clinic or property manager, that can
          mean an urgent request reaches the right person while the routine
          ones wait their turn.
        </p>

        <h2>Where a person should still decide</h2>
        <p>Sorting is low-risk. Deciding is not. Keep a person in charge of:</p>
        <ul>
          <li>
            <strong>Anything that costs or refunds money.</strong> Discounts,
            refunds, credits and pricing exceptions.
          </li>
          <li>
            <strong>Anything that says no to someone.</strong> Turning down a
            customer, a claim or an applicant.
          </li>
          <li>
            <strong>Hiring, lending, medical and legal matters.</strong> These
            carry real consequences and rules. AI can route the paperwork; a
            qualified person makes the call.
          </li>
          <li>
            <strong>Upset customers.</strong> AI can flag the angry email. A
            person should answer it.
          </li>
          <li>
            <strong>Anything the AI isn&apos;t sure about.</strong> More on that
            below.
          </li>
        </ul>
        <p>
          A simple test: if a wrong answer would embarrass you, cost you a
          customer or create legal exposure, a person decides.
        </p>

        <h2>Set a &quot;not sure&quot; line</h2>
        <p>
          Good AI sorting doesn&apos;t just give an answer. It tells you how
          confident it is. OpenAI&apos;s own guide recommends using labeled
          examples from your business to set the confidence levels for routing
          or review, based on what a wrong answer would cost.
        </p>
        <p>In plain English:</p>
        <ol>
          <li>
            <strong>Pick a cutoff.</strong> Above it, the AI sorts the item on
            its own. Below it, a person looks first.
          </li>
          <li>
            <strong>Add an &quot;other&quot; bucket.</strong> OpenAI suggests a
            fallback option for anything that doesn&apos;t fit your categories,
            sent to a general review queue. That keeps odd requests from being
            forced into the wrong line.
          </li>
          <li>
            <strong>Watch the misses that are hard to see.</strong> The most
            costly mistake is the good lead that gets sorted as spam. Spot-check
            what the AI threw out, not just what it kept.
          </li>
        </ol>
        <p>
          Start strict. Send more items to a person in the first few weeks, then
          relax the cutoff as you see where the AI is reliable.
        </p>

        <h2>How to try it without risk</h2>
        <p>
          You don&apos;t need to automate everything at once. A careful first
          step looks like this:
        </p>
        <ol>
          <li>
            <strong>Pick one inbox or form.</strong> The one that eats the most
            time.
          </li>
          <li>
            <strong>Write down your categories.</strong> Use the ones your team
            already uses out loud.
          </li>
          <li>
            <strong>Run it side by side.</strong> Let the AI sort while your
            team keeps working the old way. Compare the two for a couple of
            weeks.
          </li>
          <li>
            <strong>Turn it on for the easy cases only.</strong> Keep people on
            everything below your &quot;not sure&quot; line.
          </li>
          <li>
            <strong>Check monthly.</strong> Look at what got sorted where, and
            fix categories that keep causing confusion.
          </li>
        </ol>
        <p>
          <strong>
            At StorenTech AI, we use AI to clear the sorting so your people can
            spend their time on the decisions only they should make.
          </strong>
        </p>
        <p>
          Keep the security side simple at first: decide who can see the
          messages the AI reads, and where that data goes. Ask whoever sets it
          up to explain both in plain English.
        </p>

        <h2>Find your best place to start</h2>
        <p>
          If you&apos;re not sure which inbox, form or request queue would
          benefit most,{" "}
          <Link href="/opportunity">start your AI Opportunity Map</Link>. We
          look at where your team&apos;s time actually goes and recommend where
          AI sorting would help, and where a person should stay in charge.
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
