import React from 'react';
import { UserCheck, Sparkles, Shield, GraduationCap, Building, Landmark, Award, ArrowRight } from 'lucide-react';
import { useAuth, USER_ROLES } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const PersonaBanner = () => {
  const { currentUser, switchPersona, USER_ROLES, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    switchPersona(role);
    const dest = getDashboardRoute(role);
    navigate(dest);
  };

  const roleIcons = {
    [USER_ROLES.CITIZEN]: Shield,
    [USER_ROLES.STUDENT]: GraduationCap,
    [USER_ROLES.UNIVERSITY]: Building,
    [USER_ROLES.INDUSTRY]: Award,
    [USER_ROLES.GOVERNMENT]: Landmark,
    [USER_ROLES.ADMIN]: Sparkles
  };

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-950/70 border border-amber-800/80 px-2 py-0.5 rounded text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Hackathon Demo Switcher:
          </span>
          <span className="text-[11px] text-slate-300 hidden sm:inline">
            Active: <strong className="text-emerald-400 font-bold">{currentUser?.name || 'User'}</strong> ({currentUser?.role || 'Stakeholder'})
          </span>
        </div>

        {/* 1-Click Role Quick Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
          {Object.values(USER_ROLES).map((role) => {
            const Icon = roleIcons[role] || UserCheck;
            const isActive = currentUser?.role === role;
            const shortLabel = typeof role === 'string' ? role.split('/')[0].trim() : role;

            return (
              <button
                key={role}
                onClick={() => handleSelectRole(role)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 shadow-sm'
                    : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={`Switch persona to ${role}`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span>{shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
