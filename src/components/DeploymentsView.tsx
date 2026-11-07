import React, { useState, useEffect } from 'react';
import { Project, ActiveTab } from '../types';
import {
  Globe2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Radio,
  Search,
  Server,
  Zap,
  HardDrive,
  Copy,
  Plus,
} from 'lucide-react';

interface DeploymentsViewProps {
  projects: Project[];
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPublish: (project: Project) => void;
}

export const DeploymentsView: React.FC<DeploymentsViewProps> = ({
  projects,
  setActiveTab,
  onOpenPublish,
}) => {
  const publishedProjects = projects.filter((p) => p.isPublished);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyUrl = (subdomain: string, id: string) => {
    const url = `${window.location.origin}/site/${subdomain}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Public Deployments & Edge Network
            </h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Network Online
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Websites published with SaipratapS❤️C are globally available with automated HTTPS and edge delivery.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('builder')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New Website</span>
        </button>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>Global Edge Points</span>
            <Server className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">35 Locations</div>
          <div className="text-[11px] text-slate-500 mt-1">Free low-latency caching</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>SSL Certificate Lifecycle</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">Automated & Free</div>
          <div className="text-[11px] text-slate-500 mt-1">TLS 1.3 Strict HTTPS</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>Platform Bandwidth Policy</span>
            <Zap className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white">Zero Subscription</div>
          <div className="text-[11px] text-slate-500 mt-1">Transparent fair-use network</div>
        </div>
      </div>

      {/* Deployments List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-indigo-400" />
          <span>Active Public Websites ({publishedProjects.length})</span>
        </h2>

        {publishedProjects.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
            <Globe2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No websites published yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Open any of your draft projects and click "Publish Free" to get your instant live public URL.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Go to Projects
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {publishedProjects.map((p) => {
              const liveUrl = `${window.location.origin}/site/${p.subdomain}`;
              return (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{p.title}</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-semibold">
                        {p.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>HTTPS Ready</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="text-indigo-400">{liveUrl}</span>
                      <span className="text-slate-600 hidden sm:inline">•</span>
                      <span className="text-[11px] text-slate-500 hidden sm:inline">
                        Updated {new Date(p.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(p.subdomain, p.id)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === p.id ? 'Copied Link!' : 'Copy Link'}</span>
                    </button>

                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                    >
                      <span>Visit Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
