#!/usr/bin/env node
/**
 * Fetch the five /for preview routes and assert they render with noindex
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
];

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
    assert(!html.includes("application/ld+json"), `${path} includes JSON-LD`);
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
