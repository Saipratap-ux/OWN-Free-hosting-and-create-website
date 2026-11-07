import React from 'react';
import { ActiveTab } from '../types';
import { Heart, Globe2, Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-600/30">
                S
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                SaipratapS<span className="text-rose-500">❤️</span>C
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The public AI-powered website builder, visual editor, and free publishing platform.
              Generate, edit, auto-repair, and publish websites without subscription fees.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational • Zero Subscription Hosting</span>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('builder')} className="hover:text-indigo-400 transition">
                  AI Website Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('editor')} className="hover:text-indigo-400 transition">
                  Visual & Code Editor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('templates')} className="hover:text-indigo-400 transition">
                  18+ Templates
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('deployments')} className="hover:text-indigo-400 transition">
                  Free Public Hosting
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Features</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('builder')} className="hover:text-indigo-400 transition">
                  Voice Website Builder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('editor')} className="hover:text-indigo-400 transition">
                  AI Code Doctor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('editor')} className="hover:text-indigo-400 transition">
                  ZIP Export & Download
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('docs')} className="hover:text-indigo-400 transition">
                  PRD Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Security */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Administration</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-indigo-400 transition flex items-center gap-1">
                  <span>Admin Dashboard</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <span className="text-slate-500">Fair-Use Fair Hosting</span>
              </li>
              <li>
                <span className="text-slate-500">Free SSL Certificates</span>
              </li>
              <li>
                <span className="text-slate-500">PWA Offline Shell</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 SaipratapS❤️C. Build. Create. Publish. Share. Free.</p>
          <div className="flex items-center gap-4">
            <span>Crafted with passion for creators worldwide</span>
            <span className="text-rose-500">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
