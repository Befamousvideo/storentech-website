import Link from "next/link";
import type { BlogFaq, BlogPost } from "@/lib/blog";

function FaqAnswer({ item }: { item: BlogFaq }) {
  if (item.question === "How much does it cost to run an AI agent?") {
    return (
      <p>
        It depends on the job, how often it runs, which model you use, and how
        many tools it calls. There is no honest flat number that fits every
        Orange County business. What you <em>can</em> do is set a budget, hard
        caps, and cost-per-workflow tracking so the bill doesn&apos;t surprise
        you. That&apos;s part of what a paid AI Opportunity Map is for.
      </p>
    );
  }

  if (item.question === "Who in Orange County can set up AI agents with cost controls?") {
    return (
      <p>
        <strong>StorenTech AI</strong>, a full-service AI agency in Orange
        County, CA, builds AI employees with budgets, hard caps, alerts, and
        human approval on anything that goes out. Every engagement starts with a
        paid AI Opportunity Map so you know which job to automate first—and how
        to keep the bill predictable.
      </p>
    );
  }

  return <p>{item.answer}</p>;
}

export function AiAgentCostControlsArticle({ post }: { post: BlogPost }) {
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
            An AI agent that answers leads at 2 a.m. sounds like a win. Until
            you open the bill and realize it also <em>spent</em> all night.
          </p>
          <p>
            That&apos;s the quiet risk for Orange County business owners who are
            new to automation. Agents don&apos;t punch a time clock. They use
            tokens, API calls, and cloud tools every time they read, draft, or
            look something up. Leave the limits loose, and a busy weekend or a
            chatty loop can turn into a surprise invoice.
          </p>
          <p>
            The good news: you can treat AI spend like any other operating cost.
            Set a budget. Cap what the agent can burn. Track cost per workflow.
            And start with a clear map of which jobs are worth automating in the
            first place.
          </p>
        </div>

        <h2>Why AI agent bills sneak up on you</h2>
        <p>
          Traditional software is usually a flat monthly fee. An AI agent is
          closer to a meter. Every message it reads, every draft it writes, and
          every tool it calls can add usage.
        </p>
        <p>A few everyday patterns drive cost up:</p>
        <ul>
          <li>
            <strong>The agent runs when nobody is watching.</strong> Overnight
            and weekends are fine—until a bad loop keeps retrying the same task.
          </li>
          <li>
            <strong>
              Busywork and hard judgment use the same expensive model.
            </strong>{" "}
            Sorting a form fill does not need the same firepower as drafting a
            sensitive customer reply.
          </li>
          <li>
            <strong>Nobody owns the meter.</strong> The team loves the time
            saved. Finance only sees a line item after the month ends.
          </li>
        </ul>
        <p>
          None of that means &quot;don&apos;t hire an AI employee.&quot; It
          means{" "}
          <strong>
            measure usage the way you&apos;d measure overtime or ad spend
          </strong>
          —before you scale.
        </p>

        <h2>Four controls that keep the bill predictable</h2>
        <p>
          You don&apos;t need a finance degree. You need a few hard rules wired
          into the setup.
        </p>

        <h3>1. A monthly budget you can actually see</h3>
        <p>
          Decide what you&apos;re willing to spend on AI usage for a given
          job—lead replies, invoice follow-ups, weekly summaries—and put that
          number where someone will look at it. Budgets are useless if they live
          only in a slide deck.
        </p>
        <p>
          During a StorenTech build, we treat usage budget as part of the
          design, not an afterthought. The agent gets a job. The job gets a
          spend envelope.
        </p>

        <h3>2. Hard caps (not just &quot;we&apos;ll watch it&quot;)</h3>
        <p>
          A soft alert is helpful. A <strong>hard cap</strong> is what stops
          the meter. When usage hits the limit you set, the agent stops or
          slows until a person decides what to do next.
        </p>
        <p>
          Think of it like a credit-card limit for that workflow. Alerts warn
          you. Caps protect you.
        </p>

        <h3>3. Alerts before you&apos;re underwater</h3>
        <p>
          Set warnings below the hard cap—early enough that someone can review
          what the agent is doing. A spike often means a loop, a bad prompt, or
          a job that should use a cheaper model for simple steps.
        </p>
        <p>
          Alerts should go to a person who can turn the workflow off, not into a
          shared inbox nobody opens.
        </p>

        <h3>4. Cost-per-workflow tracking</h3>
        <p>
          &quot;How much did AI cost us this month?&quot; is the wrong first
          question. Better:{" "}
          <strong>how much did this one workflow cost</strong>—per lead handled,
          per invoice chased, per weekly report?
        </p>
        <p>
          When you know cost per workflow, you can decide whether the job still
          makes sense, whether a cheaper model should do the prep work, or
          whether a human should keep doing it. That measured usage is also what
          we quote against in an AI Opportunity Map (our Automation ROI
          Analysis): we look at real paths through your business, not guesswork.
        </p>

        <h2>What &quot;measured usage&quot; looks like in practice</h2>
        <p>
          Imagine you automate website lead replies for a Newport Beach service
          business.
        </p>
        <p>
          <strong>Without controls:</strong> The agent reads every form fill,
          pulls history, drafts a reply, and maybe retries when something fails.
          Month-end is a shrug.
        </p>
        <p>
          <strong>With controls:</strong>
        </p>
        <ol>
          <li>The workflow has a monthly usage budget.</li>
          <li>A hard cap stops runaway spend.</li>
          <li>Alerts fire when usage climbs faster than usual.</li>
          <li>
            You can see roughly what each handled lead cost in AI usage—not just
            &quot;the AI bill.&quot;
          </li>
        </ol>
        <p>
          You still approve anything that goes out. The agent does the prep. The
          meter stays visible.
        </p>
        <p>
          For how that approval pattern works end to end, see{" "}
          <Link href="/blog/zapier-webhooks-ai-agents">
            Zapier + AI Agents, Explained for Business Owners
          </Link>{" "}
          and{" "}
          <Link href="/blog/ai-security-for-ai-employees">
            AI Security for AI Employees
          </Link>
          . For model choice and routing (simple jobs on cheaper models, harder
          jobs on stronger ones), see OpenRouter in Your AI Stack once that post
          is live.
        </p>

        <h2>What getting started looks like</h2>
        <p>You don&apos;t build the metering yourself. We do. Here&apos;s how it goes:</p>
        <ol>
          <li>
            <strong>
              We start with an AI Opportunity Map (our Automation ROI Analysis).
            </strong>{" "}
            We look at how work moves today, which apps you use, and where
            automation would actually pay for itself—including rough usage risk.
          </li>
          <li>
            <strong>Build Plan.</strong> We pick one job to start. Usually the
            one costing you the most time or money right now. Not five
            workflows at once.
          </li>
          <li>
            <strong>We set it up with budgets, caps, and alerts.</strong> The
            agent only gets the access that job needs. We test with sample data
            before anything goes live.
          </li>
          <li>
            <strong>Your team approves, and we tune.</strong> People approve
            drafts. We adjust tone, rules, and spend controls until it feels
            like your business.
          </li>
        </ol>
        <p>
          And if something ever looks off? A person can step in and pause it. We
          set that up with you during setup.
        </p>

        <h2>Where to start: the AI Opportunity Map</h2>
        <p>
          Every StorenTech client starts with a paid{" "}
          <strong>AI Opportunity Map</strong>. It typically costs{" "}
          <strong>$1,000</strong> (<strong>$2,000–$3,000</strong> when the
          scope is complex). It&apos;s never a free sales call. We map your
          real workflows, find where handoffs break, and rank which job should
          be automated first—with usage and cost controls in the conversation
          from the start. If the math doesn&apos;t work, we&apos;ll tell you.
        </p>
        <ul>
          <li>
            What the analysis covers:{" "}
            <Link href="/blog/what-is-an-automation-roi-analysis">
              What Is an AI Opportunity Map?
            </Link>
          </li>
          <li>
            The full path from analysis to launch:{" "}
            <Link href="/how-it-works">How it works</Link>
          </li>
          <li>
            How we handle access and approvals:{" "}
            <Link href="/blog/ai-security-for-ai-employees">
              AI Security for AI Employees
            </Link>
          </li>
          <li>
            Safety framing for agents:{" "}
            <Link href="/blog/nvidia-ai-agent-safety-explained">
              NVIDIA AI Agent Safety, Explained
            </Link>
          </li>
        </ul>
        <p>
          AI does the prep. People approve what goes out. The meter stays
          visible. That&apos;s the deal.
        </p>
        <div className="btn-row">
          <Link className="btn btn-solid" href="/contact">
            Start the paid analysis
          </Link>
        </div>

        <section className="blog-faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading">FAQ</h2>
          {post.faqs.map((item) => (
            <div className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <FaqAnswer item={item} />
            </div>
          ))}
        </section>

        <section className="blog-cta">
          <div className="btn-row">
            <Link className="btn btn-solid" href="/contact">
              Start the paid analysis
            </Link>
            <Link className="btn" href="/how-it-works">
              See how it works
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
