import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  DollarSign,
  Package,
  Clock,
  FileText,
  History,
  ExternalLink,
  Lock,
  Info,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';

interface ExecutionOutcomeProps {
  commitId: string;
  recoveryId: string;
  onBack: () => void;
  onCloseRecovery: (closureReason: string, notes: string) => void;
  onViewDecisionHistory: () => void;
  onViewEvidenceSnapshot: () => void;
  onViewEscalationRecord?: () => void;
}

type OutcomeType = 'successful' | 'partial' | 'failed';
type SLAResult = 'met' | 'missed' | 'partially-met';

export function ExecutionOutcome({
  commitId,
  recoveryId,
  onBack,
  onCloseRecovery,
  onViewDecisionHistory,
  onViewEvidenceSnapshot,
  onViewEscalationRecord
}: ExecutionOutcomeProps) {
  const [selectedClosureReason, setSelectedClosureReason] = useState<OutcomeType | ''>('');
  const [closureNotes, setClosureNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock data
  const outcomeData = {
    commitId: 'CMT-2847-001',
    recoveryId: 'REC-2847-001',
    committedAt: '11:42 AM',
    completedAt: '11:55 AM',
    duration: '13 minutes',
    finalOutcome: 'successful' as OutcomeType,
    
    slaResult: {
      status: 'met' as SLAResult,
      deliveriesTargeted: 3,
      deliveriesRecovered: 3,
      deliveriesFailed: 0,
      details: 'All 3 deliveries successfully protected from SLA breach'
    },
    
    costImpact: {
      penaltiesAvoided: '$3,700',
      additionalCosts: '$180',
      netSavings: '$3,520',
      available: true
    },
    
    executionSummary: {
      totalSteps: 4,
      successfulSteps: 4,
      failedSteps: 0,
      driverAcknowledgments: {
        required: 2,
        received: 2,
        pending: 0,
        timedOut: 0
      }
    },
    
    auditRecords: {
      evidenceSnapshotId: 'SNAP-2847-001',
      decisionHistoryId: 'HIST-2847-001',
      escalationRecordId: 'ESC-2847-001',
      hasEscalation: true
    }
  };

  const canClose = selectedClosureReason !== '';

  const handleClose = () => {
    if (canClose) {
      setShowConfirmation(true);
    }
  };

  const confirmClose = () => {
    onCloseRecovery(selectedClosureReason, closureNotes);
  };

  const getOutcomeBadge = (outcome: OutcomeType) => {
    switch (outcome) {
      case 'successful':
        return (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg border-2 border-green-400 uppercase font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Successful Recovery
          </span>
        );
      case 'partial':
        return (
          <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg border-2 border-amber-400 uppercase font-medium flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Partial Recovery
          </span>
        );
      case 'failed':
        return (
          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg border-2 border-red-400 uppercase font-medium flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Failed Execution
          </span>
        );
    }
  };

  const getSLABadge = (status: SLAResult) => {
    switch (status) {
      case 'met':
        return (
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 uppercase text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            SLA Met
          </span>
        );
      case 'partially-met':
        return (
          <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg border border-amber-300 uppercase text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Partially Met
          </span>
        );
      case 'missed':
        return (
          <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg border border-red-300 uppercase text-sm font-medium flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            SLA Missed
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className={`bg-gradient-to-r ${
        outcomeData.finalOutcome === 'successful' ? 'from-green-600 to-green-700 border-green-900' :
        outcomeData.finalOutcome === 'partial' ? 'from-amber-600 to-amber-700 border-amber-900' :
        'from-red-600 to-red-700 border-red-900'
      } border-b-4 sticky top-0 z-10`}>
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
                  <h1 className="text-white">Execution Outcome & Closure</h1>
                  {getOutcomeBadge(outcomeData.finalOutcome)}
                </div>
                <p className={`text-sm ${
                  outcomeData.finalOutcome === 'successful' ? 'text-green-100' :
                  outcomeData.finalOutcome === 'partial' ? 'text-amber-100' :
                  'text-red-100'
                }`}>
                  Formal closure and outcome accountability for completed recovery execution
                </p>
              </div>
            </div>

            {/* Recovery Metadata */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-white/80 mb-1">Recovery ID</div>
                <div className="text-white font-mono text-sm">{outcomeData.recoveryId}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-white/80 mb-1">Commit ID</div>
                <div className="text-white font-mono text-sm">{outcomeData.commitId}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-white/80 mb-1">Duration</div>
                <div className="flex items-center gap-1 text-white text-sm">
                  <Clock className="w-3 h-3" />
                  {outcomeData.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-8">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Outcome Summary Header */}
          <div className={`bg-gradient-to-br rounded-lg border-2 shadow-lg p-6 ${
            outcomeData.finalOutcome === 'successful' ? 'from-green-50 to-blue-50 border-green-400' :
            outcomeData.finalOutcome === 'partial' ? 'from-amber-50 to-orange-50 border-amber-400' :
            'from-red-50 to-pink-50 border-red-400'
          }`}>
            <div className={`flex items-center gap-2 mb-4 ${
              outcomeData.finalOutcome === 'successful' ? 'text-green-700' :
              outcomeData.finalOutcome === 'partial' ? 'text-amber-700' :
              'text-red-700'
            }`}>
              {outcomeData.finalOutcome === 'successful' && <CheckCircle className="w-6 h-6" />}
              {outcomeData.finalOutcome === 'partial' && <AlertTriangle className="w-6 h-6" />}
              {outcomeData.finalOutcome === 'failed' && <XCircle className="w-6 h-6" />}
              <h2 className="text-slate-900">Final Execution Outcome</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-slate-300">
                <div className="text-xs text-slate-600 mb-1">Committed At</div>
                <div className="text-sm text-slate-900">{outcomeData.committedAt}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-300">
                <div className="text-xs text-slate-600 mb-1">Completed At</div>
                <div className="text-sm text-slate-900">{outcomeData.completedAt}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-300">
                <div className="text-xs text-slate-600 mb-1">Total Duration</div>
                <div className="text-sm text-slate-900">{outcomeData.duration}</div>
              </div>
            </div>
          </div>

          {/* Outcome Assessment */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <h2 className="text-slate-900 mb-5">Outcome Assessment</h2>

            {/* SLA Result */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-slate-600" />
                  <h3 className="text-slate-900 font-medium">SLA Result</h3>
                </div>
                {getSLABadge(outcomeData.slaResult.status)}
              </div>

              <div className={`p-5 rounded-lg border-2 ${
                outcomeData.slaResult.status === 'met' ? 'bg-green-50 border-green-300' :
                outcomeData.slaResult.status === 'partially-met' ? 'bg-amber-50 border-amber-300' :
                'bg-red-50 border-red-300'
              }`}>
                <p className={`text-sm mb-4 ${
                  outcomeData.slaResult.status === 'met' ? 'text-green-800' :
                  outcomeData.slaResult.status === 'partially-met' ? 'text-amber-800' :
                  'text-red-800'
                }`}>
                  {outcomeData.slaResult.details}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded">
                    <div className="text-xs text-slate-600 mb-1">Targeted</div>
                    <div className="text-lg text-slate-900 font-medium">{outcomeData.slaResult.deliveriesTargeted}</div>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <div className="text-xs text-slate-600 mb-1">Recovered</div>
                    <div className={`text-lg font-medium ${
                      outcomeData.slaResult.status === 'met' ? 'text-green-700' : 'text-amber-700'
                    }`}>
                      {outcomeData.slaResult.deliveriesRecovered}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <div className="text-xs text-slate-600 mb-1">Failed</div>
                    <div className={`text-lg font-medium ${
                      outcomeData.slaResult.deliveriesFailed === 0 ? 'text-slate-700' : 'text-red-700'
                    }`}>
                      {outcomeData.slaResult.deliveriesFailed}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Impact */}
            {outcomeData.costImpact.available && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-slate-600" />
                  <h3 className="text-slate-900 font-medium">Cost Impact</h3>
                </div>

                <div className="p-5 bg-blue-50 rounded-lg border-2 border-blue-300">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 bg-white rounded">
                      <div className="text-xs text-slate-600 mb-1">Penalties Avoided</div>
                      <div className="text-lg text-green-700 font-medium">{outcomeData.costImpact.penaltiesAvoided}</div>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <div className="text-xs text-slate-600 mb-1">Additional Costs</div>
                      <div className="text-lg text-blue-700 font-medium">{outcomeData.costImpact.additionalCosts}</div>
                    </div>
                    <div className="p-3 bg-white rounded border-2 border-green-400">
                      <div className="text-xs text-slate-600 mb-1">Net Savings</div>
                      <div className="text-xl text-green-700 font-medium">{outcomeData.costImpact.netSavings}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Execution Statistics */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-slate-600" />
                <h3 className="text-slate-900 font-medium">Execution Statistics</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-sm text-slate-700 mb-2">Execution Steps</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-green-700 font-medium">{outcomeData.executionSummary.successfulSteps}</span>
                    <span className="text-slate-600">/ {outcomeData.executionSummary.totalSteps} successful</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-sm text-slate-700 mb-2">Driver Acknowledgments</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-green-700 font-medium">{outcomeData.executionSummary.driverAcknowledgments.received}</span>
                    <span className="text-slate-600">/ {outcomeData.executionSummary.driverAcknowledgments.required} received</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closure Notes */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border-2 border-slate-400 shadow-lg p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-slate-600" />
              <h2 className="text-slate-900">Closure Documentation</h2>
            </div>

            {/* Closure Reason Selection */}
            <div className="mb-5">
              <label className="text-sm text-slate-900 font-medium mb-3 block flex items-center gap-2">
                Closure Reason
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded border border-red-300 uppercase">
                  Required
                </span>
              </label>

              <div className="space-y-2">
                <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedClosureReason === 'successful'
                    ? 'bg-green-50 border-green-400'
                    : 'bg-white border-slate-300 hover:border-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="closureReason"
                    value="successful"
                    checked={selectedClosureReason === 'successful'}
                    onChange={(e) => setSelectedClosureReason(e.target.value as OutcomeType)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 font-medium mb-1 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Successful Recovery
                    </div>
                    <p className="text-xs text-slate-600">
                      All execution steps completed successfully and recovery objectives achieved
                    </p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedClosureReason === 'partial'
                    ? 'bg-amber-50 border-amber-400'
                    : 'bg-white border-slate-300 hover:border-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="closureReason"
                    value="partial"
                    checked={selectedClosureReason === 'partial'}
                    onChange={(e) => setSelectedClosureReason(e.target.value as OutcomeType)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 font-medium mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Partial Recovery
                    </div>
                    <p className="text-xs text-slate-600">
                      Some execution steps succeeded but others failed; partial achievement of recovery objectives
                    </p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedClosureReason === 'failed'
                    ? 'bg-red-50 border-red-400'
                    : 'bg-white border-slate-300 hover:border-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="closureReason"
                    value="failed"
                    checked={selectedClosureReason === 'failed'}
                    onChange={(e) => setSelectedClosureReason(e.target.value as OutcomeType)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 font-medium mb-1 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      Failed Execution
                    </div>
                    <p className="text-xs text-slate-600">
                      Execution failed and recovery objectives were not achieved
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                Closure Notes <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <textarea
                value={closureNotes}
                onChange={(e) => setClosureNotes(e.target.value)}
                placeholder="Add any additional context, observations, or lessons learned from this recovery execution..."
                className="w-full h-32 p-4 border-2 border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-slate-600 mt-2">
                These notes will be recorded in the audit log and attached to the decision history record.
              </p>
            </div>
          </div>

          {/* Audit & Record Links */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <History className="w-5 h-5 text-slate-600" />
              <h2 className="text-slate-900">Audit & Record Links</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={onViewEvidenceSnapshot}
                className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="text-sm text-slate-900 font-medium">Evidence Snapshot</div>
                    <div className="text-xs text-slate-600">{outcomeData.auditRecords.evidenceSnapshotId}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={onViewDecisionHistory}
                className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <History className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="text-sm text-slate-900 font-medium">Decision History</div>
                    <div className="text-xs text-slate-600">View all decisions in recovery lifecycle</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </button>

              {outcomeData.auditRecords.hasEscalation && onViewEscalationRecord && (
                <button
                  onClick={onViewEscalationRecord}
                  className="flex items-center justify-between p-4 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-amber-600" />
                    <div className="text-left">
                      <div className="text-sm text-slate-900 font-medium">Escalation Record</div>
                      <div className="text-xs text-slate-600">{outcomeData.auditRecords.escalationRecordId}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-amber-600" />
                </button>
              )}
            </div>
          </div>

          {/* Closure Warning */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-amber-900 text-sm font-medium mb-1">Important: Closure is Irreversible</div>
                <p className="text-amber-800 text-sm">
                  Once you close this recovery, the decision record will be finalized and moved to history. 
                  Closed recoveries cannot be reopened or modified. Ensure all documentation is complete before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="sticky bottom-0 bg-white border-t-4 border-slate-600 shadow-2xl">
        <div className="px-4 sm:px-6 py-5">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Lock className="w-6 h-6 text-slate-600" />
                <div>
                  <div className="text-sm text-slate-900 font-medium">Final Recovery Closure</div>
                  <div className="text-xs text-slate-600">
                    {canClose
                      ? 'Ready to close and finalize recovery record'
                      : 'Select closure reason to proceed'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onBack}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-400 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleClose}
                  disabled={!canClose}
                  className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg transition-all text-lg ${
                    canClose
                      ? 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-xl border-2 border-slate-900 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
                  }`}
                >
                  <Lock className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium uppercase tracking-wide">Close Recovery</div>
                    <div className="text-xs opacity-90 font-normal normal-case">
                      {canClose ? 'Finalize and move to history' : 'Select closure reason first'}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg text-slate-900 font-medium">Confirm Recovery Closure</h3>
            </div>

            <p className="text-sm text-slate-700 mb-6">
              You are about to permanently close this recovery execution. This action cannot be undone. 
              The recovery record will be finalized and moved to decision history.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmClose}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors font-medium"
              >
                Confirm Closure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}