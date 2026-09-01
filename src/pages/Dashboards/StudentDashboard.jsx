import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Lightbulb, FolderKanban, Users, Clock, ArrowRight, Sparkles, PlusCircle } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { ChallengeCard } from '../../components/cards/ChallengeCard';
import { useProjects } from '../../context/ProjectContext';
import { useChallenges } from '../../context/ChallengeContext';
import { useAuth } from '../../context/AuthContext';

export const StudentDashboard = () => {
  const { projects, solutions } = useProjects();
  const { challenges } = useChallenges();
  const { currentUser } = useAuth();

  const recommendedChallenges = challenges.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2.5 py-0.5 rounded">
            Student Innovator & Research Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-xs text-emerald-100/80 mt-1">
            {currentUser.team || 'Team JalRakshak'} • {currentUser.institution || 'BIT Mesra'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/propose-solution"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-soft transition-all shrink-0"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Submit New Proposal</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Workspaces" value="2" color="emerald" subtitle="In execution" />
        <StatCard title="Proposals Submitted" value={solutions.length} color="amber" subtitle="Technical blueprints" />
        <StatCard title="Hackathon Milestones" value="4 Done" color="indigo" subtitle="Sprint progress" />
        <StatCard title="Industry Mentor" value="Assigned" color="forest" subtitle="Tata Steel Foundation" />
      </div>

      {/* Active Workspaces */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            My Active Project Workspaces
          </h2>
          <Link to="/projects" className="text-xs font-bold text-emerald-700 hover:underline">
            View All Workspaces
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      {/* Recommended Challenges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900">
              AI-Recommended Challenges for Your Skills
            </h2>
          </div>
          <Link to="/challenges" className="text-xs font-bold text-emerald-700 hover:underline">
            Browse Marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedChallenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      </div>
    </div>
  );
};
