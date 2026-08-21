/**
 * OptiMile Standard Input Component
 * Consistent form inputs across ALL roles
 */

import { InputHTMLAttributes, ReactNode } from 'react';
import { DesignTokens } from '../DesignSystemTokens';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
}

export function Input({ 
  label, 
  error, 
  helperText, 
  icon,
  className = '',
  ...props 
}: InputProps) {
  const inputClasses = error 
    ? DesignTokens.inputs.error 
    : DesignTokens.inputs.standard;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          className={`${inputClasses} ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

export function Textarea({ 
  label, 
  error, 
  helperText,
  rows = 4,
  className = '',
  ...props 
}: TextareaProps) {
  const textareaClasses = error 
    ? 'w-full px-4 py-2.5 rounded-lg border border-red-300 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all duration-200'
    : 'w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      
      <textarea
        rows={rows}
        className={`${textareaClasses} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
}
