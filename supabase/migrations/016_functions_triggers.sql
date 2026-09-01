-- Migration 016: PostgreSQL Database Functions & Automated Triggers

-- 1. Helper function: Get Current Authenticated User Role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 2. Trigger Function: Automatically create profile when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    name,
    role,
    district,
    institution,
    organization,
    designation,
    avatar_url
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'CITIZEN'::user_role),
    COALESCE(NEW.raw_user_meta_data->>'district', 'Ranchi'),
    COALESCE(NEW.raw_user_meta_data->>'institution', ''),
    COALESCE(NEW.raw_user_meta_data->>'organization', ''),
    COALESCE(NEW.raw_user_meta_data->>'designation', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80')
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    avatar_url = EXCLUDED.avatar_url;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to Supabase auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Trigger Function: Maintain Upvote Count on Challenges
CREATE OR REPLACE FUNCTION public.handle_challenge_upvote_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.challenges SET upvote_count = upvote_count + 1 WHERE id = NEW.challenge_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.challenges SET upvote_count = GREATEST(0, upvote_count - 1) WHERE id = OLD.challenge_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_challenge_upvote_change ON public.challenge_upvotes;
CREATE TRIGGER on_challenge_upvote_change
  AFTER INSERT OR DELETE ON public.challenge_upvotes
  FOR EACH ROW EXECUTE FUNCTION public.handle_challenge_upvote_count();

-- 4. RPC Function: Atomic Challenge Verification & Notification
CREATE OR REPLACE FUNCTION public.verify_challenge_rpc(
  p_challenge_id UUID,
  p_decision TEXT, -- 'VERIFY' or 'REJECT'
  p_reason TEXT DEFAULT NULL
)
RETURNS json AS $$
DECLARE
  v_role user_role;
  v_challenge public.challenges%ROWTYPE;
BEGIN
  -- Verify caller is Government or Admin
  SELECT role INTO v_role FROM public.profiles WHERE id = auth.uid();
  IF v_role NOT IN ('GOVERNMENT', 'ADMIN') THEN
    RAISE EXCEPTION 'Access Denied: Only Government Officials or Admins can verify challenges.';
  END IF;

  SELECT * INTO v_challenge FROM public.challenges WHERE id = p_challenge_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Challenge not found.';
  END IF;

  IF p_decision = 'VERIFY' THEN
    UPDATE public.challenges
    SET status = 'OPEN_FOR_SOLUTIONS',
        verified_by = auth.uid(),
        verified_at = NOW(),
        updated_at = NOW()
    WHERE id = p_challenge_id;

    -- Create Audit Trail
    INSERT INTO public.challenge_status_history (challenge_id, old_status, new_status, changed_by, notes)
    VALUES (p_challenge_id, v_challenge.status, 'OPEN_FOR_SOLUTIONS', auth.uid(), 'Verified by Nodal Officer');

    -- Send Realtime Notification to Citizen Author
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      v_challenge.submitted_by,
      'CHALLENGE_VERIFIED',
      'Your Challenge is Verified! 🎉',
      format('"%s" has been verified and published to the Open Solution Marketplace.', v_challenge.title),
      format('/challenges/%s', v_challenge.id)
    );

    RETURN json_build_object('success', true, 'status', 'OPEN_FOR_SOLUTIONS');
  ELSE
    UPDATE public.challenges
    SET status = 'REJECTED',
        rejection_reason = p_reason,
        updated_at = NOW()
    WHERE id = p_challenge_id;

    INSERT INTO public.challenge_status_history (challenge_id, old_status, new_status, changed_by, notes)
    VALUES (p_challenge_id, v_challenge.status, 'REJECTED', auth.uid(), p_reason);

    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      v_challenge.submitted_by,
      'CHALLENGE_REJECTED',
      'Submission Update',
      format('Your reported challenge "%s" could not be verified: %s', v_challenge.title, COALESCE(p_reason, 'Insufficient evidence')),
      format('/challenges/%s', v_challenge.id)
    );

    RETURN json_build_object('success', true, 'status', 'REJECTED');
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
