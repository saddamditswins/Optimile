import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

interface ExecutionTimelineProps {
  completedStops: number;
  totalStops: number;
  delayMinutes: number;
}

export function ExecutionTimeline({ completedStops, totalStops, delayMinutes }: ExecutionTimelineProps) {
  const progressPercentage = (completedStops / totalStops) * 100;
  
  // Mock timeline events
  const timelineEvents = [
    { stopNumber: 1, time: '6:15 AM', type: 'completed', label: 'Route started' },
    { stopNumber: 5, time: '8:30 AM', type: 'completed', label: 'On schedule' },
    { stopNumber: 9, time: '9:45 AM', type: 'delay', label: 'Delay started', delayMinutes: 8, reason: 'Traffic congestion on Highway 101' },
    { stopNumber: 12, time: '10:30 AM', type: 'exception', label: 'Customer unavailable', reason: 'Failed delivery attempt - customer not home' },
    { stopNumber: 15, time: '11:20 AM', type: 'current', label: 'Current position', delayMinutes: 22 },
    { stopNumber: 18, time: '12:15 PM', type: 'risk', label: 'Approaching SLA risk', plannedTime: '12:00 PM' },
    { stopNumber: 23, time: '1:45 PM', type: 'planned', label: 'Planned completion', plannedTime: '1:30 PM' }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-slate-900">Execution Timeline</h3>
            <p className="text-slate-600 text-sm mt-0.5">
              Planned vs actual route progression
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-slate-600 text-sm">On Track</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span className="text-slate-600 text-sm">Delay Point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-slate-600 text-sm">Exception</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Route Progress</span>
            <span className="text-sm text-slate-900">
              {completedStops} of {totalStops} stops ({Math.round(progressPercentage)}%)
            </span>
          </div>
          <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                delayMinutes > 15 ? 'bg-red-500' : delayMinutes > 0 ? 'bg-amber-500' : 'bg-green-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />

          {/* Events */}
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pl-12">
                {/* Marker */}
                <div className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  event.type === 'completed' 
                    ? 'bg-green-100 border-green-500' 
                    : event.type === 'delay'
                    ? 'bg-amber-100 border-amber-500'
                    : event.type === 'exception'
                    ? 'bg-red-100 border-red-500'
                    : event.type === 'current'
                    ? 'bg-blue-100 border-blue-500 animate-pulse'
                    : event.type === 'risk'
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-slate-50 border-slate-300'
                }`}>
                  {event.type === 'completed' && (
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  )}
                  {event.type === 'delay' && (
                    <TrendingDown className="w-4 h-4 text-amber-600" />
                  )}
                  {event.type === 'exception' && (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                  {event.type === 'current' && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  )}
                  {event.type === 'risk' && (
                    <Clock className="w-4 h-4 text-amber-600" />
                  )}
                  {event.type === 'planned' && (
                    <div className="w-3 h-3 border-2 border-slate-400 rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-6 ${event.type === 'current' ? 'border-l-2 border-blue-500 pl-4 -ml-1' : ''}`}>
                  <div className="flex flex-wrap items-start justify-between gap-y-1 mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${
                          event.type === 'current' ? 'text-blue-700' : 'text-slate-900'
                        }`}>
                          {event.label}
                        </span>
                        {event.type === 'current' && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                            NOW
                          </span>
                        )}
                      </div>
                      <div className="text-slate-600 text-xs mt-0.5">
                        Stop #{event.stopNumber} · {event.time}
                        {event.plannedTime && event.plannedTime !== event.time && (
                          <span className="text-amber-600 ml-2">
                            (Planned: {event.plannedTime})
                          </span>
                        )}
                      </div>
                    </div>
                    {event.delayMinutes !== undefined && event.delayMinutes > 0 && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
                        +{event.delayMinutes} min delay
                      </span>
                    )}
                  </div>
                  {event.reason && (
                    <p className="text-slate-600 text-sm mt-2 bg-slate-50 px-3 py-2 rounded-md border border-slate-200">
                      {event.reason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
