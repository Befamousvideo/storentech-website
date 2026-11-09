import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const dir = dirname(fileURLToPath(import.meta.url));
const ddl = readFileSync(join(dir, "migrations/001_free_map_leads.sql"), "utf8");
const sql = neon(url);
await sql.query(ddl);
console.log("free_map_leads is ready.");
