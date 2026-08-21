import { useState } from 'react';
import { 
  Clock, 
  RefreshCw,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  MapPin,
  Radio
} from 'lucide-react';
import { DriverTableRow, Driver } from './DriverTableRow';

interface DriversOverviewScreenProps {
  onDriverClick: (driverId: string) => void;
}

export function DriversOverviewScreen({ onDriverClick }: DriversOverviewScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepot, setSelectedDepot] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const [selectedFeasibility, setSelectedFeasibility] = useState('all');
  const [sortBy, setSortBy] = useState<'shift' | 'capacity' | 'risk'>('shift');

  // Mock drivers data
  const drivers: Driver[] = [
    {
      id: '1',
      driverId: 'DRV-247',
      driverName: 'Driver #247',
      executionState: 'En Route',
      assignedRoute: 'RT-2847',
      remainingStops: 8,
      remainingShiftMinutes: 163,
      capacityStatus: 'Available',
      executionRisk: 'High',
      lastSignalTime: '2 min ago',
      lastSignalStatus: 'active',
      feasibility: {
        canReassign: false,
        canRescue: false,
        canLoadTransfer: true,
        reasons: {
          reassign: 'Currently executing critical route',
          rescue: 'Insufficient shift time remaining',
          loadTransfer: null
        }
      },
      depot: 'North Station'
    },
    {
      id: '2',
      driverId: 'DRV-312',
      driverName: 'Driver #312',
      executionState: 'Available',
      assignedRoute: null,
      remainingStops: 0,
      remainingShiftMinutes: 245,
      capacityStatus: 'Available',
      executionRisk: null,
      lastSignalTime: '1 min ago',
      lastSignalStatus: 'active',
      feasibility: {
        canReassign: true,
        canRescue: true,
        canLoadTransfer: true,
        reasons: {
          reassign: null,
          rescue: null,
          loadTransfer: null
        }
      },
      depot: 'North Station'
    },
    {
      id: '3',
      driverId: 'DRV-428',
      driverName: 'Driver #428',
      executionState: 'At Stop',
      assignedRoute: 'RT-3156',
      remainingStops: 12,
      remainingShiftMinutes: 198,
      capacityStatus: 'Available',
      executionRisk: 'Medium',
      lastSignalTime: 'Just now',
      lastSignalStatus: 'active',
      feasibility: {
        canReassign: false,
        canRescue: true,
        canLoadTransfer: true,
        reasons: {
          reassign: 'Currently at customer location',
          rescue: null,
          loadTransfer: null
        }
      },
      depot: 'North Station'
    },
    {
      id: '4',
      driverId: 'DRV-591',
      driverName: 'Driver #591',
      executionState: 'En Route',
      assignedRoute: 'RT-4782',
      remainingStops: 15,
      remainingShiftMinutes: 87,
      capacityStatus: 'Near Limit',
      executionRisk: 'Critical',
      lastSignalTime: '3 min ago',
      lastSignalStatus: 'active',
      feasibility: {
        canReassign: false,
        canRescue: false,
        canLoadTransfer: false,
        reasons: {
          reassign: 'Executing high-priority route',
          rescue: 'Less than 90 minutes shift time remaining',
          loadTransfer: 'Near capacity limit'
        }
      },
      depot: 'North Station'
    },
    {
      id: '5',
      driverId: 'DRV-156',
      driverName: 'Driver #156',
      executionState: 'En Route',
      assignedRoute: 'RT-1923',
      remainingStops: 6,
      remainingShiftMinutes: 142,
      capacityStatus: 'Available',
      executionRisk: null,
      lastSignalTime: '1 min ago',
      lastSignalStatus: 'active',
      feasibility: {
        canReassign: false,
        canRescue: true,
        canLoadTransfer: true,
        reasons: {
          reassign: 'Route in progress',
          rescue: null,
          loadTransfer: null
        }
      },
      depot: 'South Hub'
    },
    {
      id: '6',
      driverId: 'DRV-823',
      driverName: 'Driver #823',
      executionState: 'En Route',
      assignedRoute: 'RT-1534',
      remainingStops: 10,
      remainingShiftMinutes: 176,
      capacityStatus: 'Available',
      executionRisk: 'High',
      lastSignalTime: '2 min ago',
      lastSignalStatus: 'active',
      feasibility: {
        canReassign: false,
        canRescue: true,
        canLoadTransfer: true,
        reasons: {
          reassign: 'Currently executing route',
          rescue: null,
          loadTransfer: null
        }
      },
      depot: 'South Hub'
    },
    {
      id: '7',
      driverId: 'DRV-674',
      driverName: 'Driver #674',
      executionState: 'Assigned',
      assignedRoute: 'RT-2891',
      remainingStops: 18,
      remainingShiftMinutes: 312,
      capacityStatus: 'Available',
      executionRisk: null,
      lastSignalTime: '4 min ago',
      lastSignalStatus: 'active',
      feasibility: {
        canReassign: true,
        canRescue: true,
        canLoadTransfer: true,
        reasons: {
          reassign: null,
          rescue: null,
          loadTransfer: null
        }
      },
      depot: 'East Terminal'
    },
    {
      id: '8',
      driverId: 'DRV-945',
      driverName: 'Driver #945',
      executionState: 'Offline',
      assignedRoute: null,
      remainingStops: 0,
      remainingShiftMinutes: 0,
      capacityStatus: 'Available',
      executionRisk: null,
      lastSignalTime: '18 min ago',
      lastSignalStatus: 'inactive',
      feasibility: {
        canReassign: false,
        canRescue: false,
        canLoadTransfer: false,
        reasons: {
          reassign: 'Driver offline - no active signal',
          rescue: 'Driver offline - no active signal',
          loadTransfer: 'Driver offline - no active signal'
        }
      },
      depot: 'East Terminal'
    }
  ];

  // Filter and sort drivers
  const filteredDrivers = drivers
    .filter(driver => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!driver.driverName.toLowerCase().includes(query) && 
            !driver.driverId.toLowerCase().includes(query)) {
          return false;
        }
      }
      if (selectedDepot !== 'all' && driver.depot !== selectedDepot) return false;
      if (selectedState !== 'all' && driver.executionState !== selectedState) return false;
      if (selectedCapacity !== 'all' && driver.capacityStatus !== selectedCapacity) return false;
      if (selectedFeasibility !== 'all') {
        if (selectedFeasibility === 'usable' && !driver.feasibility.canReassign && !driver.feasibility.canRescue) {
          return false;
        }
        if (selectedFeasibility === 'constrained' && (driver.feasibility.canReassign || driver.feasibility.canRescue)) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'shift':
          return b.remainingShiftMinutes - a.remainingShiftMinutes;
        case 'capacity':
          return a.capacityStatus.localeCompare(b.capacityStatus);
        case 'risk':
          const riskOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, null: 3 };
          return (riskOrder[a.executionRisk || null] || 3) - (riskOrder[b.executionRisk || null] || 3);
        default:
          return 0;
      }
    });

  const stats = {
    total: drivers.length,
    available: drivers.filter(d => d.executionState === 'Available').length,
    enRoute: drivers.filter(d => d.executionState === 'En Route').length,
    atStop: drivers.filter(d => d.executionState === 'At Stop').length,
    offline: drivers.filter(d => d.executionState === 'Offline').length
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-slate-900 mb-1">Drivers</h1>
              <p className="text-slate-600 text-sm">
                Real-time driver availability and capacity overview
              </p>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="relative">
                <Radio className="w-4 h-4 text-green-600" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="text-sm">
                <span className="text-green-700">Live</span>
                <span className="text-green-600 mx-1">·</span>
                <span className="text-green-600">Updated moments ago</span>
              </div>
            </div>
          </div>

          {/* Context Indicators */}
          <div className="flex items-center gap-6 text-sm mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">Wednesday, Dec 31, 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700">Morning Shift (6:00 AM - 2:00 PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-600" />
              <select
                value={selectedDepot}
                onChange={(e) => setSelectedDepot(e.target.value)}
                className="bg-transparent text-slate-700 border-none outline-none cursor-pointer"
              >
                <option value="all">All Depots</option>
                <option value="North Station">North Station</option>
                <option value="South Hub">South Hub</option>
                <option value="East Terminal">East Terminal</option>
              </select>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Total Drivers:</span>
              <span className="text-slate-900">{stats.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-slate-600">{stats.available} Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-slate-600">{stats.enRoute} En Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-slate-600">{stats.atStop} At Stop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full" />
              <span className="text-slate-600">{stats.offline} Offline</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1800px] mx-auto">
          {/* Filters & Controls */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by driver name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Execution State Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All States</option>
                  <option value="Available">Available</option>
                  <option value="Assigned">Assigned</option>
                  <option value="En Route">En Route</option>
                  <option value="At Stop">At Stop</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              {/* Capacity Filter */}
              <select
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Capacity</option>
                <option value="Available">Available</option>
                <option value="Near Limit">Near Limit</option>
                <option value="Exceeded">Exceeded</option>
              </select>

              {/* Feasibility Filter */}
              <select
                value={selectedFeasibility}
                onChange={(e) => setSelectedFeasibility(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Feasibility</option>
                <option value="usable">Usable</option>
                <option value="constrained">Constrained</option>
              </select>

              {/* Sort */}
              <div className="flex items-center gap-2 ml-auto">
                <ArrowUpDown className="w-4 h-4 text-slate-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="shift">Sort by Shift Time</option>
                  <option value="capacity">Sort by Capacity</option>
                  <option value="risk">Sort by Risk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drivers Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Execution State
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Assigned Route
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Remaining Stops
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Shift Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Risk
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Feasibility
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Last Signal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredDrivers.map((driver) => (
                    <DriverTableRow
                      key={driver.id}
                      driver={driver}
                      onClick={() => onDriverClick(driver.id)}
                    />
                  ))}
                </tbody>
              </table>

              {filteredDrivers.length === 0 && (
                <div className="py-12 text-center text-slate-600">
                  <p>No drivers found matching your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
