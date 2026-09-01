import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Lightbulb, ThumbsUp, ArrowRight, Bookmark, Calendar, CheckCircle2 } from 'lucide-react';
import { StatusBadge, UrgencyBadge } from '../ui/StatusBadge';
import { useChallenges } from '../../context/ChallengeContext';

export const ChallengeCard = ({ challenge, viewMode = 'grid' }) => {
  const { supportedChallenges, bookmarkedChallenges, toggleSupport, toggleBookmark } = useChallenges();
  const isSupported = supportedChallenges.includes(challenge.id);
  const isBookmarked = bookmarkedChallenges.includes(challenge.id);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              {challenge.category}
            </span>
            <UrgencyBadge urgency={challenge.urgency} />
            <StatusBadge status={challenge.status} />
          </div>

          <Link to={`/challenges/${challenge.id}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-1">
              {challenge.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {challenge.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {challenge.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {challenge.teamsWorking} Teams Active
            </span>
            <span className="inline-flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              {challenge.proposalCount} Proposals
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0">
          <button
            onClick={() => toggleSupport(challenge.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isSupported
                ? 'bg-emerald-700 text-white shadow-soft'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Support this community problem"
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isSupported ? 'fill-white' : ''}`} />
            <span>{challenge.supportCount}</span>
          </button>

          <Link
            to={`/challenges/${challenge.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white font-bold text-xs transition-all duration-200"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Image Banner */}
      {challenge.images && challenge.images.length > 0 && (
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <img
            src={challenge.images[0]}
            alt={challenge.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-slate-800 shadow-sm">
              {challenge.category}
            </span>
          </div>

          <button
            onClick={() => toggleBookmark(challenge.id)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-emerald-700 transition-colors shadow-sm"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
          </button>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="inline-flex items-center gap-1 font-medium drop-shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              {challenge.district}, Jharkhand
            </span>
            <span className="text-[11px] text-slate-200 drop-shadow-sm font-mono">
              {challenge.id}
            </span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <UrgencyBadge urgency={challenge.urgency} />
            <StatusBadge status={challenge.status} />
          </div>

          <Link to={`/challenges/${challenge.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 leading-snug">
              {challenge.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {challenge.shortDescription}
          </p>
        </div>

        <div>
          {/* Card Meta footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium mb-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span><strong className="text-slate-800">{challenge.teamsWorking}</strong> teams</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span><strong className="text-slate-800">{challenge.proposalCount}</strong> proposals</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{challenge.submittedDate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSupport(challenge.id)}
              className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSupported
                  ? 'bg-emerald-700 text-white shadow-soft'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Support this community problem"
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isSupported ? 'fill-white' : ''}`} />
              <span>{challenge.supportCount}</span>
            </button>

            <Link
              to={`/challenges/${challenge.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white font-bold text-xs transition-all duration-200"
            >
              <span>View Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
