import { useState } from 'react';
import { OptiMileLogo } from './OptiMileLogo';
import { ThemeToggle } from './ThemeToggle';
import { Eye, EyeOff, Shield, Lock, ChevronLeft } from 'lucide-react';

interface LoginScreenProps {
  roleId: string;
  onBack: () => void;
  onLoginSuccess: (authenticatedRoleId: string) => void;
}

export function LoginScreen({ roleId, onBack, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Role-specific visual context
  const getRoleContext = () => {
    const contexts: Record<string, {
      title: string;
      subtitle: string;
      accentColor: string;
      gradientFrom: string;
      gradientTo: string;
      illustration: React.ReactNode;
    }> = {
      'super-admin': {
        title: 'Platform Governance',
        subtitle: 'Oversee tenants, policies, and system-wide health',
        accentColor: 'from-blue-700 to-blue-900',
        gradientFrom: 'from-white',
        gradientTo: 'to-blue-50',
        illustration: (
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Platform dashboard illustration */}
            <rect x="50" y="60" width="300" height="180" rx="8" fill="#1E40AF" opacity="0.1"/>
            <rect x="60" y="70" width="280" height="30" rx="4" fill="#1E40AF" opacity="0.3"/>
            
            {/* Dashboard cards */}
            <rect x="70" y="120" width="120" height="80" rx="6" fill="#1E40AF" opacity="0.2"/>
            <rect x="200" y="120" width="120" height="80" rx="6" fill="#1E40AF" opacity="0.2"/>
            
            {/* Data visualization elements */}
            <circle cx="130" cy="155" r="25" stroke="#1E40AF" strokeWidth="3" fill="none" opacity="0.4"/>
            <path d="M 210 180 L 230 155 L 250 165 L 270 145 L 290 155" stroke="#1E40AF" strokeWidth="3" fill="none" opacity="0.4"/>
            
            {/* Overseer figure */}
            <circle cx="200" cy="35" r="15" fill="#374151"/>
            <path d="M 200 50 L 200 75 M 200 60 L 185 75 M 200 60 L 215 75" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        )
      },
      'dispatch-manager': {
        title: 'Live Execution Control',
        subtitle: 'Monitor routes, manage exceptions, act in real time',
        accentColor: 'from-orange-500 to-amber-600',
        gradientFrom: 'from-white',
        gradientTo: 'to-orange-50',
        illustration: (
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Map/route visualization */}
            <rect x="50" y="50" width="300" height="200" rx="8" fill="#F59E0B" opacity="0.08"/>
            
            {/* Route lines with motion */}
            <path d="M 80 100 Q 150 80, 220 120" stroke="#F59E0B" strokeWidth="3" strokeDasharray="5,5" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
            </path>
            <path d="M 100 180 Q 180 160, 260 200" stroke="#F59E0B" strokeWidth="3" strokeDasharray="5,5" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite"/>
            </path>
            <path d="M 120 140 Q 200 100, 300 150" stroke="#EA580C" strokeWidth="4" strokeDasharray="5,5" opacity="0.6">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="0.8s" repeatCount="indefinite"/>
            </path>
            
            {/* Live markers/alerts */}
            <circle cx="220" cy="120" r="6" fill="#EF4444">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="260" cy="200" r="6" fill="#F59E0B">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            
            {/* Dispatcher figure at control center */}
            <rect x="160" y="220" width="80" height="50" rx="4" fill="#374151" opacity="0.2"/>
            <circle cx="200" cy="235" r="12" fill="#374151"/>
          </svg>
        )
      },
      'fleet-supervisor': {
        title: 'Fleet Readiness',
        subtitle: 'Ensure drivers and vehicles are available and compliant',
        accentColor: 'from-teal-500 to-cyan-600',
        gradientFrom: 'from-white',
        gradientTo: 'to-teal-50',
        illustration: (
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Fleet overview grid */}
            <rect x="50" y="50" width="300" height="200" rx="8" fill="#14B8A6" opacity="0.08"/>
            
            {/* Vehicle icons in grid */}
            <g opacity="0.4">
              <rect x="80" y="80" width="40" height="25" rx="3" fill="#14B8A6"/>
              <circle cx="90" cy="110" r="4" fill="#374151"/>
              <circle cx="110" cy="110" r="4" fill="#374151"/>
              
              <rect x="180" y="80" width="40" height="25" rx="3" fill="#14B8A6"/>
              <circle cx="190" cy="110" r="4" fill="#374151"/>
              <circle cx="210" cy="110" r="4" fill="#374151"/>
              
              <rect x="280" y="80" width="40" height="25" rx="3" fill="#14B8A6"/>
              <circle cx="290" cy="110" r="4" fill="#374151"/>
              <circle cx="310" cy="110" r="4" fill="#374151"/>
              
              <rect x="80" y="150" width="40" height="25" rx="3" fill="#14B8A6"/>
              <circle cx="90" cy="180" r="4" fill="#374151"/>
              <circle cx="110" cy="180" r="4" fill="#374151"/>
              
              <rect x="180" y="150" width="40" height="25" rx="3" fill="#14B8A6"/>
              <circle cx="190" cy="180" r="4" fill="#374151"/>
              <circle cx="210" cy="180" r="4" fill="#374151"/>
              
              <rect x="280" y="150" width="40" height="25" rx="3" fill="#14B8A6"/>
              <circle cx="290" cy="180" r="4" fill="#374151"/>
              <circle cx="310" cy="180" r="4" fill="#374151"/>
            </g>
            
            {/* Checkmark indicators */}
            <circle cx="115" cy="95" r="8" fill="#10B981"/>
            <path d="M 112 95 L 114 97 L 118 92" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="215" cy="95" r="8" fill="#10B981"/>
            <path d="M 212 95 L 214 97 L 218 92" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* Supervisor figure */}
            <circle cx="200" cy="230" r="15" fill="#374151" opacity="0.5"/>
          </svg>
        )
      },
      'operations-manager': {
        title: 'Operational Oversight',
        subtitle: 'Approve escalations and protect SLA outcomes',
        accentColor: 'from-purple-600 to-indigo-700',
        gradientFrom: 'from-white',
        gradientTo: 'to-purple-50',
        illustration: (
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Approval workflow */}
            <rect x="50" y="50" width="300" height="200" rx="8" fill="#7C3AED" opacity="0.08"/>
            
            {/* Document/approval cards */}
            <rect x="80" y="80" width="100" height="60" rx="6" fill="#7C3AED" opacity="0.2"/>
            <rect x="220" y="80" width="100" height="60" rx="6" fill="#7C3AED" opacity="0.2"/>
            <rect x="150" y="170" width="100" height="60" rx="6" fill="#7C3AED" opacity="0.3"/>
            
            {/* Approval checkmarks */}
            <circle cx="130" cy="110" r="12" fill="#10B981" opacity="0.7"/>
            <path d="M 125 110 L 128 113 L 135 105" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* Flow arrows */}
            <path d="M 180 110 L 220 110" stroke="#7C3AED" strokeWidth="2" opacity="0.4" markerEnd="url(#arrowhead)"/>
            <path d="M 130 140 L 180 180" stroke="#7C3AED" strokeWidth="2" opacity="0.4"/>
            <path d="M 270 140 L 220 180" stroke="#7C3AED" strokeWidth="2" opacity="0.4"/>
            
            {/* Manager figure */}
            <circle cx="200" cy="40" r="15" fill="#374151" opacity="0.5"/>
            
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#7C3AED" opacity="0.4"/>
              </marker>
            </defs>
          </svg>
        )
      },
      'driver': {
        title: "Today's Work",
        subtitle: 'Execute deliveries and report issues on the go',
        accentColor: 'from-blue-500 to-blue-700',
        gradientFrom: 'from-white',
        gradientTo: 'to-blue-50',
        illustration: (
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Mobile phone frame */}
            <rect x="130" y="40" width="140" height="220" rx="12" fill="#3B82F6" opacity="0.15" stroke="#3B82F6" strokeWidth="3"/>
            <rect x="140" y="55" width="120" height="185" rx="4" fill="white" stroke="#3B82F6" strokeWidth="1" opacity="0.2"/>
            
            {/* Phone screen content - task list */}
            <rect x="150" y="70" width="100" height="20" rx="3" fill="#3B82F6" opacity="0.3"/>
            <rect x="150" y="100" width="100" height="20" rx="3" fill="#3B82F6" opacity="0.2"/>
            <rect x="150" y="130" width="100" height="20" rx="3" fill="#3B82F6" opacity="0.2"/>
            <rect x="150" y="160" width="100" height="20" rx="3" fill="#3B82F6" opacity="0.15"/>
            
            {/* Checkmarks */}
            <circle cx="158" cy="80" r="5" fill="#10B981"/>
            <path d="M 156 80 L 158 82 L 161 78" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* Driver figure next to vehicle */}
            <circle cx="90" cy="200" r="18" fill="#374151" opacity="0.4"/>
            <path d="M 90 218 L 90 250 M 90 235 L 75 255 M 90 235 L 105 255" stroke="#374151" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
            
            {/* Simple truck */}
            <rect x="280" y="195" width="50" height="35" rx="3" fill="#3B82F6" opacity="0.3"/>
            <circle cx="295" cy="235" r="8" fill="#374151" opacity="0.4"/>
            <circle cx="325" cy="235" r="8" fill="#374151" opacity="0.4"/>
          </svg>
        )
      },
      'tenant-admin': {
        title: 'Enterprise Configuration',
        subtitle: 'Manage your organization, users, and governance settings',
        accentColor: 'from-gray-600 to-gray-800',
        gradientFrom: 'from-white',
        gradientTo: 'to-gray-50',
        illustration: (
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Organization structure */}
            <rect x="50" y="50" width="300" height="200" rx="8" fill="#374151" opacity="0.08"/>
            
            {/* Central admin node */}
            <circle cx="200" cy="100" r="25" fill="#374151" opacity="0.3"/>
            <circle cx="200" cy="100" r="15" fill="#374151" opacity="0.5"/>
            
            {/* Connected user nodes */}
            <circle cx="120" cy="180" r="18" fill="#374151" opacity="0.2"/>
            <circle cx="200" cy="180" r="18" fill="#374151" opacity="0.2"/>
            <circle cx="280" cy="180" r="18" fill="#374151" opacity="0.2"/>
            
            {/* Connection lines */}
            <path d="M 200 125 L 120 162" stroke="#374151" strokeWidth="2" opacity="0.3"/>
            <path d="M 200 125 L 200 162" stroke="#374151" strokeWidth="2" opacity="0.3"/>
            <path d="M 200 125 L 280 162" stroke="#374151" strokeWidth="2" opacity="0.3"/>
            
            {/* Settings gear */}
            <circle cx="300" cy="80" r="20" stroke="#374151" strokeWidth="3" fill="none" opacity="0.3"/>
            <circle cx="300" cy="80" r="12" fill="#374151" opacity="0.2"/>
          </svg>
        )
      }
    };
    
    return contexts[roleId] || contexts['super-admin'];
  };

  const roleContext = getRoleContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      // Direct login without validation
      setIsLoading(false);
      onLoginSuccess(roleId);
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* LEFT PANEL - Role Context Visual (40%) */}
      <div className={`hidden lg:flex lg:w-[40%] bg-gradient-to-br ${roleContext.gradientFrom} ${roleContext.gradientTo} dark:from-gray-900 dark:to-gray-800 relative overflow-hidden`}>
        {/* Subtle motion pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="loginPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
                <circle cx="75" cy="75" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#loginPattern)"/>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center px-12 w-full">
          {/* Illustration */}
          <div className="mb-8 w-full max-w-md">
            {roleContext.illustration}
          </div>
          
          {/* Title and subtitle */}
          <div className="text-center max-w-md">
            <h2 className={`text-3xl font-bold bg-gradient-to-r ${roleContext.accentColor} bg-clip-text text-transparent mb-4`}>
              {roleContext.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {roleContext.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form (60%) */}
      <div className="w-full lg:w-[60%] bg-white dark:bg-gray-900 flex flex-col">
        {/* Header with logo and theme dropdown */}
        <header className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <OptiMileLogo size="default" />
          <ThemeToggle />
        </header>

        {/* Main login form */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            {/* Welcome header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome back</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none text-gray-900 transition-all"
                  placeholder="your.email@company.com"
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none text-gray-900 transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 dark:bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
                  isLoading
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* SSO Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* SSO Options */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00A4EF">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Microsoft</span>
                </button>
              </div>
            </form>

            {/* Footer links */}
            <div className="mt-8 flex items-center justify-between text-sm">
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                Forgot password?
              </a>
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to roles</span>
              </button>
            </div>

            {/* Security notice */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>Secure encrypted connection</span>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © 2025 OptiMile. All rights reserved. Unauthorized access is prohibited.
          </p>
        </footer>
      </div>
    </div>
  );
}