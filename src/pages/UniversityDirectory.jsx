import React, { useState } from 'react';
import { Building, Search, ExternalLink, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { UniversityCard } from '../components/cards/UniversityCard';
import { Modal } from '../components/ui/Modal';
import { useProjects } from '../context/ProjectContext';

export const UniversityDirectory = () => {
  const { universities } = useProjects();
  const [search, setSearch] = useState('');
  const [selectedUniv, setSelectedUniv] = useState(null);

  const filtered = universities.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Building className="w-3.5 h-3.5" />
            <span>Academic Innovation Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Jharkhand University Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore accredited institutions, research faculties, student innovation cells, and specialized engineering labs.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search universities by name or district (e.g. BIT Mesra, IIT Dhanbad, Ranchi)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(univ => (
          <UniversityCard key={univ.id} university={univ} onViewPortfolio={(u) => setSelectedUniv(u)} />
        ))}
      </div>

      {/* Innovation Portfolio Modal */}
      {selectedUniv && (
        <Modal
          isOpen={!!selectedUniv}
          onClose={() => setSelectedUniv(null)}
          title={`${selectedUniv.shortName} - Innovation Portfolio`}
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <img src={selectedUniv.logo} alt={selectedUniv.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{selectedUniv.name}</h4>
                <p className="text-slate-500">{selectedUniv.location} • Est. {selectedUniv.established}</p>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed sm:text-sm">{selectedUniv.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2">
              <div className="bg-emerald-50 p-2.5 rounded-xl">
                <strong className="block text-sm text-emerald-900">{selectedUniv.researchersCount}</strong>
                <span className="text-[10px] text-emerald-700">Faculty Researchers</span>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl">
                <strong className="block text-sm text-amber-900">{selectedUniv.studentTeamsCount}</strong>
                <span className="text-[10px] text-amber-700">Student Teams</span>
              </div>
              <div className="bg-slate-100 p-2.5 rounded-xl">
                <strong className="block text-sm text-slate-900">{selectedUniv.activeProjectsCount}</strong>
                <span className="text-[10px] text-slate-600">Active Workspaces</span>
              </div>
              <div className="bg-teal-50 p-2.5 rounded-xl">
                <strong className="block text-sm text-teal-900">{selectedUniv.completedProjectsCount}</strong>
                <span className="text-[10px] text-teal-700">Completed Pilots</span>
              </div>
            </div>

            <div className="pt-2">
              <h5 className="font-bold text-slate-800 mb-2">Featured Capstones & Research Deployments</h5>
              <div className="space-y-1.5">
                {selectedUniv.featuredProjects?.map((proj, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-semibold text-slate-800">{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <a
                href={selectedUniv.website}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1.5"
              >
                <span>Visit University Innovation Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
