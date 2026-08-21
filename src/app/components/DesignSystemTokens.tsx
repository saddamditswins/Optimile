/**
 * OptiMile Design System Tokens
 * 
 * GLOBAL STANDARDIZATION RULES:
 * ==============================
 * 
 * 1. TYPOGRAPHY
 *    - Single font family across ALL roles
 *    - Consistent type scale and hierarchy
 *    - Same font weights for same purposes
 * 
 * 2. SEMANTIC COLORS
 *    - Green = Success / Completed / Protected / On Track
 *    - Amber = Risk / Warning / Attention Needed
 *    - Red = Critical / Breach / Blocking
 *    - Blue = Primary Actions / Neutral System Info
 *    - Gray = Read-only / Disabled / Metadata
 * 
 * 3. LAYOUT SYSTEM
 *    - Persistent left sidebar (256px)
 *    - Consistent top context bar
 *    - Unified card layout system
 *    - 8px spacing grid
 * 
 * 4. INTERACTION PATTERNS
 *    - Primary action: Solid blue button
 *    - Secondary action: Outlined button
 *    - Destructive action: Red with confirmation
 *    - Disabled: Visible but inactive
 *    - Read-only: Explicitly labeled
 * 
 * 5. ROLE DIFFERENTIATION
 *    ROLES MAY DIFFER BY:
 *    - Visible modules (permissions)
 *    - Enabled actions (authorization)
 *    - Data scope (access control)
 *    - Read-only vs editable state
 * 
 *    ROLES MUST NOT DIFFER BY:
 *    - Fonts or typography
 *    - Color meanings
 *    - Layout structure
 *    - Navigation placement
 *    - Interaction behavior
 * 
 * DESIGN PRINCIPLE:
 * "Same system, different responsibility"
 * Users should feel they're in the same product when switching roles.
 */

export const DesignTokens = {
  // Typography Scale
  typography: {
    pageTitle: 'text-2xl font-medium',      // Section/page headers
    sectionHeader: 'text-xl font-medium',   // Major section headers
    cardTitle: 'text-lg font-medium',       // Card and panel titles
    subheader: 'text-base font-medium',     // Subsection headers
    body: 'text-base font-normal',          // Standard body text
    label: 'text-sm font-medium',           // Form labels
    metadata: 'text-xs text-muted-foreground', // Timestamps, helper text
  },

  // Semantic Colors
  colors: {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: 'text-green-600',
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200',
      icon: 'text-amber-600',
    },
    critical: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: 'text-red-600',
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      border: 'border-blue-200',
      icon: 'text-blue-600',
    },
    neutral: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      border: 'border-gray-200',
      icon: 'text-gray-600',
    },
  },

  // Button Styles
  buttons: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    destructive: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-200',
  },

  // Status Badges
  badges: {
    success: 'bg-green-50 text-green-800 border border-green-200 px-2.5 py-1 rounded text-xs font-medium',
    warning: 'bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded text-xs font-medium',
    critical: 'bg-red-50 text-red-800 border border-red-200 px-2.5 py-1 rounded text-xs font-medium',
    info: 'bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded text-xs font-medium',
    neutral: 'bg-gray-50 text-gray-700 border border-gray-200 px-2.5 py-1 rounded text-xs font-medium',
  },

  // Card Layouts
  cards: {
    standard: 'bg-white border border-gray-200 rounded-lg p-6 shadow-sm',
    interactive: 'bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer',
    compact: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm',
  },

  // Input Fields
  inputs: {
    standard: 'w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500',
    error: 'w-full px-4 py-2.5 rounded-lg border border-red-300 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all duration-200',
  },

  // Layout
  layout: {
    sidebarWidth: 'w-64',
    pageContainer: 'max-w-7xl mx-auto px-6 py-8',
    sectionSpacing: 'mb-8',
    cardSpacing: 'gap-6',
  },

  // Icons
  icons: {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  },
};

/**
 * Role Badge Colors
 * These are the ONLY role-specific colors allowed
 * Used ONLY in role badges and illustrations, NOT in UI controls
 */
export const RoleBadgeColors = {
  'super-admin': {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    border: 'border-blue-200',
    icon: 'text-blue-600',
  },
  'tenant-admin': {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    border: 'border-gray-200',
    icon: 'text-gray-600',
  },
  'dispatch-manager': {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-200',
    icon: 'text-amber-600',
  },
  'fleet-supervisor': {
    bg: 'bg-teal-50',
    text: 'text-teal-900',
    border: 'border-teal-200',
    icon: 'text-teal-600',
  },
  'operations-manager': {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    border: 'border-purple-200',
    icon: 'text-purple-600',
  },
  'driver': {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    border: 'border-blue-200',
    icon: 'text-blue-600',
  },
};

// Type exports for TypeScript support
export type SemanticColor = 'success' | 'warning' | 'critical' | 'info' | 'neutral';
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type BadgeVariant = 'success' | 'warning' | 'critical' | 'info' | 'neutral';
export type CardVariant = 'standard' | 'interactive' | 'compact';
