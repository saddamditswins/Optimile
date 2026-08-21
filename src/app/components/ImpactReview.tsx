import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Package,
  User,
  Clock,
  DollarSign,
  Shield,
  Activity,
  Eye,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Zap,
  Route,
  Navigation,
  FileCheck,
  Lock,
  AlertCircle,
  Radio
} from 'lucide-react';

interface ImpactReviewProps {
  recoveryId: string;
  onBack: () => void;
  onProceedToCommitReview: () => void;
  onRequestEscalation?: () => void;
}

type ImpactDirection = 'positive' | 'negative' | 'neutral';
type RiskLevel = 'acceptable' | 'elevated' | 'critical';

export function ImpactReview({
  recoveryId,
  onBack,
  onProceedToCommitReview,
  onRequestEscalation
}: ImpactReviewProps) {
  // Mock data for the comparison
  const draftMetadata = {
    recoveryId: 'REC-2847-001',
    version: 'Draft v1',
    actionsCount: 1,
    analyzedAt: '11:18 AM'
  };

  const currentState = {
    routes: [
      {
        id: 'RT-2847',
        driver: 'Driver #247',
        status: 'delayed',
        delayMinutes: 12,
        stopsCompleted: 18,
        stopsRemaining: 5,
        stopsAtRisk: 3,
        shiftUtilization: 78,
        estimatedCompletion: '5:45 PM'
      }
    ],
    deliveries: {
      onTrack: 2,
      atRisk: 3,
      breached: 0
    },
    slaOutcome: {
      projected: {
        success: 2,
        breach: 3
      }
    },
    driverWorkload: {
      'DRV-247': { load: 23, capacity: 25, utilizationPercent: 92 }
    },
    penaltyExposure: '$3,700'
  };

  const projectedState = {
    routes: [
      {
        id: 'RT-2847',
        driver: 'Driver #247',
        status: 'on-track',
        delayMinutes: 0,
        stopsCompleted: 18,
        stopsRemaining: 2,
        stopsAtRisk: 0,
        shiftUtilization: 65,
        estimatedCompletion: '4:20 PM'
      },
      {
        id: 'RT-2847',
        driver: 'Driver #312',
        status: 'new-assignment',
        delayMinutes: 0,
        stopsCompleted: 0,
        stopsRemaining: 3,
        stopsAtRisk: 0,
        shiftUtilization: 48,
        estimatedCompletion: '3:45 PM',
        isNew: true
      }
    ],
    deliveries: {
      onTrack: 5,
      atRisk: 0,
      breached: 0
    },
    slaOutcome: {
      projected: {
        success: 5,
        breach: 0
      }
    },
    driverWorkload: {
      'DRV-247': { load: 20, capacity: 25, utilizationPercent: 80 },
      'DRV-312': { load: 15, capacity: 30, utilizationPercent: 50 }
    },
    penaltyExposure: '$0'
  };

  const impactMetrics = [
    {
      id: 'sla',
      label: 'SLA Outcome',
      icon: <CheckCircle className="w-5 h-5" />,
      current: '2 success / 3 breach',
      projected: '5 success / 0 breach',
      delta: '+3 deliveries saved',
      direction: 'positive' as ImpactDirection,
      impact: 'critical-positive'
    },
    {
      id: 'deliveries',
      label: 'Deliveries Affected',
      icon: <Package className="w-5 h-5" />,
      current: '5 total',
      projected: '3 reassigned',
      delta: '3 moved to DRV-312',
      direction: 'neutral' as ImpactDirection,
      impact: 'informational'
    },
    {
      id: 'workload',
      label: 'Driver Workload',
      icon: <User className="w-5 h-5" />,
      current: 'DRV-247: 92% utilized',
      projected: 'DRV-247: 80% / DRV-312: 50%',
      delta: 'Balanced distribution',
      direction: 'positive' as ImpactDirection,
      impact: 'moderate-positive'
    },
    {
      id: 'shift-risk',
      label: 'Shift Overrun Risk',
      icon: <Clock className="w-5 h-5" />,
      current: 'High (1h 25m buffer)',
      projected: 'Low (2h 40m buffer)',
      delta: '+1h 15m safety margin',
      direction: 'positive' as ImpactDirection,
      impact: 'moderate-positive'
    },
    {
      id: 'cost',
      label: 'Cost Implication',
      icon: <DollarSign className="w-5 h-5" />,
      current: '$3,700 penalty exposure',
      projected: '$0 penalty + $180 driver cost',
      delta: 'Net savings: $3,520',
      direction: 'positive' as ImpactDirection,
      impact: 'critical-positive'
    }
  ];

  const riskFlags = [
    {
      id: 'risk-1',
      title: 'Zone Boundary Crossing',
      level: 'acceptable' as RiskLevel,
      explanation: 'Driver #312 will cross from Central to East District, adding 8-minute detour to approach critical deliveries',
      impact: 'Extends travel time but maintains SLA compliance with buffer',
      mitigationNote: 'Route optimized to minimize cross-zone travel'
    },
    {
      id: 'risk-2',
      title: 'Driver #312 Capacity Utilization',
      level: 'acceptable' as RiskLevel,
      explanation: 'New assignment increases Driver #312 utilization from 35% to 50%',
      impact: 'Still within normal operating range (50-85% optimal)',
      mitigationNote: 'Driver has confirmed availability and familiarity with delivery area'
    },
    {
      id: 'risk-3',
      title: 'Communication Coordination Required',
      level: 'elevated' as RiskLevel,
      explanation: 'Mid-day reassignment requires real-time coordination between two drivers and dispatch',
      impact: 'Brief coordination window (10-15 minutes) needed to execute handoff',
      mitigationNote: 'Both drivers have confirmed radio availability and current location'
    }
  ];

  const policyEvaluation = {
    overallStatus: 'requires-escalation' as 'compliant' | 'requires-escalation' | 'violates-policy',
    policies: [
      {
        id: 'pol-1',
        name: 'VIP Customer Protection',
        status: 'escalation-required' as 'compliant' | 'escalation-required' | 'violated',
        description: 'VIP deliveries require management approval for any recovery',
        evaluation: 'Recovery protects VIP delivery (DEL-8472) from SLA breach',
        requiresEscalation: true,
        escalationReason: 'VIP customer involved with penalty exposure > $2,000'
      },
      {
        id: 'pol-2',
        name: 'Driver Hours of Service',
        status: 'compliant' as 'compliant' | 'escalation-required' | 'violated',
        description: 'Driver reassignments must respect HOS regulations',
        evaluation: 'Both drivers remain within daily hour limits with required breaks',
        requiresEscalation: false
      },
      {
        id: 'pol-3',
        name: 'Route Optimization Limits',
        status: 'compliant' as 'compliant' | 'escalation-required' | 'violated',
        description: 'Route modifications limited to +/- 3 stops',
        evaluation: 'Recovery moves 3 stops (within threshold)',
        requiresEscalation: false
      },
      {
        id: 'pol-4',
        name: 'Cost Authorization Threshold',
        status: 'compliant' as 'compliant' | 'escalation-required' | 'violated',
        description: 'Recovery costs < $500 approved at dispatch level',
        evaluation: 'Additional driver cost: $180 (within threshold)',
        requiresEscalation: false
      }
    ],
    escalation: {
      required: true,
      reason: 'VIP customer impact with penalty exposure > $2,000',
      approver: 'Operations Manager',
      timeframe: 'Before execution'
    },
    costThresholds: {
      maxAuthorized: '$500',
      projectedCost: '$180',
      withinThreshold: true
    }
  };

  const getImpactColor = (direction: ImpactDirection, impact: string) => {
    if (impact.includes('positive')) {
      return 'bg-green-50 border-green-400 text-green-700';
    } else if (impact.includes('negative')) {
      return 'bg-red-50 border-red-400 text-red-700';
    } else {
      return 'bg-blue-50 border-blue-300 text-blue-700';
    }
  };

  const getImpactIcon = (direction: ImpactDirection) => {
    switch (direction) {
      case 'positive':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-blue-600" />;
    }
  };

  const getRiskLevelColor = (level: RiskLevel) => {
    switch (level) {
      case 'acceptable':
        return 'bg-green-50 border-green-300';
      case 'elevated':
        return 'bg-amber-50 border-amber-400';
      case 'critical':
        return 'bg-red-50 border-red-400';
    }
  };

  const getRiskLevelBadge = (level: RiskLevel) => {
    switch (level) {
      case 'acceptable':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded border border-green-300 uppercase">Acceptable</span>;
      case 'elevated':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-400 uppercase">Elevated</span>;
      case 'critical':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-400 uppercase">Critical</span>;
    }
  };

  const getPolicyStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'escalation-required':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'violated':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const canProceed = policyEvaluation.overallStatus !== 'violates-policy';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-blue-800 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-white">Impact & Feasibility Review</h1>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs rounded-lg border border-white/30 uppercase">
                    Analytical Assessment
                  </span>
                </div>
                <p className="text-blue-100 text-sm">
                  Review projected impact before proceeding to commit decision
                </p>
              </div>
            </div>

            {/* Draft Info */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-blue-100 mb-1">Recovery ID</div>
                <div className="text-white font-mono text-sm">{draftMetadata.recoveryId}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-blue-100 mb-1">Actions</div>
                <div className="text-white text-sm">{draftMetadata.actionsCount} drafted</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-blue-100 mb-1">Analysis Time</div>
                <div className="flex items-center gap-1 text-white text-sm">
                  <Activity className="w-3 h-3" />
                  {draftMetadata.analyzedAt}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1800px] mx-auto space-y-6">
          {/* Impact Metrics Summary */}
          <div className="grid grid-cols-5 gap-4">
            {impactMetrics.map((metric) => (
              <div
                key={metric.id}
                className={`p-4 rounded-lg border-2 ${getImpactColor(metric.direction, metric.impact)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium uppercase">{metric.label}</span>
                  {metric.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-xs opacity-75">Current: {metric.current}</div>
                  <div className="text-xs font-medium">Projected: {metric.projected}</div>
                  <div className="flex items-center gap-1 pt-2 border-t border-current/20">
                    {getImpactIcon(metric.direction)}
                    <span className="text-xs font-medium">{metric.delta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison View */}
          <div className="grid grid-cols-2 gap-6">
            {/* Current State */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-slate-600" />
                  Current State
                </h2>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-lg border border-red-300 uppercase">
                  At Risk
                </span>
              </div>

              {/* Current Routes */}
              <div className="bg-white rounded-lg border-2 border-slate-300 p-5">
                <h3 className="text-sm text-slate-700 font-medium mb-4">Route Configuration</h3>
                {currentState.routes.map((route) => (
                  <div key={route.id} className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-slate-900 font-medium font-mono mb-1">{route.id}</div>
                        <div className="text-xs text-slate-600">{route.driver}</div>
                      </div>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded uppercase">
                        {route.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-white rounded">
                        <div className="text-xs text-slate-600 mb-1">Progress</div>
                        <div className="text-slate-900">{route.stopsCompleted}/{route.stopsCompleted + route.stopsRemaining}</div>
                      </div>
                      <div className="p-2 bg-amber-100 rounded">
                        <div className="text-xs text-slate-600 mb-1">Delay</div>
                        <div className="text-amber-700 font-medium">+{route.delayMinutes}m</div>
                      </div>
                      <div className="p-2 bg-red-100 rounded">
                        <div className="text-xs text-slate-600 mb-1">At Risk</div>
                        <div className="text-red-700 font-medium">{route.stopsAtRisk} stops</div>
                      </div>
                      <div className="p-2 bg-white rounded">
                        <div className="text-xs text-slate-600 mb-1">Utilization</div>
                        <div className="text-slate-900">{route.shiftUtilization}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Delivery Outcomes */}
              <div className="bg-white rounded-lg border-2 border-slate-300 p-5">
                <h3 className="text-sm text-slate-700 font-medium mb-4">Delivery Outcomes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-300 rounded-lg">
                    <span className="text-sm text-slate-700">On Track</span>
                    <span className="text-green-700 font-medium">{currentState.deliveries.onTrack}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-300 rounded-lg">
                    <span className="text-sm text-slate-700">Projected Breach</span>
                    <span className="text-red-700 font-medium">{currentState.deliveries.atRisk}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-300 rounded-lg">
                    <span className="text-sm text-slate-700">Already Breached</span>
                    <span className="text-slate-700 font-medium">{currentState.deliveries.breached}</span>
                  </div>
                </div>
              </div>

              {/* Current Cost */}
              <div className="bg-white rounded-lg border-2 border-red-400 p-5">
                <h3 className="text-sm text-slate-700 font-medium mb-3">Penalty Exposure</h3>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Total at Risk</span>
                  <span className="text-2xl text-red-700 font-medium">{currentState.penaltyExposure}</span>
                </div>
              </div>
            </div>

            {/* Projected State */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-slate-900 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-slate-600" />
                  Projected State (Post-Recovery)
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-lg border border-green-300 uppercase">
                  Protected
                </span>
              </div>

              {/* Projected Routes */}
              <div className="bg-white rounded-lg border-2 border-slate-300 p-5">
                <h3 className="text-sm text-slate-700 font-medium mb-4">Route Configuration</h3>
                <div className="space-y-3">
                  {projectedState.routes.map((route) => (
                    <div
                      key={`${route.id}-${route.driver}`}
                      className={`p-4 rounded-lg border-2 ${
                        route.isNew ? 'bg-blue-50 border-blue-400' : 'bg-green-50 border-green-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 font-medium font-mono">{route.id}</span>
                            {route.isNew && (
                              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">NEW</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">{route.driver}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded uppercase ${
                          route.isNew ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {route.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-2 bg-white rounded">
                          <div className="text-xs text-slate-600 mb-1">Progress</div>
                          <div className="text-slate-900">{route.stopsCompleted}/{route.stopsCompleted + route.stopsRemaining}</div>
                        </div>
                        <div className="p-2 bg-green-100 rounded">
                          <div className="text-xs text-slate-600 mb-1">At Risk</div>
                          <div className="text-green-700 font-medium">{route.stopsAtRisk} stops</div>
                        </div>
                        <div className="p-2 bg-white rounded">
                          <div className="text-xs text-slate-600 mb-1">Utilization</div>
                          <div className="text-slate-900">{route.shiftUtilization}%</div>
                        </div>
                        <div className="p-2 bg-white rounded">
                          <div className="text-xs text-slate-600 mb-1">Est. Complete</div>
                          <div className="text-slate-900 text-xs">{route.estimatedCompletion}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projected Delivery Outcomes */}
              <div className="bg-white rounded-lg border-2 border-slate-300 p-5">
                <h3 className="text-sm text-slate-700 font-medium mb-4">Delivery Outcomes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-400 rounded-lg">
                    <span className="text-sm text-slate-700">On Track</span>
                    <span className="text-green-700 font-medium text-lg">{projectedState.deliveries.onTrack}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-300 rounded-lg">
                    <span className="text-sm text-slate-700">Projected Breach</span>
                    <span className="text-slate-700 font-medium">{projectedState.deliveries.atRisk}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-300 rounded-lg">
                    <span className="text-sm text-slate-700">Already Breached</span>
                    <span className="text-slate-700 font-medium">{projectedState.deliveries.breached}</span>
                  </div>
                </div>
              </div>

              {/* Projected Cost */}
              <div className="bg-white rounded-lg border-2 border-green-400 p-5">
                <h3 className="text-sm text-slate-700 font-medium mb-3">Cost Outcome</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 text-sm">Penalty Exposure</span>
                    <span className="text-lg text-green-700 font-medium">{projectedState.penaltyExposure}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                    <span className="text-slate-600">Additional Driver Cost</span>
                    <span className="text-slate-700">$180</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t-2 border-green-400">
                    <span className="text-green-800 font-medium">Net Savings</span>
                    <span className="text-xl text-green-700 font-medium">$3,520</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Flags */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-slate-900">Secondary Risks Introduced</h2>
            </div>

            <div className="space-y-4">
              {riskFlags.map((risk) => (
                <div
                  key={risk.id}
                  className={`p-5 rounded-lg border-2 ${getRiskLevelColor(risk.level)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-slate-900 font-medium">{risk.title}</h3>
                        {getRiskLevelBadge(risk.level)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-600 font-medium mb-1 uppercase">Why This Risk Exists</div>
                      <p className="text-sm text-slate-700">{risk.explanation}</p>
                    </div>

                    <div>
                      <div className="text-xs text-slate-600 font-medium mb-1 uppercase">Impact Assessment</div>
                      <p className="text-sm text-slate-700">{risk.impact}</p>
                    </div>

                    <div className="pt-3 border-t border-current/20">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-current flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-medium mb-1">Mitigation</div>
                          <p className="text-xs opacity-90">{risk.mitigationNote}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-blue-900 text-sm font-medium mb-1">Risk Assessment Summary</div>
                  <p className="text-blue-700 text-sm">
                    All identified risks are within acceptable operational parameters. Recovery plan introduces
                    manageable trade-offs while protecting critical SLA commitments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Evaluation */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-slate-600" />
                <h2 className="text-slate-900">Policy Evaluation</h2>
              </div>
              {policyEvaluation.overallStatus === 'compliant' && (
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 uppercase text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Within Policy
                </span>
              )}
              {policyEvaluation.overallStatus === 'requires-escalation' && (
                <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg border border-amber-300 uppercase text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Escalation Required
                </span>
              )}
            </div>

            {/* Policy Checks */}
            <div className="space-y-3 mb-5">
              {policyEvaluation.policies.map((policy) => (
                <div
                  key={policy.id}
                  className={`p-4 rounded-lg border ${
                    policy.requiresEscalation
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-green-50 border-green-300'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {getPolicyStatusIcon(policy.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-slate-900">{policy.name}</div>
                        {policy.requiresEscalation && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300 uppercase">
                            Escalation Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{policy.description}</p>
                      <div className="pt-2 border-t border-current/20">
                        <div className="text-xs text-slate-700">
                          <strong>Evaluation:</strong> {policy.evaluation}
                        </div>
                        {policy.requiresEscalation && (
                          <div className="text-xs text-amber-700 mt-1">
                            <strong>Reason:</strong> {policy.escalationReason}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Escalation Requirement */}
            {policyEvaluation.escalation.required && (
              <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-amber-900 font-medium mb-2">Management Escalation Required</div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-amber-700 mb-1">Reason</div>
                        <div className="text-amber-900">{policyEvaluation.escalation.reason}</div>
                      </div>
                      <div>
                        <div className="text-xs text-amber-700 mb-1">Approver</div>
                        <div className="text-amber-900">{policyEvaluation.escalation.approver}</div>
                      </div>
                      <div>
                        <div className="text-xs text-amber-700 mb-1">Timeframe</div>
                        <div className="text-amber-900">{policyEvaluation.escalation.timeframe}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="sticky bottom-0 bg-white border-t-2 border-slate-300 shadow-lg">
        <div className="px-6 py-4">
          <div className="max-w-[1800px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileCheck className="w-5 h-5 text-slate-600" />
              <div>
                <div className="text-sm text-slate-900 font-medium">Impact Analysis Complete</div>
                <div className="text-xs text-slate-600">
                  {policyEvaluation.escalation.required 
                    ? 'Recovery plan requires management approval before execution'
                    : 'Recovery plan meets all operational requirements'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Draft
              </button>

              <button
                onClick={onProceedToCommitReview}
                disabled={!canProceed}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  canProceed
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Eye className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Proceed to Commit Review</div>
                  <div className="text-xs opacity-80">
                    {canProceed ? 'Final confirmation before execution' : 'Policy violations must be resolved'}
                  </div>
                </div>
              </button>

              {policyEvaluation.escalation.required && (
                <button
                  onClick={onRequestEscalation}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-white shadow-lg"
                >
                  <AlertCircle className="w-5 h-5" />
                  Request Escalation
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}