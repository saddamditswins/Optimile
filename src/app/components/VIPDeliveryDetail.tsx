import { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  User, 
  Package,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Route as RouteIcon
} from 'lucide-react';

interface VIPDeliveryDetailProps {
  deliveryId: string;
  onBack: () => void;
}

export function VIPDeliveryDetail({ deliveryId, onBack }: VIPDeliveryDetailProps) {
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);

  // Mock delivery data (would come from props/API in real implementation)
  const delivery = {
    id: deliveryId,
    deliveryId: 'DEL-8472',
    customerName: 'Acme Corporation',
    
    // Decision layer data
    verdict: 'Will miss delivery window in ~18 minutes',
    timeRemaining: 18,
    isBreached: false,
    vipReason: 'Contract-critical',
    penaltyValue: '$2,500',
    
    // Validation layer data
    primaryCause: 'Traffic congestion on Highway 101',
    secondaryCauses: [
      'Previous stop took 8 minutes longer than planned',
      'Driver departed depot 5 minutes late'
    ],
    plannedETA: '11:30 AM',
    currentETA: '11:48 AM',
    netDelay: 18,
    routeId: 'RT-2847',
    stopPosition: '8 of 23',
    driverName: 'Michael Torres',
    driverId: 'DRV-247',
    
    // Evidence layer data
    deliveryWindow: '11:00 AM - 12:00 PM',
    address: '1234 Innovation Drive, San Francisco, CA 94105',
    contactName: 'John Smith',
    contactPhone: '(415) 555-0123',
    contactEmail: 'john.smith@acmecorp.com',
    accessRestrictions: 'Loading dock access only. Security clearance required.',
    executionTimeline: [
      { time: '08:15 AM', event: 'Route started from depot' },
      { time: '08:45 AM', event: 'Stop 1 completed' },
      { time: '09:30 AM', event: 'Stop 4 - delay reported (traffic)' },
      { time: '10:15 AM', event: 'Stop 7 completed (8 min over plan)' },
      { time: '10:47 AM', event: 'En route to current stop' }
    ]
  };

  const [causesExpanded, setCausesExpanded] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to VIP Deliveries</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{delivery.deliveryId}</h1>
              <p className="text-sm text-muted-foreground mt-1">{delivery.customerName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 max-w-5xl">
          
          {/* LAYER 1: DECISION (PRIMARY) */}
          <div className="mb-8">
            <div className={`rounded-lg p-6 ${
              delivery.isBreached 
                ? 'bg-red-100 border-2 border-red-500' 
                : 'bg-orange-100 border-2 border-orange-500'
            }`}>
              <div className="flex items-start gap-4">
                <AlertTriangle className={`w-8 h-8 flex-shrink-0 ${
                  delivery.isBreached ? 'text-red-700' : 'text-orange-700'
                }`} />
                <div className="flex-1">
                  <h2 className={`text-xl font-semibold mb-2 ${
                    delivery.isBreached ? 'text-red-900' : 'text-orange-900'
                  }`}>
                    {delivery.verdict}
                  </h2>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Clock className={delivery.isBreached ? 'w-5 h-5 text-red-700' : 'w-5 h-5 text-orange-700'} />
                      <span className={`font-medium ${
                        delivery.isBreached ? 'text-red-900' : 'text-orange-900'
                      }`}>
                        {delivery.isBreached 
                          ? `Breached ${Math.abs(delivery.timeRemaining)} minutes ago`
                          : `${delivery.timeRemaining} minutes remaining`
                        }
                      </span>
                    </div>
                    <div className="h-4 w-px bg-slate-300"></div>
                    <div className={`text-sm ${
                      delivery.isBreached ? 'text-red-800' : 'text-orange-800'
                    }`}>
                      <span className="font-medium">{delivery.vipReason}</span>
                      {delivery.penaltyValue && (
                        <span className="ml-2 opacity-80">• Penalty exposure: {delivery.penaltyValue}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 2: VALIDATION (SECONDARY) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Validation</h3>
            
            <div className="bg-card border rounded-lg divide-y">
              {/* Primary Cause */}
              <div className="p-5">
                <div className="text-sm text-muted-foreground mb-2">Primary Cause</div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-foreground font-medium">{delivery.primaryCause}</p>
                  <button
                    onClick={() => setCausesExpanded(!causesExpanded)}
                    className="flex items-center gap-1 text-sm text-primary hover:underline flex-shrink-0"
                  >
                    {causesExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Show all causes
                      </>
                    )}
                  </button>
                </div>
                
                {causesExpanded && delivery.secondaryCauses.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-muted">
                    <div className="text-xs text-muted-foreground mb-2">Contributing factors:</div>
                    <ul className="space-y-1">
                      {delivery.secondaryCauses.map((cause, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Execution Snapshot */}
              <div className="p-5">
                <div className="text-sm text-muted-foreground mb-3">Execution Snapshot</div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Planned ETA</div>
                    <div className="text-foreground font-medium">{delivery.plannedETA}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Current Expected ETA</div>
                    <div className="text-orange-700 font-medium">{delivery.currentETA}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Net Delay</div>
                    <div className="text-red-700 font-semibold">+{delivery.netDelay} minutes</div>
                  </div>
                </div>
              </div>

              {/* Route & Driver Summary */}
              <div className="p-5">
                <div className="text-sm text-muted-foreground mb-3">Route & Driver Summary</div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Route ID</div>
                    <div className="flex items-center gap-2">
                      <RouteIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium font-mono">{delivery.routeId}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Stop Position</div>
                    <div className="text-foreground font-medium">{delivery.stopPosition}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Driver</div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{delivery.driverName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 3: EVIDENCE (COLLAPSIBLE) */}
          <div className="mb-8">
            <button
              onClick={() => setEvidenceExpanded(!evidenceExpanded)}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h3 className="text-lg font-semibold text-foreground">Evidence & Full Context</h3>
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="text-sm">{evidenceExpanded ? 'Collapse' : 'Expand'}</span>
                {evidenceExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            {evidenceExpanded && (
              <div className="bg-card border rounded-lg divide-y">
                {/* Customer Details */}
                <div className="p-5">
                  <div className="text-sm font-medium text-foreground mb-3">Customer Details</div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Delivery Address</div>
                        <div className="text-sm text-foreground">{delivery.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Contact Person</div>
                        <div className="text-sm text-foreground">{delivery.contactName}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Phone</div>
                        <div className="text-sm text-foreground">{delivery.contactPhone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Email</div>
                        <div className="text-sm text-foreground">{delivery.contactEmail}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Access Restrictions */}
                <div className="p-5">
                  <div className="text-sm font-medium text-foreground mb-2">Access Restrictions</div>
                  <p className="text-sm text-muted-foreground">{delivery.accessRestrictions}</p>
                </div>

                {/* Execution Timeline */}
                <div className="p-5">
                  <div className="text-sm font-medium text-foreground mb-3">Execution Timeline</div>
                  <div className="space-y-3">
                    {delivery.executionTimeline.map((entry, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="text-xs text-muted-foreground w-20 flex-shrink-0 pt-0.5">
                          {entry.time}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                            <p className="text-sm text-foreground">{entry.event}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Window */}
                <div className="p-5">
                  <div className="text-sm font-medium text-foreground mb-2">Delivery Window</div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{delivery.deliveryWindow}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FIXED ACTION AREA */}
      <div className="border-t bg-card">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between max-w-5xl">
            <div className="text-sm text-muted-foreground">
              Decision required for VIP delivery
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => console.log('Accept delay & notify')}
                className="px-6 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                Accept delay & notify customer
              </button>
              <button
                onClick={() => console.log('Escalate')}
                className="px-6 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                Escalate for approval
              </button>
              <button
                onClick={() => console.log('Reroute')}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Reroute delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
