/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project, ActiveTab, UserProfile, Template } from './types';
import { TEMPLATES } from './data/templates';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { BuilderView } from './components/BuilderView';
import { EditorView } from './components/EditorView';
import { DashboardView } from './components/DashboardView';
import { TemplatesView } from './components/TemplatesView';
import { DeploymentsView } from './components/DeploymentsView';
import { AdminView } from './components/AdminView';
import { DocsView } from './components/DocsView';
import { PublishModal } from './components/PublishModal';
import { AuthModal } from './components/AuthModal';
import {
  Layout,
  Wand2,
  FolderGit2,
  Sparkles,
  User,
  Globe2,
  FileText,
  Shield,
  WifiOff,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Pre-fill prompt for builder
  const [builderPrompt, setBuilderPrompt] = useState<string>('');
  const [builderCategory, setBuilderCategory] = useState<string>('Business');

  // Modals
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // User profile
  const [user, setUser] = useState<UserProfile>({
    email: 'saipratapdansana@gmail.com',
    name: 'Sai Pratap',
    isGuest: false,
    avatarUrl: '',
    plan: 'Free Forever',
  });

  // Offline status
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Register Service Worker for PWA (PRD Section 29)
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch initial projects from localStorage and backend
  useEffect(() => {
    const starterProject: Project = {
      id: 'proj_starter_auratech',
      title: 'AuraTech AI Studio',
      category: 'AI Startup',
      description: 'Autonomous neural engine and cognitive cloud infrastructure.',
      subdomain: 'auratech-live',
      isPublished: true,
      publishedAt: new Date().toISOString(),
      files: TEMPLATES[0].files,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    // 1. Check LocalStorage first
    let loadedFromLocal = false;
    try {
      const cached = localStorage.getItem('saipratap_sc_projects');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          setCurrentProject(parsed[0]);
          loadedFromLocal = true;
        }
      }
    } catch {
      // ignore JSON parse error
    }

    if (!loadedFromLocal) {
      setProjects([starterProject]);
      setCurrentProject(starterProject);
    }

    // 2. Fetch from backend if available (full-stack mode)
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Backend not available');
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          throw new Error('Not JSON');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.projects && data.projects.length > 0) {
          setProjects(data.projects);
          setCurrentProject(data.projects[0]);
          localStorage.setItem('saipratap_sc_projects', JSON.stringify(data.projects));
        }
      })
      .catch(() => {
        // In static hosting (GitHub Pages), localStorage is the primary store
      });
  }, []);

  // Save projects to localStorage whenever updated
  useEffect(() => {
    if (projects.length > 0) {
      try {
        localStorage.setItem('saipratap_sc_projects', JSON.stringify(projects));
      } catch {}
    }
  }, [projects]);

  // Handler: Start with a prompt from HomePage
  const handleStartWithPrompt = (prompt: string, category: string = 'Business') => {
    setBuilderPrompt(prompt);
    setBuilderCategory(category);
    setActiveTab('builder');
  };

  // Handler: Select a template
  const handleSelectTemplate = (template: Template) => {
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      title: template.title,
      category: template.category,
      description: template.description,
      subdomain: template.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-+|-+$/g, '') || `site-${Date.now().toString(36)}`,
      isPublished: false,
      files: template.files,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    setProjects((prev) => [newProject, ...prev]);
    setCurrentProject(newProject);
    setActiveTab('editor');

    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    }).catch(() => {});
  };

  // Handler: Website generated by AI
  const handleWebsiteGenerated = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    setCurrentProject(newProject);
    setActiveTab('editor');
  };

  // Handler: Update current project
  const handleUpdateProject = (updated: Project) => {
    setCurrentProject(updated);
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Handler: Delete project
  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (currentProject?.id === projectId) {
      const remaining = projects.filter((p) => p.id !== projectId);
      setCurrentProject(remaining.length > 0 ? remaining[0] : null);
    }
    fetch(`/api/projects/${projectId}`, { method: 'DELETE' }).catch(() => {});
  };

  // Handler: Import project
  const handleImportProject = (files: any, title: string) => {
    const imported: Project = {
      id: `proj_import_${Date.now()}`,
      title: title || 'Imported Website',
      category: 'Custom',
      description: 'Imported website project.',
      subdomain: title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-+|-+$/g, '') || `site-${Date.now().toString(36)}`,
      isPublished: false,
      files,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    setProjects((prev) => [imported, ...prev]);
    setCurrentProject(imported);
    setActiveTab('editor');

    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imported),
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Offline Toast Banner (PWA Skill Requirement) */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-50">
          <WifiOff className="w-4 h-4" />
          <span>Offline Mode — Running with cached application shell.</span>
        </div>
      )}

      {/* Main Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* View Switcher */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onStartWithPrompt={handleStartWithPrompt}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {activeTab === 'builder' && (
          <BuilderView
            initialPrompt={builderPrompt}
            initialCategory={builderCategory}
            onWebsiteGenerated={handleWebsiteGenerated}
          />
        )}

        {activeTab === 'editor' && currentProject && (
          <EditorView
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onOpenPublish={() => setIsPublishModalOpen(true)}
          />
        )}

        {activeTab === 'editor' && !currentProject && (
          <div className="p-20 text-center space-y-4">
            <h2 className="text-xl font-bold">No active website selected</h2>
            <button
              onClick={() => setActiveTab('builder')}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Generate a Website Now
            </button>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            projects={projects}
            user={user}
            setActiveTab={setActiveTab}
            onSelectProject={(p) => {
              setCurrentProject(p);
              setActiveTab('editor');
            }}
            onDeleteProject={handleDeleteProject}
            onOpenPublishForProject={(p) => {
              setCurrentProject(p);
              setIsPublishModalOpen(true);
            }}
            onImportProject={handleImportProject}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesView
            onSelectTemplate={handleSelectTemplate}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'deployments' && (
          <DeploymentsView
            projects={projects}
            setActiveTab={setActiveTab}
            onOpenPublish={(p) => {
              setCurrentProject(p);
              setIsPublishModalOpen(true);
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminView projects={projects} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'docs' && <DocsView setActiveTab={setActiveTab} />}
      </main>

      {/* Footer (Rendered on non-editor screens) */}
      {activeTab !== 'editor' && <Footer setActiveTab={setActiveTab} />}

      {/* Mobile Bottom Navigation Bar (PRD Section 29) */}
      <div className="md:hidden sticky bottom-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around text-[10px]">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 p-1.5 transition ${
            activeTab === 'home' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1.5 transition ${
            activeTab === 'dashboard' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className="flex flex-col items-center gap-0.5 p-1.5 text-pink-400 font-bold"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 flex items-center justify-center text-white shadow-md">
            <Wand2 className="w-3.5 h-3.5" />
          </div>
          <span>Create</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`flex flex-col items-center gap-0.5 p-1.5 transition ${
            activeTab === 'templates' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Templates</span>
        </button>

        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex flex-col items-center gap-0.5 p-1.5 text-slate-400"
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>

      {/* Publish Modal */}
      {currentProject && (
        <PublishModal
          project={currentProject}
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
          onPublishedSuccess={(subdomain, liveUrl) => {
            handleUpdateProject({
              ...currentProject,
              subdomain,
              isPublished: true,
              publishedAt: new Date().toISOString(),
            });
          }}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={user}
        onUpdateUser={setUser}
      />
    </div>
  );
}
