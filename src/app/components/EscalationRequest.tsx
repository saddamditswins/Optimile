import {
  AlertTriangle,
  Lock,
  Shield,
  Clock,
  Package,
  User,
  Route,
  DollarSign,
  FileText,
  AlertCircle,
  ArrowLeft,
  Send,
  Info,
  XCircle,
  TrendingUp,
  Eye,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

interface EscalationRequestProps {
  recoveryId: string;
  onCancel: () => void;
  onSubmitEscalation: (justification: string) => void;
}

export function EscalationRequest({
  recoveryId,
  onCancel,
  onSubmitEscalation
}: EscalationRequestProps) {
  const [justification, setJustification] = useState('');

  // Mock data
  const escalationData = {
    recoveryId: 'REC-2847-001',
    triggeringAlert: {
      id: 'ALT-8931',
      type: 'Route Delay',
      description: 'Driver #247 delayed 12 minutes - 3 deliveries at SLA breach risk'
    },
    
    governance: {
      policyName: 'VIP Customer Protection Policy',
      policyVersion: 'v2.4',
      thresholdName: 'Penalty Exposure Limit',
      thresholdValue: '$2,000',
      actualValue: '$3,700',
      requiresApprovalFrom: 'Operations Manager',
      currentState: 'Awaiting approval'
    },
    
    requestedActions: [
      {
        id: 'action-1',
        type: 'Reassign Delivery',
        description: 'Move 3 deliveries from Driver #247 to Driver #312',
        scope: 'DEL-8472 (VIP), DEL-8491 (High), DEL-8503 (Standard)'
      }
    ],
    
    impactScope: {
      routes: 1,
      drivers: 2,
      deliveries: {
        total: 3,
        vip: 1,
        high: 1,
        standard: 1
      }
    },
    
    businessTradeoff: {
      penaltiesAvoided: '$3,700',
      deliveriesProtected: 3,
      vipDeliveriesProtected: 1,
      recoveryCost: '$180',
      netBenefit: '$3,520'
    },
    
    executionStatus: {
      status: 'Blocked until approval',
      approverRole: 'Operations Manager',
      requesterRole: 'Dispatch Manager'
    }
  };

  const canSubmit = justification.trim().length >= 30;

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmitEscalation(justification);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* LAYER 0 — ENTRY CONTEXT (Neutral Orientation) */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-slate-900">Escalation Request</h1>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg border border-slate-300 uppercase font-medium">
                    Approval Required
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  Formal handoff to Operations Manager for policy exception approval
                </p>
              </div>
            </div>

            {/* Context Info */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Recovery ID</div>
                <div className="text-slate-900 font-mono text-sm">{escalationData.recoveryId}</div>
              </div>
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Trigger</div>
                <div className="text-slate-900 font-mono text-sm">{escalationData.triggeringAlert.id}</div>
              </div>
              <div className="px-3 py-2 bg-blue-50 rounded-lg border border-blue-300">
                <div className="text-xs text-blue-700 mb-1">Status</div>
                <div className="text-blue-900 text-sm font-medium">{escalationData.governance.currentState}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* LAYER 1 — GOVERNANCE VERDICT (Why Approval is Required) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900">Policy Exception Required</h2>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
              <div className="mb-4">
                <div className="text-xs text-slate-600 mb-1">Policy</div>
                <div className="text-slate-900 font-medium mb-1">{escalationData.governance.policyName}</div>
                <div className="text-xs text-slate-600">{escalationData.governance.policyVersion}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-white border border-slate-200 rounded">
                  <div className="text-xs text-slate-600 mb-1">{escalationData.governance.thresholdName}</div>
                  <div className="text-sm text-slate-900">{escalationData.governance.thresholdValue}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded">
                  <div className="text-xs text-slate-600 mb-1">Actual Exposure</div>
                  <div className="text-sm text-slate-900 font-medium">{escalationData.governance.actualValue}</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-900">
                  <Lock className="w-4 h-4 text-blue-700" />
                  <span className="font-medium">Approval required before execution</span>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 2 — REQUESTED ACTION (What is Being Approved) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2 mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-700" />
                <h2 className="text-slate-900">Requested Actions</h2>
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg border border-slate-200 uppercase font-medium flex items-center gap-2">
                <Eye className="w-3 h-3" />
                Read Only
              </span>
            </div>

            <div className="space-y-3">
              {escalationData.requestedActions.map((action, index) => (
                <div key={action.id} className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white rounded-lg text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900 mb-1">{action.type}</div>
                      <p className="text-sm text-slate-700 mb-2">{action.description}</p>
                      <div className="text-xs text-slate-600">Scope: {action.scope}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Scope Summary */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Route className="w-3 h-3 text-blue-700" />
                  <span className="text-xs text-slate-600">Routes</span>
                </div>
                <div className="text-lg text-slate-900 font-medium">{escalationData.impactScope.routes}</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-3 h-3 text-green-700" />
                  <span className="text-xs text-slate-600">Drivers</span>
                </div>
                <div className="text-lg text-slate-900 font-medium">{escalationData.impactScope.drivers}</div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-3 h-3 text-purple-700" />
                  <span className="text-xs text-slate-600">Deliveries</span>
                </div>
                <div className="text-lg text-slate-900 font-medium">
                  {escalationData.impactScope.deliveries.total}
                  <span className="text-xs text-purple-700 ml-1">({escalationData.impactScope.deliveries.vip} VIP)</span>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 3 — BUSINESS TRADE-OFF (Rationale) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900">Business Impact Analysis</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Benefits */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">If Approved</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 border border-green-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Penalties Avoided</div>
                    <div className="text-xl text-green-700 font-medium">{escalationData.businessTradeoff.penaltiesAvoided}</div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Deliveries Protected</div>
                    <div className="text-xl text-green-700 font-medium">
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
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Additional Cost</div>
                    <div className="text-xl text-slate-900 font-medium">{escalationData.businessTradeoff.recoveryCost}</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Net Benefit</div>
                    <div className="text-xl text-blue-700 font-medium">{escalationData.businessTradeoff.netBenefit}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 4 — OWNERSHIP & EXECUTION STATUS (Role Shift) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900">Approval Authority & Execution Control</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Approval Required From</div>
                <div className="text-slate-900 font-medium">{escalationData.executionStatus.approverRole}</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Your Role</div>
                <div className="text-slate-900 font-medium">{escalationData.executionStatus.requesterRole}</div>
                <div className="text-xs text-slate-600 mt-1">Requester only</div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Execution Status</div>
                <div className="text-slate-900 font-medium">{escalationData.executionStatus.status}</div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-start gap-2 text-sm">
                <Info className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  Decision authority transfers to {escalationData.executionStatus.approverRole} upon submission. 
                  You will be notified when a decision is made.
                </span>
              </div>
            </div>
          </div>

          {/* LAYER 5 — JUSTIFICATION INPUT (Human Context) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900">Escalation Justification</h2>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-300 uppercase font-medium">
                Required
              </span>
            </div>

            <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-xs text-slate-600 font-medium mb-2 uppercase">Guidance</div>
              <ul className="space-y-1 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Explain the urgency context and time sensitivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Describe the business impact if not approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Clarify why exceeding the policy threshold is justified</span>
                </li>
              </ul>
            </div>

            <div>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Provide clear context for the Operations Manager to make an informed approval decision. Explain the situation, urgency, business impact, and why this exception is warranted..."
                className="w-full h-40 p-4 border-2 border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <span className="text-xs text-slate-600">
                  This justification will be reviewed by {escalationData.governance.requiresApprovalFrom} and permanently recorded.
                </span>
                <span className={`text-xs ${justification.length >= 30 ? 'text-green-600' : 'text-slate-600'}`}>
                  {justification.length} / 30 minimum
                </span>
              </div>
            </div>
          </div>

          {/* Alert Context (supporting information) */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-slate-600 font-medium mb-1">Triggering Alert: {escalationData.triggeringAlert.id}</div>
                <p className="text-sm text-slate-700">{escalationData.triggeringAlert.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* LAYER 6 — SUBMISSION GATE (Formal Handoff) */}
      <footer className="sticky bottom-0 bg-white border-t-2 border-slate-300 shadow-lg">
        <div className="px-4 sm:px-6 py-5">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Shield className="w-6 h-6 text-slate-700" />
                <div>
                  <div className="text-sm text-slate-900 font-medium">Formal Governance Handoff</div>
                  <div className="text-xs text-slate-600">
                    {canSubmit
                      ? 'Ready to submit for approval'
                      : 'Complete justification (minimum 30 characters) to proceed'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onCancel}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Cancel & Return to Draft</span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg transition-all ${
                    canSubmit
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg border-2 border-blue-700 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Submit Escalation Request</div>
                    <div className="text-xs opacity-90">
                      {canSubmit ? 'Transfer to Operations Manager' : 'Justification required'}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}