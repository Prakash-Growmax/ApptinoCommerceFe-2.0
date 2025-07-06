import { Loader2 } from 'lucide-react';

import { ShadCnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ShadcnButtonProps {
  children?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
  tooltip?: string;
  testId?: string;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset'; // Added type prop
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

function Button({
  loading,
  iconOnly,
  loadingText,
  children,
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  variant = 'default',
  size = 'default',
  isDisabled,
  type = 'button', // Default to button type
  testId = 'data-testid',
  onClick,
  ariaLabel,
  ariaDescribedBy,
}: ShadcnButtonProps) {
  const buttonContent = () => {
    if (loading) {
      return (
        <>
          <Loader2
            className="h-4 w-4 animate-spin"
            data-testid="loading-spinner"
          />
          {!iconOnly && (loadingText || children)}
        </>
      );
    }

    if (iconOnly && (leftIcon || rightIcon)) {
      return leftIcon || rightIcon;
    }

    return (
      <>
        {leftIcon && <span data-testid="left-icon">{leftIcon}</span>}
        {children}
        {rightIcon && <span data-testid="right-icon">{rightIcon}</span>}
      </>
    );
  };

  return (
    <ShadCnButton
      type={type} // Pass through the type prop
      className={cn(fullWidth && 'w-full', iconOnly && 'px-0', className)}
      variant={variant}
      size={size}
      disabled={isDisabled || loading} // Use disabled instead of isDisabled for the underlying button
      data-testid={testId}
      onClick={onClick}
      aria-label={ariaLabel || (iconOnly ? (typeof children === 'string' ? children : 'Button') : undefined)}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
    >
      {loading && (
        <span className="sr-only" aria-live="polite">
          {loadingText || 'Loading...'}
        </span>
      )}
      {buttonContent()}
    </ShadCnButton>
  );
}

Button.displayName = 'Button';

export default Button;
