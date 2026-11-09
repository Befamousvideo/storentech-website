-- Idempotent. Safe to re-run against Neon Postgres.
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
);
