export const INTERVIEW_ROLES = ["ceo", "cfo", "ops"] as const;

export type InterviewRole = (typeof INTERVIEW_ROLES)[number];

export const INTERVIEW_PATHS = INTERVIEW_ROLES.map((role) => `/${role}`);

export const INTERVIEW_ROBOTS_TAG =
  "noindex, nofollow, noarchive, nosnippet, noimageindex";

/** Named crawlers that get an explicit robots.txt Disallow for the interview paths. */
export const INTERVIEW_CRAWLER_AGENTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "Applebot-Extended",
  "meta-externalagent",
] as const;

export function isInterviewPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return INTERVIEW_PATHS.includes(pathname);
}

export function isInterviewRole(value: string): value is InterviewRole {
  return INTERVIEW_ROLES.includes(value as InterviewRole);
}
