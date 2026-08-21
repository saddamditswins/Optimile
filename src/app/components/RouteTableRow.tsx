import { Clock, AlertTriangle, TrendingDown, Info } from 'lucide-react';
import { Route } from './RoutesListScreen';
import { useState } from 'react';

interface RouteTableRowProps {
  route: Route;
  onClick: () => void;
}

export function RouteTableRow({ route, onClick }: RouteTableRowProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getHealthStatusBadge = () => {
    switch (route.healthStatus) {
      case 'On Track':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            On Track
          </span>
        );
      case 'At Risk':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm">
            <AlertTriangle className="w-3.5 h-3.5" />
            At Risk
          </span>
        );
      case 'Breached':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            Breached
          </span>
        );
    }
  };

  const getSlaStyles = () => {
    if (route.worstSlaCountdown < 30) {
      return 'bg-red-50 border-red-200 text-red-700';
    } else if (route.worstSlaCountdown < 60) {
      return 'bg-amber-50 border-amber-200 text-amber-700';
    } else {
      return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const formatTimeRemaining = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const hasRisk = route.healthStatus === 'At Risk' || route.healthStatus === 'Breached';

  return (
    <tr 
      onClick={onClick}
      className={`cursor-pointer transition-colors ${
        route.healthStatus === 'Breached' 
          ? 'bg-red-50/50 hover:bg-red-50' 
          : route.healthStatus === 'At Risk'
          ? 'bg-amber-50/30 hover:bg-amber-50/50'
          : 'hover:bg-slate-50'
      }`}
    >
      {/* Route ID */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-900">{route.routeId}</span>
          {hasRisk && route.riskContext && (
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <Info className="w-4 h-4" />
              </button>
              {showTooltip && (
                <div className="absolute left-0 top-6 z-10 w-64 bg-slate-900 text-white text-xs p-3 rounded-lg shadow-lg">
                  {route.riskContext}
                  <div className="absolute -top-1 left-4 w-2 h-2 bg-slate-900 transform rotate-45" />
                </div>
              )}
            </div>
          )}
        </div>
      </td>

      {/* Driver */}
      <td className="px-6 py-4">
        <span className="text-slate-700">{route.driverName}</span>
      </td>

      {/* Health Status */}
      <td className="px-6 py-4">
        {getHealthStatusBadge()}
      </td>

      {/* Remaining Stops */}
      <td className="px-6 py-4">
        <span className="text-slate-900">{route.remainingStops}</span>
        <span className="text-slate-500 text-sm ml-1">stops</span>
      </td>

      {/* Worst SLA Countdown */}
      <td className="px-6 py-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg ${getSlaStyles()}`}>
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatTimeRemaining(route.worstSlaCountdown)}</span>
        </div>
      </td>

      {/* Delay */}
      <td className="px-6 py-4">
        {route.delayMinutes > 0 ? (
          <div className="inline-flex items-center gap-1.5 text-red-700">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm">+{route.delayMinutes} min</span>
          </div>
        ) : (
          <span className="text-slate-400 text-sm">—</span>
        )}
      </td>

      {/* Last Activity */}
      <td className="px-6 py-4">
        <span className="text-slate-600 text-sm">{route.lastActivity}</span>
      </td>
    </tr>
  );
}
