import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata } from "@/app/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { AiSortsLeadsServiceRequestsArticle } from "@/components/blog/AiSortsLeadsServiceRequestsArticle";
import {
  aiSortsLeadsServiceRequestsFaqs,
  blogPosts,
  getPost,
  postPath,
  postUrl,
} from "@/lib/blog";
import { site } from "@/lib/site";

const slug = "ai-sorts-leads-service-requests";
const post = getPost(slug);

const articleSource = readFileSync(
  join(process.cwd(), "src/components/blog/AiSortsLeadsServiceRequestsArticle.tsx"),
  "utf8",
);
const llmsSource = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

const phonePattern = /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const title =
  "AI Can Sort Your Leads and Service Requests in Seconds. Here's Where a Person Should Still Decide.";
const description =
  "AI can now sort leads and service requests almost instantly. Here's what to let it sort, and the decisions a person in your business should still make.";

describe("AI sorts leads and service requests blog post", () => {
  it("is registered first with the approved slug, title, meta, date, and five FAQs", () => {
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe(title);
    expect(post?.metaTitle).toBe(
      "AI Can Sort Your Leads and Service Requests | StorenTech AI",
    );
    expect(post?.description).toBe(description);
    expect(post?.description.length).toBeLessThanOrEqual(155);
    expect(post?.datePublished).toBe("2026-10-26");
    expect(post?.faqs).toEqual(aiSortsLeadsServiceRequestsFaqs);
    expect(post?.faqs).toHaveLength(5);
    expect(blogPosts[2]?.slug).toBe(slug);
    expect(postPath(slug)).toBe("/blog/ai-sorts-leads-service-requests");
    expect(post?.hero).toBeUndefined();
  });

  it("appears on the blog index, in llms.txt, and in the sitemap", () => {
    const index = render(<BlogIndexPage />);
    const indexHtml = index.container.innerHTML;
    expect(indexHtml).toContain('href="/blog/ai-sorts-leads-service-requests"');
    expect(indexHtml).toContain(title);
    expect(indexHtml).toContain(description);
    expect(indexHtml).toContain('datetime="2026-10-26"');
    index.unmount();

    expect(llmsSource).toContain(
      "https://www.storentechai.com/blog/ai-sorts-leads-service-requests",
    );
    expect(llmsSource.indexOf(slug)).toBeLessThan(
      llmsSource.indexOf("ai-voice-agent-small-business"),
    );

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${site.url}/blog/ai-sorts-leads-service-requests`);
    expect(urls).toContain(postUrl(slug));

    const entry = sitemap().find((item) => item.url.endsWith(`/blog/${slug}`));
    expect(entry?.lastModified).toEqual(new Date("2026-10-26"));
  });

  it("sets canonical, title, and description without a hero image", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.title).toEqual({ absolute: post?.metaTitle });
    expect(metadata.description).toBe(description);
    expect(metadata.alternates).toEqual({
      canonical: "/blog/ai-sorts-leads-service-requests",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: post?.metaTitle,
      description,
      url: "/blog/ai-sorts-leads-service-requests",
    });
    expect(metadata.openGraph).not.toHaveProperty("images");
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: post?.metaTitle,
      description,
    });
  });

  it("builds Article and FAQPage JSON-LD from the post", async () => {
    const page = await BlogPostPage({
      params: Promise.resolve({ slug }),
    });
    const { container } = render(page);
    const blocks = [
      ...container.querySelectorAll('script[type="application/ld+json"]'),
    ].map((node) => JSON.parse(node.textContent ?? "{}") as Record<string, unknown>);

    const article = blocks.find((block) => {
      const type = block["@type"];
      return (
        Array.isArray(type) &&
        type.includes("BlogPosting") &&
        type.includes("Article")
      );
    });
    const faq = blocks.find((block) => block["@type"] === "FAQPage");

    expect(article).toMatchObject({
      headline: title,
      description,
      datePublished: "2026-10-26",
      dateModified: "2026-10-26",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl(slug),
      },
      url: postUrl(slug),
      author: { "@type": "Person", name: site.founder.name },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
    });
    expect(article).not.toHaveProperty("image");

    const mainEntity = faq?.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(mainEntity).toHaveLength(5);
    expect(mainEntity.map((item) => item.name)).toEqual(
      aiSortsLeadsServiceRequestsFaqs.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      aiSortsLeadsServiceRequestsFaqs.map((item) => item.answer),
    );

    const encoded = JSON.stringify(blocks);
    expect(encoded).not.toContain("tel:");
    expect(encoded).not.toContain("mailto:");
    expect(encoded).not.toMatch(/HowTo/);
    expect(encoded).not.toMatch(emailPattern);
    expect(encoded).not.toMatch(phonePattern);
    expect(encoded).not.toContain("https\\:");
  });

  it("keeps draft notes, contact details, and escaped links out of the article", () => {
    expect(articleSource).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion|Vincent/,
    );
    expect(articleSource).not.toContain("<!--");
    expect(articleSource).not.toContain("tel:");
    expect(articleSource).not.toContain("mailto:");
    expect(articleSource).not.toContain("https\\:");
    expect(articleSource).not.toMatch(emailPattern);
    expect(articleSource).not.toMatch(phonePattern);
    expect(articleSource).toContain(
      "https://developers.openai.com/api/docs/guides/decisions",
    );
    expect(articleSource).toContain('href="/opportunity"');
  });

  it("renders the approved body and opportunity CTA", () => {
    expect(post).toBeDefined();
    const { container, getByRole } = render(
      <AiSortsLeadsServiceRequestsArticle post={post!} />,
    );
    const html = container.innerHTML;
    const text = (container.textContent ?? "").replace(/\s+/g, " ");

    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(text).toContain(
      "AI can now read a new lead, email or service request and sort it almost instantly: what kind of job it is, how urgent it is, and who should handle it. Let AI do the sorting. Keep a person on the decisions that cost money, affect someone's job, health or credit, or involve an upset customer, and on anything the AI isn't sure about.",
    );
    expect(text).toContain(
      "That split gets you the speed without handing your judgment to software.",
    );
    expect(text).toContain(
      "AI should sort the pile. People should make the calls that matter.",
    );
    expect(text).toContain("What changed this month");
    expect(text).toContain(
      "On Oct. 6, OpenAI released a tool for developers called the Decisions API, and on Oct. 22 it moved from test mode to general availability. It doesn't write emails or chat. It answers narrow questions about a piece of text or a photo and returns a short, structured answer.",
    );
    expect(text).toContain(
      "According to OpenAI's guide, it can give three kinds of answers:",
    );
    expect(text).toContain(
      "A likelihood, such as how likely it is that a photo shows visible damage",
    );
    expect(text).toContain(
      "A pick from a fixed list, such as which department should handle a complaint",
    );
    expect(text).toContain(
      "A score on a scale you define, such as how severe an issue is",
    );
    expect(text).toContain(
      "OpenAI says the tool is built to be faster and lower-cost than its general chat-style option. Treat that as the company's claim; your own results will depend on your setup.",
    );
    expect(text).toContain(
      "You don't need to know any of the technical details. What matters is that sorting by AI is becoming quick and inexpensive enough for everyday small-business work.",
    );
    expect(text).toContain("What AI sorting looks like in a small business");
    expect(text).toContain(
      "Web leads. Is this a real buyer, a job seeker, a vendor pitch or spam? Is it in your service area?",
    );
    expect(text).toContain(
      "Service requests. Is it an emergency, a routine repair or a quote request? Which crew or person should get it?",
    );
    expect(text).toContain(
      "Emails to a shared inbox. Billing question, scheduling change, complaint or something else?",
    );
    expect(text).toContain(
      "Photos from customers. Does the picture show the problem they described?",
    );
    expect(text).toContain(
      "Today someone on your team reads each one, decides what it is and passes it along. AI can do that first read and put each item in the right line, so your people start with the work instead of the sorting.",
    );
    expect(text).toContain(
      "For an Orange County contractor, clinic or property manager, that can mean an urgent request reaches the right person while the routine ones wait their turn.",
    );
    expect(text).toContain("Where a person should still decide");
    expect(text).toContain(
      "Sorting is low-risk. Deciding is not. Keep a person in charge of:",
    );
    expect(text).toContain(
      "Anything that costs or refunds money. Discounts, refunds, credits and pricing exceptions.",
    );
    expect(text).toContain(
      "Anything that says no to someone. Turning down a customer, a claim or an applicant.",
    );
    expect(text).toContain(
      "Hiring, lending, medical and legal matters. These carry real consequences and rules. AI can route the paperwork; a qualified person makes the call.",
    );
    expect(text).toContain(
      "Upset customers. AI can flag the angry email. A person should answer it.",
    );
    expect(text).toContain(
      "Anything the AI isn't sure about. More on that below.",
    );
    expect(text).toContain(
      "A simple test: if a wrong answer would embarrass you, cost you a customer or create legal exposure, a person decides.",
    );
    expect(text).toContain('Set a "not sure" line');
    expect(text).toContain(
      "Good AI sorting doesn't just give an answer. It tells you how confident it is. OpenAI's own guide recommends using labeled examples from your business to set the confidence levels for routing or review, based on what a wrong answer would cost.",
    );
    expect(text).toContain("In plain English:");
    expect(text).toContain(
      "Pick a cutoff. Above it, the AI sorts the item on its own. Below it, a person looks first.",
    );
    expect(text).toContain(
      'Add an "other" bucket. OpenAI suggests a fallback option for anything that doesn\'t fit your categories, sent to a general review queue. That keeps odd requests from being forced into the wrong line.',
    );
    expect(text).toContain(
      "Watch the misses that are hard to see. The most costly mistake is the good lead that gets sorted as spam. Spot-check what the AI threw out, not just what it kept.",
    );
    expect(text).toContain(
      "Start strict. Send more items to a person in the first few weeks, then relax the cutoff as you see where the AI is reliable.",
    );
    expect(text).toContain("How to try it without risk");
    expect(text).toContain(
      "You don't need to automate everything at once. A careful first step looks like this:",
    );
    expect(text).toContain(
      "Pick one inbox or form. The one that eats the most time.",
    );
    expect(text).toContain(
      "Write down your categories. Use the ones your team already uses out loud.",
    );
    expect(text).toContain(
      "Run it side by side. Let the AI sort while your team keeps working the old way. Compare the two for a couple of weeks.",
    );
    expect(text).toContain(
      'Turn it on for the easy cases only. Keep people on everything below your "not sure" line.',
    );
    expect(text).toContain(
      "Check monthly. Look at what got sorted where, and fix categories that keep causing confusion.",
    );
    expect(text).toContain(
      "At StorenTech AI, we use AI to clear the sorting so your people can spend their time on the decisions only they should make.",
    );
    expect(text).toContain(
      "Keep the security side simple at first: decide who can see the messages the AI reads, and where that data goes. Ask whoever sets it up to explain both in plain English.",
    );
    expect(text).toContain("Find your best place to start");
    expect(text).toContain(
      "If you're not sure which inbox, form or request queue would benefit most, start your AI Opportunity Map. We look at where your team's time actually goes and recommend where AI sorting would help, and where a person should stay in charge.",
    );

    expect(html).toContain(
      'href="https://developers.openai.com/api/docs/guides/decisions"',
    );
    expect(html).not.toContain("https\\:");
    const cta = container.querySelector("a.btn-solid");
    expect(cta).toHaveAttribute("href", "/opportunity");
    expect(cta).toHaveTextContent("Start your AI Opportunity Map");

    expect(html).not.toContain("tel:");
    expect(html).not.toContain("mailto:");
    expect(html).not.toMatch(emailPattern);
    expect(html).not.toMatch(phonePattern);
    expect(text).not.toMatch(
      /DRAFT|Tony Traffic|Mary Marketer|DO NOT PUBLISH|Notion Tasks|Vincent/,
    );

    for (const item of aiSortsLeadsServiceRequestsFaqs) {
      expect(text).toContain(item.question);
      expect(text).toContain(item.answer);
    }
  });
});
