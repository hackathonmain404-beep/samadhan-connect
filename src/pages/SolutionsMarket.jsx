import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, PlusCircle, Search, Filter } from 'lucide-react';
import { SolutionCard } from '../components/cards/SolutionCard';
import { useProjects } from '../context/ProjectContext';

export const SolutionsMarket = () => {
  const { solutions } = useProjects();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = solutions.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.teamName.toLowerCase().includes(search.toLowerCase()) ||
      s.university.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Innovations & Tech Blueprints</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Proposed Solutions Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover student capstone blueprints, research proposals, and working prototypes for Jharkhand challenges.
          </p>
        </div>

        <Link
          to="/propose-solution"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs shadow-soft transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Solution Proposal</span>
        </Link>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search proposals by team, technology, or university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(solution => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>
    </div>
  );
};
