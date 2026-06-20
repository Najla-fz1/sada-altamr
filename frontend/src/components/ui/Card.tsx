import { forwardRef, type HTMLAttributes } from 'react';
import { cn }      from '@/lib/cn';
import { useTheme } from '@/context/ThemeContext';
import { THEMES }   from '@/lib/theme';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  elevated, className, children, style, ...props
}, ref) => {
  const { theme } = useTheme();
  const T = THEMES[theme];

  return (
    <div
      ref={ref}
      className={cn('rounded-[20px] p-5 transition-all duration-200', className)}
      style={{
        background:   elevated ? T.cardElevated : T.card,
        border:       `1px solid ${T.cardBorder}`,
        boxShadow:    elevated ? T.shadowMd : T.shadowSm,
        backdropFilter: 'blur(12px)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = 'Card';