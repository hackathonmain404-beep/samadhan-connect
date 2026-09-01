import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const supabaseNotificationService = {
  /**
   * Fetch notifications for current user
   */
  async getNotifications(userId) {
    if (!isSupabaseConfigured || !userId) return null;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;
    return data;
  },

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Subscribe to Realtime user notifications
   */
  subscribeToNotifications(userId, onNewNotification) {
    if (!isSupabaseConfigured || !userId) return { unsubscribe: () => {} };

    const channel = supabase
      .channel(`realtime:notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          onNewNotification(payload.new);
        }
      )
      .subscribe();

    return {
      unsubscribe: () => {
        supabase.removeChannel(channel);
      },
    };
  },
};
