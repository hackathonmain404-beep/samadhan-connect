import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  PlusCircle,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Lightbulb,
  Building,
  Award,
  Landmark,
  Sparkles,
  MapPin,
  TrendingUp,
  FolderKanban,
  HeartHandshake
} from 'lucide-react';
import { CATEGORIES } from '../data/mockChallenges';
import { PLATFORM_STATS, SUCCESS_STORIES } from '../data/mockStats';
import { ChallengeCard } from '../components/cards/ChallengeCard';
import { CategoryCard } from '../components/cards/CategoryCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { useChallenges } from '../context/ChallengeContext';
import { useProjects } from '../context/ProjectContext';

export const LandingPage = () => {
  const { challenges } = useChallenges();
  const { projects, universities, industries } = useProjects();

  const featuredChallenges = challenges.slice(0, 3);
  const featuredProjects = projects.slice(0, 2);

  const workflowSteps = [
    { step: '01', title: 'Report a Problem', desc: 'Citizens and Panchayats submit local issues with photos & GPS location.', icon: PlusCircle, role: 'Citizen' },
    { step: '02', title: 'Govt Verification', desc: 'District Nodal Officers verify problem authenticity and classify priority.', icon: ShieldCheck, role: 'Government' },
    { step: '03', title: 'Solution Proposals', desc: 'University students and researchers submit technical prototypes & designs.', icon: Lightbulb, role: 'Students' },
    { step: '04', title: 'Teams Build Projects', desc: 'Multi-disciplinary innovation teams enter the 5-phase execution pipeline.', icon: Users, role: 'Teams' },
    { step: '05', title: 'Industry & Uni Support', desc: 'Tata Steel, BCCL & Universities provide CSR grants, labs, and mentorship.', icon: Award, role: 'Industry' },
    { step: '06', title: 'Govt Monitoring', desc: 'Field trials and pilot deployments are tracked in real-time via telemetry.', icon: Landmark, role: 'Government' },
    { step: '07', title: 'Problem Resolved', desc: 'Proven solutions are handed over to local communities for sustainable impact.', icon: CheckCircle2, role: 'Impact' }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-20 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white">
        {/* Subtle Background Glow Circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Jharkhand State Civic Problem Solving & Innovation Portal</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                From Local Problems to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-700">
                  Real-World Solutions.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
                Citizens report grassroots community challenges across Jharkhand. Students, researchers, universities, industry CSR mentors, and government administrators collaborate to build and fund sustainable solutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/report-problem"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg transition-all duration-200"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Report a Problem</span>
                </Link>

                <Link
                  to="/challenges"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-200"
                >
                  <Compass className="w-5 h-5 text-emerald-700" />
                  <span>Explore Challenges</span>
                </Link>
              </div>

              {/* Ecosystem Journey Flow Line */}
              <div className="pt-6 border-t border-slate-200/80">
                <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-2.5">
                  Platform Collaborative Ecosystem
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-bold text-slate-700">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">Citizens</span>
                  <span className="text-emerald-600">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">Students</span>
                  <span className="text-emerald-600">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">Universities</span>
                  <span className="text-emerald-600">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">Industry</span>
                  <span className="text-emerald-600">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">Government</span>
                  <span className="text-emerald-600">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-900 border border-teal-200">Impact</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Showcase Box */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Live Platform Activity
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Real-time
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                      JH
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">
                        Angara Block Fluoride Water Filter
                      </p>
                      <p className="text-[11px] text-slate-500">
                        BIT Mesra Team JalRakshak reached <strong className="text-emerald-700">Prototype Phase</strong>
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded">
                      62% Done
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                      TS
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">
                        Tata Steel Foundation CSR Grant
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Disbursed ₹4,50,000 for Kolhan Tribal STEM Labs
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded">
                      Funded
                    </span>
                  </div>
                </div>

                {/* Live Counter Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100 text-center">
                    <span className="block text-2xl font-extrabold text-emerald-900">{PLATFORM_STATS.problemsReported}</span>
                    <span className="text-[11px] font-semibold text-emerald-700">Problems Reported</span>
                  </div>
                  <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100 text-center">
                    <span className="block text-2xl font-extrabold text-amber-900">{PLATFORM_STATS.solutionsProposed}</span>
                    <span className="text-[11px] font-semibold text-amber-700">Solutions Proposed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION (7-Step Visual Journey) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
            Step-by-Step Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How Samadhan Connect Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A transparent and structured 7-phase pathway from citizen complaint to verified community deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.slice(0, 4).map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft relative overflow-hidden group hover:border-emerald-300 transition-all">
                <span className="text-4xl font-extrabold text-slate-100 group-hover:text-emerald-50 transition-colors absolute top-4 right-4">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{step.desc}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Role: {step.role}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {workflowSteps.slice(4).map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft relative overflow-hidden group hover:border-emerald-300 transition-all">
                <span className="text-4xl font-extrabold text-slate-100 group-hover:text-emerald-50 transition-colors absolute top-4 right-4">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{step.desc}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Role: {step.role}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. 10 CHALLENGE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-1">
              Focus Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Browse by Civic Category
            </h2>
          </div>
          <Link
            to="/challenges"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
          >
            <span>View all 10 categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED CHALLENGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-block mb-1">
              Urgent Needs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Featured Jharkhand Challenges
            </h2>
          </div>
          <Link
            to="/challenges"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
          >
            <span>Explore all {challenges.length} challenges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      {/* 5. ACTIVE IMPLEMENTATION PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
              In Development
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Active Innovation Workspaces
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 6. JHARKHAND IMPACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-soft-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-3 py-1 rounded-full inline-block border border-emerald-700">
              Statewide Civic Transformation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Real Impact Across Jharkhand Districts
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Measurable progress across all 24 districts powered by students, universities, industry partners, and district administration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10 text-center">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-300">{PLATFORM_STATS.problemsReported}</span>
              <span className="text-[11px] text-slate-300 font-medium">Reported</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl sm:text-3xl font-extrabold text-white">{PLATFORM_STATS.challengesVerified}</span>
              <span className="text-[11px] text-slate-300 font-medium">Verified</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">{PLATFORM_STATS.solutionsProposed}</span>
              <span className="text-[11px] text-slate-300 font-medium">Solutions</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl sm:text-3xl font-extrabold text-white">{PLATFORM_STATS.projectsActive}</span>
              <span className="text-[11px] text-slate-300 font-medium">Active Projects</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl sm:text-3xl font-extrabold text-teal-300">{PLATFORM_STATS.projectsCompleted}</span>
              <span className="text-[11px] text-slate-300 font-medium">Resolved</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl sm:text-3xl font-extrabold text-amber-300">24</span>
              <span className="text-[11px] text-slate-300 font-medium">Districts Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-50 via-slate-50 to-amber-50 rounded-3xl p-8 sm:p-12 border border-emerald-200/80 shadow-soft text-center space-y-6">
          <div className="w-14 h-14 bg-emerald-700 text-white rounded-3xl flex items-center justify-center mx-auto shadow-soft">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              “Your problem could be the beginning of the next solution.”
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Join thousands of citizens, students, professors, industry leaders, and civil servants building a brighter future for Jharkhand.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/report-problem"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-sm shadow-soft transition-all"
            >
              Report a Problem
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-soft transition-all"
            >
              Join the Innovation Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
