import { LayoutDashboard, Building2, CreditCard, Headphones, Settings, LogOut, Shield } from 'lucide-react';
import { OptiMileLogo } from './OptiMileLogo';

interface SuperAdminSidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function SuperAdminSidebar({ activeScreen, onNavigate, onLogout }: SuperAdminSidebarProps) {
  const navItems = [
    { id: 'superadmin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'superadmin-tenants', label: 'Tenants', icon: Building2 },
    { id: 'superadmin-subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'superadmin-support', label: 'Contact & Support', icon: Headphones },
    { id: 'superadmin-settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Logo & Role */}
      <div className="p-6 border-b border-border">
        <div className="mb-4">
          <OptiMileLogo size="default" />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <Shield className="w-4 h-4 text-blue-700" />
          <span className="text-blue-900 text-sm">Super Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-border">
        <div className="mb-3 px-4 py-2 bg-muted rounded-lg">
          <p className="text-foreground text-sm">Platform Admin</p>
          <p className="text-muted-foreground text-xs">admin@optimile.com</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}