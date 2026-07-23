import React from 'react';
import { useToast } from './ToastProvider';

export interface ModelProfile {
  key: string;
  label: string;
  accent: 'emerald' | 'orange' | 'blue' | 'red' | 'cyan';
  testUrl: string | null;
  rule: string;
}

export const MODEL_PROFILES: ModelProfile[] = [
  {
    key: 'chatgpt',
    label: 'ChatGPT',
    accent: 'emerald',
    testUrl: 'https://chatgpt.com',
    rule: 'Clear step-by-step formatting, explicit system-role definition, and markdown structure (headers, numbered lists).'
  },
  {
    key: 'claude',
    label: 'Claude',
    accent: 'orange',
    testUrl: 'https://claude.ai',
    rule: 'XML tags for variable isolation (<context>, <instructions>, <input>), structural clarity, and room for deep step-by-step reasoning.'
  },
  {
    key: 'gemini',
    label: 'Gemini',
    accent: 'blue',
    testUrl: 'https://gemini.google.com',
    rule: 'Logical headings, explicit formatting instructions, and token-efficient, tightly scoped constraints.'
  },
  {
    key: 'grok',
    label: 'Grok',
    accent: 'red',
    testUrl: 'https://grok.com',
    rule: 'Direct, no-nonsense logic, high-impact brevity, and real-time context scaffolding (assume access to current info).'
  },
  {
    key: 'cursor',
    label: 'Cursor',
    accent: 'cyan',
    testUrl: null,
    rule: 'Precise code-context generation: file/folder structure hints, language + framework constraints, and .cursorrules-style directives.'
  }
];

const ACCENT_CLASSES = {
  emerald: { dot: 'bg-emerald-400', text: 'text-emerald-300', border: 'border-emerald-400/25', bg: 'bg-emerald-500/10', ring: 'focus-visible:ring-emerald-500/50' },
  orange:  { dot: 'bg-orange-400',  text: 'text-orange-300',  border: 'border-orange-400/25',  bg: 'bg-orange-500/10',  ring: 'focus-visible:ring-orange-500/50' },
  blue:    { dot: 'bg-blue-400',    text: 'text-blue-300',    border: 'border-blue-400/25',    bg: 'bg-blue-500/10',    ring: 'focus-visible:ring-blue-500/50' },
  red:     { dot: 'bg-red-400',     text: 'text-red-300',     border: 'border-red-400/25',     bg: 'bg-red-500/10',     ring: 'focus-visible:ring-red-500/50' },
  cyan:    { dot: 'bg-cyan-400',    text: 'text-cyan-300',    border: 'border-cyan-400/25',    bg: 'bg-cyan-500/10',    ring: 'focus-visible:ring-cyan-500/50' }
};

interface OutputCardProps {
  profile: ModelProfile;
  content: string | null;
  loading: boolean;
  onOpenCursorModal: (text: string) => void;
}

export function OutputCard({ profile, content, loading, onOpenCursorModal }: OutputCardProps) {
  const acc = ACCENT_CLASSES[profile.accent];
  const { showToast } = useToast();

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      showToast(`${profile.label} prompt copied`);
    } catch (e) {
      showToast('Copy failed — select and copy manually', 'error');
    }
  };

  const handleTest = async () => {
    if (!content) return;

    if (profile.key === 'cursor') {
      try {
        await navigator.clipboard.writeText(content);
        onOpenCursorModal(content);
      } catch (e) {
        showToast('Copy failed', 'error');
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      if (profile.testUrl) {
        window.open(profile.testUrl, '_blank', 'noopener,noreferrer');
      }
      showToast(`Copied — paste into ${profile.label} once the tab opens`);
    } catch (e) {
      if (profile.testUrl) {
        window.open(profile.testUrl, '_blank', 'noopener,noreferrer');
      }
      showToast(`Opened ${profile.label} — copy failed, select text manually`, 'error');
    }
  };

  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden">
      {loading && <div className="absolute top-0 left-0 h-0.5 card-scan-overlay animate-scan"></div>}

      {/* Card header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full flex-shrink-0 ${acc.dot}`}></span>
          <h3 className="text-sm font-semibold text-white">{profile.label}</h3>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${acc.bg} ${acc.text} border ${acc.border}`}>
          {profile.key}
        </span>
      </div>

      {/* Rule description */}
      <p className="text-[11px] text-slate-500 leading-snug">{profile.rule}</p>

      {/* Prompt output — fixed 6-line window, scrollable */}
      <div
        className="output-scroll rounded-xl bg-black/30 border border-white/10 p-3 overflow-y-auto"
        style={{ height: '140px' }}
      >
        {loading ? (
          <div className="flex flex-col gap-2 pt-0.5">
            <div className="h-2.5 rounded skel w-11/12"></div>
            <div className="h-2.5 rounded skel w-4/5"></div>
            <div className="h-2.5 rounded skel w-full"></div>
            <div className="h-2.5 rounded skel w-2/3"></div>
            <div className="h-2.5 rounded skel w-3/4"></div>
            <div className="h-2.5 rounded skel w-5/6"></div>
          </div>
        ) : content ? (
          <pre className="text-xs text-slate-300 whitespace-pre-wrap break-words font-mono leading-relaxed m-0">{content}</pre>
        ) : (
          <p className="text-xs text-slate-600 italic">
            Transform a prompt to see the {profile.label}-optimized version here.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          disabled={!content}
          onClick={handleCopy}
          className="flex-1 text-xs font-medium rounded-lg px-3 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 min-h-[40px]"
        >
          Copy
        </button>
        <button
          disabled={!content}
          onClick={handleTest}
          className={`flex-1 text-xs font-medium rounded-lg px-3 py-2.5 ${acc.bg} ${acc.text} border ${acc.border} hover:brightness-125 transition-all disabled:opacity-30 disabled:cursor-not-allowed outline-none focus-visible:ring-2 ${acc.ring} min-h-[40px]`}
        >
          One-Click Test
        </button>
      </div>
    </div>
  );
}
