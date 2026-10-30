import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function HuggingFaceGithubExplainedArticle({
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
            GitHub is where software code lives, with a full history of every
            change. Hugging Face is where AI models and the data behind them
            live, with notes on what each model is for and what its license
            allows. If someone builds AI tools for your business, the work
            should live in accounts like these that your business owns, so you
            can see it, keep it and hand it to someone else if you ever need
            to.
          </p>
          <p>
            You don&apos;t need to learn to code to benefit. You just need to
            know what to ask for.
          </p>
          <p>
            <strong>
              If your business paid for it, your business should own the
              account it lives in.
            </strong>
          </p>
        </div>

        <h2>GitHub in plain English</h2>
        <p>
          GitHub is a website for storing and managing code. Each project lives
          in a &quot;repository,&quot; which GitHub describes as holding all of
          a project&apos;s code, files and each file&apos;s revision history.
        </p>
        <p>
          That history is the important part for an owner. Every change is
          recorded: what changed, when and by whom. If an update breaks
          something, a developer can see exactly what changed and roll it back.
        </p>
        <p>A few features worth knowing by name:</p>
        <ul>
          <li>
            <strong>Private repositories.</strong> Only you and the people you
            invite can see the code.
          </li>
          <li>
            <strong>Secret scanning.</strong> GitHub looks for passwords and
            access keys that were accidentally saved in code and raises an
            alert. It runs automatically on public repositories; for private
            repositories owned by a company account, GitHub offers it as part
            of its Secret Protection option on certain plans.
          </li>
          <li>
            <strong>Dependabot alerts.</strong> Most software is built on other
            people&apos;s building blocks. GitHub warns you when one of those
            blocks has a known security problem so it can be updated.
          </li>
        </ul>

        <h2>Hugging Face in plain English</h2>
        <p>
          Hugging Face is a website for sharing and finding AI models, the data
          used to train them and small demo apps.
        </p>
        <p>For a business owner, three things matter:</p>
        <ul>
          <li>
            <strong>Model cards.</strong> Each model comes with a page
            describing what it&apos;s meant for, its known limitations and what
            data it was trained on. Think of it as the label on the box.
          </li>
          <li>
            <strong>Licenses.</strong> The model page shows its license. Some
            allow business use; others restrict it. Someone should check before
            a model goes into a customer-facing tool.
          </li>
          <li>
            <strong>Private and gated access.</strong> Companies can keep their
            own models and data private, and model authors can require people
            to request access before downloading.
          </li>
        </ul>
        <p>
          Like GitHub, Hugging Face keeps a version history, so you can tell
          which version of a model or dataset a tool is using.
        </p>

        <h2>Why your AI work should live in places like these</h2>
        <p>
          When a business hires someone to build an AI tool, the work often
          ends up scattered across the builder&apos;s laptop, personal accounts
          and a few cloud services. That works until something changes.
        </p>
        <p>
          Keeping the work in organized, business-owned accounts on platforms
          like GitHub and Hugging Face gives you:
        </p>
        <ul>
          <li>
            <strong>Ownership.</strong> The code and models sit in an account
            your business controls, not one tied to a single person.
          </li>
          <li>
            <strong>A record.</strong> You can see what changed and when, which
            makes problems faster to trace.
          </li>
          <li>
            <strong>A way back.</strong> If an update goes wrong, a previous
            version is still there.
          </li>
          <li>
            <strong>Easier handoffs.</strong> If you switch developers, the
            next person can pick up where the last one left off.
          </li>
          <li>
            <strong>Fewer surprises.</strong> Built-in alerts can catch leaked
            passwords and outdated building blocks early.
          </li>
        </ul>
        <p>
          For Orange County businesses that rely on one outside developer, the
          handoff point alone is worth it.
        </p>

        <h2>Five questions to ask your developer</h2>
        <p>
          You don&apos;t have to manage these platforms yourself. Ask whoever
          builds your AI tools:
        </p>
        <ol>
          <li>
            <strong>Whose account is the code in?</strong> It should be an
            organization account your business owns, with you as an owner.
          </li>
          <li>
            <strong>Is it private?</strong> Customer-related code and data
            should not be public.
          </li>
          <li>
            <strong>Are alerts turned on?</strong> Ask whether secret scanning
            and dependency alerts are active, and who reads them.
          </li>
          <li>
            <strong>
              What models are we using, and what do their licenses allow?
            </strong>{" "}
            Ask for the model card link for each one.
          </li>
          <li>
            <strong>If you left tomorrow, could someone else take over?</strong>{" "}
            The honest answer should be yes, with a short note explaining where
            everything lives.
          </li>
        </ol>
        <p>
          Keep security at the right level for your size: limit who has access,
          use separate access keys for separate tools, and remove people who no
          longer need access. A developer can set this up quickly.
        </p>
        <p>
          <strong>
            At StorenTech AI, we believe the business that pays for an AI tool
            should own it, see its history and be able to take it anywhere.
          </strong>
        </p>

        <h2>A sensible first step</h2>
        <p>
          If you already have AI tools or automations and aren&apos;t sure
          where they live or who controls them, that&apos;s a good place to
          start.{" "}
          <Link href="/opportunity">Start your AI Opportunity Map</Link> and
          we&apos;ll look at what you have, where it lives and what to fix or
          build next.
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
