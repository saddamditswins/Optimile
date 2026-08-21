import { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, X } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  status: 'Requested' | 'Active' | 'Restricted' | 'Suspended';
  plan: string;
  country: string;
  enabledRoles: string[];
  aiStatus: 'Allowed' | 'Disabled' | 'Restricted';
  usage: 'Within' | 'Exceeded';
  activityStatus: 'Active' | 'Dormant' | 'Never Activated';
}

interface SuperAdminTenantManagementProps {
  onViewTenant: (tenantId: string) => void;
  onAddTenant: () => void;
}

export function SuperAdminTenantManagement({ onViewTenant, onAddTenant }: SuperAdminTenantManagementProps) {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock tenant data
  const allTenants: Tenant[] = [
    { id: 'TN-001', name: 'ACME Logistics', status: 'Active', plan: 'Enterprise', country: 'United States', enabledRoles: ['Admin', 'User'], aiStatus: 'Allowed', usage: 'Within', activityStatus: 'Active' },
    { id: 'TN-002', name: 'GlobalShip Inc', status: 'Suspended', plan: 'Pro', country: 'United Kingdom', enabledRoles: ['User'], aiStatus: 'Disabled', usage: 'Exceeded', activityStatus: 'Dormant' },
    { id: 'TN-003', name: 'FastTrack Delivery', status: 'Active', plan: 'Enterprise', country: 'Canada', enabledRoles: ['Admin', 'User'], aiStatus: 'Allowed', usage: 'Within', activityStatus: 'Active' },
    { id: 'TN-004', name: 'QuickCourier LLC', status: 'Active', plan: 'Basic', country: 'United States', enabledRoles: ['User'], aiStatus: 'Allowed', usage: 'Exceeded', activityStatus: 'Active' },
    { id: 'TN-005', name: 'MetroTransit Co', status: 'Restricted', plan: 'Pro', country: 'Australia', enabledRoles: ['Admin'], aiStatus: 'Restricted', usage: 'Within', activityStatus: 'Active' },
    { id: 'TN-006', name: 'SwiftMove Express', status: 'Active', plan: 'Enterprise', country: 'Germany', enabledRoles: ['Admin', 'User'], aiStatus: 'Allowed', usage: 'Within', activityStatus: 'Active' },
    { id: 'TN-007', name: 'CityDirect Logistics', status: 'Requested', plan: 'Pro', country: 'France', enabledRoles: ['User'], aiStatus: 'Allowed', usage: 'Within', activityStatus: 'Never Activated' },
    { id: 'TN-008', name: 'PrimeDelivery Services', status: 'Active', plan: 'Basic', country: 'Spain', enabledRoles: ['User'], aiStatus: 'Disabled', usage: 'Within', activityStatus: 'Active' },
  ];

  // Calculate KPI counts
  const totalTenants = allTenants.length;
  const activeTenants = allTenants.filter(t => t.status === 'Active').length;
  const restrictedTenants = allTenants.filter(t => t.status === 'Restricted').length;
  const suspendedTenants = allTenants.filter(t => t.status === 'Suspended').length;
  const newRequests = allTenants.filter(t => t.status === 'Requested').length;

  // Filter tenants based on selected KPI
  let filteredTenants = allTenants;
  if (selectedKPI === 'active') {
    filteredTenants = allTenants.filter(t => t.status === 'Active');
  } else if (selectedKPI === 'restricted') {
    filteredTenants = allTenants.filter(t => t.status === 'Restricted');
  } else if (selectedKPI === 'suspended') {
    filteredTenants = allTenants.filter(t => t.status === 'Suspended');
  } else if (selectedKPI === 'requested') {
    filteredTenants = allTenants.filter(t => t.status === 'Requested');
  }

  // Apply search filter
  if (searchQuery) {
    filteredTenants = filteredTenants.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-foreground">Tenant Management</h1>
            <p className="text-muted-foreground text-sm">Platform-level tenant governance and lifecycle control</p>
          </div>
          <button
            onClick={onAddTenant}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Tenant
          </button>
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* SECTION 1 — KPI STRIP (CLICKABLE FILTERS) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Total Tenants */}
            <button
              onClick={() => setSelectedKPI(null)}
              className={`bg-card border rounded-lg p-6 shadow-sm text-left transition-all ${
                selectedKPI === null 
                  ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' 
                  : 'border-border hover:border-blue-300'
              }`}
            >
              <p className="text-3xl text-foreground mb-1">{totalTenants}</p>
              <p className="text-muted-foreground text-sm">Total Tenants</p>
              <p className="text-muted-foreground text-xs mt-1">All tenants</p>
            </button>

            {/* Active Tenants */}
            <button
              onClick={() => setSelectedKPI('active')}
              className={`bg-card border rounded-lg p-6 shadow-sm text-left transition-all ${
                selectedKPI === 'active' 
                  ? 'border-green-500 ring-2 ring-green-200 shadow-md' 
                  : 'border-border hover:border-green-300'
              }`}
            >
              <p className="text-3xl text-foreground mb-1">{activeTenants}</p>
              <p className="text-muted-foreground text-sm">Active Tenants</p>
              <p className="text-muted-foreground text-xs mt-1">Live & billable</p>
            </button>

            {/* Restricted Tenants */}
            <button
              onClick={() => setSelectedKPI('restricted')}
              className={`bg-card border rounded-lg p-6 shadow-sm text-left transition-all ${
                selectedKPI === 'restricted' 
                  ? 'border-amber-500 ring-2 ring-amber-200 shadow-md' 
                  : 'border-border hover:border-amber-300'
              }`}
            >
              <p className="text-3xl text-foreground mb-1">{restrictedTenants}</p>
              <p className="text-muted-foreground text-sm">Restricted Tenants</p>
              <p className="text-muted-foreground text-xs mt-1">Limited access</p>
            </button>

            {/* Suspended Tenants */}
            <button
              onClick={() => setSelectedKPI('suspended')}
              className={`bg-card border rounded-lg p-6 shadow-sm text-left transition-all ${
                selectedKPI === 'suspended' 
                  ? 'border-red-500 ring-2 ring-red-200 shadow-md' 
                  : 'border-border hover:border-red-300'
              }`}
            >
              <p className="text-3xl text-foreground mb-1">{suspendedTenants}</p>
              <p className="text-muted-foreground text-sm">Suspended Tenants</p>
              <p className="text-muted-foreground text-xs mt-1">Access revoked</p>
            </button>

            {/* New Requests */}
            <button
              onClick={() => setSelectedKPI('requested')}
              className={`bg-card border rounded-lg p-6 shadow-sm text-left transition-all ${
                selectedKPI === 'requested' 
                  ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' 
                  : 'border-border hover:border-blue-300'
              }`}
            >
              <p className="text-3xl text-foreground mb-1">{newRequests}</p>
              <p className="text-muted-foreground text-sm">New Requests</p>
              <p className="text-muted-foreground text-xs mt-1">Pending approval</p>
            </button>
          </div>

          {/* Active Filter Indicator */}
          {selectedKPI && (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm">
                Filtered by: {selectedKPI === 'active' ? 'Active Tenants' : selectedKPI === 'restricted' ? 'Restricted Tenants' : selectedKPI === 'suspended' ? 'Suspended Tenants' : 'New Requests'}
              </span>
              <button
                onClick={() => setSelectedKPI(null)}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Reset to All
              </button>
            </div>
          )}

          {/* SECTION 2 — TENANT GRID */}
          <div className="bg-card rounded-lg shadow-sm border border-border">
            {/* Search and Filters Bar */}
            <div className="p-4 border-b border-border flex items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by tenant name, ID, email, or domain..."
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
                Advanced Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="p-4 border-b border-border bg-muted">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Status</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All Statuses</option>
                      <option>Requested</option>
                      <option>Active</option>
                      <option>Restricted</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Subscription Plan</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All Plans</option>
                      <option>Basic</option>
                      <option>Pro</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Country / Region</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All Countries</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">AI Status</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All</option>
                      <option>Allowed</option>
                      <option>Disabled</option>
                      <option>Restricted</option>
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

            {/* Tenant Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Tenant Name
                        {sortColumn === 'name' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
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
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('plan')}
                    >
                      <div className="flex items-center gap-2">
                        Subscription Plan
                        {sortColumn === 'plan' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Enabled Roles</th>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('country')}
                    >
                      <div className="flex items-center gap-2">
                        Country / Region
                        {sortColumn === 'country' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">AI Status</th>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('usage')}
                    >
                      <div className="flex items-center gap-2">
                        Usage vs Plan
                        {sortColumn === 'usage' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('activityStatus')}
                    >
                      <div className="flex items-center gap-2">
                        Activity Status
                        {sortColumn === 'activityStatus' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredTenants.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center">
                        <p className="text-muted-foreground">No tenants match your criteria</p>
                        <button
                          onClick={() => {
                            setSelectedKPI(null);
                            setSearchQuery('');
                          }}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          Reset filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredTenants.map((tenant) => (
                      <tr 
                        key={tenant.id} 
                        onClick={() => onViewTenant(tenant.id)}
                        className="hover:bg-accent transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-foreground">{tenant.name}</p>
                            <p className="text-muted-foreground text-xs">{tenant.id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            tenant.status === 'Active' 
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : tenant.status === 'Suspended'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : tenant.status === 'Restricted'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {tenant.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground">{tenant.plan}</td>
                        <td className="px-4 py-3 text-foreground">{tenant.enabledRoles.join(', ')}</td>
                        <td className="px-4 py-3 text-foreground">{tenant.country}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            tenant.aiStatus === 'Allowed'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : tenant.aiStatus === 'Disabled'
                              ? 'bg-slate-50 text-slate-600 border border-slate-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {tenant.aiStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            tenant.usage === 'Exceeded'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-green-50 text-green-700 border border-green-200'
                          }`}>
                            {tenant.usage}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            tenant.activityStatus === 'Active'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : tenant.activityStatus === 'Dormant'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {tenant.activityStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredTenants.length > 0 && (
              <div className="p-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTenants.length} of {filteredTenants.length} tenants
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