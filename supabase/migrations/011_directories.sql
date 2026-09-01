-- Migration 011: Universities & Industry Partners Directories

CREATE TABLE IF NOT EXISTS public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  short_name TEXT NOT NULL,
  district TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Technical University',
  specializations TEXT[] NOT NULL DEFAULT '{}',
  active_teams INTEGER NOT NULL DEFAULT 0,
  solved_challenges INTEGER NOT NULL DEFAULT 0,
  incubation_cell TEXT,
  coordinator_name TEXT NOT NULL,
  coordinator_email TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.industry_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  sector TEXT NOT NULL,
  district TEXT NOT NULL,
  csr_focus TEXT[] NOT NULL DEFAULT '{}',
  funded_projects_count INTEGER NOT NULL DEFAULT 0,
  grant_budget TEXT,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
