import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CONVERSATIONS } from '../data/mockMessages';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('samadhan_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [activeConversationId, setActiveConversationId] = useState(INITIAL_CONVERSATIONS[0]?.id || 'conv-1');

  useEffect(() => {
    localStorage.setItem('samadhan_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const sendMessage = (conversationId, text, currentUser) => {
    if (!text.trim()) return;

    const newMessage = {
      id: `m-${Date.now()}`,
      senderId: currentUser?.id || 'user-me',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text.trim(),
          lastMessageTime: 'Just now',
          messages: [...(c.messages || []), newMessage]
        };
      }
      return c;
    }));
  };

  const startConversation = (participant) => {
    const existing = conversations.find(c => c.participantId === participant.id);
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv = {
      id: newConvId,
      participantId: participant.id || `user-${Date.now()}`,
      participantName: participant.name,
      participantRole: participant.role || 'Collaborator',
      participantAvatar: participant.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Conversation started',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: `m-${Date.now()}`,
          senderId: 'system',
          text: `Direct collaboration channel connected with ${participant.name}.`,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    return newConvId;
  };

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <MessageContext.Provider value={{
      conversations,
      activeConversationId,
      activeConversation,
      setActiveConversationId,
      sendMessage,
      startConversation,
      totalUnreadMessages
    }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
