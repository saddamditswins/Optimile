import {
  ArrowLeft,
  Shield,
  Lock,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  FileText,
  User,
  Calendar,
  TrendingUp,
  Info,
  Package,
  Route as RouteIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

interface EscalationReviewProps {
  escalationId: string;
  onBack: () => void;
  onApprove: (justification: string, constraints?: string) => void;
  onReject: (justification: string) => void;
}

export function EscalationReview({
  escalationId,
  onBack,
  onApprove,
  onReject
}: EscalationReviewProps) {
  const [decision, setDecision] = useState<'approve' | 'reject' | 'clarify' | null>(null);
  const [justification, setJustification] = useState('');
  const [showEvidence, setShowEvidence] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock data
  const escalationData = {
    escalationId: 'ESC-2847-001',
    recoveryId: 'REC-2847-001',
    submittedAt: '2:35 PM',
    submittedDate: 'December 31, 2025',
    submittedBy: 'Sarah Chen',
    submitterRole: 'Dispatch Manager',
    currentStatus: 'Awaiting decision',
    
    governance: {
      policyName: 'Single Intervention Cost Limit',
      policyThreshold: '$4,000',
      actualValue: '$4,200',
      exceedanceAmount: '$200',
      exceedancePercent: '5%'
    },
    
    requestedActions: [
      {
        id: 'action-1',
        type: 'Delivery Reassignment',
        description: 'Transfer 3 deliveries from Driver #247 to Driver #312',
        scope: 'DEL-8472 (VIP), DEL-8491 (VIP), DEL-8503 (VIP)'
      }
    ],
    
    impactScope: {
      routes: 2,
      drivers: 2,
      deliveries: {
        total: 3,
        vip: 3,
        high: 0,
        standard: 0
      }
    },
    
    businessTradeoff: {
      penaltiesAvoided: '$8,500',
      deliveriesProtected: 3,
      vipDeliveriesProtected: 3,
      recoveryCost: '$4,200',
      netBenefit: '$4,300'
    },
    
    supportingEvidence: {
      slaWindows: [
        {
          deliveryId: 'DEL-8472',
          customer: 'Acme Corp',
          window: '3:00 PM - 4:00 PM',
          penalty: '$2,800'
        },
        {
          deliveryId: 'DEL-8491',
          customer: 'TechStart Inc',
          window: '3:30 PM - 5:00 PM',
          penalty: '$3,200'
        },
        {
          deliveryId: 'DEL-8503',
          customer: 'Global Logistics',
          window: '4:00 PM - 5:30 PM',
          penalty: '$2,500'
        }
      ],
      riskFactors: [
        'Driver #312 confirmed available and acknowledged',
        '8 minutes from first delivery location',
        'Light traffic expected for next 2 hours'
      ],
      alternativesConsidered: 'Delayed to next day (customer rejected), local driver unavailable',
      assumptions: 'Driver vehicle breakdown on Route RT-2847, cross-zone coordination required'
    },
    
    dispatcherJustification: 'Three VIP deliveries on Route RT-2847 are at risk of missing their delivery windows due to driver vehicle breakdown. The proposed recovery reassigns these deliveries to Driver #312 who is nearby and has capacity. While the intervention cost exceeds the $4,000 threshold due to cross-zone coordination requirements, the potential SLA penalties total $8,500, making this a net-positive decision. Driver #312 has confirmed availability.'
  };

  const canSubmit = justification.trim().length >= 10;

  const handleDecision = () => {
    if (canSubmit) {
      setShowConfirmation(true);
    }
  };

  const confirmDecision = () => {
    if (decision === 'approve') {
      onApprove(justification);
    } else if (decision === 'reject') {
      onReject(justification);
    }
    // Note: 'clarify' would trigger a different flow in real implementation
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* LAYER 0 — ENTRY CONTEXT (Neutral Orientation) */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div>
                <h1 className="text-slate-900 font-medium">Escalation Review</h1>
                <p className="text-slate-600 text-sm">Operations Manager governance decision</p>
              </div>
            </div>

            {/* Context Info */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Escalation ID</div>
                <div className="text-slate-900 font-mono text-sm">{escalationData.escalationId}</div>
              </div>
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Recovery ID</div>
                <div className="text-slate-900 font-mono text-sm">{escalationData.recoveryId}</div>
              </div>
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Submitted By</div>
                <div className="text-slate-900 text-sm">{escalationData.submittedBy}</div>
              </div>
              <div className="px-3 py-2 bg-blue-50 rounded-lg border border-blue-300">
                <div className="text-xs text-blue-700 mb-1">Status</div>
                <div className="text-blue-900 text-sm font-medium">{escalationData.currentStatus}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* LAYER 1 — GOVERNANCE VERDICT (Primary Focus - Why Approval Required) */}
          <div className="bg-white rounded-lg border-2 border-slate-400 shadow-md p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-slate-700" />
              <h2 className="text-slate-900 text-lg font-medium">Policy Exception Required</h2>
            </div>

            <div className="p-6 bg-slate-50 border-2 border-slate-300 rounded-lg">
              <div className="mb-5">
                <div className="text-xs text-slate-600 mb-2 uppercase font-medium">Policy Breached</div>
                <div className="text-slate-900 font-medium text-lg mb-1">{escalationData.governance.policyName}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="p-4 bg-white border border-slate-300 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Policy Threshold</div>
                  <div className="text-slate-900 font-medium text-lg">{escalationData.governance.policyThreshold}</div>
                </div>
                <div className="p-4 bg-white border border-slate-300 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Actual Value</div>
                  <div className="text-slate-900 font-medium text-lg">{escalationData.governance.actualValue}</div>
                </div>
                <div className="p-4 bg-white border border-slate-300 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Exceeds By</div>
                  <div className="text-slate-900 font-medium text-lg">
                    {escalationData.governance.exceedanceAmount} 
                    <span className="text-sm text-slate-600 ml-1">({escalationData.governance.exceedancePercent})</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                <div className="flex items-center gap-2 text-blue-900 font-medium">
                  <Lock className="w-5 h-5 text-blue-700" />
                  <span>Approval is required before execution</span>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 2 — REQUESTED ACTION (What is Being Approved) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Requested Actions</h2>
            </div>

            <div className="space-y-3 mb-5">
              {escalationData.requestedActions.map((action, index) => (
                <div key={action.id} className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white rounded-lg text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900 mb-2">{action.type}</div>
                      <p className="text-sm text-slate-700 mb-2">{action.description}</p>
                      <div className="text-xs text-slate-600">Scope: {action.scope}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Scope Summary */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Impact Scope</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RouteIcon className="w-3 h-3 text-blue-700" />
                    <span className="text-xs text-slate-600">Routes</span>
                  </div>
                  <div className="text-lg text-slate-900 font-medium">{escalationData.impactScope.routes}</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-3 h-3 text-green-700" />
                    <span className="text-xs text-slate-600">Drivers</span>
                  </div>
                  <div className="text-lg text-slate-900 font-medium">{escalationData.impactScope.drivers}</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-3 h-3 text-purple-700" />
                    <span className="text-xs text-slate-600">Deliveries</span>
                  </div>
                  <div className="text-lg text-slate-900 font-medium">
                    {escalationData.impactScope.deliveries.total}
                    {escalationData.impactScope.deliveries.vip > 0 && (
                      <span className="text-xs text-purple-700 ml-1">({escalationData.impactScope.deliveries.vip} VIP)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 3 — BUSINESS TRADE-OFF (Rationale) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Business Impact Analysis</h2>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Benefits */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">If Approved</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Penalties Avoided</div>
                    <div className="text-2xl text-green-700 font-medium">{escalationData.businessTradeoff.penaltiesAvoided}</div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Deliveries Protected</div>
                    <div className="text-2xl text-green-700 font-medium">
                      {escalationData.businessTradeoff.deliveriesProtected}
                      <span className="text-sm text-green-600 ml-2">
                        ({escalationData.businessTradeoff.vipDeliveriesProtected} VIP)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Costs */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Cost of Recovery</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Intervention Cost</div>
                    <div className="text-2xl text-slate-900 font-medium">{escalationData.businessTradeoff.recoveryCost}</div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Net Benefit</div>
                    <div className="text-2xl text-blue-700 font-medium">{escalationData.businessTradeoff.netBenefit}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 4 — SUPPORTING EVIDENCE (Secondary, Collapsible) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm">
            <button
              onClick={() => setShowEvidence(!showEvidence)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-600" />
                <h2 className="text-slate-900 font-medium">Supporting Evidence</h2>
                <span className="text-xs text-slate-600">(Optional - Click to expand)</span>
              </div>
              {showEvidence ? (
                <ChevronUp className="w-5 h-5 text-slate-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {showEvidence && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-200 space-y-4">
                {/* SLA Windows */}
                <div>
                  <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">SLA Windows</h3>
                  <div className="space-y-2">
                    {escalationData.supportingEvidence.slaWindows.map((sla) => (
                      <div key={sla.deliveryId} className="p-3 bg-slate-50 border border-slate-200 rounded text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-slate-900">{sla.deliveryId}</span>
                          <span className="text-slate-600">{sla.penalty}</span>
                        </div>
                        <div className="text-xs text-slate-600">
                          {sla.customer} • {sla.window}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Factors */}
                <div>
                  <h3 className="text-xs text-slate-600 font-medium mb-2 uppercase">Risk Factors</h3>
                  <ul className="space-y-1">
                    {escalationData.supportingEvidence.riskFactors.map((risk, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alternatives */}
                <div>
                  <h3 className="text-xs text-slate-600 font-medium mb-2 uppercase">Alternatives Considered</h3>
                  <p className="text-sm text-slate-700">{escalationData.supportingEvidence.alternativesConsidered}</p>
                </div>

                {/* Assumptions */}
                <div>
                  <h3 className="text-xs text-slate-600 font-medium mb-2 uppercase">Assumptions</h3>
                  <p className="text-sm text-slate-700">{escalationData.supportingEvidence.assumptions}</p>
                </div>
              </div>
            )}
          </div>

          {/* LAYER 5 — DISPATCHER JUSTIFICATION (Human Context) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Dispatcher Justification</h2>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-sm text-slate-700 leading-relaxed">{escalationData.dispatcherJustification}</p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
              <Calendar className="w-3 h-3" />
              <span>Submitted: {escalationData.submittedAt} on {escalationData.submittedDate}</span>
            </div>
          </div>

          {/* LAYER 6 — AUTHORITY & IRREVERSIBILITY STATEMENT */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Decision Authority & Execution Behavior</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Approval Authority</div>
                <div className="text-slate-900 font-medium">Operations Manager</div>
              </div>
              <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">If Approved</div>
                <div className="text-slate-900 font-medium">Recovery executes</div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">If Rejected</div>
                <div className="text-slate-900 font-medium">Returns to dispatcher</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-start gap-2 text-sm">
                <Info className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  This decision will be permanently recorded in the audit log with your identity and timestamp.
                </span>
              </div>
            </div>
          </div>

          {/* LAYER 7 — DECISION ACTION (Commitment) */}
          <div className="bg-white rounded-lg border-2 border-blue-400 shadow-lg p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-6 h-6 text-blue-700" />
              <h2 className="text-slate-900 font-medium text-lg">Make Governance Decision</h2>
            </div>

            {/* Decision Options */}
            <div className="space-y-3 mb-6">
              <label 
                onClick={() => setDecision('approve')}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  decision === 'approve'
                    ? 'bg-green-50 border-green-400 shadow-md'
                    : 'bg-white border-slate-300 hover:border-green-300'
                }`}
              >
                <div className="pt-0.5">
                  {decision === 'approve' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-900 font-medium mb-1">Approve Escalation</div>
                  <p className="text-xs text-slate-600">
                    Authorize execution of this policy-breaching recovery plan
                  </p>
                </div>
              </label>

              <label 
                onClick={() => setDecision('reject')}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  decision === 'reject'
                    ? 'bg-red-50 border-red-400 shadow-md'
                    : 'bg-white border-slate-300 hover:border-red-300'
                }`}
              >
                <div className="pt-0.5">
                  {decision === 'reject' ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-900 font-medium mb-1">Reject Escalation</div>
                  <p className="text-xs text-slate-600">
                    Deny approval and return to Dispatch Manager for revision
                  </p>
                </div>
              </label>

              <label 
                onClick={() => setDecision('clarify')}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  decision === 'clarify'
                    ? 'bg-blue-50 border-blue-400 shadow-md'
                    : 'bg-white border-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="pt-0.5">
                  {decision === 'clarify' ? (
                    <Info className="w-5 h-5 text-blue-600" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-900 font-medium mb-1">Request Clarification</div>
                  <p className="text-xs text-slate-600">
                    Ask Dispatch Manager to provide additional information
                  </p>
                </div>
              </label>
            </div>

            {/* Justification Input */}
            <div className="mb-6">
              <label className="text-sm text-slate-900 font-medium mb-2 block flex items-center gap-2">
                Decision Justification
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded border border-blue-300 uppercase font-medium">
                  Required
                </span>
              </label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder={
                  decision === 'approve' 
                    ? "Explain why you are approving this escalation despite policy breach..." 
                    : decision === 'reject'
                    ? "Explain why you are rejecting this escalation and what needs to change..."
                    : decision === 'clarify'
                    ? "Specify what additional information you need before making a decision..."
                    : "Select a decision option above to provide justification..."
                }
                disabled={!decision}
                className="w-full h-32 p-4 border-2 border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-600">
                  This justification will be permanently recorded in the audit log.
                </span>
                <span className={`text-xs ${justification.length >= 10 ? 'text-green-600' : 'text-slate-600'}`}>
                  {justification.length} / 10 minimum
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleDecision}
              disabled={!decision || !canSubmit}
              className={`w-full py-4 rounded-lg font-medium transition-all ${
                decision && canSubmit
                  ? decision === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                    : decision === 'reject'
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {!decision ? 'Select Decision First' : 
               !canSubmit ? 'Add Justification (min 10 chars)' :
               decision === 'approve' ? 'Submit Approval' : 
               decision === 'reject' ? 'Submit Rejection' : 
               'Submit Request for Clarification'}
            </button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${
                decision === 'approve' ? 'bg-green-100' : 
                decision === 'reject' ? 'bg-red-100' : 
                'bg-blue-100'
              }`}>
                {decision === 'approve' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : decision === 'reject' ? (
                  <XCircle className="w-6 h-6 text-red-600" />
                ) : (
                  <Info className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <h3 className="text-lg text-slate-900 font-medium">
                Confirm {decision === 'approve' ? 'Approval' : decision === 'reject' ? 'Rejection' : 'Clarification Request'}
              </h3>
            </div>

            <p className="text-sm text-slate-700 mb-6">
              {decision === 'approve' 
                ? `You are about to approve escalation ${escalationData.escalationId}. This decision is permanent and will authorize the Dispatch Manager to proceed with execution.`
                : decision === 'reject'
                ? `You are about to reject escalation ${escalationData.escalationId}. The Dispatch Manager will need to revise their recovery plan.`
                : `You are requesting clarification on escalation ${escalationData.escalationId}. The Dispatch Manager will be asked to provide additional information.`}
            </p>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-300 mb-6">
              <div className="text-xs text-slate-600 mb-1">Your Justification</div>
              <div className="text-sm text-slate-900">{justification}</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
              >
                Go Back
              </button>
              <button
                onClick={confirmDecision}
                className={`flex-1 px-4 py-3 rounded-lg transition-colors font-medium ${
                  decision === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : decision === 'reject'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Confirm {decision === 'approve' ? 'Approval' : decision === 'reject' ? 'Rejection' : 'Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
