import { AdLandingRetargetingPixel } from "@/components/AdLandingRetargetingPixel";

export function AdLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdLandingRetargetingPixel />
      {children}
    </>
  );
}
