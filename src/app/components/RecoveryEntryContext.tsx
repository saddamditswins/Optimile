import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  Route,
  Package,
  User,
  Shield,
  DollarSign,
  TrendingUp,
  Navigation,
  Info,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface RecoveryEntryContextProps {
  recoveryId: string;
  triggerSource: 'alert' | 'route' | 'delivery';
  onBack: () => void;
  onDraftRecoveryPlan: () => void;
}

type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export function RecoveryEntryContext({
  recoveryId,
  triggerSource,
  onBack,
  onDraftRecoveryPlan
}: RecoveryEntryContextProps) {
  // Mock recovery context data
  const recoveryContext = {
    recoveryId: 'REC-2847-001',
    triggerSource: triggerSource,
    triggerSourceId: triggerSource === 'alert' ? 'ALT-2847-001' : triggerSource === 'route' ? 'RT-2847' : 'DEL-8472',
    severity: 'critical' as SeverityLevel,
    timeToBreachMinutes: 18,
    createdAt: '10:50 AM',
    
    // Layer 1: Recovery Verdict
    recoveryVerdict: 'Immediate recovery required: VIP delivery will breach SLA in ~18 minutes',
    
    // Layer 2: Blast Radius
    blastRadius: {
      affectedRoutes: {
        count: 1,
        keyRoute: 'RT-2847'
      },
      affectedDeliveries: {
        total: 2,
        vipCount: 1,
        details: [
          {
            id: 'DEL-8472',
            customerName: 'Acme Corporation',
            isVIP: true,
            penaltyExposure: '$2,500'
          },
          {
            id: 'DEL-8491',
            customerName: 'Tech Solutions Ltd',
            isVIP: false,
            penaltyExposure: '$1,200'
          }
        ]
      },
      affectedDrivers: 1
    },
    
    // Layer 3: Constraints
    constraints: {
      policyConstraints: [
        'VIP deliveries require management approval for recovery actions',
        'Driver reassignments must respect Hours of Service regulations'
      ],
      regulatoryConstraints: [
        'Driver must maintain required break periods (10-hour rest after 14-hour duty)'
      ],
      operationalLimits: [
        'Route modifications limited to +/- 3 stops without operations manager approval'
      ]
    },
    
    // Layer 4: Root Cause
    rootCause: {
      primaryCause: 'Heavy traffic congestion on Market St corridor',
      secondaryFactor: 'Previous stop delays accumulated 12 minutes',
      impact: 'Route running 12 minutes behind schedule'
    },
    
    // Evidence
    guardrails: {
      escalationRequirements: {
        required: true,
        reason: 'VIP customer impact with penalty exposure > $2,000',
        escalateTo: 'Operations Manager',
        timeframe: 'Before execution'
      }
    }
  };

  const getTriggerSourceLabel = () => {
    switch (triggerSource) {
      case 'alert':
        return 'Alert-Triggered Recovery';
      case 'route':
        return 'Route-Triggered Recovery';
      case 'delivery':
        return 'Delivery-Triggered Recovery';
    }
  };

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
            <span className="text-sm">Back to Alerts</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Recovery Entry Context</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Review complete context before drafting recovery plan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 max-w-5xl">
          
          {/* LAYER 0: ENTRY CONTEXT (ORIENTATION) */}
          <div className="mb-8 bg-card border rounded-lg p-5">
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Recovery Type</div>
                <div className="text-foreground font-medium">{getTriggerSourceLabel()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Trigger Reference</div>
                <div className="text-foreground font-medium font-mono">{recoveryContext.triggerSourceId}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Recovery ID</div>
                <div className="text-foreground font-medium font-mono">{recoveryContext.recoveryId}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Detected At</div>
                <div className="text-foreground font-medium">{recoveryContext.createdAt}</div>
              </div>
            </div>
          </div>

          {/* LAYER 1: RECOVERY VERDICT (PRIMARY FOCUS) */}
          <div className="mb-8">
            <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-orange-700 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-orange-900 mb-3">
                    {recoveryContext.recoveryVerdict}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-700" />
                      <span className="text-base font-medium text-orange-900">
                        {recoveryContext.timeToBreachMinutes} minutes remaining
                      </span>
                    </div>
                    <div className="h-4 w-px bg-orange-400"></div>
                    <span className="text-sm text-orange-800 uppercase font-medium tracking-wide">
                      Critical Severity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 2: BLAST RADIUS (IMPACT SUMMARY) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Blast Radius</h3>
            
            <div className="bg-card border rounded-lg divide-y">
              {/* Affected Routes */}
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <Route className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Affected Routes</div>
                    <div className="text-base text-foreground font-medium">
                      {recoveryContext.blastRadius.affectedRoutes.count} route ({recoveryContext.blastRadius.affectedRoutes.keyRoute})
                    </div>
                  </div>
                </div>
              </div>

              {/* Affected Deliveries */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-2">Affected Deliveries</div>
                    <div className="text-base text-foreground font-medium mb-3">
                      {recoveryContext.blastRadius.affectedDeliveries.total} deliveries 
                      ({recoveryContext.blastRadius.affectedDeliveries.vipCount} VIP)
                    </div>
                    <div className="space-y-2">
                      {recoveryContext.blastRadius.affectedDeliveries.details.map((delivery) => (
                        <div 
                          key={delivery.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            delivery.isVIP ? 'bg-purple-50 border border-purple-200' : 'bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground font-mono">{delivery.id}</span>
                            {delivery.isVIP && (
                              <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded">VIP</span>
                            )}
                            <span className="text-sm text-muted-foreground">• {delivery.customerName}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-red-700">
                            <DollarSign className="w-4 h-4" />
                            <span>{delivery.penaltyExposure}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Affected Drivers */}
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Affected Drivers</div>
                    <div className="text-base text-foreground font-medium">
                      {recoveryContext.blastRadius.affectedDrivers} driver
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 3: NON-NEGOTIABLE CONSTRAINTS (GUARDRAILS) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Non-Negotiable Constraints</h3>
            
            <div className="bg-card border rounded-lg divide-y">
              {/* Policy Constraints */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground mb-2">Policy Constraints</div>
                    <ul className="space-y-2">
                      {recoveryContext.constraints.policyConstraints.map((constraint, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-slate-400 mt-1">•</span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Regulatory Constraints */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground mb-2">Regulatory Constraints</div>
                    <ul className="space-y-2">
                      {recoveryContext.constraints.regulatoryConstraints.map((constraint, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-slate-400 mt-1">•</span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Operational Limits */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground mb-2">Operational Limits</div>
                    <ul className="space-y-2">
                      {recoveryContext.constraints.operationalLimits.map((limit, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-slate-400 mt-1">•</span>
                          <span>{limit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 4: ROOT CAUSE (WHY THIS HAPPENED) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Root Cause</h3>
            
            <div className="bg-card border rounded-lg p-5">
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">Primary Cause</div>
                <p className="text-base text-foreground font-medium">
                  {recoveryContext.rootCause.primaryCause}
                </p>
              </div>

              <div className="mb-4 pb-4 border-b">
                <div className="text-sm text-muted-foreground mb-2">Contributing Factor</div>
                <p className="text-sm text-foreground">
                  {recoveryContext.rootCause.secondaryFactor}
                </p>
              </div>

              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <TrendingUp className="w-4 h-4 text-amber-700 mt-0.5" />
                <div>
                  <div className="text-xs text-amber-700 font-medium mb-1">Impact</div>
                  <p className="text-sm text-amber-900">
                    {recoveryContext.rootCause.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Escalation Notice (if required) */}
          {recoveryContext.guardrails.escalationRequirements.required && (
            <div className="mb-8 p-5 bg-amber-50 border-2 border-amber-300 rounded-lg">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-amber-900 mb-2">Escalation Required</div>
                  <p className="text-sm text-amber-800 mb-3">
                    {recoveryContext.guardrails.escalationRequirements.reason}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-amber-700 mb-1">Escalate To</div>
                      <div className="text-amber-900 font-medium">
                        {recoveryContext.guardrails.escalationRequirements.escalateTo}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-amber-700 mb-1">Timeframe</div>
                      <div className="text-amber-900 font-medium">
                        {recoveryContext.guardrails.escalationRequirements.timeframe}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* LAYER 5: READINESS & COMMITMENT GATE (FIXED ACTION AREA) */}
      <div className="border-t bg-card">
        <div className="px-8 py-6 max-w-5xl">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-start gap-3 flex-1">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-foreground mb-1">Context Reviewed</div>
                <p className="text-sm text-muted-foreground">
                  Problem scope, constraints, and root cause have been reviewed
                </p>
              </div>
            </div>
            
            <button
              onClick={onDraftRecoveryPlan}
              className="flex items-center gap-3 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Navigation className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Proceed to Draft Recovery Plan</div>
                <div className="text-xs opacity-90">Enter recovery planning mode</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
