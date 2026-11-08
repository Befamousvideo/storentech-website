import Link from "next/link";
import { postPath, type BlogPost } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: readonly BlogPost[] }) {
  if (posts.length < 2) return null;

  return (
    <section className="section related-posts" aria-labelledby="related-posts-heading">
      <div className="wrap-narrow">
        <h2 id="related-posts-heading">Related posts</h2>
        <ul className="related-posts-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={postPath(post.slug)}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
