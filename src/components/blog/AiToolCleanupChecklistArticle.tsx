import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function AiToolCleanupChecklistArticle({ post }: { post: BlogPost }) {
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
            Yes, your business very likely uses more AI tools than you realize,
            because AI now ships inside the email, CRM, accounting and design
            software you already pay for. In 30 minutes you can count them all,
            name an owner for each and see what each one can touch, using the
            checklist below.
          </p>
          <p>
            Ask most Orange County business owners how many AI tools their
            company uses, and you&apos;ll hear &quot;two, maybe three.&quot;
            Then you start counting.
          </p>
          <p>
            There&apos;s the chatbot on the website. The AI writing helper
            someone turned on inside the email program. The meeting note-taker
            that joins video calls. The &quot;smart&quot; features that quietly
            showed up in the CRM, the accounting software and the design app
            after an update. And the no-cost tools a staff member signed up for
            on their own because they were trying to save time.
          </p>
          <p>
            None of that is bad. Most of it is helping. But you can&apos;t
            manage what you haven&apos;t counted.
          </p>
          <p>
            <strong>Count your AI tools before you add another one.</strong>
          </p>
        </div>

        <h2>Why this is suddenly a big deal</h2>
        <p>
          AI used to be a separate product you went out and bought. Now it
          ships inside the tools you already pay for, and more of it can act,
          not just answer. Some of these tools can read your inbox, open files,
          update records or send messages.
        </p>
        <p>
          Big companies are feeling it first. At the end of September,
          TechCrunch reported that Reco, a startup that helps large companies
          find and control the AI agents running across their software, raised
          $55 million, and that a crowd of similar startups is chasing the same
          problem. When investors pour money into &quot;help me find my own
          AI,&quot; it&apos;s a sign the problem is real.
        </p>
        <p>
          A small business doesn&apos;t need a security platform to get ahead of
          this. It needs 30 minutes and a simple list.
        </p>

        <h2>The 30-minute AI tool cleanup checklist</h2>
        <p>
          Grab a spreadsheet (or a sheet of paper) with five columns:{" "}
          <strong>
            Tool, Who uses it, What it can touch, Who pays, Keep or cut.
          </strong>
        </p>

        <h3>1. List the AI you bought on purpose (5 minutes)</h3>
        <p>
          Chatbots, writing assistants, note-takers, image tools, scheduling
          assistants, any automation service. Check your credit card statements
          and app subscriptions for anything with &quot;AI,&quot;
          &quot;assistant,&quot; &quot;copilot&quot; or &quot;agent&quot; in the
          name.
        </p>

        <h3>2. List the AI that came along for the ride (5 minutes)</h3>
        <p>
          Open the settings in your email, CRM, accounting, phone system and
          file storage. Look for AI features that are switched on. Many were
          added in updates you never asked for.
        </p>

        <h3>3. Ask your team what they signed up for (10 minutes)</h3>
        <p>
          This is the one people skip. Send a short, no-blame message:
          &quot;List any AI tool you use for work, paid or not, even if
          it&apos;s just once a week.&quot; Make it clear nobody is in trouble.
          You want the full picture, not a cover-up.
        </p>

        <h3>4. Write down what each tool can reach (5 minutes)</h3>
        <p>
          For each tool, note what it&apos;s connected to. Can it read email?
          See customer records? Open shared files? Send anything on its own? A
          tool that only drafts text is very different from one that can send,
          pay or delete.
        </p>

        <h3>5. Decide keep, cut or check (5 minutes)</h3>
        <ul>
          <li>
            <strong>Keep</strong> tools that save real time and only touch what
            they need.
          </li>
          <li>
            <strong>Cut</strong> duplicates (three note-takers doing the same
            job) and anything nobody uses.
          </li>
          <li>
            <strong>Check</strong> anything that can send, pay, publish or
            delete without a person approving it. That&apos;s where you want a
            closer look.
          </li>
        </ul>
        <p>
          Put a reminder on the calendar to redo the list every quarter. New AI
          features keep showing up.
        </p>

        <h2>What to do with the &quot;check&quot; pile</h2>
        <p>
          Anything in the check pile deserves two questions: who owns it, and
          who approves what it does? Every AI tool that can act should have a
          named person responsible for it, and a person should approve anything
          that goes out the door or moves money.
        </p>
        <p>
          There&apos;s a deeper layer to this, like how logins are stored and
          what happens if a tool misbehaves. We cover the basics in{" "}
          <Link href="/blog/ai-security-for-ai-employees">
            AI security for AI employees
          </Link>{" "}
          and{" "}
          <Link href="/blog/nvidia-ai-agent-safety-explained">
            what NVIDIA&apos;s agent safety push means for your business
          </Link>{". For most owners, the list above is the right first step."}
        </p>

        <h2>Where StorenTech AI fits</h2>
        <p>
          Counting your AI tools is the starting point of every AI Opportunity
          Map we build for Orange County businesses. We look at what you already
          use, what overlaps, what&apos;s connected to what, and where the time
          or revenue leaks are. Then we show which AI moves pay back first, so
          you add tools on purpose instead of by accident.
        </p>
        <p>
          If you&apos;d like help with the count,{" "}
          <Link href="/opportunity">start your AI Opportunity Map</Link>.
          Curious how it works first? See <Link href="/how-it-works">how it works</Link>{" "}
          or read{" "}
          <Link href="/blog/what-is-an-automation-roi-analysis">
            how we figure out where automation pays
          </Link>{"."}
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
