import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface SuperAdminAddTenantProps {
  onClose: () => void;
  onSubmit: () => void;
}

export function SuperAdminAddTenant({ onClose, onSubmit }: SuperAdminAddTenantProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    // Tab 1: Business Details
    companyName: '',
    website: '',
    industry: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Tab 2: Location
    country: '',
    language: '',
    currency: '',
    timezone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Tab 3: Operational Scale
    staffSize: '',
    expectedVolume: '',
    multiRegion: false,
    
    // Tab 4: Subscription & AI
    suggestedPlan: 'Pro',
    selectedPlan: 'Pro',
    overrideReason: '',
    aiAllowed: true
  });

  const tabs = [
    { id: 0, label: 'Business Details', completed: false },
    { id: 1, label: 'Location & Regional Settings', completed: false },
    { id: 2, label: 'Operational Scale', completed: false },
    { id: 3, label: 'Subscription & AI Access', completed: false },
    { id: 4, label: 'Review & Create', completed: false }
  ];

  const handleNext = () => {
    if (currentTab < tabs.length - 1) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  // Auto-derive values when country is selected
  const handleCountryChange = (country: string) => {
    setFormData({ ...formData, country });
    
    // Auto-derive based on country
    const countryDefaults: Record<string, { language: string; currency: string; timezone: string }> = {
      'United States': { language: 'English (US)', currency: 'USD', timezone: 'America/New_York' },
      'United Kingdom': { language: 'English (UK)', currency: 'GBP', timezone: 'Europe/London' },
      'Canada': { language: 'English (CA)', currency: 'CAD', timezone: 'America/Toronto' },
      'Australia': { language: 'English (AU)', currency: 'AUD', timezone: 'Australia/Sydney' },
      'Germany': { language: 'German', currency: 'EUR', timezone: 'Europe/Berlin' },
      'France': { language: 'French', currency: 'EUR', timezone: 'Europe/Paris' },
      'Spain': { language: 'Spanish', currency: 'EUR', timezone: 'Europe/Madrid' }
    };
    
    const defaults = countryDefaults[country];
    if (defaults) {
      setFormData(prev => ({
        ...prev,
        language: defaults.language,
        currency: defaults.currency,
        timezone: defaults.timezone
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-xl">Add New Tenant</h2>
            <p className="text-muted-foreground text-sm">Create tenant governance envelope</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4 border-b border-border bg-muted">
          <div className="flex items-center gap-2 overflow-x-auto">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center">
                <button
                  onClick={() => setCurrentTab(index)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    currentTab === index
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : currentTab > index
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-background text-muted-foreground hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {currentTab > index && <Check className="w-4 h-4" />}
                    <span>{index + 1}. {tab.label}</span>
                  </div>
                </button>
                {index < tabs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: BUSINESS DETAILS */}
          {currentTab === 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-foreground mb-4">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-foreground mb-2">
                      Legal Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter legal company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      Company Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      Business Type / Industry <span className="text-muted-foreground">(Optional)</span>
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select industry</option>
                      <option value="logistics">Logistics & Transportation</option>
                      <option value="ecommerce">E-Commerce & Retail</option>
                      <option value="food">Food & Beverage Delivery</option>
                      <option value="healthcare">Healthcare Delivery</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground mb-4">Primary Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john.doe@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOCATION & REGIONAL SETTINGS */}
          {currentTab === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-foreground mb-4">Regional Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-foreground mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select country</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      Default Language <span className="text-muted-foreground">(Auto-derived)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-muted"
                      placeholder="Auto-filled based on country"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      Currency <span className="text-muted-foreground">(Auto-derived)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-muted"
                      placeholder="Auto-filled based on country"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm text-foreground mb-2">
                      Time Zone <span className="text-muted-foreground">(Auto-derived)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-muted"
                      placeholder="Auto-filled based on country"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground mb-4">Structured Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-foreground mb-2">
                      Address Line
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123 Main Street"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="New York"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-foreground mb-2">
                      State / Province
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="NY"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm text-foreground mb-2">
                      Zip / Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OPERATIONAL SCALE */}
          {currentTab === 2 && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900 text-sm">
                  <strong>Note:</strong> This information is used to recommend the appropriate subscription plan. It does not configure operational settings.
                </p>
              </div>

              <div>
                <h3 className="text-foreground mb-4">Organization Size</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="staffSize"
                      value="1-20"
                      checked={formData.staffSize === '1-20'}
                      onChange={(e) => setFormData({ ...formData, staffSize: e.target.value, expectedVolume: '' })}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-foreground">Small (1-20 staff)</p>
                      <p className="text-muted-foreground text-sm">Early-stage or small operations</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="staffSize"
                      value="21-100"
                      checked={formData.staffSize === '21-100'}
                      onChange={(e) => setFormData({ ...formData, staffSize: e.target.value, expectedVolume: '' })}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-foreground">Medium (21-100 staff)</p>
                      <p className="text-muted-foreground text-sm">Growing business with regional operations</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="staffSize"
                      value="100+"
                      checked={formData.staffSize === '100+'}
                      onChange={(e) => setFormData({ ...formData, staffSize: e.target.value, expectedVolume: '' })}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-foreground">Large (100+ staff)</p>
                      <p className="text-muted-foreground text-sm">Enterprise-scale operations</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="text-center text-muted-foreground">OR</div>

              <div>
                <h3 className="text-foreground mb-4">Expected Volume</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="expectedVolume"
                      value="Low"
                      checked={formData.expectedVolume === 'Low'}
                      onChange={(e) => setFormData({ ...formData, expectedVolume: e.target.value, staffSize: '' })}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-foreground">Low Volume</p>
                      <p className="text-muted-foreground text-sm">&lt; 1,000 deliveries/month</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="expectedVolume"
                      value="Medium"
                      checked={formData.expectedVolume === 'Medium'}
                      onChange={(e) => setFormData({ ...formData, expectedVolume: e.target.value, staffSize: '' })}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-foreground">Medium Volume</p>
                      <p className="text-muted-foreground text-sm">1,000 - 10,000 deliveries/month</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="expectedVolume"
                      value="High"
                      checked={formData.expectedVolume === 'High'}
                      onChange={(e) => setFormData({ ...formData, expectedVolume: e.target.value, staffSize: '' })}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-foreground">High Volume</p>
                      <p className="text-muted-foreground text-sm">&gt; 10,000 deliveries/month</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.multiRegion}
                    onChange={(e) => setFormData({ ...formData, multiRegion: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="text-foreground">Multi-region operations</p>
                    <p className="text-muted-foreground text-sm">Operates across multiple geographic regions</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: SUBSCRIPTION & AI ACCESS */}
          {currentTab === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-foreground mb-4">Subscription Plan</h3>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <p className="text-green-900 text-sm mb-2">
                    <strong>System Recommendation:</strong> Based on provided information
                  </p>
                  <p className="text-green-700">
                    Suggested Plan: <strong>{formData.suggestedPlan}</strong>
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Currency: {formData.currency || 'USD'}
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="plan"
                      value="Basic"
                      checked={formData.selectedPlan === 'Basic'}
                      onChange={(e) => setFormData({ ...formData, selectedPlan: e.target.value })}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-foreground">Basic</p>
                        <p className="text-foreground">$99/month</p>
                      </div>
                      <p className="text-muted-foreground text-sm">For small teams getting started</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border-2 border-green-500 bg-green-50 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="plan"
                      value="Pro"
                      checked={formData.selectedPlan === 'Pro'}
                      onChange={(e) => setFormData({ ...formData, selectedPlan: e.target.value })}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-foreground">Pro (Recommended)</p>
                        <p className="text-foreground">$299/month</p>
                      </div>
                      <p className="text-muted-foreground text-sm">For growing businesses with advanced needs</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="plan"
                      value="Enterprise"
                      checked={formData.selectedPlan === 'Enterprise'}
                      onChange={(e) => setFormData({ ...formData, selectedPlan: e.target.value })}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-foreground">Enterprise</p>
                        <p className="text-foreground">Custom pricing</p>
                      </div>
                      <p className="text-muted-foreground text-sm">For large-scale operations with custom requirements</p>
                    </div>
                  </label>
                </div>

                {formData.selectedPlan !== formData.suggestedPlan && (
                  <div className="mt-4">
                    <label className="block text-sm text-foreground mb-2">
                      Override Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.overrideReason}
                      onChange={(e) => setFormData({ ...formData, overrideReason: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Explain why you're overriding the system recommendation..."
                    />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-foreground mb-4">AI Access Control</h3>
                
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                  <p className="text-amber-900 text-sm">
                    <strong>Important:</strong> If AI is disabled, the Tenant Admin cannot re-enable it. This is a platform-level restriction.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-green-500 bg-green-50 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="aiAllowed"
                      checked={formData.aiAllowed === true}
                      onChange={() => setFormData({ ...formData, aiAllowed: true })}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-foreground">AI Allowed (Default)</p>
                      <p className="text-muted-foreground text-sm">Tenant can use AI features globally</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="aiAllowed"
                      checked={formData.aiAllowed === false}
                      onChange={() => setFormData({ ...formData, aiAllowed: false })}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-foreground">AI Disabled</p>
                      <p className="text-muted-foreground text-sm">AI features disabled globally for this tenant</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEW & CREATE */}
          {currentTab === 4 && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900 text-sm">
                  Review all information before creating the tenant. Once created, a Tenant Admin invitation will be sent automatically.
                </p>
              </div>

              <div className="space-y-6">
                {/* Business Details Summary */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-foreground mb-3 flex items-center justify-between">
                    Business Details
                    <button onClick={() => setCurrentTab(0)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Company Name</p>
                      <p className="text-foreground">{formData.companyName || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Website</p>
                      <p className="text-foreground">{formData.website || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Primary Contact</p>
                      <p className="text-foreground">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="text-foreground">{formData.email || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Location Summary */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-foreground mb-3 flex items-center justify-between">
                    Location & Regional Settings
                    <button onClick={() => setCurrentTab(1)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Country</p>
                      <p className="text-foreground">{formData.country || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Language</p>
                      <p className="text-foreground">{formData.language || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Currency</p>
                      <p className="text-foreground">{formData.currency || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time Zone</p>
                      <p className="text-foreground">{formData.timezone || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Scale Summary */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-foreground mb-3 flex items-center justify-between">
                    Operational Scale
                    <button onClick={() => setCurrentTab(2)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Scale Indicator</p>
                      <p className="text-foreground">
                        {formData.staffSize && `Staff Size: ${formData.staffSize}`}
                        {formData.expectedVolume && `Volume: ${formData.expectedVolume}`}
                        {!formData.staffSize && !formData.expectedVolume && '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Multi-region</p>
                      <p className="text-foreground">{formData.multiRegion ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                {/* Subscription Summary */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-foreground mb-3 flex items-center justify-between">
                    Subscription & AI Access
                    <button onClick={() => setCurrentTab(3)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Subscription Plan</p>
                      <p className="text-foreground">{formData.selectedPlan}</p>
                      {formData.selectedPlan !== formData.suggestedPlan && (
                        <p className="text-amber-700 text-xs mt-1">(Override from {formData.suggestedPlan})</p>
                      )}
                    </div>
                    <div>
                      <p className="text-muted-foreground">AI Access</p>
                      <p className="text-foreground">{formData.aiAllowed ? 'Allowed' : 'Disabled'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-900 text-sm">
                  <strong>Next Steps:</strong>
                </p>
                <ul className="list-disc list-inside text-green-700 text-sm mt-2 space-y-1">
                  <li>Tenant will be created in "Requested" status</li>
                  <li>Tenant Admin invitation sent to {formData.email}</li>
                  <li>Audit log entry created</li>
                  <li>You can activate the tenant after creation</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted">
          <button
            onClick={handlePrevious}
            disabled={currentTab === 0}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {currentTab < tabs.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition-colors"
              >
                <Check className="w-4 h-4" />
                Confirm & Create Tenant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
