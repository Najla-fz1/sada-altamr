import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { useTheme } from '@/context/ThemeContext';
import { THEMES } from '@/lib/theme';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, style, ...props }, ref) => {
    const { theme } = useTheme();
    const T = THEMES[theme];

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold" style={{ color: T.text }}>
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div
              className="absolute inset-y-0 right-3 flex items-center pointer-events-none"
              style={{ color: T.textFaint, zIndex: 1 }}
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              'w-full h-12 rounded-[12px] text-sm',
              'outline-none transition-all duration-200',
              'placeholder:opacity-40',
              icon ? 'pr-10 pl-4' : 'px-4', 
            )}
            style={{
              background: error ? T.errorBg : T.input,
              border: `1.5px solid ${error ? T.error : T.border}`,
              color: T.text,
              boxShadow: 'none',
              ...style,
            }}
            onFocus={e => {
              e.currentTarget.style.background = T.inputFocus;
              e.currentTarget.style.border = `1.5px solid ${error ? T.error : T.borderStrong}`;
            }}
            onBlur={e => {
              e.currentTarget.style.background = error ? T.errorBg : T.input;
              e.currentTarget.style.border = `1.5px solid ${error ? T.error : T.border}`;
            }}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs" style={{ color: T.error }}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';