import { CheckCircle, Circle, ClipboardList } from 'lucide-react';

interface FirstLoginLandingProps {
  onStartSetup: () => void;
  onSetupComplete: () => void;
  onSetupStepChange: (step: string) => void;
}

export function FirstLoginLanding({ onStartSetup, onSetupComplete, onSetupStepChange }: FirstLoginLandingProps) {
  const setupItems = [
    { label: 'Company Information', status: 'completed' as const },
    { label: 'Subscription & Plan', status: 'completed' as const },
    { label: 'Regions & Structure', status: 'pending' as const },
    { label: 'Roles & Permissions', status: 'pending' as const },
    { label: 'SLA & Service Rules', status: 'pending' as const },
    { label: 'Integrations', status: 'pending' as const }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-6 h-6 border-2 border-white rounded" />
            </div>
            <div>
              <h1 className="text-foreground">OptiMile</h1>
              <p className="text-muted-foreground text-xs">Execution Control Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Acme Corporation</span>
            <span className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm">
              Tenant Setup Required
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div className="bg-card rounded-lg shadow-lg border border-border p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Headline */}
            <div className="text-center mb-6">
              <h2 className="text-foreground mb-3">Your workspace isn't ready yet</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Before your operations team can start using the platform, a few required configuration steps must be completed.
              </p>
            </div>

            {/* Checklist Preview */}
            <div className="bg-muted rounded-lg p-6 mb-6">
              <h3 className="text-foreground text-sm mb-4">Setup Checklist</h3>
              <div className="space-y-3">
                {setupItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className={item.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}>
                      {item.label}
                    </span>
                    <span className={`ml-auto px-2 py-0.5 rounded text-xs ${
                      item.status === 'completed'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {item.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action */}
            <button
              onClick={onStartSetup}
              className="w-full py-3 px-4 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Start Setup
            </button>

            {/* Helper Text */}
            <p className="text-center text-muted-foreground text-sm mt-4">
              This is a one-time setup. Your progress will be saved automatically.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}