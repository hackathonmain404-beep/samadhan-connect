import React from 'react';
import { Sparkles, Users, Database, ShieldAlert, CheckCircle2, Award, Landmark, Building } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { useChallenges } from '../../context/ChallengeContext';
import { useProjects } from '../../context/ProjectContext';

export const AdminDashboard = () => {
  const { challenges } = useChallenges();
  const { projects, universities, industries, teams } = useProjects();

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/70 border border-amber-800/80 px-2.5 py-0.5 rounded">
            State Innovation Mission Administrator
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Platform Master Console
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Global system monitoring, user access control, and moderation across 24 districts of Jharkhand.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard title="Registered Users" value="48,500+" color="emerald" />
        <StatCard title="Challenges" value={challenges.length} color="amber" />
        <StatCard title="Workspaces" value={projects.length} color="indigo" />
        <StatCard title="Universities" value={universities.length} color="forest" />
        <StatCard title="Industry CSRs" value={industries.length} color="amber" />
        <StatCard title="Student Teams" value={teams.length} color="emerald" />
      </div>

      {/* System Health & Moderation Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Statewide System Activity & Node Telemetry
        </h3>
        <div className="space-y-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-800">State Gateway API & Database Sync</span>
            </div>
            <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">99.98% Operational</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-800">Borehole & Mist Cannon IoT Telemetry Ingestion</span>
            </div>
            <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">Active (142 Nodes)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-800">Smart India Hackathon 2026 Sync Bridge</span>
            </div>
            <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
