/**
 * OptiMile Alert Component
 * Semantic alert types across ALL roles
 */

import { ReactNode } from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export type AlertVariant = 'success' | 'warning' | 'critical' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function Alert({ variant, title, children, action }: AlertProps) {
  const variants = {
    success: {
      container: 'bg-green-50 border-green-200 border',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      titleColor: 'text-green-900',
      textColor: 'text-green-800',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 border',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      titleColor: 'text-amber-900',
      textColor: 'text-amber-800',
    },
    critical: {
      container: 'bg-red-50 border-red-200 border',
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      titleColor: 'text-red-900',
      textColor: 'text-red-800',
    },
    info: {
      container: 'bg-blue-50 border-blue-200 border',
      icon: <Info className="w-5 h-5 text-blue-600" />,
      titleColor: 'text-blue-900',
      textColor: 'text-blue-800',
    },
  };
  
  const config = variants[variant];
  
  return (
    <div className={`${config.container} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {config.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`${config.titleColor} font-medium mb-1`}>
              {title}
            </h4>
          )}
          <div className={`${config.textColor} text-sm`}>
            {children}
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
