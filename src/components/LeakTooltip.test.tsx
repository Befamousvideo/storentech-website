import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import HowItWorksPage, {
  metadata as howItWorksMetadata,
} from "@/app/how-it-works/page";
import OpportunityPage from "@/app/opportunity/page";
import HomePage, { metadata as homeMetadata } from "@/app/page";
import WorkPage from "@/app/work/page";
import { AfterHoursCallsContractorsArticle } from "@/components/blog/AfterHoursCallsContractorsArticle";
import { AiVoiceAgentSmallBusinessArticle } from "@/components/blog/AiVoiceAgentSmallBusinessArticle";
import { HuggingFaceGithubExplainedArticle } from "@/components/blog/HuggingFaceGithubExplainedArticle";
import { ContractorsLanding } from "@/components/ContractorsLanding";
import { LeakMention, LeakTooltip } from "@/components/LeakTooltip";
import { getPost } from "@/lib/blog";
import {
  homepageMetaDescription,
  howItWorksMetaDescription,
  LEAK_TOOLTIP_HREF,
  LEAK_TOOLTIP_LINK_LABEL,
  LEAK_TOOLTIP_TEXT,
} from "@/lib/leak-copy";

function leakTriggers(container: HTMLElement) {
  return [...container.querySelectorAll(".leak-tooltip-trigger")];
}

function assertOneBusinessLeakTooltip(container: HTMLElement) {
  const triggers = leakTriggers(container);
  expect(triggers).toHaveLength(1);
  expect(triggers[0].tagName).toBe("BUTTON");
  expect(triggers[0]).toHaveAttribute("aria-expanded");
  expect(triggers[0]).toHaveAttribute("aria-controls");
  expect(container.textContent).toContain(LEAK_TOOLTIP_TEXT);
  expect(container.innerHTML).toContain(LEAK_TOOLTIP_TEXT);
  const link = container.querySelector(".leak-tooltip-link");
  expect(link).toHaveAttribute("href", LEAK_TOOLTIP_HREF);
  expect(link).toHaveTextContent(LEAK_TOOLTIP_LINK_LABEL);
}

describe("LeakTooltip", () => {
  it("keeps the tooltip copy in the server-rendered HTML", () => {
    const html = renderToStaticMarkup(
      <LeakMention>{"An AI Opportunity Map shows where time or revenue leaks."}</LeakMention>,
    );
    expect(html).toContain(LEAK_TOOLTIP_TEXT);
    expect(html).toContain('href="/opportunity#leaks"');
    expect(html).toContain("<button");
    expect(html).toContain("aria-expanded");
    expect(html).toContain("aria-controls");
  });

  it("opens on click and closes on Escape, the X button, and outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <LeakTooltip>leaks</LeakTooltip>
        <button type="button">Outside</button>
      </div>,
    );

    const trigger = screen.getByRole("button", { name: /leaks/i });
    const panel = document.getElementById(
      trigger.getAttribute("aria-controls") ?? "",
    );
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panel).not.toHaveClass("is-open");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveClass("is-open");

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(panel).toHaveClass("is-open");
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(panel).not.toHaveClass("is-open");

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(panel).not.toHaveClass("is-open");
  });
});

describe("leak tooltip placement on core pages", () => {
  it("is on the first business leak mention on the homepage", () => {
    const { container } = render(<HomePage />);
    assertOneBusinessLeakTooltip(container);
    expect(homeMetadata.description).toBe(homepageMetaDescription);
    expect(homeMetadata.openGraph?.description).toBe(homepageMetaDescription);
    expect(homeMetadata.twitter?.description).toBe(homepageMetaDescription);
  });

  it("is on the first business leak mention on /opportunity", () => {
    const { container } = render(<OpportunityPage />);
    assertOneBusinessLeakTooltip(container);
  });

  it("is on the first business leak mention on /how-it-works", () => {
    const { container } = render(<HowItWorksPage />);
    assertOneBusinessLeakTooltip(container);
    expect(howItWorksMetadata.description).toBe(howItWorksMetaDescription);
    expect(howItWorksMetadata.openGraph?.description).toBe(
      howItWorksMetaDescription,
    );
    expect(howItWorksMetadata.twitter?.description).toBe(
      howItWorksMetaDescription,
    );
  });

  it("is on the first business leak mention on /work", () => {
    const { container } = render(<WorkPage />);
    assertOneBusinessLeakTooltip(container);
  });

  it("is on the first business leak mention on /about", () => {
    const { container } = render(<AboutPage />);
    assertOneBusinessLeakTooltip(container);
  });

  it("is on the business leak mention on /contractors, not the water leaks", () => {
    const { container } = render(<ContractorsLanding />);
    assertOneBusinessLeakTooltip(container);

    const problem = [...container.querySelectorAll("p")].find((node) =>
      (node.textContent ?? "").includes("backed-up drains"),
    );
    expect(problem?.textContent).toContain("leaks, backed-up drains");
    expect(problem?.querySelector(".leak-tooltip")).toBeNull();

    const emergency = [...container.querySelectorAll("p")].find((node) =>
      (node.textContent ?? "").includes("an active leak"),
    );
    expect(emergency?.querySelector(".leak-tooltip")).toBeNull();
  });
});

describe("literal leak mentions stay plain text", () => {
  it("does not wrap leaked passwords in the Hugging Face post", () => {
    const post = getPost("hugging-face-github-explained");
    expect(post).toBeDefined();
    const { container } = render(
      <HuggingFaceGithubExplainedArticle post={post!} />,
    );
    expect(container.textContent).toContain("leaked passwords");
    expect(container.querySelector(".leak-tooltip")).toBeNull();
  });

  it("does not wrap the water leak in the after-hours contractors post", () => {
    const post = getPost("after-hours-calls-contractors");
    expect(post).toBeDefined();
    const { container } = render(
      <AfterHoursCallsContractorsArticle post={post!} />,
    );
    expect(container.textContent).toContain(
      "a leak coming through the ceiling",
    );
    expect(container.querySelector(".leak-tooltip")).toBeNull();
  });

  it("does not wrap the homeowner leak in the voice-agent post", () => {
    const post = getPost("ai-voice-agent-small-business");
    expect(post).toBeDefined();
    const { container } = render(
      <AiVoiceAgentSmallBusinessArticle post={post!} />,
    );
    expect(container.textContent).toContain("A homeowner with a leak calls");
    expect(container.querySelector(".leak-tooltip")).toBeNull();
  });
});
