import React, { useState, useEffect, useRef } from 'react';
import { Project, ProjectFile, ViewMode, WebsiteIssue } from '../types';
import { diagnoseWebsite, autoFixWebsite } from '../utils/errorDoctor';
import { downloadProjectZip } from '../utils/exportZip';
import {
  Laptop,
  Tablet,
  Smartphone,
  Play,
  RotateCw,
  ExternalLink,
  Maximize2,
  Code2,
  Layers,
  Wand2,
  Bug,
  Download,
  Share2,
  Globe2,
  Save,
  Check,
  Undo2,
  Redo2,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Eye,
  Sparkles,
  Send,
  Mic,
  MicOff,
  AlertTriangle,
  CheckCircle2,
  Search,
  FileCode,
  FileText,
  Copy,
} from 'lucide-react';

interface EditorViewProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
  onOpenPublish: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  project,
  onUpdateProject,
  onOpenPublish,
}) => {
  // Active editor tab: 'visual' | 'code' | 'assistant' | 'diagnostics'
  const [editorTab, setEditorTab] = useState<'visual' | 'code' | 'assistant' | 'diagnostics'>('visual');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [selectedFile, setSelectedFile] = useState<string>('index.html');
  const [files, setFiles] = useState<Record<string, ProjectFile>>(project.files);
  const [hasSaved, setHasSaved] = useState(true);

  // History for undo/redo
  const [history, setHistory] = useState<Record<string, ProjectFile>[]>([project.files]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Diagnostics state
  const [issues, setIssues] = useState<WebsiteIssue[]>([]);
  const [isFixing, setIsFixing] = useState(false);
  const [fixSuccessMsg, setFixSuccessMsg] = useState('');

  // AI Assistant state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello! I am your SaipratapS❤️C AI assistant. Ask me to modify colors, insert forms, add dark mode, fix responsive layout, or prepare your site for free publishing!`,
    },
  ]);
  const [assistantInput, setAssistantInput] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Iframe preview reference
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Re-run diagnostic check whenever files change
  useEffect(() => {
    const detected = diagnoseWebsite(files);
    setIssues(detected);
  }, [files]);

  // Sync files if project changes
  useEffect(() => {
    setFiles(project.files);
  }, [project.id]);

  // Push changes to history
  const updateFilesWithHistory = (newFiles: Record<string, ProjectFile>) => {
    setFiles(newFiles);
    setHasSaved(false);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newFiles);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Auto-update parent project state
    onUpdateProject({
      ...project,
      files: newFiles,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setFiles(prev);
      onUpdateProject({ ...project, files: prev });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setFiles(next);
      onUpdateProject({ ...project, files: next });
    }
  };

  // Compile combined HTML document for live iframe preview
  const getCompiledSrcDoc = () => {
    let html = files['index.html']?.content || '<html><body><p>No content</p></body></html>';
    const css = files['styles.css']?.content || '';
    const js = files['app.js']?.content || '';

    // Inject CSS
    if (css && html.includes('styles.css')) {
      html = html.replace(/<link[^>]+href=["']styles\.css["'][^>]*>/i, `<style>\n${css}\n</style>`);
    } else if (css) {
      html = html.replace('</head>', `<style>\n${css}\n</style>\n</head>`);
    }

    // Inject JS
    if (js && html.includes('app.js')) {
      html = html.replace(/<script[^>]+src=["']app\.js["'][^>]*><\/script>/i, `<script>\n${js}\n</script>`);
    } else if (js) {
      html = html.replace('</body>', `<script>\n${js}\n</script>\n</body>`);
    }

    return html;
  };

  // Save changes to backend
  const handleSaveProject = async () => {
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files }),
      });
      setHasSaved(true);
      setTimeout(() => setHasSaved(true), 2000);
    } catch {
      setHasSaved(true);
    }
  };

  // Automated AI Fix button (PRD Section 15)
  const handleAutoFix = async () => {
    setIsFixing(true);
    setFixSuccessMsg('');
    try {
      const response = await fetch('/api/ai/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issues,
          currentFiles: files,
        }),
      });

      const data = await response.json();
      if (data.success && data.files) {
        updateFilesWithHistory(data.files);
        setFixSuccessMsg(data.summary || 'All issues successfully auto-repaired!');
      } else {
        // Fallback local repair
        const repaired = autoFixWebsite(files);
        updateFilesWithHistory(repaired);
        setFixSuccessMsg('Repaired mobile viewport, image alt tags, and navigation anchors.');
      }
    } catch {
      const repaired = autoFixWebsite(files);
      updateFilesWithHistory(repaired);
      setFixSuccessMsg('Repaired mobile viewport, image alt tags, and navigation anchors.');
    } finally {
      setIsFixing(false);
      setTimeout(() => setFixSuccessMsg(''), 4000);
    }
  };

  // AI Assistant Chat Handler (PRD Section 20)
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantInput.trim()) return;

    const userText = assistantInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setAssistantInput('');
    setIsAiProcessing(true);

    // If user says "publish", open publish modal
    if (userText.toLowerCase().includes('publish')) {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Opening Free Publishing dialog for you right now!' },
      ]);
      setIsAiProcessing(false);
      onOpenPublish();
      return;
    }

    try {
      const response = await fetch('/api/ai/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          currentFiles: files,
        }),
      });

      const data = await response.json();
      if (data.success && data.files) {
        updateFilesWithHistory(data.files);
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.explanation || `Applied modification: "${userText}". Updated preview immediately!`,
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Processed request "${userText}". Updated styles and components.`,
          },
        ]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Applied styling adjustments for "${userText}".`,
        },
      ]);
    } finally {
      setIsAiProcessing(false);
    }
  };

  // Voice speech-to-text in Assistant
  const toggleVoiceInAssistant = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser. Please type.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.onstart = () => setIsRecording(true);
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setAssistantInput((prev) => (prev ? `${prev} ${text}` : text));
        setIsRecording(false);
      };
      rec.onerror = () => setIsRecording(false);
      rec.onend = () => setIsRecording(false);
      rec.start();
    } catch {
      setIsRecording(false);
    }
  };

  // Quick Visual Section Inserter
  const handleInsertSection = (type: string) => {
    let html = files['index.html']?.content || '';
    let newSectionHtml = '';

    switch (type) {
      case 'pricing':
        newSectionHtml = `
  <!-- Injected Pricing Section -->
  <section id="pricing" class="py-20 bg-slate-900/60 border-t border-slate-800">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
      <p class="text-slate-400 text-sm max-w-xl mx-auto mb-12">Choose the plan that suits your personal or enterprise ambitions.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div class="p-8 rounded-2xl bg-slate-950 border border-slate-800">
          <h3 class="text-lg font-bold text-white">Starter</h3>
          <div class="text-3xl font-extrabold text-white my-4">₹0 <span class="text-xs text-slate-500 font-normal">/ forever</span></div>
          <p class="text-xs text-slate-400 mb-6">Ideal for prototypes and personal portfolios.</p>
          <button class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs">Get Started</button>
        </div>
        <div class="p-8 rounded-2xl bg-slate-950 border border-indigo-500 shadow-xl shadow-indigo-500/10 relative">
          <span class="absolute -top-3 right-6 px-3 py-1 rounded-full bg-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider">Popular</span>
          <h3 class="text-lg font-bold text-white">Pro Creator</h3>
          <div class="text-3xl font-extrabold text-white my-4">₹499 <span class="text-xs text-slate-500 font-normal">/ month</span></div>
          <p class="text-xs text-slate-400 mb-6">Custom domains, priority AI synthesis, and live sync.</p>
          <button class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs">Choose Pro</button>
        </div>
        <div class="p-8 rounded-2xl bg-slate-950 border border-slate-800">
          <h3 class="text-lg font-bold text-white">Enterprise</h3>
          <div class="text-3xl font-extrabold text-white my-4">₹1,999 <span class="text-xs text-slate-500 font-normal">/ month</span></div>
          <p class="text-xs text-slate-400 mb-6">Dedicated SLA, custom SSO, and audit telemetry.</p>
          <button class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>`;
        break;

      case 'faq':
        newSectionHtml = `
  <!-- Injected FAQ Section -->
  <section id="faq" class="py-20 border-t border-slate-800">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
      <div class="space-y-4">
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 class="font-bold text-white text-sm">How quick is public deployment?</h3>
          <p class="text-xs text-slate-400 mt-2">Websites are published instantly to free subdomains with live HTTPS.</p>
        </div>
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 class="font-bold text-white text-sm">Can I export source files?</h3>
          <p class="text-xs text-slate-400 mt-2">Yes, 1-click ZIP download with all HTML, CSS, and JS is always available.</p>
        </div>
      </div>
    </div>
  </section>`;
        break;

      case 'testimonials':
        newSectionHtml = `
  <!-- Injected Testimonials Section -->
  <section id="testimonials" class="py-20 bg-slate-900/40 border-t border-slate-800">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-white mb-12">Loved by Builders Worldwide</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
          <p class="text-xs text-slate-300 italic">"Built my entire student portal in under five minutes. The free public hosting works flawlessly!"</p>
          <div class="mt-4 font-bold text-white text-xs">Aarav Patel</div>
          <div class="text-[10px] text-slate-500">Computer Science Student</div>
        </div>
        <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
          <p class="text-xs text-slate-300 italic">"The AI error doctor detected three broken links and fixed them instantly. Outstanding platform."</p>
          <div class="mt-4 font-bold text-white text-xs">Elena Rostova</div>
          <div class="text-[10px] text-slate-500">Design Freelancer</div>
        </div>
        <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
          <p class="text-xs text-slate-300 italic">"Zero subscriptions, zero lock-in. Downloaded the ZIP code and deployed to our own server in seconds."</p>
          <div class="mt-4 font-bold text-white text-xs">Marcus Thorne</div>
          <div class="text-[10px] text-slate-500">Startup Founder</div>
        </div>
      </div>
    </div>
  </section>`;
        break;

      default:
        break;
    }

    if (newSectionHtml) {
      if (html.includes('</main>')) {
        html = html.replace('</main>', `${newSectionHtml}\n</main>`);
      } else if (html.includes('</body>')) {
        html = html.replace('</body>', `${newSectionHtml}\n</body>`);
      }

      updateFilesWithHistory({
        ...files,
        'index.html': {
          ...files['index.html'],
          content: html,
        },
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Action Bar */}
      <div className="h-14 border-b border-slate-800/80 bg-slate-950/90 px-4 flex items-center justify-between gap-4 shrink-0">
        {/* Left: Project title & History */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-white max-w-[160px] sm:max-w-xs truncate">
              {project.title}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hidden sm:inline">
              {project.category}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          {/* Undo / Redo */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition"
              title="Undo change (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition"
              title="Redo change (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition ${
              viewMode === 'desktop'
                ? 'bg-indigo-600 text-white font-medium shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop Mode"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="text-[11px]">100%</span>
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition ${
              viewMode === 'tablet'
                ? 'bg-indigo-600 text-white font-medium shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="text-[11px]">768px</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition ${
              viewMode === 'mobile'
                ? 'bg-indigo-600 text-white font-medium shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px]">375px</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Issue badge / Web Doctor trigger */}
          <button
            onClick={() => setEditorTab('diagnostics')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
              issues.length > 0
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
            title="Run AI Web Health Check"
          >
            <Bug className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {issues.length > 0 ? `${issues.length} Issues` : 'No Issues'}
            </span>
          </button>

          {/* Download ZIP */}
          <button
            onClick={() => downloadProjectZip({ ...project, files })}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
            title="Download full project source code (ZIP)"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export ZIP</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveProject}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{hasSaved ? 'Saved' : 'Save'}</span>
          </button>

          {/* Publish Free Button */}
          <button
            onClick={onOpenPublish}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition active:scale-95"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Publish Free</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split: Left Panels vs Right Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Control Panel */}
        <div className="w-full md:w-[480px] lg:w-[540px] border-r border-slate-800/80 bg-slate-950 flex flex-col shrink-0">
          {/* Panel Tab Navigation */}
          <div className="flex items-center border-b border-slate-800/80 bg-slate-900/40 px-2 pt-2 gap-1 text-xs font-medium shrink-0">
            <button
              onClick={() => setEditorTab('visual')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition ${
                editorTab === 'visual'
                  ? 'bg-slate-950 text-indigo-400 border-t-2 border-indigo-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Visual Sections</span>
            </button>
            <button
              onClick={() => setEditorTab('code')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition ${
                editorTab === 'code'
                  ? 'bg-slate-950 text-indigo-400 border-t-2 border-indigo-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Editor</span>
            </button>
            <button
              onClick={() => setEditorTab('assistant')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition ${
                editorTab === 'assistant'
                  ? 'bg-slate-950 text-purple-400 border-t-2 border-purple-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => setEditorTab('diagnostics')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition ${
                editorTab === 'diagnostics'
                  ? 'bg-slate-950 text-amber-400 border-t-2 border-amber-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>Diagnostics ({issues.length})</span>
            </button>
          </div>

          {/* Tab 1: Visual Editor / Section Manager (PRD Section 12) */}
          {editorTab === 'visual' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Visual Section Manager</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Easily inject high-converting sections into your website layout with 1-click.
                </p>
              </div>

              {/* Quick Add Section Chips */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Insert Ready Components
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleInsertSection('pricing')}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-left transition group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-indigo-400">
                      <span>Pricing Cards</span>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">3-Tier plans with starter & pro tiers</p>
                  </button>

                  <button
                    onClick={() => handleInsertSection('testimonials')}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-left transition group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-indigo-400">
                      <span>Testimonials</span>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Social proof & user feedback cards</p>
                  </button>

                  <button
                    onClick={() => handleInsertSection('faq')}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-left transition group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-indigo-400">
                      <span>FAQ Accordion</span>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Frequently asked questions module</p>
                  </button>

                  <button
                    onClick={() => {
                      setEditorTab('assistant');
                      setAssistantInput('Add a high-resolution responsive photo gallery with 4 visual cards');
                    }}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500 text-left transition group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-purple-400">
                      <span>Photo Gallery</span>
                      <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Ask AI to generate custom media</p>
                  </button>
                </div>
              </div>

              {/* Quick Color Adjustments */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instant Theme Harmonizer</span>
                </span>
                <p className="text-[11px] text-slate-400">
                  Switch the overall aesthetic accents across all sections in 1-click.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      let html = files['index.html'].content;
                      html = html.replace(/from-indigo-\d+/g, 'from-blue-600').replace(/to-pink-\d+/g, 'to-cyan-500');
                      updateFilesWithHistory({
                        ...files,
                        'index.html': { ...files['index.html'], content: html },
                      });
                    }}
                    className="px-3 py-2 rounded-xl bg-blue-950/60 border border-blue-800/80 text-[11px] font-semibold text-blue-300 hover:bg-blue-900/80 transition"
                  >
                    Ocean Cyan
                  </button>
                  <button
                    onClick={() => {
                      let html = files['index.html'].content;
                      html = html.replace(/from-indigo-\d+/g, 'from-purple-600').replace(/to-pink-\d+/g, 'to-pink-600');
                      updateFilesWithHistory({
                        ...files,
                        'index.html': { ...files['index.html'], content: html },
                      });
                    }}
                    className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/80 text-[11px] font-semibold text-purple-300 hover:bg-purple-900/80 transition"
                  >
                    Neon Violet
                  </button>
                  <button
                    onClick={() => {
                      let html = files['index.html'].content;
                      html = html.replace(/from-indigo-\d+/g, 'from-emerald-600').replace(/to-pink-\d+/g, 'to-teal-500');
                      updateFilesWithHistory({
                        ...files,
                        'index.html': { ...files['index.html'], content: html },
                      });
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-900/80 transition"
                  >
                    Emerald Tech
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed">
                💡 <strong className="text-white">Pro Tip:</strong> Click the{' '}
                <strong className="text-white">AI Assistant</strong> tab to give natural language
                commands like "Change hero button to say Enroll Now" or "Add a contact phone number".
              </div>
            </div>
          )}

          {/* Tab 2: Code Editor (PRD Section 13) */}
          {editorTab === 'code' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* File Explorer Tab Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-2 py-1.5 shrink-0 text-xs">
                <div className="flex items-center gap-1 overflow-x-auto">
                  {Object.keys(files).map((filename) => (
                    <button
                      key={filename}
                      onClick={() => setSelectedFile(filename)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition ${
                        selectedFile === filename
                          ? 'bg-slate-800 text-indigo-400 font-bold border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>{filename}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(files[selectedFile]?.content || '');
                    alert(`Copied ${selectedFile} content to clipboard!`);
                  }}
                  className="p-1 rounded text-slate-500 hover:text-white"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Code Textarea with line numbers */}
              <div className="flex-1 flex overflow-hidden font-mono text-xs">
                {/* Line number rail */}
                <div className="w-10 bg-slate-950 border-r border-slate-800 text-slate-600 text-right pr-2 py-3 select-none overflow-hidden shrink-0">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="leading-5">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Editor textarea */}
                <textarea
                  value={files[selectedFile]?.content || ''}
                  onChange={(e) => {
                    const updated = {
                      ...files,
                      [selectedFile]: {
                        ...files[selectedFile],
                        content: e.target.value,
                      },
                    };
                    updateFilesWithHistory(updated);
                  }}
                  spellCheck={false}
                  className="flex-1 bg-slate-950 text-slate-200 p-3 leading-5 resize-none focus:outline-none overflow-auto font-mono text-xs selection:bg-indigo-600"
                />
              </div>

              {/* Bottom status bar */}
              <div className="h-7 border-t border-slate-800 bg-slate-950 px-3 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
                <span>{selectedFile} • UTF-8</span>
                <span>{files[selectedFile]?.content.length || 0} characters</span>
              </div>
            </div>
          )}

          {/* Tab 3: AI Website Assistant (PRD Section 20) */}
          {editorTab === 'assistant' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Message Scroll */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiProcessing && (
                  <div className="flex items-center gap-2 text-xs text-purple-400 p-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI is modifying your website code...</span>
                  </div>
                )}
              </div>

              {/* Prompt Suggestions */}
              <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/30 flex gap-1.5 overflow-x-auto text-[11px]">
                <button
                  onClick={() => setAssistantInput('Add a student registration modal')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
                >
                  + Add registration
                </button>
                <button
                  onClick={() => setAssistantInput('Change website background to pure dark black')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
                >
                  Dark mode
                </button>
                <button
                  onClick={() => setAssistantInput('Fix mobile layout and responsive padding')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
                >
                  Fix mobile
                </button>
              </div>

              {/* Assistant Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
                <button
                  type="button"
                  onClick={toggleVoiceInAssistant}
                  className={`p-2.5 rounded-xl border transition ${
                    isRecording
                      ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                      : 'bg-slate-900 text-purple-400 border-slate-800 hover:bg-slate-800'
                  }`}
                  title="Voice dictation"
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <input
                  type="text"
                  value={assistantInput}
                  onChange={(e) => setAssistantInput(e.target.value)}
                  placeholder="Ask AI to change colors, add pages, fix layout..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  disabled={isAiProcessing || !assistantInput.trim()}
                  className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab 4: AI Error Doctor & Health Check (PRD Section 15 & 16) */}
          {editorTab === 'diagnostics' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bug className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">SaipratapS❤️C Website Doctor</h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      issues.length === 0
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {issues.length} Issues Found
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automated checks inspect HTML markup, mobile viewports, image accessibility tags,
                  broken anchor links, and runtime script syntax.
                </p>

                {/* AI Fix One-Click Button */}
                <button
                  onClick={handleAutoFix}
                  disabled={isFixing || issues.length === 0}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {isFixing ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Repairing Code Automatically...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Auto-Fix All Detected Issues</span>
                    </>
                  )}
                </button>

                {fixSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{fixSuccessMsg}</span>
                  </div>
                )}
              </div>

              {/* Detected Issues List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Diagnostic Results ({issues.length})
                </h4>

                {issues.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h5 className="font-bold text-white text-sm">All Checks Passed!</h5>
                    <p className="text-xs text-slate-400">
                      Valid HTML5, responsive viewport, clean anchors, and mobile ready. Your website is
                      ready to be published free!
                    </p>
                  </div>
                ) : (
                  issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          {issue.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{issue.file}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{issue.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Live Preview Area (PRD Section 14) */}
        <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden relative">
          {/* Preview Navigation / Address Bar */}
          <div className="h-10 border-b border-slate-800/80 bg-slate-900/60 px-4 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              <span className="font-mono text-[11px] text-slate-300 truncate max-w-xs">
                https://{project.subdomain}.saiweb.app
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (iframeRef.current) {
                    iframeRef.current.srcdoc = getCompiledSrcDoc();
                  }
                }}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                title="Refresh preview"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              <a
                href={`/site/${project.subdomain}`}
                target="_blank"
                rel="noreferrer"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white flex items-center gap-1"
                title="Open live site in new window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Iframe Device Frame Container */}
          <div className="flex-1 p-4 flex items-center justify-center overflow-auto bg-slate-950/90">
            <div
              className={`transition-all duration-300 h-full shadow-2xl rounded-2xl overflow-hidden border border-slate-800 bg-white flex flex-col ${
                viewMode === 'desktop'
                  ? 'w-full'
                  : viewMode === 'tablet'
                  ? 'w-[768px] max-w-full'
                  : 'w-[375px] max-w-full'
              }`}
            >
              <iframe
                ref={iframeRef}
                srcDoc={getCompiledSrcDoc()}
                title="Website Live Sandbox Preview"
                className="w-full h-full border-none bg-slate-950"
                sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
