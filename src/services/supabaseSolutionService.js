import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const supabaseSolutionService = {
  /**
   * Fetch all solutions
   */
  async getSolutions(challengeId = null) {
    if (!isSupabaseConfigured) return null;

    let query = supabase
      .from('solutions')
      .select(`
        *,
        submitted_by:profiles!submitted_by(id, name, role, institution, avatar_url),
        challenge:challenges!challenge_id(id, custom_code, title, category_name, district)
      `)
      .order('created_at', { ascending: false });

    if (challengeId) {
      query = query.eq('challenge_id', challengeId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  /**
   * Submit new technical solution proposal
   */
  async submitSolution(solutionData, userId) {
    if (!isSupabaseConfigured) return null;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const customCode = `SOL-JH-2026-${randomNum}`;

    const { data, error } = await supabase
      .from('solutions')
      .insert({
        custom_code: customCode,
        challenge_id: solutionData.challengeId,
        submitted_by: userId,
        team_name: solutionData.teamName || 'Student Innovation Team',
        university: solutionData.university || 'Birla Institute of Technology (BIT) Mesra',
        title: solutionData.title,
        description: solutionData.description || solutionData.overview || '',
        technologies: Array.isArray(solutionData.technologies)
          ? solutionData.technologies
          : (solutionData.technologies ? solutionData.technologies.split(',').map(t => t.trim()) : ['IoT', 'Embedded Systems']),
        expected_impact: solutionData.expectedImpact || 'Tangible civic and community impact.',
        estimated_duration: solutionData.duration || '4 Months',
        industry_support_requirement: solutionData.industrySupportRequirement || '',
        status: 'PROPOSED',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
