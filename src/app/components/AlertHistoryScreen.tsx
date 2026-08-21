import { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  Zap,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
  Filter,
  Calendar,
  Search,
  Info,
  DollarSign,
  User,
  Route,
  Package,
  Eye,
  Radio,
  AlertCircle,
  Shield,
  Activity
} from 'lucide-react';

interface AlertHistoryScreenProps {
  onBack: () => void;
}

type AlertType = 'sla-risk' | 'route-delay' | 'driver-issue' | 'data-issue' | 'manual-exception';
type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';
type AlertOutcome = 'resolved' | 'escalated' | 'closed' | 'auto-resolved';
type EntityType = 'route' | 'delivery' | 'driver';

interface HistoricalAlert {
  id: string;
  alertId: string;
  alertType: AlertType;
  severity: SeverityLevel;
  affectedEntityType: EntityType;
  affectedEntityId: string;
  affectedEntityName: string;
  detectedAt: string;
  closedAt: string;
  timeToResolutionMinutes: number;
  outcome: AlertOutcome;
  resolutionNotes?: string;
  slaOutcome: 'met' | 'breached' | 'at-risk';
  costImpact?: string;
  handledBy?: string;
}

interface AlertLifecycleEvent {
  id: string;
  timestamp: string;
  event: string;
  description: string;
  actor?: string;
  status: 'completed';
}

