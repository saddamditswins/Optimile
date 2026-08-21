import { Clock, Package, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';

interface AttentionItem {
  id: string;
  description: string;
  timeRemaining: number; // minutes
  entityId: string;
  entityType: 'route' | 'delivery';
  urgency: 'critical' | 'urgent' | 'moderate';
}

interface InProgressItem {
  id: string;
  description: string;
  status: string;
}

interface ResolvedItem {
  id: string;
  description: string;
}

interface OperationsDashboardProps {
  onNavigateToRiskFocus: () => void;
}

export function OperationsDashboard({ onNavigateToRiskFocus }: OperationsDashboardProps) {
  
  // Sample data - items that need attention
  const needsAttention: AttentionItem[] = [
    {
      id: 'attn-1',
      description: 'Route RT-2847 may miss its delivery window in 12 minutes',
      timeRemaining: 12,
      entityId: 'RT-2847',
      entityType: 'route',
      urgency: 'critical'
    },
    {
      id: 'attn-2',
      description: 'Customer unavailable for delivery DL-9234 (second attempt)',
      timeRemaining: 18,
      entityId: 'DL-9234',
      entityType: 'delivery',
      urgency: 'critical'
    },
    {
      id: 'attn-3',
      description: 'Vehicle overloaded on route RT-3901',
      timeRemaining: 25,
      entityId: 'RT-3901',
      entityType: 'route',
      urgency: 'urgent'
    },
    {
      id: 'attn-4',
      description: 'Delivery DL-8821 address needs verification',
      timeRemaining: 35,
      entityId: 'DL-8821',
      entityType: 'delivery',
      urgency: 'urgent'
    },
    {
      id: 'attn-5',
      description: 'Route RT-1122 driver reports traffic delay',
      timeRemaining: 42,
      entityId: 'RT-1122',
      entityType: 'route',
      urgency: 'moderate'
    }
  ];

  // KPI data
  const kpiData = [
    { label: 'Active deliveries today', value: 234 },
    { label: 'Deliveries needing attention', value: 12 },
    { label: 'Already delayed', value: 5 },
    { label: 'Decisions waiting on you', value: 3 }
  ];

  // Time-critical items (top 5 most urgent)
  const timeCritical = needsAttention.slice(0, 5);

  // In progress items
  const inProgress: InProgressItem[] = [
    {
      id: 'prog-1',
      description: 'Route RT-118 reroute approved',
      status: 'Waiting for driver confirmation'
    },
    {
      id: 'prog-2',
      description: 'Delivery DL-7234 escalation sent',
      status: 'Awaiting Ops Manager response'
    },
    {
      id: 'prog-3',
      description: 'Route RT-5566 recovery plan submitted',
      status: 'Driver en route to new stop'
    }
  ];

  // Recently resolved
  const recentlyResolved: ResolvedItem[] = [
    { id: 'res-1', description: 'Route RT-118 is back on track' },
    { id: 'res-2', description: 'Delivery DL-9021 completed after delay' },
    { id: 'res-3', description: 'Route RT-4455 traffic issue cleared' },
    { id: 'res-4', description: 'Delivery DL-8812 customer contact established' }
  ];

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'border-l-4 border-l-red-500 bg-red-50 hover:bg-red-100';
      case 'urgent':
        return 'border-l-4 border-l-orange-500 bg-orange-50 hover:bg-orange-100';
      default:
        return 'border-l-4 border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Dispatch Control</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Live execution oversight
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last updated: just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          
          {/* SECTION 1: NEEDS YOUR ATTENTION RIGHT NOW */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Needs Your Attention Right Now</h2>
              <p className="text-sm text-muted-foreground">Items requiring immediate action, ordered by urgency</p>
            </div>
            
            <div className="space-y-3">
              {needsAttention.length === 0 ? (
                <div className="bg-card border rounded-lg p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-muted-foreground">Everything is running smoothly</p>
                </div>
              ) : (
                needsAttention.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => console.log(`Navigate to ${item.entityType} ${item.entityId}`)}
                    className={`w-full text-left ${getUrgencyStyle(item.urgency)} rounded-lg transition-all`}
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-foreground font-medium">{item.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.timeRemaining} min remaining
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              {item.entityId}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* SECTION 2: TODAY AT A GLANCE */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Today at a Glance</h2>
              <p className="text-sm text-muted-foreground">Quick orientation on how the day is going</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiData.map((kpi, index) => (
                <button
                  key={index}
                  onClick={() => console.log(`Filter by: ${kpi.label}`)}
                  className="bg-card border rounded-lg p-6 text-left hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="text-3xl font-semibold text-foreground mb-2">
                    {kpi.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {kpi.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* WORKLOAD HEALTH (VISUAL SUMMARY) */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Workload Health</h2>
              <p className="text-sm text-muted-foreground">Shows the overall state of today's work at a glance</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              {/* Single Horizontal Bar */}
              <div className="flex h-12 rounded-lg overflow-hidden">
                {/* On Track Segment */}
                <div 
                  className="bg-green-100 flex items-center justify-center relative"
                  style={{ width: '65%' }}
                >
                  <span className="text-sm font-medium text-green-700">On Track</span>
                </div>
                
                {/* Needs Attention Segment */}
                <div 
                  className="bg-orange-100 flex items-center justify-center relative"
                  style={{ width: '25%' }}
                >
                  <span className="text-sm font-medium text-orange-700">Needs Attention</span>
                </div>
                
                {/* Already Delayed Segment */}
                <div 
                  className="bg-red-100 flex items-center justify-center relative"
                  style={{ width: '10%' }}
                >
                  <span className="text-xs font-medium text-red-700">Delayed</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: TIME IS RUNNING OUT */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Time is Running Out</h2>
              <p className="text-sm text-muted-foreground">Most urgent items by time remaining</p>
            </div>
            
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="divide-y">
                {timeCritical.map((item) => (
                  <div
                    key={item.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className={`w-5 h-5 ${
                        item.timeRemaining <= 15 ? 'text-red-500' : 'text-orange-500'
                      }`} />
                      <span className="font-medium text-foreground">{item.entityId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className={`font-semibold ${
                        item.timeRemaining <= 15 ? 'text-red-500' : 'text-orange-500'
                      }`}>
                        {item.timeRemaining} min remaining
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: IN PROGRESS */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">In Progress</h2>
              <p className="text-sm text-muted-foreground">What you're already handling</p>
            </div>
            
            <div className="space-y-3">
              {inProgress.length === 0 ? (
                <div className="bg-card border rounded-lg p-6 text-center">
                  <p className="text-muted-foreground text-sm">No actions currently in progress</p>
                </div>
              ) : (
                inProgress.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border rounded-lg px-6 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.status}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SECTION 5: RECENTLY RESOLVED */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recently Resolved</h2>
              <p className="text-sm text-muted-foreground">Issues resolved in the last hour</p>
            </div>
            
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="divide-y">
                {recentlyResolved.length === 0 ? (
                  <div className="px-6 py-4 text-center">
                    <p className="text-muted-foreground text-sm">No recent resolutions</p>
                  </div>
                ) : (
                  recentlyResolved.map((item) => (
                    <div
                      key={item.id}
                      className="px-6 py-3 flex items-center gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item.description}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}