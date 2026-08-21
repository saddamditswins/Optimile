import { Package, Users, AlertTriangle, Settings } from 'lucide-react';

interface SuperAdminSubscriptionOverviewProps {
  onViewPlans: () => void;
}

export function SuperAdminSubscriptionOverview({ onViewPlans }: SuperAdminSubscriptionOverviewProps) {
  // Mock plan distribution data
  const planDistribution = [
    { name: 'Basic', count: 69, percentage: 28, color: 'bg-blue-500' },
    { name: 'Pro', count: 111, percentage: 45, color: 'bg-green-500' },
    { name: 'Enterprise', count: 67, percentage: 27, color: 'bg-amber-500' },
    { name: 'Custom', count: 0, percentage: 0, color: 'bg-purple-500' }
  ];

  const totalTenants = planDistribution.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 sm:px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-foreground">Subscription Management</h1>
          <p className="text-muted-foreground text-sm">Platform-level subscription governance and plan control</p>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* SECTION 1 — KPI STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Subscription Plans */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">8</p>
              <p className="text-muted-foreground text-sm">Total Subscription Plans</p>
              <p className="text-muted-foreground text-xs mt-1">All plan templates</p>
            </div>

            {/* Active Plans */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">7</p>
              <p className="text-muted-foreground text-sm">Active Plans</p>
              <p className="text-muted-foreground text-xs mt-1">Used by ≥1 tenant</p>
            </div>

            {/* Inactive Plans */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-slate-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">1</p>
              <p className="text-muted-foreground text-sm">Inactive Plans</p>
              <p className="text-muted-foreground text-xs mt-1">Defined but not assigned</p>
            </div>

            {/* Custom Plans */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">0</p>
              <p className="text-muted-foreground text-sm">Custom Plans</p>
              <p className="text-muted-foreground text-xs mt-1">Tenant-specific</p>
            </div>

            {/* Tenants Over Limits */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-3xl text-foreground mb-1">8</p>
              <p className="text-muted-foreground text-sm">Over Subscription Limits</p>
              <p className="text-muted-foreground text-xs mt-1">Exceeding plan limits</p>
            </div>
          </div>

          {/* SECTION 2 — PLAN DISTRIBUTION SNAPSHOT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Donut Chart */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-foreground mb-6">Plan Distribution</h2>
              
              <div className="flex items-center justify-center mb-6">
                {/* Simple Donut Chart Representation */}
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Basic: 28% */}
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
                    {/* Pro: 45% */}
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
                    {/* Enterprise: 27% */}
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
                      <p className="text-2xl text-foreground">{totalTenants}</p>
                      <p className="text-xs text-muted-foreground">Tenants</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {planDistribution.filter(p => p.count > 0).map((plan, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${plan.color} rounded-full`} />
                      <span className="text-foreground text-sm">{plan.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-foreground">{plan.count}</span>
                      <span className="text-muted-foreground text-sm ml-2">({plan.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Insights */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-foreground mb-6">Plan Insights & Risks</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-900">Healthy Distribution</span>
                    <span className="text-green-900">45%</span>
                  </div>
                  <p className="text-green-700 text-sm">Pro tier is most popular, balanced growth</p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-900">Basic Adoption</span>
                    <span className="text-blue-900">28%</span>
                  </div>
                  <p className="text-blue-700 text-sm">Strong entry-level adoption</p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-900">Enterprise Segment</span>
                    <span className="text-amber-900">27%</span>
                  </div>
                  <p className="text-amber-700 text-sm">High-value segment stable</p>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-700" />
                    <span className="text-red-900">Over-Limit Tenants</span>
                  </div>
                  <p className="text-red-700 text-sm mb-2">8 tenants exceeding plan limits</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-red-600">Basic: 2</p>
                    </div>
                    <div>
                      <p className="text-red-600">Pro: 4</p>
                    </div>
                    <div>
                      <p className="text-red-600">Enterprise: 2</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-900">Custom Plans</span>
                    <span className="text-purple-900">0</span>
                  </div>
                  <p className="text-purple-700 text-sm">No custom plans (low complexity risk)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-foreground mb-1">Plan Management</h2>
                <p className="text-muted-foreground text-sm">View and manage all subscription plan templates</p>
              </div>
              <button
                onClick={onViewPlans}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
              >
                Manage Plans
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
