import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, FolderKanban, Award, Sparkles, ArrowRight } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';

export const UniversityDashboard = () => {
  const { projects } = useProjects();
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-700/60 px-2.5 py-0.5 rounded">
            University Innovation & Incubation Cell
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            {currentUser.institution || 'Birla Institute of Technology (BIT) Mesra'}
          </h1>
          <p className="text-xs text-emerald-100/80 mt-1">
            Managed by: <strong>{currentUser.name}</strong> ({currentUser.title || 'Dean of Research'})
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Student Teams" value="42" color="emerald" subtitle="Active in Hackathons" />
        <StatCard title="Active R&D Projects" value={projects.length} color="amber" subtitle="Multi-phase workspaces" />
        <StatCard title="Faculty Mentors" value="18" color="indigo" subtitle="Department coordinators" />
        <StatCard title="NIRF Innovation Score" value="A+" color="forest" subtitle="State ranking lead" />
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Departmental Innovation Participation
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <strong className="block text-sm text-emerald-800">Chemical & Env</strong>
            <span className="text-slate-500">12 Projects</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <strong className="block text-sm text-emerald-800">Computer Science & IoT</strong>
            <span className="text-slate-500">18 Projects</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <strong className="block text-sm text-emerald-800">Mechanical & Agri</strong>
            <span className="text-slate-500">8 Projects</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <strong className="block text-sm text-emerald-800">Electrical & Electronics</strong>
            <span className="text-slate-500">4 Projects</span>
          </div>
        </div>
      </div>

      {/* Incubation Workspaces */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Institutional Incubation Workspaces
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
