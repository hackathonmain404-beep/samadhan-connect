import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  PlusCircle,
  ShieldCheck,
  Lightbulb,
  Users,
  Award,
  Landmark,
  ArrowRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Citizen Reports Problem', desc: 'Citizens, Gram Panchayats, or NGOs submit local community challenges with GPS coordinates, photos, and affected demographics.', role: 'Citizen' },
    { num: '02', title: 'Government Verification', desc: 'District Nodal Officers verify problem validity, check duplication, and prioritize critical public infrastructure needs.', role: 'Government' },
    { num: '03', title: 'Student & Researcher Ideation', desc: 'Engineering and research students discover verified challenges, submit technical blueprints, hardware designs, and capstone proposals.', role: 'Students' },
    { num: '04', title: 'Project Workspace & Prototyping', desc: 'Approved proposals transition into active 5-phase project workspaces with milestone tracking and sprint task boards.', role: 'Teams' },
    { num: '05', title: 'University & Industry Support', desc: 'Institutions provide lab equipment and academic mentorship while industry CSR partners disburse prototype grants and test-bed access.', role: 'Industry & Uni' },
    { num: '06', title: 'Field Trials & Deployment', desc: 'Prototypes are deployed in pilot panchayats for real-world validation under district administration oversight.', role: 'Government' },
    { num: '07', title: 'Handover & Sustainable Impact', desc: 'Validated technologies are transferred to local Village Water / Health Committees with full documentation and training.', role: 'Community' }
  ];

  const roleMatrices = [
    { role: 'Citizen', benefits: ['Fast-track grievance attention with GPS verification', 'Live 6-stage lifecycle tracking for reported problems', 'Direct collaboration with university innovators'] },
    { role: 'Student / Researcher', benefits: ['Real-world capstone challenges with statewide impact', 'Industry mentorship from Tata Steel, BCCL, TCS Foundation', 'Direct prototype grants and incubation funding'] },
    { role: 'University', benefits: ['Centralized R&D innovation dashboard for faculty', 'High-impact patentable student inventions', 'Institutional ranking & NIRF innovation credits'] },
    { role: 'Industry Partner', benefits: ['Targeted CSR fund deployment with transparent KPIs', 'Mentorship access to top technical talent in Jharkhand', 'Measurable community sustainability impact'] },
    { role: 'Government Official', benefits: ['Automated verification queues and grievance routing', 'District-level analytics and real-time project telemetry', 'Accelerated public service delivery across 24 districts'] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
          Complete Platform Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How Samadhan Connect Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          From rural grassroots problem crowdsourcing to verified industrial prototyping and district-wide deployment.
        </p>
      </div>

      {/* 7-Step Journey Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft relative overflow-hidden group hover:border-emerald-300 transition-all">
            <span className="text-5xl font-extrabold text-slate-100 absolute top-4 right-4 group-hover:text-emerald-50 transition-colors">
              {step.num}
            </span>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 mb-3">
              Role: {step.role}
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{step.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Stakeholder Matrix */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-soft-lg space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Stakeholder Value Proposition
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            How Samadhan Connect serves every participant in the innovation ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {roleMatrices.map((matrix, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-xs p-6 rounded-2xl border border-white/10 space-y-3">
              <h3 className="font-bold text-base text-emerald-300">{matrix.role}</h3>
              <ul className="space-y-2 text-slate-300">
                {matrix.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
