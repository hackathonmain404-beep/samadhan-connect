-- Migration 003: Public Profiles linked to Supabase auth.users

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'CITIZEN',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  district TEXT,
  location TEXT,
  institution TEXT,       -- e.g. "BIT Mesra", "NIT Jamshedpur"
  department TEXT,        -- e.g. "Computer Science & Engineering"
  organization TEXT,      -- e.g. "Tata Steel", "JSPL"
  designation TEXT,       -- e.g. "Chief Sustainability Officer", "Gram Pradhan"
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS 'Application user profile metadata extending Supabase auth.users';
