import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null | undefined;

/**
 * Minimal Neon/Postgres client. Returns null when DATABASE_URL is unset
 * so preview builds can still render the download page.
 */
export function getSql() {
  if (sql !== undefined) return sql;
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    sql = null;
    return sql;
  }
  sql = neon(url);
  return sql;
}

export function resetSqlCache() {
  sql = undefined;
}
