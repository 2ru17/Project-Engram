"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';
type PerfMode = 'full' | 'lite';

interface ThemeContextType {
  theme: Theme;
  isLite: boolean;
  toggleTheme: () => void;
  togglePerfMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [perf, setPerf] = useState<PerfMode>('full');

  useEffect(() => {
    // Sync React state from the data attrs that the inline script already set
    const root = document.documentElement;
    const t = root.getAttribute('data-theme') as Theme;
    const p = root.getAttribute('data-perf') as PerfMode;
    if (t) setTheme(t);
    if (p) setPerf(p);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('engram-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const togglePerfMode = useCallback(() => {
    setPerf(prev => {
      const next = prev === 'full' ? 'lite' : 'full';
      localStorage.setItem('engram-perf', next);
      document.documentElement.setAttribute('data-perf', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isLite: perf === 'lite', toggleTheme, togglePerfMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
