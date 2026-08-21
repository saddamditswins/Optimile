import {
  Shield,
  Clock,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

interface EscalationQueueProps {
  onSelectEscalation: (escalationId: string) => void;
}

type BreachType = 'cost' | 'sla' | 'cross-zone';
type SeverityLevel = 'critical' | 'high' | 'standard';

export function EscalationQueue({ onSelectEscalation }: EscalationQueueProps) {
  const [breachFilter, setBreachFilter] = useState<'all' | BreachType>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | SeverityLevel>('all');
  const [sortBy, setSortBy] = useState<'urgency' | 'time' | 'cost'>('urgency');

  // Mock data
  const escalations = [
    {
      escalationId: 'ESC-2847-001',
      breachType: 'cost' as BreachType,
      severity: 'critical' as SeverityLevel,
      affectedZones: ['East District'],
      costImpact: '$4,200',
      slaRisk: 'High',
      submittedAt: '2:35 PM',
      agingMinutes: 10,
      timeoutMinutes: 20,
      requestingManager: 'Sarah Chen',
      description: 'Multi-route rebalancing exceeds cost threshold',
      policyBreach: 'Single intervention cost > $4,000'
    },
    {
      escalationId: 'ESC-2839-002',
      breachType: 'cross-zone' as BreachType,
      severity: 'high' as SeverityLevel,
      affectedZones: ['East District', 'Central District'],
      costImpact: '$2,800',
      slaRisk: 'Medium',
      submittedAt: '2:20 PM',
      agingMinutes: 25,
      timeoutMinutes: 5,
      requestingManager: 'James Rodriguez',
      description: 'Cross-zone delivery reassignment',
      policyBreach: 'Cross-zone transfer without approval'
    },
    {
      escalationId: 'ESC-2821-001',
      breachType: 'sla' as BreachType,
      severity: 'high' as SeverityLevel,
      affectedZones: ['North District'],
      costImpact: '$1,900',
      slaRisk: 'Critical',
      submittedAt: '1:45 PM',
      agingMinutes: 60,
      timeoutMinutes: 0,
      requestingManager: 'Marcus Thompson',
      description: 'Emergency route recovery with SLA breach risk',
      policyBreach: 'Planned SLA miss > 15 minutes'
    }
  ];

  const getBreachBadge = (type: BreachType) => {
    switch (type) {
      case 'cost':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300 uppercase font-medium">Cost</span>;
      case 'sla':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-300 uppercase font-medium">SLA</span>;
      case 'cross-zone':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded border border-purple-300 uppercase font-medium">Cross-Zone</span>;
    }
  };

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-300 uppercase font-medium">Critical</span>;
      case 'high':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300 uppercase font-medium">High</span>;
      case 'standard':
        return <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300 uppercase font-medium">Standard</span>;
    }
  };

  const getUrgencyIndicator = (timeoutMinutes: number) => {
    if (timeoutMinutes <= 0) {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 border border-red-400 rounded text-xs text-red-800 font-medium animate-pulse">
          <AlertTriangle className="w-3 h-3" />
          TIMEOUT
        </div>
      );
    } else if (timeoutMinutes <= 10) {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-400 rounded text-xs text-amber-800 font-medium">
          <Clock className="w-3 h-3" />
          {timeoutMinutes} min left
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-300 rounded text-xs text-blue-800">
          <Clock className="w-3 h-3" />
          {timeoutMinutes} min left
        </div>
      );
    }
  };

  const filteredEscalations = escalations.filter((esc) => {
    const breachMatch = breachFilter === 'all' || esc.breachType === breachFilter;
    const severityMatch = severityFilter === 'all' || esc.severity === severityFilter;
    return breachMatch && severityMatch;
  });

  const sortedEscalations = [...filteredEscalations].sort((a, b) => {
    if (sortBy === 'urgency') {
      return a.timeoutMinutes - b.timeoutMinutes;
    } else if (sortBy === 'time') {
      return b.agingMinutes - a.agingMinutes;
    } else {
      return parseInt(b.costImpact.replace(/[$,]/g, '')) - parseInt(a.costImpact.replace(/[$,]/g, ''));
    }
  });

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
                <p className="text-slate-500 text-xs">Escalation Queue</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-300 rounded px-2 py-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-amber-800 text-xs font-medium">Operations Manager</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 gap-x-3">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>Wednesday, Dec 31, 2025</span>
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

            <div className="flex flex-wrap items-center gap-3">
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
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Filters & Controls */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700 font-medium">Filters:</span>
                </div>

                {/* Breach Type Filter */}
                <div className="relative">
                  <select
                    value={breachFilter}
                    onChange={(e) => setBreachFilter(e.target.value as any)}
                    className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="all">All Breach Types</option>
                    <option value="cost">Cost Breach</option>
                    <option value="sla">SLA Breach</option>
                    <option value="cross-zone">Cross-Zone</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Severity Filter */}
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

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700 font-medium">Sort by:</span>
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="urgency">Urgency (timeout)</option>
                    <option value="time">Time Submitted</option>
                    <option value="cost">Cost Impact</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Escalation Table */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b-2 border-slate-300">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium">Escalation ID</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium">Breach Type</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium">Severity</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium">Zones</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium">Cost Impact</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium">SLA Risk</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium">Urgency</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium">Requested By</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-700 uppercase font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sortedEscalations.map((escalation) => (
                    <tr
                      key={escalation.escalationId}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        escalation.timeoutMinutes <= 0 ? 'bg-red-50' :
                        escalation.timeoutMinutes <= 10 ? 'bg-amber-50' :
                        ''
                      }`}
                      onClick={() => onSelectEscalation(escalation.escalationId)}
                    >
                      <td className="px-4 py-4">
                        <div className="font-mono text-sm text-slate-900">{escalation.escalationId}</div>
                        <div className="text-xs text-slate-600 mt-1">{escalation.description}</div>
                      </td>
                      <td className="px-4 py-4">
                        {getBreachBadge(escalation.breachType)}
                      </td>
                      <td className="px-4 py-4">
                        {getSeverityBadge(escalation.severity)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-slate-900">
                          {escalation.affectedZones.join(', ')}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-sm text-slate-900 font-medium">
                          <DollarSign className="w-4 h-4 text-amber-600" />
                          {escalation.costImpact}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          escalation.slaRisk === 'Critical' ? 'bg-red-100 text-red-700' :
                          escalation.slaRisk === 'High' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {escalation.slaRisk}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {getUrgencyIndicator(escalation.timeoutMinutes)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-slate-900">{escalation.requestingManager}</div>
                        <div className="text-xs text-slate-600">Submitted {escalation.submittedAt}</div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectEscalation(escalation.escalationId);
                          }}
                          className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                        >
                          Review
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Governance Notice */}
          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-purple-900 text-sm font-medium mb-1">Escalation Triage Queue</div>
                <p className="text-purple-800 text-sm">
                  This queue displays policy-breaching decisions requiring governance approval. 
                  Click any row to review evidence and approve/reject. No inline actions or operational modifications available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}