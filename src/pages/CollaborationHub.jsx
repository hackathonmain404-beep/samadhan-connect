import React, { useState } from 'react';
import { Users, PlusCircle, Search, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { TeamCard } from '../components/cards/TeamCard';
import { Modal } from '../components/ui/Modal';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export const CollaborationHub = () => {
  const { teams, createTeam, joinTeam } = useProjects();
  const { currentUser } = useAuth();

  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(null);

  const [newTeamData, setNewTeamData] = useState({
    name: '',
    university: currentUser?.institution || 'Birla Institute of Technology (BIT) Mesra',
    skills: 'React Native, Python IoT, Chemical Analytics',
    currentChallenge: 'Severe Groundwater Depletion in Angara',
    lookingFor: 'PCB Designer, Firmware Engineer'
  });

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.university.toLowerCase().includes(search.toLowerCase()) ||
    t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleJoin = (team) => {
    joinTeam(team.id, currentUser);
    setJoinSuccess(team.name);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setJoinSuccess(null), 3000);
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    createTeam(newTeamData, currentUser);
    setCreateModalOpen(false);
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Student & Researcher Matchmaking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Collaboration & Team Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Form multi-disciplinary capstone teams, recruit peer developers, and pair up to tackle Smart India Hackathon problem statements.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs shadow-soft transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register New Team</span>
        </button>
      </div>

      {joinSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100/80 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Successfully joined {joinSuccess}! Added to roster.</span>
        </div>
      )}

      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search teams by name, skill (e.g. IoT, CAD, Flutter), or university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
          <TeamCard key={team.id} team={team} onJoinTeam={handleJoin} />
        ))}
      </div>

      {/* Create Team Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Register New Innovation Team"
      >
        <form onSubmit={handleCreateTeam} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Team Name *</label>
            <input
              type="text"
              placeholder="e.g. Team AgroVolt X"
              value={newTeamData.name}
              onChange={(e) => setNewTeamData({ ...newTeamData, name: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Affiliated University / College *</label>
            <input
              type="text"
              value={newTeamData.university}
              onChange={(e) => setNewTeamData({ ...newTeamData, university: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Core Team Skillsets (comma separated) *</label>
            <input
              type="text"
              placeholder="e.g. Solar Engineering, Embedded C, Python, Agronomy"
              value={newTeamData.skills}
              onChange={(e) => setNewTeamData({ ...newTeamData, skills: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Challenge Focus</label>
            <input
              type="text"
              placeholder="e.g. Post-Harvest Tomato Spoilage in Ormanjhi"
              value={newTeamData.currentChallenge}
              onChange={(e) => setNewTeamData({ ...newTeamData, currentChallenge: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Roles You Are Looking To Recruit</label>
            <input
              type="text"
              placeholder="e.g. Thermal Engineer, Android App Dev"
              value={newTeamData.lookingFor}
              onChange={(e) => setNewTeamData({ ...newTeamData, lookingFor: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft"
            >
              Create Team & Open Recruitment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
