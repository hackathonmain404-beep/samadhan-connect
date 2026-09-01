import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Search, Filter } from 'lucide-react';
import { ProjectCard } from '../components/cards/ProjectCard';
import { useProjects } from '../context/ProjectContext';

export const ProjectsList = () => {
  const { projects } = useProjects();
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.university.toLowerCase().includes(search.toLowerCase()) ||
    p.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Implementation Workspaces</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Active Innovation Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track multi-phase technical execution across Jharkhand universities and industry CSR partners.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by title, university, or district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
