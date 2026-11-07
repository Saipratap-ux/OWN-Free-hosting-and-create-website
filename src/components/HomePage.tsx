import React, { useState } from 'react';
import { ActiveTab, Template } from '../types';
import { TEMPLATES } from '../data/templates';
import {
  Wand2,
  Sparkles,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Laptop,
  Tablet,
  Smartphone,
  Code2,
  Sliders,
  ShieldCheck,
  Zap,
  Mic,
  FileCode,
  Download,
  Share2,
  HelpCircle,
  Play,
  RotateCw,
  Layers,
  ChevronRight,
  Bug,
  Eye,
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: ActiveTab) => void;
  onStartWithPrompt: (prompt: string, category?: string) => void;
  onSelectTemplate: (template: Template) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onStartWithPrompt,
  onSelectTemplate,
}) => {
  const [heroPrompt, setHeroPrompt] = useState('');
  const [demoViewMode, setDemoViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const quickPrompts = [
    { label: '🎓 STEM Academy with courses & student registration', cat: 'Education' },
    { label: '🚀 AI Neural Analytics SaaS with waitlist', cat: 'AI Startup' },
    { label: '🍕 Artisan Italian Trattoria with online table booking', cat: 'Restaurant' },
    { label: '💻 Senior Full-Stack Engineer portfolio with projects', cat: 'Developer Portfolio' },
    { label: '🏨 Oceanfront Boutique Resort with suite reservation', cat: 'Hotel' },
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPrompt.trim()) {
      onStartWithPrompt(heroPrompt.trim());
    } else {
      setActiveTab('builder');
    }
  };

  const faqs = [
    {
      q: 'Is public publishing really 100% free with no hidden charges?',
      a: 'Yes! SaipratapS❤️C lets you build, customize, and publish websites on free public URLs (e.g. /site/your-subdomain) with HTTPS enabled and zero mandatory subscription requirements.',
    },
    {
      q: 'Can I download the complete website source code?',
      a: 'Absolutely. Every single project gives you 1-click ZIP export containing organized HTML5, modern CSS, JavaScript, and documentation. You own 100% of your generated code.',
    },
    {
      q: 'How does the AI Error Detection & Auto-Repair work?',
      a: 'Our built-in diagnostic engine tests your markup for missing mobile viewports, unclosed tags, accessibility alt attributes, broken internal links, and CSS overflow. Clicking "AI Auto-Fix" repairs them in seconds.',
    },
    {
      q: 'Can I edit the code directly or use a visual editor?',
      a: 'Both! SaipratapS❤️C provides a visual drag-and-drop section manager for instant reordering and text editing, alongside a multi-file syntax-highlighted code editor for complete developer control.',
    },
    {
      q: 'Can I build a website using my voice?',
      a: 'Yes. Simply click the microphone button on the AI Builder, speak your idea, and our speech-to-text pipeline will transform your words into a prompt and build your website.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-900">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span>SaipratapS❤️C Next-Gen Engine</span>
              <span className="text-slate-500">•</span>
              <span className="text-pink-400">Build. Create. Publish. Share. Free.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Build Your Website With AI.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Publish It Free.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Describe your idea. SaipratapS❤️C creates your website, helps you customize it, fixes
              errors, and lets you publish it publicly without requiring a subscription.
            </p>

            {/* Interactive Prompt Input Box */}
            <div className="max-w-3xl mx-auto mt-8">
              <form
                onSubmit={handleHeroSubmit}
                className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-1">
                  <Wand2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  <input
                    type="text"
                    value={heroPrompt}
                    onChange={(e) => setHeroPrompt(e.target.value)}
                    placeholder="Describe your website (e.g., modern coffee shop with online ordering & dark theme)..."
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none py-2"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      onStartWithPrompt(heroPrompt || 'Modern SaaS landing page', 'Startup');
                    }}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                    title="Voice prompt available in builder"
                  >
                    <Mic className="w-4 h-4 text-purple-400" />
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                  >
                    <span>Generate Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Sample Quick Prompt Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <span className="text-slate-500 font-medium">Try prompts:</span>
                {quickPrompts.slice(0, 3).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onStartWithPrompt(item.label, item.cat)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-white transition text-[11px]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Supporting Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No subscription required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AI-powered generation & auto-fix</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant free public URL with HTTPS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full ZIP source download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo & Device Mockup Showcase */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Live Interactive Demonstration</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Instant Generation. Real-time Multi-Device Preview.
            </h2>
            <p className="text-slate-400 text-sm">
              See how SaipratapS❤️C generates interactive websites rendered across desktop, tablet, and mobile screens.
            </p>
          </div>

          {/* Device Controls */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setDemoViewMode('desktop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
                demoViewMode === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Desktop (1200px)</span>
            </button>
            <button
              onClick={() => setDemoViewMode('tablet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
                demoViewMode === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Tablet className="w-4 h-4" />
              <span>Tablet (768px)</span>
            </button>
            <button
              onClick={() => setDemoViewMode('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
                demoViewMode === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile (375px)</span>
            </button>
          </div>

          {/* Browser Frame */}
          <div className="flex justify-center">
            <div
              className={`transition-all duration-300 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden ${
                demoViewMode === 'desktop'
                  ? 'w-full max-w-5xl'
                  : demoViewMode === 'tablet'
                  ? 'w-[768px] max-w-full'
                  : 'w-[375px] max-w-full'
              }`}
            >
              {/* Browser Header Bar */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 max-w-xs truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>https://auratech.saiweb.app</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-semibold text-[10px]">
                    PUBLISHED LIVE
                  </span>
                </div>
              </div>

              {/* Demo Content Inside Frame */}
              <div className="bg-slate-950 p-6 sm:p-10 space-y-8 max-h-[500px] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                      A
                    </div>
                    <span className="font-bold text-white text-base">AuraTech AI</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="hidden sm:inline">Features</span>
                    <span className="hidden sm:inline">Pricing</span>
                    <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium">Get Started</span>
                  </div>
                </div>

                <div className="text-center py-8 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                    Autonomous Intelligence Engine
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                    Transforming Workflows with Predictive AI
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
                    Built, optimized, and deployed in 30 seconds using the SaipratapS❤️C automated platform.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('builder')}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md"
                    >
                      Build Your Own Like This
                    </button>
                    <button
                      onClick={() => onSelectTemplate(TEMPLATES[0])}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs"
                    >
                      Use Template
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <Zap className="w-5 h-5 text-indigo-400 mb-2" />
                    <h4 className="font-bold text-xs text-white">Sub-10ms Speed</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Global edge delivery caching.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <ShieldCheck className="w-5 h-5 text-pink-400 mb-2" />
                    <h4 className="font-bold text-xs text-white">SSL Encrypted</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Automatic HTTPS certificates.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <Code2 className="w-5 h-5 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-xs text-white">Clean Codebase</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Exportable valid HTML/CSS/JS.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step How It Works (PRD Section 4 & 6) */}
      <section className="py-20 border-t border-slate-900 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Complete Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How SaipratapS❤️C Works in 4 Steps
            </h2>
            <p className="text-slate-400 text-sm">
              From natural language idea to public live website in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative hover:border-indigo-500/50 transition group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Prompt or Speak</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Describe your desired website in simple language or speak into your microphone. Select category, style, and colors.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative hover:border-purple-500/50 transition group">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Synthesizes Code</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gemini AI crafts clean HTML5, modern Tailwind CSS, and interactive JS components with complete semantic structure.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative hover:border-pink-500/50 transition group">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Visual & Code Edit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag and reorder sections, edit text inline, or dive into the Monaco-style code editor with AI auto-repair for issues.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative hover:border-emerald-500/50 transition group">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Free 1-Click Publish</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deploy immediately to a free public URL with HTTPS. Share with the world, connect custom domains, or download the full ZIP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates Showcase (PRD Section 19) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Ready-To-Use Foundations</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Explore Popular Templates</h2>
              <p className="text-slate-400 text-sm mt-1">
                Start from scratch with AI prompts or customize professionally crafted industry templates.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('templates')}
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs font-semibold"
            >
              <span>View All 18+ Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMPLATES.slice(0, 6).map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden hover:border-slate-700 transition flex flex-col group"
              >
                {/* Gradient Header Banner */}
                <div className={`h-36 bg-gradient-to-r ${tpl.gradient} p-6 flex flex-col justify-between relative`}>
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold">
                      {tpl.category}
                    </span>
                    <Sparkles className="w-4 h-4 text-white/80" />
                  </div>
                  <h3 className="text-lg font-bold text-white drop-shadow-md">{tpl.title}</h3>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tpl.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onSelectTemplate(tpl)}
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition text-center"
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => {
                        onSelectTemplate(tpl);
                        setActiveTab('editor');
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                      title="Preview in Editor"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Publishing Model Details (PRD Section 17 & 34) */}
      <section className="py-20 border-t border-slate-900 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900/90 border border-indigo-500/30 p-8 sm:p-14 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span>Free Plan • ₹0 / $0 Forever</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                No Mandatory Subscription. Ever.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Unlike traditional website builders that charge ₹1,500/mo just to connect a URL,
                SaipratapS❤️C provides free public publishing, subdomains, full source code downloads,
                and unlimited drafts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Free Platform Subdomain (your-name.saiweb.app)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Automatic HTTPS and SSL security</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Unlimited Website Generations & Drafts</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>ZIP Code Export with zero lock-in</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveTab('builder')}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 text-center"
                >
                  Create Your Free Website Now
                </button>
                <button
                  onClick={() => setActiveTab('deployments')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition text-center"
                >
                  View Live Public Deployments
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (PRD Section 6 #8) */}
      <section className="py-20 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Got Questions?</span>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-indigo-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      activeFaq === index ? 'rotate-90 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
