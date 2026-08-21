import { 
  LayoutDashboard, 
  Settings,
  Users,
  Shield,
  HelpCircle,
  LogOut,
  Lock,
  AlertCircle,
  ScrollText,
  X
} from 'lucide-react';
import { OptiMileLogo } from './OptiMileLogo';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  lockedUntilReady?: boolean;
}

interface TenantAdminSidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  workspaceReady: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function TenantAdminSidebar({
  activeScreen,
  onNavigate,
  onLogout,
  workspaceReady,
  isOpen = false,
  onClose
}: TenantAdminSidebarProps) {
  const tenantName = "ACME Corporation";
  
  const navigationItems: NavigationItem[] = [
    {
      id: 'tenant-dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      lockedUntilReady: true
    },
    {
      id: 'tenant-users',
      label: 'Users',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'tenant-roles',
      label: 'Roles & Permissions',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'tenant-settings',
      label: 'Company Settings',
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 'tenant-activity',
      label: 'Activity Log',
      icon: <ScrollText className="w-5 h-5" />
    },
    {
      id: 'tenant-support',
      label: 'Contact & Support',
      icon: <HelpCircle className="w-5 h-5" />
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

        {/* Tenant Name and Status */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {tenantName}
          </div>
          
          {!workspaceReady && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-amber-900 text-xs">Workspace Setup Required</span>
            </div>
          )}
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-600" />
            <span className="text-blue-900 text-sm">Tenant Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 ">
        {navigationItems.map((item) => {
          const isActive = activeScreen === item.id || activeScreen.startsWith(item.id);
          const isLocked = !workspaceReady && item.lockedUntilReady;
          const isDisabled = isLocked;
          
          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => !isDisabled && onNavigate(item.id)}
                disabled={isDisabled}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : isDisabled
                    ? 'text-muted-foreground opacity-50 cursor-not-allowed'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isLocked && <Lock className="w-4 h-4" />}
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
              
              {/* Tooltip for locked dashboard */}
              {isLocked && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                    Complete workspace setup to access dashboard
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
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