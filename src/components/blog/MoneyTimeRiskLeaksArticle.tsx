import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function MoneyTimeRiskLeaksArticle({ post }: { post: BlogPost }) {
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
            A leak is any spot where your business quietly loses something it
            should keep. There are three kinds. <strong>Money leaks</strong>{" "}
            are revenue that walks out the door, like a missed call or a quote
            nobody followed up on. <strong>Time leaks</strong> are staff hours
            lost to busywork. <strong>Risk leaks</strong> are gaps that
            haven&apos;t cost you yet but could, like an ex-employee&apos;s
            login that still works. Most owners can feel all three but
            can&apos;t point to them until someone maps them.
          </p>
          <p>The good news: most leaks are ordinary, fixable problems.</p>
        </div>

        <h2>What is a money leak?</h2>
        <p>
          A money leak is revenue you should have earned but didn&apos;t. The
          customer was ready. The business just didn&apos;t catch them.
        </p>
        <p>
          Money leaks rarely look like losses. Nobody writes down the caller
          who hung up, or the estimate that sat in an inbox until the
          homeowner hired someone else.
        </p>
        <p>
          <strong>Common spots:</strong> missed and after-hours calls, slow
          replies to web inquiries, quotes with no follow-up, and work that
          gets done but never billed.
        </p>
        <p>
          <strong>An Orange County example.</strong> Picture a family law firm
          in Irvine that gets a call at 7 p.m. from someone who needs help
          before a deadline. Voicemail picks up, and the caller dials the next
          firm on the list. The firm never knows the call happened. (More on
          this in{" "}
          <Link href="/blog/law-firm-missed-calls">
            what happens when a potential client calls your law firm after hours
          </Link>
          .)
        </p>

        <h2>What is a time leak?</h2>
        <p>
          A time leak is staff time spent on busywork that a simpler process or
          a well-built tool could handle. The work gets done, but it eats the
          day.
        </p>
        <p>
          Time leaks are the &quot;we&apos;ve always done it this way&quot;
          tasks. Each one feels small. Together they push real work, like
          calling customers back or finishing jobs, to the end of the day or
          the next morning.
        </p>
        <p>
          <strong>Common spots:</strong> retyping the same details into two or
          three systems, chasing status updates by phone and text, rebuilding
          the same weekly report by hand, and sorting a crowded inbox.
        </p>
        <p>
          <strong>An Orange County example.</strong> Say a roofing contractor
          in Anaheim has an office manager who spends Monday mornings pulling
          numbers out of several portals and pasting them into a spreadsheet
          for the owner. It&apos;s accurate, careful work. It&apos;s also the
          same work every week, and it keeps her off the phone while new jobs
          are calling in. (See{" "}
          <Link href="/blog/weekly-report-download-rebuild">
            the weekly report your office still downloads and rebuilds by hand
          </Link>
          .)
        </p>

        <h2>What is a risk leak?</h2>
        <p>
          A risk leak is exposure that can cost the business later. Nothing
          looks broken today, which is exactly why it&apos;s easy to miss.
        </p>
        <p>
          Risk leaks don&apos;t show up on a monthly report. They show up all
          at once, on a bad day: a former employee still has access, a key
          person is out sick and nobody else knows the process, or customer
          information turns up somewhere it shouldn&apos;t be.
        </p>
        <p>
          <strong>Common spots:</strong> customer data sitting in a tool nobody
          controls, ex-employee logins still active, work that depends on one
          person, and AI tools that someone signed up for and nobody checks.
        </p>
        <p>
          <strong>An Orange County example.</strong> Imagine a small law firm
          in Newport Beach where a paralegal sets up a free online tool to
          organize intake notes, then later leaves the firm. The account is
          still in her name, it still holds client details, and nobody at the
          firm can log in to it. Nothing has gone wrong yet. That&apos;s the
          leak. (Our{" "}
          <Link href="/blog/ai-tool-cleanup-checklist">
            AI tool cleanup checklist
          </Link>{" "}
          walks through finding these.)
        </p>

        <h2>Why do leaks stay hidden?</h2>
        <p>
          Mostly because each one is small and everyone is busy. Nobody owns
          the missed call, so nobody tracks it. The workaround starts to feel
          like part of the job. And an old login doesn&apos;t send a bill.
        </p>

        <h2>How do you find the leaks in your business?</h2>
        <p>
          You can start on your own this week. Sit down with the people who do
          the work and ask three questions:
        </p>
        <ol>
          <li>
            <strong>Money:</strong> Where do customers fall through? Think
            calls, inquiries, quotes and invoices.
          </li>
          <li>
            <strong>Time:</strong> What do we do every week that feels like
            copying, sorting, retyping or chasing?
          </li>
          <li>
            <strong>Risk:</strong> If one person left tomorrow, or one tool
            shut off, what would break? Who still has access who shouldn&apos;t?
          </li>
        </ol>
        <p>Write down what you hear. A plain list is enough.</p>

        <h2>Which leak should you fix first?</h2>
        <p>
          Not every leak deserves a fix right away. A good first fix is one
          that happens often, is easy to check and is low risk if something
          goes wrong. Many businesses start with the phone and the inbox,
          because that&apos;s where money and time leaks tend to overlap.
        </p>
        <p>
          Risk leaks are different. Some are quick to close, like turning off
          old logins, and are worth doing right away even if they don&apos;t
          pay anything back. Others, like work that depends on one person,
          take longer and belong on the plan.
        </p>
        <p>
          Keep a person in charge of anything that touches customers, money or
          judgment calls. AI can take the grind; people stay in the loop.
        </p>

        <h2>How does StorenTech AI find leaks?</h2>
        <p>
          StorenTech AI builds an{" "}
          <Link href="/opportunity">AI Opportunity Map</Link>: a deep-dive
          report on how your business actually runs. We talk with
          your team, look at how calls, inquiries and daily work move through
          the business, and show where money, time and risk are leaking. Then
          we rank which fixes to make first, and the Build Plan covers how to
          fix them. The report is yours to keep.
        </p>
        <p>
          If you&apos;d like a clear view of your own leaks,{" "}
          <Link href="/opportunity">start your AI Opportunity Map</Link>.
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
