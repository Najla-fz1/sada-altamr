import { type ReactNode } from 'react';
import { useTheme }       from '@/context/ThemeContext';
import { THEMES }         from '@/lib/theme';

interface PageShellProps {
  children:   ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  const { theme } = useTheme();
  const T = THEMES[theme];

  return (
    <div
      dir="rtl"
      className={`w-full flex-1 min-h-screen flex flex-col relative overflow-hidden ${className ?? ''}`}
      style={{
        background: T.bg,
        color:      T.text,
        fontFamily: 'var(--font-ar)',
        transition: 'background 280ms, color 280ms',
      }}
    >
      {/* شبكة الخلفية */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: T.gridOpacity,
          backgroundImage: `
            linear-gradient(${T.gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${T.gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {children}
    </div>
  );
}