import { AdLandingCookieNotice } from "@/components/AdLandingCookieNotice";
import { AdPixel } from "@/components/AdPixel";

export function AdLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdPixel />
      {children}
      <AdLandingCookieNotice />
    </>
  );
}
