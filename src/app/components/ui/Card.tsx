/**
 * OptiMile Standard Card Component
 * Consistent layout across ALL roles
 */

import { ReactNode, HTMLAttributes } from 'react';
import { DesignTokens } from '../DesignSystemTokens';

export type CardVariant = 'standard' | 'interactive' | 'compact';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

export function Card({ variant = 'standard', children, className = '', ...props }: CardProps) {
  const classes = DesignTokens.cards[variant];
  
  return (
    <div className={`${classes} ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return <div className="space-y-4">{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
}

export function CardFooter({ children }: CardFooterProps) {
  return <div className="mt-6 pt-4 border-t border-gray-200">{children}</div>;
}
