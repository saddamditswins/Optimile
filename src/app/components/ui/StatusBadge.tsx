/**
 * OptiMile Status Badge Component
 * Semantic colors that mean the same thing across ALL roles
 * 
 * Green = Success / Completed / Protected
 * Amber = Risk / Warning / Attention
 * Red = Critical / Breach / Blocking
 * Blue = Info / Neutral
 * Gray = Disabled / Read-only
 */

import { ReactNode } from 'react';
import { DesignTokens } from '../DesignSystemTokens';

export type BadgeVariant = 'success' | 'warning' | 'critical' | 'info' | 'neutral';

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  icon?: ReactNode;
}

export function StatusBadge({ variant, children, icon }: StatusBadgeProps) {
  const classes = DesignTokens.badges[variant];
  
  return (
    <span className={`${classes} inline-flex items-center gap-1.5`}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
