-- Migration 010: Student Teams & Collaboration Requests

CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  university TEXT NOT NULL,
  district TEXT NOT NULL,
  lead_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lead_name TEXT NOT NULL,
  lead_email TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  current_challenge TEXT,
  looking_for TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Looking for Members',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_name TEXT NOT NULL DEFAULT 'Collaborator',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (team_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.collaboration_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, ACCEPTED, REJECTED
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
