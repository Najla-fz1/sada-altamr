import { Moon, Sun } from 'lucide-react';
import { useTheme }  from '@/context/ThemeContext';
import { cn }        from '@/lib/cn';

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
      className={cn(
        'size-10 rounded-full flex items-center justify-center',
        'transition-all duration-300',
        'hover:scale-110 hover:rotate-12 active:scale-95',
        isDark
          ? 'bg-white/[0.04] border border-[rgba(201,165,70,0.18)] text-[#C9A546]'
          : 'bg-[rgba(255,251,240,0.55)] text-[#B53E2A]',
      )}
      style={{
        backdropFilter: 'blur(10px)',
        boxShadow: isDark
          ? '0 2px 12px rgba(0,0,0,0.45)'
          : '0 2px 10px rgba(181,62,42,0.15)',
      }}
    >
      {isDark
        ? <Sun  size={17} strokeWidth={1.8} />
        : <Moon size={17} strokeWidth={1.8} />}
    </button>
  );
}