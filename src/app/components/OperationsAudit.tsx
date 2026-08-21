import {
  Shield,
  Lock,
  Filter,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  X,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { useState } from 'react';

type DecisionType = 
  | 'recovery-commit'
  | 'escalation-request'
  | 'escalation-approval'
  | 'escalation-rejection'
  | 'policy-override'
  | 'threshold-breach';

type PolicyStatus = 'compliant' | 'breach';
type DecisionOutcome = 'approved' | 'rejected' | 'executed' | 'completed' | 'failed' | 'partial';

interface DecisionRecord {
  recordId: string;
  timestamp: string;
  systemTime: string;
  decisionType: DecisionType;
  decisionOwner: string;
  decisionOwnerRole: string;
  policyName: string;
  policyVersion: string;
  policyStatus: PolicyStatus;
  decisionOutcome: DecisionOutcome;
  linkedEntityId: string;
  // Detail view data
  triggerSource: string;
  policyThreshold: string;
  actualValue: string;
  approvalRequired: boolean;
  approvalStatus: string;
  justification: string;
  slaExposure: string;
  costThreshold: string;
  executionRef?: string;
  outcomeRef?: string;
}

export function OperationsAudit() {
  const [dateRange, setDateRange] = useState<'today' | 'last-7-days' | 'last-30-days'>('today');
  const [recordScope, setRecordScope] = useState<'all' | DecisionType>('all');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // Mock data
  const contextData = {
    currentDate: 'Wednesday, December 31, 2025',
    activeShift: 'Morning Shift (6:00 AM - 2:00 PM)',
    region: 'Northeast Region',
    hub: 'Central Depot'
  };

  const decisionRecords: DecisionRecord[] = [
    {
      recordId: 'DEC-2847-003',
      timestamp: '14:38:47',
      systemTime: '2025-12-31T14:38:47Z',
      decisionType: 'escalation-approval',
      decisionOwner: 'Michael Torres',
      decisionOwnerRole: 'Operations Manager',
      policyName: 'Cost Threshold Limit',
      policyVersion: 'v2.1',
      policyStatus: 'breach',
      decisionOutcome: 'approved',
      linkedEntityId: 'ESC-2847-001',
      triggerSource: 'Recovery REC-2847-001 exceeded cost threshold',
      policyThreshold: '$2,000 max intervention cost',
      actualValue: '$2,200 intervention cost',
      approvalRequired: true,
      approvalStatus: 'Approved by Operations Manager',
      justification: 'Cost breach justified to protect 3 high-value deliveries totaling $12,800 in potential SLA penalties. Net savings: $10,600.',
      slaExposure: '$12,800 penalty risk',
      costThreshold: 'Exceeded by $200',
      executionRef: 'EXE-2847-001',
      outcomeRef: 'OUT-2847-001'
    },
    {
      recordId: 'DEC-2847-002',
      timestamp: '14:35:12',
      systemTime: '2025-12-31T14:35:12Z',
      decisionType: 'escalation-request',
      decisionOwner: 'Sarah Chen',
      decisionOwnerRole: 'Dispatch Manager',
      policyName: 'Cost Threshold Limit',
      policyVersion: 'v2.1',
      policyStatus: 'breach',
      decisionOutcome: 'approved',
      linkedEntityId: 'REC-2847-001',
      triggerSource: 'Recovery planning process',
      policyThreshold: '$2,000 max intervention cost',
      actualValue: '$2,200 intervention cost',
      approvalRequired: true,
      approvalStatus: 'Escalation submitted, awaiting approval',
      justification: 'Recovery requires driver overtime and express courier backup. Cost exceeds threshold but necessary to prevent SLA breach.',
      slaExposure: '$12,800 penalty risk',
      costThreshold: 'Exceeded by $200'
    },
    {
      recordId: 'DEC-2847-001',
      timestamp: '11:42:23',
      systemTime: '2025-12-31T11:42:23Z',
      decisionType: 'recovery-commit',
      decisionOwner: 'Sarah Chen',
      decisionOwnerRole: 'Dispatch Manager',
      policyName: 'Cost Threshold Limit',
      policyVersion: 'v2.1',
      policyStatus: 'compliant',
      decisionOutcome: 'completed',
      linkedEntityId: 'REC-2847-001',
      triggerSource: 'Alert ALT-2847 - Driver capacity constraint',
      policyThreshold: '$2,000 max intervention cost',
      actualValue: '$1,850 intervention cost',
      approvalRequired: false,
      approvalStatus: 'Not required - within threshold',
      justification: 'Reassign 3 deliveries from DRV-247 to DRV-312 to prevent SLA breach. Driver availability confirmed.',
      slaExposure: '$3,520 penalty risk avoided',
      costThreshold: 'Within limit',
      executionRef: 'EXE-2847-001',
      outcomeRef: 'OUT-2847-001'
    },
    {
      recordId: 'DEC-2839-001',
      timestamp: '10:15:08',
      systemTime: '2025-12-31T10:15:08Z',
      decisionType: 'recovery-commit',
      decisionOwner: 'Sarah Chen',
      decisionOwnerRole: 'Dispatch Manager',
      policyName: 'VIP Customer Protection',
      policyVersion: 'v1.8',
      policyStatus: 'compliant',
      decisionOutcome: 'completed',
      linkedEntityId: 'REC-2839-001',
      triggerSource: 'VIP delivery risk detection',
      policyThreshold: 'VIP delivery breach = critical',
      actualValue: '2 VIP deliveries at risk',
      approvalRequired: false,
      approvalStatus: 'Not required - standard recovery',
      justification: 'Reschedule 2 VIP deliveries due to traffic delay. Customer availability confirmed for adjusted time windows.',
      slaExposure: '$2,100 VIP penalty risk avoided',
      costThreshold: 'Within limit',
      executionRef: 'EXE-2839-001',
      outcomeRef: 'OUT-2839-001'
    },
    {
      recordId: 'DEC-2821-001',
      timestamp: '09:45:31',
      systemTime: '2025-12-31T09:45:31Z',
      decisionType: 'recovery-commit',
      decisionOwner: 'Sarah Chen',
      decisionOwnerRole: 'Dispatch Manager',
      policyName: 'Multi-Zone Coordination',
      policyVersion: 'v1.5',
      policyStatus: 'compliant',
      decisionOutcome: 'partial',
      linkedEntityId: 'REC-2821-001',
      triggerSource: 'Multi-route capacity imbalance',
      policyThreshold: 'Cross-zone approval required if >3 routes',
      actualValue: '3 routes affected',
      approvalRequired: false,
      approvalStatus: 'Not required - threshold not exceeded',
      justification: 'Rebalance 5 deliveries across 3 routes to optimize capacity utilization.',
      slaExposure: '$2,400 partial savings achieved',
      costThreshold: 'Within limit',
      executionRef: 'EXE-2821-001',
      outcomeRef: 'OUT-2821-001'
    }
  ];

  const filteredRecords = decisionRecords.filter((record) => {
    return recordScope === 'all' || record.decisionType === recordScope;
  });

  const selectedRecord = decisionRecords.find(r => r.recordId === selectedRecordId);

  const getPolicyStatusBadge = (status: PolicyStatus) => {
    if (status === 'compliant') {
      return (
        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded uppercase font-medium">
          Compliant
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded uppercase font-medium">
        Breach
      </span>
    );
  };

  const getOutcomeIcon = (outcome: DecisionOutcome) => {
    switch (outcome) {
      case 'approved':
      case 'completed':
        return <CheckCircle className="w-3.5 h-3.5 text-slate-600" />;
      case 'rejected':
      case 'failed':
        return <XCircle className="w-3.5 h-3.5 text-slate-600" />;
      case 'partial':
        return <AlertCircle className="w-3.5 h-3.5 text-slate-600" />;
      default:
        return <CheckCircle className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-slate-900 font-medium">Audit & Compliance</h1>
                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300 uppercase font-medium">
                  Decision Ledger
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                Immutable system of record for all decisions and approvals
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg border border-slate-300">
              <Lock className="w-4 h-4 text-slate-700" />
              <span className="text-sm text-slate-700 font-medium">Records cannot be modified</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          
          {/* STEP 2 — LEDGER CONTEXT */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
            <div className="grid grid-cols-4 gap-4 mb-5">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Date</span>
                </div>
                <div className="text-sm text-slate-900">{contextData.currentDate}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Shift</span>
                </div>
                <div className="text-sm text-slate-900">{contextData.activeShift}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Region / Hub</span>
                </div>
                <div className="text-sm text-slate-900">{contextData.region} • {contextData.hub}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Record Status</span>
                </div>
                <div className="text-sm text-slate-900">Immutable</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700 font-medium">Scope:</span>
              </div>

              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="today">Today</option>
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={recordScope}
                  onChange={(e) => setRecordScope(e.target.value as any)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="all">All Decision Types</option>
                  <option value="recovery-commit">Recovery Commits</option>
                  <option value="escalation-request">Escalation Requests</option>
                  <option value="escalation-approval">Escalation Approvals</option>
                  <option value="escalation-rejection">Escalation Rejections</option>
                  <option value="policy-override">Policy Overrides</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* STEP 3 — DECISION LEDGER TABLE */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b-2 border-slate-300">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Record ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Decision Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Decision Owner
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Policy Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Policy Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Outcome
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Linked Entity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredRecords.map((record) => (
                    <tr 
                      key={record.recordId}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-xs text-slate-900 font-mono whitespace-nowrap">
                        {record.timestamp}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-900 font-mono whitespace-nowrap">
                        {record.recordId}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap">
                        {record.decisionType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap">
                        <div>{record.decisionOwner}</div>
                        <div className="text-slate-600">{record.decisionOwnerRole}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap">
                        <div>{record.policyName}</div>
                        <div className="text-slate-600">{record.policyVersion}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getPolicyStatusBadge(record.policyStatus)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getOutcomeIcon(record.decisionOutcome)}
                          <span className="text-xs text-slate-700 capitalize">{record.decisionOutcome}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-900 font-mono whitespace-nowrap">
                        {record.linkedEntityId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedRecordId(record.recordId)}
                          className="text-xs text-blue-700 hover:text-blue-900 font-medium"
                        >
                          View Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Immutability Notice */}
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-900 text-sm font-medium mb-1">Immutable Audit Ledger</div>
                <p className="text-slate-700 text-sm">
                  All decision records are immutable and cryptographically secured. This ledger provides legal and 
                  regulatory defensibility with complete decision traceability. Records are retained in perpetuity 
                  for compliance purposes and cannot be modified, annotated, or deleted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* STEP 4 — DECISION RECORD VIEW (READ-ONLY) */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b-2 border-slate-300 px-6 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-slate-900 font-medium">Decision Record</h2>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300 uppercase font-medium font-mono">
                    {selectedRecord.recordId}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">Immutable audit record</p>
              </div>
              <button
                onClick={() => setSelectedRecordId(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Decision Metadata */}
              <div>
                <h3 className="text-sm text-slate-900 font-medium mb-3 uppercase text-xs">Decision Metadata</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">System Timestamp</div>
                    <div className="text-sm text-slate-900 font-mono">{selectedRecord.systemTime}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Decision Type</div>
                    <div className="text-sm text-slate-900">
                      {selectedRecord.decisionType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Decision Owner</div>
                    <div className="text-sm text-slate-900">{selectedRecord.decisionOwner}</div>
                    <div className="text-xs text-slate-600 mt-1">{selectedRecord.decisionOwnerRole}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Linked Entity</div>
                    <div className="text-sm text-slate-900 font-mono">{selectedRecord.linkedEntityId}</div>
                  </div>
                </div>
              </div>

              {/* Trigger Source */}
              <div>
                <h3 className="text-sm text-slate-900 font-medium mb-3 uppercase text-xs">Trigger Source</h3>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-sm text-slate-900">{selectedRecord.triggerSource}</div>
                </div>
              </div>

              {/* Policy Context */}
              <div>
                <h3 className="text-sm text-slate-900 font-medium mb-3 uppercase text-xs">Policy Thresholds vs Actuals</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Policy Name</div>
                    <div className="text-sm text-slate-900">{selectedRecord.policyName}</div>
                    <div className="text-xs text-slate-600 mt-1">Version: {selectedRecord.policyVersion}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Policy Status</div>
                    <div className="mt-1">{getPolicyStatusBadge(selectedRecord.policyStatus)}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Policy Threshold</div>
                    <div className="text-sm text-slate-900">{selectedRecord.policyThreshold}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Actual Value</div>
                    <div className="text-sm text-slate-900">{selectedRecord.actualValue}</div>
                  </div>
                </div>
              </div>

              {/* Approval Context */}
              <div>
                <h3 className="text-sm text-slate-900 font-medium mb-3 uppercase text-xs">Approval Requirement & Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Approval Required</div>
                    <div className="text-sm text-slate-900">{selectedRecord.approvalRequired ? 'Yes' : 'No'}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Approval Status</div>
                    <div className="text-sm text-slate-900">{selectedRecord.approvalStatus}</div>
                  </div>
                </div>
              </div>

              {/* Original Justification */}
              <div>
                <h3 className="text-sm text-slate-900 font-medium mb-3 uppercase text-xs">Original Justification (Immutable)</h3>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-sm text-slate-900">{selectedRecord.justification}</div>
                </div>
              </div>

              {/* STEP 6 — COMPLIANCE ASSERTIONS */}
              <div>
                <h3 className="text-sm text-slate-900 font-medium mb-3 uppercase text-xs">Compliance Assertions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">SLA Exposure</div>
                    <div className="text-sm text-slate-900">{selectedRecord.slaExposure}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Cost Threshold Status</div>
                    <div className="text-sm text-slate-900">{selectedRecord.costThreshold}</div>
                  </div>
                </div>
              </div>

              {/* STEP 5 — EXECUTION & OUTCOME REFERENCES */}
              {(selectedRecord.executionRef || selectedRecord.outcomeRef) && (
                <div>
                  <h3 className="text-sm text-slate-900 font-medium mb-3 uppercase text-xs">Execution & Outcome References</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRecord.executionRef && (
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="text-xs text-slate-600 mb-1">Execution Reference</div>
                        <div className="text-sm text-slate-900 font-mono">{selectedRecord.executionRef}</div>
                      </div>
                    )}
                    {selectedRecord.outcomeRef && (
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="text-xs text-slate-600 mb-1">Outcome Reference</div>
                        <div className="text-sm text-slate-900 font-mono">{selectedRecord.outcomeRef}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Irreversibility Statement */}
              <div className="p-5 bg-slate-100 border-2 border-slate-300 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900 text-sm font-medium mb-1">Irreversibility Statement</div>
                    <p className="text-slate-700 text-sm">
                      This decision record is immutable and cryptographically secured. The record cannot be edited, 
                      annotated, retried, or overridden. It forms part of the permanent audit trail and is legally 
                      binding for compliance and regulatory purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
