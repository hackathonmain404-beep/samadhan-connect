import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Lightbulb,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Upload,
  Cpu,
  Building,
  Users,
  Clock,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useChallenges } from '../context/ChallengeContext';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';

export const ProposeSolution = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { challenges } = useChallenges();
  const { submitProposal } = useProjects();
  const { currentUser } = useAuth();

  const preselected = challenges.find(c => c.id === challengeId) || challenges[0];

  const [selectedChallengeId, setSelectedChallengeId] = useState(preselected?.id || '');
  const [formData, setFormData] = useState({
    title: '',
    teamName: currentUser?.team || 'Team JalRakshak',
    university: currentUser?.institution || 'Birla Institute of Technology (BIT) Mesra',
    technologies: 'ESP32 Microcontroller, Activated Alumina Column, 24V Solar Booster, Cloud Telemetry',
    overview: '',
    expectedImpact: 'Supply 2,000L safe potable fluoride-free water daily to 4,800 villagers at negligible operating cost.',
    duration: '4 Months',
    budget: '₹3,50,000',
    industrySupportRequirement: 'Chemical testing assistance by Tata Steel CSR and DST prototype grant.'
  });

  const [submitted, setSubmitted] = useState(false);

  const handle1ClickSample = () => {
    setFormData({
      title: 'Solar-Powered Activated Alumina Fluoride Adsorption Column with IoT Telemetry',
      teamName: 'Team JalRakshak',
      university: 'Birla Institute of Technology (BIT) Mesra',
      technologies: 'ESP32, Solar DC Pump, Alumina Bed, Spectrophotometry Sensor, GSM Node',
      overview: 'Our team has engineered a low-cost, gravity-assisted activated alumina column powered by a 24V solar pump. Integrated IoT sensors continuously monitor water flow and fluoride PPM, transmitting live telemetry to the Gram Panchayat dashboard.',
      expectedImpact: 'Supply 2,000L safe potable fluoride-free water daily to 4,800 villagers at negligible operating cost.',
      duration: '4 Months',
      budget: '₹3,50,000',
      industrySupportRequirement: 'Material characterization at Tata Steel R&D labs and mentor review.'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const chosenChallenge = challenges.find(c => c.id === selectedChallengeId) || preselected;
    submitProposal({
      ...formData,
      challengeId: chosenChallenge.id,
      challengeTitle: chosenChallenge.title,
      category: chosenChallenge.category,
      district: chosenChallenge.district
    }, currentUser);

    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-soft">
          <CheckCircle2 className="w-10 h-10 text-emerald-700" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Solution Proposal Submitted!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Your technical proposal has been listed on the open marketplace and forwarded to university evaluators and industry mentors.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/solutions"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft transition-all"
          >
            Explore Solution Marketplace
          </Link>
          <Link
            to="/dashboard/student"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-soft transition-all"
          >
            Go to Student Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-800 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Submit Solution Proposal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Propose a technical prototype, capstone project, or research design to solve an active Jharkhand problem.
          </p>
        </div>

        <button
          type="button"
          onClick={handle1ClickSample}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs shadow-xs shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>1-Click Sample Proposal</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Challenge *</label>
            <select
              value={selectedChallengeId}
              onChange={(e) => setSelectedChallengeId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
              required
            >
              {challenges.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.district}] {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Solution Title / Project Name *</label>
            <input
              type="text"
              placeholder="e.g. Solar-Powered Activated Alumina Fluoride Adsorption Column"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Team Name *</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Affiliated University / College *</label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Proposed Technologies & Hardware Stack *</label>
            <input
              type="text"
              placeholder="e.g. ESP32, Solar Inverter, PhET Sim, Raspberry Pi 5"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Technical Architecture & Implementation Plan *</label>
            <textarea
              rows="4"
              placeholder="Describe your design, testing roadmap, and how it solves the root cause..."
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimated Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimated Prototype Budget</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Industry CSR / Mentorship Requirement</label>
            <input
              type="text"
              value={formData.industrySupportRequirement}
              onChange={(e) => setFormData({ ...formData, industrySupportRequirement: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs shadow-soft transition-all"
          >
            Submit Technical Proposal
          </button>
        </form>
      </div>
    </div>
  );
};
