import { 
  User, 
  MapPin, 
  Clock, 
  Package, 
  Radio,
  AlertTriangle,
  Battery
} from 'lucide-react';

interface DriverContextPanelProps {
  driverName: string;
  driverStatus: 'On Route' | 'Delayed' | 'Offline';
  lastLocation: string;
  lastLocationTime: string;
  remainingCapacity: string;
  shiftTimeRemaining: number; // minutes
}

export function DriverContextPanel({
  driverName,
  driverStatus,
  lastLocation,
  lastLocationTime,
  remainingCapacity,
  shiftTimeRemaining
}: DriverContextPanelProps) {
  const getStatusBadge = () => {
    switch (driverStatus) {
      case 'On Route':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-200">
            <Radio className="w-4 h-4" />
            <span className="text-sm">On Route</span>
          </span>
        );
      case 'Delayed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg border border-amber-200">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Delayed</span>
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg border border-red-200">
            <Radio className="w-4 h-4" />
            <span className="text-sm">Offline</span>
          </span>
        );
    }
  };

  const formatTimeRemaining = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const isShiftLimitClose = shiftTimeRemaining < 90; // Less than 1.5 hours

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="text-slate-900">Driver Context</h3>
        <p className="text-slate-600 text-sm mt-0.5">
          Real-time driver status and capacity
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Driver Info */}
        <div>
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <User className="w-4 h-4" />
            <span>Driver</span>
          </div>
          <div className="text-slate-900">{driverName}</div>
        </div>

        {/* Current Status */}
        <div>
          <div className="text-slate-600 text-sm mb-2">Current Status</div>
          <div>{getStatusBadge()}</div>
        </div>

        {/* Last Known Location */}
        <div>
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>Last Known Location</span>
          </div>
          <div className="text-slate-900 text-sm mb-1">{lastLocation}</div>
          <div className="text-slate-500 text-xs">Updated {lastLocationTime}</div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200" />

        {/* Remaining Capacity */}
        <div>
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <Package className="w-4 h-4" />
            <span>Remaining Capacity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: '40%' }}
              />
            </div>
            <span className="text-slate-900 text-sm">{remainingCapacity}</span>
          </div>
        </div>

        {/* Shift Time Remaining */}
        <div>
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <Clock className="w-4 h-4" />
            <span>Shift Time Remaining</span>
          </div>
          <div className={`flex items-center gap-2 ${isShiftLimitClose ? 'text-amber-700' : 'text-slate-900'}`}>
            <Battery className={`w-5 h-5 ${isShiftLimitClose ? 'text-amber-600' : 'text-slate-600'}`} />
            <span className="text-lg">{formatTimeRemaining(shiftTimeRemaining)}</span>
          </div>
          {isShiftLimitClose && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-700 text-xs">
                Approaching shift limit. Monitor remaining stops and consider recovery options.
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200" />

        {/* Performance Indicators */}
        <div>
          <div className="text-slate-600 text-sm mb-3">Today's Performance</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Completed Stops</span>
              <span className="text-slate-900">15 / 23</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Success Rate</span>
              <span className="text-green-700">93.3%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Avg. Stop Time</span>
              <span className="text-slate-900">8.5 min</span>
            </div>
          </div>
        </div>

        {/* Communication Status */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-2">
            <Radio className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-slate-900 text-sm">Device Connected</div>
              <div className="text-slate-600 text-xs mt-0.5">Last sync: Just now</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-3">
            GPS tracking and communication systems are functioning normally
          </div>
        </div>
      </div>
    </div>
  );
}
