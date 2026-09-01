import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Lightbulb,
  FolderKanban,
  Users,
  Building,
  Award,
  MessageSquare,
  Bell,
  User,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useAuth, USER_ROLES } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useMessages } from '../../context/MessageContext';

export const Sidebar = () => {
  const location = useLocation();
  const { currentUser, USER_ROLES, getDashboardRoute } = useAuth();
  const { unreadCount } = useNotifications();
  const { totalUnreadMessages } = useMessages();

  const role = currentUser?.role || USER_ROLES.CITIZEN;

  const getNavItems = () => {
    const items = [
      { name: 'Dashboard', path: getDashboardRoute(role), icon: LayoutDashboard },
      { name: 'Explore Challenges', path: '/challenges', icon: Compass },
      { name: 'Solutions', path: '/solutions', icon: Lightbulb },
      { name: 'Projects', path: '/projects', icon: FolderKanban },
      { name: 'Innovation Teams', path: '/collaboration', icon: Users },
      { name: 'Universities', path: '/universities', icon: Building },
      { name: 'Industry Partners', path: '/industry-partners', icon: Award },
      { name: 'Direct Messages', path: '/messages', icon: MessageSquare, badge: totalUnreadMessages },
      { name: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount }
    ];
    return items;
  };

  const navItems = getNavItems();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const roleLabel = typeof currentUser?.role === 'string' ? currentUser.role.split('/')[0] : 'Member';

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 shrink-0 min-h-[calc(100vh-5rem)] flex flex-col justify-between p-4 hidden lg:flex">
      <div className="space-y-6">
        {/* User Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-slate-50 to-amber-50/40 border border-emerald-100 flex items-center gap-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
            alt={currentUser?.name || 'User'}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-600 shadow-xs"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'User'}</h4>
            <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to="/report-problem"
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs shadow-soft transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report a Problem</span>
        </Link>

        {/* Nav Links */}
        <nav className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
            Navigation
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-800 text-white font-bold shadow-soft'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-white text-emerald-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
        <p className="font-semibold text-slate-600">Samadhan Connect</p>
        <p className="text-[10px]">Jharkhand Civic Tech • v2.0</p>
      </div>
    </aside>
  );
};
