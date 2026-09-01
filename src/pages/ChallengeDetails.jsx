import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  Lightbulb,
  ThumbsUp,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  Building,
  ShieldCheck,
  Send,
  AlertCircle,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { StatusBadge, UrgencyBadge } from '../components/ui/StatusBadge';
import { ProgressTracker } from '../components/ui/ProgressTracker';
import { useChallenges } from '../context/ChallengeContext';
import { useAuth } from '../context/AuthContext';

export const ChallengeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { challenges, supportedChallenges, bookmarkedChallenges, toggleSupport, toggleBookmark, addComment } = useChallenges();
  const { currentUser } = useAuth();

  const challenge = challenges.find((c) => c.id === id) || challenges[0];
  const isSupported = supportedChallenges.includes(challenge?.id);
  const isBookmarked = bookmarkedChallenges.includes(challenge?.id);

  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  const lifecycleStages = ['Pending', 'Under Review', 'Verified', 'Open', 'In Progress', 'Resolved'];
  const currentStageIndex = lifecycleStages.indexOf(challenge?.lifecycleStage || 'Open') !== -1
    ? lifecycleStages.indexOf(challenge?.lifecycleStage || 'Open')
    : 3;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(challenge.id, commentText, currentUser);
    setCommentText('');
  };

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Challenge Not Found</h2>
        <Link to="/challenges" className="text-emerald-700 font-bold mt-4 inline-block hover:underline">
          Return to Explore Challenges
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back Button & Top Meta */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Challenges</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
          <button
            onClick={() => toggleBookmark(challenge.id)}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs transition-colors"
            title="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-700 text-emerald-700' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-bold px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
            {challenge.category}
          </span>
          <UrgencyBadge urgency={challenge.urgency} />
          <StatusBadge status={challenge.status} />
          <span className="text-xs font-mono text-slate-400 ml-auto">ID: {challenge.id}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {challenge.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <strong>{challenge.location}</strong> ({challenge.district}, PIN: {challenge.pincode})
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-400" />
            Reported by <strong className="text-slate-800">{challenge.submittedBy}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            {challenge.submittedDate}
          </span>
        </div>

        {/* Lifecycle Status Tracker */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Verification & Solution Resolution Pipeline
          </span>
          <ProgressTracker stages={lifecycleStages} currentStageIndex={currentStageIndex} />
        </div>
      </div>

      {/* 2-Column Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Problem Deep Dive */}
        <div className="lg:col-span-8 space-y-8">
          {/* Detailed Problem Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Problem Description & Ground Reality</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {challenge.problemDescription || challenge.shortDescription}
              </p>
            </div>

            {challenge.background && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Geological & Socio-Economic Context
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {challenge.background}
                </p>
              </div>
            )}

            {challenge.communityImpact && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Community Impact & Affected Population
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-amber-50/70 border border-amber-100 p-3.5 rounded-2xl">
                  {challenge.communityImpact}
                </p>
              </div>
            )}

            {challenge.currentSituation && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Current Situation & Deficiencies
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {challenge.currentSituation}
                </p>
              </div>
            )}

            {challenge.expectedOutcome && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
                  Desired Outcome & Technical Scope
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl">
                  {challenge.expectedOutcome}
                </p>
              </div>
            )}

            {challenge.availableResources && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Available Local Community Resources
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {challenge.availableResources}
                </p>
              </div>
            )}
          </div>

          {/* Evidence Photos Gallery */}
          {challenge.images && challenge.images.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Ground Evidence & Field Media ({challenge.images.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenge.images.map((img, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden h-52 bg-slate-100 border border-slate-200">
                    <img
                      src={img}
                      alt={`Ground evidence ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-[10px] text-white font-medium">
                      GPS Tagged Evidence #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discussion & Innovation Comments Thread */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Discussion & Collaborative Insights ({challenge.comments?.length || 0})</span>
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <textarea
                rows="3"
                placeholder={`Share technical insights or ask ${challenge.submittedBy} a clarifying question...`}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              ></textarea>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Commenting as <strong className="text-slate-700">{currentUser.name}</strong> ({currentUser.role})
                </span>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-soft transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Insight</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              {(!challenge.comments || challenge.comments.length === 0) ? (
                <p className="text-xs text-slate-400 text-center py-4">No comments yet. Be the first to start the discussion!</p>
              ) : (
                challenge.comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{comment.author}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100/60 text-emerald-800">
                          {comment.role}
                        </span>
                        {comment.institution && (
                          <span className="text-[10px] text-slate-400 hidden sm:inline">• {comment.institution}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{comment.date}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Action Hub & Interested Stakeholders */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4 sticky top-24">
            <div className="text-center space-y-1 pb-4 border-b border-slate-100">
              <span className="text-3xl font-extrabold text-slate-900">{challenge.supportCount}</span>
              <span className="block text-xs font-semibold text-slate-500">Citizens & Innovators Supporting</span>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => toggleSupport(challenge.id)}
                className={`w-full py-3 rounded-2xl font-bold text-xs shadow-soft transition-all flex items-center justify-center gap-2 ${
                  isSupported
                    ? 'bg-emerald-700 text-white shadow-soft-lg'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isSupported ? 'fill-white' : ''}`} />
                <span>{isSupported ? 'Supported by You' : 'Support This Problem'}</span>
              </button>

              <Link
                to={`/propose-solution/${challenge.id}`}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Propose Student / Team Solution</span>
              </Link>
            </div>

            {/* Active Student Teams */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Interested Teams ({challenge.interestedTeams?.length || 0})
              </h4>
              <div className="space-y-2">
                {challenge.interestedTeams?.map((team, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{team}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting Government & Industry Organizations */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Supporting Agencies & CSR
              </h4>
              <div className="space-y-2">
                {challenge.supportingOrgs?.map((org, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-semibold text-emerald-950 truncate">{org}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
