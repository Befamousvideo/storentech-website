#!/usr/bin/env node
/**
 * Print-ready QR for the Break Glass page.
 * Encodes only the canonical page URL. Does not embed phone or email.
 *
 *   node scripts/break-glass-qr.mjs [url] [outdir]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const DEFAULT_URL = "https://www.storentechai.com/break-glass";
const url = process.argv[2] || DEFAULT_URL;
const outDir =
  process.argv[3] ||
  join(dirname(fileURLToPath(import.meta.url)), "..", "artifacts");

const require = createRequire(import.meta.url);
let QRCode;
try {
  QRCode = require("qrcode");
} catch {
  console.error("Install qrcode in this environment: npm install qrcode");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const pngPath = join(outDir, "break-glass-qr.png");
const svgPath = join(outDir, "break-glass-qr.svg");

const options = {
  errorCorrectionLevel: "M",
  margin: 4,
  color: { dark: "#000000", light: "#FFFFFF" },
};

await QRCode.toFile(pngPath, url, { ...options, type: "png", width: 1200 });
const svg = await QRCode.toString(url, {
  ...options,
  type: "svg",
  width: 1200,
});
writeFileSync(svgPath, svg);

console.log(`Encoded: ${url}`);
console.log(`PNG: ${pngPath}`);
console.log(`SVG: ${svgPath}`);
