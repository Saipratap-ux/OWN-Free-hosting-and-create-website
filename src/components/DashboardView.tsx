import React, { useState } from 'react';
import { Project, ActiveTab, UserProfile } from '../types';
import { downloadProjectZip } from '../utils/exportZip';
import {
  FolderGit2,
  Plus,
  Search,
  Globe2,
  FileCode2,
  Download,
  Trash2,
  ExternalLink,
  Edit3,
  Sparkles,
  Upload,
  Github,
  CheckCircle2,
  Layers,
  Settings,
  HelpCircle,
  LayoutDashboard,
  HardDrive,
  BarChart3,
  Calendar,
} from 'lucide-react';

interface DashboardViewProps {
  projects: Project[];
  user: UserProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onOpenPublishForProject: (project: Project) => void;
  onImportProject: (files: any, title: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  user,
  setActiveTab,
  onSelectProject,
  onDeleteProject,
  onOpenPublishForProject,
  onImportProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'published' | 'draft'>('all');
  const [isGitHubConnected, setIsGitHubConnected] = useState(false);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subdomain.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === 'published') return matchesSearch && p.isPublished;
    if (filterType === 'draft') return matchesSearch && !p.isPublished;
    return matchesSearch;
  });

  const publishedCount = projects.filter((p) => p.isPublished).length;
  const draftCount = projects.filter((p) => !p.isPublished).length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onImportProject(
        {
          'index.html': { name: 'index.html', content, language: 'html' },
          'styles.css': { name: 'styles.css', content: '/* Custom CSS */', language: 'css' },
          'app.js': { name: 'app.js', content: '// Custom JS', language: 'javascript' },
        },
        file.name.replace(/\.[^/.]+$/, '') || 'Imported Website'
      );
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user.name}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              Free Plan
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage your AI-crafted websites, active deployments, custom subdomains, and downloads.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Import Website */}
          <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer transition">
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span>Import HTML/ZIP</span>
            <input
              type="file"
              accept=".html,.txt,.htm"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* GitHub Sync */}
          <button
            onClick={() => setIsGitHubConnected(!isGitHubConnected)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
              isGitHubConnected
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>{isGitHubConnected ? 'GitHub Connected' : 'Connect GitHub'}</span>
          </button>

          {/* Create New Website */}
          <button
            onClick={() => setActiveTab('builder')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Website</span>
          </button>
        </div>
      </div>

      {/* Metrics Row (PRD Section 8) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Projects</span>
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{projects.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Unlimited free drafts</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Live Published</span>
            <Globe2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{publishedCount}</div>
          <div className="text-[11px] text-emerald-400 mt-1">Free HTTPS subdomains</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>AI Generations</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{projects.length * 4 + 7}</div>
          <div className="text-[11px] text-slate-500 mt-1">Powered by Gemini 3.8</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Hosting Bandwidth</span>
            <HardDrive className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">Free Forever</div>
          <div className="text-[11px] text-slate-500 mt-1">No billing required</div>
        </div>
      </div>

      {/* Projects Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, category, or url..."
            className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-stretch sm:self-auto text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilterType('published')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === 'published'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilterType('draft')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === 'draft'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No projects found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? 'Try modifying your search query or reset the filter.'
              : 'Start your creative journey by describing a website with our AI builder.'}
          </p>
          <button
            onClick={() => setActiveTab('builder')}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
          >
            Create Your First Website
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex flex-col overflow-hidden group"
            >
              {/* Project Card Header */}
              <div className="p-5 pb-3 border-b border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold text-white truncate max-w-[200px] mt-0.5">
                    {project.title}
                  </h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    project.isPublished
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {project.isPublished ? 'Published Live' : 'Draft'}
                </span>
              </div>

              {/* Description & Subdomain info */}
              <div className="p-5 flex-1 space-y-3 text-xs">
                <p className="text-slate-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="truncate text-indigo-400">/{project.subdomain}</span>
                  {project.isPublished && (
                    <a
                      href={`/site/${project.subdomain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white"
                      title="Open Live Website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>v{project.version} • {Object.keys(project.files).length} files</span>
                  <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Card Action Controls (PRD Section 8) */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onSelectProject(project);
                    setActiveTab('editor');
                  }}
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition text-center flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit in Studio</span>
                </button>

                <button
                  onClick={() => onOpenPublishForProject(project)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                  title="Publish Free or Update URL"
                >
                  <Globe2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => downloadProjectZip(project)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Download Project ZIP"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                      onDeleteProject(project.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 transition"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
