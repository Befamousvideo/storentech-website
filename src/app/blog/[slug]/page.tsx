import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiSecurityForAiEmployeesArticle } from "@/components/blog/AiSecurityForAiEmployeesArticle";
import { AutomationRoiAnalysisArticle } from "@/components/blog/AutomationRoiAnalysisArticle";
import { StructuredData } from "@/components/StructuredData";
import { blogPosts, getPost, postPath, postUrl, type BlogPost } from "@/lib/blog";
import { site } from "@/lib/site";

function BlogArticle({ post }: { post: BlogPost }) {
  switch (post.slug) {
    case "what-is-an-automation-roi-analysis":
      return <AutomationRoiAnalysisArticle post={post} />;
    case "ai-security-for-ai-employees":
      return <AiSecurityForAiEmployeesArticle post={post} />;
    default:
      notFound();
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: { absolute: post.metaTitle },
    description: post.description,
    authors: [{ name: site.founder.name }],
    alternates: { canonical: postPath(post.slug) },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.description,
      url: postPath(post.slug),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = postUrl(post.slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "Article"],
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    author: {
      "@type": "Person",
      name: site.founder.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".blog-lead"],
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={articleLd} />
      <StructuredData data={faqLd} />
      <BlogArticle post={post} />
    </>
  );
}
