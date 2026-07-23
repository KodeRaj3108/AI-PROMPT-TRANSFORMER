import React, { useState } from 'react';
import { useToast } from './ToastProvider';

interface ApiKeyCardProps {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
}

export function ApiKeyCard({ apiKey, setApiKey }: ApiKeyCardProps) {
  const [inputValue, setInputValue] = useState('');
  const { showToast } = useToast();

  const handleConnect = () => {
    const val = inputValue.trim();
    if (!val) return;
    setApiKey(val);
    setInputValue('');
    showToast('Connected to Claude');
  };

  const handleDisconnect = () => {
    setApiKey(null);
    showToast('Disconnected from Claude');
  };

  if (apiKey) {
    const masked = '••••' + apiKey.slice(-4);
    return (
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icons/claude.png" alt="Claude" className="h-8 w-8 flex-shrink-0" />
            <div>
              <h2 className="text-sm font-semibold text-white">Connected to Claude</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft"></span>
                <span className="text-[11px] font-mono text-slate-400">{masked}</span>
              </div>
            </div>
          </div>
          <button onClick={handleDisconnect} className="text-[11px] font-mono text-slate-400 hover:text-rose-300 transition">
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <img src="/icons/claude.png" alt="Claude" className="h-8 w-8 flex-shrink-0" />
        <h2 className="text-sm font-semibold text-white">Connect to Claude</h2>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-4">
        Get a free API key from Anthropic to start transforming prompts.
      </p>
      
      <a 
        href="https://console.anthropic.com/settings/keys" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 text-xs font-semibold text-white transition mb-5"
      >
        Get API Key →
      </a>

      <div className="border-t border-white/5 pt-4">
        <label className="text-[11px] font-medium text-slate-400 mb-2 block">Already have a key?</label>
        <div className="flex gap-2">
          <input 
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
            placeholder="sk-ant-api03-..."
            className="flex-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-orange-400/50 transition outline-none"
          />
          <button 
            onClick={handleConnect}
            className="rounded-lg bg-orange-500/20 text-orange-300 px-3 py-2 text-xs font-medium border border-orange-400/30 hover:bg-orange-500/30 transition outline-none"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
