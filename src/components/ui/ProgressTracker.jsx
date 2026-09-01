import React from 'react';
import { Check } from 'lucide-react';

export const ProgressTracker = ({ stages, currentStageIndex = 0, className = '' }) => {
  return (
    <div className={`w-full py-4 ${className}`}>
      {/* Desktop / Tablet Timeline */}
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
        <div
          className="absolute top-1/2 left-0 h-1 bg-emerald-600 -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: stages.length > 1 ? `${(currentStageIndex / (stages.length - 1)) * 100}%` : '0%'
          }}
        ></div>

        {stages.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-sm ${
                  isCompleted
                    ? 'bg-emerald-700 text-white ring-4 ring-emerald-100'
                    : isCurrent
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100 scale-110 shadow-glow-amber'
                    : 'bg-white text-slate-400 border-2 border-slate-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <span className="animate-pulse">{idx + 1}</span>
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span
                className={`mt-2.5 text-xs text-center font-medium max-w-[90px] leading-tight transition-colors ${
                  isCurrent
                    ? 'text-amber-700 font-bold'
                    : isCompleted
                    ? 'text-slate-800'
                    : 'text-slate-400'
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Accordion/Vertical Steps */}
      <div className="md:hidden space-y-2">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs ${
                isCurrent
                  ? 'bg-amber-50 border-amber-200 text-amber-900 font-bold'
                  : isCompleted
                  ? 'bg-emerald-50/70 border-emerald-100 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-700 text-white'
                    : isCurrent
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <span>{stage}</span>
              {isCurrent && <span className="ml-auto text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Active</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
