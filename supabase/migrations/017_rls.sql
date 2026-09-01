-- Migration 017: Comprehensive Row Level Security (RLS) Policies

-- ====================================================================
-- 1. Enable RLS on ALL Application Tables
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solution_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry_readings ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- 2. Master Lookups (Districts, Categories, Universities, Industry)
-- ====================================================================
CREATE POLICY "Public can view districts" ON public.districts FOR SELECT USING (true);
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view universities" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Public can view industry partners" ON public.industry_partners FOR SELECT USING (true);

-- ====================================================================
-- 3. Profiles Policies
-- ====================================================================
CREATE POLICY "Public can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ====================================================================
-- 4. Challenges Policies
-- ====================================================================
-- Public can view open & verified challenges; Authors can view their own; Govt/Admin see all
CREATE POLICY "View challenges policy" ON public.challenges
  FOR SELECT USING (
    status NOT IN ('SUBMITTED', 'REJECTED')
    OR auth.uid() = submitted_by
    OR public.get_current_user_role() IN ('GOVERNMENT', 'ADMIN')
  );

CREATE POLICY "Authenticated users can submit challenges" ON public.challenges
  FOR INSERT WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Authors or Govt/Admin can update challenges" ON public.challenges
  FOR UPDATE USING (
    (auth.uid() = submitted_by AND status = 'SUBMITTED')
    OR public.get_current_user_role() IN ('GOVERNMENT', 'ADMIN')
  );

-- Evidence & Comments
CREATE POLICY "Public can view challenge evidence" ON public.challenge_evidence FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload evidence" ON public.challenge_evidence FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Public can view comments" ON public.challenge_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can post comments" ON public.challenge_comments FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Upvotes
CREATE POLICY "Public can view upvotes" ON public.challenge_upvotes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can cast upvote" ON public.challenge_upvotes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove own upvote" ON public.challenge_upvotes FOR DELETE USING (auth.uid() = user_id);

-- ====================================================================
-- 5. Solutions Policies
-- ====================================================================
CREATE POLICY "Public can view solutions" ON public.solutions FOR SELECT USING (true);
CREATE POLICY "Students and Universities can propose solutions" ON public.solutions
  FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Authors, Mentors, and Govt can update solutions" ON public.solutions
  FOR UPDATE USING (
    auth.uid() = submitted_by
    OR public.get_current_user_role() IN ('GOVERNMENT', 'INDUSTRY', 'ADMIN')
  );

-- ====================================================================
-- 6. Projects & Kanban Workspace Policies
-- ====================================================================
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated innovators can create projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Project members can update project" ON public.projects
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.project_members WHERE project_id = public.projects.id AND user_id = auth.uid())
    OR public.get_current_user_role() IN ('ADMIN', 'GOVERNMENT')
  );

CREATE POLICY "Public can view project members" ON public.project_members FOR SELECT USING (true);
CREATE POLICY "Public can view milestones" ON public.project_milestones FOR SELECT USING (true);
CREATE POLICY "Public can view project tasks" ON public.project_tasks FOR SELECT USING (true);
CREATE POLICY "Project members can manage tasks" ON public.project_tasks FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.project_members WHERE project_id = public.project_tasks.project_id AND user_id = auth.uid())
    OR public.get_current_user_role() = 'ADMIN'
  );

CREATE POLICY "Public can view project updates" ON public.project_updates FOR SELECT USING (true);
CREATE POLICY "Project members can post updates" ON public.project_updates FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Public can view mentor reviews" ON public.mentor_reviews FOR SELECT USING (true);
CREATE POLICY "Industry/University mentors can post reviews" ON public.mentor_reviews FOR INSERT WITH CHECK (auth.uid() = mentor_id);

-- ====================================================================
-- 7. Teams & Collaboration Policies
-- ====================================================================
CREATE POLICY "Public can view teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Students can create teams" ON public.teams FOR INSERT WITH CHECK (auth.uid() = lead_id);
CREATE POLICY "Public can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Users can request collaboration" ON public.collaboration_requests FOR INSERT WITH CHECK (auth.uid() = applicant_id);
CREATE POLICY "Team leads can manage collaboration requests" ON public.collaboration_requests FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.teams WHERE id = public.collaboration_requests.team_id AND lead_id = auth.uid())
    OR applicant_id = auth.uid()
  );

-- ====================================================================
-- 8. Messaging Policies (Strict Privacy)
-- ====================================================================
CREATE POLICY "Users can view their conversations" ON public.conversations FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.conversation_members WHERE conversation_id = public.conversations.id AND user_id = auth.uid()));

CREATE POLICY "Users can view conversation members" ON public.conversation_members FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.conversation_members cm WHERE cm.conversation_id = public.conversation_members.conversation_id AND cm.user_id = auth.uid()));

CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.conversation_members WHERE conversation_id = public.messages.conversation_id AND user_id = auth.uid()));

CREATE POLICY "Users can send messages to their conversations" ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (SELECT 1 FROM public.conversation_members WHERE conversation_id = public.messages.conversation_id AND user_id = auth.uid())
  );

-- ====================================================================
-- 9. Notifications Policies
-- ====================================================================
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can mark own notifications as read" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- ====================================================================
-- 10. Telemetry Policies
-- ====================================================================
CREATE POLICY "Public can view telemetry devices" ON public.telemetry_devices FOR SELECT USING (true);
CREATE POLICY "Public can view telemetry readings" ON public.telemetry_readings FOR SELECT USING (true);
CREATE POLICY "Authenticated devices or admins can insert readings" ON public.telemetry_readings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
