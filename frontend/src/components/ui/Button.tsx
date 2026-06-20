import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'dalal' | 'admin' | 'ghost' | 'outline' | 'danger';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant;
  size?:      Size;
  loading?:   boolean;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  dalal:   'bg-[#B53E2A] text-white hover:bg-[#8F2D1C] active:bg-[#7A2518]',
  admin:   'bg-[#C9A546] text-white hover:bg-[#A6832E] active:bg-[#8A6B20]',
  ghost:   'bg-transparent text-current hover:bg-white/10',
  outline: 'bg-transparent border border-current text-current hover:bg-white/5',
  danger:  'bg-red-600/10 text-red-500 border border-red-600/20 hover:bg-red-600 hover:text-white',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9  px-4 text-sm  rounded-xl',
  md: 'h-12 px-6 text-sm  rounded-[14px]',
  lg: 'h-14 px-8 text-base rounded-[16px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'dalal', size = 'md', loading, fullWidth,
  disabled, className, children, ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center gap-2',
      'font-bold font-[var(--font-ar)]',
      'transition-all duration-200 cursor-pointer',
      'active:scale-[0.97] disabled:opacity-45 disabled:cursor-not-allowed',
      VARIANTS[variant],
      SIZES[size],
      fullWidth && 'w-full',
      className,
    )}
    {...props}
  >
    {loading && (
      <span className="size-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
    )}
    {children}
  </button>
));
Button.displayName = 'Button';