import {
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Calendar,
  ChevronRight,
  Info,
  FileText
} from 'lucide-react';
import { useState } from 'react';

interface OperationsManagerDashboardProps {
  onNavigateToEscalations: () => void;
  onNavigateToExecutionOversight: () => void;
  onNavigateToOutcomes: () => void;
}

export function OperationsManagerDashboard({
  onNavigateToEscalations,
  onNavigateToExecutionOversight,
  onNavigateToOutcomes
}: OperationsManagerDashboardProps) {
  // Mock data
  const dashboardData = {
    currentDate: 'Wednesday, December 31, 2025',
    
    // LAYER 1: Today's Governance Status
    governanceStatus: {
      escalationsAwaiting: 3,
      escalationsApprovedToday: 7,
      escalationsRejectedToday: 2,
      activePolicyBreaches: 4
    },
    
    // LAYER 2: Approval Pressure
    approvalPressure: {
      pendingEscalations: [
        {
          id: 'ESC-2847-001',
          policyType: 'Cost Threshold',
          submittedAge: '15 minutes ago',
          severity: 'high'
        },
        {
          id: 'ESC-2839-001',
          policyType: 'VIP Customer Protection',
          submittedAge: '2 hours ago',
          severity: 'medium'
        },
        {
          id: 'ESC-2831-001',
          policyType: 'Multi-Zone Coordination',
          submittedAge: '45 minutes ago',
          severity: 'medium'
        }
      ],
      oldestPendingAge: '2 hours'
    },
    
    // LAYER 3: Risk Exposure Snapshot
    riskExposure: {
      totalSLAPenaltyExposure: '$47,200',
      vipDeliveriesAtRisk: 12,
      regionsWithElevatedRisk: [
        { name: 'East District', level: 'high' },
        { name: 'Central District', level: 'medium' }
      ]
    },
    
    // LAYER 4: Policy Health Indicators
    policyHealth: {
      breachesToday: 4,
      frequentlyBreachedPolicies: [
        { policy: 'Cost Threshold Limit', count: 5 },
        { policy: 'VIP Customer Protection', count: 3 },
        { policy: 'Multi-Zone Coordination', count: 2 }
      ]
    },
    
    // LAYER 5: Trend Direction
    trends: {
      escalationVolume: {
        today: 12,
        yesterday: 9,
        direction: 'increasing',
        changePercent: 33
      },
      slaExposure: {
        direction: 'stable',
        changePercent: 2
      },
      approvalTurnaround: {
        current: '38 minutes',
        direction: 'improving',
        changePercent: -15
      }
    },
    
    // LAYER 6: Decision Accountability
    accountability: {
      avgApprovalTime: '38 minutes',
      oldestUnresolvedAge: '2 hours',
      approvalsPendingBeyondSLA: 0
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base text-slate-900 font-semibold">OptiMile</h1>
                <p className="text-slate-500 text-xs">Governance Dashboard</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-300 rounded px-2 py-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-amber-800 text-xs font-medium">Operations Manager</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{dashboardData.currentDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-medium">Morning Shift (6:00 AM - 2:00 PM)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>📍</span>
                <span>Central Depot - Northeast Region</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
              <span className="text-xs text-slate-500">Updated just now</span>
              <button className="p-1.5 hover:bg-slate-100 rounded transition-colors">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* LAYER 1 — TODAY'S GOVERNANCE STATUS (At a Glance) */}
          <div>
            <h2 className="text-slate-900 font-medium mb-4">Today's Governance Status</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-slate-300 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Awaiting Approval</span>
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl text-blue-600 font-semibold mb-1">
                  {dashboardData.governanceStatus.escalationsAwaiting}
                </div>
                <div className="text-xs text-slate-600">Escalations pending</div>
              </div>

              <div className="bg-white rounded-lg border border-slate-300 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Approved Today</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl text-green-600 font-semibold mb-1">
                  {dashboardData.governanceStatus.escalationsApprovedToday}
                </div>
                <div className="text-xs text-slate-600">Decisions completed</div>
              </div>

              <div className="bg-white rounded-lg border border-slate-300 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Rejected Today</span>
                  <XCircle className="w-5 h-5 text-slate-600" />
                </div>
                <div className="text-3xl text-slate-600 font-semibold mb-1">
                  {dashboardData.governanceStatus.escalationsRejectedToday}
                </div>
                <div className="text-xs text-slate-600">Declined escalations</div>
              </div>

              <div className="bg-white rounded-lg border border-slate-300 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Policy Breaches</span>
                  <AlertTriangle className="w-5 h-5 text-slate-700" />
                </div>
                <div className="text-3xl text-slate-900 font-semibold mb-1">
                  {dashboardData.governanceStatus.activePolicyBreaches}
                </div>
                <div className="text-xs text-slate-600">Active violations</div>
              </div>
            </div>
          </div>

          {/* LAYER 2 — APPROVAL PRESSURE (Primary Focus) */}
          <div className="bg-white rounded-lg border-2 border-blue-400 shadow-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h2 className="text-slate-900 font-medium text-lg">Pending Escalation Approvals</h2>
                </div>
                <p className="text-sm text-slate-600">Operations Manager attention required</p>
              </div>
              <button
                onClick={onNavigateToEscalations}
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
              >
                <span className="font-medium">Review Escalations</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {dashboardData.approvalPressure.pendingEscalations.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.approvalPressure.pendingEscalations.map((escalation) => (
                  <div
                    key={escalation.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
                    onClick={onNavigateToEscalations}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-slate-900 font-mono text-sm">{escalation.id}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-sm text-slate-700">{escalation.policyType}</span>
                      </div>
                      <div className="text-xs text-slate-600">
                        Submitted: {escalation.submittedAge}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
                
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Oldest pending approval:</span>
                  <span className="text-sm text-slate-900 font-medium">{dashboardData.approvalPressure.oldestPendingAge}</span>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-600">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p>No pending escalations</p>
              </div>
            )}
          </div>

          {/* LAYER 3 — RISK EXPOSURE SNAPSHOT (Business View) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <DollarSign className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Risk Exposure Snapshot</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Total SLA Penalty Exposure</div>
                <div className="text-2xl text-slate-900 font-medium">
                  {dashboardData.riskExposure.totalSLAPenaltyExposure}
                </div>
                <div className="text-xs text-slate-600 mt-1">Aggregated across all zones</div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">VIP Deliveries at Risk</div>
                <div className="text-2xl text-slate-900 font-medium">
                  {dashboardData.riskExposure.vipDeliveriesAtRisk}
                </div>
                <div className="text-xs text-slate-600 mt-1">Count only</div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Regions with Elevated Risk</div>
                <div className="space-y-1 mt-2">
                  {dashboardData.riskExposure.regionsWithElevatedRisk.map((region, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">{region.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        region.level === 'high' 
                          ? 'bg-slate-200 text-slate-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {region.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 4 — POLICY HEALTH INDICATORS */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Policy Health Indicators</h2>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Policy Breaches Today</div>
                <div className="text-3xl text-slate-900 font-medium mb-2">
                  {dashboardData.policyHealth.breachesToday}
                </div>
                <div className="text-xs text-slate-600">Total violations recorded</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">Most Frequently Breached</div>
                <div className="space-y-2">
                  {dashboardData.policyHealth.frequentlyBreachedPolicies.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">{item.policy}</span>
                      <span className="text-slate-900 font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 5 — TREND DIRECTION (Stability Check) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Trend Direction</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">Escalation Volume</div>
                <div className="flex items-center gap-2 mb-2">
                  {dashboardData.trends.escalationVolume.direction === 'increasing' ? (
                    <TrendingUp className="w-5 h-5 text-slate-700" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-slate-700" />
                  )}
                  <span className="text-xl text-slate-900 font-medium">
                    {dashboardData.trends.escalationVolume.direction === 'increasing' ? '+' : '-'}
                    {dashboardData.trends.escalationVolume.changePercent}%
                  </span>
                </div>
                <div className="text-xs text-slate-600">Today vs yesterday</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">SLA Exposure</div>
                <div className="flex items-center gap-2 mb-2">
                  <Minus className="w-5 h-5 text-slate-700" />
                  <span className="text-xl text-slate-900 font-medium">
                    {dashboardData.trends.slaExposure.changePercent}%
                  </span>
                </div>
                <div className="text-xs text-slate-600">{dashboardData.trends.slaExposure.direction}</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">Approval Turnaround</div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-slate-700" />
                  <span className="text-xl text-slate-900 font-medium">
                    {dashboardData.trends.approvalTurnaround.current}
                  </span>
                </div>
                <div className="text-xs text-slate-600">Average time improving</div>
              </div>
            </div>
          </div>

          {/* LAYER 6 — DECISION ACCOUNTABILITY SNAPSHOT */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Decision Accountability</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Average Approval Time</div>
                <div className="text-2xl text-slate-900 font-medium">
                  {dashboardData.accountability.avgApprovalTime}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Oldest Unresolved</div>
                <div className="text-2xl text-slate-900 font-medium">
                  {dashboardData.accountability.oldestUnresolvedAge}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-2">Beyond Approval SLA</div>
                <div className="text-2xl text-green-600 font-medium">
                  {dashboardData.accountability.approvalsPendingBeyondSLA}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2 text-xs">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-blue-800">
                Process-focused metrics only. No individual attribution.
              </span>
            </div>
          </div>

          {/* Governance Notice */}
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-900 text-sm font-medium mb-1">Governance Dashboard</div>
                <p className="text-slate-700 text-sm">
                  This dashboard provides governance health visibility for Operations Managers. 
                  All metrics are summary-level and read-only. Decision authority is limited to 
                  escalation approval/rejection through the Escalations module.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
