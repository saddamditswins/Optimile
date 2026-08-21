/**
 * OptiMile Theme Dropdown - Simple Light/Dark Switcher
 * Persists theme selection across all screens and roles
 */

import { useTheme } from './ThemeProvider';

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground">Theme</span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        className="
          px-3 py-2 rounded-lg text-sm font-medium
          bg-card text-foreground
          border border-border
          hover:bg-accent transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary/20
          cursor-pointer
        "
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

// Alternative compact icon version
export function ThemeDropdownCompact() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        className="
          appearance-none pl-3 pr-8 py-2 rounded-lg text-sm
          bg-card text-foreground border border-border
          hover:bg-accent transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary/20
          cursor-pointer
        "
      >
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
      </select>
    </div>
  );
}