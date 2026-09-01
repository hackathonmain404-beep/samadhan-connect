import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const supabaseMessageService = {
  /**
   * Fetch conversations for the current user
   */
  async getConversations(userId) {
    if (!isSupabaseConfigured || !userId) return null;

    const { data, error } = await supabase
      .from('conversation_members')
      .select(`
        conversation_id,
        conversation:conversations(
          id,
          updated_at,
          members:conversation_members(
            user:profiles(id, name, role, avatar_url)
          ),
          messages:messages(id, sender_id, text, created_at)
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  },

  /**
   * Send message in a conversation
   */
  async sendMessage(conversationId, senderId, text) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        text,
      })
      .select(`*, sender:profiles!sender_id(name, role, avatar_url)`)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Subscribe to Realtime messages for a conversation
   */
  subscribeToConversation(conversationId, onNewMessage) {
    if (!isSupabaseConfigured) return { unsubscribe: () => {} };

    const channel = supabase
      .channel(`realtime:conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          onNewMessage(payload.new);
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
