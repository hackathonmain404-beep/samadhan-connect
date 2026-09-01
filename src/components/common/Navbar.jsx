import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Globe2,
  PlusCircle,
  Search,
  Bell,
  MessageSquare,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Building,
  GraduationCap
} from 'lucide-react';
import { useAuth, USER_ROLES } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useMessages } from '../../context/MessageContext';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationDrawer } from './NotificationDrawer';

export const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout, USER_ROLES, switchPersona, getDashboardRoute } = useAuth();
  const { unreadCount } = useNotifications();
  const { totalUnreadMessages } = useMessages();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Challenges', path: '/challenges' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Projects', path: '/projects' },
    { name: 'Universities', path: '/universities' },
    { name: 'Industry Partners', path: '/industry-partners' },
    { name: 'Collaboration Hub', path: '/collaboration' },
    { name: 'Impact', path: '/impact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const userName = currentUser?.name ? currentUser.name.split(' ')[0] : 'User';
  const roleLabel = currentUser?.role ? currentUser.role.split('/')[0] : 'Member';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-300">
                <Globe2 className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                    Samadhan<span className="text-emerald-700">Connect</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Jharkhand
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                  State Civic Innovation & Problem Solving
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive(link.path)
                      ? 'text-emerald-800 bg-emerald-50 font-bold border border-emerald-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons & User Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="Search platform (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Messages Shortcut */}
              <Link
                to="/messages"
                className="relative w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="Direct Messages"
              >
                <MessageSquare className="w-4 h-4" />
                {totalUnreadMessages > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
                )}
              </Link>

              {/* Notification Bell */}
              <button
                onClick={() => setNotifDrawerOpen(true)}
                className="relative w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              {/* Primary Action Button: Report a Problem */}
              <Link
                to="/report-problem"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs shadow-soft hover:shadow-soft-lg transition-all"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>Report Problem</span>
              </Link>

              {/* User Persona Profile / Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold transition-all border border-slate-200/60"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={currentUser?.name || 'User'}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-600"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold leading-tight line-clamp-1">{userName}</p>
                    <p className="text-[10px] text-emerald-800 font-bold leading-tight">{roleLabel}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-slide-up"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-500">{currentUser?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                        {currentUser?.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardRoute(currentUser?.role || USER_ROLES.CITIZEN)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                        <span>My {roleLabel} Dashboard</span>
                      </Link>

                      <Link
                        to="/report-problem"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-600" />
                        <span>Report New Problem</span>
                      </Link>

                      <Link
                        to="/messages"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span>Direct Messages</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Switch Persona
                      </div>
                      {Object.values(USER_ROLES).map((role) => (
                        <button
                          key={role}
                          onClick={() => switchPersona(role)}
                          className={`w-full text-left px-4 py-1.5 text-xs transition-colors flex items-center justify-between ${
                            currentUser?.role === role ? 'font-bold text-emerald-800 bg-emerald-50' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{role}</span>
                          {currentUser?.role === role && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <Link
                        to="/login"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out / Switch Account</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-slide-up shadow-lg">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Link
                to={getDashboardRoute(currentUser?.role || USER_ROLES.CITIZEN)}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/report-problem"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-soft"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Problem</span>
              </Link>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive(link.path)
                    ? 'text-emerald-800 bg-emerald-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-slate-700 hover:text-emerald-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search & Notifications Drawers */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <NotificationDrawer isOpen={notifDrawerOpen} onClose={() => setNotifDrawerOpen(false)} />
    </>
  );
};
