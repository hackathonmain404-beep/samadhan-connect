import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Building,
  Users,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  MessageSquare,
  Award,
  ArrowLeft,
  CheckSquare,
  Square,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Landmark
} from 'lucide-react';
import { PROJECT_LIFECYCLE_STAGES } from '../data/mockProjects';
import { ProgressTracker } from '../components/ui/ProgressTracker';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';

export const ProjectWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProjectTask, addProjectUpdate } = useProjects();
  const { currentUser } = useAuth();

  const project = projects.find((p) => p.id === id) || projects[0];

  const [activeTab, setActiveTab] = useState('overview');
  const [newUpdateText, setNewUpdateText] = useState('');

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Project Not Found</h2>
        <Link to="/projects" className="text-emerald-700 font-bold mt-4 inline-block hover:underline">
          Return to Projects List
        </Link>
      </div>
    );
  }

  const handleToggleTask = (taskId, currentStatus) => {
    const nextStatus = currentStatus === 'Done' ? 'To Do' : 'Done';
    updateProjectTask(project.id, taskId, nextStatus);
  };

  const handlePostUpdate = (e) => {
    e.preventDefault();
    if (!newUpdateText.trim()) return;
    addProjectUpdate(project.id, newUpdateText, currentUser);
    setNewUpdateText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Workspace ID: {project.id}</span>
        </div>
      </div>

      {/* Main Project Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                {project.category}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                Phase: {project.currentStage}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {project.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {project.name}
            </h1>

            <p className="text-xs text-slate-500 font-medium">
              Solving Challenge:{' '}
              <Link to={`/challenges/${project.challengeId}`} className="text-slate-800 font-bold hover:text-emerald-700 underline underline-offset-2">
                {project.challengeTitle}
              </Link>
            </p>
          </div>

          {/* Progress Circular Widget */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl flex items-center gap-4 shrink-0">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900">{project.completionPercentage}%</span>
              <span className="block text-[11px] font-semibold text-emerald-700">Total Completion</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 5-Phase Visual Lifecycle Tracker */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            5-Phase Solution Execution Lifecycle
          </span>
          <ProgressTracker
            stages={PROJECT_LIFECYCLE_STAGES}
            currentStageIndex={project.currentStageIndex}
          />
        </div>

        {/* Stakeholder Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">University</span>
            <p className="font-semibold text-slate-800 truncate">{project.university}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Team Lead</span>
            <p className="font-semibold text-slate-800 truncate">{project.teamName} ({project.leadName})</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Industry Mentor</span>
            <p className="font-semibold text-slate-800 truncate">{project.industryMentor || 'Assigned'}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Funding / Grant</span>
            <p className="font-bold text-emerald-800">{project.budget} ({project.fundedBy})</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: 'Project Overview' },
          { id: 'milestones', label: `Milestones (${project.milestones?.length || 0})` },
          { id: 'tasks', label: `Sprint Tasks (${project.tasks?.length || 0})` },
          { id: 'updates', label: `Updates & Feed (${project.updates?.length || 0})` },
          { id: 'team', label: `Team & Mentors (${project.teamMembers?.length || 0})` },
          { id: 'documents', label: `Deliverables (${project.documents?.length || 0})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === tab.id
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-700 shadow-soft-sm font-extrabold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}
      <div className="space-y-6">
        {/* 1. OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6 text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Technical Overview</h3>
                <p className="text-slate-700 leading-relaxed sm:text-sm">{project.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Timeline & Project Schedule
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Start Date</span>
                    <strong className="text-slate-800">{project.startDate}</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Target Completion</span>
                    <strong className="text-slate-800">{project.expectedCompletion}</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Current Phase</span>
                    <strong className="text-amber-800 font-bold">{project.currentStage}</strong>
                  </div>
                </div>
              </div>

              {project.mentorFeedback && project.mentorFeedback.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Industry Mentor Evaluation
                  </h4>
                  <div className="space-y-2">
                    {project.mentorFeedback.map((fb) => (
                      <div key={fb.id} className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-950">{fb.mentor} ({fb.org})</span>
                          <span className="text-[10px] text-amber-800 font-bold">Rating: {fb.rating}/5 ★</span>
                        </div>
                        <p className="text-slate-700 italic">"{fb.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3 text-xs">
                <h4 className="font-bold text-slate-900">Sprint Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tasks Total:</span>
                    <strong className="text-slate-800">{project.tasks?.length || 0}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Completed Tasks:</span>
                    <strong className="text-emerald-700">{project.tasks?.filter(t => t.status === 'Done').length || 0}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Milestones Done:</span>
                    <strong className="text-emerald-700">{project.milestones?.filter(m => m.status === 'Completed').length || 0} / {project.milestones?.length || 0}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MILESTONES */}
        {activeTab === 'milestones' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-4">Milestone Roadmap</h3>
            <div className="space-y-3">
              {project.milestones?.map((m) => (
                <div key={m.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : m.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {m.status}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                    </div>
                    {m.note && <p className="text-slate-600 leading-relaxed">{m.note}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">Due Date</span>
                    <strong className="text-slate-700">{m.dueDate}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SPRINT TASKS KANBAN */}
        {activeTab === 'tasks' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Sprint Tasks & Action Items</h3>
              <span className="text-xs text-slate-400">Click checkboxes to toggle status</span>
            </div>
            <div className="space-y-2.5">
              {project.tasks?.map((task) => {
                const isDone = task.status === 'Done';
                return (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id, task.status)}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors ${
                      isDone ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through' : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-emerald-700 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                      <span className="font-semibold">{task.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {task.assignee}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        task.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. UPDATES & ACTIVITY FEED */}
        {activeTab === 'updates' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <h3 className="text-base font-bold text-slate-900">Project Activity Stream</h3>

            {/* Post Update Form */}
            <form onSubmit={handlePostUpdate} className="space-y-3">
              <textarea
                rows="2"
                placeholder="Log a field testing result, milestone completion, or telemetry update..."
                value={newUpdateText}
                onChange={(e) => setNewUpdateText(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newUpdateText.trim()}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-soft transition-all"
                >
                  Post Activity Update
                </button>
              </div>
            </form>

            <div className="space-y-3 pt-2">
              {project.updates?.map((u) => (
                <div key={u.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{u.author}</span>
                    <span className="text-[10px] text-slate-400">{u.date}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{u.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TEAM & ROSTER */}
        {activeTab === 'team' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-4">Innovation Team Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.teamMembers?.map((member, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs">
                  <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-xl object-cover ring-1 ring-emerald-600" />
                  <div>
                    <h4 className="font-bold text-slate-900">{member.name}</h4>
                    <p className="text-slate-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-4">Technical Deliverables & Schematics</h3>
            <div className="space-y-3">
              {project.documents?.map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-emerald-700" />
                    <div>
                      <h4 className="font-bold text-slate-900">{doc.name}</h4>
                      <span className="text-[10px] text-slate-400">{doc.size} • Uploaded {doc.date}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 shadow-2xs">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
