import React from 'react';
import { Link } from 'react-router-dom';
import { X, Bell, CheckCircle2, Info, Award, Flag, ArrowRight } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'mentor':
        return <Award className="w-4 h-4 text-amber-600" />;
      case 'milestone':
        return <Flag className="w-4 h-4 text-indigo-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-slide-up">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                <p className="text-[11px] text-slate-500">{unreadCount} unread platform updates</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`p-4 rounded-2xl border transition-all text-xs ${
                    n.read
                      ? 'bg-slate-50/60 border-slate-100 text-slate-600'
                      : 'bg-emerald-50/40 border-emerald-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`font-bold leading-tight ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>
                          {n.title}
                        </h4>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-2">{n.message}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>{n.timestamp}</span>
                        {n.link && (
                          <Link
                            to={n.link}
                            onClick={onClose}
                            className="text-emerald-700 font-bold hover:underline flex items-center gap-0.5"
                          >
                            <span>Open</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
