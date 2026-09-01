import React, { useState } from 'react';
import { Award, Search, Handshake, CheckCircle2 } from 'lucide-react';
import { IndustryCard } from '../components/cards/IndustryCard';
import { Modal } from '../components/ui/Modal';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export const IndustryDirectory = () => {
  const { industries } = useProjects();
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [mentorshipModalInd, setMentorshipModalInd] = useState(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [requestForm, setRequestForm] = useState({
    projectName: 'Project JalRakshak: Solar Fluoride IoT Filtration System',
    teamName: currentUser?.team || 'Team JalRakshak',
    supportType: 'Technical Lab Mentorship & Prototype Grant',
    details: 'Requesting assistance from material sciences team to validate bauxite-alumina pressure column sealing and high-iron ground water filtration.'
  });

  const filtered = industries.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.district.toLowerCase().includes(search.toLowerCase()) ||
    i.industry.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendRequest = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setRequestSubmitted(false);
      setMentorshipModalInd(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Corporate CSR & Mentorship Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Industry Partners & CSR Sponsors
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect with leading industrial enterprises supporting student prototypes with mentorship, labs, and CSR innovation grants.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search industry partners by name, sector, or district (e.g. Tata Steel, BCCL, NABARD)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ind => (
          <IndustryCard key={ind.id} industry={ind} onRequestMentorship={(i) => setMentorshipModalInd(i)} />
        ))}
      </div>

      {/* Mentorship / Grant Request Modal */}
      {mentorshipModalInd && (
        <Modal
          isOpen={!!mentorshipModalInd}
          onClose={() => setMentorshipModalInd(null)}
          title={`Request Mentorship / Grant - ${mentorshipModalInd.shortName}`}
        >
          {requestSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Mentorship Application Dispatched!</h4>
              <p className="text-xs text-slate-500">
                Your proposal and team profile have been forwarded to {mentorshipModalInd.contactPerson}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendRequest} className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <img src={mentorshipModalInd.logo} alt={mentorshipModalInd.shortName} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{mentorshipModalInd.name}</h4>
                  <p className="text-slate-500">{mentorshipModalInd.contactPerson}</p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  value={requestForm.projectName}
                  onChange={(e) => setRequestForm({ ...requestForm, projectName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Team / University *</label>
                <input
                  type="text"
                  value={requestForm.teamName}
                  onChange={(e) => setRequestForm({ ...requestForm, teamName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Support Category *</label>
                <select
                  value={requestForm.supportType}
                  onChange={(e) => setRequestForm({ ...requestForm, supportType: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                >
                  <option value="Technical Lab Mentorship & Prototype Grant">Technical Lab Mentorship & Prototype Grant</option>
                  <option value="Direct CSR Sponsorship (₹1L - ₹5L)">Direct CSR Sponsorship (₹1L - ₹5L)</option>
                  <option value="Industrial Testbed & Field Deployment Access">Industrial Testbed & Field Deployment Access</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specific Mentorship Request Details *</label>
                <textarea
                  rows="3"
                  value={requestForm.details}
                  onChange={(e) => setRequestForm({ ...requestForm, details: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMentorshipModalInd(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};
