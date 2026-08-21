import { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, X, ArrowLeft } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  tier: 'Basic' | 'Pro' | 'Enterprise' | 'Custom';
  tenantCount: number;
  limitsummary: string;
  status: 'Active' | 'Deprecated';
  version: string;
}

interface SuperAdminPlanManagementProps {
  onBack: () => void;
  onViewPlan: (planId: string) => void;
  onCreatePlan: () => void;
}

export function SuperAdminPlanManagement({ onBack, onViewPlan, onCreatePlan }: SuperAdminPlanManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock plan data
  const allPlans: Plan[] = [
    { 
      id: 'PLAN-001', 
      name: 'Basic', 
      tier: 'Basic', 
      tenantCount: 69, 
      limitsummary: '10 users, 5 admin users, 1 region',
      status: 'Active',
      version: 'v3.2'
    },
    { 
      id: 'PLAN-002', 
      name: 'Pro', 
      tier: 'Pro', 
      tenantCount: 111, 
      limitsummary: '50 users, 10 admin users, 3 regions',
      status: 'Active',
      version: 'v2.8'
    },
    { 
      id: 'PLAN-003', 
      name: 'Enterprise', 
      tier: 'Enterprise', 
      tenantCount: 67, 
      limitsummary: 'Unlimited users, unlimited admin users, unlimited regions',
      status: 'Active',
      version: 'v4.1'
    },
    { 
      id: 'PLAN-004', 
      name: 'Starter (Legacy)', 
      tier: 'Basic', 
      tenantCount: 0, 
      limitsummary: '5 users, 2 admin users, 1 region',
      status: 'Deprecated',
      version: 'v1.0'
    },
    { 
      id: 'PLAN-005', 
      name: 'Pro Plus', 
      tier: 'Pro', 
      tenantCount: 23, 
      limitsummary: '100 users, 20 admin users, 5 regions',
      status: 'Active',
      version: 'v1.5'
    },
    { 
      id: 'PLAN-006', 
      name: 'Enterprise Premium', 
      tier: 'Enterprise', 
      tenantCount: 12, 
      limitsummary: 'Unlimited users, unlimited admin users, unlimited regions',
      status: 'Active',
      version: 'v2.0'
    }
  ];

  // Apply search filter
  let filteredPlans = allPlans;
  if (searchQuery) {
    filteredPlans = filteredPlans.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="text-foreground">Plan Management</h1>
                <p className="text-muted-foreground text-sm">Manage all subscription plan templates</p>
              </div>
              <button
                onClick={onCreatePlan}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Plan
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-card rounded-lg shadow-sm border border-border">
            {/* Search and Filters Bar */}
            <div className="p-4 border-b border-border flex items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by plan name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Advanced Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="p-4 border-b border-border bg-muted">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Tier</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All Tiers</option>
                      <option>Basic</option>
                      <option>Pro</option>
                      <option>Enterprise</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Status</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All</option>
                      <option>Active</option>
                      <option>Deprecated</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Region Availability</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All Regions</option>
                      <option>North America</option>
                      <option>Europe</option>
                      <option>Asia Pacific</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Plan Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Plan Name
                        {sortColumn === 'name' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('tier')}
                    >
                      <div className="flex items-center gap-2">
                        Tier
                        {sortColumn === 'tier' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('tenantCount')}
                    >
                      <div className="flex items-center gap-2">
                        Tenants on Plan
                        {sortColumn === 'tenantCount' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Core Limits Summary</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Version</th>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {sortColumn === 'status' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPlans.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center">
                        <p className="text-muted-foreground">No plans match your criteria</p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          Reset filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredPlans.map((plan) => (
                      <tr 
                        key={plan.id} 
                        onClick={() => onViewPlan(plan.id)}
                        className="hover:bg-accent transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-foreground">{plan.name}</p>
                            <p className="text-muted-foreground text-xs">{plan.id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            plan.tier === 'Basic' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : plan.tier === 'Pro'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : plan.tier === 'Enterprise'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}>
                            {plan.tier}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-foreground text-lg">{plan.tenantCount}</span>
                            {plan.tenantCount === 0 && (
                              <span className="text-muted-foreground text-xs">(unused)</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-foreground text-sm">{plan.limitsummary}</td>
                        <td className="px-4 py-3 text-muted-foreground text-sm">{plan.version}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            plan.status === 'Active'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-slate-50 text-slate-600 border border-slate-200'
                          }`}>
                            {plan.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredPlans.length > 0 && (
              <div className="p-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPlans.length} of {filteredPlans.length} plans
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-border rounded hover:bg-accent text-sm disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
                    1
                  </button>
                  <button className="px-3 py-1 border border-border rounded hover:bg-accent text-sm disabled:opacity-50" disabled>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}