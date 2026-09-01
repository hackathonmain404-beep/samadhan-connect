import React from 'react';
import { Link } from 'react-router-dom';
import {
  Droplets,
  Sprout,
  HeartPulse,
  GraduationCap,
  Trash2,
  Leaf,
  Briefcase,
  Accessibility,
  Building2,
  Landmark,
  ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  Droplets,
  Sprout,
  HeartPulse,
  GraduationCap,
  Trash2,
  Leaf,
  Briefcase,
  Accessibility,
  Building2,
  Landmark
};

export const CategoryCard = ({ category }) => {
  const IconComponent = ICON_MAP[category.icon] || Droplets;

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${category.color}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">
          {category.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-4">
          <strong className="text-slate-800 font-bold">{category.count}</strong> active challenges
        </p>
      </div>

      <Link
        to={`/challenges?category=${encodeURIComponent(category.name)}`}
        className="inline-flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800 pt-3 border-t border-slate-100 transition-colors"
      >
        <span>Explore Domain</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
