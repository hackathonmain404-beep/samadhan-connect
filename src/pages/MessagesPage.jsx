import React, { useState } from 'react';
import { MessageSquare, Send, User, Search, CheckCheck } from 'lucide-react';
import { useMessages } from '../context/MessageContext';
import { useAuth } from '../context/AuthContext';

export const MessagesPage = () => {
  const { conversations, activeConversationId, activeConversation, setActiveConversationId, sendMessage } = useMessages();
  const { currentUser } = useAuth();
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredConversations = conversations.filter(c =>
    c.participantName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.participantRole.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, inputText, currentUser);
    setInputText('');
  };

  const participantFirstName = activeConversation?.participantName
    ? (typeof activeConversation.participantName === 'string' ? activeConversation.participantName.split(' ')[0] : 'User')
    : 'User';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Stakeholder Communications</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Messages & Collaboration Threads
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left 4 Cols: Conversation List */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-3.5 border-b border-slate-200">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter messages..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                    isActive ? 'bg-emerald-50/80 border-l-4 border-emerald-700' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{conv.participantName}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{conv.lastMessageTime}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/60 px-1.5 py-0.2 rounded mb-1 inline-block">
                      {conv.participantRole}
                    </span>
                    <p className="text-[11px] text-slate-500 truncate">{conv.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Chat Conversation Screen */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col bg-white">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConversation.participantAvatar}
                    alt={activeConversation.participantName}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-600 shadow-xs"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{activeConversation.participantName}</h3>
                    <p className="text-[11px] text-emerald-800 font-semibold">{activeConversation.participantRole}</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30">
                {activeConversation.messages?.map((msg) => {
                  const isMe = msg.senderId === currentUser?.id || msg.senderId === 'user-me';

                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                          isMe
                            ? 'bg-emerald-700 text-white rounded-br-xs shadow-soft'
                            : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <div className={`text-[9px] flex items-center justify-end gap-1 ${isMe ? 'text-emerald-200' : 'text-slate-400'}`}>
                          <span>{msg.timestamp}</span>
                          {isMe && <CheckCheck className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Write a reply to ${participantFirstName}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white shadow-soft transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-12 text-center text-xs text-slate-400">
              Select a conversation thread to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
