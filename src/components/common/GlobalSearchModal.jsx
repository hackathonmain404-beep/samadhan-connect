import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Building, ArrowRight, Lightbulb, FolderKanban, Users } from 'lucide-react';
import { useChallenges } from '../../context/ChallengeContext';
import { useProjects } from '../../context/ProjectContext';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { challenges } = useChallenges();
  const { projects, solutions, universities, industries, teams } = useProjects();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchedChallenges = cleanQuery
    ? challenges.filter(c => c.title.toLowerCase().includes(cleanQuery) || c.district.toLowerCase().includes(cleanQuery) || c.category.toLowerCase().includes(cleanQuery)).slice(0, 3)
    : [];

  const matchedProjects = cleanQuery
    ? projects.filter(p => p.name.toLowerCase().includes(cleanQuery) || p.university.toLowerCase().includes(cleanQuery)).slice(0, 2)
    : [];

  const matchedUniversities = cleanQuery
    ? universities.filter(u => u.name.toLowerCase().includes(cleanQuery) || u.district.toLowerCase().includes(cleanQuery)).slice(0, 2)
    : [];

  const matchedIndustries = cleanQuery
    ? industries.filter(i => i.name.toLowerCase().includes(cleanQuery) || i.district.toLowerCase().includes(cleanQuery)).slice(0, 2)
    : [];

  const hasResults = matchedChallenges.length > 0 || matchedProjects.length > 0 || matchedUniversities.length > 0 || matchedIndustries.length > 0;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-2xl overflow-hidden z-10 animate-slide-up">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search challenges, projects, universities, CSR partners across Jharkhand..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!cleanQuery && (
            <div className="py-8 text-center text-xs text-slate-400">
              <p>Type keywords like <span className="font-semibold text-emerald-700">"Water"</span>, <span className="font-semibold text-emerald-700">"Ranchi"</span>, <span className="font-semibold text-emerald-700">"BIT Mesra"</span>, or <span className="font-semibold text-emerald-700">"Tata Steel"</span></p>
            </div>
          )}

          {cleanQuery && !hasResults && (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching records found for "{query}".
            </div>
          )}

          {/* Categorized Search Results */}
          {matchedChallenges.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Challenges</span>
              <div className="space-y-1.5">
                {matchedChallenges.map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(`/challenges/${c.id}`)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 hover:border-emerald-200 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-1">{c.title}</h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-emerald-700">{c.category}</span>
                        <span>•</span>
                        <span>{c.district}</span>
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedProjects.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Projects & Workspaces</span>
              <div className="space-y-1.5">
                {matchedProjects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(`/projects/${p.id}`)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 hover:border-emerald-200 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-1">{p.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{p.university} • Phase: {p.currentStage}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedUniversities.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Universities</span>
              <div className="space-y-1.5">
                {matchedUniversities.map(u => (
                  <div
                    key={u.id}
                    onClick={() => handleSelect('/universities')}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 hover:border-emerald-200 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">{u.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{u.district} • {u.activeProjectsCount} Projects</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedIndustries.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Industry Partners</span>
              <div className="space-y-1.5">
                {matchedIndustries.map(i => (
                  <div
                    key={i.id}
                    onClick={() => handleSelect('/industry-partners')}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 hover:border-emerald-200 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">{i.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{i.district} • {i.industry}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
