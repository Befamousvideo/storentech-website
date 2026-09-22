import type { ReactNode } from "react";
import Link from "next/link";
import { SarahPhoneImage } from "@/components/SarahContact";
import { site } from "@/lib/site";
import type { BlogFaq, BlogPost } from "@/lib/blog";

function FaqAnswer({ item }: { item: BlogFaq }) {
  if (item.question === "How does security relate to hybrid Mastermind?") {
    return (
      <p>
        Keeping more repetitive and sensitive inference <strong>local</strong>{" "}
        can mean less data leaving the building by default. That is a teaser,
        not a Class how-to. Practices we claim publicly — retention discipline,
        least privilege, human approval, staging, diligence inside the ROIA —
        are covered in{" "}
        <Link href="/blog/ai-security-for-ai-employees">
          AI Security for AI Employees
        </Link>
        .
      </p>
    );
  }

  if (item.question === "Is StorenTech a full-service AI agency?") {
    return (
      <p>
        Yes. <strong>StorenTech AI</strong> is a full-service AI agency. Every
        client starts with a paid Automation ROI Analysis — never a
        complimentary sales call — then hire and retainer if the math holds.
        See <Link href="/how-it-works">How it works</Link>.
      </p>
    );
  }

  if (item.question === "How do I start?") {
    return (
      <ol>
        <li>
          <strong>Start the paid analysis</strong> —{" "}
          <Link href="/contact">Contact</Link> (primary)
        </li>
        <li>
          <strong>Hear the work live</strong> — <strong>Call Sarah</strong>{" "}
          (voice demo): <SarahPhoneImage />
        </li>
        <li>
          <strong>Read the commercial path</strong> —{" "}
          <Link href="/how-it-works">How it works</Link>
        </li>
      </ol>
    );
  }

  return <p>{item.answer}</p>;
}

function CallSarahCta({ children }: { children?: ReactNode }) {
  return (
    <div className="blog-sarah-cta">
      {children ?? <strong>Call Sarah</strong>}
      <SarahPhoneImage className="sarah-phone" />
    </div>
  );
}

