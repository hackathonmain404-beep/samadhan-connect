import React from 'react';
import { Users, Building, MapPin, CheckCircle2, UserPlus, Sparkles } from 'lucide-react';

export const TeamCard = ({ team, onJoinTeam }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
            {team.membersCount} Members
          </span>
          <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
            {team.status}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1.5 leading-snug">
          {team.name}
        </h3>

        <div className="space-y-1 text-xs text-slate-600 mb-3.5">
          <div className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{team.university}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{team.district}, Jharkhand</span>
          </div>
        </div>

        {team.currentChallenge && (
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-3.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Focus Challenge</span>
            <p className="font-semibold text-slate-800 line-clamp-2">{team.currentChallenge}</p>
          </div>
        )}

        {/* Member Avatars */}
        <div className="mb-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Roster</span>
          <div className="flex items-center -space-x-2 overflow-hidden">
            {team.members?.map((m, idx) => (
              <img
                key={idx}
                src={m.avatar}
                alt={m.name}
                title={`${m.name} (${m.role})`}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
              />
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Team Skills</span>
          <div className="flex flex-wrap gap-1">
            {team.skills?.map((skill, i) => (
              <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Looking For */}
        {team.lookingFor && team.lookingFor.length > 0 && (
          <div className="mb-4 bg-amber-50/70 border border-amber-100 p-2.5 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Looking To Recruit
            </span>
            <div className="flex flex-wrap gap-1">
              {team.lookingFor.map((role, i) => (
                <span key={i} className="text-[11px] bg-white text-amber-950 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100">
        <button
          onClick={() => onJoinTeam(team)}
          className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          <span>Request to Join Team</span>
        </button>
      </div>
    </div>
  );
};
