import { Building2, CheckCircle, XCircle, AlertTriangle, Activity, TrendingUp, DollarSign } from 'lucide-react';

export function SuperAdminDashboard() {
  // Mock data for tenants requiring attention
  const tenantsAtRisk = [
    { name: 'ACME Logistics', status: 'At Risk', plan: 'Enterprise', risk: ['High Cost', 'Low SLA'], aiStatus: 'Enabled', lastEscalation: '2 days ago' },
    { name: 'GlobalShip Inc', status: 'Suspended', plan: 'Pro', risk: ['Payment Failed'], aiStatus: 'Disabled', lastEscalation: '5 days ago' },
    { name: 'FastTrack Delivery', status: 'At Risk', plan: 'Enterprise', risk: ['AI Degraded'], aiStatus: 'Degraded', lastEscalation: '1 day ago' },
    { name: 'QuickCourier LLC', status: 'Active', plan: 'Basic', risk: ['Plan Limit'], aiStatus: 'Enabled', lastEscalation: '3 days ago' },
    { name: 'MetroTransit Co', status: 'At Risk', plan: 'Pro', risk: ['Integration Issue'], aiStatus: 'Enabled', lastEscalation: '6 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Platform-level oversight and governance</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* STEP 1 — KPI STRIP */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Total Tenants */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">247</p>
              <p className="text-muted-foreground text-sm">Total Tenants</p>
              <p className="text-muted-foreground text-xs mt-1">All platform tenants</p>
            </div>

            {/* Active Tenants */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">231</p>
              <p className="text-muted-foreground text-sm">Active Tenants</p>
              <p className="text-muted-foreground text-xs mt-1">Currently operational</p>
            </div>

            {/* Suspended Tenants */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">12</p>
              <p className="text-muted-foreground text-sm">Suspended Tenants</p>
              <p className="text-muted-foreground text-xs mt-1">Access restricted</p>
            </div>

            {/* Active Subscriptions */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">235</p>
              <p className="text-muted-foreground text-sm">Active Subscriptions</p>
              <p className="text-muted-foreground text-xs mt-1">Billable plans</p>
            </div>

            {/* Open Support Tickets */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">47</p>
              <p className="text-muted-foreground text-sm">Open Support Tickets</p>
              <p className="text-muted-foreground text-xs mt-1">Requires attention</p>
            </div>
          </div>

          {/* STEP 2 — REVENUE TREND */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-foreground mb-1">Revenue Trend</h2>
                <p className="text-muted-foreground text-sm">Monthly revenue over last 6 months</p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">+12.3% vs last period</span>
              </div>
            </div>
            
            {/* Revenue Chart (Simplified Bar Chart) */}
            <div className="h-64 flex items-end justify-between gap-4">
              {[
                { month: 'Jul', revenue: 427, tenants: 218 },
                { month: 'Aug', revenue: 445, tenants: 223 },
                { month: 'Sep', revenue: 468, tenants: 229 },
                { month: 'Oct', revenue: 482, tenants: 234 },
                { month: 'Nov', revenue: 501, tenants: 238 },
                { month: 'Dec', revenue: 523, tenants: 247 }
              ].map((data, index) => {
                const maxRevenue = 600;
                const heightPercent = (data.revenue / maxRevenue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col items-center gap-2">
                      <span className="text-xs text-muted-foreground">${data.revenue}K</span>
                      <div 
                        className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600" 
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-foreground">{data.month}</p>
                      <p className="text-xs text-muted-foreground">{data.tenants} tenants</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3 — SUBSCRIPTION MIX */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Donut Chart */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-foreground mb-6">Subscription Mix</h2>
              
              <div className="flex items-center justify-center mb-6">
                {/* Simple Donut Chart Representation */}
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Basic: 28% = 100.48 units (circumference ≈ 359) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="20"
                      strokeDasharray="70.4 251.2"
                      strokeDashoffset="0"
                    />
                    {/* Pro: 45% = 161.55 units */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="20"
                      strokeDasharray="113.1 208.5"
                      strokeDashoffset="-70.4"
                    />
                    {/* Enterprise: 27% = 96.93 units */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="20"
                      strokeDasharray="67.9 253.7"
                      strokeDashoffset="-183.5"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl text-foreground">247</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-foreground text-sm">Basic</span>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground">69</span>
                    <span className="text-muted-foreground text-sm ml-2">(28%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-foreground text-sm">Pro</span>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground">111</span>
                    <span className="text-muted-foreground text-sm ml-2">(45%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full" />
                    <span className="text-foreground text-sm">Enterprise</span>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground">67</span>
                    <span className="text-muted-foreground text-sm ml-2">(27%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-foreground mb-6">Plan Distribution Insights</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-900">Basic Tier</span>
                    <span className="text-blue-900">28%</span>
                  </div>
                  <p className="text-blue-700 text-sm">Entry-level adoption strong</p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-900">Pro Tier</span>
                    <span className="text-green-900">45%</span>
                  </div>
                  <p className="text-green-700 text-sm">Largest segment, healthy growth</p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-900">Enterprise Tier</span>
                    <span className="text-amber-900">27%</span>
                  </div>
                  <p className="text-amber-700 text-sm">High-value segment stable</p>
                </div>

                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-700" />
                    <span className="text-red-900">Plan Limit Alert</span>
                  </div>
                  <p className="text-red-700 text-sm">8 tenants exceeding plan limits</p>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4 — TENANT RISK & ATTENTION GRID */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-foreground mb-1">Tenants Requiring Attention</h2>
                <p className="text-muted-foreground text-sm">Tenants with governance or operational risks</p>
              </div>
              <button className="text-primary hover:text-blue-700 text-sm">View All Tenants</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Tenant Name</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Subscription Plan</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Risk Reason</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">AI Status</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Last Escalation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tenantsAtRisk.map((tenant, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors cursor-pointer">
                      <td className="px-4 py-3 text-foreground">{tenant.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          tenant.status === 'Active' 
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : tenant.status === 'Suspended'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {tenant.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">{tenant.plan}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {tenant.risk.map((risk, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs">
                              {risk}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          tenant.aiStatus === 'Enabled'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : tenant.aiStatus === 'Disabled'
                            ? 'bg-slate-50 text-slate-600 border border-slate-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {tenant.aiStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{tenant.lastEscalation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* STEP 5 — AI GOVERNANCE SNAPSHOT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* AI Enabled vs Disabled */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-foreground mb-4">AI Enabled vs Disabled</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">AI Enabled</span>
                  <span className="text-foreground">219</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">AI Disabled</span>
                  <span className="text-foreground">28</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '11%' }} />
                </div>
              </div>
            </div>

            {/* AI Overrides / Guardrail Breaches */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-foreground mb-4">AI Overrides & Guardrails</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="text-amber-900 text-sm">Total Overrides (30d)</span>
                  <span className="text-2xl text-amber-900">143</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-red-900 text-sm">Guardrail Breaches</span>
                  <span className="text-2xl text-red-900">7</span>
                </div>
              </div>
            </div>

            {/* AI Confidence Issues */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-foreground mb-4">AI Confidence Issues</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-blue-900 text-sm">Low Confidence Alerts</span>
                  <span className="text-2xl text-blue-900">34</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="text-amber-900 text-sm">AI Suppressed</span>
                  <span className="text-2xl text-amber-900">12</span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-3">Due to data quality issues</p>
            </div>
          </div>

          {/* STEP 6 — SUPPORT & ESCALATION SUMMARY */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-foreground mb-1">Support & Escalation Summary</h2>
                <p className="text-muted-foreground text-sm">Platform-level support and escalation metrics</p>
              </div>
              <button className="text-primary hover:text-blue-700 text-sm">View Support Module</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm mb-2">Open Platform Escalations</p>
                <p className="text-3xl text-foreground">18</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm mb-2">Average Response SLA</p>
                <p className="text-3xl text-foreground">2.4h</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm mb-2">Tenants with Repeated Escalations</p>
                <p className="text-3xl text-foreground">5</p>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm mb-2">Critical Incidents</p>
                <p className="text-3xl text-red-900">2</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}