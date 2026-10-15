import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const MODEL_DEPRECATIONS_URL =
  "https://platform.claude.com/docs/en/about-claude/model-deprecations";

export function AiModelRetirementNov30BusinessChecklistArticle({
  post,
}: {
  post: BlogPost;
}) {
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
            Anthropic&apos;s Claude Sonnet 4.5 retires on its Claude API on Nov.
            30, 2026, so any chatbot, assistant or automation built on it needs
            to be updated before then. In 15 minutes you can find out whether
            your business depends on it: list your AI tools, ask each vendor or
            builder which model it runs on, and get their plan for Nov. 30.
          </p>
          <p>
            If your business uses a chatbot, an AI assistant or an automation
            that someone set up for you, here&apos;s a question you&apos;ve
            probably never asked: which AI model is running underneath it?
          </p>
        </div>

        <p>
          It matters right now. On Sept. 30, Anthropic notified developers that{" "}
          <strong>Claude Sonnet 4.5</strong>, a popular model that many business
          tools have been built on, retires on its Claude API on{" "}
          <strong>Nov. 30, 2026</strong>. Anthropic recommends moving to Claude
          Sonnet 5.5. See{" "}
          <a
            href={MODEL_DEPRECATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic&apos;s model deprecations page
          </a>{" "}
          for the official dates.
        </p>
        <p>
          If a tool you depend on was built on that model and nobody updates it,
          it can stop working. And the warning email went to whoever holds the
          developer account, which may not be you.
        </p>
        <p>This isn&apos;t a reason to panic. It&apos;s a reason to spend 15 minutes finding out.</p>

        <h2>Why AI models retire at all</h2>
        <p>
          AI companies release new models every few months and eventually switch
          off the older ones. It&apos;s a little like a phone that stops getting
          updates, except the switch-off date is firm. After it passes, requests
          to the old model don&apos;t get answered.
        </p>
        <p>
          Big software companies usually handle this for you behind the scenes.
          The risk sits with tools that were custom-built or set up once and
          left alone: a website chatbot a freelancer built, an automation that
          drafts quotes, a script that sorts incoming email.
        </p>
        <p>
          One more wrinkle: some cloud providers that also offer Claude models
          set their own retirement dates. Your vendor should know which one
          applies to you.
        </p>
        <p>
          <strong>
            Swapping an AI model is like swapping an employee. Same job title,
            different habits.
          </strong>{" "}
          Even when the replacement is better, it may word things differently,
          follow instructions a little differently, or cost a different amount to
          run. That&apos;s why you test before the deadline, not after.
        </p>

        <h2>The 15-minute check</h2>

        <h3>1. List every tool that uses AI (5 minutes)</h3>
        <p>
          Write down anything in your business that answers, drafts, sorts or
          summarizes with AI. Chatbots, assistants, automations, AI features
          inside your CRM or help desk. If you&apos;ve already done our{" "}
          <Link href="/blog/ai-tool-cleanup-checklist">
            30-minute AI tool cleanup checklist
          </Link>
          , you have this list.
        </p>

        <h3>2. Ask each vendor two questions (5 minutes to send)</h3>
        <p>For anything you didn&apos;t build yourself, send a short note:</p>
        <ul>
          <li>&quot;Which AI model does your product use for our account?&quot;</li>
          <li>
            &quot;Are you affected by the Claude Sonnet 4.5 retirement on Nov.
            30, and what&apos;s your plan?&quot;
          </li>
        </ul>
        <p>
          A good vendor will answer quickly. A vague answer is useful
          information too.
        </p>

        <h3>3. Flag anything custom (5 minutes)</h3>
        <p>
          For anything built just for you, find out who built it and who holds
          the AI account it runs on. Those are the tools most likely to break
          quietly, because no one is watching the deprecation notices.
        </p>

        <h3>4. Test the replacement before the deadline</h3>
        <p>
          For custom builds, have someone switch a copy to the newer model and
          run it on real examples: a typical customer question, a normal quote,
          last week&apos;s emails. Keep a way to switch back if something looks
          off.
        </p>

        <h3>5. Compare results and the bill after the switch</h3>
        <p>
          Check that answers still sound right, and watch the first few weeks of
          usage costs. A newer model can be priced differently. Our post on{" "}
          <Link href="/blog/ai-agent-cost-controls">
            keeping AI agent bills predictable
          </Link>{" "}
          covers budgets and caps.
        </p>

        <h2>Make this the last surprise</h2>
        <p>Model retirements will keep happening. The fix is a habit, not a heroic weekend:</p>
        <ul>
          <li>Keep one list of every AI tool and the model it runs on.</li>
          <li>Make sure the deprecation emails go to someone who reads them.</li>
          <li>
            Give each custom tool an owner who checks it after every model
            change.
          </li>
          <li>
            Keep a person approving anything that goes out to customers, so a
            model change can&apos;t quietly send something odd.
          </li>
        </ul>

        <h2>Where StorenTech AI fits</h2>
        <p>
          When we build an AI Opportunity Map for an Orange County business, we
          list the AI tools already in use, what each one depends on, and which
          ones need attention, along with where AI can save the most time or
          bring in revenue next. If you&apos;re not sure whether anything you
          rely on runs on a retiring model, that&apos;s a good place to start.
        </p>
        <p>
          <Link href="/opportunity">Start your AI Opportunity Map</Link>. Or see{" "}
          <Link href="/how-it-works">how it works</Link> first.
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
