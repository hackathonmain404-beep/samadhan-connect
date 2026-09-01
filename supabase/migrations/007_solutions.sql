-- Migration 007: Solutions & Technical Blueprints Tables

CREATE TABLE IF NOT EXISTS public.solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  custom_code TEXT NOT NULL UNIQUE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  submitted_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL,
  university TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  expected_impact TEXT NOT NULL,
  estimated_duration TEXT NOT NULL,
  industry_support_requirement TEXT,
  status solution_status NOT NULL DEFAULT 'PROPOSED',
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Technical Blueprint Attachment Documents
CREATE TABLE IF NOT EXISTS public.solution_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solution_id UUID NOT NULL REFERENCES public.solutions(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
