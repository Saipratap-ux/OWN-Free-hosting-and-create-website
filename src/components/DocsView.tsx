import React from 'react';
import { ActiveTab } from '../types';
import { FileText, CheckCircle2, Globe2, Wand2, Shield, Code2, ExternalLink } from 'lucide-react';

interface DocsViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const DocsView: React.FC<DocsViewProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-slate-900 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Product Requirements Document (PRD)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          SaipratapS❤️C Documentation & Technical Architecture
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Tagline: <strong>Build. Create. Publish. Share. Free.</strong> — Complete guide to website generation, visual editing, error diagnostics, and zero-subscription public publishing.
        </p>
      </div>

      <div className="space-y-8 text-xs text-slate-300 leading-relaxed">
        {/* Section 1 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-xs">1</span>
            <span>Product Vision & Core Objective</span>
          </h2>
          <p>
            SaipratapS❤️C allows anyone to create a professional website without needing programming knowledge.
            Users can generate websites using AI prompts, edit visually and in code, preview changes on desktop/tablet/mobile,
            automatically detect and fix code errors, download the source code as a ZIP archive, and publish publicly with free URLs.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-purple-600/30 text-purple-400 flex items-center justify-center text-xs">2</span>
            <span>7-Stage AI Synthesis Pipeline</span>
          </h2>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400 pl-2">
            <li><strong className="text-white">Prompt Analyzer:</strong> Extracts category, style, audience, and layout constraints.</li>
            <li><strong className="text-white">Website Specification:</strong> Defines page hierarchy, navigation routes, and brand elements.</li>
            <li><strong className="text-white">Page & Component Generator:</strong> Builds semantic HTML5 structures with accessible forms.</li>
            <li><strong className="text-white">Responsive Design:</strong> Generates fluid layouts for 375px mobile, 768px tablet, and wide desktop screens.</li>
            <li><strong className="text-white">Interactive Logic:</strong> Injects DOM listeners, mobile toggle menus, and modal dialogs.</li>
            <li><strong className="text-white">Build Validation:</strong> Runs automated heuristic error checks before staging.</li>
            <li><strong className="text-white">Live Multi-Device Sandbox:</strong> Renders inside isolated iframe with hot re-compilation.</li>
          </ol>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center text-xs">3</span>
            <span>Free Public Deployment & Subdomains</span>
          </h2>
          <p>
            Published websites are hosted with high-speed CDN delivery and free TLS/SSL encryption certificates.
            Every project receives an instant public URL format:
          </p>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-emerald-400 text-xs border border-slate-800">
            https://your-domain.saiweb.app &nbsp;•&nbsp; /site/:subdomain
          </div>
          <p>
            Users can also connect existing custom domains by pointing CNAME records without subscription locks.
          </p>
        </div>

        {/* Section 4 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-pink-600/30 text-pink-400 flex items-center justify-center text-xs">4</span>
            <span>AI Code Doctor & Auto-Repair</span>
          </h2>
          <p>
            The automated diagnostic engine continuously audits for missing mobile viewport meta tags, unclosed containers, missing image <code className="text-indigo-400">alt</code> tags, broken internal anchor links, and horizontal overflow problems. Clicking "AI Auto-Fix" repairs issues across the project in one second.
          </p>
        </div>
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={() => setActiveTab('builder')}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
        >
          Try the AI Website Builder
        </button>
      </div>
    </div>
  );
};
