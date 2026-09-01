import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PlusCircle, CheckCircle2, Clock, ThumbsUp, MapPin, ArrowRight } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressTracker } from '../../components/ui/ProgressTracker';
import { useChallenges } from '../../context/ChallengeContext';
import { useAuth } from '../../context/AuthContext';

export const CitizenDashboard = () => {
  const { challenges, supportedChallenges } = useChallenges();
  const { currentUser } = useAuth();

  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Citizen';

  const myChallenges = challenges.filter(c => {
    if (!c) return false;
    if (c.userRole === 'Citizen') return true;
    if (c.submittedBy && typeof c.submittedBy === 'string') {
      if (c.submittedBy.includes('Sunita') || c.submittedBy.includes(firstName)) return true;
    }
    return false;
  });

  const lifecycleStages = ['Pending', 'Under Review', 'Verified', 'Open', 'In Progress', 'Resolved'];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-700/60 px-2.5 py-0.5 rounded">
            Citizen Grievance & Innovation Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Welcome back, {currentUser?.name || 'Citizen'}!
          </h1>
          <p className="text-xs text-emerald-100/80 mt-1">
            Track your reported community problems and see real-time updates from university innovators.
          </p>
        </div>

        <Link
          to="/report-problem"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs shadow-soft transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-emerald-700" />
          <span>Report New Problem</span>
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Problems Submitted" value={myChallenges.length || '3'} color="emerald" subtitle="Reported by you" />
        <StatCard title="Under Verification" value="1" color="amber" subtitle="Pending Govt Nodal review" />
        <StatCard title="Being Solved" value="2" color="indigo" subtitle="Active student teams" />
        <StatCard title="Supported Issues" value={supportedChallenges.length} color="forest" subtitle="Community upvotes" />
      </div>

      {/* 6-Stage Resolution Tracking for Citizen's Reported Problems */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          My Reported Problems & Resolution Progress
        </h2>

        <div className="space-y-4">
          {myChallenges.map((c) => {
            const currentStageIndex = lifecycleStages.indexOf(c.lifecycleStage || 'Open') !== -1
              ? lifecycleStages.indexOf(c.lifecycleStage || 'Open')
              : 3;

            return (
              <div key={c.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {c.category}
                      </span>
                      <StatusBadge status={c.status} />
                      <span className="text-[11px] text-slate-400 font-mono">ID: {c.id}</span>
                    </div>
                    <Link to={`/challenges/${c.id}`}>
                      <h3 className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                        {c.title}
                      </h3>
                    </Link>
                  </div>

                  <Link
                    to={`/challenges/${c.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline shrink-0"
                  >
                    <span>View Public Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Live Problem Resolution Pipeline
                  </span>
                  <ProgressTracker stages={lifecycleStages} currentStageIndex={currentStageIndex} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500 border-t border-slate-100">
                  <span>Location: <strong className="text-slate-700">{c.location}</strong></span>
                  <span><strong className="text-emerald-700">{c.teamsWorking || 2}</strong> Student Teams Developing Solution</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
