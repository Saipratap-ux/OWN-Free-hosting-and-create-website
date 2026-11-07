import React, { useState } from 'react';
import { Template, ActiveTab } from '../types';
import { TEMPLATES } from '../data/templates';
import {
  Sparkles,
  Search,
  Eye,
  Check,
  ArrowRight,
  ExternalLink,
  Laptop,
  Layers,
  Wand2,
} from 'lucide-react';

interface TemplatesViewProps {
  onSelectTemplate: (template: Template) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onSelectTemplate,
  setActiveTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const categories = [
    'All',
    'AI Startup',
    'Education',
    'Developer Portfolio',
    'Restaurant',
    'Hotel',
    'Agency',
    'E-commerce',
    'Fitness',
  ];

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesCat = selectedCategory === 'All' || tpl.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>18+ Industry Templates</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Website Templates
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Pick a curated production foundation or use as inspiration. Customize everything with AI prompts or code.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 w-full sm:w-64 text-xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex flex-col overflow-hidden group"
          >
            {/* Visual Header Banner */}
            <div className={`h-40 bg-gradient-to-tr ${tpl.gradient} p-6 flex flex-col justify-between relative`}>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold">
                  {tpl.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 text-white font-semibold backdrop-blur-md">
                  FREE
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white drop-shadow-md">{tpl.title}</h3>
            </div>

            {/* Description & Tags */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-xs">
              <p className="text-slate-400 leading-relaxed line-clamp-2">{tpl.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tpl.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onSelectTemplate(tpl)}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition text-center shadow-md shadow-indigo-600/20"
                >
                  Use Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  title="Quick Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl h-[85vh] rounded-3xl bg-slate-900 border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{previewTemplate.title}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                  {previewTemplate.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const chosen = previewTemplate;
                    setPreviewTemplate(null);
                    onSelectTemplate(chosen);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow"
                >
                  Use This Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white">
              <iframe
                srcDoc={previewTemplate.files['index.html']?.content || ''}
                title="Template Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