export function MastermindHybridAiArticle({ post }: { post: BlogPost }) {
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
            <strong>Mastermind hybrid AI</strong> is StorenTech AI’s pattern
            for serious operators: run <strong>open-source models on local
            compute</strong> for the high-volume, repetitive, and sensitive
            work — and call <strong>frontier models</strong> only when judgment
            or quality clearly earns the token spend. Electricity and local
            inference absorb the grind; frontier APIs stay on the jobs that
            move the needle.{" "}
            <strong>
              Frontier when it earns its keep. Local when the work is volume,
              private, or already solved.
            </strong>
          </p>
          <p>
            <strong>StorenTech AI</strong> is a full-service AI agency. Every
            client starts with a paid{" "}
            <Link href="/blog/what-is-an-automation-roi-analysis">
              Automation ROI Analysis
            </Link>{" "}
            — never a complimentary sales call. Hybrid Mastermind is how we
            design the stack <em>after</em> the math, not a hardware pitch
            before it.
          </p>
        </div>

        <h2>Why frontier token bills hurt operators</h2>
        <p>
          If you are already using frontier APIs for drafts, research,
          follow-up, CRM notes, and internal ops, the invoice shows up in the{" "}
          <strong>P&amp;L</strong> — not as a cute experiment. Volume work
          burns tokens the same way overtime burns payroll: quietly, every day,
          on tasks that are mostly solved once the pattern is known.
        </p>
        <p>
          That is the ICP for this pattern: operators who{" "}
          <strong>feel frontier API bills in the P&amp;L</strong>, not
          hobbyists chasing the newest model name. The fix is not “cancel AI.”
          The fix is a <strong>split</strong>: keep humans out front where
          customers need a person; let local capacity eat the grind; spend
          frontier only when the work needs frontier-grade judgment.
        </p>
        <p>
          Illustrative planning tables exist internally for sales
          conversations. We do <strong>not</strong> publish unverified monthly
          savings or payback claims here. Your ROIA uses <em>your</em> volumes
          and <em>your</em> stack.
        </p>

        <h2>What “hybrid Mastermind” means (answer-first)</h2>
        <div className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Local open-source models</strong>
                </td>
                <td>
                  High-volume inference: summarization, classification,
                  drafting, RAG over your knowledge, routine agent steps —
                  billed in power and capacity, not per token
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Frontier models (API)</strong>
                </td>
                <td>
                  Judgment, hard writing, novel reasoning, edge cases — used
                  when quality clearly pays for the call
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Control plane</strong>
                </td>
                <td>
                  Orchestration that routes work local-first, escalates to
                  frontier when the task warrants it, and keeps humans
                  accountable for sensitive actions
                </td>
              </tr>
              <tr>
                <td>
                  <strong>On-prem / in-building compute</strong>
                </td>
                <td>
                  When the workload and privacy case justify it — e.g. NVIDIA
                  DGX Spark–class local inference — so sensitive and repetitive
                  jobs stay closer to your data
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          This is <strong>ops automation design</strong>, not a reseller
          catalog. Hardware is a means. The product is a workforce pattern you
          can run and govern.
        </p>
        <p>
          We live the stack ourselves on <strong>StorenTechAI26</strong>:
          NVIDIA <strong>DGX Spark</strong> (private high-speed link to the
          orchestration host), <strong>OpenClaw</strong>-style agent
          orchestration, and local model serving for the grind — with frontier
          models available when a task earns them. That lived setup informs how
          we design client hybrids; it is not a claim that every SMB needs a
          Spark.
        </p>

        <h2>What runs local vs what runs frontier</h2>
        <p>
          <strong>Prefer local when the work is:</strong>
        </p>
        <ul>
          <li>
            <strong>Volume</strong> — the same class of task, hundreds or
            thousands of times (summaries, tags, CRM field fills, first-pass
            drafts, reminders)
          </li>
          <li>
            <strong>Private</strong> — customer PII, internal ops, institutional
            knowledge you would rather not stream to a third-party API by
            default
          </li>
          <li>
            <strong>Already solved</strong> — patterns your team (or your ROIA)
            has already defined; local models handle the loop once skills and
            context are trained
          </li>
        </ul>
        <p>
          <strong>Prefer frontier when the work is:</strong>
        </p>
        <ul>
          <li>
            <strong>Judgment-heavy</strong> — strategy, exception handling,
            high-stakes customer language, novel problems
          </li>
          <li>
            <strong>Quality-gated</strong> — the draft or decision actually
            costs you if it is wrong or flat
          </li>
          <li>
            <strong>Rare but expensive if missed</strong> — the 5% of tasks
            where a stronger model earns its keep
          </li>
        </ul>
        <p>
          Routing sits in the <strong>control plane</strong>: sensitive and
          repetitive stay local; frontier fires when judgment or quality
          demands it. Humans stay out front — customers still get people when
          people matter; local capacity multiplies staff production on the
          back-office and after-hours grind.
        </p>
        <p>
          Security teaser (not a how-to): keeping more of that volume{" "}
          <strong>inside the building</strong> means less operational data
          leaving your environment by default. Process still matters — least
          privilege, human approval on sensitive actions, staging before
          production. More on how we think about that:{" "}
          <Link href="/blog/ai-security-for-ai-employees">
            AI Security for AI Employees
          </Link>
          .
        </p>

        <h2>What operators get</h2>
        <ol>
          <li>
            <strong>A designed hybrid split</strong> — which workflows stay
            local, which escalate to frontier, and why — tied to your volumes,
            not a generic stack dump
          </li>
          <li>
            <strong>Local capacity for the grind</strong> — so token spend is
            not the default meter for every summarization and follow-up
          </li>
          <li>
            <strong>Frontier reserved for earners</strong> — quality and
            judgment where they pay; no “send everything to the biggest model”
            habit
          </li>
          <li>
            <strong>Humans out front</strong> — AI employees and agents amplify
            staff production; people remain accountable for the customer and
            for irreversible moves
          </li>
          <li>
            <strong>A path that starts with math</strong> — the{" "}
            <Link href="/blog/what-is-an-automation-roi-analysis">
              Automation ROI Analysis
            </Link>{" "}
            maps leaks and ranks the first hire <em>before</em> anyone shops
            hardware or retainers
          </li>
        </ol>
        <p>
          Optional ongoing management (agent tuning, skill updates, security
          hygiene) is discussed after the map — not as a surprise SKU on first
          contact. Commercial path overview:{" "}
          <Link href="/how-it-works">How it works</Link>.
        </p>

        <h2>Who this is for / not for</h2>
        <p>
          <strong>For:</strong>
        </p>
        <ul>
          <li>
            Operators who already <strong>feel</strong> frontier or cloud AI
            spend in monthly P&amp;L
          </li>
          <li>
            Service and professional businesses with{" "}
            <strong>repetitive ops</strong> (follow-up, booking, CRM,
            reporting, after-hours coverage) and real conversation volume
          </li>
          <li>
            Teams that want <strong>more staff production</strong> without
            putting every customer interaction on autopilot
          </li>
          <li>
            Buyers willing to share real numbers in a <strong>paid</strong>{" "}
            analysis before committing to stack or hardware
          </li>
        </ul>
        <p>
          <strong>Not for:</strong>
        </p>
        <ul>
          <li>
            Anyone shopping a free “AI audit” or a one-click chatbot demo
          </li>
          <li>Buyers who want a hardware box with no workflow map</li>
          <li>Teams that will not put a human on sensitive actions</li>
          <li>
            Anyone who assumes every small business “needs a DGX Spark” — they
            don’t; the ROIA decides whether local compute is even in scope
          </li>
        </ul>

        <h2>Soft door: start with the Automation ROI Analysis</h2>
        <p>
          Hybrid Mastermind is a <strong>design outcome</strong>, not a cold
          open. StorenTech starts every client with a paid{" "}
          <strong>Automation ROI Analysis</strong> (typically{" "}
          <strong>$1,000</strong>; <strong>$2,000–$3,000</strong> when
          complex). That engagement maps your workflows, quantifies leaks with{" "}
          <em>your</em> numbers, and ranks which AI employee or automation lane
          to hire first — including whether a local/frontier hybrid (and any
          on-prem compute) belongs in the roadmap at all.
        </p>
        <p>
          If the math does not hold, you keep the map. If it does, we design
          the split as ops automation — not as a hardware push.
        </p>
        <p>
          Definition and fee table:{" "}
          <Link href="/blog/what-is-an-automation-roi-analysis">
            What Is an Automation ROI Analysis?
          </Link>
          .
          <br />
          Security diligence inside that map:{" "}
          <Link href="/blog/ai-security-for-ai-employees">
            AI Security for AI Employees
          </Link>
          .
          <br />
          Path: <Link href="/how-it-works">How it works</Link>.
        </p>

        <section className="blog-faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading">FAQ</h2>
          {post.faqs.map((item) => (
            <div className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <FaqAnswer item={item} />
            </div>
          ))}
        </section>

        <h2>How to start</h2>
        <p>Three clean paths:</p>
        <ol>
          <li>
            <strong>Start the paid analysis</strong> —{" "}
            <Link href="/contact">Contact</Link> (primary)
          </li>
          <li>
            <strong>Hear the work live</strong> — <strong>Call Sarah</strong>{" "}
            (voice demo): <SarahPhoneImage />
          </li>
          <li>
            <strong>Read the commercial path</strong> —{" "}
            <Link href="/how-it-works">How it works</Link>
          </li>
        </ol>
        <p>
          Related:{" "}
          <Link href="/blog/what-is-an-automation-roi-analysis">
            What Is an Automation ROI Analysis?
          </Link>{" "}
          ·{" "}
          <Link href="/blog/ai-security-for-ai-employees">
            AI Security for AI Employees
          </Link>
        </p>
        <p>
          Orange County, CA. {site.founder.name}, {site.name}.
        </p>

        <section className="blog-cta" aria-labelledby="ready-heading">
          <h2 id="ready-heading">Ready when you are</h2>
          <div className="btn-row">
            <Link className="btn btn-solid" href="/contact">
              Start the paid analysis
            </Link>
            <CallSarahCta />
            <Link className="btn" href="/how-it-works">
              How it works
            </Link>
            <Link className="btn" href="/blog/what-is-an-automation-roi-analysis">
              Post #1
            </Link>
            <Link className="btn" href="/blog/ai-security-for-ai-employees">
              Post #2
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
