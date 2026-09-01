import React from 'react';
import { PlayCircle, Clock, CheckCircle2, Award, RefreshCw, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ status, className = '' }) => {
  const getBadgeConfig = (s) => {
    switch (s?.toLowerCase()) {
      case 'open for solutions':
      case 'open':
      case 'verified':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-600',
          icon: PlayCircle,
          label: s === 'verified' ? 'Verified' : 'Open for Solutions'
        };
      case 'under review':
      case 'pending':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          icon: Clock,
          label: 'Under Review'
        };
      case 'solution proposed':
      case 'proposed':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-600',
          icon: RefreshCw,
          label: 'Solution Proposed'
        };
      case 'prototype':
      case 'in prototyping':
      case 'in progress':
        return {
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          dot: 'bg-indigo-600',
          icon: RefreshCw,
          label: 'In Progress'
        };
      case 'testing':
      case 'in field testing':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          dot: 'bg-purple-600',
          icon: RefreshCw,
          label: 'In Field Testing'
        };
      case 'resolved':
      case 'completed':
      case 'implemented':
        return {
          bg: 'bg-teal-50 text-teal-900 border-teal-300',
          dot: 'bg-teal-700',
          icon: Award,
          label: 'Resolved & Implemented'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-500',
          icon: AlertCircle,
          label: s || 'Active'
        };
    }
  };

  const config = getBadgeConfig(status);
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}></span>
      <IconComponent className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
};

export const UrgencyBadge = ({ urgency, className = '' }) => {
  const getUrgencyConfig = (u) => {
    switch (u?.toLowerCase()) {
      case 'critical':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          text: 'Critical Urgency',
          dot: 'bg-rose-600'
        };
      case 'high':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          text: 'High Priority',
          dot: 'bg-amber-600'
        };
      case 'medium':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          text: 'Medium Priority',
          dot: 'bg-blue-600'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          text: 'Normal Priority',
          dot: 'bg-slate-400'
        };
    }
  };

  const config = getUrgencyConfig(urgency);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${config.bg} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      <span>{config.text}</span>
    </span>
  );
};
