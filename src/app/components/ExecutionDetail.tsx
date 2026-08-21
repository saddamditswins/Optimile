import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Package,
  Route,
  Radio,
  Eye,
  FileText,
  Bell,
  Activity,
  Zap,
  AlertCircle,
  ExternalLink,
  Plus,
  Info
} from 'lucide-react';

interface ExecutionDetailProps {
  commitId: string;
  onBack: () => void;
  onViewRoute: (routeId: string) => void;
  onViewDriver: (driverId: string) => void;
  onViewDelivery: (deliveryId: string) => void;
  onCreateException: () => void;
}

type StepStatus = 'success' | 'failed' | 'pending';
type FailureType = 'technical' | 'human' | 'external';
type AcknowledgmentStatus = 'acknowledged' | 'pending' | 'timeout';

export function ExecutionDetail({
  commitId,
  onBack,
  onViewRoute,
  onViewDriver,
  onViewDelivery,
  onCreateException
}: ExecutionDetailProps) {
  // Mock data
  const executionData = {
    commitId: 'CMT-2847-001',
    recoveryId: 'REC-2847-001',
    committedAt: '11:42 AM',
    committedBy: 'Dispatch Manager',
    overallStatus: 'in-progress' as 'in-progress' | 'completed' | 'failed' | 'partially-failed',
    description: 'Reassign 3 deliveries from Driver #247 to Driver #312',
    
    executionSteps: [
      {
        id: 'step-1',
        sequenceNumber: 1,
        description: 'Remove deliveries from DRV-247 route manifest',
        targetEntity: {
          type: 'route',
          id: 'RT-2847',
          label: 'Route RT-2847'
        },
        status: 'success' as StepStatus,
        executedAt: '11:42:15 AM',
        duration: '2 seconds',
        technicalDetails: 'Route manifest updated via fleet management system API'
      },
      {
        id: 'step-2',
        sequenceNumber: 2,
        description: 'Add deliveries to DRV-312 route manifest',
        targetEntity: {
          type: 'route',
          id: 'RT-3124',
          label: 'Route RT-3124 (DRV-312)'
        },
        status: 'success' as StepStatus,
        executedAt: '11:42:18 AM',
        duration: '3 seconds',
        technicalDetails: 'Route manifest updated with optimized sequence'
      },
      {
        id: 'step-3',
        sequenceNumber: 3,
        description: 'Notify Driver #247 of route modification',
        targetEntity: {
          type: 'driver',
          id: 'DRV-247',
          label: 'Driver #247 (Marcus Chen)'
        },
        status: 'pending' as StepStatus,
        acknowledgment: {
          status: 'pending' as AcknowledgmentStatus,
          sentAt: '11:42:20 AM',
          timeoutAt: '11:52:20 AM',
          timeRemaining: '4 minutes'
        },
        technicalDetails: 'Push notification sent to driver mobile device'
      },
      {
        id: 'step-4',
        sequenceNumber: 4,
        description: 'Notify Driver #312 of new delivery assignments',
        targetEntity: {
          type: 'driver',
          id: 'DRV-312',
          label: 'Driver #312 (Sarah Rodriguez)'
        },
        status: 'pending' as StepStatus,
        acknowledgment: {
          status: 'pending' as AcknowledgmentStatus,
          sentAt: '11:42:22 AM',
          timeoutAt: '11:52:22 AM',
          timeRemaining: '4 minutes'
        },
        technicalDetails: 'Push notification sent to driver mobile device'
      }
    ],
    
    affectedEntities: {
      routes: ['RT-2847', 'RT-3124'],
      drivers: ['DRV-247', 'DRV-312'],
      deliveries: ['DEL-8472', 'DEL-8491', 'DEL-8503']
    },
    
    hasFailures: false
  };

  const getStepStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
    }
  };

  const getStepStatusBadge = (status: StepStatus) => {
    switch (status) {
      case 'success':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded border border-green-300 uppercase">Success</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-300 uppercase">Failed</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-300 uppercase">Pending</span>;
    }
  };

  const getOverallStatusBadge = () => {
    switch (executionData.overallStatus) {
      case 'in-progress':
        return (
          <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg border-2 border-blue-400 uppercase text-sm font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 animate-pulse" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border-2 border-green-400 uppercase text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed
          </span>
        );
      case 'partially-failed':
        return (
          <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg border-2 border-amber-400 uppercase text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Partial Failure
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg border-2 border-red-400 uppercase text-sm font-medium flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Failed
          </span>
        );
    }
  };

  const getAcknowledgmentBadge = (status: AcknowledgmentStatus) => {
    switch (status) {
      case 'acknowledged':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded border border-green-300 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Acknowledged</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300 flex items-center gap-1"><Clock className="w-3 h-3" />Awaiting Response</span>;
      case 'timeout':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-300 flex items-center gap-1"><XCircle className="w-3 h-3" />Timeout</span>;
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'route':
        return <Route className="w-4 h-4 text-blue-600" />;
      case 'driver':
        return <User className="w-4 h-4 text-green-600" />;
      case 'delivery':
        return <Package className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

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
                  <h1 className="text-white">Execution Detail</h1>
                  {getOverallStatusBadge()}
                </div>
                <p className="text-blue-100 text-sm">
                  Step-by-step execution tracking for committed recovery
                </p>
              </div>
            </div>

            {/* Commit Info */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-blue-100 mb-1">Commit ID</div>
                <div className="text-white font-mono text-sm">{executionData.commitId}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-blue-100 mb-1">Recovery ID</div>
                <div className="text-white font-mono text-sm">{executionData.recoveryId}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-blue-100 mb-1">Committed At</div>
                <div className="flex items-center gap-1 text-white text-sm">
                  <Clock className="w-3 h-3" />
                  {executionData.committedAt}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Execution Summary Panel */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <h2 className="text-slate-900 mb-4">Execution Summary</h2>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-sm text-slate-700 mb-3 font-medium">Recovery Description</div>
                <p className="text-slate-900">{executionData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xs text-slate-600 mb-1">Committed By</div>
                  <div className="text-sm text-slate-900">{executionData.committedBy}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xs text-slate-600 mb-1">Steps Progress</div>
                  <div className="text-sm text-slate-900">
                    {executionData.executionSteps.filter(s => s.status === 'success').length} / {executionData.executionSteps.length} completed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Steps Timeline */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-slate-600" />
                <h2 className="text-slate-900">Execution Steps Timeline</h2>
              </div>
              <span className="text-xs text-slate-600">Real-time execution tracking</span>
            </div>

            <div className="space-y-4">
              {executionData.executionSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`relative pl-12 pb-6 ${
                    index !== executionData.executionSteps.length - 1 ? 'border-l-2 ml-6' : ''
                  } ${
                    step.status === 'success' ? 'border-green-300' :
                    step.status === 'failed' ? 'border-red-300' :
                    'border-blue-300'
                  }`}
                >
                  {/* Step Number Circle */}
                  <div className={`absolute -left-6 top-0 flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                    step.status === 'success' ? 'bg-green-100 border-green-300' :
                    step.status === 'failed' ? 'bg-red-100 border-red-300' :
                    'bg-blue-100 border-blue-300'
                  }`}>
                    {getStepStatusIcon(step.status)}
                  </div>

                  {/* Step Content */}
                  <div className={`p-5 rounded-lg border-2 ${
                    step.status === 'success' ? 'bg-green-50 border-green-300' :
                    step.status === 'failed' ? 'bg-red-50 border-red-300' :
                    'bg-blue-50 border-blue-300'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-slate-900 font-medium">
                            Step {step.sequenceNumber}: {step.description}
                          </h3>
                          {getStepStatusBadge(step.status)}
                        </div>

                        {/* Target Entity */}
                        <div className="flex items-center gap-2 mb-3">
                          {getEntityIcon(step.targetEntity.type)}
                          <span className="text-sm text-slate-700">
                            Target: <strong>{step.targetEntity.label}</strong>
                          </span>
                          <button
                            onClick={() => {
                              if (step.targetEntity.type === 'route') onViewRoute(step.targetEntity.id);
                              if (step.targetEntity.type === 'driver') onViewDriver(step.targetEntity.id);
                              if (step.targetEntity.type === 'delivery') onViewDelivery(step.targetEntity.id);
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-700 text-xs flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </button>
                        </div>

                        {/* Technical Details */}
                        <div className="text-xs text-slate-600 mb-2">
                          {step.technicalDetails}
                        </div>
                      </div>
                    </div>

                    {/* Execution Metadata */}
                    {step.status !== 'pending' && (
                      <div className="flex items-center gap-4 pt-3 border-t border-current/20 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-current" />
                          <span className="text-slate-700">
                            Executed at <strong>{step.executedAt}</strong>
                          </span>
                        </div>
                        <div className="text-slate-600">
                          Duration: {step.duration}
                        </div>
                      </div>
                    )}

                    {/* Acknowledgment Tracking */}
                    {step.acknowledgment && (
                      <div className={`mt-4 p-4 rounded-lg border-2 ${
                        step.acknowledgment.status === 'acknowledged' ? 'bg-green-100 border-green-400' :
                        step.acknowledgment.status === 'timeout' ? 'bg-red-100 border-red-400' :
                        'bg-amber-100 border-amber-400'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Bell className="w-4 h-4 text-current" />
                              <span className="text-sm font-medium text-slate-900">Driver Acknowledgment</span>
                              {getAcknowledgmentBadge(step.acknowledgment.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-700">Notification sent:</span>
                                <strong className="ml-1 text-slate-900">{step.acknowledgment.sentAt}</strong>
                              </div>
                              {step.acknowledgment.status === 'pending' && (
                                <div>
                                  <span className="text-amber-800">Time remaining:</span>
                                  <strong className="ml-1 text-amber-900">{step.acknowledgment.timeRemaining}</strong>
                                </div>
                              )}
                            </div>

                            {step.acknowledgment.status === 'pending' && (
                              <div className="mt-2 p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-800 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span>
                                  Driver acknowledgment is required to complete this step. System will auto-timeout at {step.acknowledgment.timeoutAt} if no response received.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Failure Details (if failed) */}
                    {step.status === 'failed' && (
                      <div className="mt-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                        <div className="flex items-start gap-3">
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-red-900 font-medium mb-2">Execution Failure</div>
                            <div className="text-sm text-red-800 mb-2">
                              Error message would appear here with detailed failure reason
                            </div>
                            <div className="text-xs text-red-700">
                              <strong>Failure Type:</strong> Technical / Human / External Dependency
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affected Entities Quick Links */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <h2 className="text-slate-900 mb-4">Affected Entities</h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Route className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-slate-700 font-medium">Routes</span>
                </div>
                <div className="space-y-2">
                  {executionData.affectedEntities.routes.map((routeId) => (
                    <button
                      key={routeId}
                      onClick={() => onViewRoute(routeId)}
                      className="flex items-center justify-between w-full px-3 py-2 bg-white hover:bg-blue-100 rounded border border-blue-300 transition-colors text-sm"
                    >
                      <span className="text-slate-900 font-mono">{routeId}</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-slate-700 font-medium">Drivers</span>
                </div>
                <div className="space-y-2">
                  {executionData.affectedEntities.drivers.map((driverId) => (
                    <button
                      key={driverId}
                      onClick={() => onViewDriver(driverId)}
                      className="flex items-center justify-between w-full px-3 py-2 bg-white hover:bg-green-100 rounded border border-green-300 transition-colors text-sm"
                    >
                      <span className="text-slate-900 font-mono">{driverId}</span>
                      <ExternalLink className="w-3 h-3 text-green-600" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-slate-700 font-medium">Deliveries</span>
                </div>
                <div className="space-y-2">
                  {executionData.affectedEntities.deliveries.map((deliveryId) => (
                    <button
                      key={deliveryId}
                      onClick={() => onViewDelivery(deliveryId)}
                      className="flex items-center justify-between w-full px-3 py-2 bg-white hover:bg-purple-100 rounded border border-purple-300 transition-colors text-sm"
                    >
                      <span className="text-slate-900 font-mono">{deliveryId}</span>
                      <ExternalLink className="w-3 h-3 text-purple-600" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Execution Failure Action */}
          {executionData.hasFailures && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-amber-900 font-medium mb-2">Execution Failure Detected</h3>
                  <p className="text-sm text-amber-800 mb-4">
                    One or more execution steps have failed. To address this issue, you must create a new exception 
                    that will initiate a fresh decision cycle. You cannot retry or override from this screen.
                  </p>
                  <button
                    onClick={onCreateException}
                    className="flex items-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    Create New Exception
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Information Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-900 text-sm font-medium mb-1">Read-Only Execution View</div>
                <p className="text-blue-700 text-sm">
                  This screen provides transparent monitoring of execution status. No retry, rollback, or override 
                  actions are available. If execution fails, create a new exception to initiate a fresh recovery decision cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t-2 border-slate-300 shadow-lg">
        <div className="px-6 py-4">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Activity className="w-5 h-5 text-slate-600" />
              <div>
                <div className="text-sm text-slate-900 font-medium">
                  Live Execution Tracking
                </div>
                <div className="text-xs text-slate-600">
                  {executionData.executionSteps.filter(s => s.status === 'success').length} / {executionData.executionSteps.length} steps completed
                </div>
              </div>
            </div>

            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Execution Monitor
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
