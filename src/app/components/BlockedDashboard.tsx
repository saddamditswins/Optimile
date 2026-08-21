import { Lock, ArrowRight } from 'lucide-react';

interface BlockedDashboardProps {
  onResumeSetup: () => void;
}

export function BlockedDashboard({ onResumeSetup }: BlockedDashboardProps) {
  const missingItems = [
    { label: 'Regions & Structure', status: 'Pending' },
    { label: 'Roles & Permissions', status: 'Pending' },
    { label: 'SLA & Service Rules', status: 'Pending' },
    { label: 'Integrations', status: 'Pending' }
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Blurred Dashboard Shell */}
      <div className="blur-sm pointer-events-none opacity-40">
        {/* Simulated Dashboard Header */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-foreground">Operations Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="w-32 h-8 bg-muted rounded" />
              <div className="w-24 h-8 bg-muted rounded" />
            </div>
          </div>
        </div>

        {/* Simulated Dashboard Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg h-64" />
            <div className="bg-card border border-border rounded-lg h-64" />
          </div>
        </div>
      </div>

      {/* Blocking Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="w-full max-w-2xl mx-6">
          <div className="bg-card rounded-lg shadow-2xl border border-border p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-amber-50 rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-amber-600" />
              </div>
            </div>

            {/* Headline */}
            <div className="text-center mb-6">
              <h2 className="text-foreground mb-3">Setup not complete</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Your tenant configuration must be completed before dashboards and modules become available.
              </p>
            </div>

            {/* Missing Items List */}
            <div className="bg-muted rounded-lg p-6 mb-6">
              <h3 className="text-foreground text-sm mb-4">Missing Configuration Items</h3>
              <div className="space-y-3">
                {missingItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-foreground">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs">
                        {item.status}
                      </span>
                      <button 
                        onClick={onResumeSetup}
                        className="text-primary hover:text-blue-700 text-sm transition-colors"
                      >
                        Go to setup
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action */}
            <button
              onClick={onResumeSetup}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span>Resume Setup</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Helper Text */}
            <p className="text-center text-muted-foreground text-sm mt-4">
              Operational access will be enabled automatically once setup is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
