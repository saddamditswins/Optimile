import { useState } from 'react';
import { 
  Clock, 
  AlertTriangle,
  Radio,
  ChevronRight,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';

export interface Driver {
  id: string;
  driverId: string;
  driverName: string;
  executionState: 'Available' | 'Assigned' | 'En Route' | 'At Stop' | 'Offline';
  assignedRoute: string | null;
  remainingStops: number;
  remainingShiftMinutes: number;
  capacityStatus: 'Available' | 'Near Limit' | 'Exceeded';
  executionRisk: 'Critical' | 'High' | 'Medium' | null;
  lastSignalTime: string;
  lastSignalStatus: 'active' | 'inactive';
  feasibility: {
    canReassign: boolean;
    canRescue: boolean;
    canLoadTransfer: boolean;
    reasons: {
      reassign: string | null;
      rescue: string | null;
      loadTransfer: string | null;
    };
  };
  depot: string;
}

interface DriverTableRowProps {
  driver: Driver;
  onClick: () => void;
}

export function DriverTableRow({ driver, onClick }: DriverTableRowProps) {
  const [hoveredFeasibility, setHoveredFeasibility] = useState<string | null>(null);

  const getExecutionStateBadge = () => {
    switch (driver.executionState) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Available
          </span>
        );
      case 'Assigned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
            <div className="w-2 h-2 bg-slate-500 rounded-full" />
            Assigned
          </span>
        );
      case 'En Route':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            En Route
          </span>
        );
      case 'At Stop':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            At Stop
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs">
            <div className="w-2 h-2 bg-slate-400 rounded-full" />
            Offline
          </span>
        );
    }
  };

  const getCapacityBadge = () => {
    switch (driver.capacityStatus) {
      case 'Available':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
            Available
          </span>
        );
      case 'Near Limit':
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
            Near Limit
          </span>
        );
      case 'Exceeded':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
            Exceeded
          </span>
        );
    }
  };

  const getRiskBadge = () => {
    if (!driver.executionRisk) return <span className="text-slate-400 text-xs">—</span>;

    switch (driver.executionRisk) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
            <AlertTriangle className="w-3 h-3" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
            <AlertTriangle className="w-3 h-3" />
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
            Medium
          </span>
        );
    }
  };

  const formatShiftTime = (minutes: number) => {
    if (minutes === 0) return '—';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getShiftTimeColor = (minutes: number) => {
    if (minutes === 0) return 'text-slate-400';
    if (minutes < 90) return 'text-red-700';
    if (minutes < 180) return 'text-amber-700';
    return 'text-slate-700';
  };

  const getFeasibilityIcon = (canDo: boolean, reason: string | null, type: string) => {
    const isHovered = hoveredFeasibility === type;

    if (canDo) {
      return (
        <div className="relative">
          <CheckCircle className="w-4 h-4 text-green-600" />
        </div>
      );
    }

    return (
      <div className="relative">
        <XCircle 
          className="w-4 h-4 text-slate-400 cursor-help"
          onMouseEnter={() => setHoveredFeasibility(type)}
          onMouseLeave={() => setHoveredFeasibility(null)}
        />
        {isHovered && reason && (
          <div className="absolute left-0 top-full mt-1 w-56 bg-slate-900 text-white text-xs rounded-lg p-2 shadow-lg z-50 pointer-events-none">
            <div className="absolute -top-1 left-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-900" />
            {reason}
          </div>
        )}
      </div>
    );
  };

  return (
    <tr 
      className="hover:bg-slate-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      {/* Driver */}
      <td className="px-4 py-3">
        <div>
          <div className="text-slate-900 text-sm">{driver.driverName}</div>
          <div className="text-slate-600 text-xs">{driver.driverId}</div>
        </div>
      </td>

      {/* Execution State */}
      <td className="px-4 py-3">
        {getExecutionStateBadge()}
      </td>

      {/* Assigned Route */}
      <td className="px-4 py-3">
        {driver.assignedRoute ? (
          <span className="text-slate-900 text-sm">{driver.assignedRoute}</span>
        ) : (
          <span className="text-slate-400 text-sm">—</span>
        )}
      </td>

      {/* Remaining Stops */}
      <td className="px-4 py-3">
        {driver.remainingStops > 0 ? (
          <span className="text-slate-900 text-sm">{driver.remainingStops} stops</span>
        ) : (
          <span className="text-slate-400 text-sm">—</span>
        )}
      </td>

      {/* Shift Time */}
      <td className="px-4 py-3">
        <span className={`text-sm ${getShiftTimeColor(driver.remainingShiftMinutes)}`}>
          {formatShiftTime(driver.remainingShiftMinutes)}
        </span>
      </td>

      {/* Capacity */}
      <td className="px-4 py-3">
        {getCapacityBadge()}
      </td>

      {/* Risk */}
      <td className="px-4 py-3">
        {getRiskBadge()}
      </td>

      {/* Feasibility */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            {getFeasibilityIcon(driver.feasibility.canReassign, driver.feasibility.reasons.reassign, 'reassign')}
            <span className="text-xs text-slate-500 mt-0.5">Reassign</span>
          </div>
          <div className="flex flex-col items-center">
            {getFeasibilityIcon(driver.feasibility.canRescue, driver.feasibility.reasons.rescue, 'rescue')}
            <span className="text-xs text-slate-500 mt-0.5">Rescue</span>
          </div>
          <div className="flex flex-col items-center">
            {getFeasibilityIcon(driver.feasibility.canLoadTransfer, driver.feasibility.reasons.loadTransfer, 'transfer')}
            <span className="text-xs text-slate-500 mt-0.5">Transfer</span>
          </div>
        </div>
      </td>

      {/* Last Signal */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className={`w-3 h-3 ${
              driver.lastSignalStatus === 'active' ? 'text-green-600' : 'text-slate-400'
            }`} />
            <span className={`text-xs ${
              driver.lastSignalStatus === 'active' ? 'text-slate-700' : 'text-slate-500'
            }`}>
              {driver.lastSignalTime}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </td>
    </tr>
  );
}
