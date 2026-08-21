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
  Radio,
  TrendingUp,
  Layers,
  MapPin,
  Calendar,
  RefreshCw,
  ArrowUpDown
} from 'lucide-react';
import { useState } from 'react';

interface ExecutionMonitorProps {
  onViewExecutionDetail: (commitId: string) => void;
}

type ExecutionStatus = 'in-progress' | 'completed' | 'failed' | 'partially-failed';
type SeverityLevel = 'critical' | 'high' | 'standard';

export function ExecutionMonitor({ onViewExecutionDetail }: ExecutionMonitorProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | ExecutionStatus>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | SeverityLevel>('all');
  const [sortBy, setSortBy] = useState<'time' | 'risk'>('time');

  // Mock data
  const contextData = {
    currentDate: 'Wednesday, December 31, 2025',
    activeShift: 'Day Shift (6:00 AM - 6:00 PM)',
    depot: 'Central Hub',
    region: 'East District',
    lastRefresh: '11:47 AM'
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
      riskLevel: 'elevated'
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
      riskLevel: 'low'
    },
    {
      commitId: 'CMT-2821-001',
      recoveryId: 'REC-2821-001',
      executionStatus: 'partially-failed' as ExecutionStatus,
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
      riskLevel: 'high',
      failureReason: 'Driver acknowledgment timeout (DRV-189)'
    },
    {
      commitId: 'CMT-2801-001',
      recoveryId: 'REC-2801-001',
      executionStatus: 'failed' as ExecutionStatus,
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
      riskLevel: 'low',
      failureReason: 'System integration failure'
    }
  ];

  const getStatusBadge = (status: ExecutionStatus) => {
    switch (status) {
      case 'in-progress':
        return (
          <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 uppercase text-xs font-medium flex items-center gap-2">
            <RefreshCw className="w-3 h-3 animate-spin" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 uppercase text-xs font-medium flex items-center gap-2">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case 'partially-failed':
        return (
          <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg border border-amber-300 uppercase text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            Partial Failure
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg border border-red-300 uppercase text-xs font-medium flex items-center gap-2">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
    }
  };

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-300 uppercase">Critical</span>;
      case 'high':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300 uppercase">High</span>;
      case 'standard':
        return <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300 uppercase">Standard</span>;
    }
  };

  const getProgressBarColor = (status: ExecutionStatus) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'partially-failed':
        return 'bg-amber-500';
      case 'failed':
        return 'bg-red-500';
    }
  };

  const filteredCommits = activeCommits.filter((commit) => {
    const statusMatch = statusFilter === 'all' || commit.executionStatus === statusFilter;
    const severityMatch = severityFilter === 'all' || commit.severity === severityFilter;
    return statusMatch && severityMatch;
  });

  const sortedCommits = [...filteredCommits].sort((a, b) => {
    if (sortBy === 'time') {
      return a.committedAt.localeCompare(b.committedAt);
    } else {
      const riskOrder = { high: 0, elevated: 1, low: 2 };
      return riskOrder[a.riskLevel as keyof typeof riskOrder] - riskOrder[b.riskLevel as keyof typeof riskOrder];
    }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-slate-900">Execution Oversight</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg border border-blue-300 uppercase font-medium flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  Live Tracking
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                Real-time monitoring of post-commit recovery execution
              </p>
            </div>

            {/* Context Indicators */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Date
                </div>
                <div className="text-slate-900 text-sm">{contextData.currentDate}</div>
              </div>
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Active Shift
                </div>
                <div className="text-slate-900 text-sm">{contextData.activeShift}</div>
              </div>
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location
                </div>
                <div className="text-slate-900 text-sm">{contextData.depot} - {contextData.region}</div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Total Active</div>
              <div className="text-2xl text-slate-900 font-medium">{activeCommits.length}</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-700 mb-1">In Progress</div>
              <div className="text-2xl text-blue-700 font-medium">
                {activeCommits.filter(c => c.executionStatus === 'in-progress').length}
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs text-green-700 mb-1">Completed</div>
              <div className="text-2xl text-green-700 font-medium">
                {activeCommits.filter(c => c.executionStatus === 'completed').length}
              </div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-xs text-amber-700 mb-1">Requires Attention</div>
              <div className="text-2xl text-amber-700 font-medium">
                {activeCommits.filter(c => c.executionStatus === 'partially-failed' || c.executionStatus === 'failed').length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Filters & Controls */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700 font-medium">Filters:</span>
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="all">All Statuses</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="partially-failed">Partial Failure</option>
                    <option value="failed">Failed</option>
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

              <div className="flex items-center gap-4">
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
                    <option value="time">Time Since Commit</option>
                    <option value="risk">Failure Risk</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                  <Radio className="w-3 h-3" />
                  <span>Last refresh: {contextData.lastRefresh}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Commits List */}
          <div className="space-y-4">
            {sortedCommits.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-300 p-12 text-center">
                <Activity className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">No active executions match the selected filters</p>
              </div>
            ) : (
              sortedCommits.map((commit) => (
                <div
                  key={commit.commitId}
                  className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    commit.executionStatus === 'failed' || commit.executionStatus === 'partially-failed'
                      ? 'border-amber-400'
                      : commit.executionStatus === 'in-progress'
                      ? 'border-blue-400'
                      : 'border-slate-300'
                  }`}
                  onClick={() => onViewExecutionDetail(commit.commitId)}
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

                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View Detail</span>
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-600 font-medium">Execution Progress</span>
                        <span className="text-xs text-slate-700">
                          {commit.stepsExecuted} / {commit.stepsTotal} steps
                          {commit.stepsFailed > 0 && (
                            <span className="text-red-700 ml-1">({commit.stepsFailed} failed)</span>
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

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Route className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-slate-700">Routes</span>
                        </div>
                        <div className="text-lg text-blue-700 font-medium">{commit.affectedEntities.routes}</div>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-slate-700">Drivers</span>
                        </div>
                        <div className="text-lg text-green-700 font-medium">{commit.affectedEntities.drivers}</div>
                      </div>

                      <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-4 h-4 text-indigo-600" />
                          <span className="text-xs text-slate-700">Deliveries</span>
                        </div>
                        <div className="text-lg text-indigo-700 font-medium">{commit.affectedEntities.deliveries}</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-slate-600" />
                          <span className="text-xs text-slate-700">Time Active</span>
                        </div>
                        <div className="text-sm text-slate-700 font-medium">{commit.timeSinceCommit}</div>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <div className="text-xs text-slate-600">
                        Committed at <strong>{commit.committedAt}</strong>
                      </div>
                      {commit.failureReason && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-300 rounded text-xs text-amber-800">
                          <AlertCircle className="w-3 h-3" />
                          {commit.failureReason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t-2 border-slate-300 shadow-lg">
        <div className="px-6 py-3">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-slate-600" />
              <div>
                <div className="text-sm text-slate-900 font-medium">
                  {sortedCommits.length} execution{sortedCommits.length !== 1 ? 's' : ''} visible
                </div>
                <div className="text-xs text-slate-600">Read-only monitoring view</div>
              </div>
            </div>

            <div className="text-xs text-slate-600">
              Click any execution to view step-by-step detail
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}