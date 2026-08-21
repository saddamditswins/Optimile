import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface Constraint {
  id: string;
  type: string;
  icon: React.ReactNode;
  status: 'ok' | 'warning' | 'blocking';
  value: string;
  explanation: string;
  blocksReassignment: boolean;
  blocksRescue: boolean;
}

interface DriverConstraintCardProps {
  constraint: Constraint;
}

export function DriverConstraintCard({ constraint }: DriverConstraintCardProps) {
  const getStatusConfig = () => {
    switch (constraint.status) {
      case 'ok':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          badge: 'OK',
          badgeColor: 'bg-green-100 text-green-700 border-green-300',
          borderColor: 'border-green-200',
          bgColor: 'bg-green-50'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          badge: 'Warning',
          badgeColor: 'bg-amber-100 text-amber-700 border-amber-300',
          borderColor: 'border-amber-200',
          bgColor: 'bg-amber-50'
        };
      case 'blocking':
        return {
          icon: <XCircle className="w-5 h-5 text-red-600" />,
          badge: 'Blocking',
          badgeColor: 'bg-red-100 text-red-700 border-red-300',
          borderColor: 'border-red-200',
          bgColor: 'bg-red-50'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`bg-white rounded-lg border ${statusConfig.borderColor} p-4`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded ${statusConfig.bgColor}`}>
            {constraint.icon}
          </div>
          <span className="text-slate-900 text-sm">{constraint.type}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {statusConfig.icon}
          <span className={`px-2 py-0.5 rounded text-xs border ${statusConfig.badgeColor}`}>
            {statusConfig.badge}
          </span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="text-slate-900 text-sm">{constraint.value}</div>
      </div>

      {/* Explanation */}
      <div className="text-slate-600 text-xs mb-3 leading-relaxed">
        {constraint.explanation}
      </div>

      {/* Impact Indicators */}
      {(constraint.blocksReassignment || constraint.blocksRescue) && (
        <div className="pt-3 border-t border-slate-200">
          <div className="text-xs text-slate-600 mb-1.5">Blocks:</div>
          <div className="flex flex-wrap gap-1.5">
            {constraint.blocksReassignment && (
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                Reassignment
              </span>
            )}
            {constraint.blocksRescue && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                Rescue
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
