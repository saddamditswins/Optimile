import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface Impact {
  id: string;
  label: string;
  currentValue: number;
  projectedValue: number;
  delta: number;
  unit: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ImpactMetricCardProps {
  impact: Impact;
}

export function ImpactMetricCard({ impact }: ImpactMetricCardProps) {
  const isIncrease = impact.delta > 0;
  const isDecrease = impact.delta < 0;
  const isNeutral = impact.delta === 0;

  const getSeverityConfig = () => {
    switch (impact.severity) {
      case 'critical':
        return {
          color: 'border-red-300 bg-red-50',
          textColor: 'text-red-700',
          badgeColor: 'bg-red-200 text-red-900 border-red-400'
        };
      case 'high':
        return {
          color: 'border-amber-300 bg-amber-50',
          textColor: 'text-amber-700',
          badgeColor: 'bg-amber-200 text-amber-900 border-amber-400'
        };
      case 'medium':
        return {
          color: 'border-yellow-300 bg-yellow-50',
          textColor: 'text-yellow-700',
          badgeColor: 'bg-yellow-200 text-yellow-900 border-yellow-400'
        };
      case 'low':
        return {
          color: 'border-blue-300 bg-blue-50',
          textColor: 'text-blue-700',
          badgeColor: 'bg-blue-200 text-blue-900 border-blue-400'
        };
    }
  };

  const severityConfig = getSeverityConfig();

  const getDeltaIcon = () => {
    if (isNeutral) {
      return <Minus className="w-4 h-4" />;
    }
    if (isIncrease) {
      return <TrendingUp className="w-4 h-4" />;
    }
    return <TrendingDown className="w-4 h-4" />;
  };

  const formatValue = (value: number) => {
    if (impact.unit === '%') {
      return `${value}${impact.unit}`;
    }
    return `${value} ${impact.unit}`;
  };

  const formatDelta = (delta: number) => {
    const prefix = delta > 0 ? '+' : '';
    if (impact.unit === '%') {
      return `${prefix}${delta}${impact.unit}`;
    }
    return `${prefix}${delta} ${impact.unit}`;
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${severityConfig.color}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={`text-sm ${severityConfig.textColor}`}>
          {impact.label}
        </div>
        {impact.severity !== 'low' && (
          <AlertTriangle className={`w-4 h-4 ${severityConfig.textColor} flex-shrink-0`} />
        )}
      </div>

      {/* Values */}
      <div className="space-y-2 mb-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-600">Current:</span>
          <span className="text-slate-900">{formatValue(impact.currentValue)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-600">Projected:</span>
          <span className={severityConfig.textColor}>{formatValue(impact.projectedValue)}</span>
        </div>
      </div>

      {/* Delta */}
      <div className={`flex items-center justify-between pt-3 border-t ${
        impact.severity === 'critical' ? 'border-red-200' :
        impact.severity === 'high' ? 'border-amber-200' :
        impact.severity === 'medium' ? 'border-yellow-200' :
        'border-blue-200'
      }`}>
        <span className="text-xs text-slate-600">Change:</span>
        <div className={`flex items-center gap-1 ${severityConfig.textColor}`}>
          {getDeltaIcon()}
          <span className="text-sm">{formatDelta(impact.delta)}</span>
        </div>
      </div>

      {/* Severity Badge */}
      {impact.severity !== 'low' && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <span className={`inline-block px-2 py-0.5 rounded text-xs border ${severityConfig.badgeColor} uppercase`}>
            {impact.severity} Impact
          </span>
        </div>
      )}
    </div>
  );
}
