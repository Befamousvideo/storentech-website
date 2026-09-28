import type { Metadata } from "next";
import { InterviewApp } from "@/components/interview/InterviewApp";

export const metadata: Metadata = {
  alternates: { canonical: "/cfo" },
};

export default function CfoInterviewPage() {
  return <InterviewApp role="cfo" />;
}
