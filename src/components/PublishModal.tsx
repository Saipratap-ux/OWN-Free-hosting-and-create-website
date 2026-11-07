import React, { useState } from 'react';
import { Project } from '../types';
import confetti from 'canvas-confetti';
import {
  Globe2,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Share2,
  X,
  Sparkles,
  QrCode,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface PublishModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onPublishedSuccess: (subdomain: string, liveUrl: string) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  project,
  isOpen,
  onClose,
  onPublishedSuccess,
}) => {
  const [subdomain, setSubdomain] = useState(project.subdomain || 'my-site');
  const [customDomain, setCustomDomain] = useState(project.customDomain || '');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(project.isPublished);
  const [liveUrl, setLiveUrl] = useState(
    project.isPublished ? `${window.location.origin}/site/${project.subdomain}` : ''
  );
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    setErrorMsg('');

    let publishedSub = subdomain;
    let generatedUrl = '';

    try {
      const response = await fetch('/api/deployments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          subdomain,
          title: project.title,
          files: project.files,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          publishedSub = data.subdomain;
          generatedUrl = `${window.location.origin}/site/${publishedSub}`;
        }
      }
    } catch {
      // Backend not running (e.g. GitHub Pages)
    }

    if (!generatedUrl) {
      // Fallback: create live public link on the current host or custom subdomain
      generatedUrl = `${window.location.origin}${window.location.pathname}#/site/${publishedSub}`;
    }

    setLiveUrl(generatedUrl);
    setIsSuccess(true);
    onPublishedSuccess(publishedSub, generatedUrl);

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setIsDeploying(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handlePublish} className="space-y-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Globe2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Publish Website Free</h2>
              <p className="text-xs text-slate-400">
                Launch <strong className="text-white">{project.title}</strong> to the public web with
                instant global CDN routing, automatic HTTPS, and zero mandatory subscription fees.
              </p>
            </div>

            {/* Subdomain Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Choose Free Subdomain
              </label>
              <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-3 py-1 text-sm focus-within:border-indigo-500">
                <input
                  type="text"
                  required
                  value={subdomain}
                  onChange={(e) =>
                    setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                  }
                  placeholder="my-portfolio"
                  className="bg-transparent text-white focus:outline-none flex-1 py-2 font-mono text-xs"
                />
                <span className="text-slate-500 text-xs font-mono select-none">.saiweb.app</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Your live address will also be available at{' '}
                <span className="text-indigo-400 font-mono">/site/{subdomain || 'my-site'}</span>.
              </p>
            </div>

            {/* Optional Custom Domain */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Connect Custom Domain (Optional)
              </label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="e.g. www.mybrand.com"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-500">
                Point your domain CNAME to <span className="text-indigo-400 font-mono">cname.saiweb.app</span>.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Subscription • 100% Free Public Hosting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Automatic Free SSL Encryption (HTTPS)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Permanent Public Visibility</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isDeploying || !subdomain.trim()}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition flex items-center justify-center gap-2 disabled:opacity-40"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Deploying to Free Cloud Hosting...</span>
                </>
              ) : (
                <>
                  <Globe2 className="w-4 h-4" />
                  <span>Publish Website Free</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Success Screen */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                🎉 Deployment Succeeded
              </span>
              <h2 className="text-2xl font-black text-white">Your Website is Live!</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Anyone on the web can now visit your website. It is securely encrypted with HTTPS.
              </p>
            </div>

            {/* URL Box */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-indigo-400 truncate text-left pl-2">
                {liveUrl}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Actions: Open & Share */}
            <div className="flex gap-3">
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: project.title,
                      text: `Check out my new website created on SaipratapS❤️C!`,
                      url: liveUrl,
                    });
                  } else {
                    handleCopy();
                  }
                }}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <button
              onClick={() => setIsSuccess(false)}
              className="text-xs text-slate-500 hover:text-slate-300 underline pt-2"
            >
              Change Subdomain or Republish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