export function AlertHistoryScreen({ onBack }: AlertHistoryScreenProps) {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('today');
  const [alertTypeFilter, setAlertTypeFilter] = useState<AlertType | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'all'>('all');
  const [outcomeFilter, setOutcomeFilter] = useState<AlertOutcome | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock historical alerts data
  const allAlerts: HistoricalAlert[] = [
    {
      id: 'hist-001',
      alertId: 'ALT-2801-003',
      alertType: 'sla-risk',
      severity: 'critical',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-7823',
      affectedEntityName: 'TechCorp Inc',
      detectedAt: '08:23 AM',
      closedAt: '09:15 AM',
      timeToResolutionMinutes: 52,
      outcome: 'resolved',
      resolutionNotes: 'Driver rerouted to avoid traffic congestion. Delivery completed within SLA window.',
      slaOutcome: 'met',
      handledBy: 'Dispatcher J. Martinez'
    },
    {
      id: 'hist-002',
      alertId: 'ALT-2792-001',
      alertType: 'driver-issue',
      severity: 'high',
      affectedEntityType: 'driver',
      affectedEntityId: 'DRV-142',
      affectedEntityName: 'Driver #142',
      detectedAt: '07:45 AM',
      closedAt: '08:30 AM',
      timeToResolutionMinutes: 45,
      outcome: 'resolved',
      resolutionNotes: 'Vehicle issue resolved. Driver resumed route with minimal delay.',
      slaOutcome: 'met',
      handledBy: 'Dispatcher J. Martinez'
    },
    {
      id: 'hist-003',
      alertId: 'ALT-2784-002',
      alertType: 'route-delay',
      severity: 'critical',
      affectedEntityType: 'route',
      affectedEntityId: 'RT-2784',
      affectedEntityName: 'Route RT-2784',
      detectedAt: '06:30 AM',
      closedAt: '07:45 AM',
      timeToResolutionMinutes: 75,
      outcome: 'escalated',
      resolutionNotes: 'Multiple VIP deliveries at risk. Escalated to Operations Manager. Backup driver assigned.',
      slaOutcome: 'breached',
      costImpact: '$4,200 penalty',
      handledBy: 'Ops Manager K. Chen'
    },
    {
      id: 'hist-004',
      alertId: 'ALT-2776-005',
      alertType: 'data-issue',
      severity: 'medium',
      affectedEntityType: 'route',
      affectedEntityId: 'RT-2776',
      affectedEntityName: 'Route RT-2776',
      detectedAt: '09:12 AM',
      closedAt: '09:18 AM',
      timeToResolutionMinutes: 6,
      outcome: 'auto-resolved',
      resolutionNotes: 'GPS signal restored automatically. No intervention required.',
      slaOutcome: 'met'
    },
    {
      id: 'hist-005',
      alertId: 'ALT-2768-001',
      alertType: 'manual-exception',
      severity: 'high',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-7201',
      affectedEntityName: 'Global Systems Ltd',
      detectedAt: '10:05 AM',
      closedAt: '10:42 AM',
      timeToResolutionMinutes: 37,
      outcome: 'resolved',
      resolutionNotes: 'Customer window change accommodated. Delivery sequence adjusted.',
      slaOutcome: 'met',
      handledBy: 'Dispatcher J. Martinez'
    },
    {
      id: 'hist-006',
      alertId: 'ALT-2758-003',
      alertType: 'sla-risk',
      severity: 'high',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-7104',
      affectedEntityName: 'Prime Industries',
      detectedAt: '11:22 AM',
      closedAt: '12:05 PM',
      timeToResolutionMinutes: 43,
      outcome: 'resolved',
      resolutionNotes: 'Alternative route selected. Delivery completed 8 minutes before SLA breach.',
      slaOutcome: 'met',
      handledBy: 'Dispatcher J. Martinez'
    },
    {
      id: 'hist-007',
      alertId: 'ALT-2745-002',
      alertType: 'driver-issue',
      severity: 'low',
      affectedEntityType: 'driver',
      affectedEntityId: 'DRV-089',
      affectedEntityName: 'Driver #089',
      detectedAt: '01:15 PM',
      closedAt: '01:20 PM',
      timeToResolutionMinutes: 5,
      outcome: 'closed',
      resolutionNotes: 'Driver break scheduled as planned. Alert closed as routine.',
      slaOutcome: 'met',
      handledBy: 'System Auto-close'
    },
    {
      id: 'hist-008',
      alertId: 'ALT-2738-004',
      alertType: 'route-delay',
      severity: 'medium',
      affectedEntityType: 'route',
      affectedEntityId: 'RT-2738',
      affectedEntityName: 'Route RT-2738',
      detectedAt: '02:30 PM',
      closedAt: '03:10 PM',
      timeToResolutionMinutes: 40,
      outcome: 'resolved',
      resolutionNotes: 'Minor traffic cleared. Route back on schedule.',
      slaOutcome: 'met',
      handledBy: 'Dispatcher J. Martinez'
    },
    {
      id: 'hist-009',
      alertId: 'ALT-2729-001',
      alertType: 'sla-risk',
      severity: 'critical',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-6892',
      affectedEntityName: 'VIP Customer Corp',
      detectedAt: '03:45 PM',
      closedAt: '04:35 PM',
      timeToResolutionMinutes: 50,
      outcome: 'escalated',
      resolutionNotes: 'VIP delivery required management approval for late delivery. Customer notified.',
      slaOutcome: 'breached',
      costImpact: '$2,800 penalty',
      handledBy: 'Ops Manager K. Chen'
    },
    {
      id: 'hist-010',
      alertId: 'ALT-2712-002',
      alertType: 'data-issue',
      severity: 'low',
      affectedEntityType: 'delivery',
      affectedEntityId: 'DEL-6745',
      affectedEntityName: 'Standard Customer',
      detectedAt: '04:50 PM',
      closedAt: '04:55 PM',
      timeToResolutionMinutes: 5,
      outcome: 'auto-resolved',
      resolutionNotes: 'Address validation completed automatically.',
      slaOutcome: 'met'
    }
  ];

  // Mock lifecycle data for selected alert
  const getAlertLifecycle = (alertId: string): AlertLifecycleEvent[] => {
    // For demo, return a sample lifecycle
    if (alertId === 'hist-003') {
      return [
        {
          id: 'ev-1',
          timestamp: '06:30 AM',
          event: 'Alert Detected',
          description: 'System identified critical route delay with multiple VIP deliveries at risk',
          status: 'completed'
        },
        {
          id: 'ev-2',
          timestamp: '06:31 AM',
          event: 'Alert Created',
          description: 'Alert ALT-2784-002 created with Critical severity',
          actor: 'System',
          status: 'completed'
        },
        {
          id: 'ev-3',
          timestamp: '06:32 AM',
          event: 'Notification Sent',
          description: 'Critical alert notification sent to dispatch team',
          actor: 'System',
          status: 'completed'
        },
        {
          id: 'ev-4',
          timestamp: '06:35 AM',
          event: 'Review Started',
          description: 'Dispatcher J. Martinez opened alert for investigation',
          actor: 'Dispatcher J. Martinez',
          status: 'completed'
        },
        {
          id: 'ev-5',
          timestamp: '06:42 AM',
          event: 'Recovery Initiated',
          description: 'Dispatcher attempted route optimization and driver reassignment',
          actor: 'Dispatcher J. Martinez',
          status: 'completed'
        },
        {
          id: 'ev-6',
          timestamp: '06:58 AM',
          event: 'Escalated to Management',
          description: 'Alert escalated to Operations Manager due to VIP customer impact',
          actor: 'Dispatcher J. Martinez',
          status: 'completed'
        },
        {
          id: 'ev-7',
          timestamp: '07:12 AM',
          event: 'Backup Driver Assigned',
          description: 'Operations Manager assigned backup driver for critical VIP deliveries',
          actor: 'Ops Manager K. Chen',
          status: 'completed'
        },
        {
          id: 'ev-8',
          timestamp: '07:45 AM',
          event: 'Alert Closed',
          description: 'Alert resolved with escalation. SLA breached for 2 VIP deliveries. Penalty applied.',
          actor: 'Ops Manager K. Chen',
          status: 'completed'
        }
      ];
    }
    
    // Default lifecycle for other alerts
    return [
      {
        id: 'ev-1',
        timestamp: '08:23 AM',
        event: 'Alert Detected',
        description: 'System identified operational issue',
        status: 'completed'
      },
      {
        id: 'ev-2',
        timestamp: '08:24 AM',
        event: 'Alert Created',
        description: 'Alert created in system',
        actor: 'System',
        status: 'completed'
      },
      {
        id: 'ev-3',
        timestamp: '08:35 AM',
        event: 'Review Started',
        description: 'Dispatcher began investigation',
        actor: 'Dispatcher J. Martinez',
        status: 'completed'
      },
      {
        id: 'ev-4',
        timestamp: '09:15 AM',
        event: 'Alert Resolved',
        description: 'Issue resolved successfully',
        actor: 'Dispatcher J. Martinez',
        status: 'completed'
      }
    ];
  };

  // Filter alerts
  const filteredAlerts = allAlerts.filter(alert => {
    if (alertTypeFilter !== 'all' && alert.alertType !== alertTypeFilter) return false;
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
    if (outcomeFilter !== 'all' && alert.outcome !== outcomeFilter) return false;
    if (searchQuery && !alert.alertId.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !alert.affectedEntityId.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Calculate summary metrics
  const totalAlerts = filteredAlerts.length;
  const resolvedCount = filteredAlerts.filter(a => a.outcome === 'resolved').length;
  const escalatedCount = filteredAlerts.filter(a => a.outcome === 'escalated').length;
  const avgResolutionTime = totalAlerts > 0 
    ? Math.round(filteredAlerts.reduce((sum, a) => sum + a.timeToResolutionMinutes, 0) / totalAlerts)
    : 0;
  const slaMetCount = filteredAlerts.filter(a => a.slaOutcome === 'met').length;
  const slaMetRate = totalAlerts > 0 ? Math.round((slaMetCount / totalAlerts) * 100) : 0;

  const selectedAlert = selectedAlertId 
    ? filteredAlerts.find(a => a.id === selectedAlertId)
    : null;
  const lifecycle = selectedAlert ? getAlertLifecycle(selectedAlert.id) : [];

  const getAlertTypeLabel = (type: AlertType) => {
    switch (type) {
      case 'sla-risk': return 'SLA Risk';
      case 'route-delay': return 'Route Delay';
      case 'driver-issue': return 'Driver Issue';
      case 'data-issue': return 'Data Issue';
      case 'manual-exception': return 'Manual Exception';
    }
  };

  const getSeverityBadge = (severity: SeverityLevel, small: boolean = false) => {
    const sizeClasses = small ? 'px-2 py-0.5 text-xs' : 'px-2 py-1 text-xs';
    switch (severity) {
      case 'critical':
        return <span className={`${sizeClasses} bg-red-100 text-red-700 rounded border border-red-300 uppercase`}>Critical</span>;
      case 'high':
        return <span className={`${sizeClasses} bg-amber-100 text-amber-700 rounded border border-amber-300 uppercase`}>High</span>;
      case 'medium':
        return <span className={`${sizeClasses} bg-yellow-100 text-yellow-700 rounded uppercase`}>Medium</span>;
      case 'low':
        return <span className={`${sizeClasses} bg-blue-50 text-blue-600 rounded uppercase`}>Low</span>;
    }
  };

  const getOutcomeBadge = (outcome: AlertOutcome) => {
    switch (outcome) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded border border-green-300">
            <CheckCircle className="w-3 h-3" />
            Resolved
          </span>
        );
      case 'escalated':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300">
            <TrendingUp className="w-3 h-3" />
            Escalated
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300">
            <XCircle className="w-3 h-3" />
            Closed
          </span>
        );
      case 'auto-resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-300">
            <Zap className="w-3 h-3" />
            Auto-Resolved
          </span>
        );
    }
  };

  const getSLABadge = (outcome: 'met' | 'breached' | 'at-risk') => {
    switch (outcome) {
      case 'met':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            <CheckCircle className="w-3 h-3" />
            SLA Met
          </span>
        );
      case 'breached':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
            <XCircle className="w-3 h-3" />
            SLA Breached
          </span>
        );
      case 'at-risk':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
            <AlertTriangle className="w-3 h-3" />
            At Risk
          </span>
        );
    }
  };

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'route': return <Route className="w-4 h-4 text-slate-600" />;
      case 'delivery': return <Package className="w-4 h-4 text-slate-600" />;
      case 'driver': return <User className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-slate-900">Alert Lifecycle & History</h1>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200 uppercase">
                    Read-Only Audit View
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  Review past alerts and resolution outcomes for accountability and learning
                </p>
              </div>
            </div>

            {/* Date Range Selector */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="this-month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Total Alerts</span>
                <FileText className="w-4 h-4 text-slate-500" />
              </div>
              <div className="text-2xl text-slate-900 font-medium">{totalAlerts}</div>
              <div className="text-xs text-slate-500 mt-1">{dateRange === 'today' ? 'Today' : dateRange}</div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-800">Resolved</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl text-green-700 font-medium">{resolvedCount}</div>
              <div className="text-xs text-green-600 mt-1">
                {totalAlerts > 0 ? Math.round((resolvedCount / totalAlerts) * 100) : 0}% of total
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-amber-800">Escalated</span>
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl text-amber-700 font-medium">{escalatedCount}</div>
              <div className="text-xs text-amber-600 mt-1">
                {totalAlerts > 0 ? Math.round((escalatedCount / totalAlerts) * 100) : 0}% of total
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-800">Avg Resolution</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl text-blue-700 font-medium">{avgResolutionTime}m</div>
              <div className="text-xs text-blue-600 mt-1">Mean time to resolution</div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-800">SLA Success</span>
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl text-green-700 font-medium">{slaMetRate}%</div>
              <div className="text-xs text-green-600 mt-1">{slaMetCount} of {totalAlerts} met SLA</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Alert ID or Entity ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Filter className="w-4 h-4 text-slate-500" />

            {/* Alert Type Filter */}
            <select
              value={alertTypeFilter}
              onChange={(e) => setAlertTypeFilter(e.target.value as AlertType | 'all')}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="sla-risk">SLA Risk</option>
              <option value="route-delay">Route Delay</option>
              <option value="driver-issue">Driver Issue</option>
              <option value="data-issue">Data Issue</option>
              <option value="manual-exception">Manual Exception</option>
            </select>

            {/* Severity Filter */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as SeverityLevel | 'all')}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Outcome Filter */}
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value as AlertOutcome | 'all')}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Outcomes</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
              <option value="closed">Closed</option>
              <option value="auto-resolved">Auto-Resolved</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {/* Alert History List */}
            <div className="col-span-2">
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                  <div className="grid grid-cols-12 gap-4 text-xs text-slate-600 uppercase tracking-wide">
                    <div className="col-span-2">Alert ID</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-1">Severity</div>
                    <div className="col-span-2">Affected Entity</div>
                    <div className="col-span-2">Resolution Time</div>
                    <div className="col-span-2">Outcome</div>
                    <div className="col-span-1">SLA</div>
                  </div>
                </div>

                {/* Alerts List */}
                <div className="divide-y divide-slate-200 max-h-[700px] overflow-y-auto">
                  {filteredAlerts.length === 0 ? (
                    <div className="px-4 py-12 text-center">
                      <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-600 mb-1">No alerts found</p>
                      <p className="text-slate-500 text-sm">Try adjusting your filters or date range</p>
                    </div>
                  ) : (
                    filteredAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => setSelectedAlertId(alert.id)}
                        className={`px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                          selectedAlertId === alert.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Alert ID */}
                          <div className="col-span-2">
                            <div className="text-sm text-blue-600 font-mono mb-1">{alert.alertId}</div>
                            <div className="text-xs text-slate-500">{alert.detectedAt}</div>
                          </div>

                          {/* Type */}
                          <div className="col-span-2">
                            <div className="text-sm text-slate-900">{getAlertTypeLabel(alert.alertType)}</div>
                          </div>

                          {/* Severity */}
                          <div className="col-span-1">
                            {getSeverityBadge(alert.severity, true)}
                          </div>

                          {/* Affected Entity */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              {getEntityIcon(alert.affectedEntityType)}
                              <div>
                                <div className="text-sm text-slate-900 font-mono">{alert.affectedEntityId}</div>
                                <div className="text-xs text-slate-600">{alert.affectedEntityName}</div>
                              </div>
                            </div>
                          </div>

                          {/* Resolution Time */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-1 text-sm text-slate-700">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <span>{alert.timeToResolutionMinutes}m</span>
                            </div>
                            <div className="text-xs text-slate-500">{alert.closedAt}</div>
                          </div>

                          {/* Outcome */}
                          <div className="col-span-2">
                            {getOutcomeBadge(alert.outcome)}
                          </div>

                          {/* SLA */}
                          <div className="col-span-1">
                            {alert.slaOutcome === 'met' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            <div>
              {selectedAlert ? (
                <div className="space-y-6">
                  {/* Alert Summary */}
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                    <h3 className="text-slate-900 mb-4">Alert Details</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Alert ID</div>
                        <div className="text-sm text-slate-900 font-mono">{selectedAlert.alertId}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Alert Type</div>
                        <div className="text-sm text-slate-900">{getAlertTypeLabel(selectedAlert.alertType)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Severity</div>
                        {getSeverityBadge(selectedAlert.severity)}
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Affected Entity</div>
                        <div className="flex items-center gap-2">
                          {getEntityIcon(selectedAlert.affectedEntityType)}
                          <div>
                            <div className="text-sm text-slate-900 font-mono">{selectedAlert.affectedEntityId}</div>
                            <div className="text-xs text-slate-600">{selectedAlert.affectedEntityName}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-5 h-5 text-slate-600" />
                      <h3 className="text-slate-900">Alert Lifecycle Timeline</h3>
                    </div>
                    <div className="space-y-4">
                      {lifecycle.map((event, index) => (
                        <div key={event.id} className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            {index < lifecycle.length - 1 && (
                              <div className="absolute top-4 left-1 w-px h-8 bg-slate-200" />
                            )}
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-slate-900">{event.event}</span>
                              <span className="text-xs text-slate-500">{event.timestamp}</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">{event.description}</p>
                            {event.actor && (
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <User className="w-3 h-3" />
                                <span>{event.actor}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome Summary */}
                  <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-slate-600" />
                      <h3 className="text-slate-900">Outcome Summary</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-600 mb-2">Final Outcome</div>
                        {getOutcomeBadge(selectedAlert.outcome)}
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-2">SLA Status</div>
                        {getSLABadge(selectedAlert.slaOutcome)}
                      </div>
                      {selectedAlert.costImpact && (
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Cost Impact</div>
                          <div className="flex items-center gap-1 text-red-700">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm font-medium">{selectedAlert.costImpact}</span>
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Resolution Time</div>
                        <div className="flex items-center gap-1 text-slate-700">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{selectedAlert.timeToResolutionMinutes} minutes</span>
                        </div>
                      </div>
                      {selectedAlert.handledBy && (
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Handled By</div>
                          <div className="flex items-center gap-1 text-slate-700">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{selectedAlert.handledBy}</span>
                          </div>
                        </div>
                      )}
                      {selectedAlert.resolutionNotes && (
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Resolution Notes</div>
                          <div className="p-3 bg-white border border-slate-200 rounded text-sm text-slate-700">
                            {selectedAlert.resolutionNotes}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
                  <Eye className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 mb-1">No alert selected</p>
                  <p className="text-slate-500 text-sm">Click on an alert to view its lifecycle and outcome details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Info Footer */}
      <div className="px-6 pb-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-900 text-sm font-medium mb-1">Audit & Accountability View</div>
                <p className="text-blue-700 text-sm">
                  This screen provides a complete historical record of all alerts and their resolution outcomes.
                  Use this view for performance analysis, accountability tracking, and continuous improvement.
                  No retroactive changes can be made to historical records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
