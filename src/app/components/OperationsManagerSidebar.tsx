import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  Activity,
  FileText,
  Settings,
  Radio,
  LogOut,
  BarChart3,
  X
} from 'lucide-react';
import { OptiMileLogo } from './OptiMileLogo';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  description?: string;
}

interface OperationsManagerSidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function OperationsManagerSidebar({ activeScreen, onNavigate, onLogout, isOpen = false, onClose }: OperationsManagerSidebarProps) {
  const navigationItems: NavigationItem[] = [
    {
      id: 'ops-dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'ops-escalations',
      label: 'Escalations',
      icon: <Shield className="w-5 h-5" />,
      badge: 3
    },
    {
      id: 'ops-sla-risk',
      label: 'SLA & Risk Oversight',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'ops-execution',
      label: 'Execution Oversight',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'ops-outcomes',
      label: 'Outcomes',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      id: 'ops-audit',
      label: 'Audit & Compliance',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`w-64 bg-card border-r border-border flex flex-col h-screen fixed inset-y-0 left-0 z-50 shadow-sm transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
      {/* Brand Header */}
      <div className="p-6 border-b border-border relative">
        <button onClick={onClose} className="lg:hidden absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:bg-accent" aria-label="Close navigation menu">
          <X className="w-5 h-5" />
        </button>
        <div className="mb-4 pr-8 lg:pr-0">
          <OptiMileLogo size="default" />
        </div>

        {/* Role Badge */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-600" />
          <span className="text-purple-900 text-sm">Operations Manager</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 ">
        {navigationItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  isActive 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
      </aside>
    </>
  );
}