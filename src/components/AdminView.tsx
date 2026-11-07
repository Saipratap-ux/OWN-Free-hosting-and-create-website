import React, { useState } from 'react';
import { Project, ActiveTab } from '../types';
import {
  ShieldAlert,
  Users,
  Globe2,
  HardDrive,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Activity,
  FileText,
  Search,
  ExternalLink,
} from 'lucide-react';

interface AdminViewProps {
  projects: Project[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ projects, setActiveTab }) => {
  const [activeTab, setActiveSubTab] = useState<'overview' | 'audit' | 'abuse'>('overview');

  const auditLogs = [
    { time: 'Just now', action: 'Deployment verified', target: 'auratech-demo.saiweb.app', status: 'Passed' },
    { time: '4m ago', action: 'AI code doctor repair', target: 'eduvanguard.saiweb.app', status: 'Repaired' },
    { time: '12m ago', action: 'SSL certificate issued', target: 'cognitive.saiweb.app', status: 'Active' },
    { time: '35m ago', action: 'Fair-use rate evaluation', target: '194470782120 node IP', status: 'Clean' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-900">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Platform Governance & Admin
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              Superadmin Mode
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm">
            Telemetry, fair-use rate limiting, free deployment verification, and abuse protection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Zero Security Incidents
          </span>
        </div>
      </div>

      {/* Metrics Grid (PRD Section 27) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">12,480</div>
          <div className="text-[11px] text-emerald-400 mt-1">+14% this week</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>Active Deployments</span>
            <Globe2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">8,920</div>
          <div className="text-[11px] text-slate-500 mt-1">100% Free HTTPS</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>Gemini AI Inferences</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">48,210</div>
          <div className="text-[11px] text-purple-400 mt-1">Sub-second generation</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>Abuse Reports</span>
            <ShieldAlert className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white">0</div>
          <div className="text-[11px] text-emerald-400 mt-1">All sites clean</div>
        </div>
      </div>

      {/* Audit & Logs */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>Platform Security Audit Stream</span>
          </h3>
          <span className="text-xs text-slate-500">Live Real-Time Logs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">Event Action</th>
                <th className="pb-3 font-semibold">Target Subdomain / Resource</th>
                <th className="pb-3 font-semibold">Security State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-800/30">
                  <td className="py-3 text-slate-500 font-mono">{log.time}</td>
                  <td className="py-3 text-white font-medium">{log.action}</td>
                  <td className="py-3 text-indigo-400 font-mono">{log.target}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
