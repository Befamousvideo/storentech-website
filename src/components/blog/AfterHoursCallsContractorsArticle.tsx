import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { BOOKING_CTA_HREF } from "@/lib/site";

export function AfterHoursCallsContractorsArticle({
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
            An after-hours call is often the most valuable call a contractor
            gets all week, because the person calling usually has a problem
            right now and will hire whoever answers first. To see what missed
            evening and weekend calls cost your business, multiply how many you
            miss by how many were real jobs, how many you&apos;d normally win
            and what a typical job is worth to you. Your own numbers are the
            only ones that matter.
          </p>
          <p>
            Most owners already sense the answer. The worksheet below just
            makes it concrete.
          </p>
          <p>
            <strong>
              A missed call at 9 p.m. isn&apos;t a message waiting for you in
              the morning. For many callers, it&apos;s a reason to call the
              next company.
            </strong>
          </p>
        </div>

        <h2>Why after-hours calls are different</h2>
        <p>
          A call that comes in at 10 a.m. on a Tuesday is often someone
          shopping around or planning ahead. A call at 8 p.m. on a Saturday is
          more likely to be a burst pipe, a dead water heater, an AC that quit
          during a heat wave or a leak coming through the ceiling.
        </p>
        <p>Those callers tend to:</p>
        <ul>
          <li>
            <strong>Need help today.</strong> They aren&apos;t comparing
            options next week.
          </li>
          <li>
            <strong>Call down a list.</strong> If nobody answers, they try the
            next number.
          </li>
          <li>
            <strong>Skip voicemail.</strong> Plenty of people hang up instead
            of leaving a message.
          </li>
          <li>
            <strong>Remember who picked up.</strong> The company that answered
            at night often gets the next job too.
          </li>
        </ul>
        <p>
          That&apos;s why the after-hours phone is worth looking at on its own
          instead of folding it into your overall call numbers.
        </p>

        <h2>A simple worksheet with your own numbers</h2>
        <p>
          Grab last month&apos;s phone records and fill in four blanks. Rough
          guesses are fine for a first pass.
        </p>
        <ul>
          <li>
            <strong>A. Missed after-hours calls per week.</strong> Evenings,
            weekends and holidays. Your phone system or carrier can usually
            show missed and unanswered calls by time of day.
          </li>
          <li>
            <strong>B. Share that were real job requests.</strong> Leave out
            spam, wrong numbers and existing customers checking on a visit.
          </li>
          <li>
            <strong>C. Share you&apos;d normally win</strong> when you do
            answer. Your own close rate on phone leads.
          </li>
          <li>
            <strong>D. What a typical job is worth to you.</strong> Use your
            average ticket for emergency or after-hours work.
          </li>
        </ul>
        <p>
          <strong>
            Weekly after-hours jobs you&apos;re missing = A × B × C.
          </strong>
        </p>
        <p>
          <strong>
            Weekly value you&apos;re missing = A × B × C × D.
          </strong>
        </p>
        <p>
          Multiply the weekly value by the number of weeks in a busy season, or
          by 52, to see the bigger picture.
        </p>

        <h2>A worked example (made-up numbers)</h2>
        <p>
          <em>
            This example uses invented numbers to show the math. It is not data
            from any real business.
          </em>
        </p>
        <p>
          Say an example plumbing company misses 6 after-hours calls a week
          (A). About half are real job requests (B = 1/2). When they answer,
          they usually win about half of those (C = 1/2).
        </p>
        <p>
          6 × 1/2 × 1/2 = <strong>1.5 jobs a week</strong> that went somewhere
          else.
        </p>
        <p>
          Over a year, that&apos;s 1.5 × 52 = <strong>78 jobs</strong>.
          Multiply by the example company&apos;s typical job value (D) and you
          have what those unanswered calls are worth.
        </p>
        <p>
          Your numbers will be different. A small shop might miss two calls a
          week; a busy HVAC company in July might miss twenty. That&apos;s why
          the worksheet matters more than any example.
        </p>

        <h2>What the number leaves out</h2>
        <p>The worksheet only counts the first job. It doesn&apos;t count:</p>
        <ul>
          <li>
            <strong>Repeat work.</strong> A customer you helped in an emergency
            often calls you first for maintenance and the next problem.
          </li>
          <li>
            <strong>Referrals.</strong> People tell neighbors who showed up
            when the water was on the floor.
          </li>
          <li>
            <strong>Reviews.</strong> Fast help at a bad moment is what people
            write about.
          </li>
          <li>
            <strong>Your team&apos;s evenings.</strong> If the owner or a tech
            is answering calls at dinner, that has a cost too.
          </li>
        </ul>
        <p>So treat your result as a floor, not a ceiling.</p>

        <h2>Ways to answer after-hours calls</h2>
        <p>
          Once you know what those calls are worth, you can decide what&apos;s
          worth doing about them. Common options include:
        </p>
        <ul>
          <li>
            <strong>An on-call rotation</strong> with a tech or the owner
            carrying the phone.
          </li>
          <li>
            <strong>An answering service</strong> that takes messages and
            passes urgent ones along.
          </li>
          <li>
            <strong>An AI phone agent</strong> that answers every call, asks
            your intake questions, books the job on your calendar and sends the
            urgent ones to your on-call person.
          </li>
        </ul>
        <p>
          Each has trade-offs in cost, coverage and how the caller experiences
          it. Whatever you choose, keep a person in charge of anything unusual,
          and check a few calls each week to make sure callers are getting the
          right answers. Security can stay simple: know who can see call
          recordings and customer details.
        </p>
        <p>
          <strong>
            StorenTech AI helps Orange County contractors answer after-hours
            calls with AI phone agents that ask your questions, follow your
            booking rules and hand urgent jobs to your team.
          </strong>
        </p>
        <p>
          You can see how that works for contractors on our{" "}
          <Link href="/contractors">contractors page</Link>.
        </p>

        <h2>Start with the number</h2>
        <p>
          You don&apos;t need to change anything until you know what&apos;s at
          stake. Fill in the worksheet with a month of real phone records, and
          the right next step usually becomes obvious.
        </p>
        <p>
          If you&apos;d like a second set of eyes,{" "}
          <a
            href={BOOKING_CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            book a 15-minute intro call
          </a>{" "}
          at no cost. We&apos;ll look at how calls reach you today and where jobs
          may
          be slipping to the next company. If there&apos;s a fit, the next step
          is an <Link href="/opportunity">AI Opportunity Map</Link> that shows
          which fixes pay back first.
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
