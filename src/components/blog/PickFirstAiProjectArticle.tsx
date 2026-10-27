import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function PickFirstAiProjectArticle({ post }: { post: BlogPost }) {
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
            The best first AI project is one specific, repetitive problem that
            wastes your team&apos;s time every week, has a clear right answer
            and is easy to check. Don&apos;t start by picking a tool. Start by
            picking the problem, decide how you&apos;ll know it worked, and
            keep a person reviewing the results until you trust them.
          </p>
          <p>
            Most AI projects that disappoint started the other way around:
            someone saw an impressive demo and went looking for a place to use
            it.
          </p>
          <p>
            <strong>
              Pick the problem first. The tool is the last decision, not the
              first.
            </strong>
          </p>
        </div>

        <h2>Why &quot;start with the tool&quot; goes wrong</h2>
        <p>
          It&apos;s easy to get excited about a new AI product. The demo looks
          great, a competitor mentions it, or a vendor promises it will handle
          everything.
        </p>
        <p>
          The trouble is that a tool without a clear job tends to drift. Nobody
          is sure what success looks like, the team uses it a little and then
          goes back to the old way, and a few months later it&apos;s another
          subscription nobody can explain.
        </p>
        <p>
          Starting with one problem flips that. You know exactly what the AI is
          supposed to do, who it helps and how you&apos;ll judge it.
        </p>

        <h2>What makes a good first problem</h2>
        <p>Look for work that checks most of these boxes:</p>
        <ul>
          <li>
            <strong>It happens often.</strong> Daily or weekly, not once a
            quarter.
          </li>
          <li>
            <strong>It follows a pattern.</strong> The same kinds of inputs and
            the same kinds of answers most of the time.
          </li>
          <li>
            <strong>It has a clear right answer.</strong> You&apos;d recognize a
            mistake when you saw one.
          </li>
          <li>
            <strong>It&apos;s easy to check.</strong> A person can review the
            result in a minute or two.
          </li>
          <li>
            <strong>A mistake is fixable.</strong> If the AI gets one wrong,
            it&apos;s an inconvenience, not a disaster.
          </li>
          <li>
            <strong>People already complain about it.</strong> That&apos;s
            usually a sign the time cost is real.
          </li>
        </ul>
        <p>
          Common examples for Orange County service businesses include sorting
          incoming requests, drafting replies to routine questions, pulling
          details out of forms or invoices into a spreadsheet, summarizing
          calls or notes, and preparing a weekly report from data you already
          have.
        </p>

        <h2>What to leave for later</h2>
        <p>
          Some work makes a poor first project, even if AI might help with it
          eventually:
        </p>
        <ul>
          <li>
            <strong>
              Decisions about money, hiring or saying no to a customer.
            </strong>{" "}
            Keep a person in charge.
          </li>
          <li>
            <strong>Anything rare or unusual.</strong> If it only comes up a few
            times a year, there isn&apos;t much to gain.
          </li>
          <li>
            <strong>Work with no clear right answer.</strong> If your own team
            disagrees on the result, AI will struggle too.
          </li>
          <li>
            <strong>Processes that are already a mess.</strong> AI tends to
            speed up whatever process it&apos;s given, including a broken one.
            Clean up the steps first.
          </li>
          <li>
            <strong>Projects that touch every system at once.</strong> Save the
            big connected projects for after you&apos;ve had a win.
          </li>
        </ul>

        <h2>A simple way to choose</h2>
        <p>
          Grab a notepad and spend thirty minutes on this with the people who
          do the work.
        </p>
        <ol>
          <li>
            <strong>List the repetitive tasks.</strong> Ask each person what
            they do every week that feels like copying, sorting, retyping or
            chasing.
          </li>
          <li>
            <strong>Estimate the time.</strong> Roughly how many hours a week
            does each one take across the team? A rough guess is fine.
          </li>
          <li>
            <strong>Rate the risk.</strong> For each task, ask: if it went
            wrong, how bad would it be? Low, medium or high.
          </li>
          <li>
            <strong>Circle the winner.</strong> Pick the task with the most
            time and the lowest risk.
          </li>
          <li>
            <strong>Define &quot;worked.&quot;</strong> Write one sentence, such
            as &quot;Requests get sorted by type before 9 a.m. and the team
            corrects fewer than a handful a week.&quot; Use your own numbers
            from your own business.
          </li>
        </ol>
        <p>
          Now you have a problem worth solving and a way to tell whether the
          solution is working.
        </p>

        <h2>Run it as a short trial</h2>
        <p>Treat the first project as an experiment, not a commitment:</p>
        <ul>
          <li>
            <strong>Keep it small.</strong> One task, one team, one inbox or
            form.
          </li>
          <li>
            <strong>Run it side by side.</strong> Let the AI work while your
            team keeps doing it the old way, and compare.
          </li>
          <li>
            <strong>Keep a person reviewing.</strong> Nothing goes to a customer
            without a check until you trust the results.
          </li>
          <li>
            <strong>Set a check-in date.</strong> Decide in advance when
            you&apos;ll look at the results and decide whether to keep going,
            adjust or stop.
          </li>
          <li>
            <strong>Make sure you own it.</strong> Whatever gets built should
            live in accounts your business controls.
          </li>
        </ul>
        <p>
          Security can stay simple at this stage: limit who has access, and
          know where your data goes.
        </p>
        <p>
          <strong>
            At StorenTech AI, we start every engagement by finding the one
            problem worth solving first, then we pick the tool that fits it.
          </strong>
        </p>

        <h2>Your first win makes the second one easier</h2>
        <p>
          Once one project works, your team trusts the process, you know what
          to measure, and the next project goes faster. That&apos;s how small
          businesses build up AI without betting the company on a single big
          purchase.
        </p>
        <p>
          If you&apos;d like help finding that first problem,{" "}
          <Link href="/opportunity">start your AI Opportunity Map</Link>. We
          look at how your team actually spends its week and point to the
          projects most likely to pay off, and the ones to leave for later.
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
