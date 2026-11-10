import { AdLandingLayout } from "@/components/AdLandingLayout";

export default function LawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdLandingLayout>{children}</AdLandingLayout>;
}
