import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Upload,
  Image as ImageIcon,
  X,
  FileText,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES, DISTRICTS } from '../data/mockChallenges';
import { useChallenges } from '../context/ChallengeContext';
import { useAuth } from '../context/AuthContext';

export const ReportProblem = () => {
  const navigate = useNavigate();
  const { addChallenge } = useChallenges();
  const { currentUser } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [submittedId, setSubmittedId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Water Management',
    urgency: 'High',
    shortDescription: '',
    detailedDescription: '',
    affectedGroup: 'Rural Villagers and School Children',
    affectedCount: '4,500+',
    duration: 'Last 18 Months',
    district: 'Ranchi',
    panchayat: '',
    location: '',
    pincode: '835103',
    expectedOutcome: '',
    availableResources: '',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
    ]
  });

  const handle1ClickSample = () => {
    setFormData({
      title: 'Groundwater Iron Contamination in Bundu Panchayat Handpumps',
      category: 'Water Management',
      urgency: 'High',
      shortDescription: 'Over 12 handpumps in Bundu yield reddish water with iron concentration exceeding 4.2 mg/L causing severe gastrointestinal ailments.',
      detailedDescription: 'The entire ward 4 and 5 in Bundu panchayat depends on 12 deep bore handpumps. During post-monsoon and summer, water draws reddish-brown silt and oxidizes rapidly. School children in the local primary school are experiencing frequent stomach infections and skin rashes.',
      affectedGroup: 'Primary school students and 650+ farming households',
      affectedCount: '3,200 villagers',
      duration: 'Ongoing for 2 years',
      district: 'Ranchi',
      panchayat: 'Bundu Gram Panchayat (Ward 4 & 5)',
      location: 'Bundu Block, Rural Ranchi',
      pincode: '835204',
      expectedOutcome: 'Low-cost solar aeration and terracotta filtration media unit maintained by local Pani Samiti.',
      availableResources: 'Panchayat Bhavan ground, solar pole within 50m, 6 youth volunteers ready for operation training.',
      images: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
      ]
    });
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = addChallenge(formData, currentUser);
    setSubmittedId(created.id);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const steps = [
    { num: 1, title: 'Basic Info' },
    { num: 2, title: 'Location' },
    { num: 3, title: 'Problem Details' },
    { num: 4, title: 'Urgency & Impact' },
    { num: 5, title: 'Evidence Media' },
    { num: 6, title: 'Review & Submit' }
  ];

  if (submittedId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-soft">
          <CheckCircle2 className="w-10 h-10 text-emerald-700" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Submission Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Your Problem Has Been Submitted Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Your issue has been assigned a unique statewide tracking ID and entered the Government verification queue.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-left max-w-md mx-auto space-y-3">
          <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Tracking Number:</span>
            <span className="font-mono font-bold text-emerald-800">{submittedId}</span>
          </div>
          <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Status:</span>
            <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Under Review</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Assigned Nodal Office:</span>
            <span className="font-bold text-slate-800">{formData.district} District Innovation Cell</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to={`/challenges/${submittedId}`}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft transition-all"
          >
            View Live Listing
          </Link>
          <Link
            to="/dashboard/citizen"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-soft transition-all"
          >
            Go to My Citizen Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2 inline-block">
            6-Step Community Submission Wizard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Report a Local Problem
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Submit a real-world societal challenge to connect with student innovators and state researchers.
          </p>
        </div>

        {/* 1-Click Demo Sample Button */}
        <button
          type="button"
          onClick={handle1ClickSample}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs transition-all shadow-xs shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>1-Click Demo Sample</span>
        </button>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-6 gap-2">
        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;

          return (
            <div
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`p-2.5 rounded-2xl border text-center cursor-pointer transition-all ${
                isActive
                  ? 'bg-emerald-700 text-white border-emerald-700 font-bold shadow-soft'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200 font-semibold'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              <span className="text-xs block">Step {step.num}</span>
              <span className="text-[10px] hidden sm:block truncate">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 1: Problem Title & Domain
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Problem Headline / Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Severe Groundwater Fluoride Contamination in Angara Block"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category Domain *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority / Urgency *</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    <option value="Critical">Critical (Immediate Hazard)</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Summary (1-2 sentences) *
                </label>
                <textarea
                  rows="2"
                  placeholder="Briefly state what is happening and who is affected..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900"
                  required
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 2: Location and District */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 2: Geographic Location & District
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District (Jharkhand) *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    {DISTRICTS.filter(d => d !== 'All Districts').map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. 835103"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gram Panchayat / Ward / Village *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nawagarh Panchayat, Angara Block"
                  value={formData.panchayat}
                  onChange={(e) => setFormData({ ...formData, panchayat: e.target.value, location: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 3: Problem Details */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 3: In-Depth Problem Details
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Comprehensive Description *
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe the problem in detail: when does it occur, what causes it, and what attempts have failed..."
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Affected Groups</label>
                  <input
                    type="text"
                    placeholder="e.g. Smallholder farmers, school children"
                    value={formData.affectedGroup}
                    onChange={(e) => setFormData({ ...formData, affectedGroup: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">How Long Has This Persisted?</label>
                  <input
                    type="text"
                    placeholder="e.g. Past 2 years"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Urgency & Impact */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 4: Urgency & Desired Outcomes
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Affected People Count</label>
                <input
                  type="text"
                  placeholder="e.g. 4,800 villagers across 6 hamlets"
                  value={formData.affectedCount}
                  onChange={(e) => setFormData({ ...formData, affectedCount: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Technological Outcome / Solution Desired
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Low-cost solar community defluoridation filtration plant with IoT alert system..."
                  value={formData.expectedOutcome}
                  onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Available Community Infrastructure & Support
                </label>
                <input
                  type="text"
                  placeholder="e.g. Panchayat Bhavan land, solar grid line within 100m"
                  value={formData.availableResources}
                  onChange={(e) => setFormData({ ...formData, availableResources: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Evidence Media */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 5: Ground Evidence Photos & Documents
              </h2>

              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">Drop ground evidence photos or tap to browse</p>
                <p className="text-[11px] text-slate-400 mt-1">Supports PNG, JPG, PDF up to 10MB (GPS tags preserved)</p>
              </div>

              {/* Previews */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Attached Field Photos ({formData.images.length})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden h-28 border border-slate-200">
                      <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                        Evidence #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Submit */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 6: Review Problem Summary
              </h2>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Problem Title</span>
                  <p className="font-bold text-slate-900 text-sm">{formData.title || 'Untitled Problem'}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Category</span>
                    <span className="font-semibold text-emerald-800">{formData.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Urgency</span>
                    <span className="font-semibold text-amber-800">{formData.urgency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">District</span>
                    <span className="font-semibold text-slate-800">{formData.district}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
                  <p className="text-slate-700">{formData.location || formData.panchayat || 'Jharkhand'}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Detailed Description</span>
                  <p className="text-slate-600 line-clamp-3">{formData.detailedDescription || formData.shortDescription}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div></div>}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-soft transition-all"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white text-xs font-bold shadow-soft transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Submit Challenge</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
