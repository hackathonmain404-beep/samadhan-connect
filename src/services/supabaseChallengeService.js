import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const supabaseChallengeService = {
  /**
   * Fetch challenges with filters, search, and pagination
   */
  async getChallenges({ category, district, urgency, status, search, limit = 50 } = {}) {
    if (!isSupabaseConfigured) return null;

    let query = supabase
      .from('challenges')
      .select(`
        *,
        submitted_by:profiles!submitted_by(id, name, role, institution, organization, avatar_url),
        evidence:challenge_evidence(*),
        comments:challenge_comments(*, author:profiles!author_id(name, role, avatar_url))
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (category && category !== 'all') {
      query = query.eq('category_name', category);
    }
    if (district && district !== 'All Districts') {
      query = query.eq('district', district);
    }
    if (urgency && urgency !== 'all') {
      query = query.eq('urgency', urgency.toUpperCase());
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (search) {
      query = query.textSearch('fts', search, { type: 'websearch', config: 'english' });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  /**
   * Get single challenge by ID or custom_code
   */
  async getChallengeById(id) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('challenges')
      .select(`
        *,
        submitted_by:profiles!submitted_by(id, name, role, institution, organization, avatar_url),
        evidence:challenge_evidence(*),
        comments:challenge_comments(*, author:profiles!author_id(name, role, avatar_url))
      `)
      .or(`id.eq.${id},custom_code.eq.${id}`)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Submit new challenge problem
   */
  async createChallenge(challengeData, userId) {
    if (!isSupabaseConfigured) return null;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const customCode = `CH-JH-2026-${randomNum}`;

    const { data, error } = await supabase
      .from('challenges')
      .insert({
        custom_code: customCode,
        title: challengeData.title,
        short_description: challengeData.shortDescription || challengeData.description?.slice(0, 140) + '...',
        detailed_description: challengeData.detailedDescription || challengeData.description || '',
        category_name: challengeData.category || 'Water Management',
        district: challengeData.district || 'Ranchi',
        location: challengeData.location || `${challengeData.district || 'Ranchi'}, Jharkhand`,
        panchayat: challengeData.panchayat || '',
        pincode: challengeData.pincode || '834001',
        urgency: (challengeData.urgency || 'MEDIUM').toUpperCase(),
        status: 'SUBMITTED',
        affected_group: challengeData.affectedGroup || 'Rural Citizens',
        affected_count: challengeData.affectedCount ? `${challengeData.affectedCount}` : '500+ residents',
        duration: challengeData.duration || 'Ongoing',
        expected_outcome: challengeData.expectedOutcome || '',
        available_resources: challengeData.availableResources || '',
        submitted_by: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Toggle Upvote on Challenge
   */
  async toggleUpvote(challengeId, userId) {
    if (!isSupabaseConfigured) return null;

    // Check if already upvoted
    const { data: existing } = await supabase
      .from('challenge_upvotes')
      .select('challenge_id')
      .eq('challenge_id', challengeId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      // Remove upvote
      await supabase
        .from('challenge_upvotes')
        .delete()
        .eq('challenge_id', challengeId)
        .eq('user_id', userId);
      return false;
    } else {
      // Add upvote
      await supabase
        .from('challenge_upvotes')
        .insert({ challenge_id: challengeId, user_id: userId });
      return true;
    }
  },

  /**
   * Add comment to challenge
   */
  async addComment(challengeId, authorId, text) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('challenge_comments')
      .insert({
        challenge_id: challengeId,
        author_id: authorId,
        text,
      })
      .select(`*, author:profiles!author_id(name, role, avatar_url)`)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Government Verification Action (Calls Atomic RPC Function)
   */
  async verifyChallengeRPC(challengeId, decision = 'VERIFY', reason = null) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase.rpc('verify_challenge_rpc', {
      p_challenge_id: challengeId,
      p_decision: decision,
      p_reason: reason,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Upload Evidence Photo/Doc to Supabase Storage
   */
  async uploadEvidence(challengeId, file, userId) {
    if (!isSupabaseConfigured) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${challengeId}/${Date.now()}.${fileExt}`;
    const filePath = `evidence/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('challenge-evidence')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('challenge-evidence')
      .getPublicUrl(filePath);

    // Save metadata in challenge_evidence table
    const { data, error } = await supabase
      .from('challenge_evidence')
      .insert({
        challenge_id: challengeId,
        storage_path: filePath,
        public_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
