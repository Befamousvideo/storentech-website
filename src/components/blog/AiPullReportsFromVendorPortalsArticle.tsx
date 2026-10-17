import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function AiPullReportsFromVendorPortalsArticle({
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
            AI can now log into a vendor or supplier website, read what&apos;s on
            the screen and pull the numbers into your report, the way a person
            would. Start with one website, keep the AI read-only, and have a
            person approve anything that changes.
          </p>
          <p>
            Somewhere in your business, someone probably has a Friday routine
            that goes like this: log into the supplier website, download the
            statement, log into the payment processor, copy the numbers, log into
            the shipping portal, check for credits, paste it all into a
            spreadsheet. Repeat next week.
          </p>
        </div>

        <p>
          Those websites don&apos;t connect to your other software. There&apos;s no
          button that sends the data where you need it. So a person does the
          clicking.
        </p>
        <p>
          That&apos;s starting to change. AI can now open a website, read
          what&apos;s on the screen and pull the numbers you need, the way a
          person would. Done carefully, it gives your team their Friday back.
        </p>
        <p>
          <strong>
            Let AI do the reading. Keep a person on the approve button.
          </strong>
        </p>

        <h2>What changed</h2>
        <p>
          Until recently, automating work like this meant a developer writing
          custom code for each website, and the code broke whenever the site
          changed its layout. Most small businesses never bothered.
        </p>
        <p>
          Newer AI tools work in a web browser more like a person does. They look
          at the page, find the right menu, and read the table. At the end of
          September, OpenAI added a &quot;computer use&quot; tool to its Agents
          API (still in beta), which lets an AI agent work inside a web browser
          that OpenAI hosts. Other AI companies offer similar abilities.
        </p>
        <p>
          That&apos;s a company announcement, not a promise that it works
          perfectly everywhere. These tools can still misread a page or get stuck
          on a login. That&apos;s why the rules below matter more than the tool
          you pick.
        </p>

        <h2>Good first jobs for AI in a portal</h2>
        <p>
          Look for work that is repetitive, mostly reading, and easy to check:
        </p>
        <ul>
          <li>
            <strong>Pulling weekly or monthly statements</strong> from supplier,
            vendor or utility websites.
          </li>
          <li>
            <strong>Checking for credits, refunds or rebates</strong> you&apos;re
            owed but haven&apos;t claimed.
          </li>
          <li>
            <strong>Comparing invoices to what you ordered</strong> and flagging
            mismatches for a person to review.
          </li>
          <li>
            <strong>Collecting order or shipment status</strong> from several
            portals into one summary.
          </li>
          <li>
            <strong>Downloading reports</strong> from software that doesn&apos;t
            share data with your other tools.
          </li>
        </ul>
        <p>
          The &quot;money found&quot; jobs are often the best place to start. A
          missed credit or a duplicate charge is real cash sitting in a portal
          nobody has time to check.
        </p>

        <h2>Four rules for doing this safely</h2>

        <h3>1. One website, one outcome</h3>
        <p>
          Don&apos;t start with &quot;automate the back office.&quot; Start with
          &quot;pull last week&apos;s statement from this one supplier and list
          any credits.&quot; Small, clear jobs are easier to check and easier to
          trust.
        </p>

        <h3>2. Read-only first</h3>
        <p>
          Begin with jobs where the AI only looks and reports. No submitting
          forms, no changing settings, no clicking &quot;pay.&quot; Get
          comfortable with what it reads before you let it touch anything.
        </p>

        <h3>3. A person approves every action</h3>
        <p>
          If a job ever moves past reading, a person approves each step that
          changes something. This matters because tool safeguards aren&apos;t
          always as tight as they sound. OpenAI&apos;s own guide says that
          approving a website for its agent does not, by itself, confirm each
          individual action on that site. Keep payments and anything you
          can&apos;t undo off the table entirely.
        </p>

        <h3>4. Measure what it finds</h3>
        <p>
          Track the hours saved and the dollars recovered, like credits found or
          errors caught. If a pilot doesn&apos;t pay for itself, stop it. If it
          does, add the next website.
        </p>
        <p>
          There&apos;s more to doing this safely, like how logins are handled and
          how to stop an agent quickly if needed. We touch on it in{" "}
          <Link href="/blog/ai-security-for-ai-employees">
            AI security for AI employees
          </Link>
          .
        </p>

        <h2>Where StorenTech AI fits</h2>
        <p>
          When we build an AI Opportunity Map for an Orange County business,
          portal chores are one of the first things we look for, because
          they&apos;re common, easy to measure and often hide money. The map
          shows which portals eat the most time, which ones likely hold unclaimed
          credits, and which AI moves pay back first. We keep people approving
          anything that changes.
        </p>
        <p>
          <Link href="/opportunity">Start your AI Opportunity Map</Link>. Or see{" "}
          <Link href="/how-it-works">how it works</Link>. If you&apos;re already
          using automation tools, our post on{" "}
          <Link href="/blog/zapier-webhooks-ai-agents">
            Zapier webhooks and AI agents
          </Link>{" "}
          covers the apps that do connect.
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
