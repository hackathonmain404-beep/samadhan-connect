import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Globe2, ShieldCheck, UserCheck, ArrowRight, Sparkles, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useAuth, USER_ROLES } from '../../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login, USER_ROLES, switchPersona, DEMO_USERS, getDashboardRoute } = useAuth();

  const [selectedRole, setSelectedRole] = useState(USER_ROLES.STUDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    const demoUser = DEMO_USERS[role];
    if (demoUser) {
      setEmail(demoUser.email);
      setPassword('password123');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password, selectedRole);
    switchPersona(selectedRole);
    navigate(getDashboardRoute(selectedRole));
  };

  const handleQuickDemo = (role) => {
    handleRoleSelect(role);
    switchPersona(role);
    navigate(getDashboardRoute(role));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Col: Visual & Branding */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-950 p-8 text-white flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-white border border-white/20">
              <Globe2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Samadhan Connect
            </h2>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Jharkhand's civic innovation and collaborative problem-solving gateway.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Hackathon Evaluation</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Use the 1-click role buttons on the right to test dashboards as Citizen, Student, University, Industry, Government, or Admin.
            </p>
          </div>

          <div className="text-[10px] text-emerald-300/80 font-medium">
            Smart India Hackathon 2026 • Govt of Jharkhand
          </div>
        </div>

        {/* Right Col: Login Form */}
        <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Welcome back to Samadhan
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Select your stakeholder role to access your dedicated dashboard.
            </p>
          </div>

          {/* Role Select Buttons */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Select Stakeholder Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {Object.values(USER_ROLES).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-center truncate ${
                    selectedRole === role
                      ? 'bg-emerald-700 text-white shadow-soft font-bold ring-2 ring-emerald-400'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {role.split('/')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 1-Click Demo Login Shortcuts */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>1-Click Instant Demo Login</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-[11px]">
              {Object.values(USER_ROLES).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleQuickDemo(role)}
                  className="p-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 text-center transition-colors truncate shadow-2xs"
                >
                  {role.split('/')[0]} →
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email || DEMO_USERS[selectedRole]?.email || ''}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password || 'password123'}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft transition-all"
            >
              Sign In as {selectedRole.split('/')[0]}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-emerald-700 hover:underline">
              Create New Stakeholder Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
