import React from 'react';
import { Building2, MapPin, Award, ArrowRight, Handshake, CheckCircle2 } from 'lucide-react';

export const IndustryCard = ({ industry, onRequestMentorship }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
          <img
            src={industry.banner}
            alt={industry.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <img
              src={industry.logo}
              alt={industry.shortName}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md bg-white shrink-0"
            />
            <div className="text-white min-w-0">
              <h4 className="text-sm font-bold truncate drop-shadow-sm">{industry.shortName}</h4>
              <p className="text-[11px] text-emerald-200 drop-shadow-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {industry.district}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md mb-2.5 inline-block">
            {industry.industry}
          </span>

          <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
            {industry.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {industry.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-center">
            <div className="bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
              <span className="block text-xs font-bold text-emerald-800">{industry.projectsMentoredCount}</span>
              <span className="text-[10px] text-emerald-700 font-medium">Projects Mentored</span>
            </div>
            <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
              <span className="block text-xs font-bold text-amber-900">{industry.totalFundingDisbursed}</span>
              <span className="text-[10px] text-amber-800 font-medium">CSR Innovation Fund</span>
            </div>
          </div>

          <div className="space-y-1 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Focus Sectors</span>
            <div className="flex flex-wrap gap-1">
              {industry.preferredDomains?.map((domain, i) => (
                <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <button
          onClick={() => onRequestMentorship(industry)}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs shadow-soft transition-all duration-200 flex items-center justify-center gap-1.5"
        >
          <Handshake className="w-4 h-4" />
          <span>Request Mentorship / Grant</span>
        </button>
      </div>
    </div>
  );
};
