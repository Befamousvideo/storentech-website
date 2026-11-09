import { getSql } from "@/lib/db";

export const FREE_MAP_LEADS_DDL = `
CREATE TABLE IF NOT EXISTS free_map_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_type TEXT NOT NULL,
  consent_at TIMESTAMPTZ NOT NULL,
  consent_text_version TEXT NOT NULL,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  user_agent_hash TEXT
)
`.trim();

export type FreeMapLeadInsert = {
  name: string;
  email: string;
  businessType: string;
  consentAt: Date;
  consentTextVersion: string;
  source: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  userAgentHash: string | null;
};

export type FreeMapLeadInsertResult =
  | { stored: true; id: string }
  | { stored: false; reason: "DATABASE_URL is not set" };

export async function insertFreeMapLead(
  row: FreeMapLeadInsert,
): Promise<FreeMapLeadInsertResult> {
  const sql = getSql();
  if (!sql) {
    return { stored: false, reason: "DATABASE_URL is not set" };
  }

  await sql.query(FREE_MAP_LEADS_DDL);

  const inserted = (await sql.query(
    `INSERT INTO free_map_leads (
       name, email, business_type, consent_at, consent_text_version,
       source, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
       user_agent_hash
     ) VALUES (
       $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
     ) RETURNING id`,
    [
      row.name,
      row.email,
      row.businessType,
      row.consentAt.toISOString(),
      row.consentTextVersion,
      row.source,
      row.utmSource,
      row.utmMedium,
      row.utmCampaign,
      row.utmTerm,
      row.utmContent,
      row.userAgentHash,
    ],
  )) as { id: string }[];

  const id = inserted[0]?.id;
  if (!id) {
    throw new Error("Insert did not return an id.");
  }
  return { stored: true, id };
}
