import {
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  User,
  Route,
  Eye,
  Filter,
  ChevronDown,
  Calendar,
  MapPin,
  Info,
  FileText,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';

interface ExecutionOversightProps {
  onBack: () => void;
}

type ExecutionStatus = 'in-progress' | 'completed' | 'requires-attention';
type SeverityLevel = 'critical' | 'high' | 'standard';

export function ExecutionOversight({ onBack }: ExecutionOversightProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | ExecutionStatus>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | SeverityLevel>('all');
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null);

  // Mock data
  const contextData = {
    currentDate: 'Wednesday, December 31, 2025',
    activeShift: 'Morning Shift (6:00 AM - 2:00 PM)',
    region: 'Northeast Region',
    dataFreshness: 'Updated 2 minutes ago'
  };

  const activeCommits = [
    {
      commitId: 'CMT-2847-001',
      recoveryId: 'REC-2847-001',
      executionStatus: 'in-progress' as ExecutionStatus,
      severity: 'critical' as SeverityLevel,
      stepsTotal: 4,
      stepsExecuted: 2,
      stepsPending: 2,
      stepsFailed: 0,
      affectedEntities: {
        routes: 2,
        drivers: 2,
        deliveries: 3
      },
      committedAt: '11:42 AM',
      timeSinceCommit: '5 minutes',
      description: 'Reassign 3 deliveries from DRV-247 to DRV-312',
      executionSteps: [
        { step: 'Remove deliveries from DRV-247 route', status: 'completed', timestamp: '11:42 AM' },
        { step: 'Update route optimization', status: 'completed', timestamp: '11:43 AM' },
        { step: 'Assign deliveries to DRV-312', status: 'pending', timestamp: null },
        { step: 'Confirm driver acknowledgment', status: 'pending', timestamp: null }
      ]
    },
    {
      commitId: 'CMT-2839-001',
      recoveryId: 'REC-2839-001',
      executionStatus: 'completed' as ExecutionStatus,
      severity: 'high' as SeverityLevel,
      stepsTotal: 3,
      stepsExecuted: 3,
      stepsPending: 0,
      stepsFailed: 0,
      affectedEntities: {
        routes: 1,
        drivers: 1,
        deliveries: 2
      },
      committedAt: '10:15 AM',
      timeSinceCommit: '1 hour 32 minutes',
      description: 'Reschedule 2 deliveries on RT-2839',
      executionSteps: [
        { step: 'Adjust delivery time windows', status: 'completed', timestamp: '10:15 AM' },
        { step: 'Update route sequence', status: 'completed', timestamp: '10:16 AM' },
        { step: 'Notify customers', status: 'completed', timestamp: '10:18 AM' }
      ]
    },
    {
      commitId: 'CMT-2821-001',
      recoveryId: 'REC-2821-001',
      executionStatus: 'requires-attention' as ExecutionStatus,
      severity: 'high' as SeverityLevel,
      stepsTotal: 5,
      stepsExecuted: 3,
      stepsPending: 0,
      stepsFailed: 2,
      affectedEntities: {
        routes: 3,
        drivers: 3,
        deliveries: 5
      },
      committedAt: '9:45 AM',
      timeSinceCommit: '2 hours 2 minutes',
      description: 'Multi-route rebalancing (5 deliveries)',
      attentionReason: 'Driver acknowledgment timeout (DRV-189)',
      durationSinceLastProgress: '45 minutes',
      impactClassification: 'medium',
      executionSteps: [
        { step: 'Remove deliveries from source routes', status: 'completed', timestamp: '9:45 AM' },
        { step: 'Recalculate route optimization', status: 'completed', timestamp: '9:47 AM' },
        { step: 'Assign to target drivers', status: 'completed', timestamp: '9:50 AM' },
        { step: 'Driver DRV-189 acknowledgment', status: 'failed', timestamp: null },
        { step: 'Driver DRV-203 acknowledgment', status: 'failed', timestamp: null }
      ]
    },
    {
      commitId: 'CMT-2801-001',
      recoveryId: 'REC-2801-001',
      executionStatus: 'requires-attention' as ExecutionStatus,
      severity: 'standard' as SeverityLevel,
      stepsTotal: 2,
      stepsExecuted: 0,
      stepsPending: 0,
      stepsFailed: 2,
      affectedEntities: {
        routes: 1,
        drivers: 1,
        deliveries: 1
      },
      committedAt: '8:30 AM',
      timeSinceCommit: '3 hours 17 minutes',
      description: 'Single delivery reassignment',
      attentionReason: 'System integration failure',
      durationSinceLastProgress: '3 hours 17 minutes',
      impactClassification: 'low',
      executionSteps: [
        { step: 'Remove delivery from source route', status: 'failed', timestamp: null },
        { step: 'Assign to target driver', status: 'failed', timestamp: null }
      ]
    }
  ];

  const getStatusBadge = (status: ExecutionStatus) => {
    switch (status) {
      case 'in-progress':
        return (
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 uppercase text-xs font-medium">
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200 uppercase text-xs font-medium">
            Completed
          </span>
        );
      case 'requires-attention':
        return (
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg border border-slate-300 uppercase text-xs font-medium">
            Requires Attention
          </span>
        );
    }
  };

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded border border-slate-300 uppercase">Critical</span>;
      case 'high':
        return <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-200 uppercase">High</span>;
      case 'standard':
        return <span className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border border-slate-200 uppercase">Standard</span>;
    }
  };

  const getProgressBarColor = (status: ExecutionStatus) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'requires-attention':
        return 'bg-slate-500';
    }
  };

  const filteredCommits = activeCommits.filter((commit) => {
    const statusMatch = statusFilter === 'all' || commit.executionStatus === statusFilter;
    const severityMatch = severityFilter === 'all' || commit.severity === severityFilter;
    return statusMatch && severityMatch;
  });

  const selectedCommit = activeCommits.find(c => c.commitId === selectedCommitId);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div>
                <h1 className="text-slate-900 font-medium">Execution Oversight</h1>
                <p className="text-slate-600 text-sm">
                  Read-only execution monitoring — no actions permitted
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600">Data Freshness</div>
                <div className="text-slate-900 text-sm">{contextData.dataFreshness}</div>
              </div>
            </div>
          </div>

          {/* Read-Only Notice */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-sm text-blue-800">
              <strong>Read-only oversight:</strong> This view allows monitoring approved recovery executions. 
              No modifications or interventions are permitted from this screen.
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* LAYER 0 — CONTEXT & FILTERS */}
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
                  <span className="text-xs text-slate-600">Region</span>
                </div>
                <div className="text-sm text-slate-900">{contextData.region}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Status</span>
                </div>
                <div className="text-sm text-slate-900">Monitoring Active</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700 font-medium">Filters:</span>
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="all">All Statuses</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="requires-attention">Requires Attention</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value as any)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="standard">Standard</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* LAYER 1 — EXECUTION STATUS SUMMARY */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
              <div className="text-xs text-slate-600 mb-2">Total Active</div>
              <div className="text-3xl text-slate-900 font-medium">{activeCommits.length}</div>
            </div>

            <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
              <div className="text-xs text-slate-600 mb-2">In Progress</div>
              <div className="text-3xl text-blue-600 font-medium">
                {activeCommits.filter(c => c.executionStatus === 'in-progress').length}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
              <div className="text-xs text-slate-600 mb-2">Completed</div>
              <div className="text-3xl text-green-600 font-medium">
                {activeCommits.filter(c => c.executionStatus === 'completed').length}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
              <div className="text-xs text-slate-600 mb-2">Requires Attention</div>
              <div className="text-3xl text-slate-700 font-medium">
                {activeCommits.filter(c => c.executionStatus === 'requires-attention').length}
              </div>
            </div>
          </div>

          {/* LAYER 2 — EXECUTION COMMIT LIST */}
          <div className="space-y-4">
            {filteredCommits.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-300 p-12 text-center">
                <Activity className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">No active executions match the selected filters</p>
              </div>
            ) : (
              filteredCommits.map((commit) => (
                <div
                  key={commit.commitId}
                  className="bg-white rounded-lg border-2 border-slate-300 shadow-sm"
                >
                  <div className="p-5">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-slate-900 font-medium font-mono">{commit.commitId}</h3>
                          {getStatusBadge(commit.executionStatus)}
                          {getSeverityBadge(commit.severity)}
                        </div>
                        <p className="text-sm text-slate-700 mb-1">{commit.description}</p>
                        <div className="text-xs text-slate-600">Recovery ID: {commit.recoveryId}</div>
                      </div>

                      <button
                        onClick={() => setSelectedCommitId(selectedCommitId === commit.commitId ? null : commit.commitId)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{selectedCommitId === commit.commitId ? 'Hide Detail' : 'View Detail'}</span>
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-600 font-medium">Execution Progress</span>
                        <span className="text-xs text-slate-700">
                          {commit.stepsExecuted} / {commit.stepsTotal} steps
                          {commit.stepsFailed > 0 && (
                            <span className="text-slate-700 ml-1">({commit.stepsFailed} failed)</span>
                          )}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getProgressBarColor(commit.executionStatus)} transition-all`}
                          style={{ width: `${(commit.stepsExecuted / commit.stepsTotal) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Metadata Grid - Aggregates Only */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Route className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">Routes Affected</span>
                        </div>
                        <div className="text-lg text-slate-900 font-medium">{commit.affectedEntities.routes}</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">Drivers Affected</span>
                        </div>
                        <div className="text-lg text-slate-900 font-medium">{commit.affectedEntities.drivers}</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">Deliveries Affected</span>
                        </div>
                        <div className="text-lg text-slate-900 font-medium">{commit.affectedEntities.deliveries}</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">Time Active</span>
                        </div>
                        <div className="text-sm text-slate-900 font-medium">{commit.timeSinceCommit}</div>
                      </div>
                    </div>

                    {/* LAYER 3 — EXECUTION DETAIL (READ-ONLY) */}
                    {selectedCommitId === commit.commitId && (
                      <div className="mt-5 pt-5 border-t-2 border-slate-200">
                        <h4 className="text-sm text-slate-900 font-medium mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Execution Steps (Read-Only)
                        </h4>
                        <div className="space-y-2">
                          {commit.executionSteps.map((step, index) => (
                            <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                  {step.status === 'completed' && (
                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  )}
                                  {step.status === 'pending' && (
                                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                  )}
                                  {step.status === 'failed' && (
                                    <XCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                  )}
                                  <span className="text-sm text-slate-700">{step.step}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {step.timestamp && (
                                    <span className="text-xs text-slate-600">{step.timestamp}</span>
                                  )}
                                  <span className={`px-2 py-0.5 rounded text-xs ${
                                    step.status === 'completed' 
                                      ? 'bg-green-100 text-green-700' 
                                      : step.status === 'pending'
                                      ? 'bg-slate-100 text-slate-600'
                                      : 'bg-slate-200 text-slate-700'
                                  }`}>
                                    {step.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* LAYER 5 — AUDIT LINKAGE */}
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2 text-xs">
                            <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-blue-900 font-medium mb-1">Audit Linkage</div>
                              <div className="text-blue-800">
                                Execution log reference: <strong>LOG-{commit.commitId}</strong> • 
                                Decision ID: <strong>DEC-{commit.recoveryId}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* LAYER 4 — ATTENTION FLAGS (NON-ACTIONABLE) */}
                    {commit.executionStatus === 'requires-attention' && (
                      <div className="mt-4 p-4 bg-slate-50 border border-slate-300 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm text-slate-900 font-medium mb-2">Requires Attention (Awareness Only)</div>
                            <div className="grid grid-cols-3 gap-3 text-xs">
                              <div>
                                <div className="text-slate-600 mb-1">Reason</div>
                                <div className="text-slate-900">{commit.attentionReason}</div>
                              </div>
                              <div>
                                <div className="text-slate-600 mb-1">Duration Since Last Progress</div>
                                <div className="text-slate-900">{commit.durationSinceLastProgress}</div>
                              </div>
                              <div>
                                <div className="text-slate-600 mb-1">Impact Classification</div>
                                <div className="text-slate-900 capitalize">{commit.impactClassification}</div>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-slate-100 border border-slate-200 rounded text-xs text-slate-700">
                              <Info className="w-3 h-3 inline mr-1" />
                              No remediation options available. This is awareness only. Dispatch Manager has execution authority.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-4">
                      <div className="text-xs text-slate-600">
                        Committed at <strong>{commit.committedAt}</strong> • Time active: {commit.timeSinceCommit}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Governance Notice */}
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-900 text-sm font-medium mb-1">Read-Only Execution Oversight</div>
                <p className="text-slate-700 text-sm">
                  This module allows Operations Managers to verify that approved recovery actions are being executed 
                  and monitor execution progress at a high level. No modifications, interventions, or recovery actions 
                  can be triggered from this screen. Execution authority remains solely with the Dispatch Manager.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
