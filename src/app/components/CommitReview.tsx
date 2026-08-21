import {
  ArrowLeft,
  AlertTriangle,
  Lock,
  CheckCircle,
  XCircle,
  Package,
  User,
  Route,
  Shield,
  FileText,
  Clock,
  DollarSign,
  Eye,
  Info,
  Zap,
  Radio,
  CheckSquare,
  Square,
  ArrowRight,
  AlertCircle,
  Activity,
  Calendar,
  MapPin,
  Navigation
} from 'lucide-react';
import { useState } from 'react';

interface CommitReviewProps {
  recoveryId: string;
  onBack: () => void;
  onCommit: (justification: string) => void;
}

export function CommitReview({
  recoveryId,
  onBack,
  onCommit
}: CommitReviewProps) {
  const [justification, setJustification] = useState('');
  const [acknowledgeIrreversible, setAcknowledgeIrreversible] = useState(false);
  const [acknowledgeImpact, setAcknowledgeImpact] = useState(false);
  const [acknowledgeEvidence, setAcknowledgeEvidence] = useState(false);
  const [acknowledgeEscalation, setAcknowledgeEscalation] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);

  // Mock data
  const commitData = {
    recoveryId: 'REC-2847-001',
    createdAt: '10:50 AM',
    currentTimestamp: '11:28 AM',
    
    // Drafted actions
    actions: [
      {
        id: 'action-1',
        type: 'Reassign Delivery',
        description: 'Move 3 deliveries from Driver #247 to Driver #312',
        scope: 'DEL-8472 (VIP), DEL-8491 (High), DEL-8503 (Standard)',
        source: 'Driver #247 / RT-2847',
        target: 'Driver #312 / New Assignment'
      }
    ],
    
    // Impacted entities
    impactedRoutes: [
      { id: 'RT-2847', driver: 'Driver #247', status: 'Modified', changes: '-3 stops removed' }
    ],
    impactedDrivers: [
      { id: 'DRV-247', name: 'Driver #247', impact: 'Load reduced from 23 to 20 stops', status: 'Active' },
      { id: 'DRV-312', name: 'Driver #312', impact: 'New assignment of 3 stops added', status: 'Active' }
    ],
    impactedDeliveries: [
      { id: 'DEL-8472', customer: 'Acme Corporation', priority: 'VIP', change: 'Reassigned to DRV-312' },
      { id: 'DEL-8491', customer: 'Tech Solutions Ltd', priority: 'High', change: 'Reassigned to DRV-312' },
      { id: 'DEL-8503', customer: 'City Retail Store', priority: 'Standard', change: 'Reassigned to DRV-312' }
    ],
    
    // Evidence snapshot
    evidenceSnapshot: {
      snapshotId: 'SNAP-2847-001',
      timestamp: '10:42 AM',
      dataScope: 'Route status, traffic data, driver availability, delivery SLA windows',
      locked: true,
      systemConfidence: 'high',
      sources: ['Route telemetry', 'Traffic API', 'Driver mobile app', 'SLA database']
    },
    
    // Policy & governance
    policyCompliance: {
      overallStatus: 'compliant-with-escalation',
      checks: [
        { name: 'VIP Customer Protection', status: 'compliant', escalationRequired: true },
        { name: 'Driver Hours of Service', status: 'compliant', escalationRequired: false },
        { name: 'Route Optimization Limits', status: 'compliant', escalationRequired: false },
        { name: 'Cost Authorization Threshold', status: 'compliant', escalationRequired: false }
      ]
    },
    
    escalationApproval: {
      required: true,
      status: 'pending',
      approver: 'Operations Manager',
      reason: 'VIP customer impact with penalty exposure > $2,000',
      requestedAt: '11:28 AM',
      note: 'Approval must be obtained before commit'
    },
    
    thresholds: {
      sla: {
        criticalDeliveriesAtRisk: 1,
        totalDeliveriesAtRisk: 2,
        projectedBreaches: 0,
        status: 'within-limits'
      },
      cost: {
        penaltyExposure: '$3,700',
        recoveryCost: '$180',
        netImpact: '$3,520 savings',
        threshold: '$500',
        status: 'within-threshold'
      }
    },
    
    // Impact summary
    impactSummary: {
      deliveriesSaved: 3,
      penaltiesAvoided: '$3,700',
      driversAffected: 2,
      routesModified: 1,
      estimatedExecutionTime: '8-12 minutes',
      coordinationRequired: 'Real-time driver coordination via radio'
    }
  };

  const canCommit = 
    justification.trim().length >= 20 &&
    acknowledgeIrreversible &&
    acknowledgeImpact &&
    acknowledgeEvidence &&
    acknowledgeEscalation;

  const handleCommit = () => {
    if (canCommit) {
      if (confirm('FINAL CONFIRMATION: This action is irreversible and will be executed immediately. Are you absolutely certain you want to proceed?')) {
        setIsCommitting(true);
        onCommit(justification);
      }
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'VIP':
        return <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded">VIP</span>;
      case 'High':
        return <span className="px-2 py-0.5 bg-amber-600 text-white text-xs rounded">HIGH</span>;
      default:
        return <span className="px-2 py-0.5 bg-slate-400 text-white text-xs rounded">STD</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Commit Warning Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 border-b-4 border-red-900 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-white">Commit Review & Risk Gate</h1>
                  <span className="px-3 py-1 bg-white/30 backdrop-blur text-white text-xs rounded-lg border-2 border-white/50 uppercase font-medium flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    Final Checkpoint
                  </span>
                </div>
                <p className="text-red-100 text-sm">
                  Deliberate confirmation required before irreversible execution
                </p>
              </div>
            </div>

            {/* Commit Info */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-red-100 mb-1">Recovery ID</div>
                <div className="text-white font-mono text-sm">{commitData.recoveryId}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-red-100 mb-1">Commit Timestamp</div>
                <div className="flex items-center gap-1 text-white text-sm">
                  <Clock className="w-3 h-3" />
                  {commitData.currentTimestamp}
                </div>
              </div>
            </div>
          </div>

          {/* Irreversibility Warning */}
          <div className="bg-white/10 backdrop-blur border-2 border-white/30 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  IRREVERSIBLE ACTION WARNING
                </div>
                <p className="text-red-50 text-sm mb-2">
                  Once committed, this recovery plan will be executed immediately and cannot be undone. 
                  Driver assignments, route modifications, and delivery reassignments will take effect in real-time.
                </p>
                <div className="flex items-center gap-2 text-red-100 text-xs">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Live execution will begin within 30-60 seconds of commit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Recovery Summary */}
          <div className="bg-white rounded-lg border-2 border-red-400 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-red-600" />
              <h2 className="text-slate-900">Recovery Action Summary</h2>
            </div>

            {/* Drafted Actions */}
            <div className="mb-6">
              <h3 className="text-sm text-slate-700 font-medium mb-3 uppercase">Drafted Actions to Execute</h3>
              <div className="space-y-3">
                {commitData.actions.map((action, index) => (
                  <div key={action.id} className="p-5 bg-red-50 border-2 border-red-400 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-lg text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 mb-2">{action.type}</div>
                        <p className="text-sm text-slate-700 mb-3">{action.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-white border border-red-300 rounded">
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Source</div>
                            <div className="text-sm text-slate-900">{action.source}</div>
                          </div>
                          <div className="flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Target</div>
                            <div className="text-sm text-slate-900">{action.target}</div>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded">
                          <div className="text-xs text-amber-800 font-medium mb-1">Scope</div>
                          <div className="text-sm text-amber-900">{action.scope}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impacted Entities */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Routes */}
              <div>
                <h4 className="text-xs text-slate-700 font-medium mb-2 uppercase flex items-center gap-2">
                  <Route className="w-4 h-4" />
                  Impacted Routes ({commitData.impactedRoutes.length})
                </h4>
                <div className="space-y-2">
                  {commitData.impactedRoutes.map((route) => (
                    <div key={route.id} className="p-3 bg-slate-50 border border-slate-300 rounded">
                      <div className="text-sm font-medium font-mono text-slate-900 mb-1">{route.id}</div>
                      <div className="text-xs text-slate-600 mb-2">{route.driver}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded">{route.status}</span>
                        <span className="text-slate-600">{route.changes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drivers */}
              <div>
                <h4 className="text-xs text-slate-700 font-medium mb-2 uppercase flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Impacted Drivers ({commitData.impactedDrivers.length})
                </h4>
                <div className="space-y-2">
                  {commitData.impactedDrivers.map((driver) => (
                    <div key={driver.id} className="p-3 bg-slate-50 border border-slate-300 rounded">
                      <div className="text-sm font-medium text-slate-900 mb-1">{driver.name}</div>
                      <div className="text-xs text-slate-600 font-mono mb-2">{driver.id}</div>
                      <div className="text-xs text-slate-700">{driver.impact}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliveries */}
              <div>
                <h4 className="text-xs text-slate-700 font-medium mb-2 uppercase flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Impacted Deliveries ({commitData.impactedDeliveries.length})
                </h4>
                <div className="space-y-2">
                  {commitData.impactedDeliveries.map((delivery) => (
                    <div key={delivery.id} className="p-3 bg-slate-50 border border-slate-300 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium font-mono text-slate-900">{delivery.id}</span>
                        {getPriorityBadge(delivery.priority)}
                      </div>
                      <div className="text-xs text-slate-700 mb-1">{delivery.customer}</div>
                      <div className="text-xs text-amber-700">{delivery.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Snapshot */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-600" />
                <h2 className="text-slate-900">Evidence Snapshot</h2>
              </div>
              <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs rounded-lg border border-green-300 uppercase font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Locked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-xs text-slate-600 mb-1">Snapshot ID</div>
                  <div className="text-sm text-slate-900 font-mono">{commitData.evidenceSnapshot.snapshotId}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-xs text-slate-600 mb-1">Captured At</div>
                  <div className="flex items-center gap-1 text-sm text-slate-900">
                    <Calendar className="w-3 h-3" />
                    {commitData.evidenceSnapshot.timestamp}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-xs text-slate-600 mb-1">System Confidence</div>
                  <div className="flex items-center gap-1 text-sm">
                    <Activity className="w-3 h-3 text-green-600" />
                    <span className="text-green-700 font-medium capitalize">{commitData.evidenceSnapshot.systemConfidence}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-xs text-slate-600 mb-2">Data Scope</div>
                  <p className="text-sm text-slate-700">{commitData.evidenceSnapshot.dataScope}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-xs text-slate-600 mb-2">Data Sources</div>
                  <div className="flex flex-wrap gap-1">
                    {commitData.evidenceSnapshot.sources.map((source, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2 text-sm">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-blue-700">
                  Evidence snapshot is immutable and will be preserved for audit and compliance purposes.
                </span>
              </div>
            </div>
          </div>

          {/* Policy & Governance Check */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-5 h-5 text-slate-600" />
              <h2 className="text-slate-900">Policy & Governance Check</h2>
            </div>

            {/* Policy Compliance */}
            <div className="mb-5">
              <h3 className="text-sm text-slate-700 font-medium mb-3">Policy Compliance Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {commitData.policyCompliance.checks.map((check, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      check.escalationRequired
                        ? 'bg-amber-50 border-amber-300'
                        : 'bg-green-50 border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {check.status === 'compliant' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium text-slate-900">{check.name}</span>
                    </div>
                    {check.escalationRequired && (
                      <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
                        Escalation Required
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Escalation Approval */}
            {commitData.escalationApproval.required && (
              <div className="mb-5 p-4 bg-amber-50 border-2 border-amber-400 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-y-1 mb-3">
                      <div className="text-amber-900 font-medium">Management Escalation Approval</div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-400 uppercase">
                        {commitData.escalationApproval.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-xs text-amber-700 mb-1">Approver</div>
                        <div className="text-amber-900">{commitData.escalationApproval.approver}</div>
                      </div>
                      <div>
                        <div className="text-xs text-amber-700 mb-1">Requested At</div>
                        <div className="text-amber-900">{commitData.escalationApproval.requestedAt}</div>
                      </div>
                    </div>
                    <div className="text-xs text-amber-700 mb-2">Reason</div>
                    <p className="text-sm text-amber-900 mb-3">{commitData.escalationApproval.reason}</p>
                    <div className="p-2 bg-white border border-amber-300 rounded text-xs text-amber-800">
                      <strong>Note:</strong> {commitData.escalationApproval.note}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Thresholds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
                <h4 className="text-sm text-slate-700 font-medium mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  SLA Thresholds
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Critical at risk:</span>
                    <span className="text-slate-900">{commitData.thresholds.sla.criticalDeliveriesAtRisk}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Total at risk:</span>
                    <span className="text-slate-900">{commitData.thresholds.sla.totalDeliveriesAtRisk}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-green-300">
                    <span className="text-slate-600">Projected breaches:</span>
                    <span className="text-green-700 font-medium">{commitData.thresholds.sla.projectedBreaches}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
                <h4 className="text-sm text-slate-700 font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Cost Thresholds
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Penalty exposure:</span>
                    <span className="text-slate-900">{commitData.thresholds.cost.penaltyExposure}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Recovery cost:</span>
                    <span className="text-slate-900">{commitData.thresholds.cost.recoveryCost}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-green-300">
                    <span className="text-slate-600">Net impact:</span>
                    <span className="text-green-700 font-medium">{commitData.thresholds.cost.netImpact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mandatory Acknowledgments */}
          <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-lg border-2 border-red-400 shadow-lg p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-slate-900">Mandatory Acknowledgments</h2>
            </div>

            <div className="space-y-3 mb-6">
              <label 
                className="flex items-start gap-3 p-4 bg-white border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setAcknowledgeIrreversible(!acknowledgeIrreversible)}
              >
                <div className="pt-1">
                  {acknowledgeIrreversible ? (
                    <CheckSquare className="w-5 h-5 text-red-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900 mb-1">
                    I understand this action is irreversible and will execute immediately
                  </div>
                  <p className="text-xs text-slate-600">
                    Recovery actions cannot be undone once committed. Execution begins within 60 seconds.
                  </p>
                </div>
              </label>

              <label 
                className="flex items-start gap-3 p-4 bg-white border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setAcknowledgeImpact(!acknowledgeImpact)}
              >
                <div className="pt-1">
                  {acknowledgeImpact ? (
                    <CheckSquare className="w-5 h-5 text-red-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900 mb-1">
                    I have reviewed all impacted routes, drivers, and deliveries
                  </div>
                  <p className="text-xs text-slate-600">
                    {commitData.impactedDrivers.length} drivers, {commitData.impactedRoutes.length} routes, and {commitData.impactedDeliveries.length} deliveries will be affected.
                  </p>
                </div>
              </label>

              <label 
                className="flex items-start gap-3 p-4 bg-white border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setAcknowledgeEvidence(!acknowledgeEvidence)}
              >
                <div className="pt-1">
                  {acknowledgeEvidence ? (
                    <CheckSquare className="w-5 h-5 text-red-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900 mb-1">
                    I acknowledge the evidence snapshot is locked and immutable
                  </div>
                  <p className="text-xs text-slate-600">
                    Snapshot {commitData.evidenceSnapshot.snapshotId} captured at {commitData.evidenceSnapshot.timestamp} provides audit trail.
                  </p>
                </div>
              </label>

              <label 
                className="flex items-start gap-3 p-4 bg-white border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setAcknowledgeEscalation(!acknowledgeEscalation)}
              >
                <div className="pt-1">
                  {acknowledgeEscalation ? (
                    <CheckSquare className="w-5 h-5 text-red-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900 mb-1">
                    I understand escalation approval is required before execution
                  </div>
                  <p className="text-xs text-slate-600">
                    {commitData.escalationApproval.approver} approval must be obtained due to VIP customer impact.
                  </p>
                </div>
              </label>
            </div>

            {/* Mandatory Justification */}
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                Decision Justification (Required - minimum 20 characters)
              </label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Provide a clear justification for this recovery decision. Explain why this action is necessary and appropriate given the circumstances..."
                className="w-full h-32 p-4 border-2 border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <span className="text-xs text-slate-600">
                  This justification will be permanently recorded in the audit log.
                </span>
                <span className={`text-xs ${justification.length >= 20 ? 'text-green-600' : 'text-red-600'}`}>
                  {justification.length} / 20 minimum
                </span>
              </div>
            </div>
          </div>

          {/* Impact Summary Preview */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-blue-600" />
              <h3 className="text-blue-900 font-medium">Expected Outcome Summary</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Deliveries Saved</div>
                <div className="text-xl text-green-700 font-medium">{commitData.impactSummary.deliveriesSaved}</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Penalties Avoided</div>
                <div className="text-xl text-green-700 font-medium">{commitData.impactSummary.penaltiesAvoided}</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Execution Time</div>
                <div className="text-xl text-blue-700 font-medium">{commitData.impactSummary.estimatedExecutionTime}</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white rounded-lg text-sm">
              <div className="text-xs text-slate-600 mb-1">Coordination Required</div>
              <div className="text-slate-700">{commitData.impactSummary.coordinationRequired}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="sticky bottom-0 bg-white border-t-4 border-red-600 shadow-2xl">
        <div className="px-4 sm:px-6 py-5">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <Lock className="w-6 h-6 text-red-600" />
                <div>
                  <div className="text-sm text-slate-900 font-medium">Final Risk Gate</div>
                  <div className="text-xs text-slate-600">
                    {canCommit
                      ? 'All requirements met - ready to commit'
                      : 'Complete all acknowledgments and justification to proceed'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onBack}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-400 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Cancel & Return to Draft</span>
                </button>

                <button
                  onClick={handleCommit}
                  disabled={!canCommit}
                  className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg transition-all text-lg ${
                    canCommit
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl border-2 border-red-800 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
                  }`}
                >
                  <Lock className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium uppercase tracking-wide">Commit & Execute</div>
                    <div className="text-xs opacity-90 font-normal normal-case">
                      {canCommit ? 'Irreversible - Will execute immediately' : 'Requirements not met'}
                    </div>
                  </div>
                  <Zap className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!canCommit && (
              <div className="p-3 bg-amber-50 border-2 border-amber-400 rounded-lg">
                <div className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-amber-800">
                    <strong>Requirements:</strong> Check all 4 acknowledgments and provide decision justification (min. 20 characters) to enable commit.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}