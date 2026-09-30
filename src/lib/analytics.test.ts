import { describe, expect, it } from "vitest";
import { shouldDropAnalyticsUrl } from "@/lib/analytics";

describe("analytics path filter", () => {
  it("drops private interview pages and keeps public marketing URLs", () => {
    expect(shouldDropAnalyticsUrl("/ceo")).toBe(true);
    expect(shouldDropAnalyticsUrl("https://www.storentechai.com/cfo")).toBe(
      true,
    );
    expect(shouldDropAnalyticsUrl("/ops/session")).toBe(true);
    expect(shouldDropAnalyticsUrl("/")).toBe(false);
    expect(shouldDropAnalyticsUrl("/blog")).toBe(false);
    expect(shouldDropAnalyticsUrl("/contact")).toBe(false);
  });
});
