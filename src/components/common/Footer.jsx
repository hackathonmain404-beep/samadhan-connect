import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, ShieldCheck, Heart, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Official Endorsements Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Supported By:</span>
            <span className="font-semibold text-white bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">Govt. of Jharkhand</span>
            <span className="font-semibold text-white bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">Smart India Hackathon 2026</span>
            <span className="font-semibold text-white bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700 hidden sm:inline">AICTE & MoE Innovation Cell</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Statewide Public Problem-Solving Portal</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-soft">
                <Globe2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Samadhan<span className="text-emerald-400">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Jharkhand's digital collaborative innovation platform crowdsourcing local societal challenges and uniting Citizens, Students, Universities, Industry CSR Partners, and Government to build real-world solutions.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                State Innovation Cell, Suchana Bhawan, Ranchi - 834002
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                nodal.innovation@jharkhand.gov.in
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/challenges" className="hover:text-emerald-400 transition-colors">Explore Challenges</Link></li>
              <li><Link to="/solutions" className="hover:text-emerald-400 transition-colors">Proposed Solutions</Link></li>
              <li><Link to="/projects" className="hover:text-emerald-400 transition-colors">Active Projects</Link></li>
              <li><Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link to="/impact" className="hover:text-emerald-400 transition-colors">Jharkhand Impact</Link></li>
            </ul>
          </div>

          {/* Col 3: Stakeholders */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/universities" className="hover:text-emerald-400 transition-colors">University Directory</Link></li>
              <li><Link to="/industry-partners" className="hover:text-emerald-400 transition-colors">Industry CSR Partners</Link></li>
              <li><Link to="/collaboration" className="hover:text-emerald-400 transition-colors">Student Innovation Hub</Link></li>
              <li><Link to="/report-problem" className="hover:text-emerald-400 transition-colors">Report a Problem</Link></li>
              <li><Link to="/propose-solution" className="hover:text-emerald-400 transition-colors">Submit Solution Proposal</Link></li>
            </ul>
          </div>

          {/* Col 4: Grievance & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Support & Civic Help</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#help" className="hover:text-emerald-400 transition-colors">Gram Panchayat Helpline</a></li>
              <li><a href="#portal" className="hover:text-emerald-400 transition-colors">District Nodal Directory</a></li>
              <li><a href="#guidelines" className="hover:text-emerald-400 transition-colors">Student Grant Guidelines</a></li>
              <li><a href="#privacy" className="hover:text-emerald-400 transition-colors">Open Data & Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Samadhan Connect (Jharkhand). Built for Smart India Hackathon.</p>
          <p className="flex items-center gap-1">
            Empowering grassroots innovation across 24 Districts
          </p>
        </div>
      </div>
    </footer>
  );
};
