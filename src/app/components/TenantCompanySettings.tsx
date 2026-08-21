import { Building, Globe, CreditCard, Sparkles, Info } from 'lucide-react';

interface CompanySettingsField {
  label: string;
  value: string;
}

interface CompanySettingsSection {
  title: string;
  icon: React.ReactNode;
  fields: CompanySettingsField[];
}

export function TenantCompanySettings() {
  const sections: CompanySettingsSection[] = [
    {
      title: 'Company Information',
      icon: <Building className="w-5 h-5" />,
      fields: [
        { label: 'Company Name', value: 'Acme Corporation' },
        { label: 'Website', value: 'www.acmecorp.com' },
        { label: 'Industry', value: 'Logistics & Transportation' }
      ]
    },
    {
      title: 'Location & Regional Settings',
      icon: <Globe className="w-5 h-5" />,
      fields: [
        { label: 'Primary Address', value: '123 Business Street, San Francisco, CA 94102' },
        { label: 'Country', value: 'United States' },
        { label: 'Language', value: 'English (US)' },
        { label: 'Time Zone', value: 'Pacific Time (PT) - UTC-8' }
      ]
    },
    {
      title: 'Subscription & Plan',
      icon: <CreditCard className="w-5 h-5" />,
      fields: [
        { label: 'Plan Type', value: 'Enterprise - Annual' },
        { label: 'Billing Cycle', value: 'Annual (Renews May 15, 2026)' },
        { label: 'Licensed Users', value: 'Up to 100 users' },
        { label: 'Contract Start', value: 'May 15, 2025' }
      ]
    },
    {
      title: 'Platform Features',
      icon: <Sparkles className="w-5 h-5" />,
      fields: [
        { label: 'AI Features', value: 'Enabled' },
        { label: 'Advanced Analytics', value: 'Enabled' },
        { label: 'API Access', value: 'Enabled' },
        { label: 'Multi-Region Support', value: 'Enabled' }
      ]
    }
  ];

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-foreground mb-1">Company Settings</h1>
          <p className="text-muted-foreground text-sm">
            Configuration details provided during onboarding
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 text-sm font-medium mb-1">
                Provided during onboarding by your platform administrator
              </p>
              <p className="text-blue-700 text-sm">
                These settings were configured when your workspace was created. Contact your Super Admin to request changes.
              </p>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                {/* Section Header */}
                <div className="bg-muted px-6 py-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="text-foreground">{section.icon}</div>
                    <h2 className="text-foreground font-medium">{section.title}</h2>
                  </div>
                </div>

                {/* Section Fields */}
                <div className="p-6">
                  <div className="space-y-4">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {field.label}
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-sm text-foreground bg-muted px-4 py-2.5 rounded-lg border border-border">
                            {field.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> These settings are managed at the platform level. 
              Complete your workspace setup to access additional configuration options for users, roles, and operational settings.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
