import { useState } from 'react';
import { X, Save, AlertTriangle, History } from 'lucide-react';

interface SuperAdminCreateEditPlanProps {
  planId?: string;
  onClose: () => void;
  onSave: () => void;
}

export function SuperAdminCreateEditPlan({ planId, onClose, onSave }: SuperAdminCreateEditPlanProps) {
  const isEditMode = !!planId;
  
  const [formData, setFormData] = useState({
    // Section A: Plan Identity
    planName: isEditMode ? 'Enterprise' : '',
    tier: isEditMode ? 'Enterprise' : 'Pro',
    description: isEditMode ? 'Full-featured plan for large organizations with unlimited users and high volume operations' : '',
    basePlan: '',
    
    // Section B: Feature Entitlements
    features: {
      corePlatform: true,
      tenantAdmin: true,
      dispatch: true,
      aiFeatures: isEditMode ? true : false
    },
    
    // Section C: Organizational Limits
    limits: {
      maxUsers: isEditMode ? 'unlimited' : '50',
      maxAdminUsers: isEditMode ? '10' : '5',
      maxRegions: isEditMode ? 'unlimited' : '3'
    },
    
    // Section D: Enforcement
    enforcement: {
      maxUsersType: isEditMode ? 'soft' : 'hard',
      maxAdminUsersType: 'warning',
      maxRegionsType: 'escalation'
    },
    
    // Section E: Regional Availability
    regions: ['United States', 'Canada', 'United Kingdom', 'Australia'],
    
    // Version info
    currentVersion: isEditMode ? 'v4.1' : 'v1.0'
  });

  const [showVersionWarning, setShowVersionWarning] = useState(false);

  const handleSave = () => {
    if (isEditMode) {
      setShowVersionWarning(true);
    } else {
      onSave();
    }
  };

  const handleConfirmVersionUpdate = () => {
    setShowVersionWarning(false);
    onSave();
  };

  const enforcementTypes = [
    { value: 'warning', label: 'Warning Only', description: 'Notify but allow' },
    { value: 'soft', label: 'Soft Restriction', description: 'Restrict with override' },
    { value: 'hard', label: 'Hard Block', description: 'Strict enforcement' },
    { value: 'escalation', label: 'Escalation Required', description: 'Super Admin approval' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-xl">
              {isEditMode ? 'Edit Plan' : 'Create New Plan'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isEditMode ? 'Editing creates a new version' : 'Define a new subscription plan template'}
            </p>
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
            
            {isEditMode && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <History className="w-4 h-4 text-blue-700" />
                  <span className="text-blue-900">Version Control</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Current Version: <strong>{formData.currentVersion}</strong>
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  Saving creates v4.2. Existing tenants remain on v4.1. New tenants get v4.2.
                </p>
              </div>
            )}

            {/* SECTION A — PLAN IDENTITY */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4">Plan Identity</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Plan Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.planName}
                    onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Pro, Enterprise, Custom Plan Name"
                  />
                  <p className="text-muted-foreground text-xs mt-1">Must be unique per region</p>
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Tier <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                {formData.tier === 'Custom' && (
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      Base Plan <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.basePlan}
                      onChange={(e) => setFormData({ ...formData, basePlan: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select base plan</option>
                      <option value="PLAN-001">Basic (v3.2)</option>
                      <option value="PLAN-002">Pro (v2.8)</option>
                      <option value="PLAN-003">Enterprise (v4.1)</option>
                    </select>
                    <p className="text-muted-foreground text-xs mt-1">Custom plans must reference a base plan</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Description (Internal Only)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Internal description for Super Admins..."
                  />
                </div>
              </div>
            </div>

            {/* SECTION B — FEATURE ENTITLEMENTS */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4">Feature Entitlements</h3>
              <p className="text-muted-foreground text-sm mb-4">Define which platform modules are enabled</p>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.features.corePlatform}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      features: { ...formData.features, corePlatform: e.target.checked }
                    })}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="text-foreground">Core Platform</p>
                    <p className="text-muted-foreground text-sm">Essential delivery management features</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.features.tenantAdmin}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      features: { ...formData.features, tenantAdmin: e.target.checked }
                    })}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="text-foreground">Tenant Admin</p>
                    <p className="text-muted-foreground text-sm">User management and tenant configuration</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.features.dispatch}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      features: { ...formData.features, dispatch: e.target.checked }
                    })}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="text-foreground">Dispatch</p>
                    <p className="text-muted-foreground text-sm">Live execution and recovery workflows</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.features.aiFeatures}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      features: { ...formData.features, aiFeatures: e.target.checked }
                    })}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="text-foreground">AI Features</p>
                    <p className="text-muted-foreground text-sm">AI-powered recovery and optimization (if globally allowed)</p>
                  </div>
                </label>
              </div>
            </div>

            {/* SECTION C — ORGANIZATIONAL LIMITS */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4">Organizational Limits (Buyer-Understandable)</h3>
              <p className="text-muted-foreground text-sm mb-4">Define governance and commercial limits, not operational metrics</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Max Users <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.limits.maxUsers}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      limits: { ...formData.limits, maxUsers: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 50 or unlimited"
                  />
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Max Admin Users <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.limits.maxAdminUsers}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      limits: { ...formData.limits, maxAdminUsers: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5"
                  />
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Max Regions <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.limits.maxRegions}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      limits: { ...formData.limits, maxRegions: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 3"
                  />
                </div>
              </div>
            </div>

            {/* SECTION D — OVERUSE & ENFORCEMENT RULES */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4">Overuse & Enforcement Rules</h3>
              <p className="text-muted-foreground text-sm mb-4">Define behavior when limits are exceeded</p>
              
              <div className="space-y-4">
                {/* Max Users Enforcement */}
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Max Users - Enforcement Type
                  </label>
                  <select
                    value={formData.enforcement.maxUsersType}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      enforcement: { ...formData.enforcement, maxUsersType: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {enforcementTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Max Admin Users Enforcement */}
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Max Admin Users - Enforcement Type
                  </label>
                  <select
                    value={formData.enforcement.maxAdminUsersType}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      enforcement: { ...formData.enforcement, maxAdminUsersType: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {enforcementTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Max Regions Enforcement */}
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Max Regions - Enforcement Type
                  </label>
                  <select
                    value={formData.enforcement.maxRegionsType}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      enforcement: { ...formData.enforcement, maxRegionsType: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {enforcementTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-900 text-sm">
                    <strong>Enforcement Actions:</strong>
                  </p>
                  <ul className="list-disc list-inside text-amber-700 text-sm mt-2 space-y-1">
                    <li>Notify Tenant Admin when limits approached</li>
                    <li>Restrict features based on enforcement type</li>
                    <li>Escalate to Super Admin if required</li>
                    <li>Recommend upgrade (never auto-upgrade)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SECTION E — REGIONAL AVAILABILITY */}
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-foreground mb-4">Regional Availability</h3>
              <p className="text-muted-foreground text-sm mb-4">Countries/regions where this plan is sellable</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Australia', 'Japan', 'Singapore'].map(region => (
                  <label key={region} className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.regions.includes(region)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, regions: [...formData.regions, region] });
                        } else {
                          setFormData({ ...formData, regions: formData.regions.filter(r => r !== region) });
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground text-sm">{region}</span>
                  </label>
                ))}
              </div>
              
              <p className="text-muted-foreground text-xs mt-3">
                Used for compliance, market segmentation, and pricing compatibility
              </p>
            </div>

            {/* SECTION F — VERSION HISTORY (if editing) */}
            {isEditMode && (
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-foreground mb-4 flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Version History
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="text-green-900">v4.1 (Current)</p>
                      <p className="text-green-700 text-sm">Updated Dec 1, 2025 by admin@optimile.com</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-foreground">v4.0</p>
                      <p className="text-muted-foreground text-sm">Updated Nov 15, 2025 by admin@optimile.com</p>
                    </div>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">Superseded</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-foreground">v3.5</p>
                      <p className="text-muted-foreground text-sm">Updated Oct 20, 2025 by admin@optimile.com</p>
                    </div>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">Superseded</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            {isEditMode ? 'Save as New Version' : 'Create Plan'}
          </button>
        </div>
      </div>

      {/* Version Update Warning Modal */}
      {showVersionWarning && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-foreground">Create New Plan Version?</h3>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-muted-foreground text-sm">
                Saving will create <strong>version 4.2</strong> of this plan.
              </p>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900 text-sm mb-2"><strong>What happens:</strong></p>
                <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                  <li>Existing tenants remain on v4.1</li>
                  <li>New tenants receive v4.2</li>
                  <li>Version history is retained</li>
                  <li>Change is auditable</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowVersionWarning(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmVersionUpdate}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}