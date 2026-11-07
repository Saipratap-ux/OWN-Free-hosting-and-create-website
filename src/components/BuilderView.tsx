import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import {
  Wand2,
  Mic,
  MicOff,
  Sparkles,
  Palette,
  LayoutGrid,
  CheckCircle2,
  Loader2,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Layers,
  Code2,
} from 'lucide-react';

interface BuilderViewProps {
  initialPrompt?: string;
  initialCategory?: string;
  onWebsiteGenerated: (project: Project) => void;
}

export const BuilderView: React.FC<BuilderViewProps> = ({
  initialPrompt = '',
  initialCategory = 'Business',
  onWebsiteGenerated,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [category, setCategory] = useState(initialCategory);
  const [style, setStyle] = useState('Modern Dark');
  const [palette, setPalette] = useState('Indigo & Violet');
  const [title, setTitle] = useState('');

  // Speech Recognition state (Voice builder PRD Section 21)
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Generation pipeline state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const pipelineSteps = [
    'Analyzing User Prompt & Context',
    'Synthesizing Architecture & Page Hierarchy',
    'Generating Semantic HTML5 Components',
    'Applying Responsive Design & Tailwind Styling',
    'Injecting Interactive JavaScript Handlers',
    'Running Code Validation & Security Checks',
    'Finalizing Multi-Device Live Preview',
  ];

  const categories = [
    'Business',
    'AI Startup',
    'Education',
    'Developer Portfolio',
    'Restaurant',
    'Hotel & Resort',
    'Creative Agency',
    'E-commerce',
    'Fitness & Gym',
    'Personal Portfolio',
    'Resume / CV',
    'Photography',
    'Music & Artist',
    'SaaS Platform',
  ];

  const designStyles = [
    'Modern Dark',
    'Clean Minimalist',
    'Tech Cyberpunk',
    'Warm Artisan',
    'High-Contrast Bold',
    'Soft Pastel Glass',
  ];

  const colorPalettes = [
    'Indigo & Violet',
    'Emerald & Cyan',
    'Rose & Pink',
    'Amber & Gold',
    'Monochrome Slate',
    'Electric Blue',
  ];

  useEffect(() => {
    if (initialPrompt) setPrompt(initialPrompt);
    if (initialCategory) setCategory(initialCategory);
  }, [initialPrompt, initialCategory]);

  // Voice speech-to-text integration
  const toggleVoiceRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      alert('Speech Recognition is not supported by this browser. Please type your prompt.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setErrorMessage('Please describe the website you want to create.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');
    setCurrentStepIndex(0);

    // Step progression timer animation
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < pipelineSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    try {
      const derivedTitle = title.trim() || prompt.split(' ').slice(0, 3).join(' ') || 'My Website';
      const cleanSub = derivedTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-+|-+$/g, '') || `site-${Date.now().toString(36)}`;

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${prompt}. Design style: ${style}. Color palette: ${palette}.`,
          category,
          style,
          title: derivedTitle,
        }),
      });

      const data = await response.json();
      clearInterval(interval);
      setCurrentStepIndex(pipelineSteps.length - 1);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Website generation failed. Retrying with fallback.');
      }

      const newProject: Project = {
        id: `proj_${Date.now()}`,
        title: data.title || derivedTitle,
        category,
        description: data.description || prompt,
        subdomain: cleanSub,
        isPublished: false,
        files: data.files,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      };

      // Also persist to server DB
      fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      }).catch(() => {});

      setTimeout(() => {
        setIsGenerating(false);
        onWebsiteGenerated(newProject);
      }, 600);
    } catch (err: any) {
      clearInterval(interval);
      setIsGenerating(false);
      setErrorMessage(err?.message || 'Generation issue. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Website Generator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Describe It. We Build It.
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Enter text or speak via microphone. SaipratapS❤️C will generate semantic HTML5, responsive CSS,
          and interactive code with zero subscription needed.
        </p>
      </div>

      {/* Main Generator Form */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <form onSubmit={handleGenerate} className="space-y-8">
          {/* Prompt Area with Voice */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span>1. Describe the website you want</span>
                <span className="text-rose-500">*</span>
              </label>

              {/* Voice button */}
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-purple-400 border border-slate-700'
                }`}
                title="Speak to dictate your website prompt"
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Listening (Speak now)...' : 'Voice Dictate'}</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                required
                placeholder="E.g., Create a modern education website for an AI academy with courses, mentor profiles, student registration form, responsive design, and a blue-and-indigo theme..."
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-400">
              <span className="text-slate-500 font-medium">Quick ideas:</span>
              <button
                type="button"
                onClick={() => setPrompt('Create a modern restaurant website with online reservations, chef specials, food gallery, and dark warm aesthetic.')}
                className="hover:text-indigo-400 underline"
              >
                Restaurant & Menu
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setPrompt('Create a high-converting SaaS landing page with animated feature cards, pricing tiers, testimonial carousel, and newsletter signup.')}
                className="hover:text-indigo-400 underline"
              >
                SaaS Landing
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setPrompt('Create a clean minimalist software engineer portfolio with project showcase, GitHub stats, skills matrix, and contact form.')}
                className="hover:text-indigo-400 underline"
              >
                Dev Portfolio
              </button>
            </div>
          </div>

          {/* Website Title (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Website Name / Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., NeuroCraft Studio"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
                <span>Industry Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Style & Palette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-pink-400" />
                <span>Design Aesthetic</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {designStyles.slice(0, 4).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStyle(item)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition ${
                      style === item
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Color Palette</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorPalettes.slice(0, 4).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPalette(item)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition ${
                      palette === item
                        ? 'bg-purple-600/20 border-purple-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-600/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Wand2 className="w-5 h-5" />
            <span>Generate Website with AI</span>
          </button>
        </form>
      </div>

      {/* Generation Pipeline Modal (PRD Section 10 Mermaid Flow) */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl text-white space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl animate-spin">
                <Loader2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Generation Pipeline</h3>
                <p className="text-xs text-slate-400">Synthesizing semantic files & responsive styles...</p>
              </div>
            </div>

            {/* Pipeline Step List */}
            <div className="space-y-3 pt-2">
              {pipelineSteps.map((step, idx) => {
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 text-xs transition-opacity ${
                      isPassed
                        ? 'text-emerald-400 font-medium'
                        : isCurrent
                        ? 'text-indigo-400 font-bold'
                        : 'text-slate-600'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 shrink-0 animate-spin text-indigo-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0"></div>
                    )}
                    <span>{step}</span>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300"
                style={{
                  width: `${((currentStepIndex + 1) / pipelineSteps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
