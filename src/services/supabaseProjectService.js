import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const supabaseProjectService = {
  /**
   * Fetch all workspace projects with team members, milestones, and tasks
   */
  async getProjects() {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        challenge:challenges!challenge_id(id, custom_code, title),
        members:project_members(*, user:profiles!user_id(id, name, avatar_url)),
        milestones:project_milestones(*),
        tasks:project_tasks(*),
        updates:project_updates(*),
        reviews:mentor_reviews(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Update task status (Kanban drag / click)
   */
  async updateTaskStatus(taskId, status) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('project_tasks')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Post project update in activity stream
   */
  async addProjectUpdate(projectId, authorId, authorName, content) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('project_updates')
      .insert({
        project_id: projectId,
        author_id: authorId,
        author_name: authorName,
        content,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Post mentor feedback and rating
   */
  async addMentorReview(projectId, mentorId, mentorName, organization, rating, feedbackText) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('mentor_reviews')
      .insert({
        project_id: projectId,
        mentor_id: mentorId,
        mentor_name: mentorName,
        organization,
        rating,
        feedback_text: feedbackText,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
