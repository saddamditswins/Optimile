import { useState } from 'react';
import { 
  Building, 
  CreditCard, 
  Globe, 
  Network, 
  Shield, 
  Clock, 
  Palette,
  CheckCircle,
  ArrowRight,
  Lock,
  Info,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'completed' | 'required' | 'optional';
}

interface TenantSettingsProps {
  onContinueSetup?: () => void;
  setupMode?: boolean;
}

export function TenantSettings({ onContinueSetup, setupMode = false }: TenantSettingsProps) {
  const [activeTab, setActiveTab] = useState('company-info');

  const tabs: Tab[] = [
    { id: 'company-info', label: 'Company Information', icon: <Building className="w-4 h-4" />, status: 'completed' },
    { id: 'subscription', label: 'Subscription & Plan', icon: <CreditCard className="w-4 h-4" />, status: 'completed' },
    { id: 'regions', label: 'Regions & Multi-Region', icon: <Globe className="w-4 h-4" />, status: 'required' },
    { id: 'structure', label: 'Operational Structure', icon: <Network className="w-4 h-4" />, status: 'required' },
    { id: 'roles', label: 'Roles & Permissions', icon: <Shield className="w-4 h-4" />, status: 'required' },
    { id: 'sla', label: 'SLA & Service Rules', icon: <Clock className="w-4 h-4" />, status: 'required' },
    { id: 'branding', label: 'Theme & Branding', icon: <Palette className="w-4 h-4" />, status: 'optional' },
    { id: 'readiness', label: 'Readiness Review', icon: <CheckCircle className="w-4 h-4" />, status: 'required' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company-info':
        return <CompanyInfoTab />;
      case 'subscription':
        return <SubscriptionTab />;
      case 'regions':
        return <RegionsTab onContinue={() => setActiveTab('structure')} />;
      case 'structure':
        return <StructureTab onContinue={() => setActiveTab('roles')} />;
      case 'roles':
        return <RolesTab onContinue={() => setActiveTab('sla')} />;
      case 'sla':
        return <SLATab onContinue={() => setActiveTab('branding')} />;
      case 'branding':
        return <BrandingTab onContinue={() => setActiveTab('readiness')} />;
      case 'readiness':
        return <ReadinessTab onActivate={() => onContinueSetup?.()} />;
      default:
        return <CompanyInfoTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-foreground">Tenant Settings</h1>
              <p className="text-muted-foreground text-sm">Configure your workspace and operational parameters</p>
            </div>
            {setupMode && (
              <span className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm">
                Setup Mode
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tabs Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm border border-border p-4 sticky top-6">
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'hover:bg-accent text-foreground'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {tab.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{tab.label}</p>
                      </div>
                      {tab.status === 'completed' && activeTab !== tab.id && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Company Info Tab Component
function CompanyInfoTab() {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-8">
      <h2 className="text-foreground mb-6">Company Information</h2>
      
      {/* Company Identity Section */}
      <div className="mb-8">
        <h3 className="text-foreground text-sm mb-4">Company Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground text-sm mb-2">Company Legal Name</label>
            <input
              type="text"
              value="Acme Corporation"
              disabled
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-foreground text-sm mb-2">Tenant ID</label>
            <input
              type="text"
              value="ACME-2025-001"
              disabled
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-foreground text-sm mb-2">Industry</label>
            <input
              type="text"
              value="Logistics & Delivery"
              disabled
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-foreground text-sm mb-2">Country of Registration</label>
            <input
              type="text"
              value="United States"
              disabled
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Operational Defaults Section */}
      <div className="mb-8">
        <h3 className="text-foreground text-sm mb-4">Operational Defaults</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground text-sm mb-2">Primary Time Zone *</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
              <option>America/New_York (EST/EDT)</option>
              <option>America/Chicago (CST/CDT)</option>
              <option>America/Los_Angeles (PST/PDT)</option>
            </select>
          </div>
          <div>
            <label className="block text-foreground text-sm mb-2">Default Language *</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-foreground text-sm mb-2">Date & Time Format *</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
              <option>MM/DD/YYYY hh:mm AM/PM</option>
              <option>DD/MM/YYYY HH:mm</option>
              <option>YYYY-MM-DD HH:mm</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-8">
        <h3 className="text-foreground text-sm mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground text-sm mb-2">Primary Admin Email *</label>
            <input
              type="email"
              defaultValue="admin@acmecorp.com"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block text-foreground text-sm mb-2">Support Contact Email *</label>
            <input
              type="email"
              defaultValue="support@acmecorp.com"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block text-foreground text-sm mb-2">Phone Number (Optional)</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-6 border-t border-border">
        <button className="px-6 py-3 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}

// Subscription Tab Component
function SubscriptionTab() {
  const [billingContactName, setBillingContactName] = useState('Sarah Chen');
  const [billingEmail, setBillingEmail] = useState('billing@acmecorp.com');

  const handleSaveAndContinue = () => {
    // Save billing contact changes
    console.log('Saving billing contact:', { billingContactName, billingEmail });
    // Continue to next tab (would be handled by parent component)
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-8">
      <h2 className="text-foreground mb-6">Subscription & Plan</h2>
      
      {/* Read-only notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-900 dark:text-blue-100 text-sm font-medium mb-1">
            Assigned by Super Admin — Read-Only
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Plan details and limits are configured by your Super Admin. Contact them for changes or upgrades.
          </p>
        </div>
      </div>

      {/* 1. Current Plan (Read-Only) */}
      <div className="mb-8">
        <h3 className="text-foreground text-sm font-medium mb-4">Current Plan</h3>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mb-1">Plan Name</p>
              <p className="text-blue-900 dark:text-blue-100 font-semibold">Enterprise</p>
            </div>
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mb-1">Billing Cycle</p>
              <p className="text-blue-900 dark:text-blue-100 font-semibold">Annual</p>
            </div>
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mb-1">Currency</p>
              <p className="text-blue-900 dark:text-blue-100 font-semibold">USD ($)</p>
            </div>
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mb-1">Status</p>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-md text-sm font-medium">
                <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                Active
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700 dark:text-blue-300">Contract Start Date</span>
              <span className="text-blue-900 dark:text-blue-100 font-medium">January 1, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Plan Limits (Read-Only Summary) */}
      <div className="mb-8">
        <h3 className="text-foreground text-sm font-medium mb-4">Plan Limits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted dark:bg-gray-800 border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs mb-2">Max Users</p>
            <p className="text-foreground text-2xl font-bold">Unlimited</p>
            <p className="text-muted-foreground text-xs mt-1">All roles included</p>
          </div>
          <div className="bg-muted dark:bg-gray-800 border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs mb-2">Max Drivers</p>
            <p className="text-foreground text-2xl font-bold">500</p>
            <p className="text-muted-foreground text-xs mt-1">Active driver licenses</p>
          </div>
          <div className="bg-muted dark:bg-gray-800 border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs mb-2">Max Vehicles</p>
            <p className="text-foreground text-2xl font-bold">300</p>
            <p className="text-muted-foreground text-xs mt-1">Fleet capacity</p>
          </div>
          <div className="bg-muted dark:bg-gray-800 border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs mb-2">Max Active Routes</p>
            <p className="text-foreground text-2xl font-bold">1,000</p>
            <p className="text-muted-foreground text-xs mt-1">Concurrent routes/day</p>
          </div>
        </div>
      </div>

      {/* 3. Add-ons & Capabilities */}
      <div className="mb-8">
        <h3 className="text-foreground text-sm font-medium mb-4">Add-ons & Capabilities</h3>
        <div className="bg-muted dark:bg-gray-800 border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">AI Recommendations</p>
                  <p className="text-muted-foreground text-xs">Smart routing & predictions</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded text-xs font-medium">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">Advanced Analytics</p>
                  <p className="text-muted-foreground text-xs">Deep insights & reporting</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded text-xs font-medium">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">Driver App Access</p>
                  <p className="text-muted-foreground text-xs">Mobile delivery app</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded text-xs font-medium">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">Multi-Region Support</p>
                  <p className="text-muted-foreground text-xs">Global operations</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded text-xs font-medium">
                Enabled
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Add-ons managed by Super Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Billing Contact (Editable) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground text-sm font-medium">Billing Contact</h3>
          <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded text-xs font-medium">
            Editable
          </span>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                Billing Contact Name *
              </label>
              <input
                type="text"
                value={billingContactName}
                onChange={(e) => setBillingContactName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                placeholder="Enter billing contact name"
              />
            </div>
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                Billing Email *
              </label>
              <input
                type="email"
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                placeholder="billing@company.com"
              />
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>This contact will receive all billing notifications and invoices.</p>
          </div>
        </div>
      </div>

      {/* Support & Account Management */}
      <div className="mb-8">
        <h3 className="text-foreground text-sm font-medium mb-4">Support & Account Management</h3>
        <div className="bg-muted dark:bg-gray-800 border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-4">
            For plan changes, upgrades, or to modify plan limits, please contact your account manager or Super Admin.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm font-medium">Account Manager:</span>
              <a href="mailto:sales@optimile.com" className="text-primary hover:text-blue-700 dark:hover:text-blue-400 text-sm transition-colors">
                sales@optimile.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm font-medium">Support Team:</span>
              <a href="mailto:support@optimile.com" className="text-primary hover:text-blue-700 dark:hover:text-blue-400 text-sm transition-colors">
                support@optimile.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar (Bottom) */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button className="px-6 py-2.5 border border-border hover:bg-accent text-foreground rounded-lg transition-all duration-200">
          Back
        </button>
        <button 
          onClick={handleSaveAndContinue}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span>Save & Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Regions & Multi-Region Tab Component
function RegionsTab({ onContinue }: { onContinue: () => void }) {
  // State for primary region
  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('New York');
  const [city, setCity] = useState('New York City');
  const [timeZone, setTimeZone] = useState('America/New_York (EST/EDT)');
  const [currency, setCurrency] = useState('USD ($)');
  const [language, setLanguage] = useState('English (US)');
  
  // State for multi-region
  const [multiRegionEnabled, setMultiRegionEnabled] = useState(false);
  const [additionalRegions, setAdditionalRegions] = useState<Array<{
    id: string;
    country: string;
    state: string;
    hubName: string;
    timeZone: string;
    status: 'active' | 'inactive';
  }>>([]);

  // Form validation
  const isFormValid = country && city && timeZone;

  const handleAddRegion = () => {
    const newRegion = {
      id: `region-${Date.now()}`,
      country: '',
      state: '',
      hubName: '',
      timeZone: '',
      status: 'active' as const
    };
    setAdditionalRegions([...additionalRegions, newRegion]);
  };

  const handleRemoveRegion = (id: string) => {
    if (confirm('Are you sure you want to remove this region?')) {
      setAdditionalRegions(additionalRegions.filter(r => r.id !== id));
    }
  };

  const handleUpdateRegion = (id: string, field: string, value: string) => {
    setAdditionalRegions(additionalRegions.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const handleSaveAndContinue = () => {
    if (!isFormValid) return;
    console.log('Saving regions:', { 
      primary: { country, state, city, timeZone, currency, language },
      multiRegionEnabled,
      additionalRegions 
    });
    onContinue();
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-8">
      <h2 className="text-foreground mb-6">Regions & Multi-Region Setup</h2>

      {/* SECTION 1: Primary Operating Region */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground text-sm font-medium">Primary Operating Region</h3>
          <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded text-xs font-medium">
            Required
          </span>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country */}
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                Country *
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Australia">Australia</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>

            {/* State/Province */}
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                State / Province
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
              >
                <option value="New York">New York</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="Florida">Florida</option>
                <option value="Illinois">Illinois</option>
              </select>
            </div>

            {/* City/Hub Name */}
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                City / Hub Name *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                placeholder="Enter city or hub name"
              />
            </div>

            {/* Time Zone */}
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                Time Zone *
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
              >
                <option value="America/New_York (EST/EDT)">America/New_York (EST/EDT)</option>
                <option value="America/Chicago (CST/CDT)">America/Chicago (CST/CDT)</option>
                <option value="America/Denver (MST/MDT)">America/Denver (MST/MDT)</option>
                <option value="America/Los_Angeles (PST/PDT)">America/Los_Angeles (PST/PDT)</option>
                <option value="Europe/London (GMT/BST)">Europe/London (GMT/BST)</option>
                <option value="Europe/Paris (CET/CEST)">Europe/Paris (CET/CEST)</option>
              </select>
            </div>

            {/* Currency (Read-only) */}
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                Currency
              </label>
              <input
                type="text"
                value={currency}
                disabled
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">Auto-filled from country</p>
            </div>

            {/* Primary Language */}
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                Primary Language *
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
              >
                <option value="English (US)">English (US)</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Portuguese">Portuguese</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Multi-Region Operations Toggle */}
      <div className="mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-foreground text-sm font-medium">Enable Multi-Region Operations</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={multiRegionEnabled}
                    onChange={(e) => setMultiRegionEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-muted-foreground text-sm">
                Allow operations across multiple geographic regions with independent routing, SLA, and capacity rules.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Additional Regions (Conditional) */}
      {multiRegionEnabled && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground text-sm font-medium">Additional Regions</h3>
            <button
              onClick={handleAddRegion}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-primary-foreground rounded-lg transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Region</span>
            </button>
          </div>

          {additionalRegions.length === 0 ? (
            <div className="bg-muted dark:bg-gray-800 border border-border rounded-lg p-8 text-center">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm mb-2">No additional regions configured</p>
              <p className="text-muted-foreground text-xs">Click "Add Region" to configure operations in additional geographic areas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {additionalRegions.map((region) => (
                <div key={region.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-foreground text-sm font-medium">Region {additionalRegions.indexOf(region) + 1}</h4>
                    <button
                      onClick={() => handleRemoveRegion(region.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-foreground text-sm mb-2">Country</label>
                      <select
                        value={region.country}
                        onChange={(e) => handleUpdateRegion(region.id, 'country', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                      >
                        <option value="">Select country</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-foreground text-sm mb-2">State / Province</label>
                      <input
                        type="text"
                        value={region.state}
                        onChange={(e) => handleUpdateRegion(region.id, 'state', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                        placeholder="Enter state or province"
                      />
                    </div>

                    <div>
                      <label className="block text-foreground text-sm mb-2">Hub Name</label>
                      <input
                        type="text"
                        value={region.hubName}
                        onChange={(e) => handleUpdateRegion(region.id, 'hubName', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                        placeholder="Enter hub name"
                      />
                    </div>

                    <div>
                      <label className="block text-foreground text-sm mb-2">Time Zone</label>
                      <select
                        value={region.timeZone}
                        onChange={(e) => handleUpdateRegion(region.id, 'timeZone', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                      >
                        <option value="">Select time zone</option>
                        <option value="America/New_York">America/New_York (EST/EDT)</option>
                        <option value="America/Chicago">America/Chicago (CST/CDT)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
                        <option value="Europe/London">Europe/London (GMT/BST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-foreground text-sm mb-2">Status</label>
                      <select
                        value={region.status}
                        onChange={(e) => handleUpdateRegion(region.id, 'status', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-gray-800 text-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: Region Defaults (Read-Only) */}
      <div className="mb-8">
        <h3 className="text-foreground text-sm font-medium mb-4">Region Defaults</h3>
        <div className="bg-muted dark:bg-gray-800 border border-border rounded-lg p-6">
          <div className="flex items-start gap-2 mb-4">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Derived from Primary Operating Region
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Default SLA Time Zone</p>
              <p className="text-foreground font-medium">{timeZone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Default Currency</p>
              <p className="text-foreground font-medium">{currency}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Region for Billing & Reporting</p>
              <p className="text-foreground font-medium">{city}, {state}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Warning */}
      {!isFormValid && (
        <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 dark:text-amber-100 text-sm font-medium">Required fields missing</p>
            <p className="text-amber-700 dark:text-amber-300 text-sm">Please complete all required fields before continuing.</p>
          </div>
        </div>
      )}

      {/* Action Bar (Bottom) */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button className="px-6 py-2.5 border border-border hover:bg-accent text-foreground rounded-lg transition-all duration-200">
          Back
        </button>
        <button 
          onClick={handleSaveAndContinue}
          disabled={!isFormValid}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Save & Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Placeholder components for other tabs
function StructureTab({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-8">
      <h2 className="text-foreground mb-4">Operational Structure</h2>
      <p className="text-muted-foreground mb-6">Configuration screen for depots and zones would go here.</p>
      <button 
        onClick={onContinue}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <span>Save & Continue</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function RolesTab({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-8">
      <h2 className="text-foreground mb-4">Roles & Permissions</h2>
      <p className="text-muted-foreground mb-6">Configuration screen for roles and permissions would go here.</p>
      <button 
        onClick={onContinue}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <span>Save & Continue</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function SLATab({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-8">
      <h2 className="text-foreground mb-4">SLA & Service Rules</h2>
      <p className="text-muted-foreground mb-6">Configuration screen for SLA rules would go here.</p>
      <button 
        onClick={onContinue}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <span>Save & Continue</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function BrandingTab({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-8">
      <h2 className="text-foreground mb-4">Theme & Branding</h2>
      <p className="text-muted-foreground mb-6">Configuration screen for branding would go here.</p>
      <button 
        onClick={onContinue}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <span>Save & Continue</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function ReadinessTab({ onActivate }: { onActivate: () => void }) {
  const checklistItems = [
    { label: 'Company Info', status: 'completed' },
    { label: 'Regions & Structure', status: 'completed' },
    { label: 'Roles Assigned', status: 'completed' },
    { label: 'SLA Rules', status: 'completed' },
    { label: 'Integrations', status: 'pending' }
  ];

  const hasPending = checklistItems.some(item => item.status === 'pending');

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-8">
      <h2 className="text-foreground mb-6">Readiness Review & Activate Tenant</h2>
      
      {/* Checklist */}
      <div className="bg-muted rounded-lg p-6 mb-6">
        <h3 className="text-foreground text-sm mb-4">Configuration Checklist</h3>
        <div className="space-y-3">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="w-5 h-5 border-2 border-amber-500 rounded-full" />
                )}
                <span className="text-foreground">{item.label}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs ${
                item.status === 'completed'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {item.status === 'completed' ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Activation Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-blue-900 text-sm mb-2">What happens when you activate?</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
            <span>All users will gain access to their assigned modules</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
            <span>SLA enforcement and alerts will begin</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
            <span>Integration data feeds will start processing</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onActivate}
          disabled={hasPending}
          className="flex-1 py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Activate Tenant
        </button>
        {hasPending && (
          <button className="px-6 py-3 border border-border hover:bg-accent text-foreground rounded-lg transition-all duration-200">
            Review Missing Items
          </button>
        )}
      </div>

      {hasPending && (
        <p className="text-amber-600 text-sm mt-4">
          Please complete all pending items before activation.
        </p>
      )}
    </div>
  );
}