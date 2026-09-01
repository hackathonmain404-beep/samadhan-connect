import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Building, Users, Clock, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';

export const SolutionCard = ({ solution }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
            {solution.category}
          </span>
          <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            {solution.status}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 leading-snug">
          {solution.title}
        </h3>

        <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-1">
          Solving:{' '}
          <Link to={`/challenges/${solution.challengeId}`} className="text-slate-800 hover:text-emerald-700 underline underline-offset-2">
            {solution.challengeTitle}
          </Link>
        </p>

        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {solution.description}
        </p>

        <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{solution.university}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">{solution.teamName}</span>
            <span className="text-slate-400">({solution.leadName})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Timeline: {solution.estimatedDuration}</span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Tech Stack</span>
          <div className="flex flex-wrap gap-1">
            {solution.technologies?.map((tech, idx) => (
              <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400">Submitted {solution.submissionDate}</span>
        <Link
          to={`/challenges/${solution.challengeId}`}
          className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-0.5 transition-transform"
        >
          <span>View Challenge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
