#!/usr/bin/env node
/**
 * Fetch the seven /for preview routes and assert they render with noindex
 * and none of the forbidden snippets. Unknown slugs must 404.
 *
 * Usage: node scripts/check-for-pages.mjs [baseUrl]
 * Default baseUrl: http://127.0.0.1:3000
 */

const slugs = [
  "kei-concepts",
  "rjb-restaurant-group",
  "bluewater-grill",
  "dkn-hotels",
  "kings-seafood",
  "veritech-plumbing",
  "sea-pointe",
];

const calendarCtaHref =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3_M6l66KiiwO3HU9p0jzoWXWaJ4hTlaGvhTvVO2pXQcfq1vFVisX-ebfTTEv4_NOYhA3plJTnB";
const ctaLabel = "Book a 30-minute conversation";

const forbidden = ["714", "tel:", "mailto:", "@storentech", "client", "ROIA"];

const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");

async function fetchPage(path) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  const html = await response.text();
  return { response, html };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function decodePreviewText(html) {
  return html
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'");
}

const failures = [];

for (const slug of slugs) {
  const path = `/for/${slug}`;
  try {
    const { response, html } = await fetchPage(path);
    assert(response.ok, `${path} returned ${response.status}`);
    assert(
      html.includes("noindex") && html.includes("nofollow"),
      `${path} missing noindex, nofollow`,
    );
    const robotsTag = response.headers.get("x-robots-tag") ?? "";
    assert(
      /noindex/i.test(robotsTag),
      `${path} missing X-Robots-Tag noindex (got ${JSON.stringify(robotsTag)})`,
    );
    const inspected = html.replaceAll("/roia", "");
    for (const snippet of forbidden) {
      assert(
        !inspected.includes(snippet),
        `${path} HTML contains forbidden snippet ${JSON.stringify(snippet)}`,
      );
    }
    assert(
      !/\bfree\b/i.test(inspected),
      `${path} HTML contains the word "free"`,
    );
    assert(
      !/scraping/i.test(inspected),
      `${path} HTML contains "scraping"`,
    );
    assert(
      !html.includes("/sarah-phone.png"),
      `${path} includes the Sarah phone image src`,
    );
    assert(
      !html.includes('alt="Call Sarah"') && !html.includes("Call Sarah"),
      `${path} includes Call Sarah text or alt`,
    );
    assert(!html.includes("application/ld+json"), `${path} includes JSON-LD`);
    assert(
      !html.includes("20-minute"),
      `${path} still includes 20-minute wording`,
    );
    assert(
      html.includes("30-minute"),
      `${path} missing 30-minute wording`,
    );
    const ctaMatch = html.match(
      /<a\b[^>]*>\s*Book a 30-minute conversation\s*<\/a>/,
    );
    assert(ctaMatch, `${path} missing ${JSON.stringify(ctaLabel)} link`);
    assert(
      ctaMatch[0].includes(`href="${calendarCtaHref}"`),
      `${path} CTA does not point at Vincent's calendar`,
    );
    assert(
      ctaMatch[0].includes('target="_blank"'),
      `${path} CTA missing target=_blank`,
    );
    assert(
      ctaMatch[0].includes('rel="noopener noreferrer"'),
      `${path} CTA missing rel=noopener noreferrer`,
    );
    assert(
      !ctaMatch[0].includes("/contact"),
      `${path} CTA still points at /contact`,
    );
    if (slug === "veritech-plumbing") {
      const text = decodePreviewText(html);
      assert(
        text.includes(
          "With an AI Opportunity Map scoped to VeriTech ops (scheduling, dispatch, quoting, follow-up), so the first Map stays focused.",
        ),
        `${path} missing VeriTech-scoped How we'd start`,
      );
      assert(
        text.includes(
          "We talk with your leadership and key staff, map where time or revenue leaks, and rank the fixes by payoff and effort.",
        ),
        `${path} missing shared Map paragraph`,
      );
    }
    if (slug === "sea-pointe") {
      const text = decodePreviewText(html);
      assert(
        text.includes(
          "With an AI Opportunity Map scoped to Sea Pointe ops, so the first Map stays focused.",
        ),
        `${path} missing Sea Pointe-scoped How we'd start`,
      );
      assert(
        text.includes(
          "We talk with your leadership and key staff, map where time or revenue leaks, and rank the fixes by payoff and effort.",
        ),
        `${path} missing shared Map paragraph`,
      );
    }
    if (slug === "kings-seafood") {
      const text = decodePreviewText(html);
      assert(
        text.includes("Approvals on every KSD order."),
        `${path} missing KSD approvals bullet`,
      );
      assert(
        text.includes(
          "Any AI that drafts or places an order gets a sign-off step, a spending cap, a log and an off switch.",
        ),
        `${path} missing KSD approvals description`,
      );
      assert(
        text.includes(
          "With an AI Opportunity Map scoped to King's Seafood Distribution, so the first Map stays focused.",
        ),
        `${path} missing KSD-scoped How we'd start`,
      );
      assert(
        !text.includes("Labor and prep at King's Fish House."),
        `${path} still includes the King's Fish House bullet`,
      );
      assert(
        !text.includes("for one division"),
        `${path} still scopes the Map to one division`,
      );
    }
    console.log(`ok  ${path}`);
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
    console.error(`fail ${path}: ${error instanceof Error ? error.message : error}`);
  }
}

try {
  const { response } = await fetchPage("/for/not-a-company");
  assert(response.status === 404, `/for/not-a-company returned ${response.status}`);
  console.log("ok  /for/not-a-company 404");
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
  console.error(
    `fail /for/not-a-company: ${error instanceof Error ? error.message : error}`,
  );
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed`);
  process.exit(1);
}

console.log(`\n${slugs.length} preview routes rendered cleanly`);
