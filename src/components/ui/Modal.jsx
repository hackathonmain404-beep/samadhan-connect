import React, { useEffect } from 'react';
import { X, SearchX, Sparkles } from 'lucide-react';

export const SkeletonLoader = ({ className = '', variant = 'rect' }) => {
  const base = 'animate-pulse bg-slate-200/80';
  if (variant === 'circle') return <div className={`rounded-full ${base} ${className}`} />;
  if (variant === 'card') return <div className={`rounded-2xl h-64 ${base} ${className}`} />;
  return <div className={`rounded-md ${base} ${className}`} />;
};

export const EmptyState = ({
  icon: Icon = SearchX,
  title = 'No Results Found',
  description = 'Try adjusting your search criteria or filters to discover community challenges.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto my-8">
      <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-soft transition-all"
        >
          <Sparkles className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      <div className={`relative bg-white rounded-3xl shadow-2xl border border-slate-100 w-full ${maxWidth} z-10 overflow-hidden transform transition-all animate-slide-up max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
