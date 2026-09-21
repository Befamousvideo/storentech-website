import Link from "next/link";
import { IntakeLink } from "@/components/IntakeLink";
import { site } from "@/lib/site";
import type { BlogPost } from "@/lib/blog";

function CallSarah({ className }: { className?: string }) {
  return <span className={className}>Call Sarah</span>;
}

export function AutomationRoiAnalysisArticle({ post }: { post: BlogPost }) {
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
            <strong>StorenTech AI</strong> is a full-service AI agency. We start
            every client with an <strong>Automation ROI Analysis</strong> — a
            paid engagement that maps your workflows, quantifies time and revenue
            leaks with your real numbers, and ranks which AI employee to hire
            first. It typically costs <strong>$1,000</strong> (
            <strong>$2,000–$3,000</strong> when complex). It is not a
            complimentary sales call.
          </p>
          <p>
            That’s the whole pitch, stripped of the free-audit theater. Hire an
            AI employee <strong>after the math, not before.</strong>
          </p>
        </div>

        <h2>What “the math” actually means</h2>
        <p>
          Most “AI audits” show you a demo and ask for a retainer. An Automation
          ROI Analysis starts the other way: with the numbers you already run
          the business on.
        </p>
        <p>We work from inputs you can verify — not vibes:</p>
        <ul>
          <li>
            <strong>Labor hours</strong> — who answers the phone, inbox, and
            booking queue, and for how long
          </li>
          <li>
            <strong>Conversation volume</strong> — calls, texts, web chats, form
            fills that need a human reply
          </li>
          <li>
            <strong>Response time</strong> — minutes to first touch when a lead
            is hot vs when the desk is buried
          </li>
          <li>
            <strong>Conversion / close rate</strong> — what happens after the
            first conversation reaches a human
          </li>
          <li>
            <strong>After-hours leakage</strong> — nights, weekends, lunch; the
            leads that never get a callback
          </li>
          <li>
            <strong>Error / rework</strong> — double-books, wrong CRM fields,
            missed follow-ups that create cleanup work
          </li>
        </ul>
        <p>
          If you won’t share those numbers, we can’t do the analysis. If you
          will, we can tell you whether an AI hire is worth it — and where.
        </p>
        <p>
          See how this sits in the commercial path on{" "}
          <Link href="/how-it-works">How it works</Link>.
        </p>

        <h2>What you get from the analysis</h2>
        <p>
          You don’t get a slide deck of industry averages. You get a
          decision-grade map built on <em>your</em> stack and <em>your</em>{" "}
          volumes:
        </p>
        <ol>
          <li>
            <strong>A ranked roadmap</strong> — which workflows leak the most
            money or time first
          </li>
          <li>
            <strong>Which named AI employee to hire first</strong> — usually a
            voice + chat role (speed-to-lead, booking, CRM), not a generic
            “chatbot”
          </li>
          <li>
            <strong>What that hire should earn</strong> — framed against the
            hours, response time, and after-hours leakage you brought in
          </li>
          <li>
            <strong>A clear go / no-go</strong> — if the math doesn’t hold, we
            say so
          </li>
        </ol>
        <p>
          The analysis is the map. The hire comes after. Browse the job catalog
          on <Link href="/work">Work</Link> so you know what “named employee”
          means in our language.
        </p>

        <h2>Typical vs complex pricing</h2>
        <div className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>
                <th>Scope</th>
                <th>Fee</th>
                <th>When it applies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Typical Automation ROI Analysis</strong>
                </td>
                <td>
                  <strong>$1,000</strong>
                </td>
                <td>
                  Single location or focused front-of-house: phone, inbox,
                  booking, CRM handoff
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Complex Automation ROI Analysis</strong>
                </td>
                <td>
                  <strong>$2,000–$3,000</strong>
                </td>
                <td>
                  Multi-location, messy tech stack, wider than front-of-house, or
                  several departments in scope
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          It is <strong>never complimentary</strong>. A free “AI audit” is a
          sales call with a checklist. You pay for a map you can act on — or
          walk away from.
        </p>

        <h2>What happens after the analysis</h2>
        <p>If the math holds:</p>
        <ol>
          <li>
            <strong>First named AI employee in 30 days</strong> — usually voice
            + chat covering speed-to-lead, booking, and CRM updates
          </li>
          <li>
            <strong>Then a retainer</strong>, so the hire stays staffed and
            accountable:
            <ul>
              <li>
                <strong>AI Employee — $5,000/mo</strong> — one bot, one workflow
                per month, reporting
              </li>
              <li>
                <strong>Growth — $7,500/mo</strong> — two bots, outbound + inbox,
                weekly command center
              </li>
            </ul>
          </li>
        </ol>
        <p>
          If the numbers don’t work, you keep the map and we don’t force a hire.
          That’s the point of paying for the analysis first.
        </p>
        <p>
          Full sequence: <Link href="/how-it-works">How it works</Link>. Firm
          context: <Link href="/about">About</Link>.
        </p>

        <h2>Who this is for</h2>
        <p>Operators who have:</p>
        <ul>
          <li>
            <strong>Conversation volume</strong> that actually moves revenue
          </li>
          <li>
            <strong>A calendar that matters</strong> — bookings, consults,
            estimates, intakes
          </li>
          <li>
            <strong>Willingness to share real numbers</strong> — hours, response
            times, close rates, after-hours miss
          </li>
        </ul>
        <p>
          Verticals we already speak to (examples, not a closed list): dental
          and med spa, insurance, residential contractors, wealth and mortgage,
          professional services, home services.
        </p>
        <p>
          If you’re shopping free AI audits because the pitch sounded easy, this
          isn’t that. If you want a go/no-go before you put an AI employee on
          payroll, it is.
        </p>
        <p>
          Home positioning: <Link href="/">Hire after the math</Link>.
        </p>

        <h2>How to start</h2>
        <p>Two clean paths:</p>
        <ol>
          <li>
            <strong>Hear the work live</strong> — call <strong>Sarah</strong>{" "}
            (voice demo): <CallSarah />
          </li>
          <li>
            <IntakeLink>
              <strong>Start the paid analysis</strong>
            </IntakeLink>
          </li>
        </ol>
        <p>
          Newport Beach / Corona Del Mar. {site.founder.name}, {site.name}.{" "}
          <Link href="/contact">Contact</Link>.
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

        <section className="blog-cta" aria-labelledby="ready-heading">
          <h2 id="ready-heading">Ready when you are</h2>
          <div className="btn-row">
            <IntakeLink className="btn btn-solid">
              Start the paid analysis
            </IntakeLink>
            <CallSarah className="btn" />
            <Link className="btn" href="/how-it-works">
              How it works
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
