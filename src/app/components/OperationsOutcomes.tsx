import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Calendar,
  Shield,
  Filter,
  ChevronDown,
  FileText,
  Eye,
  DollarSign,
  Info,
  MapPin,
  TrendingUp,
  TrendingDown,
  Lightbulb
} from 'lucide-react';
import { useState } from 'react';

type OutcomeStatus = 'successful' | 'partial' | 'failed';

export function OperationsOutcomes() {
  const [timeWindow, setTimeWindow] = useState<'today' | 'last-7-days' | 'last-30-days'>('today');
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | OutcomeStatus>('all');
  const [selectedRecoveryId, setSelectedRecoveryId] = useState<string | null>(null);

  // Mock data
  const contextData = {
    currentDate: 'Wednesday, December 31, 2025',
    activeShift: 'Morning Shift (6:00 AM - 2:00 PM)',
    region: 'Northeast Region',
    dataFreshness: 'Updated 5 minutes ago'
  };

  const outcomesData = {
    // LAYER 1: Outcome Summary
    summary: {
      totalReviewed: 12,
      successful: 9,
      partial: 2,
      failed: 1,
      effectivenessRate: 75
    },

    // LAYER 2: Completed Recovery List
    completedRecoveries: [
      {
        recoveryId: 'REC-2847-001',
        commitId: 'CMT-2847-001',
        outcomeStatus: 'successful' as OutcomeStatus,
        completionTime: '11:55 AM',
        totalDuration: '13 minutes',
        slaImpact: 'Protected 3 deliveries from breach',
        costImpact: '+$3,520 savings',
        // LAYER 3: Detail
        outcomeDetail: {
          classification: 'Full success - all objectives achieved',
          rootCauseSummary: 'Driver capacity constraint resolved through redistribution',
          whatWorked: 'Early detection of capacity gap, proactive reassignment to available driver',
          whatConstrained: 'None - optimal conditions',
          slaDelta: '+18 minutes average buffer per delivery',
          costDelta: '$3,520 penalty avoidance vs $180 intervention cost',
          policyAlignment: 'Aligned with Cost Threshold policy - stayed within limits'
        }
      },
      {
        recoveryId: 'REC-2839-001',
        commitId: 'CMT-2839-001',
        outcomeStatus: 'successful' as OutcomeStatus,
        completionTime: '10:30 AM',
        totalDuration: '15 minutes',
        slaImpact: 'Protected 2 VIP deliveries',
        costImpact: '+$2,100 savings',
        outcomeDetail: {
          classification: 'Full success - all objectives achieved',
          rootCauseSummary: 'Traffic delay detected early, time window adjusted',
          whatWorked: 'Customer availability confirmed before rescheduling',
          whatConstrained: 'None',
          slaDelta: '+22 minutes average buffer',
          costDelta: '$2,100 VIP penalty avoidance',
          policyAlignment: 'Aligned with VIP Customer Protection policy'
        }
      },
      {
        recoveryId: 'REC-2821-001',
        commitId: 'CMT-2821-001',
        outcomeStatus: 'partial' as OutcomeStatus,
        completionTime: '10:10 AM',
        totalDuration: '25 minutes',
        slaImpact: 'Protected 3 of 5 deliveries',
        costImpact: '+$1,200 net savings',
        outcomeDetail: {
          classification: 'Partial success - primary objectives met, secondary objectives partially achieved',
          rootCauseSummary: 'Multi-route rebalancing constrained by driver acknowledgment delays',
          whatWorked: '3 deliveries successfully reassigned and completed on time',
          whatConstrained: '2 deliveries affected by driver response timeout (DRV-189, DRV-203)',
          slaDelta: '+15 minutes for 3 deliveries, -8 minutes for 2 deliveries',
          costDelta: '$2,400 savings vs $1,200 penalties = $1,200 net',
          policyAlignment: 'Multi-Zone Coordination policy - communication protocol needs review'
        }
      },
      {
        recoveryId: 'REC-2801-001',
        commitId: 'CMT-2801-001',
        outcomeStatus: 'failed' as OutcomeStatus,
        completionTime: '9:15 AM',
        totalDuration: '45 minutes',
        slaImpact: 'Failed to protect 1 delivery',
        costImpact: '-$800 penalty incurred',
        outcomeDetail: {
          classification: 'Failed - objectives not achieved',
          rootCauseSummary: 'System integration failure prevented execution',
          whatWorked: 'Early detection of issue',
          whatConstrained: 'External system dependency (route optimization service unavailable)',
          slaDelta: '-35 minutes - delivery breached SLA',
          costDelta: '$800 penalty incurred, $0 intervention cost',
          policyAlignment: 'System dependency policy - need redundancy review'
        }
      }
    ],

    // LAYER 4: Learning Signals
    learningSignals: {
      successPatterns: [
        { pattern: 'Early detection (>30min before breach)', frequency: 8, successRate: 88 },
        { pattern: 'Single-driver reassignment', frequency: 6, successRate: 100 },
        { pattern: 'VIP priority enforcement', frequency: 5, successRate: 100 }
      ],
      failurePatterns: [
        { pattern: 'System dependency failures', frequency: 2, failureRate: 100 },
        { pattern: 'Multi-driver coordination delays', frequency: 1, failureRate: 40 }
      ],
      partialSuccessConstraints: [
        { constraint: 'Driver acknowledgment timeout', occurrences: 3 },
        { constraint: 'Customer availability uncertainty', occurrences: 2 }
      ],
      policyFriction: [
        { policy: 'Multi-Zone Coordination', frictionIndicator: 'Communication protocol delays', severity: 'medium' },
        { policy: 'System Dependency', frictionIndicator: 'External service reliability', severity: 'high' }
      ]
    }
  };

  const getOutcomeBadge = (status: OutcomeStatus) => {
    switch (status) {
      case 'successful':
        return (
          <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200 uppercase text-xs font-medium flex items-center gap-2">
            <CheckCircle className="w-3 h-3" />
            Successful
          </span>
        );
      case 'partial':
        return (
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg border border-slate-300 uppercase text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            Partial
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg border border-slate-300 uppercase text-xs font-medium flex items-center gap-2">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
    }
  };

  const filteredRecoveries = outcomesData.completedRecoveries.filter((recovery) => {
    return outcomeFilter === 'all' || recovery.outcomeStatus === outcomeFilter;
  });

  const selectedRecovery = outcomesData.completedRecoveries.find(r => r.recoveryId === selectedRecoveryId);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-slate-900 font-medium">Outcomes</h1>
                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300 uppercase font-medium">
                  Governance Review
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                Completed recoveries — learning and governance only
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600">Data Freshness</div>
                <div className="text-slate-900 text-sm">{contextData.dataFreshness}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* LAYER 0 — REVIEW CONTEXT */}
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
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Review Status</span>
                </div>
                <div className="text-sm text-slate-900">Post-Execution</div>
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
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value as any)}
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
                  value={outcomeFilter}
                  onChange={(e) => setOutcomeFilter(e.target.value as any)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="all">All Outcomes</option>
                  <option value="successful">Successful</option>
                  <option value="partial">Partial</option>
                  <option value="failed">Failed</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* LAYER 1 — OUTCOME SUMMARY (Decision-Level) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <h2 className="text-slate-900 font-medium mb-4">Outcome Summary</h2>
            <div className="grid grid-cols-5 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-300">
                <div className="text-xs text-slate-600 mb-2">Total Reviewed</div>
                <div className="text-3xl text-slate-900 font-medium">{outcomesData.summary.totalReviewed}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-300">
                <div className="text-xs text-slate-600 mb-2">Successful</div>
                <div className="text-3xl text-slate-900 font-medium">{outcomesData.summary.successful}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-300">
                <div className="text-xs text-slate-600 mb-2">Partial</div>
                <div className="text-3xl text-slate-900 font-medium">{outcomesData.summary.partial}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-300">
                <div className="text-xs text-slate-600 mb-2">Failed</div>
                <div className="text-3xl text-slate-900 font-medium">{outcomesData.summary.failed}</div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-700 mb-2">Effectiveness Rate</div>
                <div className="text-3xl text-blue-700 font-medium">{outcomesData.summary.effectivenessRate}%</div>
              </div>
            </div>
          </div>

          {/* LAYER 2 — COMPLETED RECOVERY LIST */}
          <div className="space-y-4">
            {filteredRecoveries.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-300 p-12 text-center">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">No completed recoveries match the selected filters</p>
              </div>
            ) : (
              filteredRecoveries.map((recovery) => (
                <div
                  key={recovery.recoveryId}
                  className="bg-white rounded-lg border-2 border-slate-300 shadow-sm"
                >
                  <div className="p-5">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-slate-900 font-medium font-mono">{recovery.recoveryId}</h3>
                          {getOutcomeBadge(recovery.outcomeStatus)}
                        </div>
                        <div className="text-xs text-slate-600 mb-1">Commit ID: {recovery.commitId}</div>
                      </div>

                      <button
                        onClick={() => setSelectedRecoveryId(selectedRecoveryId === recovery.recoveryId ? null : recovery.recoveryId)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{selectedRecoveryId === recovery.recoveryId ? 'Hide Details' : 'View Details'}</span>
                      </button>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">Completion Time</span>
                        </div>
                        <div className="text-sm text-slate-900 font-medium">{recovery.completionTime}</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">Total Duration</span>
                        </div>
                        <div className="text-sm text-slate-900 font-medium">{recovery.totalDuration}</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">SLA Impact</span>
                        </div>
                        <div className="text-sm text-slate-900 font-medium">{recovery.slaImpact}</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">Cost Impact</span>
                        </div>
                        <div className="text-sm text-slate-900 font-medium">{recovery.costImpact}</div>
                      </div>
                    </div>

                    {/* LAYER 3 — OUTCOME DETAIL (READ-ONLY GOVERNANCE VIEW) */}
                    {selectedRecoveryId === recovery.recoveryId && recovery.outcomeDetail && (
                      <div className="mt-5 pt-5 border-t-2 border-slate-200 space-y-4">
                        <h4 className="text-sm text-slate-900 font-medium mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Outcome Detail (Read-Only Governance View)
                        </h4>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="text-xs text-slate-600 mb-2">Outcome Classification</div>
                            <div className="text-sm text-slate-900">{recovery.outcomeDetail.classification}</div>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="text-xs text-slate-600 mb-2">Root Cause Summary</div>
                            <div className="text-sm text-slate-900">{recovery.outcomeDetail.rootCauseSummary}</div>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="text-xs text-slate-600 mb-2">What Worked</div>
                            <div className="text-sm text-slate-900">{recovery.outcomeDetail.whatWorked}</div>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="text-xs text-slate-600 mb-2">What Constrained Success</div>
                            <div className="text-sm text-slate-900">{recovery.outcomeDetail.whatConstrained}</div>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-xs text-blue-700 mb-2">SLA Delta vs Baseline</div>
                            <div className="text-sm text-blue-800 font-medium">{recovery.outcomeDetail.slaDelta}</div>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-xs text-blue-700 mb-2">Cost Delta vs Baseline</div>
                            <div className="text-sm text-blue-800 font-medium">{recovery.outcomeDetail.costDelta}</div>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-600 mb-2">Policy Alignment Notes</div>
                          <div className="text-sm text-slate-900">{recovery.outcomeDetail.policyAlignment}</div>
                        </div>

                        {/* LAYER 5 — AUDIT LINKAGE */}
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2 text-xs">
                            <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-blue-900 font-medium mb-1">Audit Linkage</div>
                              <div className="text-blue-800">
                                Immutable decision reference: <strong>DEC-{recovery.recoveryId}</strong> • 
                                Audit record: <strong>AUD-{recovery.commitId}</strong> • 
                                Timestamped approval lineage available
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* LAYER 4 — LEARNING SIGNALS */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Learning Signals</h2>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Success Patterns */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Common Success Patterns
                </h3>
                <div className="space-y-2">
                  {outcomesData.learningSignals.successPatterns.map((item, index) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-900">{item.pattern}</span>
                        <span className="text-xs text-green-700 font-medium">{item.successRate}%</span>
                      </div>
                      <div className="text-xs text-slate-600">Frequency: {item.frequency} occurrences</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Failure Patterns */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Common Failure Patterns
                </h3>
                <div className="space-y-2">
                  {outcomesData.learningSignals.failurePatterns.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-100 border border-slate-300 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-900">{item.pattern}</span>
                        <span className="text-xs text-slate-700 font-medium">{item.failureRate}% failure</span>
                      </div>
                      <div className="text-xs text-slate-600">Frequency: {item.frequency} occurrences</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partial Success Constraints */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Partial Success Constraints</h3>
                <div className="space-y-2">
                  {outcomesData.learningSignals.partialSuccessConstraints.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                      <span className="text-sm text-slate-700">{item.constraint}</span>
                      <span className="text-sm text-slate-900 font-medium">{item.occurrences}x</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy Friction Indicators */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Policy Friction Indicators</h3>
                <div className="space-y-2">
                  {outcomesData.learningSignals.policyFriction.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-900">{item.policy}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          item.severity === 'high' 
                            ? 'bg-slate-200 text-slate-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.severity}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600">{item.frictionIndicator}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2 text-xs">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-blue-800">
                  Learning signals are advisory only and feed policy and threshold review processes. 
                  No configuration controls are available from this screen.
                </span>
              </div>
            </div>
          </div>

          {/* Governance Notice */}
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-900 text-sm font-medium mb-1">Post-Execution Governance Review</div>
                <p className="text-slate-700 text-sm">
                  This module provides read-only visibility into completed recovery outcomes for governance learning. 
                  All records are finalized and immutable. Use this view to assess decision effectiveness, 
                  understand SLA and cost impact, and extract patterns for policy improvement. 
                  This module does not monitor execution, evaluate individual performance, or enable interventions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
