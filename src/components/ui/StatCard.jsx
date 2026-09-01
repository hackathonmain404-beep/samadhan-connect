import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, subtitle, icon: Icon, change, color = 'emerald' }) => {
  const getColorClasses = (c) => {
    switch (c) {
      case 'emerald':
      case 'forest':
        return { bg: 'bg-emerald-50 text-emerald-800', border: 'border-emerald-100', iconBg: 'bg-emerald-700 text-white' };
      case 'amber':
      case 'orange':
        return { bg: 'bg-amber-50 text-amber-800', border: 'border-amber-100', iconBg: 'bg-amber-600 text-white' };
      case 'indigo':
        return { bg: 'bg-indigo-50 text-indigo-800', border: 'border-indigo-100', iconBg: 'bg-indigo-600 text-white' };
      case 'rose':
        return { bg: 'bg-rose-50 text-rose-800', border: 'border-rose-100', iconBg: 'bg-rose-600 text-white' };
      default:
        return { bg: 'bg-emerald-50 text-emerald-800', border: 'border-emerald-100', iconBg: 'bg-emerald-700 text-white' };
    }
  };

  const style = getColorClasses(color);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
        {change && (
          <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>}
    </div>
  );
};
