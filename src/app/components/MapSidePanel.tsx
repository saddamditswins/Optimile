import { 
  Clock, 
  AlertTriangle, 
  Star,
  ChevronRight,
  Radio,
  MapPin
} from 'lucide-react';

interface UpcomingStop {
  id: string;
  sequenceNumber: number;
  customerName: string;
  customerId: string;
  slaWindowEnd: string;
  slaCountdown: number; // minutes
  priority: 'VIP' | 'Standard';
  riskLevel?: 'Critical' | 'High' | 'Medium';
  isCurrent?: boolean;
}

interface MapSidePanelProps {
  routeId: string;
  onStopClick?: (stopId: string) => void;
}

export function MapSidePanel({ routeId, onStopClick }: MapSidePanelProps) {
  // Mock upcoming stops data
  const upcomingStops: UpcomingStop[] = [
    {
      id: '13',
      sequenceNumber: 13,
      customerName: 'Premium Office Supplies',
      customerId: 'C-5624',
      slaWindowEnd: '12:00 PM',
      slaCountdown: 8,
      priority: 'VIP',
      riskLevel: 'Critical',
      isCurrent: true
    },
    {
      id: '14',
      sequenceNumber: 14,
      customerName: 'City Center Retail',
      customerId: 'C-7823',
      slaWindowEnd: '12:30 PM',
      slaCountdown: 38,
      priority: 'Standard',
      riskLevel: 'High'
    },
    {
      id: '15',
      sequenceNumber: 15,
      customerName: 'Enterprise Solutions',
      customerId: 'C-4127',
      slaWindowEnd: '1:00 PM',
      slaCountdown: 68,
      priority: 'Standard',
      riskLevel: 'Medium'
    },
    {
      id: '16',
      sequenceNumber: 16,
      customerName: 'Global Tech Partners',
      customerId: 'C-2956',
      slaWindowEnd: '1:30 PM',
      slaCountdown: 98,
      priority: 'VIP'
    },
    {
      id: '17',
      sequenceNumber: 17,
      customerName: 'Metro Wholesale',
      customerId: 'C-6734',
      slaWindowEnd: '2:00 PM',
      slaCountdown: 128,
      priority: 'Standard'
    },
    {
      id: '18',
      sequenceNumber: 18,
      customerName: 'Summit Logistics',
      customerId: 'C-8145',
      slaWindowEnd: '2:30 PM',
      slaCountdown: 158,
      priority: 'Standard'
    }
  ];

  const formatCountdown = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getCountdownColor = (minutes: number, riskLevel?: string) => {
    if (riskLevel === 'Critical' || minutes < 15) {
      return 'text-red-700';
    }
    if (riskLevel === 'High' || minutes < 30) {
      return 'text-amber-700';
    }
    if (riskLevel === 'Medium') {
      return 'text-yellow-700';
    }
    return 'text-slate-700';
  };

  const getRiskBadge = (riskLevel?: string) => {
    if (!riskLevel) return null;

    switch (riskLevel) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
            <AlertTriangle className="w-3 h-3" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded">
            <AlertTriangle className="w-3 h-3" />
            High Risk
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
            Medium Risk
          </span>
        );
    }
  };

  return (
    <div className="w-96 bg-white border-l border-slate-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="text-slate-900">Upcoming Stops</h3>
        <p className="text-slate-600 text-sm mt-0.5">
          Next critical SLA deadlines
        </p>
      </div>

      {/* Stops List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-slate-200">
          {upcomingStops.map((stop) => (
            <div
              key={stop.id}
              className={`px-6 py-4 transition-colors cursor-pointer ${
                stop.isCurrent
                  ? 'bg-blue-50 border-l-4 border-blue-500'
                  : stop.riskLevel === 'Critical'
                  ? 'bg-red-50/30'
                  : stop.riskLevel === 'High'
                  ? 'bg-amber-50/30'
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => onStopClick?.(stop.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    stop.isCurrent
                      ? 'bg-blue-600 text-white'
                      : stop.riskLevel === 'Critical'
                      ? 'bg-red-500 text-white'
                      : stop.riskLevel === 'High'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {stop.sequenceNumber}
                  </div>
                  {stop.isCurrent && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded flex items-center gap-1">
                      <Radio className="w-3 h-3" />
                      Current
                    </span>
                  )}
                </div>
                {stop.priority === 'VIP' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                    <Star className="w-3 h-3" />
                    VIP
                  </span>
                )}
              </div>

              <div className="mb-2">
                <div className="text-slate-900 text-sm mb-0.5">{stop.customerName}</div>
                <div className="text-slate-600 text-xs">{stop.customerId}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">SLA by {stop.slaWindowEnd}</span>
                  </div>
                  <span className={`text-xs ${getCountdownColor(stop.slaCountdown, stop.riskLevel)}`}>
                    {formatCountdown(stop.slaCountdown)}
                  </span>
                </div>

                {stop.riskLevel && (
                  <div className="flex items-center justify-between">
                    {getRiskBadge(stop.riskLevel)}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-1 text-slate-500 text-xs mt-2">
                <span>View details</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Next Critical Stop:</span>
            <span className="text-red-700">8 min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Remaining Stops:</span>
            <span className="text-slate-900">8 stops</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">At Risk Stops:</span>
            <span className="text-amber-700">3 stops</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200">
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>Click any stop to view execution details</span>
          </div>
        </div>
      </div>
    </div>
  );
}
