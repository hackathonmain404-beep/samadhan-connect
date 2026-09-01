import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MapPin,
  TrendingUp,
  Award,
  Clock,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge, UrgencyBadge } from '../../components/ui/StatusBadge';
import { useChallenges } from '../../context/ChallengeContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const GovernmentDashboard = () => {
  const { challenges, updateChallengeStatus } = useChallenges();
  const { currentUser } = useAuth();
  const [actionFeedback, setActionFeedback] = useState(null);

  const pendingChallenges = challenges.filter(c => c.status === 'Under Review' || c.lifecycleStage === 'Pending');

  const handleApprove = (challengeId, title) => {
    updateChallengeStatus(challengeId, 'Open for Solutions', 'Jharkhand State Innovation Mission');
    setActionFeedback({ type: 'success', text: `Verified & Approved "${title}"! Published to Open Marketplace.` });
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleReject = (challengeId, title) => {
    updateChallengeStatus(challengeId, 'Duplicate / Closed');
    setActionFeedback({ type: 'danger', text: `Flagged "${title}" as duplicate / archived.` });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleRequestInfo = (challengeId, title) => {
    setActionFeedback({ type: 'warning', text: `Requested additional GPS evidence from citizen for "${title}".` });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-2.5 py-0.5 rounded border border-emerald-700">
            Statewide Command Center & Verification Queue
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Government Nodal Dashboard
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Official: <strong>{currentUser.name}</strong> • {currentUser.department || 'IT Secretary & Nodal Officer'}
          </p>
        </div>
      </div>

      {actionFeedback && (
        <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 animate-slide-up ${
          actionFeedback.type === 'success' ? 'bg-emerald-100 border-emerald-300 text-emerald-950' :
          actionFeedback.type === 'danger' ? 'bg-rose-100 border-rose-300 text-rose-950' :
          'bg-amber-100 border-amber-300 text-amber-950'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionFeedback.text}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pending Verifications" value={pendingChallenges.length || '3'} color="amber" subtitle="Awaiting nodal review" />
        <StatCard title="Verified Challenges" value="980+" color="emerald" subtitle="Listed for solutions" />
        <StatCard title="Active Field Deployments" value="68" color="indigo" subtitle="In pilot panchayats" />
        <StatCard title="Average Triage Time" value="18 Hours" color="forest" subtitle="Citizen SLA adherence" />
      </div>

      {/* Verification Queue Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Grievance & Challenge Verification Queue ({pendingChallenges.length})
            </h3>
            <p className="text-xs text-slate-500">
              Review incoming citizen problem submissions and authorize them for university solution matching.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-2">Problem Statement</th>
                <th className="pb-3 px-2">District</th>
                <th className="pb-3 px-2">Domain</th>
                <th className="pb-3 px-2">Urgency</th>
                <th className="pb-3 px-2 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingChallenges.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-2 max-w-sm">
                    <Link to={`/challenges/${c.id}`} className="font-bold text-slate-900 hover:text-emerald-700 line-clamp-1 block">
                      {c.title}
                    </Link>
                    <span className="text-[11px] text-slate-400">By {c.submittedBy} ({c.submittedDate})</span>
                  </td>
                  <td className="py-3.5 px-2 text-slate-700 font-semibold">{c.district}</td>
                  <td className="py-3.5 px-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium">
                      {c.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-2">
                    <UrgencyBadge urgency={c.urgency} />
                  </td>
                  <td className="py-3.5 px-2 text-right space-x-1.5 shrink-0">
                    <button
                      onClick={() => handleApprove(c.id, c.title)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] shadow-2xs transition-colors"
                      title="Verify and open for solutions"
                    >
                      Approve & List
                    </button>
                    <button
                      onClick={() => handleRequestInfo(c.id, c.title)}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-[11px] transition-colors"
                      title="Request more information"
                    >
                      Request Info
                    </button>
                    <button
                      onClick={() => handleReject(c.id, c.title)}
                      className="px-2 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[11px] transition-colors"
                      title="Reject / Close"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* District Analytics Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            District Grievance Resolution Efficiency
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { district: 'Ranchi', count: '380 Challenges', resolved: '84%', color: 'bg-emerald-600' },
              { district: 'East Singhbhum (Jamshedpur)', count: '290 Challenges', resolved: '88%', color: 'bg-emerald-600' },
              { district: 'Dhanbad', count: '240 Challenges', resolved: '76%', color: 'bg-amber-500' },
              { district: 'Bokaro', count: '180 Challenges', resolved: '82%', color: 'bg-emerald-600' },
              { district: 'Deoghar', count: '140 Challenges', resolved: '79%', color: 'bg-amber-500' }
            ].map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-700 font-semibold">
                  <span>{d.district}</span>
                  <span>{d.count} ({d.resolved} resolved)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${d.color} rounded-full`} style={{ width: d.resolved }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Category Breakdown & Innovation Saturation
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <span className="font-semibold text-slate-800">Water Management</span>
              <strong className="text-emerald-800">18 Active Projects</strong>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <span className="font-semibold text-slate-800">Agriculture & Cold Chain</span>
              <strong className="text-emerald-800">24 Active Projects</strong>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <span className="font-semibold text-slate-800">Education & STEM</span>
              <strong className="text-emerald-800">21 Active Projects</strong>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <span className="font-semibold text-slate-800">Mine Remediation & Clean Air</span>
              <strong className="text-emerald-800">19 Active Projects</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
