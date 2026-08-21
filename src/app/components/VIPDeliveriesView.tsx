import {
  Star,
  AlertTriangle,
  Clock,
  TrendingUp,
  Shield,
  Package,
  User,
  Route,
  Radio,
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertCircle,
  DollarSign,
  FileText,
  TrendingDown
} from 'lucide-react';

interface VIPDeliveriesViewProps {
  onSelectDelivery: (deliveryId: string) => void;
}

interface VIPDelivery {
  id: string;
  deliveryId: string;
  stopId: string;
  customerName: string;
  priorityLevel: 'vip' | 'high' | 'standard';
  priorityReason: string;
  slaWindowStart: string;
  slaWindowEnd: string;
  timeToBreachMinutes: number;
  executionStatus: 'pending' | 'in-progress' | 'delivered' | 'at-risk' | 'failed';
  assignedRoute: string;
  assignedDriver: string;
  driverName: string;
  currentDelay: number;
  riskLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
  riskDrivers: string[];
  actualETA: string;
  penaltyExposure?: string;
  contractValue?: string;
}

export function VIPDeliveriesView({ onSelectDelivery }: VIPDeliveriesViewProps) {
  // Mock VIP deliveries data
  const vipDeliveries: VIPDelivery[] = [
    {
      id: 'del-001',
      deliveryId: 'DEL-8472',
      stopId: 'ST-2847-08',
      customerName: 'Acme Corporation',
      priorityLevel: 'vip',
      priorityReason: 'VIP Account - Tier 1 Customer',
      slaWindowStart: '11:00 AM',
      slaWindowEnd: '12:00 PM',
      timeToBreachMinutes: 18,
      executionStatus: 'at-risk',
      assignedRoute: 'RT-2847',
      assignedDriver: 'DRV-247',
      driverName: 'Driver #247',
      currentDelay: 12,
      riskLevel: 'critical',
      riskDrivers: ['Route running 12 min behind schedule', 'Heavy traffic on corridor'],
      actualETA: '11:47 AM',
      penaltyExposure: '$2,500',
      contractValue: '$150K annual'
    },
    {
      id: 'del-002',
      deliveryId: 'DEL-8903',
      stopId: 'ST-3201-05',
      customerName: 'MegaCorp Industries',
      priorityLevel: 'vip',
      priorityReason: 'Contractual Commitment - SLA Penalty Clause',
      slaWindowStart: '10:30 AM',
      slaWindowEnd: '11:30 AM',
      timeToBreachMinutes: 48,
      executionStatus: 'in-progress',
      assignedRoute: 'RT-3201',
      assignedDriver: 'DRV-103',
      driverName: 'Driver #103',
      currentDelay: 5,
      riskLevel: 'medium',
      riskDrivers: ['Minor traffic delays', 'Approaching SLA window end'],
      actualETA: '11:15 AM',
      penaltyExposure: '$5,000',
      contractValue: '$500K annual'
    },
    {
      id: 'del-003',
      deliveryId: 'DEL-9124',
      stopId: 'ST-3445-12',
      customerName: 'Global Tech Partners',
      priorityLevel: 'high',
      priorityReason: 'High Revenue Account - Executive Visibility',
      slaWindowStart: '1:00 PM',
      slaWindowEnd: '2:00 PM',
      timeToBreachMinutes: 142,
      executionStatus: 'in-progress',
      assignedRoute: 'RT-3445',
      assignedDriver: 'DRV-198',
      driverName: 'Driver #198',
      currentDelay: 0,
      riskLevel: 'low',
      riskDrivers: [],
      actualETA: '1:25 PM',
      contractValue: '$280K annual'
    },
    {
      id: 'del-004',
      deliveryId: 'DEL-7653',
      stopId: 'ST-2901-03',
      customerName: 'Premier Healthcare Systems',
      priorityLevel: 'vip',
      priorityReason: 'Critical Medical Supplies - Regulatory Compliance',
      slaWindowStart: '9:00 AM',
      slaWindowEnd: '10:00 AM',
      timeToBreachMinutes: -15,
      executionStatus: 'failed',
      assignedRoute: 'RT-2901',
      assignedDriver: 'DRV-089',
      driverName: 'Driver #089',
      currentDelay: 22,
      riskLevel: 'critical',
      riskDrivers: ['SLA breach occurred', 'Vehicle breakdown', 'Awaiting recovery'],
      actualETA: 'N/A',
      penaltyExposure: '$10,000',
      contractValue: '$1.2M annual'
    },
    {
      id: 'del-005',
      deliveryId: 'DEL-8271',
      stopId: 'ST-3667-15',
      customerName: 'Luxury Retail Group',
      priorityLevel: 'vip',
      priorityReason: 'VIP Account - Brand Partnership',
      slaWindowStart: '2:00 PM',
      slaWindowEnd: '3:00 PM',
      timeToBreachMinutes: 205,
      executionStatus: 'pending',
      assignedRoute: 'RT-3667',
      assignedDriver: 'DRV-312',
      driverName: 'Driver #312',
      currentDelay: 0,
      riskLevel: 'none',
      riskDrivers: [],
      actualETA: '2:20 PM',
      contractValue: '$420K annual'
    },
    {
      id: 'del-006',
      deliveryId: 'DEL-9402',
      stopId: 'ST-4102-07',
      customerName: 'Enterprise Solutions Inc',
      priorityLevel: 'high',
      priorityReason: 'High Penalty Exposure - Financial Services',
      slaWindowStart: '12:00 PM',
      slaWindowEnd: '1:00 PM',
      timeToBreachMinutes: 75,
      executionStatus: 'in-progress',
      assignedRoute: 'RT-4102',
      assignedDriver: 'DRV-156',
      driverName: 'Driver #156',
      currentDelay: 3,
      riskLevel: 'low',
      riskDrivers: ['Minor delay from previous stop'],
      actualETA: '12:28 PM',
      penaltyExposure: '$3,000',
      contractValue: '$320K annual'
    }
  ];

  // Categorize deliveries for decision-first view
  // IMMEDIATE ACTION: Breached or will breach soon (< 60 minutes)
  const needsImmediateAction = vipDeliveries.filter(d => 
    d.timeToBreachMinutes < 60 && (d.executionStatus === 'failed' || d.executionStatus === 'at-risk' || d.riskLevel === 'critical' || d.riskLevel === 'high')
  ).sort((a, b) => a.timeToBreachMinutes - b.timeToBreachMinutes);

  // BEING MONITORED: On track or low risk
  const beingMonitored = vipDeliveries.filter(d => 
    d.timeToBreachMinutes >= 60 || d.riskLevel === 'none' || d.riskLevel === 'low'
  );

  // Calculate summary metrics
  const totalVIPDeliveries = vipDeliveries.length;
  const needingAttention = needsImmediateAction.length;

  const getSituationSummary = (delivery: VIPDelivery) => {
    if (delivery.timeToBreachMinutes < 0) {
      return `Delivery window missed ${Math.abs(delivery.timeToBreachMinutes)} minutes ago`;
    }
    if (delivery.timeToBreachMinutes < 30) {
      return `Will miss delivery window in ${delivery.timeToBreachMinutes} minutes`;
    }
    if (delivery.timeToBreachMinutes < 60) {
      return `At risk - ${delivery.timeToBreachMinutes} minutes until window closes`;
    }
    return `On track - ${delivery.timeToBreachMinutes} minutes remaining`;
  };

  const getTimeDisplay = (minutes: number) => {
    if (minutes < 0) {
      return (
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm font-semibold text-red-700">BREACHED</span>
          <span className="text-xs text-red-600">{Math.abs(minutes)}m ago</span>
        </div>
      );
    }
    if (minutes < 30) {
      return (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-red-600" />
          <span className="text-sm font-semibold text-red-700">{minutes}m remaining</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
      );
    }
    if (minutes < 60) {
      return (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-700">{minutes}m remaining</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-500" />
        <span className="text-sm text-slate-600">{minutes}m remaining</span>
      </div>
    );
  };

  const getPriorityIcon = (level: string) => {
    switch (level) {
      case 'vip':
        return <Star className="w-4 h-4 fill-purple-600 text-purple-600" />;
      case 'high':
        return <TrendingUp className="w-4 h-4 text-amber-600" />;
      default:
        return <Package className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
            <Radio className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'at-risk':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300">
            <AlertTriangle className="w-3 h-3" />
            At Risk
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            <CheckCircle className="w-3 h-3" />
            Delivered
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded border-2 border-red-400">
            <XCircle className="w-3 h-3" />
            SLA Breach
          </span>
        );
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-300 uppercase">
            <AlertCircle className="w-3 h-3" />
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded border border-amber-300 uppercase">
            <AlertTriangle className="w-3 h-3" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded uppercase">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded uppercase">
            Low
          </span>
        );
      case 'none':
        return (
          <span className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded uppercase">
            On Track
          </span>
        );
    }
  };

  const getRowBorderClass = (delivery: VIPDelivery) => {
    if (delivery.executionStatus === 'failed') {
      return 'border-l-4 border-l-red-500 bg-red-50';
    }
    if (delivery.riskLevel === 'critical') {
      return 'border-l-4 border-l-red-500 bg-red-50/50';
    }
    if (delivery.riskLevel === 'high') {
      return 'border-l-4 border-l-amber-500 bg-amber-50/50';
    }
    if (delivery.priorityLevel === 'vip') {
      return 'border-l-4 border-l-purple-400 bg-purple-50/30';
    }
    return 'border-l-4 border-l-transparent';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">VIP & High-Value Deliveries</h1>
              <p className="text-muted-foreground text-sm">
                Immediate visibility into contract-critical deliveries
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6 max-w-7xl">
        
        {/* SECTION A: VIPs NEEDING IMMEDIATE ACTION (PRIMARY) */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">VIPs Needing Immediate Action</h2>
            <p className="text-sm text-muted-foreground">Deliveries requiring dispatcher decision now</p>
          </div>

          {needsImmediateAction.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-medium">No VIP deliveries need immediate action</p>
              <p className="text-green-700 text-sm mt-1">All critical deliveries are on track</p>
            </div>
          ) : (
            <div className="space-y-3">
              {needsImmediateAction.map((delivery) => (
                <div
                  key={delivery.id}
                  onClick={() => onSelectDelivery(delivery.deliveryId)}
                  className={`${
                    delivery.timeToBreachMinutes < 0 
                      ? 'bg-red-50 border-2 border-red-400 hover:border-red-500' 
                      : delivery.timeToBreachMinutes < 30
                      ? 'bg-orange-50 border-2 border-orange-400 hover:border-orange-500'
                      : 'bg-amber-50 border-2 border-amber-300 hover:border-amber-400'
                  } rounded-lg p-5 cursor-pointer transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Delivery ID & Customer */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(delivery.priorityLevel)}
                          <span className="text-base font-semibold text-foreground">{delivery.deliveryId}</span>
                        </div>
                        <span className="text-slate-600">•</span>
                        <span className="text-base text-foreground">{delivery.customerName}</span>
                      </div>

                      {/* Situation Summary */}
                      <p className="text-base text-foreground mb-3">
                        {getSituationSummary(delivery)}
                      </p>

                      {/* Penalty exposure if exists */}
                      {delivery.penaltyExposure && (
                        <div className="flex items-center gap-2 text-sm text-red-700">
                          <DollarSign className="w-4 h-4" />
                          <span>Penalty exposure: {delivery.penaltyExposure}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      {/* Time Display */}
                      {getTimeDisplay(delivery.timeToBreachMinutes)}
                      
                      {/* Action Required Badge */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-slate-900 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-slate-900" />
                        <span className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                          Action Required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION C: ORIENTATION KPIs (SUPPORTING) */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-semibold text-foreground">{totalVIPDeliveries}</div>
                  <div className="text-sm text-muted-foreground">Active VIP deliveries</div>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <div className="text-2xl font-semibold text-foreground">{needingAttention}</div>
                  <div className="text-sm text-muted-foreground">VIP deliveries needing attention</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: VIPs BEING MONITORED (SECONDARY) */}
        {beingMonitored.length > 0 && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-foreground">VIPs Being Monitored</h2>
              <p className="text-sm text-muted-foreground">On track or under watch</p>
            </div>

            <div className="space-y-2">
              {beingMonitored.map((delivery) => (
                <div
                  key={delivery.id}
                  onClick={() => onSelectDelivery(delivery.deliveryId)}
                  className="bg-card border rounded-lg p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getPriorityIcon(delivery.priorityLevel)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">{delivery.deliveryId}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-sm text-foreground">{delivery.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {delivery.riskLevel === 'none' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                              <CheckCircle className="w-3 h-3" />
                              On track
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                              <Clock className="w-3 h-3" />
                              Being monitored
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Window: {delivery.slaWindowStart} - {delivery.slaWindowEnd}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}