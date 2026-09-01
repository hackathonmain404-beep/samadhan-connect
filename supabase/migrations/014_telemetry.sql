-- Migration 014: IoT Hardware Telemetry & Sensor Readings

CREATE TABLE IF NOT EXISTS public.telemetry_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_code TEXT NOT NULL UNIQUE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  district TEXT NOT NULL,
  location TEXT NOT NULL,
  sensor_type TEXT NOT NULL, -- 'Water Fluoride PPM', 'PM2.5 Air Quality', 'Cold Room Temp'
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  last_ping TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.telemetry_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES public.telemetry_devices(id) ON DELETE CASCADE,
  reading_value NUMERIC NOT NULL,
  unit TEXT NOT NULL, -- 'mg/L', 'µg/m³', '°C'
  status_flag TEXT NOT NULL DEFAULT 'NORMAL', -- 'NORMAL', 'WARNING', 'CRITICAL'
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
