import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const GEMINI_CHANGELOG_URL =
  "https://ai.google.dev/gemini-api/docs/changelog";

export function LawFirmAiDataStorageCheckArticle({
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
        {hero?.png ? (
          <figure className="blog-hero-media">
            <img
              src={hero.png}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              fetchPriority="high"
            />
          </figure>
        ) : null}
      </header>

      <div className="wrap-narrow blog-prose">
        <div className="blog-lead">
          <p>
            Before your Orange County law firm sends client, caller or employee
            details into any new AI tool, find out three things: where your
            prompts and uploads are stored, who can open those records, and
            which storage settings are switched on by default. Some tools keep
            a copy of what you send unless someone turns that off. A short
            check before the first real file goes in is much easier than
            cleaning up later. This post is a plain-English owner checklist,
            not legal advice. Your own ethics counsel decides what may leave
            the firm.
          </p>
          <p>
            <strong>
              The question is not only &quot;Is this AI tool smart?&quot; It is
              &quot;Where does our client information go after we hit send, and
              who decided that?&quot;
            </strong>
          </p>
        </div>

        <h2>Why this matters right now</h2>
        <p>
          Storage defaults change, and they do not always change in the
          direction owners expect.
        </p>
        <p>
          One recent example comes from Google. In its{" "}
          <a
            href={GEMINI_CHANGELOG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Gemini API changelog
          </a>{" "}
          on October 26, 2026, Google wrote: &quot;New projects using the
          Generate Content API (generateContent, streamGenerateContent, and
          batchGenerateContent) on the paid tier now store requests by default
          (store=true), matching the Interactions API. Existing projects keep
          their current setting. To opt out, set store=false on individual
          requests or turn off Generate Content API logging in the Settings
          panel of the Logs and Datasets dashboard.&quot;
        </p>
        <p>
          That is Google&apos;s own description of its product, not a
          StorenTech test. The point for a law firm is simple: if a developer
          or vendor starts a new project on that service, requests may be
          stored unless someone opts out. Your firm may never see that
          setting, because it lives in a developer dashboard, not in the
          screen your staff uses.
        </p>
        <p>
          Google is just one example. Other AI services can also keep logs,
          conversation history or uploaded files, and the setting is often
          decided by whoever set the tool up.
        </p>

        <h2>What &quot;storage&quot; actually means in an AI tool</h2>
        <p>
          When owners hear &quot;the AI stores data,&quot; they often picture
          one thing. In practice there are usually several places information
          can sit:
        </p>
        <ul>
          <li>
            Prompts and replies. The text your staff types and what the tool
            sends back.
          </li>
          <li>
            Uploaded files. Intake forms, PDFs, emails or spreadsheets someone
            drags into the tool.
          </li>
          <li>
            Logs. Records the vendor or developer keeps for troubleshooting or
            review.
          </li>
          <li>
            Call recordings and transcripts. If the tool answers phones or
            joins meetings.
          </li>
          <li>
            Copies in connected apps. Notes pushed into your
            practice-management system, email or a shared drive.
          </li>
        </ul>
        <p>
          Each of these can have its own setting, its own retention period and
          its own list of people who can open it.
        </p>

        <h2>Six questions to ask before client data goes in</h2>
        <p>
          Ask these before the tool touches a real matter. Write the answers
          down.
        </p>
        <ul>
          <li>
            Is storage on by default, and who can change it? Ask whether
            prompts, uploads and logs are kept, and whether that default
            applies to new projects or accounts. Find out who on your side, or
            the vendor&apos;s side, controls the switch.
          </li>
          <li>
            Where is it stored, and for how long? Get a plain answer on
            retention. &quot;We keep it for a while&quot; is not an answer.
            Ask whether the vendor keeps a short-term copy (for example for
            abuse monitoring) even when storage is turned off.
          </li>
          <li>
            Who can open it? List the people at the vendor, at any developer
            you hired and inside your firm who can read stored conversations
            or recordings.
          </li>
          <li>
            Whose account is it? The account that holds your data should
            belong to the firm, not to a freelancer or a staff member&apos;s
            personal login. If that person leaves, the data and the settings
            should stay with you. Turn on two-step sign-in for the account
            that holds client data. Personal or unpaid versions of AI tools
            often have different defaults than business plans, so staff
            shouldn&apos;t use personal logins for firm work.
          </li>
          <li>
            What happens when we stop using it? Ask how to export what you
            need and how to have the rest deleted. Get deletion confirmed in
            writing.
          </li>
          <li>
            Is our data used to train or improve the vendor&apos;s AI, and is
            that on by default? Get the answer in writing.
          </li>
        </ul>
        <p>
          If a vendor cannot answer these clearly, that is useful information
          too.
        </p>

        <h2>Start with test data, not a real client file</h2>
        <p>
          A safe habit is to try any new AI tool with made-up information
          first. Use a fake name, a fake phone number and a sample matter
          description. Check where that test record shows up afterward: in the
          tool&apos;s history, in a log, in an email, in your
          practice-management system.
        </p>
        <p>
          Once you can see the whole path a test record travels, you can
          decide with your lawyers what real information, if any, belongs in
          that tool. Keep a person in charge of that decision.
        </p>

        <h2>Keep the check simple and repeat it</h2>
        <p>
          You do not need a long policy document to start. A one-page sheet
          per tool works:
        </p>
        <ul>
          <li>Tool name and what it is used for</li>
          <li>Who set it up and whose account it lives in</li>
          <li>
            Storage and logging settings, with the date someone last checked
            them
          </li>
          <li>Who can open stored data</li>
          <li>How to export or delete</li>
        </ul>
        <p>
          Look at that sheet again whenever the tool adds a feature, changes
          plans or gets a new setup from a developer. Defaults can change on
          new projects even when old ones stay the same, as Google&apos;s
          changelog shows.
        </p>
        <p>
          <strong>
            StorenTech AI can help Orange County law firms map where client
            information goes in each AI tool before anything goes live, so
            owners and their lawyers can decide what stays inside the firm.
          </strong>
        </p>
        <p>
          Security details beyond that are a conversation, not a blog post.
          The short version for owners: know your defaults, know who can see
          the data and keep the account in the firm&apos;s name.
        </p>

        <h2>Next step</h2>
        <p>
          If you are weighing AI intake, AI drafting or any new tool that will
          see client information,{" "}
          <Link href="/opportunity">start with an AI Opportunity Map</Link>.
          It lists the tools you already use, where information flows between
          them and which settings someone at the firm should own.
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
