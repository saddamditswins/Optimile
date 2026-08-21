import { 
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Package,
  Radio,
  Star,
  TrendingUp,
  Info
} from 'lucide-react';
import { useState } from 'react';

interface DeliveriesListScreenProps {
  onSelectDelivery: (deliveryId: string) => void;
}

type PriorityLevel = 'vip' | 'high' | 'standard';
type ExecutionStatus = 'pending' | 'in-progress' | 'delivered' | 'failed' | 'delayed';
type SLAUrgency = 'critical' | 'high' | 'medium' | 'safe';

interface Delivery {
  id: string;
  deliveryId: string;
  customerName: string;
  priorityLevel: PriorityLevel;
  slaWindow: string;
  timeToBreachMinutes: number;
  executionStatus: ExecutionStatus;
  assignedRoute: string;
  assignedDriver: string;
  slaUrgency: SLAUrgency;
  address: string;
  packageCount: number;
}

export function DeliveriesListScreen({ onSelectDelivery }: DeliveriesListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityLevel | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ExecutionStatus | 'all'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<SLAUrgency | 'all'>('all');

  // Mock deliveries data
  const allDeliveries: Delivery[] = [
    {
      id: '1',
      deliveryId: 'DEL-8472',
      customerName: 'Acme Corporation',
      priorityLevel: 'vip',
      slaWindow: '11:00 AM - 12:00 PM',
      timeToBreachMinutes: 18,
      executionStatus: 'in-progress',
      assignedRoute: 'RT-2847',
      assignedDriver: 'DRV-247',
      slaUrgency: 'critical',
      address: '450 Market St, Downtown',
      packageCount: 3
    },
    {
      id: '2',
      deliveryId: 'DEL-8473',
      customerName: 'TechStart Inc',
      priorityLevel: 'high',
      slaWindow: '12:00 PM - 2:00 PM',
      timeToBreachMinutes: 78,
      executionStatus: 'in-progress',
      assignedRoute: 'RT-2847',
      assignedDriver: 'DRV-247',
      slaUrgency: 'high',
      address: '1200 Broadway Ave',
      packageCount: 1
    },
    {
      id: '3',
      deliveryId: 'DEL-8474',
      customerName: 'Global Dynamics',
      priorityLevel: 'vip',
      slaWindow: '10:00 AM - 11:00 AM',
      timeToBreachMinutes: -15,
      executionStatus: 'failed',
      assignedRoute: 'RT-4782',
      assignedDriver: 'DRV-591',
      slaUrgency: 'critical',
      address: '890 Mission Blvd',
      packageCount: 2
    },
    {
      id: '4',
      deliveryId: 'DEL-8475',
      customerName: 'Standard Logistics',
      priorityLevel: 'standard',
      slaWindow: '2:00 PM - 4:00 PM',
      timeToBreachMinutes: 198,
      executionStatus: 'pending',
      assignedRoute: 'RT-2847',
      assignedDriver: 'DRV-247',
      slaUrgency: 'safe',
      address: '3400 Elm Street',
      packageCount: 1
    },
    {
      id: '5',
      deliveryId: 'DEL-8476',
      customerName: 'Premier Solutions',
      priorityLevel: 'high',
      slaWindow: '11:30 AM - 1:00 PM',
      timeToBreachMinutes: 48,
      executionStatus: 'in-progress',
      assignedRoute: 'RT-3901',
      assignedDriver: 'DRV-182',
      slaUrgency: 'high',
      address: '750 Valencia St',
      packageCount: 4
    },
    {
      id: '6',
      deliveryId: 'DEL-8477',
      customerName: 'Johnson & Associates',
      priorityLevel: 'standard',
      slaWindow: '9:00 AM - 11:00 AM',
      timeToBreachMinutes: 0,
      executionStatus: 'delivered',
      assignedRoute: 'RT-2847',
      assignedDriver: 'DRV-247',
      slaUrgency: 'safe',
      address: '2100 Oak Drive',
      packageCount: 1
    },
    {
      id: '7',
      deliveryId: 'DEL-8478',
      customerName: 'Elite Enterprises',
      priorityLevel: 'vip',
      slaWindow: '12:30 PM - 1:30 PM',
      timeToBreachMinutes: 108,
      executionStatus: 'pending',
      assignedRoute: 'RT-5620',
      assignedDriver: 'DRV-412',
      slaUrgency: 'medium',
      address: '5600 Pine Ave',
      packageCount: 5
    },
    {
      id: '8',
      deliveryId: 'DEL-8479',
      customerName: 'Metro Medical Center',
      priorityLevel: 'high',
      slaWindow: '10:30 AM - 11:30 AM',
      timeToBreachMinutes: 8,
      executionStatus: 'in-progress',
      assignedRoute: 'RT-3901',
      assignedDriver: 'DRV-182',
      slaUrgency: 'critical',
      address: '800 Medical Plaza',
      packageCount: 1
    },
    {
      id: '9',
      deliveryId: 'DEL-8480',
      customerName: 'Downtown Retailers',
      priorityLevel: 'standard',
      slaWindow: '3:00 PM - 5:00 PM',
      timeToBreachMinutes: 258,
      executionStatus: 'pending',
      assignedRoute: 'RT-4782',
      assignedDriver: 'DRV-591',
      slaUrgency: 'safe',
      address: '1500 Commerce Way',
      packageCount: 2
    },
    {
      id: '10',
      deliveryId: 'DEL-8481',
      customerName: 'Pacific Industries',
      priorityLevel: 'high',
      slaWindow: '11:00 AM - 12:30 PM',
      timeToBreachMinutes: 28,
      executionStatus: 'delayed',
      assignedRoute: 'RT-2847',
      assignedDriver: 'DRV-247',
      slaUrgency: 'critical',
      address: '9200 Industrial Pkwy',
      packageCount: 3
    },
    {
      id: '11',
      deliveryId: 'DEL-8482',
      customerName: 'Coastal Shipping Co',
      priorityLevel: 'standard',
      slaWindow: '1:00 PM - 3:00 PM',
      timeToBreachMinutes: 138,
      executionStatus: 'in-progress',
      assignedRoute: 'RT-5620',
      assignedDriver: 'DRV-412',
      slaUrgency: 'medium',
      address: '670 Harbor Blvd',
      packageCount: 1
    },
    {
      id: '12',
      deliveryId: 'DEL-8483',
      customerName: 'Summit Technologies',
      priorityLevel: 'vip',
      slaWindow: '10:00 AM - 11:00 AM',
      timeToBreachMinutes: -8,
      executionStatus: 'failed',
      assignedRoute: 'RT-4782',
      assignedDriver: 'DRV-591',
      slaUrgency: 'critical',
      address: '4100 Tech Center Dr',
      packageCount: 2
    }
  ];

  // Filter deliveries
  const filteredDeliveries = allDeliveries.filter(delivery => {
    const matchesSearch = 
      delivery.deliveryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.assignedRoute.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || delivery.priorityLevel === priorityFilter;
    const matchesStatus = statusFilter === 'all' || delivery.executionStatus === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || delivery.slaUrgency === urgencyFilter;

    return matchesSearch && matchesPriority && matchesStatus && matchesUrgency;
  });

  // Stats
  const stats = {
    total: allDeliveries.length,
    critical: allDeliveries.filter(d => d.slaUrgency === 'critical').length,
    vip: allDeliveries.filter(d => d.priorityLevel === 'vip').length,
    failed: allDeliveries.filter(d => d.executionStatus === 'failed').length,
    delivered: allDeliveries.filter(d => d.executionStatus === 'delivered').length
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'vip':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded border border-purple-300">
            <Star className="w-3 h-3 fill-purple-700" />
            VIP
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300">
            <TrendingUp className="w-3 h-3" />
            High
          </span>
        );
      case 'standard':
        return (
          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300">
            Standard
          </span>
        );
    }
  };

  const getStatusBadge = (status: ExecutionStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
            <Radio className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            <CheckCircle className="w-3 h-3" />
            Delivered
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
      case 'delayed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
            <AlertTriangle className="w-3 h-3" />
            Delayed
          </span>
        );
    }
  };

  const getUrgencyIndicator = (urgency: SLAUrgency, timeToBreachMinutes: number) => {
    if (timeToBreachMinutes < 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="text-red-700 font-medium">BREACHED</div>
          <div className="text-xs text-red-600">({Math.abs(timeToBreachMinutes)} min ago)</div>
        </div>
      );
    }

    switch (urgency) {
      case 'critical':
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">{timeToBreachMinutes} min</span>
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        );
      case 'high':
        return (
          <div className="flex items-center gap-1 text-amber-700">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{timeToBreachMinutes} min</span>
          </div>
        );
      case 'medium':
        return (
          <div className="text-yellow-700">
            {timeToBreachMinutes} min
          </div>
        );
      case 'safe':
        return (
          <div className="text-slate-600">
            {timeToBreachMinutes} min
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-slate-900">Deliveries/Stops</h1>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-200">
                    OPERATIONAL VIEW
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  Search and assess individual deliveries by SLA urgency and priority
                </p>
              </div>

              {/* Context Indicators */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg border border-slate-200">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-900 text-sm">Wed, Dec 31, 2025</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 text-sm">Morning Shift</span>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-900 text-sm">North Station</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Total Deliveries</div>
                <div className="text-xl text-slate-900">{stats.total}</div>
              </div>
              <div className="px-4 py-2 bg-red-50 rounded-lg border border-red-200">
                <div className="text-xs text-red-600 mb-1">Critical SLA</div>
                <div className="text-xl text-red-700">{stats.critical}</div>
              </div>
              <div className="px-4 py-2 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-xs text-purple-600 mb-1">VIP Deliveries</div>
                <div className="text-xl text-purple-700">{stats.vip}</div>
              </div>
              <div className="px-4 py-2 bg-red-50 rounded-lg border border-red-200">
                <div className="text-xs text-red-600 mb-1">Failed</div>
                <div className="text-xl text-red-700">{stats.failed}</div>
              </div>
              <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                <div className="text-xs text-green-600 mb-1">Delivered</div>
                <div className="text-xl text-green-700">{stats.delivered}</div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Delivery ID, Customer, or Route..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Priority Filter */}
              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as PriorityLevel | 'all')}
                  className="appearance-none pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                >
                  <option value="all">All Priorities</option>
                  <option value="vip">VIP Only</option>
                  <option value="high">High Priority</option>
                  <option value="standard">Standard</option>
                </select>
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ExecutionStatus | 'all')}
                  className="appearance-none pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="delivered">Delivered</option>
                  <option value="failed">Failed</option>
                  <option value="delayed">Delayed</option>
                </select>
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Urgency Filter */}
              <div className="relative">
                <select
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value as SLAUrgency | 'all')}
                  className="appearance-none pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                >
                  <option value="all">All Urgency</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="safe">Safe</option>
                </select>
                <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </header>

        {/* Deliveries Table */}
        <main className="px-6 py-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Delivery ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      SLA Window
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Time to Breach
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Driver
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredDeliveries.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                        No deliveries found matching your filters
                      </td>
                    </tr>
                  ) : (
                    filteredDeliveries.map((delivery) => (
                      <tr
                        key={delivery.id}
                        onClick={() => onSelectDelivery(delivery.id)}
                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                          delivery.slaUrgency === 'critical' ? 'bg-red-50/30' : ''
                        } ${
                          delivery.priorityLevel === 'vip' ? 'border-l-4 border-l-purple-500' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 text-sm">{delivery.deliveryId}</span>
                            {delivery.packageCount > 1 && (
                              <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 text-xs rounded">
                                {delivery.packageCount}x
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-slate-900 text-sm">{delivery.customerName}</div>
                            <div className="text-slate-600 text-xs">{delivery.address}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {getPriorityBadge(delivery.priorityLevel)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-900 text-sm">{delivery.slaWindow}</div>
                        </td>
                        <td className="px-4 py-3">
                          {getUrgencyIndicator(delivery.slaUrgency, delivery.timeToBreachMinutes)}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(delivery.executionStatus)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-blue-600 text-sm hover:underline">
                            {delivery.assignedRoute}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-slate-900 text-sm">{delivery.assignedDriver}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Results Count */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Showing {filteredDeliveries.length} of {allDeliveries.length} deliveries
              </p>
            </div>
          </div>

          {/* Info Panel */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-900 text-sm mb-1">Read-Only Operational View</div>
                <p className="text-blue-700 text-sm">
                  This screen provides delivery-level visibility for fast lookup during escalations. 
                  Click any delivery to view full detail. All execution and recovery actions must be performed through Route and Recovery modules.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}