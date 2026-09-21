import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, postPath } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "StorenTech AI writes about the paid Automation ROI Analysis and hiring an AI employee after the math — never a free sales call.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Blog</p>
          <h1>Hire after the math.</h1>
          <hr className="rule" />
          <p className="lede">
            Notes from a full-service AI agency. Every client starts with a paid
            Automation ROI Analysis — never a complimentary audit.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "0.5rem" }}>
        <div className="wrap blog-index">
          {blogPosts.map((post) => (
            <article className="blog-index-card" key={post.slug}>
              <p className="kicker">
                <time dateTime={post.datePublished}>{post.datePublished}</time>
              </p>
              <h2>
                <Link href={postPath(post.slug)}>{post.title}</Link>
              </h2>
              <p>{post.description}</p>
              <p>
                <Link href={postPath(post.slug)}>
                  {post.indexCta ?? "Read the analysis"}
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
