import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'default' | 'error';

interface Toast {
  id: string;
  message: string;
  tone: ToastType;
}

interface ToastContextType {
  showToast: (message: string, tone?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, tone: ToastType = 'default') => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(prev => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2400); // 2.4s as per requirements
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 items-end">
        {toasts.map(toast => {
          const toneClasses = toast.tone === 'error'
            ? 'border-rose-400/30 bg-rose-500/15 text-rose-100'
            : 'border-white/10 bg-white/10 text-slate-100';
            
          return (
            <div 
              key={toast.id} 
              className={`animate-toast-in glass px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg ${toneClasses}`}
            >
              {toast.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
