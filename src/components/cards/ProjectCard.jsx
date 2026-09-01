import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Briefcase, ArrowRight } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  if (!project) return null;

  const leadNameDisplay = typeof project.leadName === 'string'
    ? project.leadName.split(' ')[0]
    : (project.leadName || 'Lead');

  const mentorDisplay = typeof project.industryMentor === 'string'
    ? project.industryMentor.split('(')[0]
    : (typeof project.industryMentor === 'object' && project.industryMentor?.name
      ? project.industryMentor.name
      : null);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
            {project.category || 'General'}
          </span>
          <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
            Phase: {project.currentStage || 'Prototype'}
          </span>
        </div>

        <Link to={`/projects/${project.id}`}>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 line-clamp-2 leading-snug">
            {project.name}
          </h3>
        </Link>

        {project.challengeTitle && (
          <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-1">
            Solving: <span className="text-slate-700 font-semibold">{project.challengeTitle}</span>
          </p>
        )}

        <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
          {project.university && (
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate">{project.university}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">{project.teamName || 'Innovation Team'}</span>
            <span className="text-slate-400">({leadNameDisplay} et al.)</span>
          </div>
          {mentorDisplay && (
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate text-slate-700">Mentor: {mentorDisplay}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
            <span>Implementation Progress</span>
            <span className="text-emerald-700 font-extrabold">{project.completionPercentage || 50}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${project.completionPercentage || 50}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Due: {project.expectedCompletion || '2026'}</span>
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Open Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
