import { 
  Radio, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface ReliabilitySignals {
  acknowledgmentLatency: 'fast' | 'normal' | 'slow';
  acknowledgmentAvgSeconds: number;
  offlineEvents: number;
  lastOfflineMinutes: number;
  complianceIndicator: 'excellent' | 'good' | 'fair' | 'concern';
}

interface DriverReliabilityPanelProps {
  signals: ReliabilitySignals;
}

export function DriverReliabilityPanel({ signals }: DriverReliabilityPanelProps) {
  const getAcknowledgmentConfig = () => {
    switch (signals.acknowledgmentLatency) {
      case 'fast':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          label: 'Fast',
          color: 'text-green-700 bg-green-50 border-green-200'
        };
      case 'normal':
        return {
          icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
          label: 'Normal',
          color: 'text-blue-700 bg-blue-50 border-blue-200'
        };
      case 'slow':
        return {
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          label: 'Slow',
          color: 'text-amber-700 bg-amber-50 border-amber-200'
        };
    }
  };

  const getComplianceConfig = () => {
    switch (signals.complianceIndicator) {
      case 'excellent':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          label: 'Excellent',
          color: 'text-green-700 bg-green-50 border-green-200'
        };
      case 'good':
        return {
          icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
          label: 'Good',
          color: 'text-blue-700 bg-blue-50 border-blue-200'
        };
      case 'fair':
        return {
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          label: 'Fair',
          color: 'text-amber-700 bg-amber-50 border-amber-200'
        };
      case 'concern':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          label: 'Needs Attention',
          color: 'text-red-700 bg-red-50 border-red-200'
        };
    }
  };

  const acknowledgmentConfig = getAcknowledgmentConfig();
  const complianceConfig = getComplianceConfig();

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      {/* Header with Advisory Notice */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-slate-900 mb-1">Reliability Signals</h2>
          <p className="text-slate-600 text-sm">Advisory indicators - not judgmental assessment</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
          <Info className="w-3 h-3" />
          ADVISORY ONLY
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Acknowledgment Latency */}
        <div className={`p-4 rounded-lg border ${acknowledgmentConfig.color}`}>
          <div className="flex items-center gap-2 mb-2">
            {acknowledgmentConfig.icon}
            <span className="text-sm">Acknowledgment Latency</span>
          </div>
          <div className="mb-1">
            <span className="text-lg">{acknowledgmentConfig.label}</span>
          </div>
          <div className="text-xs">
            Avg {signals.acknowledgmentAvgSeconds}s today
          </div>
        </div>

        {/* Offline Events */}
        <div className={`p-4 rounded-lg border ${
          signals.offlineEvents === 0 
            ? 'text-green-700 bg-green-50 border-green-200'
            : signals.offlineEvents <= 2
            ? 'text-blue-700 bg-blue-50 border-blue-200'
            : 'text-amber-700 bg-amber-50 border-amber-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-5 h-5" />
            <span className="text-sm">Offline Events Today</span>
          </div>
          <div className="mb-1">
            <span className="text-lg">{signals.offlineEvents}</span>
          </div>
          <div className="text-xs">
            {signals.offlineEvents > 0 
              ? `Last offline ${signals.lastOfflineMinutes} min ago`
              : 'No offline events today'
            }
          </div>
        </div>

        {/* Compliance Indicator */}
        <div className={`p-4 rounded-lg border ${complianceConfig.color}`}>
          <div className="flex items-center gap-2 mb-2">
            {complianceConfig.icon}
            <span className="text-sm">Compliance Indicator</span>
          </div>
          <div className="mb-1">
            <span className="text-lg">{complianceConfig.label}</span>
          </div>
          <div className="text-xs">
            General operational adherence
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-start gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            These signals provide operational context and should not be interpreted as performance evaluations. 
            They reflect system-level execution patterns and may be influenced by route complexity, traffic conditions, 
            and other external factors beyond driver control.
          </p>
        </div>
      </div>
    </div>
  );
}
