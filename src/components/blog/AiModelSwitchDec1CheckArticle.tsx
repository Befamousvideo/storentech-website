import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function AiModelSwitchDec1CheckArticle({
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
            <strong>Short answer:</strong> On Dec. 1, 2026, one major AI
            provider will automatically move requests from two of its older
            models to newer ones, and bill them at the newer models&apos;
            rates. If a chatbot, phone assistant or automation your office uses
            was built on one of those models, it may start behaving differently
            that day without anyone touching it. You don&apos;t need the
            technical details. Ask your vendor or IT person three questions
            this week: which model does this use, does anything change on Dec.
            1, and who tests it before it changes.
          </p>
          <p>
            This is a smaller, quieter cousin of the model retirements we
            covered in October. Nothing switches off. The tool keeps answering.
            It may just answer a little differently, or cost a little
            differently, starting on a holiday-season Tuesday.
          </p>
        </div>

        <h2>What is actually changing on Dec. 1?</h2>
        <p>
          The provider announced on Nov. 2 that two older models are
          deprecated. Starting Dec. 1, any request sent to either of them will
          be routed to a newer model instead, automatically. The
          provider&apos;s own notice says the requests will be billed at the
          newer model&apos;s rates, and it lists several technical changes in
          how the newer models handle certain features.
        </p>
        <p>
          In plain English: if a developer built your tool on one of those
          older models and never updated it, the tool will keep running on Dec.
          1, but on a different model than the one it was built and tested on.
        </p>

        <h2>Why should a business owner care about an automatic switch?</h2>
        <p>
          Because &quot;it still works&quot; and &quot;it still works the way
          we tested it&quot; are not the same thing.
        </p>
        <p>
          Swapping an AI model is a bit like a new hire stepping into a role
          with the same job description. The work still gets done, but the
          habits are different. A newer model may:
        </p>
        <ul>
          <li>
            Word answers differently, or longer or shorter, than your team is
            used to.
          </li>
          <li>
            Follow your instructions a little differently, especially detailed
            ones about what not to say.
          </li>
          <li>
            Handle connected steps (looking something up, filling in a form,
            booking a time) differently. The provider specifically lists
            changes in this area.
          </li>
          <li>Cost a different amount per request.</li>
        </ul>
        <p>
          None of that is a reason to panic. It is a reason to know, before
          Dec. 1, whether any tool you rely on is affected. We wrote about the
          same pattern for phone agents in{" "}
          <Link href="/blog/ai-phone-agent-changed-overnight">
            Your AI Phone Agent May Have Changed Overnight
          </Link>
          .
        </p>

        <h2>Which tools in an office are most likely to be affected?</h2>
        <p>
          The tools most worth checking are the ones someone built or set up
          for you and then left alone:
        </p>
        <ul>
          <li>
            A website chat or intake assistant a freelancer or agency built.
          </li>
          <li>An AI phone assistant that answers after hours.</li>
          <li>
            An automation that summarizes documents, drafts replies or sorts
            incoming email.
          </li>
          <li>
            A custom report or quote tool that uses AI behind the scenes.
          </li>
        </ul>
        <p>
          Large software products usually update their models on their own
          schedule and test the change for you. Custom and one-time builds are
          where an automatic switch can slip through unnoticed, because the
          provider&apos;s notice went to whoever holds the developer account,
          and that may not be anyone at your office.
        </p>

        <h2>What three questions should I ask my vendor before Dec. 1?</h2>
        <p>Send a short note to each vendor or builder this week:</p>
        <ol>
          <li>
            <strong>
              &quot;Which AI model does this tool use for our account?&quot;
            </strong>{" "}
            A good vendor answers in a sentence. &quot;We use the best
            available model&quot; is not an answer.
          </li>
          <li>
            <strong>
              &quot;Does anything change for us on Dec. 1?&quot;
            </strong>{" "}
            If the answer is yes, ask whether they have already moved to the
            newer model on purpose, or are letting the automatic switch happen.
          </li>
          <li>
            <strong>
              &quot;Who tests it before it changes, and how?&quot;
            </strong>{" "}
            You want a name and a plan, not a promise.
          </li>
        </ol>
        <p>
          A vague or slow answer is useful information too. It tells you which
          tools nobody is watching.
        </p>
        <p>
          If you don&apos;t have a list of your AI tools yet, our{" "}
          <Link href="/blog/ai-tool-cleanup-checklist">
            AI tool cleanup checklist
          </Link>{" "}
          takes about 30 minutes and gives you one.
        </p>

        <h2>What should we test once the switch happens?</h2>
        <p>
          Whether the switch happens on purpose before Dec. 1 or automatically
          on the day, run a short check with real examples:
        </p>
        <ul>
          <li>
            <strong>Ask it your five most common questions.</strong> Compare
            the answers with what it said before. Look for anything it should
            not say.
          </li>
          <li>
            <strong>Run one full task end to end.</strong> A booking, an intake
            form, a drafted reply. Make sure each step still lands where it
            should.
          </li>
          <li>
            <strong>Check what goes out to customers.</strong> If anything is
            sent without a person reviewing it, now is a good time to add that
            review.
          </li>
          <li>
            <strong>Watch the bill for a few weeks.</strong> The
            provider&apos;s notice says billing moves to the newer model&apos;s
            rates. Our post on{" "}
            <Link href="/blog/ai-agent-cost-controls">
              keeping AI bills predictable
            </Link>{" "}
            covers simple budgets and caps.
          </li>
        </ul>

        <h2>How do we stop being surprised by model changes?</h2>
        <p>
          Model changes will keep coming, and the fix is the same habit we
          suggested before the{" "}
          <Link href="/blog/ai-model-retirement-nov-30-business-checklist">
            Nov. 30 model retirement
          </Link>
          :
        </p>
        <ul>
          <li>
            Keep one list of every AI tool and the model it runs on.
          </li>
          <li>
            Make sure provider notices go to someone who reads them.
          </li>
          <li>
            Give each custom tool an owner who checks it after every change.
          </li>
          <li>
            Keep a person approving anything that goes out to customers.
          </li>
        </ul>

        <h2>Where StorenTech AI fits</h2>
        <p>
          When we build an AI Opportunity Map for an Orange County business, we
          list the AI tools you already rely on, what each one runs on, and
          which ones need attention before a vendor deadline, along with where
          AI can save the most time next. If you aren&apos;t sure whether
          anything you use changes on Dec. 1, that list is a good place to
          start.
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
