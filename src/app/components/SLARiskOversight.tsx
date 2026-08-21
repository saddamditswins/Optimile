import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Calendar,
  Shield,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Info,
  FileText,
  Activity,
  MapPin
} from 'lucide-react';
import { useState } from 'react';

interface SLARiskOversightProps {
  onBack: () => void;
}

type TimeWindow = 'today' | 'last-7-days' | 'last-30-days';
type RegionScope = 'all' | 'northeast' | 'southeast' | 'midwest';

export function SLARiskOversight({ onBack }: SLARiskOversightProps) {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('today');
  const [regionScope, setRegionScope] = useState<RegionScope>('all');

  // Mock data
  const oversightData = {
    dataFreshness: 'Updated 2 minutes ago',
    
    // LAYER 1: SLA Health Signal
    slaHealthSignal: {
      overallCompliance: 94.2,
      complianceTrend: 'stable',
      atRiskDeliveries: 47,
      breachedDeliveries: 12
    },
    
    // LAYER 2: Risk Concentration
    riskConcentration: {
      byRegion: [
        { region: 'East District', atRisk: 18, percentage: 38 },
        { region: 'Central District', atRisk: 12, percentage: 26 },
        { region: 'West District', atRisk: 9, percentage: 19 },
        { region: 'North District', atRisk: 8, percentage: 17 }
      ],
      byShift: [
        { shift: 'Morning (6AM-2PM)', atRisk: 28, percentage: 60 },
        { shift: 'Afternoon (2PM-10PM)', atRisk: 15, percentage: 32 },
        { shift: 'Evening (10PM-6AM)', atRisk: 4, percentage: 8 }
      ],
      byDeliveryType: [
        { type: 'VIP', atRisk: 12, total: 45, percentage: 27 },
        { type: 'High Priority', atRisk: 18, total: 120, percentage: 15 },
        { type: 'Standard', atRisk: 17, total: 350, percentage: 5 }
      ]
    },
    
    // LAYER 3: Policy Stress Indicators
    policyStress: {
      escalationsPerPolicy: [
        { policy: 'Cost Threshold Limit', triggered: 8, trend: 'increasing' },
        { policy: 'VIP Customer Protection', triggered: 5, trend: 'stable' },
        { policy: 'Multi-Zone Coordination', triggered: 3, trend: 'decreasing' },
        { policy: 'Resource Allocation Cap', triggered: 2, trend: 'stable' }
      ],
      breachFrequency: {
        total: 18,
        trend: 'increasing',
        changePercent: 12
      }
    },
    
    // LAYER 4: VIP Risk Exposure
    vipRisk: {
      currentlyAtRisk: 12,
      breachTrend: 'stable',
      repeatExposurePatterns: [
        { pattern: 'Traffic delays in East District', frequency: 4 },
        { pattern: 'Driver capacity shortfall', frequency: 3 },
        { pattern: 'Customer availability issues', frequency: 2 }
      ]
    },
    
    // LAYER 5: Root Cause Patterns
    rootCausePatterns: {
      topCauses: [
        { cause: 'Traffic delays', frequency: 28, trend: 'stable', percentage: 35 },
        { cause: 'Driver capacity shortfall', frequency: 18, trend: 'increasing', percentage: 23 },
        { cause: 'Vehicle breakdown', frequency: 12, trend: 'stable', percentage: 15 },
        { cause: 'Customer unavailable', frequency: 10, trend: 'decreasing', percentage: 13 },
        { cause: 'Weather conditions', frequency: 8, trend: 'stable', percentage: 10 },
        { cause: 'Other', frequency: 4, trend: 'stable', percentage: 5 }
      ],
      correlations: [
        { correlation: 'Traffic delays most common in East District morning shift', strength: 'high' },
        { correlation: 'Capacity issues concentrated in afternoon shift', strength: 'medium' }
      ]
    },
    
    // LAYER 6: Escalation Context
    escalationContext: {
      volumeTrend: {
        current: 12,
        previous: 9,
        direction: 'increasing',
        changePercent: 33
      },
      escalationRatio: {
        escalations: 12,
        totalDeliveries: 515,
        percentage: 2.3
      },
      avgTimeToEscalation: '42 minutes'
    },
    
    // LAYER 7: Governance Insights
    governanceInsights: [
      {
        type: 'Policy Review',
        insight: 'Cost Threshold Limit policy triggered 8 times today',
        recommendation: 'Consider threshold reassessment for East District'
      },
      {
        type: 'Regional Assessment',
        insight: 'East District consistently operates near capacity limits',
        recommendation: 'Review resource allocation for morning shift'
      },
      {
        type: 'Pattern Detection',
        insight: 'Driver capacity shortfalls increasing 23% week-over-week',
        recommendation: 'Evaluate staffing model and shift coverage'
      }
    ]
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-slate-700" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-slate-700" />;
      default:
        return <Minus className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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
                <h1 className="text-slate-900 font-medium">SLA & Risk Oversight</h1>
                <p className="text-slate-600 text-sm">Pattern analysis and governance insights</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600">Data Freshness</div>
                <div className="text-slate-900 text-sm">{oversightData.dataFreshness}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* LAYER 0 — CONTEXT & SCOPE (Orientation) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-xs text-slate-600 mb-1 block">Time Window</label>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="today">Today</option>
                    <option value="last-7-days">Last 7 Days</option>
                    <option value="last-30-days">Last 30 Days</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-600 mb-1 block">Operational Scope</label>
                  <select
                    value={regionScope}
                    onChange={(e) => setRegionScope(e.target.value as RegionScope)}
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Regions</option>
                    <option value="northeast">Northeast Region</option>
                    <option value="southeast">Southeast Region</option>
                    <option value="midwest">Midwest Region</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{oversightData.dataFreshness}</span>
              </div>
            </div>
          </div>

          {/* LAYER 1 — SLA HEALTH SIGNAL (Top-Level Status) */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Activity className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">SLA Health Signal</h2>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-600">Overall SLA Compliance</span>
                  {getTrendIcon(oversightData.slaHealthSignal.complianceTrend)}
                </div>
                <div className="text-3xl text-slate-900 font-medium mb-2">
                  {oversightData.slaHealthSignal.overallCompliance}%
                </div>
                <div className="text-xs text-slate-600">Trend: {oversightData.slaHealthSignal.complianceTrend}</div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">At-Risk Deliveries</div>
                <div className="text-3xl text-slate-900 font-medium mb-2">
                  {oversightData.slaHealthSignal.atRiskDeliveries}
                </div>
                <div className="text-xs text-slate-600">Aggregate count</div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">Breached Deliveries</div>
                <div className="text-3xl text-slate-900 font-medium mb-2">
                  {oversightData.slaHealthSignal.breachedDeliveries}
                </div>
                <div className="text-xs text-slate-600">Aggregate count</div>
              </div>
            </div>
          </div>

          {/* LAYER 2 — RISK CONCENTRATION (Where Problems Cluster) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Risk Concentration</h2>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {/* By Region */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">By Region</h3>
                <div className="space-y-2">
                  {oversightData.riskConcentration.byRegion.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-700">{item.region}</span>
                        <span className="text-sm text-slate-900 font-medium">{item.atRisk}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-600" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* By Shift */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">By Shift</h3>
                <div className="space-y-2">
                  {oversightData.riskConcentration.byShift.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-700">{item.shift}</span>
                        <span className="text-sm text-slate-900 font-medium">{item.atRisk}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-600" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* By Delivery Type */}
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">By Delivery Type</h3>
                <div className="space-y-2">
                  {oversightData.riskConcentration.byDeliveryType.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-700">{item.type}</span>
                        <span className="text-sm text-slate-900 font-medium">{item.atRisk}/{item.total}</span>
                      </div>
                      <div className="text-xs text-slate-600 mb-2">{item.percentage}% at risk</div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-600" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 3 — POLICY STRESS INDICATORS */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Policy Stress Indicators</h2>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Escalations per Policy</h3>
                <div className="space-y-2">
                  {oversightData.policyStress.escalationsPerPolicy.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-slate-900 mb-1">{item.policy}</div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(item.trend)}
                          <span className="text-xs text-slate-600">{item.trend}</span>
                        </div>
                      </div>
                      <div className="text-xl text-slate-900 font-medium">{item.triggered}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Breach Frequency Trend</h3>
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-xs text-slate-600 mb-2">Total Policy Breaches</div>
                  <div className="text-4xl text-slate-900 font-medium mb-3">
                    {oversightData.policyStress.breachFrequency.total}
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(oversightData.policyStress.breachFrequency.trend)}
                    <span className="text-sm text-slate-700">
                      {oversightData.policyStress.breachFrequency.trend} 
                      {' '}({oversightData.policyStress.breachFrequency.changePercent > 0 ? '+' : ''}
                      {oversightData.policyStress.breachFrequency.changePercent}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 4 — VIP RISK EXPOSURE (Business View) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <DollarSign className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">VIP Risk Exposure</h2>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Current Status</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-2">VIP Deliveries at Risk</div>
                    <div className="text-3xl text-slate-900 font-medium">{oversightData.vipRisk.currentlyAtRisk}</div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                    <div className="text-xs text-slate-600 mb-2">VIP Breach Trend</div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(oversightData.vipRisk.breachTrend)}
                      <span className="text-lg text-slate-900 font-medium capitalize">{oversightData.vipRisk.breachTrend}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Repeat Exposure Patterns</h3>
                <div className="space-y-2">
                  {oversightData.vipRisk.repeatExposurePatterns.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                      <span className="text-sm text-slate-700">{item.pattern}</span>
                      <span className="text-sm text-slate-900 font-medium">{item.frequency}x</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 5 — ROOT CAUSE PATTERNS (Systemic Causes) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Root Cause Patterns</h2>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Top Recurring Causes</h3>
                <div className="space-y-2">
                  {oversightData.rootCausePatterns.topCauses.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-700">{item.cause}</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(item.trend)}
                          <span className="text-sm text-slate-900 font-medium">{item.frequency}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-600" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-600 mt-1">{item.percentage}% of total</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs text-slate-600 font-medium mb-3 uppercase">Pattern Correlations</h3>
                <div className="space-y-3">
                  {oversightData.rootCausePatterns.correlations.map((item, index) => (
                    <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-600 uppercase">Correlation Strength</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          item.strength === 'high' 
                            ? 'bg-slate-700 text-white' 
                            : 'bg-slate-300 text-slate-700'
                        }`}>
                          {item.strength}
                        </span>
                      </div>
                      <p className="text-sm text-slate-900">{item.correlation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 6 — ESCALATION CONTEXT (Governance Bridge) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Escalation Context</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">Escalation Volume Trend</div>
                <div className="flex items-center gap-2 mb-2">
                  {getTrendIcon(oversightData.escalationContext.volumeTrend.direction)}
                  <span className="text-2xl text-slate-900 font-medium">
                    {oversightData.escalationContext.volumeTrend.direction === 'increasing' ? '+' : '-'}
                    {oversightData.escalationContext.volumeTrend.changePercent}%
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  {oversightData.escalationContext.volumeTrend.current} today vs {oversightData.escalationContext.volumeTrend.previous} yesterday
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">Escalation Ratio</div>
                <div className="text-2xl text-slate-900 font-medium mb-2">
                  {oversightData.escalationContext.escalationRatio.percentage}%
                </div>
                <div className="text-xs text-slate-600">
                  {oversightData.escalationContext.escalationRatio.escalations} of {oversightData.escalationContext.escalationRatio.totalDeliveries} deliveries
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg">
                <div className="text-xs text-slate-600 mb-3">Avg Time to Escalation</div>
                <div className="text-2xl text-slate-900 font-medium mb-2">
                  {oversightData.escalationContext.avgTimeToEscalation}
                </div>
                <div className="text-xs text-slate-600">From risk detection</div>
              </div>
            </div>
          </div>

          {/* LAYER 7 — GOVERNANCE INSIGHTS (Secondary) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Governance Insights</h2>
            </div>

            <div className="space-y-3">
              {oversightData.governanceInsights.map((item, index) => (
                <div key={index} className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded uppercase font-medium">
                          {item.type}
                        </span>
                      </div>
                      <div className="text-sm text-slate-900 mb-2">
                        <strong>Insight:</strong> {item.insight}
                      </div>
                      <div className="text-sm text-blue-800">
                        <strong>Recommendation:</strong> {item.recommendation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-start gap-2 text-xs">
                <Info className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  These insights are advisory only. No direct configuration changes can be made from this screen. 
                  Use these patterns to inform policy reviews and resource planning.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
