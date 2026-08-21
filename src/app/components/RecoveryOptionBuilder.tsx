import {
  ArrowLeft,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Route,
  Package,
  User,
  Navigation,
  RefreshCw,
  Eye,
  Info,
  ArrowRight,
  Users,
  Truck,
  RotateCcw,
  MapPin,
  Calendar,
  Shield,
  Zap,
  Activity,
  List,
  FileEdit,
  Save
} from 'lucide-react';
import { useState } from 'react';

interface RecoveryOptionBuilderProps {
  recoveryId: string;
  onBack: () => void;
  onProceedToImpactReview: () => void;
}

type ActionType = 'reassign' | 'rescue' | 'transfer' | 'resequence';
type ValidationStatus = 'valid' | 'warning' | 'invalid';

interface RecoveryAction {
  id: string;
  type: ActionType;
  sourceEntity: {
    type: 'route' | 'driver' | 'delivery';
    id: string;
    label: string;
  };
  targetEntity: {
    type: 'route' | 'driver' | 'delivery';
    id: string;
    label: string;
  };
  scope: string;
  validations: {
    capacity: { status: ValidationStatus; message: string };
    shift: { status: ValidationStatus; message: string };
    zone: { status: ValidationStatus; message: string };
    sla: { status: ValidationStatus; message: string };
  };
  createdAt: string;
}

