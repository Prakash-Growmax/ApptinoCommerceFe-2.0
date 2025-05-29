import { Loader2 } from 'lucide-react';

import { Button as ShadCnButton } from '@/components/ui/button';
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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  testId = 'data-testid',
  onClick,
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
      className={cn(fullWidth && 'w-full', iconOnly && 'px-0', className)}
      variant={variant}
      size={size}
      disabled={isDisabled}
      data-testid={testId}
      onClick={onClick}
    >
      {buttonContent()}
    </ShadCnButton>
  );
}

export default Button;
