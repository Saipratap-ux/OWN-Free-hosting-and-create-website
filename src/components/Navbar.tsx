import React, { useState } from 'react';
import { ActiveTab, UserProfile } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Sparkles,
  Layout,
  Wand2,
  FolderGit2,
  Globe2,
  FileCode2,
  Download,
  Menu,
  X,
  User,
  ShieldCheck,
  Smartphone,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onVoiceStart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onVoiceStart,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Layout className="w-4 h-4" /> },
    { id: 'builder', label: 'AI Builder', icon: <Wand2 className="w-4 h-4 text-purple-400" /> },
    { id: 'editor', label: 'Live Editor', icon: <FileCode2 className="w-4 h-4 text-indigo-400" /> },
    { id: 'templates', label: 'Templates', icon: <Sparkles className="w-4 h-4 text-pink-400" /> },
    { id: 'dashboard', label: 'Projects', icon: <FolderGit2 className="w-4 h-4 text-blue-400" /> },
    { id: 'deployments', label: 'Deployments', icon: <Globe2 className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="absolute -bottom-1 -right-1 text-xs">❤️</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                SaipratapS<span className="text-rose-500">❤️</span>C
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                FREE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
              Build • Edit • Publish Free
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* PWA Install Button */}
          {!isInstalled && isInstallable && (
            <button
              onClick={install}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
              title="Install Web App on your device"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Install App</span>
            </button>
          )}

          {isIOS && !isInstalled && (
            <button
              onClick={() => setShowIOSGuide(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
              <span>Install PWA</span>
            </button>
          )}

          {/* Quick Create CTA */}
          <button
            onClick={() => setActiveTab('builder')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition active:scale-95"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create Website</span>
            <span className="sm:hidden">Create</span>
          </button>

          {/* User Account / Profile */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-xs text-slate-300"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="max-w-[90px] truncate hidden sm:inline">{user.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono hidden md:inline">
              PRO FREE
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          {!isInstalled && isInstallable && (
            <button
              onClick={() => {
                install();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-900 text-indigo-400 border border-slate-800"
            >
              <Download className="w-4 h-4" />
              Install SaipratapS❤️C as App
            </button>
          )}
        </div>
      )}

      {/* iOS PWA Install Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-200">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-400" />
              Install on iPhone or iPad
            </h3>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              1. Tap the <strong className="text-white">Share</strong> icon at the bottom of Safari.<br />
              2. Scroll down and tap <strong className="text-white">Add to Home Screen</strong>.<br />
              3. Launch <strong className="text-indigo-400">SaipratapS❤️C</strong> like a native mobile app anytime!
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 text-xs font-semibold text-white transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
