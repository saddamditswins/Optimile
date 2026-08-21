import { Star, AlertTriangle } from 'lucide-react';

export interface Stop {
  id: string;
  sequenceNumber: number;
  x: number;
  y: number;
  status: 'Completed' | 'Pending' | 'At Risk' | 'Failed';
  customerId: string;
  customerName: string;
  slaWindow: string;
  delay: number;
  isVIP?: boolean;
  riskNote?: string;
}

interface StopMarkerProps {
  stop: Stop;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export function StopMarker({ stop, isHovered, onHover, onLeave, onClick }: StopMarkerProps) {
  const getMarkerColor = () => {
    switch (stop.status) {
      case 'Completed':
        return 'bg-green-500 border-green-600';
      case 'Pending':
        return 'bg-slate-400 border-slate-500';
      case 'At Risk':
        return 'bg-amber-500 border-amber-600';
      case 'Failed':
        return 'bg-red-500 border-red-600';
    }
  };

  const getTextColor = () => {
    switch (stop.status) {
      case 'Completed':
        return 'text-green-700';
      case 'Pending':
        return 'text-slate-700';
      case 'At Risk':
        return 'text-amber-700';
      case 'Failed':
        return 'text-red-700';
    }
  };

  return (
    <div className="relative">
      {/* Marker */}
      <div
        className={`relative transition-all duration-200 cursor-pointer ${
          isHovered ? 'scale-125 z-50' : 'scale-100'
        }`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {/* Outer glow on hover */}
        {isHovered && (
          <div className={`absolute inset-0 rounded-full ${getMarkerColor()} opacity-30 blur-md`} />
        )}
        
        {/* Main marker */}
        <div className={`
          relative w-8 h-8 rounded-full border-2 ${getMarkerColor()}
          flex items-center justify-center shadow-lg
          transition-transform duration-200
        `}>
          <span className="text-white text-xs">{stop.sequenceNumber}</span>
        </div>

        {/* VIP indicator */}
        {stop.isVIP && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
            <Star className="w-2.5 h-2.5 text-white" />
          </div>
        )}

        {/* Risk indicator */}
        {(stop.status === 'At Risk' || stop.status === 'Failed') && (
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${
            stop.status === 'Failed' ? 'bg-red-600' : 'bg-amber-600'
          } rounded-full border-2 border-white flex items-center justify-center`}>
            <AlertTriangle className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-3 z-50 pointer-events-none">
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
          
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs ${getMarkerColor()} text-white`}>
                    Stop #{stop.sequenceNumber}
                  </span>
                  {stop.isVIP && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      VIP
                    </span>
                  )}
                </div>
                <div className="text-slate-900 text-sm">{stop.customerName}</div>
                <div className="text-slate-600 text-xs">{stop.customerId}</div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">SLA Window:</span>
                <span className="text-slate-900">{stop.slaWindow}</span>
              </div>
              
              {stop.delay > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Current Delay:</span>
                  <span className={getTextColor()}>+{stop.delay} min</span>
                </div>
              )}

              {stop.riskNote && (
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
                  <div className="flex items-start gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-700">{stop.riskNote}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-500 pt-1 border-t border-slate-200">
              Click to view in Route Detail
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
