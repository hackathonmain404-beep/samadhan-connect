import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const supabaseAuthService = {
  /**
   * Register a new user with Supabase Auth and trigger profile creation
   */
  async signUp({ email, password, name, role, district, institution, organization, designation }) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          district: district || 'Ranchi',
          institution: institution || '',
          organization: organization || '',
          designation: designation || '',
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        },
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign in existing user with email and password
   */
  async signIn({ email, password }) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign out current user session
   */
  async signOut() {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get current active session
   */
  async getSession() {
    if (!isSupabaseConfigured) return null;
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * Fetch current user's profile from public.profiles
   */
  async getProfile(userId) {
    if (!isSupabaseConfigured || !userId) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.warn('[SupabaseAuth] Profile fetch error:', error.message);
      return null;
    }
    return data;
  },

  /**
   * Update current user's profile
   */
  async updateProfile(userId, updates) {
    if (!isSupabaseConfigured || !userId) return null;

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
