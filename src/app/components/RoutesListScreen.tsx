import { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  TrendingUp, 
  RefreshCw,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown
} from 'lucide-react';
import { RouteTableRow } from './RouteTableRow';

export interface Route {
  id: string;
  routeId: string;
  driverName: string;
  healthStatus: 'On Track' | 'At Risk' | 'Breached';
  remainingStops: number;
  worstSlaCountdown: number; // minutes
  delayMinutes: number;
  lastActivity: string;
  riskContext?: string;
}

interface RoutesListScreenProps {
  onRouteClick: (routeId: string) => void;
}

export function RoutesListScreen({ onRouteClick }: RoutesListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepot, setSelectedDepot] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'sla' | 'delay'>('sla');
  const [lastUpdated] = useState<Date>(new Date());

  // Mock route data
  const routes: Route[] = [
    {
      id: '1',
      routeId: 'RT-2847',
      driverName: 'Driver #247',
      healthStatus: 'Breached',
      remainingStops: 8,
      worstSlaCountdown: 12,
      delayMinutes: 22,
      lastActivity: '2 min ago',
      riskContext: 'Heavy traffic on primary route causing 22-min accumulated delay'
    },
    {
      id: '2',
      routeId: 'RT-3901',
      driverName: 'Driver #189',
      healthStatus: 'At Risk',
      remainingStops: 12,
      worstSlaCountdown: 25,
      delayMinutes: 15,
      lastActivity: '5 min ago',
      riskContext: 'Slow execution pace, running 15 min behind schedule'
    },
    {
      id: '3',
      routeId: 'RT-4523',
      driverName: 'Driver #352',
      healthStatus: 'At Risk',
      remainingStops: 6,
      worstSlaCountdown: 45,
      delayMinutes: 8,
      lastActivity: '1 min ago',
      riskContext: 'Minor delays accumulating across multiple stops'
    },
    {
      id: '4',
      routeId: 'RT-5891',
      driverName: 'Driver #428',
      healthStatus: 'On Track',
      remainingStops: 9,
      worstSlaCountdown: 92,
      delayMinutes: 0,
      lastActivity: '3 min ago'
    },
    {
      id: '5',
      routeId: 'RT-6734',
      driverName: 'Driver #531',
      healthStatus: 'On Track',
      remainingStops: 14,
      worstSlaCountdown: 105,
      delayMinutes: 0,
      lastActivity: '4 min ago'
    },
    {
      id: '6',
      routeId: 'RT-7128',
      driverName: 'Driver #612',
      healthStatus: 'At Risk',
      remainingStops: 11,
      worstSlaCountdown: 38,
      delayMinutes: 12,
      lastActivity: '6 min ago',
      riskContext: 'Driver reported navigation issues, causing 12-min delay'
    },
    {
      id: '7',
      routeId: 'RT-8456',
      driverName: 'Driver #289',
      healthStatus: 'On Track',
      remainingStops: 7,
      worstSlaCountdown: 78,
      delayMinutes: 0,
      lastActivity: 'Just now'
    },
    {
      id: '8',
      routeId: 'RT-9012',
      driverName: 'Driver #745',
      healthStatus: 'On Track',
      remainingStops: 15,
      worstSlaCountdown: 120,
      delayMinutes: 0,
      lastActivity: '2 min ago'
    },
    {
      id: '9',
      routeId: 'RT-1534',
      driverName: 'Driver #823',
      healthStatus: 'At Risk',
      remainingStops: 10,
      worstSlaCountdown: 33,
      delayMinutes: 9,
      lastActivity: '7 min ago',
      riskContext: 'Multiple failed delivery attempts causing delays'
    },
    {
      id: '10',
      routeId: 'RT-2198',
      driverName: 'Driver #156',
      healthStatus: 'Breached',
      remainingStops: 5,
      worstSlaCountdown: 8,
      delayMinutes: 28,
      lastActivity: '1 min ago',
      riskContext: 'Critical: Vehicle breakdown reported, 28-min delay and escalating'
    }
  ];

  // Filter and sort routes
  const filteredRoutes = routes
    .filter(route => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!route.routeId.toLowerCase().includes(query) && 
            !route.driverName.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      // Status filter
      if (selectedStatus !== 'all' && route.healthStatus !== selectedStatus) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'sla') {
        return a.worstSlaCountdown - b.worstSlaCountdown;
      } else {
        return b.delayMinutes - a.delayMinutes;
      }
    });

  const handleRouteClick = (route: Route) => {
    onRouteClick(route.routeId);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes === 1) return '1 min ago';
    return `${minutes} min ago`;
  };

  const statusCounts = {
    total: routes.length,
    onTrack: routes.filter(r => r.healthStatus === 'On Track').length,
    atRisk: routes.filter(r => r.healthStatus === 'At Risk').length,
    breached: routes.filter(r => r.healthStatus === 'Breached').length
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-slate-900 mb-1">Routes</h1>
              <p className="text-slate-600 text-sm">
                Monitor and manage all active delivery routes
              </p>
            </div>

            {/* Data Freshness */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-sm">Live data</span>
              </div>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 text-sm">Updated {formatTimeAgo(lastUpdated)}</span>
              <button
                className="ml-2 p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Context Row */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Wednesday, Dec 31, 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Morning Shift (6:00 AM - 2:00 PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Central Depot · Northeast Region</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Status Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="text-slate-600 text-sm mb-1">Total Routes</div>
              <div className="text-slate-900 text-2xl">{statusCounts.total}</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-700 text-sm mb-1">On Track</div>
              <div className="text-green-900 text-2xl">{statusCounts.onTrack}</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="text-amber-700 text-sm mb-1">At Risk</div>
              <div className="text-amber-900 text-2xl">{statusCounts.atRisk}</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-700 text-sm mb-1">Breached</div>
              <div className="text-red-900 text-2xl">{statusCounts.breached}</div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 p-4">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by route ID or driver name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="On Track">On Track</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Breached">Breached</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'sla' | 'delay')}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
                >
                  <option value="sla">Sort by SLA Urgency</option>
                  <option value="delay">Sort by Delay</option>
                </select>
              </div>
            </div>
          </div>

          {/* Routes Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Route ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Health Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Remaining Stops
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Worst SLA
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Delay
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Last Activity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredRoutes.map((route) => (
                    <RouteTableRow
                      key={route.id}
                      route={route}
                      onClick={() => handleRouteClick(route)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRoutes.length === 0 && (
              <div className="px-6 py-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600">No routes match your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStatus('all');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Results Summary */}
          {filteredRoutes.length > 0 && (
            <div className="mt-4 text-center text-sm text-slate-600">
              Showing {filteredRoutes.length} of {routes.length} routes
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
