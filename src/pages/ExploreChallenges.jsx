import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  PlusCircle,
  X,
  Compass,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { CATEGORIES, DISTRICTS } from '../data/mockChallenges';
import { ChallengeCard } from '../components/cards/ChallengeCard';
import { EmptyState } from '../components/ui/Modal';
import { useChallenges } from '../context/ChallengeContext';

export const ExploreChallenges = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { challenges } = useChallenges();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Categories');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'All Districts');
  const [selectedUrgency, setSelectedUrgency] = useState('All Urgencies');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredChallenges = useMemo(() => {
    return challenges
      .filter((c) => {
        const matchesQuery =
          searchQuery === '' ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.district.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === 'All Categories' || c.category === selectedCategory;

        const matchesDistrict =
          selectedDistrict === 'All Districts' || c.district === selectedDistrict;

        const matchesUrgency =
          selectedUrgency === 'All Urgencies' || c.urgency.toLowerCase() === selectedUrgency.toLowerCase();

        const matchesStatus =
          selectedStatus === 'All Statuses' || c.status.toLowerCase().includes(selectedStatus.toLowerCase());

        return matchesQuery && matchesCategory && matchesDistrict && matchesUrgency && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'most-supported') return b.supportCount - a.supportCount;
        if (sortBy === 'most-urgent') {
          const weights = { critical: 3, high: 2, medium: 1, low: 0 };
          return (weights[b.urgency.toLowerCase()] || 0) - (weights[a.urgency.toLowerCase()] || 0);
        }
        return new Date(b.submittedDate) - new Date(a.submittedDate);
      });
  }, [challenges, searchQuery, selectedCategory, selectedDistrict, selectedUrgency, selectedStatus, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedDistrict('All Districts');
    setSelectedUrgency('All Urgencies');
    setSelectedStatus('All Statuses');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Civic Problem Discovery Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Jharkhand Challenges
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover community problems submitted by citizens across all 24 districts ready for student and researcher solutions.
          </p>
        </div>

        <Link
          to="/report-problem"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs shadow-soft transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report a Problem</span>
        </Link>
      </div>

      {/* Main Search & Control Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by keywords, panchayat, district (e.g. Angara, Fluoride, Solar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* Quick Selects */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All Categories">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            {/* District Dropdown */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="most-supported">Sort: Most Supported</option>
              <option value="most-urgent">Sort: Most Urgent</option>
            </select>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-slate-500'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-slate-500'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Urgency:</span>
            {['All Urgencies', 'Critical', 'High', 'Medium'].map((u) => (
              <button
                key={u}
                onClick={() => setSelectedUrgency(u)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedUrgency === u
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-slate-900 font-bold">{filteredChallenges.length}</strong> challenges
            </span>
            {(searchQuery || selectedCategory !== 'All Categories' || selectedDistrict !== 'All Districts' || selectedUrgency !== 'All Urgencies') && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Challenges Grid / List Results */}
      {filteredChallenges.length === 0 ? (
        <EmptyState
          title="No Challenges Found"
          description="We couldn't find any challenges matching your current search and filter settings."
          actionLabel="Reset Search & Filters"
          onAction={resetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  );
};
