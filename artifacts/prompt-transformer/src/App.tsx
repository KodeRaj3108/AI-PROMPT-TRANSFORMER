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

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<'input' | 'output'>('input');

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
    // Switch to results tab on mobile immediately so the loading state is visible
    setMobileTab('output');

    try {
      const res = await callClaudeForTransformation(input, apiKey);
      setOutputs(res);
      saveToHistory(input, res);
      showToast('Prompt transformed into 5 model-tuned versions');
    } catch (err: any) {
      console.error(err);
      setMobileTab('input');
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
      <header className="border-b border-white/5 sticky top-0 z-20 backdrop-blur-md bg-[#0a0b10]/80">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-mono font-bold text-sm shadow-lg shadow-indigo-500/20 text-white flex-shrink-0">
              ⌁
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-semibold text-white tracking-tight">AI Prompt Transformer</h1>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono">rough idea → 5 model-tuned prompts</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            {apiKey ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft flex-shrink-0"></span>
                <span className="hidden sm:inline">Claude connected</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft flex-shrink-0"></span>
                <span className="hidden sm:inline">Not connected</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile tab switcher */}
      <div className="lg:hidden flex border-b border-white/5 bg-[#0a0b10]/60 sticky top-[57px] z-10 backdrop-blur-md">
        <button
          onClick={() => setMobileTab('input')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            mobileTab === 'input' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Input
          {mobileTab === 'input' && (
            <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-violet-400 rounded-full"></span>
          )}
        </button>
        <button
          onClick={() => setMobileTab('output')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative flex items-center justify-center gap-1.5 ${
            mobileTab === 'output' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Results
          {outputs && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono">5</span>
          )}
          {isLoading && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono animate-pulse-soft">…</span>
          )}
          {mobileTab === 'output' && (
            <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-violet-400 rounded-full"></span>
          )}
        </button>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 w-full">

        {/* Sidebar: visible on desktop always, on mobile only when input tab active */}
        <section className={`lg:col-span-4 flex-col gap-5 ${mobileTab === 'input' ? 'flex' : 'hidden'} lg:flex`}>
          <ApiKeyCard apiKey={apiKey} setApiKey={setApiKey} />

          <div className="glass rounded-2xl p-5 flex flex-col gap-4">
            <div>
              <label htmlFor="roughInput" className="text-sm font-semibold text-white mb-2 block">
                Your rough prompt
              </label>
              <textarea
                id="roughInput"
                rows={6}
                value={roughInput}
                onChange={(e) => setRoughInput(e.target.value)}
                placeholder="e.g. help me write something that explains our new pricing to customers who are annoyed about it"
                className="w-full resize-y rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400/50 transition-colors overflow-y-auto"
                style={{ minHeight: '120px', maxHeight: '320px' }}
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
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{isLoading ? 'Transforming…' : 'Transform Prompt'}</span>
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
            </button>
          </div>

          <div className="glass rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">History</h2>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-[11px] font-mono text-slate-400 hover:text-rose-300 transition-colors py-1 px-2"
                >
                  clear all
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px] lg:max-h-[320px] pr-1">
              {history.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No transformations yet. Your history will appear here.</p>
              ) : (
                history.map((entry) => {
                  const date = new Date(entry.timestamp);
                  const timeStr =
                    date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
                    ' · ' +
                    date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                  return (
                    <button
                      key={entry.id}
                      onClick={() => {
                        handleLoadHistory(entry.id);
                        setMobileTab('input');
                      }}
                      className="history-item text-left w-full rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-400/30 transition-colors group"
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

        {/* Output section: visible on desktop always, on mobile only when output tab active */}
        <section className={`lg:col-span-8 ${mobileTab === 'output' ? 'block' : 'hidden'} lg:block`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Comparison workspace</h2>
            <span className="text-[11px] font-mono text-slate-500">5 model-tuned outputs</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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

      <footer className={`max-w-[1600px] w-full mx-auto px-4 sm:px-6 pb-6 pt-2 ${mobileTab === 'output' ? 'block' : 'hidden'} lg:block`}>
        <p className="text-[11px] text-slate-600 font-mono">
          Runs entirely client-side. History and API Key are local to this browser only.
        </p>
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
