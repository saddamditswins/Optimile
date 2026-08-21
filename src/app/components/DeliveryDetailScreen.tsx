import {
  ArrowLeft,
  Package,
  Star,
  TrendingUp,
  Clock,
  AlertTriangle,
  MapPin,
  User,
  Route,
  Radio,
  CheckCircle,
  XCircle,
  Calendar,
  Navigation,
  Info,
  TrendingDown,
  Circle
} from 'lucide-react';

interface DeliveryDetailScreenProps {
  deliveryId: string;
  onBack: () => void;
  onOpenRoute?: () => void;
  onOpenRecovery?: () => void;
}

export function DeliveryDetailScreen({
  deliveryId,
  onBack,
  onOpenRoute,
  onOpenRecovery
}: DeliveryDetailScreenProps) {
  // Mock delivery data
  const delivery = {
    id: deliveryId,
    deliveryId: 'DEL-8472',
    stopId: 'ST-2847-08',
    customerName: 'Acme Corporation',
    priorityLevel: 'vip' as const,
    slaWindow: '11:00 AM - 12:00 PM',
    slaWindowStart: '11:00 AM',
    slaWindowEnd: '12:00 PM',
    timeToBreachMinutes: 18,
    executionStatus: 'in-progress' as const,
    assignedRoute: 'RT-2847',
    assignedDriver: 'DRV-247',
    driverName: 'Driver #247',
    stopSequence: 8,
    totalStopsOnRoute: 23,
    plannedETA: '11:35 AM',
    actualETA: '11:47 AM',
    currentDelay: 12,
    address: '450 Market Street',
    city: 'Downtown',
    zipCode: '94102',
    geoContext: 'Urban - High Density',
    accessRestrictions: 'Loading dock - Rear entrance only',
    packageCount: 3,
    packageWeight: '45 lbs',
    specialInstructions: 'Signature required - VIP customer',
    
    // Exception data
    exceptions: [
      {
        id: 'exc-1',
        type: 'Delay Risk',
        severity: 'high' as const,
        description: 'Route running 12 minutes behind schedule',
        reason: 'Traffic congestion on main corridor',
        activeMinutes: 22
      },
      {
        id: 'exc-2',
        type: 'Priority Alert',
        severity: 'medium' as const,
        description: 'VIP customer - escalation protocol active',
        reason: 'Customer priority tier requires special handling',
        activeMinutes: 0
      }
    ],
    
    // Risk indicators
    risks: [
      {
        id: 'risk-1',
        label: 'SLA Breach Risk',
        severity: 'critical' as const,
        explanation: 'Current delays place delivery at risk of missing 12:00 PM deadline'
      },
      {
        id: 'risk-2',
        label: 'Traffic Impact',
        severity: 'medium' as const,
        explanation: 'Heavy traffic on Market St causing 8-12 min delays'
      }
    ],
    
    // Timeline events
    timeline: [
      {
        id: 'tl-1',
        timestamp: '8:15 AM',
        event: 'Package loaded on vehicle',
        status: 'completed' as const
      },
      {
        id: 'tl-2',
        timestamp: '8:45 AM',
        event: 'Route dispatch confirmed',
        status: 'completed' as const
      },
      {
        id: 'tl-3',
        timestamp: '11:35 AM',
        event: 'Planned arrival time',
        status: 'scheduled' as const
      },
      {
        id: 'tl-4',
        timestamp: '11:47 AM',
        event: 'Projected arrival time',
        status: 'projected' as const,
        isDelayed: true
      }
    ]
  };

  const getPriorityBadge = () => {
    switch (delivery.priorityLevel) {
      case 'vip':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded border border-purple-300">
            <Star className="w-4 h-4 fill-purple-700" />
            <span>VIP Priority</span>
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded border border-amber-300">
            <TrendingUp className="w-4 h-4" />
            <span>High Priority</span>
          </span>
        );
      case 'standard':
        return (
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded border border-slate-300">
            Standard
          </span>
        );
    }
  };

  const getStatusBadge = () => {
    switch (delivery.executionStatus) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded">
            <Radio className="w-4 h-4" />
            In Progress
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded">
            <CheckCircle className="w-4 h-4" />
            Delivered
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded">
            <XCircle className="w-4 h-4" />
            Failed
          </span>
        );
    }
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-300 text-red-700';
      case 'high':
        return 'bg-amber-50 border-amber-300 text-amber-700';
      case 'medium':
        return 'bg-yellow-50 border-yellow-300 text-yellow-700';
      case 'low':
        return 'bg-blue-50 border-blue-300 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-slate-900">Delivery Detail</h1>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-200">
                    EXECUTION CONTEXT VIEW
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  {delivery.deliveryId} · Stop {delivery.stopSequence} of {delivery.totalStopsOnRoute}
                </p>
              </div>
            </div>

            {/* Quick Status Indicators */}
            <div className="flex items-center gap-3">
              {getPriorityBadge()}
              {getStatusBadge()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Summary Panel */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h2 className="text-slate-900 mb-4">Delivery Summary</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Customer</div>
                        <div className="text-slate-900">{delivery.customerName}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Stop ID</div>
                        <div className="text-slate-900 font-mono text-sm">{delivery.stopId}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Package Details</div>
                        <div className="text-slate-900">
                          {delivery.packageCount} packages · {delivery.packageWeight}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-slate-600 mb-1">SLA Delivery Window</div>
                        <div className="flex items-center gap-2 text-slate-900">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          <span>{delivery.slaWindow}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Time to SLA Breach</div>
                        <div className="flex items-center gap-2">
                          {delivery.timeToBreachMinutes < 30 ? (
                            <>
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              <span className="text-red-700">{delivery.timeToBreachMinutes} minutes</span>
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-amber-600" />
                              <span className="text-amber-700">{delivery.timeToBreachMinutes} minutes</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Special Instructions</div>
                        <div className="text-slate-900 text-sm">{delivery.specialInstructions}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Execution Context Section */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h2 className="text-slate-900 mb-4">Execution Context</h2>
                
                <div className="space-y-4">
                  {/* Route & Driver */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4 border-b border-slate-200">
                    <div>
                      <div className="text-xs text-slate-600 mb-2">Assigned Route</div>
                      <button
                        onClick={onOpenRoute}
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        <Route className="w-4 h-4" />
                        <span>{delivery.assignedRoute}</span>
                      </button>
                    </div>
                    <div>
                      <div className="text-xs text-slate-600 mb-2">Assigned Driver</div>
                      <div className="flex items-center gap-2 text-slate-900">
                        <User className="w-4 h-4 text-slate-600" />
                        <span>{delivery.driverName} ({delivery.assignedDriver})</span>
                      </div>
                    </div>
                  </div>

                  {/* Stop Sequence */}
                  <div className="pb-4 border-b border-slate-200">
                    <div className="text-xs text-slate-600 mb-3">Stop Sequence Position</div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded border border-blue-300">
                          Stop #{delivery.stopSequence}
                        </div>
                        <span className="text-slate-600 text-sm">of {delivery.totalStopsOnRoute} total stops</span>
                      </div>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${(delivery.stopSequence / delivery.totalStopsOnRoute) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Timing Analysis */}
                  <div>
                    <div className="text-xs text-slate-600 mb-3">Timing Analysis</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="text-xs text-slate-600 mb-1">Planned ETA</div>
                        <div className="text-slate-900">{delivery.plannedETA}</div>
                      </div>
                      <div className="px-4 py-3 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="text-xs text-amber-700 mb-1">Actual ETA</div>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-900">{delivery.actualETA}</span>
                          <TrendingDown className="w-3 h-3 text-amber-700" />
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="text-xs text-red-700 mb-1">Current Delay</div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-red-700" />
                          <span className="text-red-900">+{delivery.currentDelay} min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-600 mb-3">Execution Timeline</div>
                    <div className="space-y-3">
                      {delivery.timeline.map((event, index) => (
                        <div key={event.id} className="flex items-start gap-3">
                          <div className="relative">
                            {event.status === 'completed' && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {event.status === 'scheduled' && (
                              <Circle className="w-5 h-5 text-slate-400" />
                            )}
                            {event.status === 'projected' && (
                              <Clock className="w-5 h-5 text-amber-600" />
                            )}
                            {index < delivery.timeline.length - 1 && (
                              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-px h-6 bg-slate-200" />
                            )}
                          </div>
                          <div className="flex-1 pb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm ${
                                event.status === 'completed' ? 'text-slate-900' :
                                event.status === 'projected' && event.isDelayed ? 'text-amber-900' :
                                'text-slate-600'
                              }`}>
                                {event.event}
                              </span>
                              <span className={`text-xs ${
                                event.status === 'completed' ? 'text-slate-600' :
                                event.status === 'projected' && event.isDelayed ? 'text-amber-700' :
                                'text-slate-500'
                              }`}>
                                {event.timestamp}
                              </span>
                            </div>
                            {event.isDelayed && (
                              <div className="text-xs text-amber-700">
                                +{delivery.currentDelay} min delay from planned
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Exception & Risk Indicators */}
              <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-lg border-2 border-amber-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-700" />
                  <h2 className="text-slate-900">Active Exceptions & Risks</h2>
                </div>

                {/* Exceptions */}
                <div className="space-y-3 mb-4">
                  <div className="text-sm text-slate-700 mb-2">Active Exceptions</div>
                  {delivery.exceptions.map((exception) => (
                    <div
                      key={exception.id}
                      className={`p-4 rounded-lg border-2 ${getSeverityColor(exception.severity)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-medium text-sm">{exception.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-xs border bg-white border-current uppercase">
                            {exception.severity}
                          </span>
                          {exception.activeMinutes > 0 && (
                            <span className="text-xs">Active {exception.activeMinutes}m</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm mb-2">{exception.description}</p>
                      <div className="flex items-start gap-2 text-xs pt-2 border-t border-current/20">
                        <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span><span className="font-medium">Reason:</span> {exception.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Risk Indicators */}
                <div className="space-y-3 pt-4 border-t-2 border-amber-300">
                  <div className="text-sm text-slate-700 mb-2">Risk Indicators</div>
                  {delivery.risks.map((risk) => (
                    <div
                      key={risk.id}
                      className={`p-3 rounded-lg border ${getSeverityColor(risk.severity)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-sm">{risk.label}</span>
                        <span className="px-2 py-0.5 rounded text-xs border bg-white border-current uppercase">
                          {risk.severity}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span>{risk.explanation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Location Context */}
            <div className="space-y-6">
              {/* Location Context */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-slate-600" />
                  <h2 className="text-slate-900">Location Context</h2>
                </div>

                {/* Address */}
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <div className="text-xs text-slate-600 mb-2">Delivery Address</div>
                  <div className="text-slate-900">
                    <div>{delivery.address}</div>
                    <div>{delivery.city}, {delivery.zipCode}</div>
                  </div>
                </div>

                {/* Geo Context */}
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <div className="text-xs text-slate-600 mb-2">Geographic Context</div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded border border-blue-200">
                      {delivery.geoContext}
                    </span>
                  </div>
                </div>

                {/* Access Info */}
                <div className="mb-4">
                  <div className="text-xs text-slate-600 mb-2">Access Restrictions</div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-900 text-sm">{delivery.accessRestrictions}</p>
                  </div>
                </div>

                {/* Map Snippet */}
                <div className="rounded-lg border border-slate-200 overflow-hidden bg-slate-100">
                  <div className="aspect-square relative">
                    {/* Map placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 text-sm">Map View</p>
                        <p className="text-slate-500 text-xs">{delivery.address}</p>
                      </div>
                    </div>
                    
                    {/* Marker indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-white border-t border-slate-200">
                    <p className="text-xs text-slate-600 text-center">Read-only location reference</p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="bg-slate-100 rounded-lg border border-slate-300 p-6">
                <h3 className="text-slate-900 mb-4 text-sm">Related Views</h3>
                <div className="space-y-3">
                  <button
                    onClick={onOpenRoute}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Route className="w-5 h-5 text-slate-600" />
                      <div className="text-left">
                        <div className="text-slate-900 text-sm">View Full Route</div>
                        <div className="text-slate-600 text-xs">{delivery.assignedRoute}</div>
                      </div>
                    </div>
                    <Navigation className="w-5 h-5 text-slate-400" />
                  </button>

                  <button
                    onClick={onOpenRecovery}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-slate-600" />
                      <div className="text-left">
                        <div className="text-slate-900 text-sm">Recovery Context</div>
                        <div className="text-slate-600 text-xs">View intervention options</div>
                      </div>
                    </div>
                    <Navigation className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Info Panel */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-blue-900 text-sm mb-1">Evidence-Focused View</div>
                    <p className="text-blue-700 text-sm">
                      This screen provides complete stop-level execution truth for informed decision-making.
                      All execution actions must be performed through Route and Recovery modules.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
