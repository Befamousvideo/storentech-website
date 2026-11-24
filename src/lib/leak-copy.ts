export const LEAK_TOOLTIP_TEXT =
  "A leak is where your business quietly loses something. Money leaks: revenue that slips away. Time leaks: staff hours lost to busywork. Risk leaks: gaps that can cost you later.";

export const LEAK_TOOLTIP_LINK_LABEL = "More on leaks →";

export const LEAK_TOOLTIP_HREF = "/opportunity#leaks";

export const LEAK_CARDS_HEADING = "What we mean by leaks";

export const LEAK_CARDS_CAPTION =
  "The AI Opportunity Map finds all three and ranks which to fix first.";

export const leakCards = [
  {
    title: "Money leak",
    definition:
      "Revenue your business should have earned but didn't. The customer was ready, but the call, the quote or the follow-up never happened.",
    spots:
      "missed and after-hours calls, slow replies to new inquiries, quotes nobody followed up on, unbilled work.",
  },
  {
    title: "Time leak",
    definition:
      "Staff hours spent on busywork that a simpler process or a well-built tool could handle. The work gets done, but it eats the day.",
    spots:
      "retyping data between systems, chasing status updates, building the same report by hand every week, sorting the inbox.",
  },
  {
    title: "Risk leak",
    definition:
      "A gap that hasn't cost you yet but could later. Nothing looks broken today, which is why it's easy to miss.",
    spots:
      "customer data sitting in a tool nobody controls, ex-employee logins still active, work that depends on one person, AI tools nobody owns or checks.",
  },
] as const;

export const homepageMetaDescription =
  "Leaks are where a business loses money, staff time or control. The AI Opportunity Map finds your money, time and risk leaks and ranks which to fix first.";

export const howItWorksMetaDescription =
  "First, a paid AI Opportunity Map finds your money, time and risk leaks and ranks what to fix first. Then the Build Plan, with people still in the loop.";

export const opportunityLeakFaqs = [
  {
    question: "What is a money leak?",
    answer:
      "A money leak is revenue a business should have earned but lost, usually because a call went unanswered, a quote wasn't followed up or work wasn't billed. The customer was ready to buy; the business didn't catch it.",
  },
  {
    question: "What is a time leak?",
    answer:
      "A time leak is staff time lost to repetitive busywork, such as retyping data, chasing updates or rebuilding the same report by hand. The work still gets done, but it takes hours that could go to customers or higher-value work.",
  },
  {
    question: "What is a risk leak?",
    answer:
      "A risk leak is a gap that hasn't cost the business anything yet but could later. Common examples are customer data in a tool nobody controls, former employees who can still log in, and work that only one person knows how to do.",
  },
  {
    question: "How does StorenTech find leaks in my business?",
    answer:
      "StorenTech AI builds an AI Opportunity Map: a deep-dive report on how your business actually runs, based on interviews with your team and a look at how calls, inquiries and daily work move through the business. The map shows where money, time and risk are leaking and ranks which fixes to make first.",
  },
] as const;
