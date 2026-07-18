import React from 'react';
import { useToast } from './ToastProvider';

interface CursorModalProps {
  isOpen: boolean;
  onClose: () => void;
  clipboardText: string;
}

export function CursorModal({ isOpen, onClose, clipboardText }: CursorModalProps) {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleCopyAgain = async () => {
    try {
      await navigator.clipboard.writeText(clipboardText);
      showToast('Cursor prompt copied again');
    } catch (e) {
      showToast('Copy failed — select manually', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-strong rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-mono text-sm">
            ⌘I
          </div>
          <h3 className="text-lg font-semibold text-white">Send this to Cursor</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Cursor doesn't accept pre-filled prompts via URL, so the text has been copied to your clipboard. To use it:
        </p>
        <ol className="text-sm text-slate-300 space-y-2 mb-5 list-decimal list-inside">
          <li>Open Cursor, then press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 font-mono text-xs">Ctrl+I</kbd> (Windows/Linux) or <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 font-mono text-xs">Cmd+I</kbd> (Mac) to open inline/composer chat.</li>
          <li>Paste with <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 font-mono text-xs">Ctrl/Cmd+V</kbd>.</li>
          <li>Or drop it straight into a <span className="font-mono text-cyan-300">.cursorrules</span> file at your project root to make it a persistent system prompt for the whole workspace.</li>
        </ol>
        <div className="flex justify-end gap-2">
          <button 
            onClick={handleCopyAgain} 
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-sm font-medium hover:bg-cyan-500/30 transition outline-none"
          >
            Copy again
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-sm font-medium hover:bg-white/15 transition text-white outline-none"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
