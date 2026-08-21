import { Route, User, Building2, AlertTriangle } from 'lucide-react';
import { RiskFilters } from './RiskFocusView';

interface RiskDistributionProps {
  filters: RiskFilters;
}

interface RiskCluster {
  id: string;
  name: string;
  riskCount: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
}

export function RiskDistribution({ filters }: RiskDistributionProps) {
  // Mock data for risk clusters
  const routeClusters: RiskCluster[] = [
    { id: '1', name: 'RT-2847', riskCount: 4, criticalCount: 3, highCount: 1, mediumCount: 0 },
    { id: '2', name: 'RT-3901', riskCount: 3, criticalCount: 1, highCount: 2, mediumCount: 0 },
    { id: '3', name: 'RT-4523', riskCount: 2, criticalCount: 0, highCount: 1, mediumCount: 1 },
    { id: '4', name: 'RT-5891', riskCount: 1, criticalCount: 0, highCount: 0, mediumCount: 1 }
  ];

  const driverClusters: RiskCluster[] = [
    { id: '1', name: 'Driver #247', riskCount: 5, criticalCount: 2, highCount: 2, mediumCount: 1 },
    { id: '2', name: 'Driver #189', riskCount: 3, criticalCount: 1, highCount: 2, mediumCount: 0 },
    { id: '3', name: 'Driver #352', riskCount: 2, criticalCount: 0, highCount: 1, mediumCount: 1 }
  ];

  const depotClusters: RiskCluster[] = [
    { id: '1', name: 'Central Depot', riskCount: 12, criticalCount: 5, highCount: 5, mediumCount: 2 },
    { id: '2', name: 'North Hub', riskCount: 4, criticalCount: 1, highCount: 2, mediumCount: 1 },
    { id: '3', name: 'East Station', riskCount: 2, criticalCount: 0, highCount: 1, mediumCount: 1 }
  ];

  const renderCluster = (cluster: RiskCluster, icon: React.ReactNode, bgColor: string) => {
    const hasHighRisk = cluster.criticalCount > 0 || cluster.highCount > 1;
    
    return (
      <button
        key={cluster.id}
        className={`${bgColor} border rounded-lg p-4 text-left hover:shadow-md transition-all duration-200 ${
          hasHighRisk ? 'border-amber-300' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-slate-900 text-sm">{cluster.name}</span>
          </div>
          {hasHighRisk && (
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Total Risks</span>
            <span className="text-slate-900">{cluster.riskCount}</span>
          </div>

          {/* Risk Severity Breakdown */}
          <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-slate-200">
            {cluster.criticalCount > 0 && (
              <div
                className="bg-red-500"
                style={{ width: `${(cluster.criticalCount / cluster.riskCount) * 100}%` }}
                title={`${cluster.criticalCount} critical`}
              />
            )}
            {cluster.highCount > 0 && (
              <div
                className="bg-amber-500"
                style={{ width: `${(cluster.highCount / cluster.riskCount) * 100}%` }}
                title={`${cluster.highCount} high`}
              />
            )}
            {cluster.mediumCount > 0 && (
              <div
                className="bg-yellow-500"
                style={{ width: `${(cluster.mediumCount / cluster.riskCount) * 100}%` }}
                title={`${cluster.mediumCount} medium`}
              />
            )}
          </div>

          <div className="flex gap-3 text-xs">
            {cluster.criticalCount > 0 && (
              <span className="text-red-600">{cluster.criticalCount} critical</span>
            )}
            {cluster.highCount > 0 && (
              <span className="text-amber-600">{cluster.highCount} high</span>
            )}
            {cluster.mediumCount > 0 && (
              <span className="text-yellow-600">{cluster.mediumCount} medium</span>
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Routes Distribution */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Route className="w-5 h-5 text-blue-600" />
          <h3 className="text-slate-900">Risk Distribution by Route</h3>
          <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {routeClusters.length} routes with multiple risks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {routeClusters.map(cluster => 
            renderCluster(cluster, <Route className="w-4 h-4 text-blue-600" />, 'bg-blue-50')
          )}
        </div>
      </div>

      {/* Drivers Distribution */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-purple-600" />
          <h3 className="text-slate-900">Risk Distribution by Driver</h3>
          <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {driverClusters.length} drivers with multiple risks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {driverClusters.map(cluster => 
            renderCluster(cluster, <User className="w-4 h-4 text-purple-600" />, 'bg-purple-50')
          )}
        </div>
      </div>

      {/* Depots Distribution */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-green-600" />
          <h3 className="text-slate-900">Risk Distribution by Depot</h3>
          <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {depotClusters.length} depots with active risks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {depotClusters.map(cluster => 
            renderCluster(cluster, <Building2 className="w-4 h-4 text-green-600" />, 'bg-green-50')
          )}
        </div>
      </div>
    </div>
  );
}