export function RecoveryOptionBuilder({
  recoveryId,
  onBack,
  onProceedToImpactReview
}: RecoveryOptionBuilderProps) {
  const [draftActions, setDraftActions] = useState<RecoveryAction[]>([
    {
      id: 'action-1',
      type: 'reassign',
      sourceEntity: { type: 'driver', id: 'DRV-247', label: 'Driver #247' },
      targetEntity: { type: 'driver', id: 'DRV-312', label: 'Driver #312' },
      scope: '3 deliveries (DEL-8472, DEL-8491, DEL-8503)',
      validations: {
        capacity: { status: 'valid', message: 'Target driver has capacity for 3 additional stops' },
        shift: { status: 'valid', message: 'Within target driver shift hours' },
        zone: { status: 'warning', message: 'Target driver crosses zone boundary - 8min detour' },
        sla: { status: 'valid', message: 'All SLA windows achievable with 12min buffer' }
      },
      createdAt: '11:05 AM'
    }
  ]);

  const [showActionBuilder, setShowActionBuilder] = useState(false);
  const [selectedActionType, setSelectedActionType] = useState<ActionType | null>(null);

  // Mock context data
  const draftMetadata = {
    version: 'Draft v1',
    lastUpdated: '11:12 AM',
    createdBy: 'Dispatch Manager',
    recoveryId: 'REC-2847-001'
  };

  const routeContext = {
    id: 'RT-2847',
    status: 'delayed',
    driver: 'Driver #247',
    totalStops: 23,
    completedStops: 18,
    remainingStops: 5,
    delayMinutes: 12,
    stopsAtRisk: 3,
    currentLocation: 'Market St & 5th Ave'
  };

  const driverContext = {
    id: 'DRV-247',
    name: 'Driver #247',
    status: 'active',
    currentRoute: 'RT-2847',
    remainingCapacity: '5 stops',
    shiftEnd: '6:00 PM',
    hoursRemaining: '6h 48m',
    zone: 'Central District',
    utilizationPercent: 78
  };

  const deliveryContext = {
    critical: [
      { id: 'DEL-8472', customer: 'Acme Corporation', slaWindow: '11:00 AM - 12:00 PM', timeToBreachMin: 18, priority: 'vip' },
      { id: 'DEL-8491', customer: 'Tech Solutions Ltd', slaWindow: '12:30 PM - 1:30 PM', timeToBreachMin: 68, priority: 'high' }
    ],
    standard: [
      { id: 'DEL-8503', customer: 'City Retail Store', slaWindow: '1:00 PM - 3:00 PM', timeToBreachMin: 98, priority: 'standard' }
    ]
  };

  const availableDrivers = [
    { id: 'DRV-312', name: 'Driver #312', zone: 'Central District', capacity: '8 stops available', distance: '2.1 mi', eta: '12 min' },
    { id: 'DRV-189', name: 'Driver #189', zone: 'Central District', capacity: '5 stops available', distance: '3.4 mi', eta: '18 min' },
    { id: 'DRV-401', name: 'Driver #401', zone: 'East District', capacity: '12 stops available', distance: '5.8 mi', eta: '28 min' }
  ];

  const getActionTypeLabel = (type: ActionType) => {
    switch (type) {
      case 'reassign': return 'Reassign Delivery';
      case 'rescue': return 'Trigger Rescue Support';
      case 'transfer': return 'Transfer Load';
      case 'resequence': return 'Adjust Stop Sequence';
    }
  };

  const getActionTypeIcon = (type: ActionType) => {
    switch (type) {
      case 'reassign': return <ArrowRight className="w-4 h-4" />;
      case 'rescue': return <Truck className="w-4 h-4" />;
      case 'transfer': return <RefreshCw className="w-4 h-4" />;
      case 'resequence': return <List className="w-4 h-4" />;
    }
  };

  const getValidationIcon = (status: ValidationStatus) => {
    switch (status) {
      case 'valid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'invalid': return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getValidationColor = (status: ValidationStatus) => {
    switch (status) {
      case 'valid': return 'bg-green-50 border-green-300 text-green-700';
      case 'warning': return 'bg-amber-50 border-amber-300 text-amber-700';
      case 'invalid': return 'bg-red-50 border-red-300 text-red-700';
    }
  };

  const handleAddAction = () => {
    setShowActionBuilder(true);
  };

  const handleRemoveAction = (actionId: string) => {
    setDraftActions(draftActions.filter(a => a.id !== actionId));
  };

  const handleResetDraft = () => {
    if (confirm('Reset draft? All drafted actions will be cleared.')) {
      setDraftActions([]);
    }
  };

  const canProceed = draftActions.length > 0 && draftActions.every(action => 
    action.validations.capacity.status !== 'invalid' &&
    action.validations.shift.status !== 'invalid' &&
    action.validations.zone.status !== 'invalid' &&
    action.validations.sla.status !== 'invalid'
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Draft Status Banner */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-800 border-b-4 border-slate-900 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-white">Recovery Option Builder</h1>
                  <span className="px-3 py-1 bg-amber-500/20 backdrop-blur text-amber-300 text-xs rounded-lg border-2 border-amber-400 uppercase font-medium flex items-center gap-2">
                    <FileEdit className="w-3 h-3" />
                    Draft Mode – No Execution
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  Construct and adjust recovery actions safely before review
                </p>
              </div>
            </div>

            {/* Draft Metadata */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-slate-300 mb-1">Recovery ID</div>
                <div className="text-white font-mono text-sm">{draftMetadata.recoveryId}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-slate-300 mb-1">Draft Version</div>
                <div className="text-white text-sm">{draftMetadata.version}</div>
              </div>
              <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <div className="text-xs text-slate-300 mb-1">Last Updated</div>
                <div className="flex items-center gap-1 text-white text-sm">
                  <Clock className="w-3 h-3" />
                  {draftMetadata.lastUpdated}
                </div>
              </div>
            </div>
          </div>

          {/* Action Summary */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4 text-slate-300" />
                  <span className="text-slate-300 text-sm">Drafted Actions:</span>
                  <span className="text-white font-medium">{draftActions.length}</span>
                </div>
                {draftActions.length > 0 && (
                  <>
                    <div className="h-4 w-px bg-white/20" />
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-sm">
                        {draftActions.filter(a => Object.values(a.validations).every(v => v.status === 'valid')).length} fully valid
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300 text-sm">
                        {draftActions.filter(a => Object.values(a.validations).some(v => v.status === 'warning')).length} with warnings
                      </span>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={handleAddAction}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Recovery Action
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Recovery Actions Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Action Builder (when adding new action) */}
              {showActionBuilder && (
                <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-slate-900">Add New Recovery Action</h2>
                    <button
                      onClick={() => setShowActionBuilder(false)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <XCircle className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  {/* Action Type Selection */}
                  <div className="mb-6">
                    <label className="text-sm text-slate-700 font-medium mb-3 block">Select Action Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(['reassign', 'rescue', 'transfer', 'resequence'] as ActionType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedActionType(type)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedActionType === type
                              ? 'bg-blue-600 border-blue-700 text-white'
                              : 'bg-white border-slate-300 text-slate-700 hover:border-blue-400'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            {getActionTypeIcon(type)}
                            <span className="font-medium">{getActionTypeLabel(type)}</span>
                          </div>
                          <p className="text-xs opacity-80">
                            {type === 'reassign' && 'Move deliveries from one driver to another'}
                            {type === 'rescue' && 'Deploy additional driver for urgent deliveries'}
                            {type === 'transfer' && 'Balance load between two routes'}
                            {type === 'resequence' && 'Optimize stop order within route'}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reassign Action Builder */}
                  {selectedActionType === 'reassign' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-slate-700 font-medium mb-2 block">Source Driver</label>
                          <div className="p-3 bg-white border-2 border-slate-300 rounded-lg">
                            <div className="text-slate-900 font-medium font-mono">DRV-247</div>
                            <div className="text-xs text-slate-600 mt-1">Driver #247 · RT-2847</div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-700 font-medium mb-2 block">Target Driver</label>
                          <select className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg text-slate-900">
                            <option value="">Select driver...</option>
                            {availableDrivers.map(driver => (
                              <option key={driver.id} value={driver.id}>
                                {driver.name} · {driver.capacity} · {driver.distance} away
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-700 font-medium mb-2 block">Select Deliveries to Reassign</label>
                        <div className="space-y-2">
                          {deliveryContext.critical.map(del => (
                            <label key={del.id} className="flex items-center gap-3 p-3 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 cursor-pointer">
                              <input type="checkbox" className="w-4 h-4" defaultChecked />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-900 font-medium font-mono text-sm">{del.id}</span>
                                  <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded">VIP</span>
                                </div>
                                <div className="text-xs text-slate-600 mt-1">{del.customer} · {del.slaWindow}</div>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-red-700">
                                <Clock className="w-3 h-3" />
                                {del.timeToBreachMin}m
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-blue-300">
                        <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                          Add to Draft
                        </button>
                        <button
                          onClick={() => setShowActionBuilder(false)}
                          className="px-4 py-2 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Drafted Actions List */}
              <div className="bg-white rounded-lg border-2 border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-slate-900">Drafted Recovery Actions</h2>
                  {draftActions.length > 0 && (
                    <button
                      onClick={handleResetDraft}
                      className="flex items-center gap-2 px-3 py-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset Draft
                    </button>
                  )}
                </div>

                {draftActions.length === 0 ? (
                  <div className="text-center py-12">
                    <FileEdit className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 mb-2">No recovery actions drafted yet</p>
                    <p className="text-slate-500 text-sm">Click "Add Recovery Action" to begin drafting your recovery plan</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {draftActions.map((action, index) => (
                      <div key={action.id} className="border-2 border-slate-300 rounded-lg p-5 bg-slate-50">
                        {/* Action Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-lg text-sm font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  {getActionTypeIcon(action.type)}
                                  <span className="font-medium text-slate-900">{getActionTypeLabel(action.type)}</span>
                                </div>
                                <div className="text-xs text-slate-600 mt-1">Added at {action.createdAt}</div>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveAction(action.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                          >
                            <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-red-600" />
                          </button>
                        </div>

                        {/* Action Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-4 bg-white border border-slate-200 rounded-lg">
                          <div>
                            <div className="text-xs text-slate-600 mb-2">Source Entity</div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-slate-600" />
                              <div>
                                <div className="text-sm font-medium text-slate-900 font-mono">{action.sourceEntity.id}</div>
                                <div className="text-xs text-slate-600">{action.sourceEntity.label}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-2">Target Entity</div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-slate-600" />
                              <div>
                                <div className="text-sm font-medium text-slate-900 font-mono">{action.targetEntity.id}</div>
                                <div className="text-xs text-slate-600">{action.targetEntity.label}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-xs text-blue-800 font-medium mb-1">Scope of Change</div>
                          <div className="text-sm text-blue-900">{action.scope}</div>
                        </div>

                        {/* Inline Validations */}
                        <div className="space-y-2">
                          <div className="text-xs text-slate-700 font-medium mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Inline Validations
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Object.entries(action.validations).map(([key, validation]) => (
                              <div
                                key={key}
                                className={`p-3 rounded-lg border ${getValidationColor(validation.status)}`}
                              >
                                <div className="flex items-start gap-2">
                                  {getValidationIcon(validation.status)}
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium capitalize mb-1">{key} Feasibility</div>
                                    <p className="text-xs opacity-90">{validation.message}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Context Panels */}
            <div className="space-y-6">
              {/* Route Context */}
              <div className="bg-white rounded-lg border-2 border-slate-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Route className="w-5 h-5 text-slate-600" />
                  <h3 className="text-slate-900 font-medium">Route Context</h3>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-900 font-medium font-mono">{routeContext.id}</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded uppercase">
                        {routeContext.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">Driver: {routeContext.driver}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Progress</div>
                      <div className="text-slate-900">{routeContext.completedStops}/{routeContext.totalStops}</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Remaining</div>
                      <div className="text-slate-900">{routeContext.remainingStops} stops</div>
                    </div>
                    <div className="p-2 bg-amber-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Delay</div>
                      <div className="text-amber-700 font-medium">+{routeContext.delayMinutes}m</div>
                    </div>
                    <div className="p-2 bg-red-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">At Risk</div>
                      <div className="text-red-700 font-medium">{routeContext.stopsAtRisk} stops</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                    <MapPin className="w-3 h-3" />
                    <span>{routeContext.currentLocation}</span>
                  </div>
                </div>
              </div>

              {/* Driver Context */}
              <div className="bg-white rounded-lg border-2 border-slate-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-slate-600" />
                  <h3 className="text-slate-900 font-medium">Driver Context</h3>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-slate-900 font-medium mb-1">{driverContext.name}</div>
                    <div className="text-xs text-slate-600 font-mono">{driverContext.id}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Status</div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-slate-900 capitalize">{driverContext.status}</span>
                      </div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Utilization</div>
                      <div className="text-slate-900">{driverContext.utilizationPercent}%</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Capacity</div>
                      <div className="text-slate-900">{driverContext.remainingCapacity}</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Shift Ends</div>
                      <div className="flex items-center gap-1 text-slate-900">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{driverContext.shiftEnd}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 rounded text-sm">
                    <div className="text-xs text-slate-600 mb-1">Zone Assignment</div>
                    <div className="text-slate-900">{driverContext.zone}</div>
                  </div>
                </div>
              </div>

              {/* Delivery Context */}
              <div className="bg-white rounded-lg border-2 border-slate-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-slate-600" />
                  <h3 className="text-slate-900 font-medium">Delivery Context</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-700 font-medium mb-2">Critical Deliveries</div>
                    <div className="space-y-2">
                      {deliveryContext.critical.map(del => (
                        <div key={del.id} className="p-3 bg-purple-50 border border-purple-300 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium font-mono text-slate-900">{del.id}</span>
                            {del.priority === 'vip' && (
                              <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded">VIP</span>
                            )}
                            {del.priority === 'high' && (
                              <span className="px-2 py-0.5 bg-amber-600 text-white text-xs rounded">HIGH</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-700 mb-1">{del.customer}</div>
                          <div className="flex items-center justify-between text-xs pt-2 border-t border-purple-200">
                            <span className="text-slate-600">{del.slaWindow}</span>
                            <span className="flex items-center gap-1 text-red-700">
                              <Clock className="w-3 h-3" />
                              {del.timeToBreachMin}m
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-700 font-medium mb-2">Standard Deliveries</div>
                    <div className="space-y-2">
                      {deliveryContext.standard.map(del => (
                        <div key={del.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium font-mono text-slate-900">{del.id}</span>
                          </div>
                          <div className="text-xs text-slate-700 mb-1">{del.customer}</div>
                          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                            <span className="text-slate-600">{del.slaWindow}</span>
                            <span className="flex items-center gap-1 text-slate-600">
                              <Clock className="w-3 h-3" />
                              {del.timeToBreachMin}m
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Panel */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-blue-900 text-sm font-medium mb-1">Draft Mode Protection</div>
                    <p className="text-blue-700 text-sm">
                      All changes are reversible. No actions will be executed until you complete impact review and final confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="sticky bottom-0 bg-white border-t-2 border-slate-300 shadow-lg">
        <div className="px-4 sm:px-6 py-4">
          <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-4">
              <Save className="w-5 h-5 text-slate-600" />
              <div>
                <div className="text-sm text-slate-900 font-medium">Draft Auto-Saved</div>
                <div className="text-xs text-slate-600">Last saved at {draftMetadata.lastUpdated}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleResetDraft}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Draft
              </button>

              <button
                onClick={onProceedToImpactReview}
                disabled={!canProceed}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  canProceed
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Eye className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Proceed to Impact Review</div>
                  <div className="text-xs opacity-80">
                    {canProceed ? 'Review before-and-after impact' : 'Add valid actions to proceed'}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
