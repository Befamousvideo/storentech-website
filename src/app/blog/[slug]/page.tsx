import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfficeProceduresAiInstructionsArticle } from "@/components/blog/OfficeProceduresAiInstructionsArticle";
import { CaliforniaLawFirmAiReceptionistArticle } from "@/components/blog/CaliforniaLawFirmAiReceptionistArticle";
import { LawFirmMissedCallsArticle } from "@/components/blog/LawFirmMissedCallsArticle";
import { QuestionsBeforeHiringAiDeveloperArticle } from "@/components/blog/QuestionsBeforeHiringAiDeveloperArticle";
import { AiPhoneAgentChangedOvernightArticle } from "@/components/blog/AiPhoneAgentChangedOvernightArticle";
import { AfterHoursCallsContractorsArticle } from "@/components/blog/AfterHoursCallsContractorsArticle";
import { PickFirstAiProjectArticle } from "@/components/blog/PickFirstAiProjectArticle";
import { MonthlyAutomationCheckUpArticle } from "@/components/blog/MonthlyAutomationCheckUpArticle";
import { HuggingFaceGithubExplainedArticle } from "@/components/blog/HuggingFaceGithubExplainedArticle";
import { AiSortsLeadsServiceRequestsArticle } from "@/components/blog/AiSortsLeadsServiceRequestsArticle";
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
import { AiVoiceAgentSmallBusinessArticle } from "@/components/blog/AiVoiceAgentSmallBusinessArticle";
import { WhatShouldYourBusinessAiBeAllowedToDoArticle } from "@/components/blog/WhatShouldYourBusinessAiBeAllowedToDoArticle";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { StructuredData } from "@/components/StructuredData";
import {
  blogJsonLdDate,
  blogPosts,
  getPost,
  postPath,
  postUrl,
  type BlogPost,
} from "@/lib/blog";
import {
  blogPostJsonLdImage,
  blogPostOgImages,
  relatedPostsFor,
} from "@/lib/seo";
import { site } from "@/lib/site";

function BlogArticle({ post }: { post: BlogPost }) {
  switch (post.slug) {
    case "office-procedures-ai-instructions":
      return <OfficeProceduresAiInstructionsArticle post={post} />;
    case "california-law-firm-ai-receptionist":
      return <CaliforniaLawFirmAiReceptionistArticle post={post} />;
    case "law-firm-missed-calls":
      return <LawFirmMissedCallsArticle post={post} />;
    case "questions-before-hiring-ai-developer":
      return <QuestionsBeforeHiringAiDeveloperArticle post={post} />;
    case "ai-phone-agent-changed-overnight":
      return <AiPhoneAgentChangedOvernightArticle post={post} />;
    case "after-hours-calls-contractors":
      return <AfterHoursCallsContractorsArticle post={post} />;
    case "pick-first-ai-project":
      return <PickFirstAiProjectArticle post={post} />;
    case "hugging-face-github-explained":
      return <HuggingFaceGithubExplainedArticle post={post} />;
    case "ai-sorts-leads-service-requests":
      return <AiSortsLeadsServiceRequestsArticle post={post} />;
    case "monthly-automation-check-up":
      return <MonthlyAutomationCheckUpArticle post={post} />;
    case "ai-voice-agent-small-business":
      return <AiVoiceAgentSmallBusinessArticle post={post} />;
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

  const images = blogPostOgImages(post);

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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = postUrl(post.slug);
  const published = blogJsonLdDate(post.datePublished);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "Article"],
    headline: post.title,
    description: post.description,
    datePublished: published,
    dateModified: published,
    image: blogPostJsonLdImage(post),
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
      <RelatedPosts posts={relatedPostsFor(post.slug)} />
    </>
  );
}
