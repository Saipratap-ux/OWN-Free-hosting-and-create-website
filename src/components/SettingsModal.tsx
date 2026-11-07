import React, { useState } from 'react';
import { Project, UserProfile } from '../types';
import { X, Settings, Download, Upload, Trash2, CheckCircle2, Shield, Moon, Sun } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  user: UserProfile;
  onRestoreProjects: (restored: Project[]) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  projects,
  user,
  onRestoreProjects,
}) => {
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Export full JSON backup of all projects
  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `saipratap_sc_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSuccessMsg('Full JSON backup downloaded successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Restore from JSON backup file
  const handleRestoreBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onRestoreProjects(parsed);
          setSuccessMsg(`Restored ${parsed.length} projects successfully!`);
          setTimeout(() => setSuccessMsg(''), 3000);
        } else {
          alert('Invalid backup format. Expected an array of projects.');
        }
      } catch {
        alert('Could not parse JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearCache = () => {
    if (confirm('Clear local projects cache? Make sure you have downloaded a backup first!')) {
      localStorage.removeItem('saipratap_sc_projects');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Workspace Settings</h2>
          </div>
          <p className="text-xs text-slate-400">
            Configure local backup storage, export project manifests, and manage platform preferences.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          {/* User Account Info */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-semibold text-slate-300">Creator Profile</span>
            <div className="flex items-center justify-between text-slate-400">
              <span>{user.name} ({user.email})</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                {user.plan}
              </span>
            </div>
          </div>

          {/* Backup & Restore */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="font-semibold text-slate-300">Data Preservation & Recovery</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Export all {projects.length} website projects into a portable JSON backup file, or restore projects on another device.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportBackup}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Backup</span>
              </button>

              <label className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
                <Upload className="w-3.5 h-3.5 text-indigo-400" />
                <span>Restore Backup</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestoreBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Local Cache Management */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-semibold text-slate-300">Browser Cache & Reset</span>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Cached projects count: <strong className="text-white">{projects.length}</strong>
              </span>
              <button
                onClick={handleClearCache}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs transition flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
