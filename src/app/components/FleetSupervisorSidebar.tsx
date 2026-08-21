import { LayoutDashboard, Users, Truck, Radio, AlertCircle, ScrollText, LogOut, X } from 'lucide-react';
import { OptiMileLogo } from './OptiMileLogo';

interface FleetSupervisorSidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function FleetSupervisorSidebar({ activeScreen, onNavigate, onLogout, isOpen = false, onClose }: FleetSupervisorSidebarProps) {
  const navItems = [
    { id: 'fleet-dashboard', label: 'Fleet Dashboard', icon: LayoutDashboard },
    { id: 'fleet-drivers', label: 'Drivers Management', icon: Users },
    { id: 'fleet-vehicles', label: 'Vehicles Management', icon: Truck },
    { id: 'fleet-capacity', label: 'Capacity & Constraint Signals', icon: Radio },
    { id: 'fleet-exceptions', label: 'Fleet Exceptions', icon: AlertCircle, badge: 'Read-only' },
    { id: 'fleet-activity', label: 'Fleet Activity Log', icon: ScrollText },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`w-64 bg-card border-r border-border flex flex-col h-screen fixed inset-y-0 left-0 z-50 shadow-sm transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
      {/* Header */}
      <div className="p-6 border-b border-border relative">
        <button onClick={onClose} className="lg:hidden absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:bg-accent" aria-label="Close navigation menu">
          <X className="w-5 h-5" />
        </button>
        <div className="mb-2 pr-8 lg:pr-0">
          <OptiMileLogo size="default" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-sm">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
      </aside>
    </>
  );
}