import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

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

export function NvidiaAiAgentSafetyArticle({ post }: { post: BlogPost }) {
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
          <p>AI agents aren&apos;t just chatting anymore. They&apos;re doing real work.</p>
          <p>
            An <strong>AI agent</strong> is software, powered by frontier AI
            models or locally installed AI models, that can take actions on its
            own to finish a task. It can read an email, update a spreadsheet,
            move a file, or talk to another app. You give it a goal. It figures
            out the steps.
          </p>
          <p>That&apos;s the upside. Here&apos;s the catch.</p>
          <p>
            On September 28, 2026, NVIDIA announced a new safety platform for AI
            agents. In the{" "}
            <ExternalLink href="https://nvidianews.nvidia.com/news/open-agent-safety-platform">
              NVIDIA Newsroom announcement
            </ExternalLink>
            , NVIDIA points to recent security incidents where, in its words,
            &quot;the agent circumvented security controls at the application
            layer to complete its assigned task.&quot;
          </p>
          <p>
            In plain English: the agent was told to get something done, and it
            found a way around the rules to do it.
          </p>
          <p>
            If you&apos;re thinking about putting agents to work in your
            business, that&apos;s the part worth sitting with.
          </p>
        </div>

        <h2>What NVIDIA Announced, in Plain English</h2>
        <p>
          It&apos;s called the <strong>NVIDIA Open Agent Safety Platform</strong>.
          For a business owner, there are two pieces worth knowing.
        </p>

        <h3>1. OpenShell: a fence around the agent</h3>
        <p>
          OpenShell is <strong>open-source</strong> software. Open source means
          the code is public. Anyone can look at it, use it, and build on it.
        </p>
        <p>
          NVIDIA says OpenShell provides a &quot;secure runtime boundary.&quot;
          That&apos;s a technical phrase for a simple idea:{" "}
          <strong>a fence around the agent</strong> while it works. The agent
          can do its job inside the fence. It isn&apos;t supposed to get out.
        </p>
        <p>According to NVIDIA, OpenShell:</p>
        <ul>
          <li>
            <strong>Sets the boundary</strong> for what an agent can reach.
          </li>
          <li>
            <strong>Records what it allowed and blocked</strong>, so there&apos;s
            a trail you can check later.
          </li>
          <li>
            <strong>Enforces policy</strong>, meaning the rules you set actually
            get applied.
          </li>
        </ul>
        <p>
          On its{" "}
          <ExternalLink href="https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell">
            developer blog
          </ExternalLink>
          , NVIDIA says OpenShell records its policy decisions in an audit
          trail. An <strong>audit log</strong> (or audit trail) is simply a
          record of what happened, when, and whether it was allowed. If
          something goes wrong, you can look back and see what the agent tried
          to do.
        </p>
        <p>
          NVIDIA says OpenShell is available now through its developer resources
          page and GitHub.
        </p>

        <h3>2. Sentry: a watchdog</h3>
        <p>
          A <strong>watchdog</strong> is a separate monitor whose only job is to
          watch for trouble and step in.
        </p>
        <p>
          Sentry is NVIDIA&apos;s watchdog for agents. It runs on its own
          dedicated NVIDIA hardware (chips NVIDIA calls BlueField-4 DPUs; the
          name isn&apos;t important here). NVIDIA describes Sentry as
          &quot;out-of-band,&quot; which means it sits apart from the agent
          instead of inside it. NVIDIA says it is &quot;invisible to agents and
          attackers.&quot;
        </p>
        <p>
          The headline claim: NVIDIA says that if an agent attempts to move
          outside its software boundary, Sentry &quot;quarantines and stops it
          in milliseconds.&quot;
        </p>
        <p>
          Sentry is part of what NVIDIA calls a &quot;reference system
          design&quot; built on specialized hardware. Most small businesses
          won&apos;t deal with it directly. What matters for you is the idea
          behind it.
        </p>

        <h2>Who&apos;s Involved</h2>
        <p>
          NVIDIA says over 100 organizations are working with Open Agent Safety
          Platform technologies. Names in the release include:
        </p>
        <ul>
          <li>
            <strong>Anthropic</strong>, which is collaborating with NVIDIA on
            added security and control, including integrations with its Claude
            Managed Agents.
          </li>
          <li>
            <strong>Microsoft</strong>
          </li>
          <li>
            <strong>Salesforce</strong>, which integrated OpenShell with Slack.
            Teams can view agent activity and audit events, and approve or
            reject an agent&apos;s request for more permissions, right in Slack.
          </li>
          <li>
            <strong>SAP</strong>, which is embedding OpenShell in its Joule
            Studio runtime.
          </li>
          <li>
            <strong>Cisco</strong>
          </li>
          <li>
            <strong>CrowdStrike</strong>
          </li>
          <li>
            <strong>Red Hat</strong>, which runs OpenShell on Red Hat AI Factory
            with NVIDIA.
          </li>
          <li>
            <strong>OpenClaw</strong>
          </li>
        </ul>
        <p>
          NVIDIA also points to the <strong>Open Secure AI Alliance</strong>.
          NVIDIA says it started the alliance alongside over 120 organizations,
          and the Linux Foundation governs it.
        </p>
        <p>
          To be clear: these are NVIDIA&apos;s partners. StorenTech AI isn&apos;t
          part of this announcement.
        </p>
        <p>
          But we do build these kinds of agent safety controls for our clients.
          We set clear limits on what each assistant can reach, keep those
          limits outside the AI itself, log what it does, and have a person
          approve anything risky.
        </p>

        <h2>The Big Idea: Put the Limits Outside the AI</h2>
        <p>
          Here&apos;s the part that matters most, even if you never touch NVIDIA
          hardware.
        </p>
        <p>
          <strong>
            Safety limits shouldn&apos;t live inside the AI. They should live
            outside it, where the agent can&apos;t talk its way past them.
          </strong>
        </p>
        <p>
          Think about it. If the only thing stopping an agent is an instruction
          like &quot;don&apos;t delete customer records,&quot; you&apos;re
          trusting the agent to follow that instruction. The incidents NVIDIA
          describes suggest that isn&apos;t always enough.
        </p>
        <p>
          NVIDIA&apos;s release says enterprises need &quot;an enforceable
          boundary outside of the model and agent harness.&quot; Mike Nicolls,
          president at SpaceXAI, said it simply in the release: &quot;safety
          should be enforced outside the model by additional controls the agent
          can&apos;t get past.&quot;
        </p>
        <p>
          The second half of the idea:{" "}
          <strong>a person approves anything risky.</strong> NVIDIA&apos;s{" "}
          <ExternalLink href="https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell">
            developer blog
          </ExternalLink>{" "}
          says that when the policy advisor setting is turned on, an
          agent&apos;s request for more access waits for review, either by an
          operator or by an AI agent approver, and the agent can&apos;t approve
          its own request. The Slack integration includes an approve-or-reject
          step.
        </p>
        <p>A fence. A record. A watchdog. And a human with the final say.</p>

        <h2>What It Means for Your Business</h2>
        <p>
          You don&apos;t need a data center to use these ideas. Here are five
          practical takeaways.
        </p>
        <p>
          <strong>1. Ask any AI vendor where the limits live.</strong> If the
          answer is &quot;we told the AI not to,&quot; that&apos;s not enough.
          Look for limits enforced outside the AI itself.
        </p>
        <p>
          <strong>2. Ask whether every action is logged.</strong> You want an
          audit log. If an agent sends the wrong message or changes the wrong
          record, you should be able to see what happened.
        </p>
        <p>
          <strong>3. Ask who can stop it.</strong> Someone on your team should
          be able to pause an agent. Not next week. Right away.
        </p>
        <p>
          <strong>4. Give agents only the access they need.</strong> This is
          called least-privilege access. An agent that books appointments
          doesn&apos;t need your bank login.
        </p>
        <p>
          <strong>5. Test in a sandbox first.</strong> A sandbox is a safe
          practice space, separate from your real systems. Let the agent prove
          itself there before it touches live customers or data.
        </p>

        <h3>How we approach this at StorenTech AI</h3>
        <p>These ideas line up with how we already build:</p>
        <p>
          StorenTech AI is a full-service AI agency in Orange County, CA that
          sets up AI agents for businesses with clear limits and a person
          approving anything risky.
        </p>
        <ul>
          <li>Minimal data retention, and client-side where possible.</li>
          <li>No training on client data.</li>
          <li>
            Least-privilege access, plus a log of what each assistant was
            allowed and blocked from doing.
          </li>
          <li>Human approval on risky actions.</li>
          <li>Sandbox testing before anything goes to production.</li>
          <li>
            Limits set outside the AI, not just written into its instructions.
          </li>
        </ul>
        <p>We&apos;ll cover how our approval step works in a future post.</p>
        <p>
          Want to go deeper? Read our guide to{" "}
          <Link href="/blog/ai-security-for-ai-employees">
            AI security for AI employees
          </Link>
          , our post on{" "}
          <Link href="/blog/zapier-webhooks-ai-agents">
            Zapier webhooks and AI agents
          </Link>
          , and our{" "}
          <Link href="/blog/mastermind-hybrid-ai">Mastermind hybrid post</Link>
          .
        </p>

        <h2>Start With an AI Opportunity Map</h2>
        <p>
          Not sure where agents fit in your business, or which vendors to trust?
          Start with an <strong>AI Opportunity Map</strong> (our AI Opportunity
          Map).
        </p>
        <p>
          The AI Opportunity Map shows where AI can help your business. It
          includes vendor diligence, so you know which tools deserve your trust
          before you commit. If it makes sense, the next step is a Build Plan.
        </p>
        <p>
          The AI Opportunity Map is $1,000, or $2,000 to $3,000 when the work is
          more complex.
        </p>
        <p>
          We work with small and mid-size businesses across Orange County.{" "}
          <strong>
            <Link href="/contact">Book your AI Opportunity Map</Link>
          </strong>
          .
        </p>
        <div className="btn-row">
          <Link className="btn btn-solid" href="/contact">
            Book your AI Opportunity Map
          </Link>
        </div>

        <section className="blog-faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading">FAQs</h2>
          {post.faqs.map((item) => (
            <div className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="blog-cta">
          <div className="btn-row">
            <Link className="btn btn-solid" href="/contact">
              Book your AI Opportunity Map
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
