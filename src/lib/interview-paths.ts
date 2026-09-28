export const INTERVIEW_ROLES = ["ceo", "cfo", "ops"] as const;

export type InterviewRole = (typeof INTERVIEW_ROLES)[number];

export const INTERVIEW_PATHS = INTERVIEW_ROLES.map((role) => `/${role}`);

export function isInterviewPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return INTERVIEW_PATHS.includes(pathname);
}

export function isInterviewRole(value: string): value is InterviewRole {
  return INTERVIEW_ROLES.includes(value as InterviewRole);
}
