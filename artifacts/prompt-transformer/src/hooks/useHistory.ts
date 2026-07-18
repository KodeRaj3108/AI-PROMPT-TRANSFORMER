import { useState, useEffect } from 'react';

const HISTORY_KEY = 'apt_history_v1';
const MAX_HISTORY = 25;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  rough: string;
  outputs: any;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) {
        setHistory(JSON.parse(raw));
      }
    } catch (e) {}
  }, []);

  const saveToHistory = (roughInput: string, outputs: any) => {
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      rough: roughInput,
      outputs,
    };
    
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_HISTORY);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {}
    setHistory([]);
  };

  return { history, saveToHistory, clearHistory };
}
