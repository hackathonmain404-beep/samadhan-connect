-- Migration 004: Master Districts Lookup Table (24 Districts of Jharkhand)

CREATE TABLE IF NOT EXISTS public.districts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  division TEXT NOT NULL,
  headquarters TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed all 24 Jharkhand Districts
INSERT INTO public.districts (name, division, headquarters) VALUES
  ('Ranchi', 'South Chotanagpur', 'Ranchi'),
  ('Khunti', 'South Chotanagpur', 'Khunti'),
  ('Gumla', 'South Chotanagpur', 'Gumla'),
  ('Simdega', 'South Chotanagpur', 'Simdega'),
  ('Lohardaga', 'South Chotanagpur', 'Lohardaga'),
  ('East Singhbhum (Jamshedpur)', 'Kolhan', 'Jamshedpur'),
  ('West Singhbhum', 'Kolhan', 'Chaibasa'),
  ('Saraikela Kharsawan', 'Kolhan', 'Saraikela'),
  ('Dhanbad', 'North Chotanagpur', 'Dhanbad'),
  ('Bokaro', 'North Chotanagpur', 'Bokaro Steel City'),
  ('Hazaribagh', 'North Chotanagpur', 'Hazaribagh'),
  ('Giridih', 'North Chotanagpur', 'Giridih'),
  ('Ramgarh', 'North Chotanagpur', 'Ramgarh'),
  ('Chatra', 'North Chotanagpur', 'Chatra'),
  ('Koderma', 'North Chotanagpur', 'Koderma'),
  ('Deoghar', 'Santhal Pargana', 'Deoghar'),
  ('Dumka', 'Santhal Pargana', 'Dumka'),
  ('Godda', 'Santhal Pargana', 'Godda'),
  ('Jamtara', 'Santhal Pargana', 'Jamtara'),
  ('Pakur', 'Santhal Pargana', 'Pakur'),
  ('Sahebganj', 'Santhal Pargana', 'Sahebganj'),
  ('Palamu', 'Palamu', 'Medininagar'),
  ('Garhwa', 'Palamu', 'Garhwa'),
  ('Latehar', 'Palamu', 'Latehar')
ON CONFLICT (name) DO NOTHING;
