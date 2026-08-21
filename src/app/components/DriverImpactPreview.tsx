import { 
  ArrowLeft,
  Clock,
  Radio,
  AlertTriangle,
  ArrowRight,
  Package,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Bell,
  Eye,
  Info,
  MapPin,
  Minus
} from 'lucide-react';
import { ImpactMetricCard } from './ImpactMetricCard';

interface DriverImpactPreviewProps {
  driverId: string;
  interventionId: string;
  onBack: () => void;
  onViewEvidenceSnapshot?: () => void;
}

export function DriverImpactPreview({ 
  driverId, 
  interventionId, 
  onBack, 
  onViewEvidenceSnapshot 
}: DriverImpactPreviewProps) {
  // Mock driver data
  const driverData = {
    id: '1',
    driverId: 'DRV-247',
    driverName: 'Driver #247',
    depot: 'North Station',
    assignedRoute: 'RT-2847'
  };

  // Mock intervention details
  const intervention = {
    id: interventionId,
    type: 'Rescue Assignment',
    description: 'Transfer 3 stops from RT-4782 (critical delay)',
    stopsToAdd: ['ST-4782-14', 'ST-4782-15', 'ST-4782-16'],
    reason: 'Route RT-4782 has critical SLA pressure - Driver #591 cannot complete'
  };

  // Current state
  const currentState = {
    totalStops: 23,
    completedStops: 15,
    remainingStops: 8,
    shiftEndTime: '2:00 PM',
    projectedEndTime: '1:52 PM',
    shiftOverrunMinutes: 0,
    capacityUsed: 30,
    capacityTotal: 45,
    slaRisk: 'high' as const,
    atRiskStops: 3,
    executionBuffer: -22
  };

  // Projected state after intervention
  const projectedState = {
    totalStops: 26,
    completedStops: 15,
    remainingStops: 11,
    shiftEndTime: '2:00 PM',
    projectedEndTime: '2:23 PM',
    shiftOverrunMinutes: 23,
    capacityUsed: 38,
    capacityTotal: 45,
    slaRisk: 'critical' as const,
    atRiskStops: 6,
    executionBuffer: -45
  };

  // Impact deltas
  const impacts = [
    {
      id: 'stops',
      label: 'Total Stops',
      currentValue: currentState.remainingStops,
      projectedValue: projectedState.remainingStops,
      delta: projectedState.remainingStops - currentState.remainingStops,
      unit: 'stops',
      severity: 'medium' as const
    },
    {
      id: 'shift-overrun',
      label: 'Shift Overrun',
      currentValue: currentState.shiftOverrunMinutes,
      projectedValue: projectedState.shiftOverrunMinutes,
      delta: projectedState.shiftOverrunMinutes - currentState.shiftOverrunMinutes,
      unit: 'minutes',
      severity: 'critical' as const
    },
    {
      id: 'capacity',
      label: 'Capacity Utilization',
      currentValue: Math.round((currentState.capacityUsed / currentState.capacityTotal) * 100),
      projectedValue: Math.round((projectedState.capacityUsed / projectedState.capacityTotal) * 100),
      delta: Math.round(((projectedState.capacityUsed - currentState.capacityUsed) / currentState.capacityTotal) * 100),
      unit: '%',
      severity: 'medium' as const
    },
    {
      id: 'sla-risk',
      label: 'At-Risk Stops',
      currentValue: currentState.atRiskStops,
      projectedValue: projectedState.atRiskStops,
      delta: projectedState.atRiskStops - currentState.atRiskStops,
      unit: 'stops',
      severity: 'high' as const
    }
  ];

  // Secondary risks introduced
  const secondaryRisks = [
    {
      id: 'shift-overrun-risk',
      severity: 'critical' as const,
      title: 'Shift Overrun Introduced',
      description: 'Adding 3 stops will cause 23-minute shift overrun, requiring overtime approval',
      reason: 'Time compression - current pace cannot absorb additional work within shift window'
    },
    {
      id: 'sla-degradation',
      severity: 'high' as const,
      title: 'SLA Risk Escalation',
      description: 'Existing route SLA risk increases from High to Critical',
      reason: 'Additional stops delay existing commitments - 3 more stops now at risk of late delivery'
    },
    {
      id: 'buffer-exhaustion',
      severity: 'medium' as const,
      title: 'Execution Buffer Depleted',
      description: 'Buffer decreases from -22 min to -45 min',
      reason: 'No flexibility remaining for traffic, customer delays, or service issues'
    }
  ];

  // Acknowledgment requirements
  const acknowledgment = {
    required: true,
    urgency: 'high' as const,
    reason: 'Driver must be notified of significant route change and shift extension',
    estimatedResponseTime: '5-10 minutes',
    delayRisk: 'If acknowledgment delayed, rescue window may close and intervention becomes infeasible'
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'critical':
        return 'text-red-700 bg-red-100 border-red-300';
      case 'high':
        return 'text-amber-700 bg-amber-100 border-amber-300';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'low':
        return 'text-blue-700 bg-blue-100 border-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
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
                  <h1 className="text-slate-900">Assignment Impact Preview</h1>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-200">
                    IMPACT ANALYSIS
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  {driverData.driverName} ({driverData.driverId}) · Before and after comparison
                </p>
              </div>
            </div>

            {/* Warning Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-amber-900 text-sm">Review all impacts before proceeding</span>
            </div>
          </div>

          {/* Intervention Context */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-900 text-sm mb-1">Proposed Intervention</div>
                <p className="text-blue-700 text-sm">
                  <span className="font-medium">{intervention.type}:</span> {intervention.description}
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  Reason: {intervention.reason}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Comparison Layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* Current State */}
            <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm">
              <div className="bg-slate-100 border-b border-slate-300 px-6 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-slate-900">Current State</h2>
                  <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded border border-slate-400">
                    AS-IS
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Route Info */}
                <div className="pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Assigned Route: {driverData.assignedRoute}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Total Stops</div>
                      <div className="text-2xl text-slate-900">{currentState.totalStops}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Remaining</div>
                      <div className="text-2xl text-slate-900">{currentState.remainingStops}</div>
                    </div>
                  </div>
                </div>

                {/* Shift Status */}
                <div className="pb-4 border-b border-slate-200">
                  <div className="text-sm text-slate-600 mb-3">Shift Status</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Shift End:</span>
                      <span className="text-slate-900">{currentState.shiftEndTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Projected End:</span>
                      <span className="text-green-700">{currentState.projectedEndTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Overrun:</span>
                      <span className="text-green-700">None</span>
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="pb-4 border-b border-slate-200">
                  <div className="text-sm text-slate-600 mb-2">Capacity Utilization</div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${(currentState.capacityUsed / currentState.capacityTotal) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-900 w-16 text-right">
                      {Math.round((currentState.capacityUsed / currentState.capacityTotal) * 100)}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {currentState.capacityUsed} / {currentState.capacityTotal} packages
                  </div>
                </div>

                {/* SLA Risk */}
                <div>
                  <div className="text-sm text-slate-600 mb-2">SLA Risk Level</div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded ${
                      currentState.slaRisk === 'critical' ? 'bg-red-100 text-red-700' :
                      currentState.slaRisk === 'high' ? 'bg-amber-100 text-amber-700' :
                      currentState.slaRisk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm capitalize">{currentState.slaRisk}</span>
                    </span>
                    <span className="text-sm text-slate-600">
                      {currentState.atRiskStops} stops at risk
                    </span>
                  </div>
                </div>

                {/* Buffer */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-600 mb-1">Execution Buffer</div>
                  <div className="text-xl text-red-700">
                    {currentState.executionBuffer > 0 ? '+' : ''}{currentState.executionBuffer} min
                  </div>
                </div>
              </div>
            </div>

            {/* Projected State */}
            <div className="bg-white rounded-lg border-2 border-amber-400 shadow-lg">
              <div className="bg-amber-50 border-b border-amber-400 px-6 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-slate-900">Projected State</h2>
                  <span className="px-2 py-1 bg-amber-200 text-amber-900 text-xs rounded border border-amber-400">
                    POST-INTERVENTION
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Route Info */}
                <div className="pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Assigned Route: {driverData.assignedRoute} + Rescue</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Total Stops</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl text-slate-900">{projectedState.totalStops}</div>
                        <div className="flex items-center gap-1 text-amber-700 text-sm">
                          <TrendingUp className="w-3 h-3" />
                          +{projectedState.totalStops - currentState.totalStops}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Remaining</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl text-slate-900">{projectedState.remainingStops}</div>
                        <div className="flex items-center gap-1 text-amber-700 text-sm">
                          <TrendingUp className="w-3 h-3" />
                          +{projectedState.remainingStops - currentState.remainingStops}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shift Status */}
                <div className="pb-4 border-b border-slate-200">
                  <div className="text-sm text-slate-600 mb-3">Shift Status</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Shift End:</span>
                      <span className="text-slate-900">{projectedState.shiftEndTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Projected End:</span>
                      <span className="text-red-700">{projectedState.projectedEndTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Overrun:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-red-700">+{projectedState.shiftOverrunMinutes} min</span>
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="pb-4 border-b border-slate-200">
                  <div className="text-sm text-slate-600 mb-2">Capacity Utilization</div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all"
                        style={{ width: `${(projectedState.capacityUsed / projectedState.capacityTotal) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-amber-900 w-16 text-right">
                      {Math.round((projectedState.capacityUsed / projectedState.capacityTotal) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">
                      {projectedState.capacityUsed} / {projectedState.capacityTotal} packages
                    </span>
                    <span className="text-amber-700">
                      +{projectedState.capacityUsed - currentState.capacityUsed} packages
                    </span>
                  </div>
                </div>

                {/* SLA Risk */}
                <div>
                  <div className="text-sm text-slate-600 mb-2">SLA Risk Level</div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded ${
                      projectedState.slaRisk === 'critical' ? 'bg-red-100 text-red-700' :
                      projectedState.slaRisk === 'high' ? 'bg-amber-100 text-amber-700' :
                      projectedState.slaRisk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm capitalize">{projectedState.slaRisk}</span>
                    </span>
                    <span className="text-sm text-red-700">
                      {projectedState.atRiskStops} stops at risk
                    </span>
                  </div>
                </div>

                {/* Buffer */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-600 mb-1">Execution Buffer</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-xl text-red-700">
                      {projectedState.executionBuffer > 0 ? '+' : ''}{projectedState.executionBuffer} min
                    </div>
                    <div className="flex items-center gap-1 text-red-700 text-sm">
                      <TrendingDown className="w-3 h-3" />
                      {projectedState.executionBuffer - currentState.executionBuffer} min
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Metrics Summary */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-slate-900 mb-4">Impact Metrics Summary</h2>
            <div className="grid grid-cols-4 gap-4">
              {impacts.map((impact) => (
                <ImpactMetricCard key={impact.id} impact={impact} />
              ))}
            </div>
          </div>

          {/* Secondary Risks - CRITICAL */}
          <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-lg border-2 border-red-300 shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-slate-900 mb-1">Secondary Risks Introduced</h2>
                <p className="text-slate-600 text-sm">
                  New risks created by this intervention that may cause downstream failures
                </p>
              </div>
              <div className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">
                CRITICAL REVIEW
              </div>
            </div>

            <div className="space-y-3">
              {secondaryRisks.map((risk) => (
                <div 
                  key={risk.id}
                  className={`p-4 rounded-lg border-2 ${getSeverityColor(risk.severity)}`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{risk.title}</div>
                        <span className="px-2 py-0.5 rounded text-xs border bg-white border-current uppercase">
                          {risk.severity}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{risk.description}</p>
                      <div className="flex items-start gap-2 text-xs pt-2 border-t border-current/20">
                        <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span><span className="font-medium">Why:</span> {risk.reason}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acknowledgment Requirements */}
          <div className={`rounded-lg border-2 p-6 ${
            acknowledgment.urgency === 'critical' ? 'bg-red-50 border-red-300' :
            acknowledgment.urgency === 'high' ? 'bg-amber-50 border-amber-300' :
            'bg-blue-50 border-blue-300'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                acknowledgment.urgency === 'critical' ? 'bg-red-100' :
                acknowledgment.urgency === 'high' ? 'bg-amber-100' :
                'bg-blue-100'
              }`}>
                <Bell className={`w-6 h-6 ${
                  acknowledgment.urgency === 'critical' ? 'text-red-700' :
                  acknowledgment.urgency === 'high' ? 'text-amber-700' :
                  'text-blue-700'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-slate-900">Driver Acknowledgment Required</h3>
                  <span className={`px-2 py-0.5 rounded text-xs border ${
                    acknowledgment.urgency === 'critical' ? 'bg-red-200 text-red-900 border-red-400' :
                    acknowledgment.urgency === 'high' ? 'bg-amber-200 text-amber-900 border-amber-400' :
                    'bg-blue-200 text-blue-900 border-blue-400'
                  }`}>
                    {acknowledgment.urgency.toUpperCase()} URGENCY
                  </span>
                </div>
                <p className="text-slate-700 text-sm mb-3">
                  {acknowledgment.reason}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-600 text-xs mb-1">Estimated Response Time</div>
                    <div className="text-slate-900">{acknowledgment.estimatedResponseTime}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 text-xs mb-1">Delay Risk</div>
                    <div className={`${
                      acknowledgment.urgency === 'high' ? 'text-amber-700' : 'text-slate-900'
                    }`}>
                      {acknowledgment.delayRisk}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-slate-100 rounded-lg border border-slate-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-900 mb-1 text-sm">Next Steps</h3>
                <p className="text-slate-600 text-sm">
                  Review all impacts and return to Recovery Workspace to finalize decision
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={onViewEvidenceSnapshot}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Eye className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-900">View Evidence Snapshot</span>
                </button>
                <button 
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="text-sm">Return to Recovery Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Critical Warning */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-red-900 text-sm mb-1">Prevent Hidden Damage</div>
                <p className="text-red-700 text-sm">
                  This screen shows projected impacts but does not commit the intervention. 
                  Carefully review all secondary risks and acknowledgment requirements before proceeding. 
                  Changes cannot be easily reversed once driver begins execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
