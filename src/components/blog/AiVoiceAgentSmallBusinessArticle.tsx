import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function AiVoiceAgentSmallBusinessArticle({ post }: { post: BlogPost }) {
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
            An AI voice agent can answer every call to your business, book the
            appointment on the spot and handle the sales questions callers ask
            before they buy. Your team still owns the customer and approves
            anything that matters, so the voice agent fills your calendar while
            your people do the work only people can do.
          </p>
          <p>
            Most owners picture an AI receptionist as a polite answering
            machine. It can be much more than that, and for contractors and
            field service businesses, the booking and selling part is where it
            earns its keep.
          </p>
          <p>
            <strong>
              A voice agent that knows your business and never runs out of
              patience turns missed calls into booked jobs.
            </strong>
          </p>
        </div>

        <figure className="blog-video">
          <video
            controls
            playsInline
            muted
            preload="metadata"
            poster="/blog/ai-voice-agent-small-business.webp"
            width={1080}
            height={1080}
            style={{ width: "100%", height: "auto", aspectRatio: "1 / 1" }}
            aria-label="Short video: how an AI voice agent answers for a small business"
          >
            <source src="/videos/ai-voice-agent-small-business.mp4" type="video/mp4" />
          </video>
          <figcaption>
            Watch: how an AI voice agent answers for a small business (22 sec).
          </figcaption>
        </figure>

        <h2>The problem: the phone rings when nobody can answer</h2>
        <p>
          Think about a roofing contractor in Orange County. The owner is on a
          roof. The crew is on another job. The office manager is on another
          line. A homeowner with a leak calls, gets voicemail and calls the next
          roofer on the list.
        </p>
        <p>
          Or a plumbing and HVAC company on a hot Saturday. Calls come in faster
          than anyone can pick up, and after-hours calls go straight to a
          message most people never leave.
        </p>
        <p>
          Every one of those calls was someone ready to hire you. A voice agent
          picks up all of them, day or night, on the first ring.
        </p>

        <h2>Booking: from &quot;Can someone come out?&quot; to a confirmed time</h2>
        <p>
          Here&apos;s what most owners don&apos;t know: a voice agent
          doesn&apos;t just take a message. It can book the job.
        </p>
        <p>
          When a caller says, &quot;My AC stopped working, can someone come
          out?&quot;, a well-set-up voice agent can:
        </p>
        <ul>
          <li>
            Ask the questions your dispatcher would ask: address, what&apos;s
            happening, how urgent it is
          </li>
          <li>Check your real calendar for open slots</li>
          <li>Offer times and confirm one with the caller</li>
          <li>Send a confirmation text with the appointment details</li>
          <li>Put the job and the notes in front of your team</li>
        </ul>
        <p>
          For a remodeler, it might book an in-home estimate. For a pest control
          company, a recurring service visit. For an electrician, it can sort an
          emergency from a routine request and route the emergency to the
          on-call tech right away.
        </p>
        <p>
          The caller gets an answer and a time. Your team gets a booked job
          instead of a voicemail to return.
        </p>

        <h2>Selling: answering the questions buyers ask before they say yes</h2>
        <p>
          The second thing owners don&apos;t expect is that a voice agent can
          help sell.
        </p>
        <p>
          Callers ask the same questions before they commit. Do you service my
          city? Do you handle this kind of job? Are you licensed? How soon can
          you come? What happens at the estimate? Do you offer financing?
        </p>
        <p>
          A voice agent that&apos;s been taught your business answers those
          questions the same way, every time, with your service area, your
          process and your policies. It can explain the difference between a
          repair and a replacement in plain words, describe what&apos;s included
          in a service visit and suggest the right next step, like an in-home
          estimate.
        </p>
        <p>
          And it doesn&apos;t get tired. The fifteenth &quot;Do you work in
          Irvine?&quot; of the day gets the same friendly answer as the first.
          It never rushes a caller who wants to talk through their options, and
          it never sounds annoyed at 9 p.m.
        </p>
        <p>
          What it should not do is make promises your team hasn&apos;t approved.
          Custom quotes, discounts and anything unusual go to a person.
        </p>

        <h2>Your team still owns the customer</h2>
        <p>
          A voice agent works for your team, not instead of it. The setup we
          recommend:
        </p>
        <ul>
          <li>
            <strong>The agent handles the routine:</strong> answering, booking,
            common questions, confirmations.
          </li>
          <li>
            <strong>Your people handle the relationship:</strong> quotes,
            special requests, upset customers and the actual work.
          </li>
          <li>
            <strong>A person approves anything that matters:</strong> a custom
            price, a schedule change for a big job, an exception to policy.
          </li>
          <li>
            <strong>Easy handoff:</strong> callers can ask for a person, and the
            agent passes along the details so nobody has to repeat themselves.
          </li>
        </ul>
        <p>
          The result is a business that always answers, with the people who know
          the work still in charge of every customer.
        </p>

        <h2>What about website chat?</h2>
        <p>
          The same idea works in the chat box on your website. A chat assistant
          can answer questions and book appointments for visitors who prefer
          typing. But for most contractors and field service companies, the
          phone is where the jobs come from, so it usually makes sense to start
          there.
        </p>

        <h2>How to know if a voice agent fits your business</h2>
        <p>A voice agent is worth a look if:</p>
        <ul>
          <li>You miss calls during the workday or after hours</li>
          <li>Your office spends hours on the phone booking and rescheduling</li>
          <li>Callers ask the same handful of questions over and over</li>
          <li>You lose jobs to whoever picks up first</li>
        </ul>
        <p>
          Start small. Pick one job for the agent, like answering after-hours
          calls and booking estimates. Watch the calls, listen to recordings,
          adjust what it says, and expand once you trust it.
        </p>
        <p>
          <strong>
            At StorenTech AI, we think the best AI receptionist is the one your
            customers remember as helpful, not as a robot.
          </strong>
        </p>

        <h2>Start with a map</h2>
        <p>
          Not sure whether a voice agent is the right first step?{" "}
          <Link href="/opportunity">Start your AI Opportunity Map</Link>. We
          look at where your calls, time and missed jobs actually go, then
          recommend the first AI job worth doing.
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
