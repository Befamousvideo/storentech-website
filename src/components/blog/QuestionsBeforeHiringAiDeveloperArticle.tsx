import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { BOOKING_CTA_HREF } from "@/lib/site";

export function QuestionsBeforeHiringAiDeveloperArticle({
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
            Before you hire anyone to build AI for your business, get clear
            answers to five questions: what exactly is included, what isn&apos;t,
            who owns the accounts and the work, what support covers after
            launch, and how you switch it off. A good AI developer will answer
            all five in plain English before you sign. If they can&apos;t, keep
            looking.
          </p>
          <p>
            These questions work whether you&apos;re hiring a freelancer, an
            agency or a local consultant.
          </p>
          <p>
            <strong>
              The best time to protect your business is before the work starts,
              not after something goes wrong.
            </strong>
          </p>
        </div>

        <h2>1. What exactly will you build, and how will we know it&apos;s done?</h2>
        <p>
          A vague promise like &quot;we&apos;ll automate your office&quot; is
          how projects drag on. Ask for a written scope that names:
        </p>
        <ul>
          <li>
            <strong>The specific jobs</strong> the AI will do, such as answering
            calls, sorting service requests or pulling numbers into a weekly
            report.
          </li>
          <li>
            <strong>The tools it connects to</strong>, like your email,
            calendar, phone system or spreadsheet.
          </li>
          <li>
            <strong>What &quot;done&quot; looks like</strong>, in a sentence you
            can check yourself, such as &quot;New web requests are sorted and
            assigned within an hour, and the office manager approves anything
            unusual.&quot;
          </li>
          <li>
            <strong>A test period</strong> where the AI runs alongside your
            team before it handles anything on its own.
          </li>
        </ul>
        <p>
          If you can&apos;t tell from the scope when the project is finished,
          neither can the developer.
        </p>

        <h2>2. What is not included?</h2>
        <p>
          This question gets skipped more than any other, and it causes most of
          the surprises later. Ask the developer to list what&apos;s out of
          scope, in writing. Common gray areas include:
        </p>
        <ul>
          <li>Connecting extra tools that come up halfway through.</li>
          <li>Cleaning up messy data before the AI can use it.</li>
          <li>Training additional staff or locations.</li>
          <li>
            Changes after launch, like new questions for a phone agent or a new
            report.
          </li>
          <li>
            Ongoing costs from the AI services themselves, which are often
            billed separately from the developer&apos;s work.
          </li>
        </ul>
        <p>
          You&apos;re not trying to catch anyone out. You&apos;re making sure
          you both picture the same project.
        </p>

        <h2>3. Will my business own the accounts, logins and work?</h2>
        <p>
          This is the one to insist on. <strong>You own your accounts.</strong>{" "}
          Every AI service, automation tool, phone number and data store used
          for your business should be set up in your company&apos;s name, with
          your company&apos;s email as the owner, and billed to you.
        </p>
        <p>Ask specifically:</p>
        <ul>
          <li>
            <strong>Whose name are the accounts in?</strong> Yours, not the
            developer&apos;s.
          </li>
          <li>
            <strong>Who has the admin login?</strong> You should, even if the
            developer also has access while they work.
          </li>
          <li>
            <strong>Where do the instructions, workflows and code live?</strong>{" "}
            In accounts you control, with a copy you can get at any time.
          </li>
          <li>
            <strong>What happens to access when the project ends?</strong> The
            developer&apos;s access should be easy to remove without breaking
            anything.
          </li>
        </ul>
        <p>
          If a developer builds everything inside their own accounts, you&apos;re
          renting your own system. Leaving later can mean starting over. Our{" "}
          <Link href="/blog/ai-tool-cleanup-checklist">
            AI tool cleanup checklist
          </Link>{" "}
          shows what it looks like when nobody&apos;s sure who owns what.
        </p>

        <h2>4. What does support cover after launch?</h2>
        <p>
          AI tools change. Models get updated, connected apps change their
          settings, and your business changes too. Ask:
        </p>
        <ul>
          <li>
            <strong>How long is support included,</strong> and what does it
            cover?
          </li>
          <li>
            <strong>How do I report a problem,</strong> and how fast will
            someone respond?
          </li>
          <li>
            <strong>Who watches for updates</strong> to the AI services the
            system depends on?
          </li>
          <li>
            <strong>Will someone review how it&apos;s working,</strong> such as
            a monthly check of results and mistakes?
          </li>
        </ul>
        <p>
          A clear answer here is a good sign the developer plans to stick
          around, or at least plans for you to manage without them.
        </p>

        <h2>5. How do I switch it off?</h2>
        <p>
          Every AI system should have a simple, documented way to pause it. Ask
          the developer to show you:
        </p>
        <ul>
          <li>
            <strong>How to stop it</strong> in one or two steps, without
            calling anyone.
          </li>
          <li>
            <strong>What happens when it&apos;s off,</strong> such as calls
            going back to your regular line or requests landing in a shared
            inbox.
          </li>
          <li>
            <strong>Which actions need a person&apos;s approval,</strong> like
            sending money, deleting records or saying no to a customer.
          </li>
        </ul>
        <p>
          You may never need the off switch. Knowing exactly where it is lets
          you say yes to AI with more confidence. Security can stay simple at
          this stage: limit who has access, and know where your data goes.
        </p>
        <p>
          <strong>
            StorenTech AI builds AI systems in accounts our Orange County
            clients own, with a written scope, a clear stopping point and a
            simple way to switch things off.
          </strong>
        </p>

        <h2>Put the answers in writing</h2>
        <p>
          Once you have answers to all five, ask for them in the proposal or
          agreement. Then compare developers on the answers, not just the demo.
          The developer who explains scope, ownership, support and the off
          switch clearly is usually the one who&apos;ll be easiest to work
          with.
        </p>
        <p>
          If you&apos;d like to talk it through,{" "}
          <a
            href={BOOKING_CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            book a 15-minute intro call
          </a>{" "}
          at no cost. Bring your questions, and we&apos;ll answer all five for
          your business. If there&apos;s a fit, the next step is an{" "}
          <Link href="/opportunity">AI Opportunity Map</Link> with a written
          plan for what to build first.
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
            <a
              className="btn btn-solid"
              href={BOOKING_CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a 15-minute intro call
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
