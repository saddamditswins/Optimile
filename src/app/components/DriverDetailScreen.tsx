import { 
  ArrowLeft,
  Clock,
  Radio,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingDown,
  TrendingUp,
  Minus,
  Package,
  MapPin,
  Truck,
  Coffee,
  ChevronRight
} from 'lucide-react';
import { DriverConstraintCard } from './DriverConstraintCard';
import { DriverReliabilityPanel } from './DriverReliabilityPanel';

interface DriverDetailScreenProps {
  driverId: string;
  onBack: () => void;
  onOpenTimeline?: () => void;
  onOpenImpactPreview?: () => void;
}

export function DriverDetailScreen({ driverId, onBack, onOpenTimeline, onOpenImpactPreview }: DriverDetailScreenProps) {
  // Mock driver data
  const driverData = {
    id: '1',
    driverId: 'DRV-247',
    driverName: 'Driver #247',
    executionState: 'En Route' as const,
    assignedRoute: 'RT-2847',
    currentDelay: 22,
    shiftStartTime: '6:00 AM',
    shiftEndTime: '2:00 PM',
    remainingShiftMinutes: 163,
    depot: 'North Station',
    lastSignalTime: '2 min ago'
  };

  const executionSnapshot = {
    completedStops: 15,
    remainingStops: 8,
    totalStops: 23,
    executionPace: 'degrading' as const,
    slaPressure: 'high' as const,
    currentBuffer: -22,
    nextCriticalStopMinutes: 8
  };

  const constraints = [
    {
      id: 'shift',
      type: 'Shift End Time',
      icon: <Clock className="w-5 h-5" />,
      status: 'warning' as const,
      value: '2:00 PM (2h 43m remaining)',
      explanation: 'Less than 3 hours remaining - limited capacity for additional stops',
      blocksReassignment: false,
      blocksRescue: false
    },
    {
      id: 'break',
      type: 'Break Requirements',
      icon: <Coffee className="w-5 h-5" />,
      status: 'ok' as const,
      value: 'Break taken at 10:15 AM',
      explanation: 'Regulatory break completed - no immediate requirement',
      blocksReassignment: false,
      blocksRescue: false
    },
    {
      id: 'capacity',
      type: 'Vehicle Capacity',
      icon: <Package className="w-5 h-5" />,
      status: 'ok' as const,
      value: '18 / 45 packages',
      explanation: '27 packages available - sufficient for light reassignment',
      blocksReassignment: false,
      blocksRescue: false
    },
    {
      id: 'compatibility',
      type: 'Package Compatibility',
      icon: <Truck className="w-5 h-5" />,
      status: 'ok' as const,
      value: 'Standard delivery vehicle',
      explanation: 'No special equipment required - compatible with most packages',
      blocksReassignment: false,
      blocksRescue: false
    },
    {
      id: 'zone',
      type: 'Zone Restrictions',
      icon: <MapPin className="w-5 h-5" />,
      status: 'blocking' as const,
      value: 'Assigned to Downtown Zone',
      explanation: 'Cannot accept stops outside Downtown Zone - geo-fence restriction',
      blocksReassignment: true,
      blocksRescue: false
    }
  ];

  const reliabilitySignals = {
    acknowledgmentLatency: 'normal' as const,
    acknowledgmentAvgSeconds: 12,
    offlineEvents: 1,
    lastOfflineMinutes: 45,
    complianceIndicator: 'good' as const
  };

  const eligibility = {
    reassignment: {
      eligible: false,
      status: 'No' as const,
      reason: 'Currently executing high-priority route with critical SLA pressure',
      color: 'text-red-700 bg-red-50 border-red-200'
    },
    rescue: {
      eligible: true,
      status: 'Conditional' as const,
      reason: 'Available for rescue within Downtown Zone only - shift time allows 60-90 min rescue window',
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    loadTransfer: {
      eligible: true,
      status: 'Yes' as const,
      reason: 'Sufficient vehicle capacity and compatible equipment',
      color: 'text-green-700 bg-green-50 border-green-200'
    }
  };

  const getPaceIndicator = () => {
    switch (executionSnapshot.executionPace) {
      case 'on-track':
        return {
          icon: <Minus className="w-4 h-4 text-green-600" />,
          label: 'On Track',
          color: 'text-green-700 bg-green-100'
        };
      case 'degrading':
        return {
          icon: <TrendingDown className="w-4 h-4 text-amber-600" />,
          label: 'Degrading',
          color: 'text-amber-700 bg-amber-100'
        };
      case 'accelerating':
        return {
          icon: <TrendingUp className="w-4 h-4 text-blue-600" />,
          label: 'Accelerating',
          color: 'text-blue-700 bg-blue-100'
        };
    }
  };

  const paceIndicator = getPaceIndicator();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-slate-900">{driverData.driverName}</h1>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-200">
                    EXECUTION CONTEXT VIEW
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  Live feasibility assessment and constraint evaluation
                </p>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="relative">
                <Radio className="w-4 h-4 text-green-600" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="text-green-700 text-sm">Live · {driverData.lastSignalTime}</span>
            </div>
          </div>

          {/* Context Bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Driver ID:</span>
              <span className="text-slate-900">{driverData.driverId}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">{driverData.depot}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">Shift: {driverData.shiftStartTime} - {driverData.shiftEndTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Driver Summary Panel */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-slate-900 mb-4">Driver Summary</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              <div>
                <div className="text-slate-600 text-sm mb-1">Execution State</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-slate-900">{driverData.executionState}</span>
                </div>
              </div>
              <div>
                <div className="text-slate-600 text-sm mb-1">Assigned Route</div>
                <div className="text-slate-900">{driverData.assignedRoute}</div>
              </div>
              <div>
                <div className="text-slate-600 text-sm mb-1">Current Delay</div>
                <div className="text-red-700">+{driverData.currentDelay} min</div>
              </div>
              <div>
                <div className="text-slate-600 text-sm mb-1">Shift Remaining</div>
                <div className={`${
                  driverData.remainingShiftMinutes < 90 ? 'text-red-700' :
                  driverData.remainingShiftMinutes < 180 ? 'text-amber-700' :
                  'text-slate-900'
                }`}>
                  {Math.floor(driverData.remainingShiftMinutes / 60)}h {driverData.remainingShiftMinutes % 60}m
                </div>
              </div>
              <div>
                <div className="text-slate-600 text-sm mb-1">Next Critical Stop</div>
                <div className="text-red-700">{executionSnapshot.nextCriticalStopMinutes} min</div>
              </div>
            </div>
          </div>

          {/* Live Execution Snapshot */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-slate-900 mb-4">Live Execution Snapshot</h2>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Stop Progress</span>
                <span className="text-slate-900">
                  {executionSnapshot.completedStops} / {executionSnapshot.totalStops} stops
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${(executionSnapshot.completedStops / executionSnapshot.totalStops) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-slate-600 text-sm mb-2">Execution Pace</div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded ${paceIndicator.color}`}>
                  {paceIndicator.icon}
                  <span className="text-sm">{paceIndicator.label}</span>
                </div>
              </div>
              <div>
                <div className="text-slate-600 text-sm mb-2">SLA Pressure</div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded ${
                  executionSnapshot.slaPressure === 'high' ? 'text-red-700 bg-red-100' :
                  executionSnapshot.slaPressure === 'medium' ? 'text-amber-700 bg-amber-100' :
                  'text-green-700 bg-green-100'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm capitalize">{executionSnapshot.slaPressure}</span>
                </div>
              </div>
              <div>
                <div className="text-slate-600 text-sm mb-2">Current Buffer</div>
                <div className="text-red-700">
                  {executionSnapshot.currentBuffer > 0 ? '+' : ''}{executionSnapshot.currentBuffer} min
                </div>
              </div>
            </div>
          </div>

          {/* Constraint & Eligibility Panel - CRITICAL SECTION */}
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border-2 border-blue-200 shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-slate-900 mb-1">Constraint & Eligibility Assessment</h2>
                <p className="text-slate-600 text-sm">
                  Evaluate operational constraints before assignment decisions
                </p>
              </div>
              <div className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full self-start">
                CRITICAL SECTION
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {constraints.map((constraint) => (
                <DriverConstraintCard key={constraint.id} constraint={constraint} />
              ))}
            </div>
          </div>

          {/* Reliability Signals */}
          <DriverReliabilityPanel signals={reliabilitySignals} />

          {/* Assignment Eligibility Summary */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-slate-900 mb-4">Assignment Eligibility Summary</h2>
            <div className="space-y-3">
              {/* Reassignment */}
              <div className={`p-4 rounded-lg border ${eligibility.reassignment.color}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {eligibility.reassignment.eligible ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm">Eligible for Reassignment</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded text-sm border border-current">
                    {eligibility.reassignment.status}
                  </span>
                </div>
                <p className="text-sm ml-7">{eligibility.reassignment.reason}</p>
              </div>

              {/* Rescue Support */}
              <div className={`p-4 rounded-lg border ${eligibility.rescue.color}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {eligibility.rescue.status === 'Yes' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : eligibility.rescue.status === 'Conditional' ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm">Eligible for Rescue Support</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded text-sm border border-current">
                    {eligibility.rescue.status}
                  </span>
                </div>
                <p className="text-sm ml-7">{eligibility.rescue.reason}</p>
              </div>

              {/* Load Transfer */}
              <div className={`p-4 rounded-lg border ${eligibility.loadTransfer.color}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {eligibility.loadTransfer.eligible ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm">Eligible for Load Transfer</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded text-sm border border-current">
                    {eligibility.loadTransfer.status}
                  </span>
                </div>
                <p className="text-sm ml-7">{eligibility.loadTransfer.reason}</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-slate-100 rounded-lg border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-4 text-sm">Additional Analysis Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={onOpenTimeline}
                className="flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  <div className="text-left">
                    <div className="text-slate-900 text-sm">View Availability Timeline</div>
                    <div className="text-slate-600 text-xs">Hour-by-hour capacity projection</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>

              <button 
                onClick={onOpenImpactPreview}
                className="flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-slate-600" />
                  <div className="text-left">
                    <div className="text-slate-900 text-sm">Driver Impact Preview</div>
                    <div className="text-slate-600 text-xs">From Recovery context</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Advisory Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-900 text-sm mb-1">Evidence-Driven Decision Support</div>
                <p className="text-blue-700 text-sm">
                  This screen provides context for informed decision-making. All assignment actions must be executed through the Recovery module. Review all constraints and eligibility factors carefully before proceeding with any operational changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}