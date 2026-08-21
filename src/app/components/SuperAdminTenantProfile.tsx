import { useState } from 'react';
import { X, Building2, Shield, Activity, AlertTriangle } from 'lucide-react';

interface SuperAdminTenantProfileProps {
  tenantId: string;
  onClose: () => void;
}

export function SuperAdminTenantProfile({ tenantId, onClose }: SuperAdminTenantProfileProps) {
  const [showActionConfirm, setShowActionConfirm] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [actionReason, setActionReason] = useState('');

  // Mock tenant data
  const tenant = {
    id: tenantId,
    name: 'ACME Logistics',
    website: 'www.acmelogistics.com',
    primaryContact: {
      name: 'John Doe',
      email: 'john.doe@acmelogistics.com',
      phone: '+1 (555) 123-4567'
    },
    country: 'United States',
    language: 'English (US)',
    currency: 'USD',
    timezone: 'America/New_York',
    status: 'Active',
    statusHistory: [
      { date: 'Dec 15, 2025', oldStatus: 'Requested', newStatus: 'Active', reason: 'Initial activation after onboarding', changedBy: 'admin@optimile.com' },
      { date: 'Dec 1, 2025', oldStatus: null, newStatus: 'Requested', reason: 'Tenant created', changedBy: 'admin@optimile.com' }
    ],
    subscription: {
      plan: 'Enterprise',
      enabledModules: ['Routes', 'Drivers', 'Deliveries', 'Analytics', 'AI Recovery'],
      usage: 'Within',
      usageDetails: {
        users: '24 / 50',
        routes: '1,247 / 5,000',
        deliveries: '18,432 / 50,000'
      }
    },
    ai: {
      allowed: true,
      features: ['AI Recovery Suggestions', 'Predictive SLA Alerts', 'Smart Route Optimization'],
      guardrails: 'Default Platform Guardrails Applied',
      lastUpdate: 'Dec 10, 2025'
    },
    operations: {
      lastActivity: '2 hours ago',
      activityStatus: 'Active',
      integrationHealth: 'Connected',
      openEscalations: 3
    }
  };

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setShowActionConfirm(true);
  };

  const handleConfirmAction = () => {
    // Handle the action (API call would go here)
    console.log(`Action: ${selectedAction}, Reason: ${actionReason}`);
    setShowActionConfirm(false);
    setSelectedAction(null);
    setActionReason('');
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      'activate': 'Activate Tenant',
      'restrict': 'Restrict Tenant',
      'suspend': 'Suspend Tenant',
      'resume': 'Resume Tenant',
      'decommission': 'Decommission Tenant'
    };
    return labels[action] || action;
  };

  const getActionDescription = (action: string) => {
    const descriptions: Record<string, string> = {
      'activate': 'Allow tenant to access the platform with full permissions.',
      'restrict': 'Limit tenant access to read-only or specific features.',
      'suspend': 'Temporarily revoke all tenant access.',
      'resume': 'Restore tenant access to previous state.',
      'decommission': 'Permanently disable tenant and archive all data.'
    };
    return descriptions[action] || '';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-foreground text-xl">{tenant.name}</h2>
              <p className="text-muted-foreground text-sm">{tenant.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            
            {/* SECTION A — TENANT IDENTITY */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Tenant Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Legal Company Name</p>
                  <p className="text-foreground">{tenant.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Website</p>
                  <p className="text-foreground">{tenant.website}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Tenant ID</p>
                  <p className="text-foreground font-mono">{tenant.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Primary Contact</p>
                  <p className="text-foreground">{tenant.primaryContact.name}</p>
                  <p className="text-muted-foreground text-xs">{tenant.primaryContact.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Country / Region</p>
                  <p className="text-foreground">{tenant.country}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Language</p>
                  <p className="text-foreground">{tenant.language}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Currency</p>
                  <p className="text-foreground">{tenant.currency}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Time Zone</p>
                  <p className="text-foreground">{tenant.timezone}</p>
                </div>
              </div>
            </div>

            {/* SECTION B — STATUS & LIFECYCLE */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Status & Lifecycle
              </h3>
              <div className="mb-4">
                <p className="text-muted-foreground text-sm mb-2">Current Status</p>
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                  {tenant.status}
                </span>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm mb-3">Status History</p>
                <div className="space-y-3">
                  {tenant.statusHistory.map((history, index) => (
                    <div key={index} className="flex gap-4 pb-3 border-b border-border last:border-0">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-foreground text-sm">
                            {history.oldStatus ? `${history.oldStatus} → ` : ''}
                            <strong>{history.newStatus}</strong>
                          </p>
                          <p className="text-muted-foreground text-xs">{history.date}</p>
                        </div>
                        <p className="text-muted-foreground text-sm">{history.reason}</p>
                        <p className="text-muted-foreground text-xs mt-1">By: {history.changedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION C — SUBSCRIPTION & ENTITLEMENTS */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4">Subscription & Entitlements</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Current Plan</p>
                  <p className="text-foreground text-lg">{tenant.subscription.plan}</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Enabled Modules</p>
                  <div className="flex flex-wrap gap-2">
                    {tenant.subscription.enabledModules.map((module, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm">
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Usage vs Plan</p>
                  <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm">
                    {tenant.subscription.usage}
                  </span>
                  
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-muted-foreground text-xs mb-1">Users</p>
                      <p className="text-foreground">{tenant.subscription.usageDetails.users}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-muted-foreground text-xs mb-1">Routes (Monthly)</p>
                      <p className="text-foreground">{tenant.subscription.usageDetails.routes}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-muted-foreground text-xs mb-1">Deliveries (Monthly)</p>
                      <p className="text-foreground">{tenant.subscription.usageDetails.deliveries}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION D — AI CAPABILITY ENVELOPE */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                AI Capability Envelope
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">AI Allowed</p>
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    tenant.ai.allowed 
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {tenant.ai.allowed ? 'Yes' : 'No'}
                  </span>
                </div>
                
                {tenant.ai.allowed && (
                  <>
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">AI Features Enabled</p>
                      <div className="space-y-2">
                        {tenant.ai.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <p className="text-foreground text-sm">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Global Guardrails</p>
                      <p className="text-foreground">{tenant.ai.guardrails}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Last AI Policy Update</p>
                      <p className="text-foreground">{tenant.ai.lastUpdate}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* SECTION E — PLATFORM SIGNALS (NON-OPERATIONAL) */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4">Platform Signals (Non-Operational)</h3>
              <p className="text-muted-foreground text-sm mb-4">Tenant-level platform interaction only, not operational metrics</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm mb-1">Activity Status</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    tenant.operations.activityStatus === 'Active'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : tenant.operations.activityStatus === 'Dormant'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {tenant.operations.activityStatus}
                  </span>
                  <p className="text-muted-foreground text-xs mt-2">Last seen: {tenant.operations.lastActivity}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm mb-1">Integration Health</p>
                  <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                    {tenant.operations.integrationHealth}
                  </span>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm mb-1">Open Platform Escalations</p>
                  <p className="text-foreground text-xl">{tenant.operations.openEscalations}</p>
                </div>
              </div>
            </div>

            {/* SECTION F — GOVERNANCE ACTIONS */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Governance Actions
              </h3>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <p className="text-amber-900 text-sm">
                  <strong>Important:</strong> All actions require confirmation and will be logged in the audit trail.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleAction('activate')}
                  disabled={tenant.status === 'Active'}
                  className="px-4 py-3 border-2 border-green-500 text-green-700 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Activate
                </button>
                
                <button
                  onClick={() => handleAction('restrict')}
                  disabled={tenant.status === 'Restricted'}
                  className="px-4 py-3 border-2 border-amber-500 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Restrict
                </button>
                
                <button
                  onClick={() => handleAction('suspend')}
                  disabled={tenant.status === 'Suspended'}
                  className="px-4 py-3 border-2 border-red-500 text-red-700 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suspend
                </button>
                
                <button
                  onClick={() => handleAction('resume')}
                  disabled={tenant.status === 'Active'}
                  className="px-4 py-3 border-2 border-blue-500 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Resume
                </button>
                
                <button
                  onClick={() => handleAction('decommission')}
                  className="px-4 py-3 border-2 border-slate-500 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors md:col-span-2"
                >
                  Decommission
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {showActionConfirm && selectedAction && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-foreground mb-2">{getActionLabel(selectedAction)}</h3>
            <p className="text-muted-foreground text-sm mb-4">{getActionDescription(selectedAction)}</p>
            
            <div className="mb-4">
              <label className="block text-sm text-foreground mb-2">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Explain why you're taking this action..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowActionConfirm(false);
                  setSelectedAction(null);
                  setActionReason('');
                }}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={!actionReason.trim()}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}