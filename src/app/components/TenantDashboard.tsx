import { Users, Activity, Shield, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface TenantDashboardProps {
  onNavigate: (screen: string) => void;
}

export function TenantDashboard({ onNavigate }: TenantDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 sm:px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-foreground">Tenant Dashboard</h1>
              <p className="text-muted-foreground text-sm">Acme Corporation · Last updated: Just now</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="text-sm">All Systems Operational</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">47</p>
              <p className="text-muted-foreground text-sm">Total Users</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">3</p>
              <p className="text-muted-foreground text-sm">Active Regions</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">12</p>
              <p className="text-muted-foreground text-sm">Active Integrations</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">98.2%</p>
              <p className="text-muted-foreground text-sm">SLA Compliance</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => onNavigate('tenant-users')}
                className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-all duration-200 text-left"
              >
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-foreground text-sm">Manage Users</p>
                  <p className="text-muted-foreground text-xs">Invite and configure user access</p>
                </div>
              </button>

              <button 
                onClick={() => onNavigate('tenant-integrations')}
                className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-all duration-200 text-left"
              >
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-foreground text-sm">Configure Integrations</p>
                  <p className="text-muted-foreground text-xs">Connect external systems</p>
                </div>
              </button>

              <button 
                onClick={() => onNavigate('tenant-audit')}
                className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-all duration-200 text-left"
              >
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-foreground text-sm">View Audit Logs</p>
                  <p className="text-muted-foreground text-xs">Track configuration changes</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { type: 'user', message: 'New user invited: john.doe@acme.com', time: '2 hours ago', icon: Users },
                { type: 'success', message: 'Integration test successful: OrderMS Connector', time: '5 hours ago', icon: CheckCircle },
                { type: 'warning', message: 'SLA configuration updated', time: '1 day ago', icon: AlertCircle }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-50' : activity.type === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
                  }`}>
                    <activity.icon className={`w-4 h-4 ${
                      activity.type === 'success' ? 'text-green-600' : activity.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-sm">{activity.message}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
