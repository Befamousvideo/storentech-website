import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";

const CLIENT_CONFIDENTIALITY_NOTE =
  "You won't find client logos here. At StorenTech AI, privacy, security, and confidentiality come first, so we don't publish or share who our clients are, not on this site and not in meetings. We'll gladly walk you through anonymized examples of the work.";

describe("About page", () => {
  it("renders the client-confidentiality note verbatim", () => {
    render(<AboutPage />);

    expect(
      screen.getByText("Client confidentiality", { selector: ".kicker" }),
    ).toBeInTheDocument();
    expect(screen.getByText(CLIENT_CONFIDENTIALITY_NOTE)).toBeInTheDocument();
  });
});
