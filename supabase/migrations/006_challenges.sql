-- Migration 006: Challenges, Evidence, Comments, Upvotes & History Tables

-- 1. Challenges Table
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  custom_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL,
  district TEXT NOT NULL,
  location TEXT NOT NULL,
  panchayat TEXT,
  pincode VARCHAR(6) NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  urgency urgency_level NOT NULL DEFAULT 'MEDIUM',
  status challenge_status NOT NULL DEFAULT 'SUBMITTED',
  affected_group TEXT,
  affected_count TEXT NOT NULL DEFAULT '500+ residents',
  duration TEXT,
  expected_outcome TEXT,
  available_resources TEXT,
  submitted_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,
  rejection_reason TEXT,
  upvote_count INTEGER NOT NULL DEFAULT 0,
  solution_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Challenge Evidence Photos & Documents
CREATE TABLE IF NOT EXISTS public.challenge_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Challenge Community Comments
CREATE TABLE IF NOT EXISTS public.challenge_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Challenge Upvotes (1 Vote per Citizen per Challenge)
CREATE TABLE IF NOT EXISTS public.challenge_upvotes (
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (challenge_id, user_id)
);

-- 5. Challenge Status Audit Trail
CREATE TABLE IF NOT EXISTS public.challenge_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  old_status challenge_status,
  new_status challenge_status NOT NULL,
  changed_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
