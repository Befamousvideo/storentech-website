import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const GEMINI_CHANGELOG_URL =
  "https://ai.google.dev/gemini-api/docs/changelog";

export function WeeklyReportDownloadRebuildArticle({
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
            If someone in your office spends Monday morning downloading files
            from two or three websites and rebuilding the same spreadsheet,
            start by asking whether the software you already pay for can
            export or share that data on its own. Many tools have a scheduled
            export, a saved report or a built-in connection nobody has turned
            on. Only if that fails does it make sense to test an AI tool that
            clicks through a portal the way a person would, with a person
            still approving anything that leaves the office.
          </p>
          <p>
            <strong>
              The best first question is not &quot;Can AI do this?&quot; It is
              &quot;Show me the report your manager rebuilds every week, and
              let&apos;s see whether your current software can simplify it
              first.&quot;
            </strong>
          </p>
        </div>

        <h2>What the weekly rebuild usually looks like</h2>
        <p>
          Most Orange County offices have one of these. At a law firm it might
          be a matter list pulled from practice-management software, plus
          deadlines from a court portal, plus billing from accounting. At a
          contractor or service business it might be jobs from scheduling
          software, payments from a processor and leads from a website form.
        </p>
        <p>The pattern is the same:</p>
        <ul>
          <li>Log in to each portal.</li>
          <li>Download a file, often a CSV or PDF.</li>
          <li>Copy columns into a master spreadsheet.</li>
          <li>Fix dates, names and totals that do not line up.</li>
          <li>Email or print the result for a Monday meeting.</li>
        </ul>
        <p>
          It can take a manager an hour or more each week, and it depends on
          one person remembering every step. When that person is out, the
          report is late or wrong.
        </p>

        <h2>Step one: ask your existing software first</h2>
        <p>
          Before anyone builds anything, check what your current tools already
          offer. Ask each vendor, or look in each tool&apos;s settings, for:
        </p>
        <ul>
          <li>
            Scheduled exports. Some tools can email a report or drop a file
            into a shared folder on a schedule.
          </li>
          <li>
            Saved reports or dashboards. The view you rebuild by hand may
            already exist inside the tool, just not set up.
          </li>
          <li>
            Built-in connections. Many business tools connect directly to
            accounting, calendars or spreadsheets.
          </li>
          <li>
            An official data connection for developers. If a vendor offers
            one, that is usually more reliable than anything that copies
            clicks.
          </li>
        </ul>
        <p>
          Write down what each vendor says. This step often removes half the
          work without any AI at all.
        </p>

        <h2>Step two: if a portal has no export, consider a supervised test</h2>
        <p>
          Some portals still offer nothing but a login page and a download
          button. That is where tools that operate a browser on a person&apos;s
          behalf come in.
        </p>
        <p>
          One sign that this kind of tool is maturing: on October 30, 2026,{" "}
          <a
            href={GEMINI_CHANGELOG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Gemini API changelog
          </a>{" "}
          announced it had &quot;Released the Computer Use tool to general
          availability (GA) across the Interactions and GenerateContent
          APIs.&quot; Computer Use is Google&apos;s name for a tool that lets
          an AI model operate a browser or desktop.
        </p>
        <p>
          General availability is Google&apos;s statement about its own
          product. It does not mean any particular portal will work with it.
          Sites change their layouts, add sign-in checks or block automated
          access. So treat it as a test, not a promise:
        </p>
        <ul>
          <li>
            Start with read-only access. The tool downloads; it does not
            submit, edit or pay.
          </li>
          <li>
            Use a login that belongs to the business, with only the
            permissions the task needs.
          </li>
          <li>
            Have a person compare the AI-built report to a hand-built one for
            a few weeks.
          </li>
          <li>
            Keep a person approving anything that gets sent outside the
            office.
          </li>
        </ul>
        <p>
          We wrote more about this kind of portal work in{" "}
          <Link href="/blog/ai-pull-reports-from-vendor-portals">
            Stop Losing Fridays to Portals
          </Link>.
        </p>

        <h2>Step three: decide what the report is actually for</h2>
        <p>
          Rebuilding a report by hand hides a useful question: does anyone use
          every column? Before automating, ask the people who read the report
          which three numbers they look at first. You may find that a shorter
          report is faster to automate and easier to trust.
        </p>
        <p>
          <strong>
            StorenTech AI helps Orange County businesses find the reports
            their teams rebuild every week, check what existing software can
            already do and test AI only where it clearly saves time, with a
            person still approving what goes out.
          </strong>
        </p>

        <h2>A five-minute check you can do this week</h2>
        <p>Pick the one report that takes the longest. Write down:</p>
        <ul>
          <li>Which websites or tools it pulls from</li>
          <li>How long it takes, honestly</li>
          <li>Who does it, and who covers when they are out</li>
          <li>Which numbers people actually use</li>
        </ul>
        <p>
          That list is enough to start a useful conversation with your
          vendors, your team or an outside helper.
        </p>

        <h2>Next step</h2>
        <p>
          If your office has a report like this, or several,{" "}
          <Link href="/opportunity">start with an AI Opportunity Map</Link>.
          It looks at the tools you already use, where work gets copied by
          hand and which fixes to try first.
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
