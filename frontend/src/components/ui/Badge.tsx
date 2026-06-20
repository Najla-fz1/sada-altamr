import { cn } from '@/lib/cn';
import { useTheme } from '@/context/ThemeContext';
import { THEMES } from '@/lib/theme';

type BadgeVariant = 'success' | 'error' | 'warning' | 'dalal' | 'admin' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ variant = 'neutral', dot, pulse, children, className, style }: BadgeProps) {
  const { theme } = useTheme();
  const T = THEMES[theme];

  // ألوان ديناميكية حسب الثيم
  const BADGE_STYLES: Record<BadgeVariant, React.CSSProperties> = {
success: {
  background:  T.badge,
  border:      `1.5px solid ${T.badgeBorder}`,
  color:       T.badgeText,
  fontWeight:  600,
},
    error: {
      background: T.errorBg,
      border:     `1px solid ${T.error}40`,
      color:      T.error,
    },
    warning: {
      background: 'rgba(201,165,70,0.10)',
      border:     '1px solid rgba(201,165,70,0.28)',
      color:      '#C9A546',
    },
    dalal: {
      background: 'rgba(181,62,42,0.12)',
      border:     '1px solid rgba(181,62,42,0.25)',
      color:      '#B53E2A',
    },
    admin: {
      background: 'rgba(201,165,70,0.12)',
      border:     '1px solid rgba(201,165,70,0.25)',
      color:      '#C9A546',
    },
    neutral: {
      background: 'rgba(128,128,128,0.08)',
      border:     `1px solid ${T.border}`,
      color:      T.textMuted,
    },
  };

  return (
    <span
className={cn(
  className,
  'inline-flex items-center gap-1.5',
  'rounded-full text-[11px] font-medium',
)}
style={{
  padding: '6px 16px',          
  ...BADGE_STYLES[variant],
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  ...style,                     
}}
    >
      {dot && (
        <span className={cn(
          'size-1.5 rounded-full bg-current',
          pulse && 'animate-pulse',
        )} />
      )}
      {children}
    </span>
  );
}