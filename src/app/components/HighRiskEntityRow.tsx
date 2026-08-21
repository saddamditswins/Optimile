import { Clock, ChevronRight, Route, Package, AlertCircle } from 'lucide-react';
import { HighRiskEntity } from './RiskFocusView';

interface HighRiskEntityRowProps {
  entity: HighRiskEntity;
  rank: number;
  onClick: () => void;
}

export function HighRiskEntityRow({ entity, rank, onClick }: HighRiskEntityRowProps) {
  const formatTimeRemaining = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getSeverityStyles = () => {
    switch (entity.severity) {
      case 'critical':
        return {
          rankBg: 'bg-red-100 text-red-700 border-red-200',
          badge: 'bg-red-100 text-red-700 border-red-200',
          timerBg: 'bg-red-50 border-red-200 text-red-700',
          pulse: 'animate-pulse'
        };
      case 'high':
        return {
          rankBg: 'bg-amber-100 text-amber-700 border-amber-200',
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          timerBg: 'bg-amber-50 border-amber-200 text-amber-700',
          pulse: ''
        };
      case 'medium':
        return {
          rankBg: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          timerBg: 'bg-yellow-50 border-yellow-200 text-yellow-700',
          pulse: ''
        };
    }
  };

  const getEntityIcon = () => {
    return entity.entityType === 'Route' ? (
      <Route className="w-4 h-4" />
    ) : (
      <Package className="w-4 h-4" />
    );
  };

  const getStatusColor = () => {
    switch (entity.status.toLowerCase()) {
      case 'in transit':
        return 'bg-blue-100 text-blue-700';
      case 'delayed':
        return 'bg-red-100 text-red-700';
      case 'attempted':
        return 'bg-amber-100 text-amber-700';
      case 'pending':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const styles = getSeverityStyles();

  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-4 hover:bg-slate-50 transition-colors duration-150 flex flex-wrap items-center gap-x-4 gap-y-3 group"
    >
      {/* Rank */}
      <div className={`${styles.rankBg} border w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <span className="text-sm">{rank}</span>
      </div>

      {/* Entity Type & ID */}
      <div className="flex items-center gap-3 flex-shrink-0 min-w-[160px]">
        <div className={`${styles.badge} border p-2 rounded-lg`}>
          {getEntityIcon()}
        </div>
        <div className="text-left">
          <div className="text-slate-900">{entity.entityId}</div>
          <div className="text-slate-600 text-xs">{entity.entityType}</div>
        </div>
      </div>

      {/* Risk Count */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <AlertCircle className="w-4 h-4 text-slate-400" />
        <div className="text-left">
          <div className="text-slate-900 text-sm">{entity.riskCount}</div>
          <div className="text-slate-600 text-xs">
            {entity.riskCount === 1 ? 'risk' : 'risks'}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        <span className={`${getStatusColor()} px-3 py-1 rounded-full text-xs`}>
          {entity.status}
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Worst SLA Countdown */}
      <div className={`${styles.timerBg} ${styles.pulse} border px-4 py-2 rounded-lg flex items-center gap-2 flex-shrink-0`}>
        <Clock className="w-4 h-4" />
        <div className="text-left">
          <div className="text-xs text-slate-600">Worst SLA</div>
          <div className="text-sm">{formatTimeRemaining(entity.worstSlaCountdown)}</div>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors flex-shrink-0" />
    </button>
  );
}
