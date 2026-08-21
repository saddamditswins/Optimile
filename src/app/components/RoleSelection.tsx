import { RoleCard } from './RoleCard';
import { OptiMileLogo } from './OptiMileLogo';
import { ThemeToggle } from './ThemeToggle';
import { Shield, Users, Radio, BarChart3, Truck, Smartphone, ArrowLeft } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  level: 'critical' | 'high' | 'medium';
}

interface RoleSelectionProps {
  onRoleSelect: (roleId: string) => void;
  onBackToHome?: () => void;
}

export function RoleSelection({ onRoleSelect, onBackToHome }: RoleSelectionProps) {
  const roles: Role[] = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Platform governance, cross-tenant oversight, and revenue monitoring',
      icon: <Shield className="w-8 h-8" />,
      level: 'critical'
    },
    {
      id: 'tenant-admin',
      name: 'Tenant Admin',
      description: 'Enterprise configuration, user management, and governance',
      icon: <Users className="w-8 h-8" />,
      level: 'high'
    },
    {
      id: 'dispatch-manager',
      name: 'Dispatch Manager',
      description: 'Live delivery execution and in-day recovery decisions',
      icon: <Radio className="w-8 h-8" />,
      level: 'critical'
    },
    {
      id: 'fleet-supervisor',
      name: 'Fleet Supervisor',
      description: 'Field team oversight, real-time driver support, and task management',
      icon: <Truck className="w-8 h-8" />,
      level: 'high'
    },
    {
      id: 'driver',
      name: 'Driver',
      description: 'Mobile task execution, proof of delivery, and route navigation',
      icon: <Smartphone className="w-8 h-8" />,
      level: 'medium'
    },
    {
      id: 'operations-manager',
      name: 'Operations Manager',
      description: 'Escalation approval, oversight, and outcome review',
      icon: <BarChart3 className="w-8 h-8" />,
      level: 'high'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 flex flex-col relative overflow-hidden">
      {/* Cinematic Background Pattern */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
       
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="routePattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300"/>
              <circle cx="60" cy="40" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300"/>
              <circle cx="100" cy="30" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300"/>
              <circle cx="140" cy="50" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300"/>
              <circle cx="180" cy="35" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300"/>
              
        
              <path d="M 20 20 Q 40 30, 60 40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,3" className="text-blue-700 dark:text-blue-300"/>
              <path d="M 60 40 Q 80 35, 100 30" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,3" className="text-blue-700 dark:text-blue-300"/>
              <path d="M 100 30 Q 120 40, 140 50" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,3" className="text-blue-700 dark:text-blue-300"/>
              <path d="M 140 50 Q 160 42, 180 35" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,3" className="text-blue-700 dark:text-blue-300"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#routePattern)"/>
        </svg>
        
      
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent opacity-20 animate-pulse" style={{ animationDuration: '3s' }}/>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-300 dark:via-teal-700 to-transparent opacity-20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}/>
      </div> */}

      {/* Header */}
      <header className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6 cursor-pointer min-w-0" onClick={onBackToHome}>
            <OptiMileLogo size="default" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Demo Mode Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse shrink-0"></div>
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium whitespace-nowrap">Demo Mode</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Instructional Text */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              Select Your Role
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Each role has different responsibilities, permissions, and system access. 
              Choose the role that matches your operational function to continue.
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onClick={() => onRoleSelect(role.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Enterprise-grade security and compliance enabled</span>
            </div>
            <div>
              © 2025 OptiMile. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}