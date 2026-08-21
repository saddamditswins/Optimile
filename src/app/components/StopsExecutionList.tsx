import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle,
  Star,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

interface Stop {
  id: string;
  sequenceNumber: number;
  customerId: string;
  customerName: string;
  address: string;
  slaWindowStart: string;
  slaWindowEnd: string;
  priority: 'VIP' | 'Standard';
  status: 'Completed' | 'Pending' | 'Failed';
  completedTime?: string;
  delayMinutes?: number;
  riskLevel?: 'Critical' | 'High' | 'Medium';
  riskContext?: string;
}

interface StopsExecutionListProps {
  routeId: string;
}

export function StopsExecutionList({ routeId }: StopsExecutionListProps) {
  const [expandedStop, setExpandedStop] = useState<string | null>(null);

  // Mock stops data
  const stops: Stop[] = [
    {
      id: '1',
      sequenceNumber: 1,
      customerId: 'C-8472',
      customerName: 'Acme Corp Distribution',
      address: '123 Main St, Downtown',
      slaWindowStart: '6:30 AM',
      slaWindowEnd: '8:00 AM',
      priority: 'Standard',
      status: 'Completed',
      completedTime: '6:45 AM'
    },
    {
      id: '2',
      sequenceNumber: 2,
      customerId: 'C-9215',
      customerName: 'Tech Solutions Inc',
      address: '456 Oak Ave, Business District',
      slaWindowStart: '7:00 AM',
      slaWindowEnd: '8:30 AM',
      priority: 'VIP',
      status: 'Completed',
      completedTime: '7:15 AM'
    },
    // ... more completed stops
    {
      id: '12',
      sequenceNumber: 12,
      customerId: 'C-3891',
      customerName: 'Downtown Market',
      address: '789 Commerce St, Central',
      slaWindowStart: '10:00 AM',
      slaWindowEnd: '11:00 AM',
      priority: 'Standard',
      status: 'Failed',
      completedTime: '10:25 AM',
      riskContext: 'Customer unavailable - attempted delivery at 10:25 AM'
    },
    {
      id: '13',
      sequenceNumber: 13,
      customerId: 'C-5624',
      customerName: 'Premium Office Supplies',
      address: '321 Market St, Financial District',
      slaWindowStart: '10:30 AM',
      slaWindowEnd: '12:00 PM',
      priority: 'VIP',
      status: 'Pending',
      delayMinutes: 22,
      riskLevel: 'Critical',
      riskContext: 'Current delay: 22 min. SLA breach expected in 8 minutes if not completed'
    },
    {
      id: '14',
      sequenceNumber: 14,
      customerId: 'C-7823',
      customerName: 'City Center Retail',
      address: '567 Broadway, Midtown',
      slaWindowStart: '11:00 AM',
      slaWindowEnd: '12:30 PM',
      priority: 'Standard',
      status: 'Pending',
      delayMinutes: 22,
      riskLevel: 'High',
      riskContext: 'Delayed due to upstream execution issues. Expected arrival: 11:52 AM'
    },
    {
      id: '15',
      sequenceNumber: 15,
      customerId: 'C-4127',
      customerName: 'Enterprise Solutions',
      address: '890 5th Ave, Uptown',
      slaWindowStart: '11:30 AM',
      slaWindowEnd: '1:00 PM',
      priority: 'Standard',
      status: 'Pending',
      delayMinutes: 18,
      riskLevel: 'Medium',
      riskContext: 'Within SLA window but buffer is reduced. Monitor for further delays'
    },
    {
      id: '16',
      sequenceNumber: 16,
      customerId: 'C-2956',
      customerName: 'Global Tech Partners',
      address: '234 Tech Park Dr, Innovation District',
      slaWindowStart: '12:00 PM',
      slaWindowEnd: '1:30 PM',
      priority: 'VIP',
      status: 'Pending',
      riskLevel: 'Medium'
    },
    {
      id: '17',
      sequenceNumber: 17,
      customerId: 'C-6734',
      customerName: 'Metro Wholesale',
      address: '678 Industrial Blvd, Warehouse Zone',
      slaWindowStart: '12:30 PM',
      slaWindowEnd: '2:00 PM',
      priority: 'Standard',
      status: 'Pending'
    },
    {
      id: '18',
      sequenceNumber: 18,
      customerId: 'C-8145',
      customerName: 'Summit Logistics',
      address: '901 Harbor Way, Port Area',
      slaWindowStart: '1:00 PM',
      slaWindowEnd: '2:30 PM',
      priority: 'Standard',
      status: 'Pending'
    }
  ];

  const getStatusIcon = (status: Stop['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-slate-400" />;
      case 'Failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: Stop['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            Pending
          </span>
        );
      case 'Failed':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
            Failed
          </span>
        );
    }
  };

  const getRiskBadge = (riskLevel?: Stop['riskLevel']) => {
    if (!riskLevel) return null;
    
    switch (riskLevel) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-200">
            <AlertTriangle className="w-3 h-3" />
            Critical Risk
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            High Risk
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded border border-yellow-200">
            <AlertTriangle className="w-3 h-3" />
            Medium Risk
          </span>
        );
    }
  };

  const toggleExpand = (stopId: string) => {
    setExpandedStop(expandedStop === stopId ? null : stopId);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-slate-900">Stops Execution</h3>
            <p className="text-slate-600 text-sm mt-0.5">
              All stops in execution sequence order
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-slate-600">11 Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">7 Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-slate-600">1 Failed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {stops.map((stop) => {
          const isExpanded = expandedStop === stop.id;
          const hasRisk = stop.riskLevel || stop.riskContext;

          return (
            <div 
              key={stop.id}
              className={`transition-colors ${
                stop.status === 'Failed' 
                  ? 'bg-red-50/30' 
                  : stop.riskLevel === 'Critical'
                  ? 'bg-red-50/20'
                  : stop.riskLevel === 'High'
                  ? 'bg-amber-50/20'
                  : ''
              }`}
            >
              <div className="px-6 py-4">
                <div className="flex items-start gap-4">
                  {/* Sequence Number */}
                  <div className="flex-shrink-0 w-12 pt-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      stop.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : stop.status === 'Failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {stop.sequenceNumber}
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className="flex-shrink-0 pt-1">
                    {getStatusIcon(stop.status)}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-slate-900">{stop.customerName}</h4>
                          {stop.priority === 'VIP' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                              <Star className="w-3 h-3" />
                              VIP
                            </span>
                          )}
                          {getStatusBadge(stop.status)}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span>{stop.customerId}</span>
                          <span>·</span>
                          <span>{stop.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* SLA Window and Risk Info */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          SLA: {stop.slaWindowStart} - {stop.slaWindowEnd}
                        </span>
                      </div>

                      {stop.completedTime && (
                        <div className="text-sm text-green-700">
                          Completed at {stop.completedTime}
                        </div>
                      )}

                      {stop.delayMinutes !== undefined && stop.delayMinutes > 0 && (
                        <div className="text-sm text-red-700">
                          +{stop.delayMinutes} min delay
                        </div>
                      )}

                      {getRiskBadge(stop.riskLevel)}

                      {hasRisk && (
                        <button
                          onClick={() => toggleExpand(stop.id)}
                          className="ml-auto flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Info className="w-4 h-4" />
                          <span>{isExpanded ? 'Hide' : 'Show'} details</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Expanded Risk Context */}
                    {isExpanded && stop.riskContext && (
                      <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700">{stop.riskContext}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
