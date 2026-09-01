import React from 'react';
import { PLATFORM_STATS, SUCCESS_STORIES } from '../data/mockStats';
import { Award, CheckCircle2, TrendingUp, Users, MapPin, Sparkles } from 'lucide-react';

export const ImpactShowcase = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
          Statewide Metrics & Case Studies
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Jharkhand Civic Impact
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Tracking tangible improvements in public health, rural cold chains, STEM education, and clean water across all 24 districts.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <span className="block text-3xl font-extrabold text-emerald-800 mb-1">{PLATFORM_STATS.problemsReported}</span>
          <span className="text-xs font-semibold text-slate-600">Problems Reported</span>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <span className="block text-3xl font-extrabold text-slate-900 mb-1">{PLATFORM_STATS.challengesVerified}</span>
          <span className="text-xs font-semibold text-slate-600">Govt Verified</span>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <span className="block text-3xl font-extrabold text-amber-600 mb-1">{PLATFORM_STATS.solutionsProposed}</span>
          <span className="text-xs font-semibold text-slate-600">Solutions Proposed</span>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <span className="block text-3xl font-extrabold text-teal-700 mb-1">{PLATFORM_STATS.projectsCompleted}</span>
          <span className="text-xs font-semibold text-slate-600">Completed Pilots</span>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <span className="block text-3xl font-extrabold text-indigo-700 mb-1">{PLATFORM_STATS.fundingDisbursed}</span>
          <span className="text-xs font-semibold text-slate-600">CSR Grant Funding</span>
        </div>
      </div>

      {/* Detailed Case Studies */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Featured Community Transformation Case Studies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((story) => (
            <div key={story.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-emerald-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {story.district}, Jharkhand
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {story.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{story.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{story.summary}</p>

                  <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">Verified Outcome</span>
                    <p className="text-xs font-bold text-emerald-800">{story.stats}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 text-[11px] text-slate-400 border-t border-slate-100 mt-2">
                Partner: <strong className="text-slate-700">{story.partner}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
