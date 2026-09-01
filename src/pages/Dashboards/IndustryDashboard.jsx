import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Briefcase, TrendingUp, Handshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';

export const IndustryDashboard = () => {
  const { projects } = useProjects();
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/70 border border-amber-800/80 px-2.5 py-0.5 rounded">
            Corporate CSR & Mentorship Command
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            {currentUser.company || 'Tata Steel Foundation & CSR'}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Lead Evaluator: <strong>{currentUser.name}</strong> ({currentUser.designation || 'Chief Sustainability Officer'})
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Projects Mentored" value="12" color="emerald" subtitle="Active prototypes" />
        <StatCard title="CSR Grants Disbursed" value="₹2.4 Cr" color="amber" subtitle="Total prototype aid" />
        <StatCard title="Mentorship Openings" value="6" color="indigo" subtitle="Available capacity" />
        <StatCard title="Field Validation Rate" value="94%" color="forest" subtitle="Passed testing" />
      </div>

      {/* Mentored Project Workspaces */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Mentored Student Projects & CSR Grantees
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
