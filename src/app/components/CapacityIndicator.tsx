import { AlertTriangle, TrendingUp } from 'lucide-react';

interface CapacityDataPoint {
  timeMinutes: number;
  used: number;
  remaining: number;
}

interface CapacityData {
  total: number;
  timeline: CapacityDataPoint[];
}

interface CapacityIndicatorProps {
  capacityData: CapacityData;
  getTimePosition: (minutes: number) => number;
  formatTime: (minutes: number) => string;
  currentTimeMinutes: number;
}

export function CapacityIndicator({ 
  capacityData, 
  getTimePosition, 
  formatTime,
  currentTimeMinutes 
}: CapacityIndicatorProps) {
  const maxCapacity = capacityData.total;

  // Create SVG path for capacity line
  const createCapacityPath = () => {
    const points = capacityData.timeline.map((point) => {
      const x = getTimePosition(point.timeMinutes);
      const y = 100 - (point.used / maxCapacity) * 100;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  // Create area fill path
  const createAreaPath = () => {
    const points = capacityData.timeline.map((point) => {
      const x = getTimePosition(point.timeMinutes);
      const y = 100 - (point.used / maxCapacity) * 100;
      return `${x},${y}`;
    });
    const firstX = getTimePosition(capacityData.timeline[0].timeMinutes);
    const lastX = getTimePosition(capacityData.timeline[capacityData.timeline.length - 1].timeMinutes);
    return `M ${firstX},100 L ${points.join(' L ')} L ${lastX},100 Z`;
  };

  // Find warning zones (>80% capacity)
  const warningZones = capacityData.timeline.reduce((zones: any[], point, index) => {
    const utilizationPercent = (point.used / maxCapacity) * 100;
    if (utilizationPercent > 80 && index < capacityData.timeline.length - 1) {
      zones.push({
        start: point.timeMinutes,
        end: capacityData.timeline[index + 1].timeMinutes,
        utilization: utilizationPercent
      });
    }
    return zones;
  }, []);

  return (
    <div>
      {/* Capacity Graph */}
      <div className="relative h-48 bg-slate-50 rounded-lg border border-slate-200 mb-4">
        {/* Y-axis labels */}
        <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-600 py-2">
          <span>{maxCapacity}</span>
          <span>{Math.floor(maxCapacity * 0.75)}</span>
          <span>{Math.floor(maxCapacity * 0.5)}</span>
          <span>{Math.floor(maxCapacity * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Graph area */}
        <div className="absolute left-12 right-4 top-2 bottom-2">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            {/* Grid lines */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="#e2e8f0" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#e2e8f0" strokeWidth="0.5" />
            
            {/* Warning threshold line (80%) */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2,2" />
            
            {/* Area fill */}
            <path
              d={createAreaPath()}
              fill="url(#capacityGradient)"
              opacity="0.3"
            />
            
            {/* Capacity line */}
            <path
              d={createCapacityPath()}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {capacityData.timeline.map((point, index) => {
              const x = getTimePosition(point.timeMinutes);
              const y = 100 - (point.used / maxCapacity) * 100;
              const isWarning = (point.used / maxCapacity) * 100 > 80;
              const isCurrent = Math.abs(point.timeMinutes - currentTimeMinutes) < 30;
              
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isCurrent ? "2" : "1.5"}
                    fill={isWarning ? "#f59e0b" : "#3b82f6"}
                    className={isCurrent ? "animate-pulse" : ""}
                  />
                  {/* Hover tooltip would go here in a real implementation */}
                </g>
              );
            })}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="capacityGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Warning zone overlays */}
        {warningZones.map((zone, index) => (
          <div
            key={index}
            className="absolute top-0 bottom-0 bg-amber-200 opacity-20 left-12 pointer-events-none"
            style={{
              left: `calc(${getTimePosition(zone.start)}% + 3rem)`,
              width: `calc(${getTimePosition(zone.end) - getTimePosition(zone.start)}%)`
            }}
          />
        ))}
      </div>

      {/* Capacity milestones */}
      <div className="space-y-2">
        {capacityData.timeline.map((point, index) => {
          const utilizationPercent = (point.used / maxCapacity) * 100;
          const isWarning = utilizationPercent > 80;
          const isExhausted = point.remaining === 0;
          
          if (index === 0 || index === capacityData.timeline.length - 1 || isWarning || isExhausted) {
            return (
              <div 
                key={index} 
                className={`flex items-center justify-between p-2 rounded ${
                  isExhausted ? 'bg-red-50 border border-red-200' :
                  isWarning ? 'bg-amber-50 border border-amber-200' :
                  'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {(isWarning || isExhausted) && (
                    <AlertTriangle className={`w-4 h-4 ${
                      isExhausted ? 'text-red-600' : 'text-amber-600'
                    }`} />
                  )}
                  <div>
                    <div className="text-sm text-slate-900">{formatTime(point.timeMinutes)}</div>
                    <div className="text-xs text-slate-600">
                      {point.used} / {maxCapacity} packages used
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${
                    isExhausted ? 'text-red-700' :
                    isWarning ? 'text-amber-700' :
                    'text-slate-900'
                  }`}>
                    {point.remaining} remaining
                  </div>
                  <div className="text-xs text-slate-600">
                    {utilizationPercent.toFixed(0)}% utilized
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Warning Summary */}
      {warningZones.length > 0 && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-amber-900 text-sm mb-1">Capacity Warning</div>
              <p className="text-amber-700 text-xs">
                Vehicle capacity exceeds 80% threshold at {warningZones.length} point(s) in the timeline. 
                Additional package assignments may cause capacity overrun and require load transfer.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
