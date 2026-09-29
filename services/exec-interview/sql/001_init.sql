-- Idempotent schema for the exec_interviews database.
-- No IP addresses, user agents, or client legal names.

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ceo', 'cfo', 'ops')),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'complete', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  UNIQUE (company_code, role)
);

ALTER TABLE sessions ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ;
ALTER TABLE sessions DROP CONSTRAINT IF EXISTS sessions_status_check;
ALTER TABLE sessions ADD CONSTRAINT sessions_status_check
  CHECK (status IN ('in_progress', 'complete', 'closed'));

CREATE TABLE IF NOT EXISTS revoked_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ceo', 'cfo', 'ops')),
  key_hash TEXT NOT NULL,
  revoked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (key_hash)
);

CREATE INDEX IF NOT EXISTS revoked_keys_role_idx
  ON revoked_keys (company_code, role);

CREATE TABLE IF NOT EXISTS answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ceo', 'cfo', 'ops')),
  question_id TEXT NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  follow_ups JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_code, role, question_id)
);

CREATE TABLE IF NOT EXISTS follow_up_rows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ceo', 'cfo', 'ops')),
  question_id TEXT NOT NULL,
  row_index INTEGER NOT NULL CHECK (row_index >= 0),
  task_name TEXT NOT NULL DEFAULT '',
  how_often TEXT NOT NULL DEFAULT '',
  how_long TEXT NOT NULL DEFAULT '',
  who_role TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_code, role, question_id, row_index)
);

CREATE TABLE IF NOT EXISTS transcription_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ceo', 'cfo', 'ops')),
  question_id TEXT NOT NULL,
  attempt_number INTEGER NOT NULL CHECK (attempt_number >= 1),
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_code, role, question_id, attempt_number)
);

CREATE INDEX IF NOT EXISTS answers_role_idx
  ON answers (company_code, role);

CREATE INDEX IF NOT EXISTS follow_up_rows_role_idx
  ON follow_up_rows (company_code, role, question_id);

CREATE INDEX IF NOT EXISTS transcription_attempts_role_idx
  ON transcription_attempts (company_code, role, question_id);
