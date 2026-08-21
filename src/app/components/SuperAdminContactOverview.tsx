import { Ticket, AlertTriangle, Clock, Users, AlertCircle } from 'lucide-react';

interface SuperAdminContactOverviewProps {
  onViewTickets: () => void;
}

export function SuperAdminContactOverview({ onViewTickets }: SuperAdminContactOverviewProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-foreground">Contact & Support</h1>
          <p className="text-muted-foreground text-sm">Platform-level visibility into tenant-raised tickets</p>
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* SECTION 1 — KPI STRIP */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Open Tickets */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">47</p>
              <p className="text-muted-foreground text-sm">Open Tickets</p>
              <p className="text-muted-foreground text-xs mt-1">All active tickets</p>
            </div>

            {/* Critical Tickets */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">8</p>
              <p className="text-muted-foreground text-sm">Critical Tickets</p>
              <p className="text-muted-foreground text-xs mt-1">Highest priority</p>
            </div>

            {/* Awaiting Acknowledgement */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">12</p>
              <p className="text-muted-foreground text-sm">Awaiting Acknowledgement</p>
              <p className="text-muted-foreground text-xs mt-1">Not yet acknowledged</p>
            </div>

            {/* Tenants with Multiple Open */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">6</p>
              <p className="text-muted-foreground text-sm">Tenants w/ Multiple Open</p>
              <p className="text-muted-foreground text-xs mt-1">Pattern detection</p>
            </div>

            {/* Overdue Tickets */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">3</p>
              <p className="text-muted-foreground text-sm">Overdue (SLA Breached)</p>
              <p className="text-muted-foreground text-xs mt-1">Requires attention</p>
            </div>
          </div>

          {/* SECTION 2 — TICKET INSIGHTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-foreground mb-6">Tickets by Category</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground text-sm">Subscription</span>
                    <span className="text-foreground">15</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground text-sm">AI & Feature Access</span>
                    <span className="text-foreground">12</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '26%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground text-sm">Account & Access</span>
                    <span className="text-foreground">10</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '21%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground text-sm">Platform Issue</span>
                    <span className="text-foreground">7</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground text-sm">Other</span>
                    <span className="text-foreground">3</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-slate-500 h-2 rounded-full" style={{ width: '6%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Priority & Risk Analysis */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-foreground mb-6">Risk & Priority Analysis</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-700" />
                    <span className="text-red-900">Critical Priority</span>
                  </div>
                  <p className="text-red-700 text-sm mb-2">8 tickets require immediate attention</p>
                  <div className="text-xs text-red-600">
                    5 Subscription, 2 Platform Issue, 1 AI Access
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-700" />
                    <span className="text-orange-900">SLA Breach Alert</span>
                  </div>
                  <p className="text-orange-700 text-sm mb-2">3 tickets have breached SLA deadline</p>
                  <div className="text-xs text-orange-600">
                    Longest overdue: 2 days 4 hours
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span className="text-amber-900">Pattern Detected</span>
                  </div>
                  <p className="text-amber-700 text-sm mb-2">6 tenants with multiple open tickets</p>
                  <div className="text-xs text-amber-600">
                    Highest: GlobalLogistics Corp (4 open tickets)
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-700" />
                    <span className="text-blue-900">Tenant Health</span>
                  </div>
                  <p className="text-blue-700 text-sm">35 of 247 tenants have active tickets (14%)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground mb-1">Ticket Management</h2>
                <p className="text-muted-foreground text-sm">View and manage all tenant-raised tickets</p>
              </div>
              <button
                onClick={onViewTickets}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
              >
                View All Tickets
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
