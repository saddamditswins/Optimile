import { useState } from 'react';
import { Search, Filter, ChevronDown, X, ArrowLeft } from 'lucide-react';

interface Ticket {
  id: string;
  tenantName: string;
  category: 'Subscription' | 'AI & Feature Access' | 'Account & Access' | 'Platform Issue' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Acknowledged' | 'In Progress' | 'Resolved';
  createdDate: string;
  slaStatus: 'Within SLA' | 'Breached';
}

interface SuperAdminTicketListProps {
  onBack: () => void;
  onViewTicket: (ticketId: string) => void;
}

export function SuperAdminTicketList({ onBack, onViewTicket }: SuperAdminTicketListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock ticket data
  const allTickets: Ticket[] = [
    {
      id: 'TKT-1247',
      tenantName: 'GlobalLogistics Corp',
      category: 'Subscription',
      priority: 'Critical',
      status: 'Open',
      createdDate: '2026-01-04',
      slaStatus: 'Breached'
    },
    {
      id: 'TKT-1246',
      tenantName: 'FastFleet Inc',
      category: 'Platform Issue',
      priority: 'Critical',
      status: 'Acknowledged',
      createdDate: '2026-01-04',
      slaStatus: 'Breached'
    },
    {
      id: 'TKT-1245',
      tenantName: 'QuickShip LLC',
      category: 'AI & Feature Access',
      priority: 'High',
      status: 'In Progress',
      createdDate: '2026-01-05',
      slaStatus: 'Within SLA'
    },
    {
      id: 'TKT-1244',
      tenantName: 'MetroDelivery',
      category: 'Account & Access',
      priority: 'High',
      status: 'Open',
      createdDate: '2026-01-05',
      slaStatus: 'Within SLA'
    },
    {
      id: 'TKT-1243',
      tenantName: 'GlobalLogistics Corp',
      category: 'Subscription',
      priority: 'Medium',
      status: 'Open',
      createdDate: '2026-01-05',
      slaStatus: 'Within SLA'
    },
    {
      id: 'TKT-1242',
      tenantName: 'ExpressRoute Co',
      category: 'Platform Issue',
      priority: 'Critical',
      status: 'Open',
      createdDate: '2026-01-03',
      slaStatus: 'Breached'
    },
    {
      id: 'TKT-1241',
      tenantName: 'CityWide Logistics',
      category: 'AI & Feature Access',
      priority: 'Medium',
      status: 'Acknowledged',
      createdDate: '2026-01-05',
      slaStatus: 'Within SLA'
    },
    {
      id: 'TKT-1240',
      tenantName: 'RegionalTransport',
      category: 'Account & Access',
      priority: 'Low',
      status: 'In Progress',
      createdDate: '2026-01-06',
      slaStatus: 'Within SLA'
    },
    {
      id: 'TKT-1239',
      tenantName: 'GlobalLogistics Corp',
      category: 'Other',
      priority: 'Low',
      status: 'Open',
      createdDate: '2026-01-06',
      slaStatus: 'Within SLA'
    },
    {
      id: 'TKT-1238',
      tenantName: 'SwiftDeliveries',
      category: 'Subscription',
      priority: 'High',
      status: 'Open',
      createdDate: '2026-01-05',
      slaStatus: 'Within SLA'
    }
  ];

  // Apply search filter
  let filteredTickets = allTickets;
  if (searchQuery) {
    filteredTickets = filteredTickets.filter(t => 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tenantName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    
    if (sortColumn === 'priority') {
      const comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
      return sortDirection === 'asc' ? -comparison : comparison;
    }
    if (sortColumn === 'createdDate') {
      const comparison = new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
      return sortDirection === 'asc' ? comparison : -comparison;
    }
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-50 text-red-700 border border-red-200';
      case 'High': return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Low': return 'bg-blue-50 text-blue-700 border border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Acknowledged': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'In Progress': return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'Resolved': return 'bg-green-50 text-green-700 border border-green-200';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 sm:px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-foreground">Ticket Management</h1>
              <p className="text-muted-foreground text-sm">All tenant-raised tickets</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">

          <div className="bg-card rounded-lg shadow-sm border border-border">
            {/* Search and Filters Bar */}
            <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Ticket ID or Tenant Name..."
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
                className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="p-4 border-b border-border bg-muted">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Category</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All Categories</option>
                      <option>Subscription</option>
                      <option>AI & Feature Access</option>
                      <option>Account & Access</option>
                      <option>Platform Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Priority</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All Priorities</option>
                      <option>Critical</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Status</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All Statuses</option>
                      <option>Open</option>
                      <option>Acknowledged</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">SLA Status</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>All</option>
                      <option>Within SLA</option>
                      <option>Breached</option>
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

            {/* Ticket Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">
                      Ticket ID
                    </th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">
                      Tenant Name
                    </th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">
                      Category
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('priority')}
                    >
                      <div className="flex items-center gap-2">
                        Priority
                        {sortColumn === 'priority' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">
                      Status
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-foreground text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSort('createdDate')}
                    >
                      <div className="flex items-center gap-2">
                        Created Date
                        {sortColumn === 'createdDate' && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">
                      SLA Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sortedTickets.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <p className="text-muted-foreground">No tickets match your criteria</p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          Reset filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    sortedTickets.map((ticket) => (
                      <tr 
                        key={ticket.id} 
                        onClick={() => onViewTicket(ticket.id)}
                        className="hover:bg-accent transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3">
                          <p className="text-foreground">{ticket.id}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-foreground">{ticket.tenantName}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-foreground text-sm">{ticket.category}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-foreground text-sm">{ticket.createdDate}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            ticket.slaStatus === 'Breached'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-green-50 text-green-700 border border-green-200'
                          }`}>
                            {ticket.slaStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {sortedTickets.length > 0 && (
              <div className="p-4 border-t border-border flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedTickets.length} of {sortedTickets.length} tickets
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
