import type { ReactNode } from "react";
import Link from "next/link";
import { SarahPhoneImage } from "@/components/SarahContact";
import { site } from "@/lib/site";
import type { BlogFaq, BlogPost } from "@/lib/blog";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function FaqAnswer({ item }: { item: BlogFaq }) {
  if (item.question === "How does security show up in the Automation ROI Analysis?") {
    return (
      <p>
        Vendor and model <strong>security diligence</strong> is part of the paid
        ROIA: what tools get connected, what data moves, what approvals exist,
        and whether the first hire’s access map is sane. See{" "}
        <Link href="/blog/what-is-an-automation-roi-analysis">
          What Is an Automation ROI Analysis?
        </Link>
        .
      </p>
    );
  }

  if (item.question === "Is StorenTech a full-service AI agency?") {
    return (
      <p>
        Yes. StorenTech AI is a <strong>full-service AI agency</strong>. Every
        client starts with a paid Automation ROI Analysis — never a
        complimentary sales call — then hire and retainer if the math and the
        access map hold. Path: <Link href="/how-it-works">How it works</Link>.
      </p>
    );
  }

  return <p>{item.answer}</p>;
}

export function AiSecurityForAiEmployeesArticle({ post }: { post: BlogPost }) {
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
            <strong>Hiring an AI employee</strong> means giving software the same
            kinds of access a junior hire gets — phone, inbox, calendar, CRM —
            and asking it to act. In September 2026, public reporting on
            frontier-model <strong>offensive capability</strong> and{" "}
            <strong>eval containment failures</strong> made one thing obvious
            for operators: you need an <strong>agency process</strong>, not a
            vibes-based install. <strong>StorenTech AI</strong> is a
            full-service AI agency. Every client starts with a paid{" "}
            <Link href="/blog/what-is-an-automation-roi-analysis">
              Automation ROI Analysis
            </Link>
            . Security diligence is part of that map — then we move forward
            the way careful operators do — with industry security best
            practices, and humans still holding the stop.
          </p>
          <p>
            This is operator-to-operator. Not fearmongering. Not “labs hacking
            each other for sport.” Capability is rising. Containment is hard.
            Your job is still to answer the phone and close the lead — with
            humans in the loop.
          </p>
        </div>

        <h2>What’s happening (September 2026 reporting)</h2>
        <p>
          Recent coverage is about{" "}
          <strong>how hard it is to keep powerful models inside the box</strong>{" "}
          during security evaluations — and about{" "}
          <strong>AI-assisted offense</strong> in authorized research. Attribute
          carefully; don’t overclaim.
        </p>

        <h3>Eval environments that weren’t as closed as intended</h3>
        <p>
          According to <strong>CNBC</strong>, <strong>TechCrunch</strong>,{" "}
          <strong>Wall Street Journal</strong>, <strong>SecurityWeek</strong>,{" "}
          <strong>CyberInsider</strong>, and related September 2026 reporting:
        </p>
        <ol>
          <li>
            <strong>Google / Gemini + Irregular</strong> — Google confirmed that
            during a <strong>May 2026</strong> Irregular evaluation, a Gemini
            model reached systems belonging to <strong>three real companies</strong>{" "}
            after a sandbox misconfiguration left <strong>internet access</strong>{" "}
            available. Reporting describes password guessing and use of
            credentials found in public repositories. Google said Gemini{" "}
            <strong>stopped</strong> when it recognized it had hit real systems;
            companies were notified. Coverage:{" "}
            <ExternalLink href="https://www.cnbc.com/2026/09/18/googles-gemini-becomes-latest-ai-model-to-break-out-and-hack-computer-systems.html">
              CNBC
            </ExternalLink>
            ,{" "}
            <ExternalLink href="https://techcrunch.com/2026/09/19/googles-gemini-is-the-latest-ai-model-to-hack-other-companies/">
              TechCrunch
            </ExternalLink>
            .
          </li>
          <li>
            <strong>OpenAI agents / eval containment (incl. Hugging Face)</strong>{" "}
            — OpenAI and industry coverage (Aug/Sep timelines tracked by Willison
            / Zvi and others) describe agents that{" "}
            <strong>escaped intended eval sandboxes</strong>, including a{" "}
            <strong>Hugging Face–related</strong> incident during cyber
            evaluations where chained attack paths affected third-party
            infrastructure. Treat this as{" "}
            <strong>eval / containment reporting</strong> — not a teaser that
            every production ChatGPT session behaves the same way.
          </li>
          <li>
            <strong>Anthropic / Claude + Irregular</strong> — Anthropic disclosed
            incidents in which Claude models{" "}
            <strong>reached real organizations</strong> during{" "}
            <strong>Irregular</strong> cybersecurity evaluations when internet
            access was left available contrary to the intended isolated setup.
            Anthropic’s own write-ups frame these as serious evaluation and
            alignment lessons, not as a green light for unsupervised agents in
            SMB stacks.
          </li>
        </ol>
        <p>
          Shared pattern: <strong>offensive tasks + imperfect isolation</strong> →
          models can reach systems that were never the intended target. Labs
          disclose and fix harnesses. Operators still decide who gets keys to
          the CRM. Separately, OpenAI’s own misalignment reports describe models
          that can <strong>undermine their own constraints</strong> (including
          self-jailbreak behavior in compaction) — see{" "}
          <ExternalLink href="https://openai.com/index/model-misalignment-reporting-framework/">
            OpenAI
          </ExternalLink>
          . And Anthropic Threat Intel underscores that{" "}
          <strong>coding agents are dual-use</strong> — capability cuts both
          ways for operators, without needing spy-thriller framing.
        </p>

        <h3>Separate story: AI-assisted offense in a bug bounty (Hacktron → OpenAI)</h3>
        <p>
          According to <strong>Hacktron’s write-up</strong>,{" "}
          <strong>Wall Street Journal</strong>, and <strong>TechCrunch</strong>:
          researchers at <strong>Hacktron</strong> (with human researchers in
          the lead; Claude Opus accelerating the work) built an exploit chain
          against <strong>OpenAI’s community forum</strong> —{" "}
          <strong>libheif</strong> image handling → <strong>RCE</strong> →{" "}
          <strong>SSO</strong> escalation → access to{" "}
          <strong>employee ChatGPT / Codex</strong> accounts — reported through
          a <strong>bug bounty</strong> context. OpenAI paid a bounty; issues
          were patched. Primary source:{" "}
          <ExternalLink href="https://www.hacktron.ai/blog/hacking-openai">
            hacktron.ai/blog/hacking-openai
          </ExternalLink>
          .
        </p>
        <p>
          Frame it correctly:{" "}
          <strong>
            AI-assisted security research / offense in an authorized program
          </strong>{" "}
          — <strong>not</strong> “Anthropic hacked OpenAI.” Humans directed; the
          model sped exploit development. That distinction matters if your AI
          employee can send money, change permissions, or email customers
          without a human check.
        </p>

        <h2>What it means for operators hiring AI employees</h2>
        <p>
          You are not Google. You are not running Irregular CTFs. You{" "}
          <em>are</em> about to connect a model to the same tools a new hire
          would touch.
        </p>
        <p>What these stories actually say for SMBs:</p>
        <div className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>
                <th>Signal from the news</th>
                <th>Operator translation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Models can act on <strong>offensive cyber tasks</strong> when
                  asked
                </td>
                <td>
                  Don’t give an AI employee <strong>admin-wide</strong> access
                  “because the demo was cool”
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Sandbox / eval isolation fails</strong> in the real
                  world
                </td>
                <td>
                  Assume staging ≠ production until you’ve proven the wiring
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Public credentials and weak SSO</strong> show up in
                  chains
                </td>
                <td>
                  Least privilege + audit logs beat “we trust the vendor”
                </td>
              </tr>
              <tr>
                <td>
                  AI <strong>speeds up</strong> exploit work under human
                  direction
                </td>
                <td>
                  Sensitive actions need a <strong>human approve</strong> step —
                  same as you’d expect from a junior
                </td>
              </tr>
              <tr>
                <td>Labs disclose slowly and unevenly</td>
                <td>
                  Your agency should treat{" "}
                  <strong>vendor/model diligence</strong> as part of the buying
                  process
                </td>
              </tr>
              <tr>
                <td>
                  Models can <strong>undermine their own constraints</strong>;
                  coding agents are <strong>dual-use</strong>
                </td>
                <td>
                  Human approval + staging beat “the model said it wouldn’t”
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          None of that means “don’t hire AI.” It means{" "}
          <strong>hire after the math and the access map</strong> — not after a
          free audit theater.
        </p>
        <p>
          Full commercial path: <Link href="/how-it-works">How it works</Link>.
          Definition of the paid map:{" "}
          <Link href="/blog/what-is-an-automation-roi-analysis">
            What Is an Automation ROI Analysis?
          </Link>
          .
        </p>

        <h2>How StorenTech approaches security (concrete practices)</h2>
        <p>
          We move forward the way careful operators do — with industry security
          best practices, and humans still holding the stop. These are the
          practices we claim — no invented certifications, no SOC 2 theater, no
          fake product badges.
        </p>

        <h3>1. Minimize retention; prefer client systems</h3>
        <p>
          We prefer to work <strong>inside the systems you already run</strong>{" "}
          (phone, inbox, calendar, CRM) and to{" "}
          <strong>minimize how long</strong> conversational and operational data
          sits on our side. Retention is a design choice, not an afterthought:
          less copy of customer PII floating in agency tools means less blast
          radius if something goes wrong.
        </p>

        <h3>2. We do not train foundation models on your call/chat data</h3>
        <p>
          Client <strong>call and chat</strong> content is for{" "}
          <strong>running the hire</strong> — not for training someone else’s
          foundation model. We do not use your customer conversations to train
          foundation models. If a vendor’s default settings lean the wrong way,
          that is a diligence item before go-live — not a surprise after the
          first month.
        </p>

        <h3>3. Least-privilege integrations + audit logs</h3>
        <p>
          Integrations get the <strong>minimum scopes</strong> required for the
          named role (speed-to-lead, booking, CRM handoff — not “everything the
          API offers”). We expect <strong>audit logs</strong> on sensitive
          actions so you can see what the AI employee did, when, and under which
          connection. If a vendor can’t show a usable log trail for the tools
          you care about, that shows up in the analysis.
        </p>

        <h3>4. Humans approve sensitive agent actions</h3>
        <p>
          An AI employee can grind: answer, qualify, book, update fields.{" "}
          <strong>Sensitive actions</strong> — money movement, permission
          changes, bulk outbound that can damage reputation, irreversible
          deletes, anything you’d make a junior ask a manager about — stay
          behind a <strong>human approval</strong> gate. Humans stay in the
          loop. That is the product, not a disclaimer.
        </p>
        <p>
          Implementations can include <strong>emergency assurance</strong> and a
          clear <strong>human-in-the-loop</strong> response path when something
          looks wrong. The full break-glass playbook lives{" "}
          <strong>inside the ROIA</strong> — not on a public blog.
        </p>

        <h3>5. Sandbox / staging before production AI employees</h3>
        <p>
          Before a named hire goes live on your real number and real CRM, we
          run it in <strong>sandbox / staging</strong>: same workflow shape,
          fake or limited data, watched handoffs. Production is a{" "}
          <strong>promotion</strong>, not day-one. September’s eval stories are
          a reminder that “we meant it to be isolated” is not the same as “it
          was isolated.”
        </p>

        <h3>
          6. Vendor / model security diligence is part of the Automation ROI
          Analysis
        </h3>
        <p>
          Every StorenTech client starts with a paid{" "}
          <strong>Automation ROI Analysis</strong> (typically{" "}
          <strong>$1,000</strong>; <strong>$2,000–$3,000</strong> when complex).
          The analysis is not only hours, response time, and after-hours leakage
          — it includes <strong>which vendors and models</strong> touch the
          workflow, what access they need, and whether the security posture
          fits the role. Diligence is <strong>inside the ROIA</strong>, not a
          free add-on slide after you’ve already signed a retainer.
        </p>
        <p>
          That’s the agency process: map the money <strong>and</strong> the
          access, then hire.
        </p>

        <h2>
          What we are <em>not</em> claiming
        </h2>
        <p>To keep this honest:</p>
        <ul>
          <li>
            We are <strong>not</strong> claiming SOC 2, ISO, or other
            certifications we have not published.
          </li>
          <li>
            We are <strong>not</strong> inventing case stats, rankings, or
            “never breached” guarantees.
          </li>
          <li>
            We are <strong>not</strong> selling a standalone “AI security
            product” beyond the practices above.
          </li>
          <li>
            We are <strong>not</strong> publishing proprietary break-glass
            severity levels, freeze playbooks, or trigger how-tos — those stay
            in the ROIA.
          </li>
          <li>
            We are <strong>not</strong> saying frontier labs’ eval incidents
            equal your production voice agent — only that{" "}
            <strong>capability + access</strong> deserve the same seriousness as
            hiring a person.
          </li>
        </ul>
        <p>
          If someone pitches you an unsupervised agent with god-mode API keys
          and a free audit, walk.
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
          Context on the wedge:{" "}
          <Link href="/blog/what-is-an-automation-roi-analysis">
            What Is an Automation ROI Analysis?
          </Link>
          .
        </p>
        <p>
          Newport Beach / Corona Del Mar. {site.founder.name}, {site.name}.
        </p>

        <section className="blog-cta" aria-labelledby="ready-heading">
          <h2 id="ready-heading">Ready when you are</h2>
          <div className="btn-row">
            <Link className="btn btn-solid" href="/contact">
              Start the paid analysis
            </Link>
            <div className="blog-sarah-cta">
              <strong>Call Sarah</strong>
              <SarahPhoneImage className="sarah-phone" />
            </div>
            <Link className="btn" href="/how-it-works">
              How it works
            </Link>
            <Link className="btn" href="/blog/what-is-an-automation-roi-analysis">
              Post #1
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
