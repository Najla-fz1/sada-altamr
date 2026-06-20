import { useEffect, type ReactNode } from 'react';
import { X }         from 'lucide-react';
import { cn }        from '@/lib/cn';
import { useTheme }  from '@/context/ThemeContext';
import { THEMES }    from '@/lib/theme';

interface ModalProps {
  open:      boolean;
  onClose:   () => void;
  title?:    string;
  children:  ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, children, maxWidth = '480px' }: ModalProps) {
  const { theme } = useTheme();
  const T = THEMES[theme];

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true"
    >
      <div
        className={cn(
          'w-full rounded-[20px] p-6',
          'animate-[dialog-in_220ms_cubic-bezier(0.16,1,0.3,1)]',
        )}
        style={{
          maxWidth, background: T.cardElevated,
          border: `1px solid ${T.borderStrong}`,
          boxShadow: T.shadowLg,
        }}
      >
        {title && (
          <div className="flex items-center justify-between mb-5">
            {title && (
              <h2 className="text-base font-bold" style={{ color: T.text }}>{title}</h2>
            )}
            <button
              onClick={onClose}
              className="size-8 rounded-full flex items-center justify-center ml-auto transition-all hover:scale-110"
              style={{ background: T.input, color: T.textMuted }}
              aria-label="إغلاق"
            >
              <X size={15} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}