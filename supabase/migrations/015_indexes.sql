-- Migration 015: Database Performance Indexes

-- 1. Challenges search, filtering & sorting indexes
CREATE INDEX IF NOT EXISTS idx_challenges_status ON public.challenges(status);
CREATE INDEX IF NOT EXISTS idx_challenges_district ON public.challenges(district);
CREATE INDEX IF NOT EXISTS idx_challenges_category ON public.challenges(category_name);
CREATE INDEX IF NOT EXISTS idx_challenges_urgency ON public.challenges(urgency);
CREATE INDEX IF NOT EXISTS idx_challenges_submitted_by ON public.challenges(submitted_by);
CREATE INDEX IF NOT EXISTS idx_challenges_created_at ON public.challenges(created_at DESC);

-- Full-text search GIN index on challenge title & description
CREATE INDEX IF NOT EXISTS idx_challenges_fts ON public.challenges 
USING gin(to_tsvector('english', title || ' ' || short_description || ' ' || detailed_description));

-- 2. Solutions indexes
CREATE INDEX IF NOT EXISTS idx_solutions_challenge_id ON public.solutions(challenge_id);
CREATE INDEX IF NOT EXISTS idx_solutions_submitted_by ON public.solutions(submitted_by);
CREATE INDEX IF NOT EXISTS idx_solutions_status ON public.solutions(status);

-- 3. Projects & Workspaces indexes
CREATE INDEX IF NOT EXISTS idx_projects_challenge_id ON public.projects(challenge_id);
CREATE INDEX IF NOT EXISTS idx_project_members_user ON public.project_members(user_id);
CREATE INDEX IF NOT EXISTS idx_project_tasks_project ON public.project_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_milestones_project ON public.project_milestones(project_id);

-- 4. Messaging & Notifications indexes
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_conversation_members_user ON public.conversation_members(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read, created_at DESC);

-- 5. Telemetry indexes
CREATE INDEX IF NOT EXISTS idx_telemetry_readings_device ON public.telemetry_readings(device_id, recorded_at DESC);
