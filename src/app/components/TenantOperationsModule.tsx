import { TrendingUp, Users, AlertTriangle, BarChart3, Filter, Calendar } from 'lucide-react';

export function TenantOperationsModule() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1 className="text-foreground">Operations Visibility</h1>
            <p className="text-muted-foreground text-sm">Tenant-level operational health and governance oversight</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">3</p>
              <p className="text-muted-foreground text-sm">Total Regions</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">8</p>
              <p className="text-muted-foreground text-sm">Active Operations Managers</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">24</p>
              <p className="text-muted-foreground text-sm">Active Dispatch Managers</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">97.8%</p>
              <p className="text-muted-foreground text-sm">SLA Compliance (30d)</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">47</p>
              <p className="text-muted-foreground text-sm">Escalations This Period</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-4">
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors">
                <Calendar className="w-5 h-5" />
                <span>Last 30 Days</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
                <span>All Regions</span>
              </button>
            </div>
          </div>

          {/* SLA Performance Summary */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">SLA Performance Summary</h2>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">Line chart showing SLA trend over time would display here</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Escalation Overview */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-foreground mb-4">Escalation Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-foreground">Total Escalations</p>
                    <p className="text-muted-foreground text-sm">Last 30 days</p>
                  </div>
                  <p className="text-2xl text-foreground">47</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-900">Approved</p>
                    <p className="text-2xl text-green-900 mt-1">34</p>
                    <p className="text-green-600 text-sm">72.3%</p>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-900">Rejected</p>
                    <p className="text-2xl text-red-900 mt-1">13</p>
                    <p className="text-red-600 text-sm">27.7%</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 text-sm">Average Response Time</p>
                  <p className="text-2xl text-blue-900 mt-1">18 minutes</p>
                </div>
              </div>
            </div>

            {/* Risk & Exception Trends */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-foreground mb-4">Risk & Exception Trends (Aggregated)</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-foreground">High-Risk Alerts</span>
                  </div>
                  <span className="text-foreground">23</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <span className="text-foreground">Driver Delays</span>
                  </div>
                  <span className="text-foreground">156</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-foreground">Route Deviations</span>
                  </div>
                  <span className="text-foreground">89</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-foreground">Capacity Warnings</span>
                  </div>
                  <span className="text-foreground">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Operations Managers Overview Table */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground">Operations Managers Overview</h2>
              <button className="text-primary hover:text-blue-700 text-sm">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Name</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Assigned Regions</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Dispatchers Covered</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Escalations Reviewed</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Approval Rate</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Avg Response Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: 'Sarah Johnson', regions: 'Northeast, Central', dispatchers: 8, escalations: 24, approvalRate: '75.0%', responseTime: '15 min' },
                    { name: 'Michael Chen', regions: 'West', dispatchers: 6, escalations: 18, approvalRate: '72.2%', responseTime: '22 min' },
                    { name: 'Emily Rodriguez', regions: 'Northeast', dispatchers: 10, escalations: 31, approvalRate: '67.7%', responseTime: '19 min' }
                  ].map((manager, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-foreground">{manager.name}</td>
                      <td className="px-4 py-3 text-foreground">{manager.regions}</td>
                      <td className="px-4 py-3 text-foreground">{manager.dispatchers}</td>
                      <td className="px-4 py-3 text-foreground">{manager.escalations}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-sm">
                          {manager.approvalRate}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">{manager.responseTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dispatch Managers Overview Table */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground">Dispatch Managers Overview</h2>
              <button className="text-primary hover:text-blue-700 text-sm">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Name</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Region / Depot</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Interventions</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">AI Accept Rate</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">SLA Save Rate</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Avg Decision Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: 'David Park', region: 'Northeast / Boston Hub', interventions: 127, aiAccept: '84%', slaSave: '92%', decisionTime: '3.2 min' },
                    { name: 'Lisa Wang', region: 'Central / Chicago Depot', interventions: 143, aiAccept: '78%', slaSave: '88%', decisionTime: '4.1 min' },
                    { name: 'Robert Kim', region: 'West / LA Depot', interventions: 156, aiAccept: '91%', slaSave: '95%', decisionTime: '2.8 min' }
                  ].map((dispatcher, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-foreground">{dispatcher.name}</td>
                      <td className="px-4 py-3 text-foreground">{dispatcher.region}</td>
                      <td className="px-4 py-3 text-foreground">{dispatcher.interventions}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-sm">
                          {dispatcher.aiAccept}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-sm">
                          {dispatcher.slaSave}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">{dispatcher.decisionTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
