import { CheckCircle, Circle, Lock, Clock, Users } from 'lucide-react';

interface TenantAdminFirstLoginProps {
  onAddUser: () => void;
}

export function TenantAdminFirstLogin({ onAddUser }: TenantAdminFirstLoginProps) {
  const setupItems = [
    {
      label: 'Company & Workspace Details',
      status: 'completed' as const,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      note: 'Provided during onboarding'
    },
    {
      label: 'Users',
      status: 'required' as const,
      icon: <Circle className="w-5 h-5 text-amber-600" />,
      note: 'Add at least one team member'
    },
    {
      label: 'Roles & Permissions',
      status: 'auto' as const,
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      note: 'Based on assigned roles'
    },
    {
      label: 'Platform Modules',
      status: 'locked' as const,
      icon: <Lock className="w-5 h-5 text-slate-400" />,
      note: 'Available after setup'
    }
  ];

  return (
    <div className="flex-1 px-6 py-12 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Main Content Card */}
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-foreground mb-3">Welcome to the OptiMile Platform</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Let's get your workspace ready so your team can start working.
            </p>
          </div>

          {/* Setup Checklist */}
          <div className="bg-muted rounded-lg p-6 mb-8">
            <h3 className="text-foreground text-sm mb-4 font-medium">Setup Checklist</h3>
            <div className="space-y-4">
              {setupItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-medium ${
                        item.status === 'completed' 
                          ? 'text-foreground' 
                          : item.status === 'locked'
                          ? 'text-muted-foreground'
                          : 'text-foreground'
                      }`}>
                        {item.label}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.status === 'completed'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : item.status === 'required'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : item.status === 'auto'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {item.status === 'completed' ? 'Completed' : item.status === 'required' ? 'Required' : item.status === 'auto' ? 'Auto-created' : 'Locked'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onAddUser}
            className="w-full py-3 px-4 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md mb-4"
          >
            Add User
          </button>

          {/* Helper Text */}
          <p className="text-center text-muted-foreground text-sm">
            You can assign a role while adding users. Roles can be customized later.
          </p>
        </div>
      </div>
    </div>
  );
}
