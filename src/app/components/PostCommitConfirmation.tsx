import {
  CheckCircle,
  Clock,
  Package,
  User,
  Route,
  ArrowRight,
  Activity,
  FileText,
  Eye,
  History,
  Radio,
  Zap,
  Navigation,
  TrendingUp,
  Shield,
  Info,
  ExternalLink,
  ChevronRight,
  PlayCircle
} from 'lucide-react';

interface PostCommitConfirmationProps {
  recoveryId: string;
  onViewExecutionMonitor: () => void;
  onViewDecisionHistory: () => void;
  onReturnToDashboard: () => void;
}

export function PostCommitConfirmation({
  recoveryId,
  onViewExecutionMonitor,
  onViewDecisionHistory,
  onReturnToDashboard
}: PostCommitConfirmationProps) {
  // Mock data
  const commitData = {
    recoveryId: 'REC-2847-001',
    committedAt: '11:32 AM',
    committedBy: 'Dispatch Manager',
    estimatedCompletionTime: '11:40 AM',
    
    executionSummary: {
      actionsExecuting: 1,
      driversNotified: 2,
      routesModified: 1,
      deliveriesReassigned: 3,
      estimatedDuration: '8-12 minutes'
    },
    
    actionsExecuting: [
      {
        id: 'action-1',
        type: 'Reassign Delivery',
        description: 'Move 3 deliveries from Driver #247 to Driver #312',
        status: 'executing',
        startedAt: '11:32 AM'
      }
    ],
    
    affectedEntities: {
      routes: [
        { id: 'RT-2847', driver: 'Driver #247', change: 'Modified - 3 stops removed' }
      ],
      drivers: [
        { id: 'DRV-247', name: 'Driver #247', notified: true, status: 'Acknowledged' },
        { id: 'DRV-312', name: 'Driver #312', notified: true, status: 'Acknowledged' }
      ],
      deliveries: [
        { id: 'DEL-8472', customer: 'Acme Corporation', priority: 'VIP', change: 'Reassigned to DRV-312' },
        { id: 'DEL-8491', customer: 'Tech Solutions Ltd', priority: 'High', change: 'Reassigned to DRV-312' },
        { id: 'DEL-8503', customer: 'City Retail Store', priority: 'Standard', change: 'Reassigned to DRV-312' }
      ]
    },
    
    expectedOutcome: {
      deliveriesSaved: 3,
      penaltiesAvoided: '$3,700',
      projectedBreaches: 0,
      confidence: 'high'
    },
    
    justification: 'Critical VIP delivery (DEL-8472) at immediate risk of SLA breach due to Driver #247 route delay. Reassignment to Driver #312 protects all 3 at-risk deliveries while maintaining operational balance and compliance with HOS requirements.',
    
    evidenceSnapshot: {
      snapshotId: 'SNAP-2847-001',
      timestamp: '10:42 AM',
      locked: true
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Confirmation Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 border-b-4 border-green-800">
        <div className="px-4 sm:px-6 py-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Success Icon and Message */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
              <div className="p-4 bg-white rounded-xl shadow-lg">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-white text-2xl sm:text-3xl mb-2">Recovery Plan Committed Successfully</h1>
                <p className="text-green-100 text-lg mb-4">
                  Execution is now underway. All affected drivers have been notified and are coordinating the handoff.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-lg border border-white/30">
                    <FileText className="w-4 h-4 text-white" />
                    <span className="text-white font-mono text-sm">{commitData.recoveryId}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-lg border border-white/30">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">Committed at {commitData.committedAt}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-lg border border-white/30">
                    <User className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{commitData.committedBy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Execution Status Banner */}
            <div className="bg-white/10 backdrop-blur border border-white/30 rounded-lg p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Radio className="w-5 h-5 text-white animate-pulse" />
                  <div>
                    <div className="text-white font-medium mb-1">Live Execution in Progress</div>
                    <div className="text-green-100 text-sm">
                      Estimated completion: {commitData.estimatedCompletionTime} ({commitData.executionSummary.estimatedDuration})
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-center px-4">
                    <div className="text-white text-2xl font-medium">{commitData.executionSummary.actionsExecuting}</div>
                    <div className="text-green-100 text-xs">Actions</div>
                  </div>
                  <div className="h-12 w-px bg-white/30" />
                  <div className="text-center px-4">
                    <div className="text-white text-2xl font-medium">{commitData.executionSummary.driversNotified}</div>
                    <div className="text-green-100 text-xs">Drivers Notified</div>
                  </div>
                  <div className="h-12 w-px bg-white/30" />
                  <div className="text-center px-4">
                    <div className="text-white text-2xl font-medium">{commitData.executionSummary.deliveriesReassigned}</div>
                    <div className="text-green-100 text-xs">Deliveries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Actions Being Executed */}
          <div className="bg-white rounded-lg border-2 border-green-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <PlayCircle className="w-5 h-5 text-green-600" />
              <h2 className="text-slate-900">Actions Being Executed</h2>
            </div>

            <div className="space-y-4">
              {commitData.actionsExecuting.map((action, index) => (
                <div key={action.id} className="p-5 bg-green-50 border-2 border-green-400 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-y-2 mb-3">
                        <div>
                          <h3 className="text-slate-900 font-medium mb-1">{action.type}</h3>
                          <p className="text-sm text-slate-700">{action.description}</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300">
                          <Activity className="w-4 h-4 animate-pulse" />
                          <span className="text-sm font-medium capitalize">{action.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-green-700">
                        <Clock className="w-3 h-3" />
                        <span>Started at {action.startedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affected Entities */}
          <div className="bg-white rounded-lg border-2 border-slate-200 shadow-sm p-6">
            <h2 className="text-slate-900 mb-5">Affected Entities</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Routes */}
              <div>
                <h3 className="text-sm text-slate-700 font-medium mb-3 uppercase flex items-center gap-2">
                  <Route className="w-4 h-4" />
                  Routes Modified ({commitData.affectedEntities.routes.length})
                </h3>
                <div className="space-y-2">
                  {commitData.affectedEntities.routes.map((route) => (
                    <div key={route.id} className="p-3 bg-blue-50 border border-blue-300 rounded-lg">
                      <div className="text-sm font-medium font-mono text-slate-900 mb-1">{route.id}</div>
                      <div className="text-xs text-slate-600 mb-2">{route.driver}</div>
                      <div className="text-xs text-blue-700">{route.change}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drivers */}
              <div>
                <h3 className="text-sm text-slate-700 font-medium mb-3 uppercase flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Drivers Notified ({commitData.affectedEntities.drivers.length})
                </h3>
                <div className="space-y-2">
                  {commitData.affectedEntities.drivers.map((driver) => (
                    <div key={driver.id} className="p-3 bg-green-50 border border-green-300 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-slate-900">{driver.name}</div>
                        {driver.notified && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="text-xs text-slate-600 font-mono mb-1">{driver.id}</div>
                      <div className="flex items-center gap-1 text-xs text-green-700">
                        <span className="font-medium">{driver.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliveries */}
              <div>
                <h3 className="text-sm text-slate-700 font-medium mb-3 uppercase flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Deliveries Reassigned ({commitData.affectedEntities.deliveries.length})
                </h3>
                <div className="space-y-2">
                  {commitData.affectedEntities.deliveries.map((delivery) => (
                    <div key={delivery.id} className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium font-mono text-slate-900">{delivery.id}</span>
                        {getPriorityBadge(delivery.priority)}
                      </div>
                      <div className="text-xs text-slate-700 mb-2">{delivery.customer}</div>
                      <div className="text-xs text-slate-600">{delivery.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-300 p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h2 className="text-slate-900">Expected Outcome</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="text-xs text-slate-600 mb-2">Deliveries Protected</div>
                <div className="text-2xl text-green-700 font-medium">{commitData.expectedOutcome.deliveriesSaved}</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="text-xs text-slate-600 mb-2">Penalties Avoided</div>
                <div className="text-2xl text-green-700 font-medium">{commitData.expectedOutcome.penaltiesAvoided}</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="text-xs text-slate-600 mb-2">Projected Breaches</div>
                <div className="text-2xl text-green-700 font-medium">{commitData.expectedOutcome.projectedBreaches}</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="text-xs text-slate-600 mb-2">System Confidence</div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-lg text-green-700 font-medium capitalize">{commitData.expectedOutcome.confidence}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-green-300 rounded-lg">
              <div className="text-xs text-slate-600 font-medium mb-2 uppercase">Decision Justification</div>
              <p className="text-sm text-slate-700">{commitData.justification}</p>
            </div>
          </div>

          {/* Next Steps Guidance */}
          <div className="bg-white rounded-lg border-2 border-blue-300 shadow-lg p-6">
            <div className="flex items-center gap-2 mb-5">
              <Navigation className="w-5 h-5 text-blue-600" />
              <h2 className="text-slate-900">Next Steps</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Execution Monitor */}
              <button
                onClick={onViewExecutionMonitor}
                className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-slate-900 font-medium mb-2">Monitor Live Execution</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Track real-time progress of recovery actions, driver coordination, and delivery handoffs.
                </p>
                <div className="flex items-center gap-2 text-blue-700 text-sm font-medium">
                  <span>View Execution Monitor</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Decision History */}
              <button
                onClick={onViewDecisionHistory}
                className="group p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-400 rounded-lg hover:from-slate-100 hover:to-slate-200 transition-all text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-600 rounded-lg group-hover:bg-slate-700 transition-colors">
                    <History className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-slate-900 font-medium mb-2">Review Decision Audit Trail</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Access complete decision history including evidence snapshot, justification, and approvals.
                </p>
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <span>View Decision History</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Additional Info */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-blue-900 text-sm font-medium mb-1">Recovery Execution Underway</div>
                  <p className="text-blue-700 text-sm">
                    All actions are executing automatically. Drivers have acknowledged their assignments and coordination
                    is in progress. You will receive notifications when execution completes or if intervention is required.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Reference */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-sm text-slate-900 font-medium">Evidence Snapshot Preserved</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Snapshot {commitData.evidenceSnapshot.snapshotId} captured at {commitData.evidenceSnapshot.timestamp} and locked for audit compliance
                  </div>
                </div>
              </div>
              <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs rounded-lg border border-green-300 uppercase font-medium">
                Locked
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t-2 border-green-300 shadow-lg">
        <div className="px-4 sm:px-6 py-4">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-sm text-slate-900 font-medium">Recovery Committed & Executing</div>
                <div className="text-xs text-slate-600">
                  No further action required - monitoring recommended
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onViewExecutionMonitor}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Monitor Execution</span>
              </button>

              <button
                onClick={onReturnToDashboard}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
