import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function WhatShouldYourBusinessAiBeAllowedToDoArticle({
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
        {hero ? (
          <figure className="blog-hero-media">
            <picture>
              <source srcSet={hero.avif} type="image/avif" />
              <source srcSet={hero.webp} type="image/webp" />
              <img
                src={hero.webp}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                fetchPriority="high"
              />
            </picture>
          </figure>
        ) : null}
      </header>

      <div className="wrap-narrow blog-prose">
        <div className="blog-lead">
          <p>
            Before an AI tool clicks anything for your business, answer four
            questions: what can it see, what can it change, what needs a
            person&apos;s yes, and who owns it. Write the answers on one page for
            each tool, and you&apos;ve decided what your AI is allowed to do
            before it decides for you.
          </p>
          <p>
            That&apos;s the whole idea. The rest of this post walks through each
            question in plain English, with examples from the kind of work Orange
            County businesses do every day.
          </p>
          <p>
            <strong>
              Give every AI tool a job description: what it can see, what it can
              change, and what needs your yes.
            </strong>
          </p>
        </div>

        <h2>Why this matters now</h2>
        <p>
          Not long ago, AI mostly wrote things. It drafted an email, and you
          decided whether to send it. Now more AI tools can act. They can update
          a customer record, send a message, move a file, fill out a form on a
          website or click &quot;Submit&quot; on an order.
        </p>
        <p>
          That&apos;s useful. It&apos;s also a different kind of tool. A tool
          that only writes drafts can&apos;t do much harm on its own. A tool
          that can click buttons needs the same thing a new employee needs: a
          clear idea of what the job is and where it stops.
        </p>
        <p>
          Last week we walked through how to count the AI tools already in your
          business. This is the next step. Once you know what you have, decide
          what each one may do.
        </p>

        <h2>Question 1: What can it see?</h2>
        <p>
          Start with what the tool can read. Your inbox? Your customer list? Your
          accounting software? Shared folders with contracts and payroll?
        </p>
        <p>
          Many AI tools ask for wide access when they&apos;re set up because
          it&apos;s easier. Someone clicks &quot;Allow&quot; and moves on. But a
          scheduling assistant doesn&apos;t need to read payroll, and a website
          chatbot doesn&apos;t need your full customer history.
        </p>
        <p>
          <strong>
            Ask: What does this tool need to read to do its job, and what can we
            take away?
          </strong>
        </p>

        <h2>Question 2: What can it change?</h2>
        <p>
          Reading and changing are very different. An AI that reads your calendar
          to suggest times is low-stakes. An AI that can move or cancel
          appointments is not.
        </p>
        <p>
          List what the tool can create, edit, send or delete. Pay close
          attention to anything that touches customers, money or records
          you&apos;d have trouble rebuilding.
        </p>
        <p>
          <strong>
            Ask: If this tool made a mistake here, could we undo it easily?
          </strong>
        </p>
        <p>If the answer is no, that action belongs under Question 3.</p>

        <h2>Question 3: What needs a person&apos;s yes?</h2>
        <p>
          This is where you draw the line. Some actions are fine for AI to handle
          alone, like sorting incoming email or drafting a reply. Others should
          wait for a person to approve them.
        </p>
        <p>Good candidates for &quot;a person approves first&quot;:</p>
        <ul>
          <li>Sending anything to a customer for the first time</li>
          <li>Changing prices, quotes or invoices</li>
          <li>Anything involving payments or refunds</li>
          <li>Deleting records or files</li>
          <li>
            Anything you&apos;d be uncomfortable explaining to a customer if it
            went wrong
          </li>
        </ul>
        <p>
          A useful test: would you let a brand-new hire do this alone in their
          first week? If not, don&apos;t let the AI do it alone either. You can
          always loosen the rule later once you&apos;ve watched the tool work.
        </p>
        <p>
          Some AI makers now build this step into their tools. Anthropic&apos;s
          documentation for its Claude Agent SDK, a kit developers use to build
          AI agents, describes an approval step: when the agent wants to take an
          action that hasn&apos;t been cleared ahead of time, the request goes to
          an approval check that can allow it or deny it. Builders can also list
          actions that are always refused, no matter how loosely the rest is set.
          Ask whoever builds your AI tools whether they use a step like this.
        </p>
        <p>
          <strong>
            Ask: Which of this tool&apos;s actions should wait for a person, and
            who is that person?
          </strong>
        </p>

        <h2>Question 4: Who owns it?</h2>
        <p>
          Every AI tool needs a name next to it. Not &quot;IT&quot; and not
          &quot;the vendor.&quot; A real person in your business who checks on
          it, answers questions about it and decides when its job description
          changes.
        </p>
        <p>
          Without an owner, tools drift. Access gets added and never removed. The
          person who set it up leaves, and nobody knows what it can do anymore.
        </p>
        <p>
          <strong>
            Ask: If this tool does something odd on a Tuesday afternoon, who gets
            the call?
          </strong>
        </p>

        <h2>Put it on one page</h2>
        <p>
          You don&apos;t need software for this. For each AI tool, write four
          short lines:
        </p>
        <ol>
          <li>
            <strong>Can see:</strong> ...
          </li>
          <li>
            <strong>Can change:</strong> ...
          </li>
          <li>
            <strong>Needs a person&apos;s yes:</strong> ...
          </li>
          <li>
            <strong>Owner:</strong> ...
          </li>
        </ol>
        <p>
          Keep it with your other business documents and look at it again when
          the tool gets a new feature, when you change vendors or when the owner
          changes roles. It takes a few minutes per tool, and it turns a vague
          worry into a clear decision.
        </p>
        <p>
          This is a management decision, not a tech project. You already decide
          what each employee may do, approve and sign. AI tools deserve the same
          thinking.
        </p>

        <h2>How we handle it at StorenTech AI</h2>
        <p>
          When StorenTech AI builds an assistant for an Orange County business,
          we write that job description before anything gets built. We set clear
          limits on what each assistant can reach, keep those limits outside the
          AI itself, log what it does, and have a person approve anything risky.
        </p>
        <p>
          <strong>
            At StorenTech AI, we put it simply: an AI tool should never be able
            to do more than the job you gave it.
          </strong>
        </p>

        <h2>Start with a map</h2>
        <p>
          If you&apos;d like help deciding where AI pays in your business and
          what each tool should be allowed to do,{" "}
          <Link href="/opportunity">start your AI Opportunity Map</Link>. We
          look at where your time and money actually go, then recommend the first
          AI job worth doing, with the limits written down before anything gets
          built.
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
