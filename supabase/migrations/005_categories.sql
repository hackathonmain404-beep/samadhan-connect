-- Migration 005: Master Categories Lookup Table

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color_classes TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Categories matching Frontend Mock UI
INSERT INTO public.categories (slug, name, icon, color_classes, description) VALUES
  ('water', 'Water Management', 'Droplets', 'bg-emerald-50 text-emerald-800 border-emerald-200', 'Groundwater recharge, fluoride/iron filtration, and rural piped water supply.'),
  ('agriculture', 'Agriculture & Cold Chain', 'Sprout', 'bg-green-50 text-green-800 border-green-200', 'Post-harvest preservation, solar micro cold-rooms, and crop pest monitoring.'),
  ('healthcare', 'Healthcare & Diagnostics', 'HeartPulse', 'bg-rose-50 text-rose-800 border-rose-200', 'Point-of-care anemia screening, tribal health kiosks, and telemedicine.'),
  ('education', 'Education & STEM', 'GraduationCap', 'bg-amber-50 text-amber-800 border-amber-200', 'Offline interactive STEM labs, digital literacy, and regional language teaching.'),
  ('sanitation', 'Sanitation & Waste', 'Trash2', 'bg-teal-50 text-teal-800 border-teal-200', 'Solid waste segregation, septic sludge treatment, and plastic upcycling.'),
  ('environment', 'Environment & Mine Remediation', 'Leaf', 'bg-emerald-50 text-emerald-900 border-emerald-300', 'Mine overburden stabilization, coal dust suppression, and afforestation.'),
  ('rural-livelihood', 'Rural Livelihood & Crafts', 'Briefcase', 'bg-orange-50 text-orange-800 border-orange-200', 'Lac processing, tasar silk value chains, and tribal artisan e-marketplaces.'),
  ('accessibility', 'Accessibility & Inclusion', 'Accessibility', 'bg-purple-50 text-purple-800 border-purple-200', 'Assistive technologies for disabled citizens and elderly care innovations.'),
  ('urban-infra', 'Urban Infrastructure', 'Building2', 'bg-blue-50 text-blue-800 border-blue-200', 'Smart street lighting, traffic de-congestion, and civic grievance resolution.'),
  ('public-services', 'Public Services & Governance', 'Landmark', 'bg-slate-50 text-slate-800 border-slate-200', 'Panchayat record digitization, citizen service tracking, and transparency tools.')
ON CONFLICT (slug) DO NOTHING;
