import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const CLIO_INTAKE_URL =
  "https://www.clio.com/guides/client-intake-legal-trends/";

export function LawFirmCaseStatusUpdatesArticle({
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
            When existing clients keep calling to ask &quot;What&apos;s
            happening with my case?&quot;, the first fix is usually not a new
            tool. It is a simple, regular update the client can count on,
            written in plain language and approved by someone at the firm. AI
            can help draft those updates from the matter file, and it can
            answer the phone and log the question. A person at the firm should
            still review every update before it goes to a client. This post is
            an owner&apos;s guide, not legal advice.
          </p>
          <p>
            <strong>
              Most status calls are not really about new information. They are
              about not knowing when the client will hear from you next.
            </strong>
          </p>
        </div>

        <h2>Why the calls keep coming</h2>
        <p>
          Clients call for updates when they do not know what happens next or
          when.{" "}
          <a
            href={CLIO_INTAKE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Clio&apos;s 2024 secret-shop study of 500 law firms
          </a>{" "}
          looked at potential clients rather than existing ones, but it points
          at the same gap. In phone conversations, Clio found that &quot;only
          36% could explain the process and next steps.&quot; Clio also wrote:
          &quot;When shoppers were able to connect with a law firm, 73% of
          them were unlikely to recommend the ones they spoke with.&quot;
          Those are Clio&apos;s findings from that study, not StorenTech&apos;s.
        </p>
        <p>
          If a potential client hears little about next steps on the first
          call, it is not surprising that an existing client keeps calling
          later.
        </p>
        <p>
          Each status call pulls a paralegal or attorney away from billable
          work, and the answer is often the same: &quot;Nothing new yet. We
          are waiting on the other side.&quot;
        </p>

        <h2>What to try first, before any AI</h2>
        <p>Start with habits that cut the number of calls:</p>
        <ul>
          <li>
            Set an update rhythm. Tell each client when they will hear from
            you, for example every two weeks, and after any court date or
            filing.
          </li>
          <li>
            Explain the next step and a rough time frame. Even &quot;We expect
            a response in about three weeks&quot; heads off several calls.
          </li>
          <li>
            Use one channel the client prefers. Email, text or a client
            portal, whichever they will actually read.
          </li>
          <li>
            Write a short template. Current stage, what happened since the
            last update, what happens next and who to contact.
          </li>
        </ul>
        <p>
          The goal is that the client already knows the answer before they
          think to call, even when nothing new has happened in the case.
        </p>

        <h2>Where AI can help, with a person in charge</h2>
        <p>Once the rhythm is set, AI can take on the repetitive parts:</p>
        <ul>
          <li>
            Drafting updates. An AI assistant can read the matter notes and
            draft a plain-language update in your template. A paralegal or
            attorney reviews, edits and sends it.
          </li>
          <li>
            Answering status calls. An AI phone line can pick up, confirm who
            is calling, log the question and tell the client when to expect a
            reply from a person.
          </li>
          <li>
            Sharing only approved fields. Some firms choose a short list of
            facts that can be shared without review, such as the date of the
            next hearing already on the calendar. Anything beyond that list
            goes to a person.
          </li>
        </ul>
        <p>
          What we would not suggest is an AI tool that sends updates to
          clients on its own, unreviewed. The State Bar of California&apos;s
          guidance on generative AI talks about supervision and safeguards
          when AI tools act on a firm&apos;s behalf. We summarized that
          guidance in an earlier post,{" "}
          <Link href="/blog/california-law-firm-ai-receptionist">
            Can a California Law Firm Use an AI Receptionist?
          </Link>{" "}
          Read the guidance yourself and talk with your own ethics counsel
          before changing how you talk with clients.
        </p>
        <p>
          <strong>
            StorenTech AI helps Orange County law firms cut down on status
            calls with drafted case updates and AI phone coverage, while a
            person at the firm reviews every update before it reaches a
            client.
          </strong>
        </p>

        <h2>How this connects to after-hours calls</h2>
        <p>
          Status calls and new-client calls often land on the same phone line.
          If you read our post on{" "}
          <Link href="/blog/law-firm-missed-calls">
            what happens when a potential client calls after hours
          </Link>, the same idea applies here: answer, capture the basics, route to
          the right person and follow up. The difference is that existing
          clients need a consistent update rhythm, not only a quick callback.
        </p>

        <h2>A two-week test you can run</h2>
        <p>
          Pick ten active matters where clients call often. For two weeks:
        </p>
        <ul>
          <li>
            Send each client a short update on a set day, using one template.
          </li>
          <li>Have a person review every update before it goes out.</li>
          <li>
            Count status calls from those clients before and during the test.
          </li>
        </ul>
        <p>
          If calls drop, you have your answer about rhythm. If they do not,
          look at what clients are still asking. That tells you which fields
          belong in the template.
        </p>

        <h2>Next step</h2>
        <p>
          If status calls are eating your team&apos;s week,{" "}
          <Link href="/opportunity">start with an AI Opportunity Map</Link>.
          It looks at where client questions come in, what your
          practice-management software can already do and where drafted
          updates or AI phone coverage would help.
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
