import { afterEach, describe, expect, it } from "vitest";
import {
  AD_RETARGETING_COOKIE_NAME,
  AD_RETARGETING_STORAGE_KEY,
  mayLoadAdTag,
  readStoredAdRetargetingChoice,
  writeAdRetargetingChoice,
} from "@/lib/ad-consent";

afterEach(() => {
  window.localStorage.clear();
  document.cookie = `${AD_RETARGETING_COOKIE_NAME}=; Path=/; Max-Age=0`;
});

describe("mayLoadAdTag", () => {
  it("defaults to on when there is no stored choice and no GPC", () => {
    expect(readStoredAdRetargetingChoice()).toBeNull();
    expect(
      mayLoadAdTag({
        pathname: "/law/sample",
        storedChoice: null,
        globalPrivacyControl: false,
      }),
    ).toBe(true);
  });

  it("is off when Global Privacy Control is set, even if the stored choice is on", () => {
    expect(
      mayLoadAdTag({
        pathname: "/law",
        storedChoice: true,
        globalPrivacyControl: true,
      }),
    ).toBe(false);
  });

  it("is off when the visitor turns ad retargeting off", () => {
    expect(
      mayLoadAdTag({
        pathname: "/contractors",
        storedChoice: false,
        globalPrivacyControl: false,
      }),
    ).toBe(false);
  });

  it("stays off on privacy, privacy-choices, and PII form pages", () => {
    for (const pathname of ["/privacy", "/privacy-choices", "/contact"]) {
      expect(
        mayLoadAdTag({
          pathname,
          storedChoice: true,
          globalPrivacyControl: false,
        }),
        pathname,
      ).toBe(false);
    }
  });

  it("writes the stored choice and then blocks the tag when toggled off", () => {
    writeAdRetargetingChoice(true);
    expect(readStoredAdRetargetingChoice()).toBe(true);
    expect(window.localStorage.getItem(AD_RETARGETING_STORAGE_KEY)).toBe("1");
    expect(document.cookie).toContain(`${AD_RETARGETING_COOKIE_NAME}=1`);
    expect(
      mayLoadAdTag({
        pathname: "/law/sample",
        globalPrivacyControl: false,
      }),
    ).toBe(true);

    writeAdRetargetingChoice(false);
    expect(readStoredAdRetargetingChoice()).toBe(false);
    expect(
      mayLoadAdTag({
        pathname: "/law/sample",
        globalPrivacyControl: false,
      }),
    ).toBe(false);
  });
});
