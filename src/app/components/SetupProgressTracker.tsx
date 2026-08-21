import { CheckCircle, Circle, Lock, ArrowRight, Save, List } from 'lucide-react';

interface SetupStep {
  id: string;
  label: string;
  status: 'completed' | 'required' | 'locked';
  description: string;
  impact: string[];
}

interface SetupProgressTrackerProps {
  currentStep: string;
  onContinueSetup: (stepId: string) => void;
  onSaveExit: () => void;
  onSetupComplete: () => void;
  onSetupStepChange: (step: string) => void;
}

export function SetupProgressTracker({ currentStep, onContinueSetup, onSaveExit, onSetupComplete, onSetupStepChange }: SetupProgressTrackerProps) {
  const steps: SetupStep[] = [
    {
      id: 'company-info',
      label: 'Company Information',
      status: 'completed',
      description: 'Basic company details and operational defaults have been configured.',
      impact: ['Tenant identity established', 'Time zones configured', 'Contact information set']
    },
    {
      id: 'regions',
      label: 'Regions & Multi-Region Setup',
      status: 'required',
      description: 'Define the geographic regions where your operations take place.',
      impact: ['Regional access control', 'Location-based reporting', 'Time zone management']
    },
    {
      id: 'structure',
      label: 'Operational Structure',
      status: 'required',
      description: 'Configure depots and zones within your regions.',
      impact: ['Execution unit mapping', 'Capacity planning', 'Route optimization']
    },
    {
      id: 'roles',
      label: 'Roles & Permissions',
      status: 'required',
      description: 'Define user roles and their access permissions.',
      impact: ['Access control', 'Security boundaries', 'User management']
    },
    {
      id: 'sla',
      label: 'SLA & Service Rules',
      status: 'required',
      description: 'Encode delivery promises and prioritization logic.',
      impact: ['SLA enforcement', 'Priority routing', 'Escalation triggers']
    },
    {
      id: 'integrations',
      label: 'Integrations',
      status: 'required',
      description: 'Connect external systems and data sources.',
      impact: ['Data ingestion', 'System synchronization', 'Automation enablement']
    },
    {
      id: 'review',
      label: 'Readiness Review',
      status: 'locked',
      description: 'Final validation before activating your tenant.',
      impact: ['Configuration validation', 'Completeness check', 'Activation readiness']
    }
  ];

  const activeStep = steps.find(s => s.id === currentStep) || steps[1];
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const totalCount = steps.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-6 h-6 border-2 border-white rounded" />
              </div>
              <div>
                <h1 className="text-foreground">OptiMile Setup</h1>
                <p className="text-muted-foreground text-xs">Tenant Configuration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-foreground">{completedCount} of {totalCount} completed</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Setup Steps */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm border border-border p-6 sticky top-6">
                <h2 className="text-foreground mb-4">Setup Steps</h2>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => step.status !== 'locked' && onContinueSetup(step.id)}
                      disabled={step.status === 'locked'}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        step.id === currentStep
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : step.status === 'locked'
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : step.status === 'locked' ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${step.id === currentStep ? '' : 'text-foreground'}`}>
                          {step.label}
                        </p>
                        {step.status === 'completed' && (
                          <p className="text-xs text-green-600 mt-0.5">Completed</p>
                        )}
                        {step.status === 'required' && step.id !== currentStep && (
                          <p className="text-xs text-muted-foreground mt-0.5">Required</p>
                        )}
                        {step.status === 'locked' && (
                          <p className="text-xs text-muted-foreground mt-0.5">Locked</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Context Panel */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-sm border border-border p-8">
                {/* Step Title */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    {activeStep.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-primary" />
                    )}
                    <h2 className="text-foreground">{activeStep.label}</h2>
                  </div>
                  <p className="text-muted-foreground">
                    {activeStep.description}
                  </p>
                </div>

                {/* Impact Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h3 className="text-foreground text-sm mb-3">Why this step is required</h3>
                  <ul className="space-y-2">
                    {activeStep.impact.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-900">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onContinueSetup(activeStep.id)}
                    disabled={activeStep.status === 'locked' || activeStep.status === 'completed'}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continue Setup</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={onSaveExit}
                    className="flex items-center gap-2 py-3 px-6 bg-card border border-border hover:bg-accent text-foreground rounded-lg transition-all duration-200"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save & Exit</span>
                  </button>
                </div>

                {/* Secondary Action */}
                <div className="mt-4 text-center">
                  <button className="text-sm text-primary hover:text-blue-700 transition-colors flex items-center gap-1 mx-auto">
                    <List className="w-4 h-4" />
                    <span>View Remaining Steps</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}