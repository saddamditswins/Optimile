import { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  TrendingDown,
  User,
  Route,
  Package,
  Radio,
  ChevronRight,
  Filter,
  Search,
  XCircle,
  AlertCircle,
  Info,
  Zap,
  FileWarning,
  Calendar,
  MapPin,
  RefreshCw
} from 'lucide-react';

interface AlertsQueueScreenProps {
  onSelectAlert: (alertId: string) => void;
}

type AlertType = 'sla-risk' | 'route-delay' | 'driver-issue' | 'data-issue' | 'manual-exception';
type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';
type EntityType = 'route' | 'delivery' | 'driver';

interface Alert {
  id: string;
  alertType: AlertType;
  severity: SeverityLevel;
  affectedEntityType: EntityType;
  affectedEntityId: string;
  affectedEntityName: string;
  primaryRiskDriver: string;
  detectedMinutesAgo: number;
  timeToBreachMinutes?: number;
  isManual: boolean;
  additionalContext?: string;
}

export function AlertsQueueScreen({ onSelectAlert }: AlertsQueueScreenProps) {
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'all'>('all');
  const [alertTypeFilter, setAlertTypeFilter] = useState<AlertType | 'all'>('all');
  const [entityTypeFilter, setEntityTypeFilter] = useState<EntityType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);

  // Mock alerts data
  const allAlerts: Alert[] = [
    {
      id: 'alert-001',
      alertType: 'sla-risk',
      severity: 'critical',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-8472',
      affectedEntityName: 'Acme Corporation',
      primaryRiskDriver: 'Route running 12 min behind schedule with VIP delivery',
      detectedMinutesAgo: 8,
      timeToBreachMinutes: 18,
      isManual: false
    },
    {
      id: 'alert-002',
      alertType: 'driver-issue',
      severity: 'critical',
      affectedEntityType: 'driver',
      affectedEntityId: 'DRV-089',
      affectedEntityName: 'Driver #089',
      primaryRiskDriver: 'Vehicle breakdown reported - 5 deliveries at risk',
      detectedMinutesAgo: 15,
      timeToBreachMinutes: 25,
      isManual: false,
      additionalContext: '5 VIP deliveries affected'
    },
    {
      id: 'alert-003',
      alertType: 'route-delay',
      severity: 'high',
      affectedEntityType: 'route',
      affectedEntityId: 'RT-2847',
      affectedEntityName: 'Route RT-2847',
      primaryRiskDriver: 'Heavy traffic on main corridor causing 15+ min delays',
      detectedMinutesAgo: 22,
      timeToBreachMinutes: 35,
      isManual: false
    },
    {
      id: 'alert-004',
      alertType: 'manual-exception',
      severity: 'high',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-9402',
      affectedEntityName: 'Enterprise Solutions Inc',
      primaryRiskDriver: 'Customer requested immediate delivery window change',
      detectedMinutesAgo: 5,
      timeToBreachMinutes: 45,
      isManual: true
    },
    {
      id: 'alert-005',
      alertType: 'sla-risk',
      severity: 'medium',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-8903',
      affectedEntityName: 'MegaCorp Industries',
      primaryRiskDriver: 'Approaching SLA window with minor traffic delays',
      detectedMinutesAgo: 12,
      timeToBreachMinutes: 48,
      isManual: false
    },
    {
      id: 'alert-006',
      alertType: 'data-issue',
      severity: 'medium',
      affectedEntityType: 'route',
      affectedEntityId: 'RT-3445',
      affectedEntityName: 'Route RT-3445',
      primaryRiskDriver: 'GPS signal loss - location data stale for 8 minutes',
      detectedMinutesAgo: 8,
      isManual: false,
      additionalContext: 'Last known location: Market St'
    },
    {
      id: 'alert-007',
      alertType: 'driver-issue',
      severity: 'low',
      affectedEntityType: 'driver',
      affectedEntityId: 'DRV-247',
      affectedEntityName: 'Driver #247',
      primaryRiskDriver: 'Driver approaching hours of service limit in 90 minutes',
      detectedMinutesAgo: 3,
      isManual: false
    },
    {
      id: 'alert-008',
      alertType: 'route-delay',
      severity: 'critical',
      affectedEntityType: 'route',
      affectedEntityId: 'RT-2901',
      affectedEntityName: 'Route RT-2901',
      primaryRiskDriver: 'Multiple stops at risk - 3 VIP deliveries in jeopardy',
      detectedMinutesAgo: 18,
      timeToBreachMinutes: 12,
      isManual: false
    },
    {
      id: 'alert-009',
      alertType: 'data-issue',
      severity: 'low',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-7123',
      affectedEntityName: 'Standard Customer',
      primaryRiskDriver: 'Address validation failed - manual verification needed',
      detectedMinutesAgo: 45,
      isManual: false
    },
    {
      id: 'alert-010',
      alertType: 'manual-exception',
      severity: 'medium',
      affectedEntityType: 'route',
      affectedEntityId: 'RT-3201',
      affectedEntityName: 'Route RT-3201',
      primaryRiskDriver: 'Dispatcher flagged route for capacity review',
      detectedMinutesAgo: 30,
      isManual: true
    }
  ];

  // Filter and sort alerts
  const filteredAlerts = allAlerts
    .filter(alert => {
      if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
      if (alertTypeFilter !== 'all' && alert.alertType !== alertTypeFilter) return false;
      if (entityTypeFilter !== 'all' && alert.affectedEntityType !== entityTypeFilter) return false;
      if (showCriticalOnly && alert.severity !== 'critical') return false;
      if (searchQuery && !alert.affectedEntityId.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      // Sort by severity first
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (severityDiff !== 0) return severityDiff;
      
      // Then by time to breach
      if (a.timeToBreachMinutes !== undefined && b.timeToBreachMinutes !== undefined) {
        return a.timeToBreachMinutes - b.timeToBreachMinutes;
      }
      if (a.timeToBreachMinutes !== undefined) return -1;
      if (b.timeToBreachMinutes !== undefined) return 1;
      
      // Finally by detection time
      return b.detectedMinutesAgo - a.detectedMinutesAgo;
    });

  // Calculate summary stats
  const criticalCount = allAlerts.filter(a => a.severity === 'critical').length;
  const highCount = allAlerts.filter(a => a.severity === 'high').length;
  const mediumCount = allAlerts.filter(a => a.severity === 'medium').length;
  const lowCount = allAlerts.filter(a => a.severity === 'low').length;

  const getAlertTypeLabel = (type: AlertType) => {
    switch (type) {
      case 'sla-risk': return 'SLA Risk';
      case 'route-delay': return 'Route Delay';
      case 'driver-issue': return 'Driver Issue';
      case 'data-issue': return 'Data Issue';
      case 'manual-exception': return 'Manual Exception';
    }
  };

  const getAlertTypeIcon = (type: AlertType) => {
    switch (type) {
      case 'sla-risk':
        return <Clock className="w-4 h-4" />;
      case 'route-delay':
        return <Route className="w-4 h-4" />;
      case 'driver-issue':
        return <User className="w-4 h-4" />;
      case 'data-issue':
        return <AlertCircle className="w-4 h-4" />;
      case 'manual-exception':
        return <FileWarning className="w-4 h-4" />;
    }
  };

  const getAlertTypeColor = (type: AlertType) => {
    switch (type) {
      case 'sla-risk': return 'text-red-600';
      case 'route-delay': return 'text-amber-600';
      case 'driver-issue': return 'text-purple-600';
      case 'data-issue': return 'text-blue-600';
      case 'manual-exception': return 'text-slate-600';
    }
  };

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded border-2 border-red-400 uppercase">
            <Zap className="w-3 h-3" />
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300 uppercase">
            <AlertTriangle className="w-3 h-3" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded uppercase">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded uppercase">
            Low
          </span>
        );
    }
  };

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'route':
        return <Route className="w-4 h-4 text-slate-600" />;
      case 'delivery':
        return <Package className="w-4 h-4 text-slate-600" />;
      case 'driver':
        return <User className="w-4 h-4 text-slate-600" />;
    }
  };

  const getRowBorderClass = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical':
        return 'border-l-4 border-l-red-500 bg-red-50/50';
      case 'high':
        return 'border-l-4 border-l-amber-500 bg-amber-50/50';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-blue-400';
    }
  };

  const getTimeToBreachDisplay = (minutes: number | undefined) => {
    if (minutes === undefined) {
      return <span className="text-slate-400 text-sm">N/A</span>;
    }
    
    if (minutes < 0) {
      return (
        <div className="flex items-center gap-1 text-red-700">
          <XCircle className="w-4 h-4" />
          <span className="font-medium">BREACHED</span>
        </div>
      );
    }
    
    if (minutes < 30) {
      return (
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span className="text-red-700 font-medium">{minutes}m</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
      );
    }
    
    if (minutes < 60) {
      return (
        <div className="flex items-center gap-1 text-amber-700">
          <Clock className="w-4 h-4" />
          <span>{minutes}m</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-1 text-slate-600">
        <Clock className="w-4 h-4" />
        <span>{minutes}m</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-red-200">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-slate-900 mb-1">Alerts & Exceptions</h1>
              <p className="text-slate-600 text-sm">
                Live operational issues requiring attention
              </p>
            </div>

            {/* Context Indicators */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">Wed, Dec 31, 2025</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <Radio className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">Day Shift</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <MapPin className="w-4 h-4 text-slate-600" />
                <select className="text-sm text-slate-700 bg-transparent border-none outline-none cursor-pointer">
                  <option>Central Depot</option>
                  <option>North Region</option>
                  <option>South Region</option>
                  <option>All Regions</option>
                </select>
              </div>
            </div>
          </div>

          {/* Live Data Indicator */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-2 px-2 py-1 bg-green-50 border border-green-200 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700">Live Data</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              <span>Updated 5 seconds ago</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="px-4 sm:px-6 pb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-red-800">Critical Alerts</span>
                <Zap className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-3xl text-red-700 font-medium">{criticalCount}</div>
              <div className="text-xs text-red-700 mt-1">Immediate attention required</div>
            </div>

            <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-amber-800">High Priority</span>
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-3xl text-amber-700 font-medium">{highCount}</div>
              <div className="text-xs text-amber-700 mt-1">Elevated risk</div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-yellow-800">Medium Priority</span>
                <Info className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-3xl text-yellow-700 font-medium">{mediumCount}</div>
              <div className="text-xs text-yellow-700 mt-1">Monitor closely</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Low Priority</span>
                <Info className="w-5 h-5 text-slate-500" />
              </div>
              <div className="text-3xl text-slate-600 font-medium">{lowCount}</div>
              <div className="text-xs text-slate-600 mt-1">Routine monitoring</div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters & Controls */}
      <div className="px-4 sm:px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Route, Delivery, or Driver ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as SeverityLevel | 'all')}
                className="w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Alert Type Filter */}
            <select
              value={alertTypeFilter}
              onChange={(e) => setAlertTypeFilter(e.target.value as AlertType | 'all')}
              className="w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Alert Types</option>
              <option value="sla-risk">SLA Risk</option>
              <option value="route-delay">Route Delay</option>
              <option value="driver-issue">Driver Issue</option>
              <option value="data-issue">Data Issue</option>
              <option value="manual-exception">Manual Exception</option>
            </select>

            {/* Entity Type Filter */}
            <select
              value={entityTypeFilter}
              onChange={(e) => setEntityTypeFilter(e.target.value as EntityType | 'all')}
              className="w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Entities</option>
              <option value="route">Routes</option>
              <option value="delivery">Deliveries</option>
              <option value="driver">Drivers</option>
            </select>
          </div>

          {/* Critical Only Toggle */}
          <button
            onClick={() => setShowCriticalOnly(!showCriticalOnly)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showCriticalOnly
                ? 'bg-red-600 text-white border-2 border-red-700'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {showCriticalOnly ? 'Showing Critical Only' : 'Show Critical Only'}
          </button>
        </div>

        {/* Active Filters Summary */}
        {(severityFilter !== 'all' || alertTypeFilter !== 'all' || entityTypeFilter !== 'all' || searchQuery || showCriticalOnly) && (
          <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-slate-600">
            <span>Active filters:</span>
            {severityFilter !== 'all' && (
              <span className="px-2 py-1 bg-slate-100 rounded">Severity: {severityFilter}</span>
            )}
            {alertTypeFilter !== 'all' && (
              <span className="px-2 py-1 bg-slate-100 rounded">Type: {getAlertTypeLabel(alertTypeFilter)}</span>
            )}
            {entityTypeFilter !== 'all' && (
              <span className="px-2 py-1 bg-slate-100 rounded">Entity: {entityTypeFilter}</span>
            )}
            {searchQuery && (
              <span className="px-2 py-1 bg-slate-100 rounded">Search: "{searchQuery}"</span>
            )}
            {showCriticalOnly && (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Critical Only</span>
            )}
            <button
              onClick={() => {
                setSeverityFilter('all');
                setAlertTypeFilter('all');
                setEntityTypeFilter('all');
                setSearchQuery('');
                setShowCriticalOnly(false);
              }}
              className="ml-2 text-blue-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Alerts Queue */}
      <main className="px-4 sm:px-6 py-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 min-w-[900px]">
            <div className="grid grid-cols-12 gap-4 text-xs text-slate-600 uppercase tracking-wide">
              <div className="col-span-2">Alert Type</div>
              <div className="col-span-1">Severity</div>
              <div className="col-span-2">Affected Entity</div>
              <div className="col-span-4">Primary Risk Driver</div>
              <div className="col-span-1">Detected</div>
              <div className="col-span-2">Time-to-Breach</div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="divide-y divide-slate-200 min-w-[900px]">
            {filteredAlerts.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 mb-1">No alerts match your filters</p>
                <p className="text-slate-500 text-sm">Try adjusting your filter criteria</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => onSelectAlert(alert.id)}
                  className={`${getRowBorderClass(alert.severity)} px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Alert Type */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 bg-white rounded border border-slate-200 ${getAlertTypeColor(alert.alertType)}`}>
                          {getAlertTypeIcon(alert.alertType)}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-900 font-medium">
                            {getAlertTypeLabel(alert.alertType)}
                          </div>
                          {alert.isManual && (
                            <div className="flex items-center gap-1 text-xs text-slate-600 mt-0.5">
                              <FileWarning className="w-3 h-3" />
                              <span>Manual</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Severity */}
                    <div className="col-span-1">
                      {getSeverityBadge(alert.severity)}
                    </div>

                    {/* Affected Entity */}
                    <div className="col-span-2">
                      <div className="flex items-start gap-2">
                        {getEntityIcon(alert.affectedEntityType)}
                        <div className="flex-1">
                          <div className="text-sm text-blue-600 hover:underline font-mono">
                            {alert.affectedEntityId}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            {alert.affectedEntityName}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Primary Risk Driver */}
                    <div className="col-span-4">
                      <p className="text-sm text-slate-900">{alert.primaryRiskDriver}</p>
                      {alert.additionalContext && (
                        <div className="flex items-center gap-1 text-xs text-amber-700 mt-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{alert.additionalContext}</span>
                        </div>
                      )}
                    </div>

                    {/* Time Since Detected */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <TrendingDown className="w-3 h-3" />
                        <span>{alert.detectedMinutesAgo}m ago</span>
                      </div>
                    </div>

                    {/* Time-to-Breach */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-between">
                        {getTimeToBreachDisplay(alert.timeToBreachMinutes)}
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          </div>
        </div>

        {/* Results Count */}
        {filteredAlerts.length > 0 && (
          <div className="mt-4 text-center text-sm text-slate-600">
            Showing {filteredAlerts.length} of {allAlerts.length} alerts
          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-amber-900 text-sm font-medium mb-1">
                Continuous Monitoring Queue
              </div>
              <p className="text-amber-700 text-sm">
                This queue automatically prioritizes alerts based on severity and urgency.
                Click any alert to view detailed context and investigation options.
                No actions can be taken from this screen.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
