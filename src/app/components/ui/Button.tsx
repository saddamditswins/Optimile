/**
 * OptiMile Standard Button Component
 * Consistent across ALL roles
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { DesignTokens } from '../DesignSystemTokens';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  icon,
  children, 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = DesignTokens.buttons[variant];
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${widthClass} ${className} inline-flex items-center justify-center gap-2`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
