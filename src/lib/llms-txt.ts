import { blogPosts, postPath } from "@/lib/blog";
import { site } from "@/lib/site";

export const LLMS_ORIGIN = "https://www.storentechai.com";

/** Drop published fee figures so llms.txt stays free of prices. */
function withoutPrices(text: string) {
  return text
    .replace(/\s*\(\$1,000 typ\.\)/g, "")
    .replace(/\s*Starting at \$1,000\.?/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+\./g, ".")
    .trim();
}

const keyPages = [
  { title: "Home", path: "/", description: site.tagline },
  {
    title: "AI Opportunity Map",
    path: "/roia",
    description: withoutPrices(site.offer.primary),
  },
  { title: "Work", path: "/work", description: site.offer.services },
  {
    title: "How it works",
    path: "/how-it-works",
    description:
      "Paid AI Opportunity Map first: an Automation ROI Analysis of time, revenue, and risk leaks.",
  },
  {
    title: "Blog",
    path: "/blog",
    description:
      "StorenTech AI writes about the paid AI Opportunity Map and hiring an AI employee after the math — never a free sales call.",
  },
  {
    title: "About",
    path: "/about",
    description:
      "StorenTech AI is a principal-led automation firm based in Orange County, California.",
  },
  {
    title: "Contact",
    path: "/contact",
    description:
      "Start your AI Opportunity Map with StorenTech AI. Write us on the form, or talk to Sarah.",
  },
] as const;

function absoluteUrl(path: string) {
  return path === "/" ? LLMS_ORIGIN : `${LLMS_ORIGIN}${path}`;
}

export function llmsTxt() {
  const pages = keyPages
    .map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`)
    .join("\n");

  const posts = blogPosts
    .map(
      (post) =>
        `- [${post.title}](${absoluteUrl(postPath(post.slug))}): ${withoutPrices(post.description)}`,
    )
    .join("\n");

  return `# StorenTech AI

> StorenTech AI is a full-service AI agency in Orange County, CA that starts every client engagement with an AI Opportunity Map

## Pages

${pages}

## Blog

${posts}
`;
}
