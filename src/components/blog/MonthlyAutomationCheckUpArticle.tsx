import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function MonthlyAutomationCheckUpArticle({ post }: { post: BlogPost }) {
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
            You can&apos;t tell whether an automation is working just because
            it&apos;s turned on; you find out by checking whether it actually
            finished the jobs it was built to do. Once a month, spend 10
            minutes on four questions: did it do the job, what failed,
            what&apos;s waiting on a person, and could you get it back if it
            broke?
          </p>
          <p>
            Most automations don&apos;t crash loudly. They quietly stop doing
            the job, and nobody notices until a customer does. This check-up
            catches that early.
          </p>
          <p>
            <strong>
              &quot;It&apos;s running&quot; isn&apos;t the same as
              &quot;it&apos;s working.&quot; Count the jobs it finished, not
              the hours it was on.
            </strong>
          </p>
        </div>

        <h2>Why automations fail quietly</h2>
        <p>
          When an automation breaks, there&apos;s rarely an alarm. A web form
          changes and leads stop flowing into your CRM. A password expires and
          the weekly report stops sending. A software update changes a field
          name and invoices go out missing a line.
        </p>
        <p>
          The automation may still show as &quot;on.&quot; It just isn&apos;t
          doing anything useful. Weeks can pass before someone asks,
          &quot;Didn&apos;t we used to get those reports?&quot;
        </p>
        <p>
          For Orange County businesses without a full-time tech person, this
          is the most common way automation lets you down. The fix isn&apos;t
          more technology. It&apos;s a short, regular habit.
        </p>

        <h2>Before you start: make a short list</h2>
        <p>
          Write down every automation that touches leads, customers, reports
          or money. For each one, note in one line what &quot;done&quot; looks
          like:
        </p>
        <ul>
          <li>&quot;Every website lead gets a text within five minutes.&quot;</li>
          <li>&quot;The sales report lands in my inbox every Monday.&quot;</li>
          <li>
            &quot;Every paid invoice is marked paid in the accounting
            software.&quot;
          </li>
        </ul>
        <p>That line is your yardstick. You&apos;ll use it every month.</p>

        <h2>Step 1: Did it do the job? (3 minutes)</h2>
        <p>
          Pick a few real examples from the last month and check the result,
          not the settings.
        </p>
        <ul>
          <li>Take three recent website leads. Did each get the follow-up?</li>
          <li>
            Open the last four weekly reports. Did they all arrive, with real
            numbers?
          </li>
          <li>Pick a few paid invoices. Are they marked paid?</li>
        </ul>
        <p>
          If you can count it, count it. &quot;We got 40 leads and 40
          follow-ups went out&quot; tells you more than any dashboard light.
        </p>

        <h2>Step 2: What failed or got stuck? (2 minutes)</h2>
        <p>
          Most automation tools keep a list of runs that didn&apos;t finish,
          often called errors, failed runs or history. Ask whoever set it up
          to show you where that list lives, then glance at it each month.
        </p>
        <p>
          You&apos;re not trying to fix anything yourself. You&apos;re looking
          for patterns: the same step failing again and again, or a sudden
          jump in failures after a certain date.
        </p>
        <p>
          Software updates are a common cause. A real example: on Oct. 9, the
          automation tool n8n released updates (versions 2.42.6 and 2.43.3)
          that block creating or updating workflows that contain outdated
          steps, which n8n calls deprecated nodes. That means an older
          workflow can stop saving after an upgrade. If you see trouble right
          after an update, ask whoever runs your automations to check the
          tool&apos;s release notes first.
        </p>

        <h2>Step 3: What&apos;s waiting on a person? (2 minutes)</h2>
        <p>
          Good automations hand some decisions to a person: a refund to
          approve, a quote to review, a message to check before it goes out.
          Those handoffs only work if someone picks them up.
        </p>
        <p>
          Check the approval queue or inbox. Anything older than a few days
          means a customer may be waiting, or the automation has been stalled
          behind a decision nobody saw.
        </p>

        <h2>Step 4: Could you get it back? (2 minutes)</h2>
        <p>
          Ask one question: if this automation broke tomorrow, or the person
          who built it left, could you get it running again?
        </p>
        <p>
          You should know who built it, where the logins are kept safely, and
          when someone last confirmed it could be restored. If nobody knows,
          that&apos;s worth fixing before something breaks.
        </p>

        <h2>Step 5: Write down one thing (1 minute)</h2>
        <p>
          End with a single note for each automation: working, needs a look,
          or turn it off. Turning one off is fine. An automation nobody needs
          anymore is one more thing that can break.
        </p>
        <p>
          Keep the notes month to month. After a few months you&apos;ll see
          which automations are reliable and which ones keep needing
          attention.
        </p>

        <h2>When to call for help</h2>
        <p>Bring in help when:</p>
        <ul>
          <li>The same failure shows up two months in a row</li>
          <li>Leads, invoices or customer messages are going missing</li>
          <li>
            Nobody knows how an important automation works or who built it
          </li>
          <li>Things are piling up in the approval queue</li>
        </ul>
        <p>
          <strong>
            At StorenTech AI, we judge an automation by the work it finished
            for your business, not by whether the light is green.
          </strong>
        </p>

        <h2>Start with a map</h2>
        <p>
          If you&apos;d like a clear picture of which automations are pulling
          their weight, and where new ones would pay,{" "}
          <Link href="/opportunity">start your AI Opportunity Map</Link>. We
          look at where your time and money actually go and recommend what to
          fix, keep or build next.
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
