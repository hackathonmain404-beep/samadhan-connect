import React from 'react';
import { Building, MapPin, Users, Lightbulb, ExternalLink, ShieldCheck } from 'lucide-react';

export const UniversityCard = ({ university, onViewPortfolio }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
          <img
            src={university.banner}
            alt={university.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <img
              src={university.logo}
              alt={university.shortName}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md bg-white shrink-0"
            />
            <div className="text-white min-w-0">
              <h4 className="text-sm font-bold truncate drop-shadow-sm">{university.shortName}</h4>
              <p className="text-[11px] text-emerald-200 drop-shadow-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {university.district}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md mb-2.5 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{university.verifiedStatus}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
            {university.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {university.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-center">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="block text-xs font-bold text-slate-800">{university.studentTeamsCount}</span>
              <span className="text-[10px] text-slate-500 font-medium">Student Teams</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="block text-xs font-bold text-emerald-700">{university.activeProjectsCount}</span>
              <span className="text-[10px] text-slate-500 font-medium">Active R&D Projects</span>
            </div>
          </div>

          <div className="space-y-1 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Core Specializations</span>
            <div className="flex flex-wrap gap-1">
              {university.specialization.slice(0, 3).map((spec, i) => (
                <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <button
          onClick={() => onViewPortfolio(university)}
          className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white font-bold text-xs transition-all duration-200 text-center"
        >
          View Innovation Portfolio
        </button>
      </div>
    </div>
  );
};
