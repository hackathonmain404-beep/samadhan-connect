import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Globe2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth, USER_ROLES } from '../../context/AuthContext';
import { DISTRICTS } from '../../data/mockChallenges';

export const Register = () => {
  const navigate = useNavigate();
  const { register, USER_ROLES, switchPersona, getDashboardRoute } = useAuth();

  const [selectedRole, setSelectedRole] = useState(USER_ROLES.STUDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    district: 'Ranchi',
    institution: '',
    department: '',
    company: '',
    designation: '',
    panchayat: '',
    skills: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      role: selectedRole
    };
    register(newUser);
    switchPersona(selectedRole);
    navigate(getDashboardRoute(selectedRole));
  };

  const roleDescriptions = {
    [USER_ROLES.CITIZEN]: 'Report and support local community challenges.',
    [USER_ROLES.STUDENT]: 'Join challenges and build technological solutions.',
    [USER_ROLES.UNIVERSITY]: 'Mentor teams and manage research innovation cells.',
    [USER_ROLES.INDUSTRY]: 'Support projects through CSR sponsorship and mentorship.',
    [USER_ROLES.GOVERNMENT]: 'Verify problems and monitor implementation field trials.',
    [USER_ROLES.ADMIN]: 'Platform analytics and statewide system administration.'
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-6">
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-soft">
            <Globe2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Create Stakeholder Account
          </h1>
          <p className="text-xs text-slate-500">
            Join the Smart India Hackathon civic innovation platform for Jharkhand
          </p>
        </div>

        {/* Role Selector */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Register As:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.values(USER_ROLES).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  selectedRole === role
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="block text-xs font-bold truncate">{role.split('/')[0]}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 line-clamp-2 leading-tight">
                  {roleDescriptions[role]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. aarav@bitmesra.ac.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">District (Jharkhand) *</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
              >
                {DISTRICTS.filter(d => d !== 'All Districts').map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Citizen Fields */}
          {selectedRole === USER_ROLES.CITIZEN && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Gram Panchayat / Village / Ward</label>
              <input
                type="text"
                placeholder="e.g. Angara Gram Panchayat"
                value={formData.panchayat}
                onChange={(e) => setFormData({ ...formData, panchayat: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              />
            </div>
          )}

          {/* Student Fields */}
          {selectedRole === USER_ROLES.STUDENT && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">University / College Name *</label>
                <input
                  type="text"
                  placeholder="e.g. BIT Mesra, NIT Jamshedpur"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Major / Engineering Branch *</label>
                <input
                  type="text"
                  placeholder="e.g. Chemical Eng, IoT"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  required
                />
              </div>
            </div>
          )}

          {/* University Fields */}
          {selectedRole === USER_ROLES.UNIVERSITY && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Institution Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Birla Institute of Technology"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Department / R&D Cell *</label>
                <input
                  type="text"
                  placeholder="e.g. Dean R&D / Innovation Cell"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  required
                />
              </div>
            </div>
          )}

          {/* Industry Fields */}
          {selectedRole === USER_ROLES.INDUSTRY && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Enterprise / CSR Foundation *</label>
                <input
                  type="text"
                  placeholder="e.g. Tata Steel Foundation"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                <input
                  type="text"
                  placeholder="e.g. Chief Sustainability Officer"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  required
                />
              </div>
            </div>
          )}

          {/* Government Fields */}
          {selectedRole === USER_ROLES.GOVERNMENT && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Government Department *</label>
                <input
                  type="text"
                  placeholder="e.g. Dept of Drinking Water & Sanitation"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                <input
                  type="text"
                  placeholder="e.g. District Nodal Officer / Joint Secretary"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft transition-all"
          >
            Create {selectedRole.split('/')[0]} Account
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-emerald-700 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};
