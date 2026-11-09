import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  GOOGLE_SITE_VERIFICATION,
  verificationMetadata,
} from "@/lib/verification";

describe("search engine verification metadata", () => {
  it("omits verification entirely when both env vars are unset", () => {
    expect(verificationMetadata({})).toBeUndefined();
  });

  it("does not emit empty tags when env vars are blank", () => {
    expect(
      verificationMetadata({
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "",
        NEXT_PUBLIC_BING_SITE_VERIFICATION: "   ",
      }),
    ).toBeUndefined();
  });

  it("emits only the Google tag when that env var is set", () => {
    expect(
      verificationMetadata({
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "google-token",
      }),
    ).toEqual({ google: "google-token" });
  });

  it("emits only msvalidate.01 when the Bing env var is set", () => {
    expect(
      verificationMetadata({
        NEXT_PUBLIC_BING_SITE_VERIFICATION: "bing-token",
      }),
    ).toEqual({ other: { "msvalidate.01": "bing-token" } });
  });

  it("emits both tags when both env vars are set", () => {
    expect(
      verificationMetadata({
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: " google-token ",
        NEXT_PUBLIC_BING_SITE_VERIFICATION: "bing-token",
      }),
    ).toEqual({
      google: "google-token",
      other: { "msvalidate.01": "bing-token" },
    });
  });

  it("always merges the Google Search Console token into root metadata", () => {
    expect(GOOGLE_SITE_VERIFICATION).toBe(
      "m3sRVHUbt4NXci2D6GVEdVM76iQR7IKbeEI8rtEk-vQ",
    );
    const layoutSource = readFileSync(
      join(process.cwd(), "src/app/layout.tsx"),
      "utf8",
    );
    expect(layoutSource).toContain("google: GOOGLE_SITE_VERIFICATION");
    expect(layoutSource).toContain("GOOGLE_SITE_VERIFICATION");
  });
});
