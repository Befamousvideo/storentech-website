import type { Metadata } from "next";
import { InterviewApp } from "@/components/interview/InterviewApp";

export const metadata: Metadata = {
  alternates: { canonical: "/ops" },
};

export default function OpsInterviewPage() {
  return <InterviewApp role="ops" />;
}
