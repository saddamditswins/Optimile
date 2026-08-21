import { 
  ArrowLeft,
  Clock,
  Radio,
  AlertTriangle,
  Coffee,
  Lock,
  Calendar,
  TrendingUp,
  Info,
  Package,
  Zap
} from 'lucide-react';
import { TimelineBlock } from './TimelineBlock';
import { CapacityIndicator } from './CapacityIndicator';

interface DriverAvailabilityTimelineProps {
  driverId: string;
  onBack: () => void;
}

export function DriverAvailabilityTimeline({ driverId, onBack }: DriverAvailabilityTimelineProps) {
  // Mock driver data
  const driverData = {
    id: '1',
    driverId: 'DRV-247',
    driverName: 'Driver #247',
    shiftStart: '6:00 AM',
    shiftEnd: '2:00 PM',
    shiftStartMinutes: 360, // 6:00 AM = 360 minutes from midnight
    shiftEndMinutes: 840, // 2:00 PM = 840 minutes from midnight
    currentTimeMinutes: 671, // 11:11 AM
    depot: 'North Station'
  };

  // Timeline blocks representing stops, breaks, etc.
  const timelineBlocks = [
    {
      id: '1',
      type: 'locked-stop' as const,
      label: 'Stops 1-5',
      startMinutes: 360,
      endMinutes: 450,
      status: 'completed' as const,
      stopsCount: 5,
      capacityUsed: 12
    },
    {
      id: '2',
      type: 'locked-stop' as const,
      label: 'Stops 6-10',
      startMinutes: 450,
      endMinutes: 570,
      status: 'completed' as const,
      stopsCount: 5,
      capacityUsed: 10
    },
    {
      id: '3',
      type: 'break' as const,
      label: 'Required Break',
      startMinutes: 570,
      endMinutes: 600,
      status: 'completed' as const,
      stopsCount: 0,
      capacityUsed: 0
    },
    {
      id: '4',
      type: 'locked-stop' as const,
      label: 'Stops 11-15',
      startMinutes: 600,
      endMinutes: 680,
      status: 'in-progress' as const,
      stopsCount: 5,
      capacityUsed: 8
    },
    {
      id: '5',
      type: 'flexible-window' as const,
      label: 'Stops 16-20',
      startMinutes: 680,
      endMinutes: 750,
      status: 'pending' as const,
      stopsCount: 5,
      capacityUsed: 9,
      riskLevel: 'medium' as const
    },
    {
      id: '6',
      type: 'flexible-window' as const,
      label: 'Stops 21-23',
      startMinutes: 750,
      endMinutes: 820,
      status: 'pending' as const,
      stopsCount: 3,
      capacityUsed: 6,
      riskLevel: 'high' as const
    },
    {
      id: '7',
      type: 'buffer' as const,
      label: 'Return to Depot',
      startMinutes: 820,
      endMinutes: 840,
      status: 'pending' as const,
      stopsCount: 0,
      capacityUsed: 0
    }
  ];

  // Capacity over time
  const capacityData = {
    total: 45,
    timeline: [
      { timeMinutes: 360, used: 0, remaining: 45 },
      { timeMinutes: 450, used: 12, remaining: 33 },
      { timeMinutes: 570, used: 22, remaining: 23 },
      { timeMinutes: 680, used: 30, remaining: 15 },
      { timeMinutes: 750, used: 39, remaining: 6 },
      { timeMinutes: 820, used: 45, remaining: 0 },
      { timeMinutes: 840, used: 45, remaining: 0 }
    ]
  };

  // Predictive signals
  const predictions = [
    {
      id: 'availability',
      timeMinutes: 750,
      type: 'availability' as const,
      label: 'Potential Availability Window',
      description: 'Driver may have 20-30 min window if current pace continues',
      confidence: 'medium' as const
    },
    {
      id: 'capacity-exhaustion',
      timeMinutes: 820,
      type: 'risk' as const,
      label: 'Capacity Exhaustion Expected',
      description: 'Vehicle capacity projected to be fully utilized',
      confidence: 'high' as const
    },
    {
      id: 'shift-overrun',
      timeMinutes: 840,
      type: 'risk' as const,
      label: 'Shift End Risk Point',
      description: 'Adding work may cause shift overrun - requires careful evaluation',
      confidence: 'high' as const
    }
  ];

  // Calculate timeline dimensions
  const totalShiftMinutes = driverData.shiftEndMinutes - driverData.shiftStartMinutes;
  const timelineWidthPercent = 100;

  const getTimePosition = (minutes: number) => {
    return ((minutes - driverData.shiftStartMinutes) / totalShiftMinutes) * timelineWidthPercent;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const currentTimePosition = getTimePosition(driverData.currentTimeMinutes);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-slate-900">Availability & Capacity Timeline</h1>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded border border-purple-200">
                    PROJECTION VIEW
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  {driverData.driverName} ({driverData.driverId}) · Time-based feasibility analysis
                </p>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="relative">
                <Radio className="w-4 h-4 text-green-600" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="text-green-700 text-sm">Live · Updated moments ago</span>
            </div>
          </div>

          {/* Context Bar */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">Shift: {driverData.shiftStart} - {driverData.shiftEnd}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">Wednesday, Dec 31, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">Capacity: {capacityData.timeline[capacityData.timeline.length - 1].used} / {capacityData.total} packages</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Timeline Legend */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-slate-300 rounded border border-slate-400" />
                  <span className="text-slate-600">Completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-blue-500 rounded border border-blue-600" />
                  <span className="text-slate-600">In Progress</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-blue-100 rounded border border-blue-300" />
                  <span className="text-slate-600">Locked Stops</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-purple-100 rounded border border-purple-300 border-dashed" />
                  <span className="text-slate-600">Flexible Window</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-green-100 rounded border border-green-300" />
                  <span className="text-slate-600">Break Period</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-slate-100 rounded border border-slate-300" />
                  <span className="text-slate-600">Buffer</span>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                All times and projections are estimates based on current execution pace
              </div>
            </div>
          </div>

          {/* Timeline Canvas */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-slate-900 mb-1">Shift Timeline</h2>
              <p className="text-slate-600 text-sm">Execution blocks and commitment windows</p>
            </div>

            {/* Time Scale */}
            <div className="relative mb-2">
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>{driverData.shiftStart}</span>
                <span>8:00 AM</span>
                <span>10:00 AM</span>
                <span>12:00 PM</span>
                <span>{driverData.shiftEnd}</span>
              </div>
              <div className="h-px bg-slate-200" />
            </div>

            {/* Timeline Blocks Container */}
            <div className="relative h-24 bg-slate-50 rounded-lg border border-slate-200 mb-6">
              {/* Current Time Marker */}
              <div
                className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
                style={{ left: `${currentTimePosition}%` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="bg-red-500 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap">
                    Current: {formatTime(driverData.currentTimeMinutes)}
                  </div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500" />
                </div>
              </div>

              {/* Timeline Blocks */}
              {timelineBlocks.map((block) => (
                <TimelineBlock
                  key={block.id}
                  block={block}
                  startPosition={getTimePosition(block.startMinutes)}
                  endPosition={getTimePosition(block.endMinutes)}
                />
              ))}
            </div>

            {/* Predictive Signals Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-purple-600" />
                <h3 className="text-slate-900 text-sm">Predictive Signals</h3>
                <span className="text-xs text-slate-500">Based on current execution pace</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {predictions.map((prediction) => (
                  <div
                    key={prediction.id}
                    className={`relative p-3 rounded-lg border ${
                      prediction.type === 'risk' 
                        ? 'bg-amber-50 border-amber-200' 
                        : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Time indicator */}
                      <div className={`flex-shrink-0 px-2 py-1 rounded text-xs ${
                        prediction.type === 'risk'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-green-200 text-green-900'
                      }`}>
                        {formatTime(prediction.timeMinutes)}
                      </div>
                      
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        {prediction.type === 'risk' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        ) : (
                          <Zap className="w-4 h-4 text-green-600" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className={`text-sm mb-1 ${
                          prediction.type === 'risk' ? 'text-amber-900' : 'text-green-900'
                        }`}>
                          {prediction.label}
                        </div>
                        <div className={`text-xs ${
                          prediction.type === 'risk' ? 'text-amber-700' : 'text-green-700'
                        }`}>
                          {prediction.description}
                        </div>
                      </div>

                      {/* Confidence badge */}
                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 rounded text-xs ${
                          prediction.confidence === 'high'
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}>
                          {prediction.confidence === 'high' ? 'High confidence' : 'Medium confidence'}
                        </span>
                      </div>
                    </div>

                    {/* Visual marker showing position in timeline */}
                    <div className="absolute -top-3 bg-white px-2 py-0.5 rounded text-xs text-slate-600 border border-slate-300">
                      ↑ Timeline position
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Capacity Burn Indicators */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-slate-900 mb-1">Capacity Consumption Over Time</h2>
              <p className="text-slate-600 text-sm">Vehicle capacity utilization projection</p>
            </div>

            <CapacityIndicator 
              capacityData={capacityData}
              getTimePosition={getTimePosition}
              formatTime={formatTime}
              currentTimeMinutes={driverData.currentTimeMinutes}
            />
          </div>

          {/* Context Notes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-blue-900 text-sm mb-1">Projection Methodology</div>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    This timeline represents projected execution based on current pace, historical patterns, and known constraints. 
                    Actual execution may vary due to traffic, customer availability, or operational changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-amber-900 text-sm mb-1">Adding Work Considerations</div>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Before adding work to this driver, evaluate: shift time remaining, capacity headroom, zone compatibility, 
                    and current execution risk. Additional stops may create downstream failures if constraints are not respected.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-purple-900 text-sm mb-1">Flexible Windows Explained</div>
                  <p className="text-purple-700 text-sm leading-relaxed">
                    Stops marked as "Flexible Windows" have broader delivery time ranges and may be adjusted or reassigned 
                    without significant customer impact. These represent potential optimization opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 text-sm mb-1">Read-Only Analysis</div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    This screen provides analytical context only. All assignment and recovery actions must be executed 
                    through the designated Recovery module with proper validation and approval workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-slate-900">Available Time Window</div>
              </div>
              <div className="text-2xl text-slate-900 mb-1">~60-90 min</div>
              <div className="text-xs text-slate-600">
                Estimated window if current pace holds
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-slate-900">Capacity Headroom</div>
              </div>
              <div className="text-2xl text-slate-900 mb-1">6 packages</div>
              <div className="text-xs text-slate-600">
                Available capacity for additional work
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-100 rounded">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-slate-900">Risk Assessment</div>
              </div>
              <div className="text-2xl text-amber-700 mb-1">Medium</div>
              <div className="text-xs text-slate-600">
                Moderate risk of shift overrun if work added
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}