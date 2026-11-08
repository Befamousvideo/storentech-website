import { AdLandingLayout } from "@/components/AdLandingLayout";

export default function ContractorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdLandingLayout>{children}</AdLandingLayout>;
}
