import {
  createContext, useContext, useEffect,
  useState, type ReactNode,
} from 'react';
import type { ThemeMode } from '@/types';

interface ThemeContextValue {
  theme:  ThemeMode;
  toggle: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:  'dark',
  toggle: () => {},
  isDark: true,
});

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* no localStorage */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);