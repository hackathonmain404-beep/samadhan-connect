import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, Info, Award, Flag, ArrowRight } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export const NotificationsPage = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'mentor':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'milestone':
        return <Flag className="w-5 h-5 text-indigo-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Activity Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Notifications Center
          </h1>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors border border-emerald-200"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
              n.read
                ? 'bg-white border-slate-200/80 text-slate-600'
                : 'bg-emerald-50/60 border-emerald-300 text-slate-900 shadow-soft'
            }`}
          >
            <div className="mt-0.5">{getIcon(n.type)}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{n.title}</h3>
                <span className="text-[11px] text-slate-400 font-medium">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
              {n.link && (
                <div className="pt-2">
                  <Link
                    to={n.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>View Related Resource</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
