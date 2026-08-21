import {
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  FileText,
  User,
  ArrowRight,
  History,
  AlertTriangle,
  ArrowLeft,
  Eye,
  Edit,
  Info,
  Activity,
  Lock,
  ExternalLink
} from 'lucide-react';

interface EscalationStatusProps {
  escalationId: string;
  onBack: () => void;
  onProceedToCommitReview: () => void;
  onReviseRecoveryPlan: () => void;
  onViewDecisionHistory: () => void;
}

type EscalationStatus = 'pending' | 'approved' | 'rejected';

export function EscalationStatus({
  escalationId,
  onBack,
  onProceedToCommitReview,
  onReviseRecoveryPlan,
  onViewDecisionHistory
}: EscalationStatusProps) {
  // Mock data - change status to test different states
  const escalationData = {
    escalationId: 'ESC-2847-001',
    recoveryId: 'REC-2847-001',
    status: 'approved' as EscalationStatus, // Change to 'pending' or 'rejected' to test
    submittedAt: '11:35 AM',
    submittedBy: 'Dispatch Manager',
    
    requestDetails: {
      reason: 'VIP Customer Impact',
      severity: 'critical',
      justification: 'Critical VIP delivery (DEL-8472) at immediate risk of SLA breach due to Driver #247 route delay. Reassignment to Driver #312 protects all 3 at-risk deliveries while maintaining operational balance and compliance with HOS requirements. Time-sensitive: approval needed within 45 minutes to prevent guaranteed SLA breaches.'
    },
    
    approvalOutcome: {
      decidedAt: '11:42 AM',
      decidedBy: 'Sarah Chen - Operations Manager',
      decision: 'approved' as EscalationStatus,
      approvalNotes: 'Approved. VIP customer protection is critical priority. Recovery plan is sound with acceptable risk profile. Driver coordination confirmed. Proceed with execution immediately upon commit.',
      conditions: [
        'Execute within 30 minutes of approval',
        'Confirm driver coordination before commit',
        'Monitor execution closely for any secondary issues'
      ]
    },
    
    rejectionOutcome: {
      decidedAt: '11:40 AM',
      decidedBy: 'Sarah Chen - Operations Manager',
      decision: 'rejected' as EscalationStatus,
      rejectionReason: 'Alternative resolution available',
      rejectionNotes: 'Rejected. Consider reassigning only the VIP delivery (DEL-8472) instead of all three deliveries. This would achieve the primary objective while reducing coordination complexity and driver workload impact.',
      revisionGuidance: 'Revise recovery plan to target only critical VIP delivery. Re-submit for expedited review.'
    },
    
    timeElapsed: '7 minutes',
    auditRecordId: 'AUDIT-2847-ESC-001'
  };

  const getStatusBadge = (status: EscalationStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg border-2 border-amber-400 uppercase font-medium flex items-center gap-2">
            <Clock className="w-5 h-5 animate-pulse" />
            Pending Review
          </span>
        );
      case 'approved':
        return (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg border-2 border-green-400 uppercase font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg border-2 border-red-400 uppercase font-medium flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Rejected
          </span>
        );
    }
  };

  const getHeaderGradient = (status: EscalationStatus) => {
    switch (status) {
      case 'pending':
        return 'from-amber-600 to-amber-700 border-amber-900';
      case 'approved':
        return 'from-green-600 to-green-700 border-green-900';
      case 'rejected':
        return 'from-red-600 to-red-700 border-red-900';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Escalation Status Header */}
      <header className={`bg-gradient-to-r ${getHeaderGradient(escalationData.status)} border-b-4 sticky top-0 z-10`}>
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
                  <h1 className="text-white">Escalation Status & Tracking</h1>
                  {getStatusBadge(escalationData.status)}
                </div>
                <p className={`text-sm ${
                  escalationData.status === 'approved' ? 'text-green-100' :
                  escalationData.status === 'rejected' ? 'text-red-100' :
                  'text-amber-100'
                }`}>
                  {escalationData.status === 'approved' && 'Approval received - you may proceed to commit review'}
                  {escalationData.status === 'rejected' && 'Request rejected - revision required before resubmission'}
                  {escalationData.status === 'pending' && 'Awaiting Operations Manager review and decision'}
                </p>
              </div>
            </div>

            {/* Escalation ID & Time */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-white/80 mb-1">Escalation ID</div>
                <div className="text-white font-mono text-sm">{escalationData.escalationId}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-white/80 mb-1">Time Since Submission</div>
                <div className="flex items-center gap-1 text-white text-sm">
                  <Clock className="w-3 h-3" />
                  {escalationData.timeElapsed}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-8">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Submission Details */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <h2 className="text-slate-900 mb-4">Escalation Request Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Recovery ID</div>
                <div className="text-sm text-slate-900 font-mono">{escalationData.recoveryId}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Submitted By</div>
                <div className="text-sm text-slate-900">{escalationData.submittedBy}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Submitted At</div>
                <div className="text-sm text-slate-900">{escalationData.submittedAt}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Escalation Reason</div>
                <div className="text-sm text-slate-900">{escalationData.requestDetails.reason}</div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-xs text-blue-700 font-medium mb-2 uppercase">Submitted Justification</div>
              <p className="text-sm text-blue-900">{escalationData.requestDetails.justification}</p>
            </div>
          </div>

          {/* Approval Outcome Section (if approved) */}
          {escalationData.status === 'approved' && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-400 shadow-lg p-6">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-slate-900">Approval Received</h2>
              </div>

              {/* Decision Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="p-4 bg-white rounded-lg border border-green-300">
                  <div className="text-xs text-slate-600 mb-1">Approved By</div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-900 font-medium">{escalationData.approvalOutcome.decidedBy}</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-green-300">
                  <div className="text-xs text-slate-600 mb-1">Approval Timestamp</div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-900 font-medium">{escalationData.approvalOutcome.decidedAt}</span>
                  </div>
                </div>
              </div>

              {/* Approval Notes */}
              <div className="p-5 bg-white border-2 border-green-400 rounded-lg mb-5">
                <div className="text-xs text-green-700 font-medium mb-2 uppercase">Approval Notes</div>
                <p className="text-sm text-slate-700 mb-4">{escalationData.approvalOutcome.approvalNotes}</p>

                {/* Conditions */}
                {escalationData.approvalOutcome.conditions && escalationData.approvalOutcome.conditions.length > 0 && (
                  <div className="pt-4 border-t border-green-300">
                    <div className="text-xs text-green-700 font-medium mb-2 uppercase">Approval Conditions</div>
                    <ul className="space-y-2">
                      {escalationData.approvalOutcome.conditions.map((condition, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Next Steps - Approved */}
              <div className="p-5 bg-green-100 border-2 border-green-400 rounded-lg">
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-green-900 font-medium mb-2">Next Step: Proceed to Commit Review</h3>
                    <p className="text-sm text-green-800 mb-4">
                      Your escalation request has been approved. You may now proceed to the Commit Review & Risk Gate 
                      screen to finalize and execute the recovery plan. Note: You must still explicitly commit the 
                      recovery plan - approval does not trigger automatic execution.
                    </p>
                    <button
                      onClick={onProceedToCommitReview}
                      className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Proceed to Commit Review</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Outcome Section (if rejected) */}
          {escalationData.status === 'rejected' && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-400 shadow-lg p-6">
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="w-6 h-6 text-red-600" />
                <h2 className="text-slate-900">Request Rejected</h2>
              </div>

              {/* Decision Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="p-4 bg-white rounded-lg border border-red-300">
                  <div className="text-xs text-slate-600 mb-1">Rejected By</div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-slate-900 font-medium">{escalationData.rejectionOutcome.decidedBy}</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-red-300">
                  <div className="text-xs text-slate-600 mb-1">Rejection Timestamp</div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-slate-900 font-medium">{escalationData.rejectionOutcome.decidedAt}</span>
                  </div>
                </div>
              </div>

              {/* Rejection Reason */}
              <div className="p-4 bg-white border-2 border-red-400 rounded-lg mb-4">
                <div className="text-xs text-red-700 font-medium mb-2 uppercase">Rejection Reason</div>
                <div className="text-sm text-red-900 font-medium">{escalationData.rejectionOutcome.rejectionReason}</div>
              </div>

              {/* Rejection Notes */}
              <div className="p-5 bg-white border border-red-300 rounded-lg mb-5">
                <div className="text-xs text-red-700 font-medium mb-2 uppercase">Rejection Notes</div>
                <p className="text-sm text-slate-700 mb-4">{escalationData.rejectionOutcome.rejectionNotes}</p>

                {/* Revision Guidance */}
                {escalationData.rejectionOutcome.revisionGuidance && (
                  <div className="pt-4 border-t border-red-300">
                    <div className="text-xs text-red-700 font-medium mb-2 uppercase">Revision Guidance</div>
                    <p className="text-sm text-slate-700">{escalationData.rejectionOutcome.revisionGuidance}</p>
                  </div>
                )}
              </div>

              {/* Next Steps - Rejected */}
              <div className="p-5 bg-red-100 border-2 border-red-400 rounded-lg">
                <div className="flex items-start gap-3">
                  <Edit className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-red-900 font-medium mb-2">Next Step: Revise Recovery Plan</h3>
                    <p className="text-sm text-red-800 mb-4">
                      Your escalation request has been rejected. Review the rejection notes and revision guidance above, 
                      then return to the Recovery Option Builder to modify your recovery plan according to the feedback provided.
                    </p>
                    <button
                      onClick={onReviseRecoveryPlan}
                      className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Revise Recovery Plan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pending Status (if pending) */}
          {escalationData.status === 'pending' && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-400 shadow-lg p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-6 h-6 text-amber-600 animate-pulse" />
                <h2 className="text-slate-900">Awaiting Operations Manager Review</h2>
              </div>

              <div className="p-5 bg-white border border-amber-300 rounded-lg mb-5">
                <div className="flex items-start gap-3 mb-4">
                  <Activity className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-amber-900 font-medium mb-2">Review in Progress</div>
                    <p className="text-sm text-amber-800">
                      Your escalation request has been submitted and is currently under review by the Operations Manager. 
                      You will be notified automatically when a decision is made.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-amber-200">
                  <div className="text-sm text-amber-700">
                    <strong>Submitted:</strong> {escalationData.submittedAt}
                  </div>
                  <div className="text-sm text-amber-700">
                    <strong>Time Elapsed:</strong> {escalationData.timeElapsed}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-100 border-2 border-amber-400 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-amber-900 font-medium mb-1">Recovery Plan on Hold</div>
                    <p className="text-sm text-amber-800">
                      The recovery plan cannot be executed until approval is received. The plan remains in draft state 
                      and no actions will be taken without explicit approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audit Reference */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-sm text-slate-900 font-medium">Decision Audit Record</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Complete escalation record preserved for audit and compliance
                  </div>
                </div>
              </div>
              <button
                onClick={onViewDecisionHistory}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">View in Decision History</span>
              </button>
            </div>
            <div className="mt-3 p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Audit Record ID</div>
              <div className="text-sm text-slate-900 font-mono">{escalationData.auditRecordId}</div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-900 text-sm font-medium mb-1">
                  {escalationData.status === 'approved' && 'Approval Does Not Auto-Execute'}
                  {escalationData.status === 'rejected' && 'Rejection Requires Plan Revision'}
                  {escalationData.status === 'pending' && 'Monitor Status for Updates'}
                </div>
                <p className="text-blue-700 text-sm">
                  {escalationData.status === 'approved' && 
                    'Receiving approval allows you to proceed, but you must still complete the Commit Review process and explicitly execute the recovery plan. Approval alone does not trigger any actions.'}
                  {escalationData.status === 'rejected' && 
                    'A rejected escalation means the recovery plan cannot proceed as originally drafted. Review the feedback, modify your recovery plan, and resubmit if necessary.'}
                  {escalationData.status === 'pending' && 
                    'The escalation request is under active review. The recovery plan will remain locked until a decision is made. You will be notified when the review is complete.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t-2 border-slate-300 shadow-lg">
        <div className="px-4 sm:px-6 py-4">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Shield className="w-6 h-6 text-slate-600" />
              <div>
                <div className="text-sm text-slate-900 font-medium">
                  Escalation {escalationData.status === 'pending' ? 'Pending' : escalationData.status === 'approved' ? 'Approved' : 'Rejected'}
                </div>
                <div className="text-xs text-slate-600">
                  {escalationData.status === 'pending' && 'Awaiting Operations Manager decision'}
                  {escalationData.status === 'approved' && 'Ready to proceed to Commit Review'}
                  {escalationData.status === 'rejected' && 'Plan revision required'}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {escalationData.status === 'approved' && (
                <button
                  onClick={onProceedToCommitReview}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium shadow-lg"
                >
                  <Eye className="w-5 h-5" />
                  <span>Proceed to Commit Review</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              {escalationData.status === 'rejected' && (
                <button
                  onClick={onReviseRecoveryPlan}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-lg"
                >
                  <Edit className="w-5 h-5" />
                  <span>Revise Recovery Plan</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
