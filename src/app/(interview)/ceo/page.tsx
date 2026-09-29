import type { Metadata } from "next";
import { InterviewApp } from "@/components/interview/InterviewApp";

export const metadata: Metadata = {
  alternates: { canonical: "/ceo" },
};

export default function CeoInterviewPage() {
  return <InterviewApp role="ceo" />;
}
