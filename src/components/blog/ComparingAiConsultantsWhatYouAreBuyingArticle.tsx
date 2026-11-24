import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function ComparingAiConsultantsWhatYouAreBuyingArticle({
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
        {hero ? (
          <figure className="blog-hero-media">
            <picture>
              <source srcSet={hero.avif} type="image/avif" />
              <source srcSet={hero.webp} type="image/webp" />
              <img
                src={hero.webp}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                fetchPriority="high"
              />
            </picture>
          </figure>
        ) : null}
      </header>

      <div className="wrap-narrow blog-prose">
        <div className="blog-lead">
          <p>
            <strong>Short answer:</strong> When an owner lines up AI proposals
            side by side, they are often comparing three different things: a
            questionnaire-style audit that ends in a report, a working pilot
            that puts AI on one real task, or an ongoing monthly service. None
            is wrong. They just produce different results. Before comparing
            them, ask five plain questions: what will exist at the end, who
            owns the accounts and the work, which of your current tools get
            used first, who approves anything that goes out, and what happens
            if you stop.
          </p>
          <p>
            If two proposals look hard to compare, it is usually because they
            are not selling the same thing.
          </p>
        </div>

        <h2>What are the three kinds of AI help a small business gets offered?</h2>
        <p>
          Most proposals an Orange County owner sees fall into one of three
          buckets, even when they use different names:
        </p>
        <ul>
          <li>
            <strong>A checklist or audit.</strong> Someone interviews you or
            sends a questionnaire, then delivers a report of ideas. Useful for
            getting a lay of the land. At the end you have a document, not a
            working tool.
          </li>
          <li>
            <strong>A working pilot.</strong> Someone puts AI on one real task
            in your business, such as answering after-hours calls, drafting
            status updates or sorting incoming requests, and you watch it work
            on real examples. At the end you have one thing running, and
            evidence about whether it helps.
          </li>
          <li>
            <strong>A monthly service.</strong> Someone runs and adjusts AI
            tools for you on an ongoing basis. At the end of each month you
            have whatever was run, maintained and reported.
          </li>
        </ul>
        <p>
          A proposal can combine these. That&apos;s fine, as long as you can
          tell which part is which.
        </p>

        <h2>Why do AI proposals look so hard to compare?</h2>
        <p>
          Because the words overlap. &quot;Assessment,&quot;
          &quot;strategy,&quot; &quot;roadmap,&quot; &quot;discovery,&quot;
          &quot;implementation&quot; and &quot;partnership&quot; can each mean
          a report, a pilot or a retainer depending on who writes them. One
          proposal&apos;s &quot;audit&quot; is another&apos;s
          &quot;pilot.&quot;
        </p>
        <p>
          The fix is not to learn the jargon. It is to ask what you will be
          holding at the end.
        </p>

        <h2>Question 1: What will exist at the end?</h2>
        <p>
          Ask for a plain list: &quot;When this is done, what will we have
          that we don&apos;t have today?&quot;
        </p>
        <ul>
          <li>A report or slide deck?</li>
          <li>A working tool, on one task, that our staff has used?</li>
          <li>A monthly summary of what was run?</li>
        </ul>
        <p>
          If the answer is mostly nouns like &quot;insights&quot; and
          &quot;alignment,&quot; ask again.
        </p>

        <h2>Question 2: Who owns the accounts and the work?</h2>
        <p>
          This matters most for pilots and monthly services. Ask whether the
          AI accounts, logins, phone numbers, automations and any code are set
          up in your business&apos;s name or in the provider&apos;s. We
          covered this in more depth in{" "}
          <Link href="/blog/questions-before-hiring-ai-developer">
            5 Questions to Ask Before Hiring an AI Developer
          </Link>. The short version: if you can&apos;t take it with you, you
          are renting it.
        </p>

        <h2>Question 3: Which of our current tools get used first?</h2>
        <p>
          A good proposal starts with what you already pay for. Many offices
          already have AI features inside their phone system,
          practice-management or job-management software, email or office
          suite that nobody has turned on.
        </p>
        <p>
          Ask: &quot;Which of our existing tools will you look at before
          suggesting anything new?&quot; A proposal that leads with a new
          platform before looking at your current ones is worth a second look.
        </p>

        <h2>Question 4: Who approves anything that goes out?</h2>
        <p>
          Whatever the AI drafts, answers or sends, someone at your office
          should be able to review it, at least at the start. Ask:
        </p>
        <ul>
          <li>
            What can the AI do on its own, and what needs a person&apos;s OK?
          </li>
          <li>How do we change those rules later?</li>
        </ul>
        <p>
          Our post on{" "}
          <Link href="/blog/what-should-your-business-ai-be-allowed-to-do">
            what your business AI should be allowed to do
          </Link>{" "}
          walks through setting those limits.
        </p>

        <h2>Question 5: What happens if we stop?</h2>
        <p>
          Ask what you keep, what gets switched off and how long the handoff
          takes. A clear answer here tells you a lot about the rest of the
          proposal. Every AI system should also have a simple off switch you
          control.
        </p>

        <h2>Which one is right for my business?</h2>
        <p>It depends on what you already know.</p>
        <ul>
          <li>
            If you don&apos;t yet know where AI would help, a report alone may
            still leave you guessing. Look for something that ranks a few
            options against your real work and tells you what to try first.
          </li>
          <li>
            If you already know your biggest operational bottlenecks, a pilot
            on one of them gives you evidence faster than another report. Our
            guide to{" "}
            <Link href="/blog/pick-first-ai-project">
              picking a first AI project
            </Link>{" "}
            helps you choose the task.
          </li>
          <li>
            If a pilot has already worked, a monthly service can make sense,
            with clear reporting and an exit plan.
          </li>
        </ul>

        <h2>Where the AI Opportunity Map fits</h2>
        <p>
          StorenTech AI&apos;s AI Opportunity Map sits between a checklist and
          a pilot. It is paid work built for one Orange County business, from
          your real numbers: where time or revenue leaks today, which AI moves
          are likely to pay back first, the AI tools you already use, and what
          should stay with your people. It ends with a ranked roadmap and a
          clear go or no-go. Read{" "}
          <Link href="/blog/what-is-an-automation-roi-analysis">
            what an AI Opportunity Map is
          </Link>, or see the details and pricing on the Opportunity page.
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
