import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiAgentCostControlsArticle } from "@/components/blog/AiAgentCostControlsArticle";
import { AiSecurityForAiEmployeesArticle } from "@/components/blog/AiSecurityForAiEmployeesArticle";
import { AiToolCleanupChecklistArticle } from "@/components/blog/AiToolCleanupChecklistArticle";
import { AutomationRoiAnalysisArticle } from "@/components/blog/AutomationRoiAnalysisArticle";
import { MastermindHybridAiArticle } from "@/components/blog/MastermindHybridAiArticle";
import { NvidiaAiAgentSafetyArticle } from "@/components/blog/NvidiaAiAgentSafetyArticle";
import { ZapierWebhooksAiAgentsArticle } from "@/components/blog/ZapierWebhooksAiAgentsArticle";
import { AiModelRetirementNov30BusinessChecklistArticle } from "@/components/blog/AiModelRetirementNov30BusinessChecklistArticle";
import { WhenAiAgentsDontStopArticle } from "@/components/blog/WhenAiAgentsDontStopArticle";
import { AiPullReportsFromVendorPortalsArticle } from "@/components/blog/AiPullReportsFromVendorPortalsArticle";
import { WhatShouldYourBusinessAiBeAllowedToDoArticle } from "@/components/blog/WhatShouldYourBusinessAiBeAllowedToDoArticle";
import { StructuredData } from "@/components/StructuredData";
import { blogPosts, getPost, postPath, postUrl, type BlogPost } from "@/lib/blog";
import { site } from "@/lib/site";

function BlogArticle({ post }: { post: BlogPost }) {
  switch (post.slug) {
    case "what-should-your-business-ai-be-allowed-to-do":
      return <WhatShouldYourBusinessAiBeAllowedToDoArticle post={post} />;
    case "ai-pull-reports-from-vendor-portals":
      return <AiPullReportsFromVendorPortalsArticle post={post} />;
    case "ai-model-retirement-nov-30-business-checklist":
      return <AiModelRetirementNov30BusinessChecklistArticle post={post} />;
    case "when-ai-agents-dont-stop":
      return <WhenAiAgentsDontStopArticle post={post} />;
    case "ai-tool-cleanup-checklist":
      return <AiToolCleanupChecklistArticle post={post} />;
    case "ai-agent-cost-controls":
      return <AiAgentCostControlsArticle post={post} />;
    case "nvidia-ai-agent-safety-explained":
      return <NvidiaAiAgentSafetyArticle post={post} />;
    case "zapier-webhooks-ai-agents":
      return <ZapierWebhooksAiAgentsArticle post={post} />;
    case "what-is-an-automation-roi-analysis":
      return <AutomationRoiAnalysisArticle post={post} />;
    case "ai-security-for-ai-employees":
      return <AiSecurityForAiEmployeesArticle post={post} />;
    case "mastermind-hybrid-ai":
      return <MastermindHybridAiArticle post={post} />;
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

  const images = post.hero
    ? [
        {
          url: post.hero.webp,
          width: post.hero.width,
          height: post.hero.height,
          alt: post.hero.alt,
          type: "image/webp",
        },
        {
          url: post.hero.avif,
          width: post.hero.width,
          height: post.hero.height,
          alt: post.hero.alt,
          type: "image/avif",
        },
      ]
    : undefined;

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
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
      ...(images ? { images } : {}),
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
    ...(post.hero
      ? {
          image: {
            "@type": "ImageObject",
            url: `${site.url}${post.hero.webp}`,
            width: post.hero.width,
            height: post.hero.height,
          },
        }
      : {}),
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
