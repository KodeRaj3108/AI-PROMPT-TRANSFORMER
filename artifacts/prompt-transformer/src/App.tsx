import React, { useState } from 'react';
import { ToastProvider, useToast } from './components/ToastProvider';
import { ApiKeyCard } from './components/ApiKeyCard';
import { OutputCard, MODEL_PROFILES } from './components/OutputCard';
import { CursorModal } from './components/CursorModal';
import { useApiKey } from './hooks/useApiKey';
import { useHistory } from './hooks/useHistory';
import { callClaudeForTransformation } from './lib/claude';

function AppContent() {
  const { apiKey, setApiKey, isLoaded: keyLoaded } = useApiKey();
  const { history, saveToHistory, clearHistory } = useHistory();
  const { showToast } = useToast();

  const [roughInput, setRoughInput] = useState('');
  const [outputs, setOutputs] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isCursorModalOpen, setIsCursorModalOpen] = useState(false);
  const [cursorClipboardText, setCursorClipboardText] = useState('');

  const handleTransform = async () => {
    if (isLoading) return;
    setErrorMsg(null);

    const input = roughInput.trim();
    if (!input) {
      setErrorMsg('Enter a rough prompt before transforming.');
      return;
    }

    if (!apiKey) {
      setErrorMsg('An Anthropic API key is required to transform prompts.');
      return;
    }

    setIsLoading(true);
    setOutputs(null);

    try {
      const res = await callClaudeForTransformation(input, apiKey);
      setOutputs(res);
      saveToHistory(input, res);
      showToast('Prompt transformed into 5 model-tuned versions');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong while transforming the prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadHistory = (id: string) => {
    const entry = history.find(h => h.id === id);
    if (!entry) return;
    setRoughInput(entry.rough);
    setOutputs(entry.outputs);
    setErrorMsg(null);
    showToast('Loaded from history');
  };

  const handleClearHistory = () => {
    clearHistory();
    showToast('History cleared');
  };

  const handleOpenCursorModal = (text: string) => {
    setCursorClipboardText(text);
    setIsCursorModalOpen(true);
  };

  if (!keyLoaded) return null;

  return (
    <div className="min-h-screen text-slate-200 font-sans antialiased bg-base flex flex-col">
      <header className="border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-mono font-bold text-sm shadow-lg shadow-indigo-500/20 text-white">
              ⌁
            </div>
            <div>
              <h1 className="text-base font-semibold text-white tracking-tight">AI Prompt Transformer</h1>
              <p className="text-xs text-slate-400 font-mono">rough idea → 5 model-tuned prompts</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            {apiKey ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft"></span>
                Claude connected
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft"></span>
                Not connected
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        <section className="lg:col-span-4 flex flex-col gap-5">
          <ApiKeyCard apiKey={apiKey} setApiKey={setApiKey} />

          <div className="glass rounded-2xl p-5 flex flex-col gap-4">
            <div>
              <label htmlFor="roughInput" className="text-sm font-semibold text-white mb-2 block">
                Your rough prompt
              </label>
              <textarea
                id="roughInput"
                rows={8}
                value={roughInput}
                onChange={(e) => setRoughInput(e.target.value)}
                placeholder="e.g. help me write something that explains our new pricing to customers who are annoyed about it"
                className="w-full resize-none rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400/50 transition"
              ></textarea>
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
                {errorMsg}
              </div>
            )}

            <button
              onClick={handleTransform}
              disabled={isLoading || !apiKey}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{isLoading ? 'Transforming…' : 'Transform Prompt'}</span>
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
            </button>
          </div>

          <div className="glass rounded-2xl p-5 flex flex-col gap-3 flex-1 min-h-[240px]">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">History</h2>
              {history.length > 0 && (
                <button 
                  onClick={handleClearHistory} 
                  className="text-[11px] font-mono text-slate-400 hover:text-rose-300 transition"
                >
                  clear all
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[420px] pr-1">
              {history.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No transformations yet. Your history will appear here.</p>
              ) : (
                history.map((entry) => {
                  const date = new Date(entry.timestamp);
                  const timeStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' · ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
                  
                  return (
                    <button
                      key={entry.id}
                      onClick={() => handleLoadHistory(entry.id)}
                      className="history-item text-left w-full rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-400/30 transition group"
                    >
                      <div className="flex items-start gap-2">
                        <span className="history-dot h-1.5 w-1.5 rounded-full bg-violet-400 mt-1.5 transition-transform flex-shrink-0"></span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-slate-200 truncate">{entry.rough}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{timeStr}</p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Comparison workspace</h2>
            <span className="text-[11px] font-mono text-slate-500">5 model-tuned outputs</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {MODEL_PROFILES.map((profile) => (
              <OutputCard 
                key={profile.key} 
                profile={profile} 
                content={outputs ? outputs[profile.key] : null} 
                loading={isLoading}
                onOpenCursorModal={handleOpenCursorModal}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-[1600px] w-full mx-auto px-6 pb-8 pt-2">
        <p className="text-[11px] text-slate-600 font-mono">Runs entirely client-side. History and API Key are local to this browser only.</p>
      </footer>

      <CursorModal 
        isOpen={isCursorModalOpen} 
        onClose={() => setIsCursorModalOpen(false)} 
        clipboardText={cursorClipboardText} 
      />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
