import { useState } from 'react';
import { Shield, Eye, Edit, ChevronRight, CheckCircle } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  modules: RoleModule[];
}

interface RoleModule {
  name: string;
  access: 'View' | 'Manage' | 'Execute';
}

export function TenantRolesModule() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const roles: Role[] = [
    {
      id: 'operations-manager',
      name: 'Operations Manager',
      description: 'Oversees operational performance, approves changes, and reviews outcomes',
      modules: [
        { name: 'Dashboard', access: 'View' },
        { name: 'Users', access: 'View' },
        { name: 'Roles & Permissions', access: 'View' },
        { name: 'Company Settings', access: 'View' },
        { name: 'Reports & Analytics', access: 'Manage' },
        { name: 'Escalations', access: 'Manage' }
      ]
    },
    {
      id: 'dispatch-manager',
      name: 'Dispatch Manager',
      description: 'Manages daily operations, assigns routes, and monitors delivery execution',
      modules: [
        { name: 'Dashboard', access: 'View' },
        { name: 'Routes', access: 'Manage' },
        { name: 'Drivers', access: 'Manage' },
        { name: 'Deliveries', access: 'Execute' },
        { name: 'Analytics', access: 'View' }
      ]
    },
    {
      id: 'fleet-supervisor',
      name: 'Fleet Supervisor',
      description: 'Oversees field teams and provides real-time driver support',
      modules: [
        { name: 'Dashboard', access: 'View' },
        { name: 'Fleet Management', access: 'Manage' },
        { name: 'Drivers', access: 'Manage' },
        { name: 'Routes', access: 'View' },
        { name: 'Support Tools', access: 'Execute' },
        { name: 'Analytics', access: 'View' }
      ]
    },
    {
      id: 'viewer',
      name: 'Viewer / Read-only',
      description: 'View-only access to dashboards and reports without edit permissions',
      modules: [
        { name: 'Dashboard', access: 'View' },
        { name: 'Reports', access: 'View' },
        { name: 'Analytics', access: 'View' }
      ]
    }
  ];

  const getAccessBadgeStyle = (access: string) => {
    const styles = {
      View: 'bg-blue-50 text-blue-700 border-blue-200',
      Manage: 'bg-green-50 text-green-700 border-green-200',
      Execute: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return styles[access as keyof typeof styles] || styles.View;
  };

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-foreground mb-1">Roles & Permissions</h1>
          <p className="text-muted-foreground text-sm">
            Understand and manage access levels for your team
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Roles List */}
            <div>
              <h2 className="text-foreground text-sm font-medium mb-4">Available Roles</h2>
              <div className="space-y-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedRole?.id === role.id
                        ? 'border-primary bg-blue-50'
                        : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <Shield className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          selectedRole?.id === role.id ? 'text-primary' : 'text-blue-600'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-foreground font-medium text-sm mb-1">
                            {role.name}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {role.description}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
                        selectedRole?.id === role.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Role Details */}
            <div>
              {selectedRole ? (
                <div className="sticky top-6">
                  <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                    {/* Role Header */}
                    <div className="flex items-start justify-between mb-6 pb-4 border-b border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-foreground font-medium mb-1">
                            {selectedRole.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {selectedRole.description}
                          </p>
                        </div>
                      </div>
                      <button className="text-primary hover:text-blue-700 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Permissions List */}
                    <div>
                      <h4 className="text-foreground text-sm font-medium mb-4">
                        Module Access
                      </h4>
                      <div className="space-y-2">
                        {selectedRole.modules.map((module, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-3 px-3 bg-muted rounded-lg"
                          >
                            <span className="text-sm text-foreground">
                              {module.name}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getAccessBadgeStyle(module.access)}`}>
                              {module.access}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Access Legend */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <h4 className="text-foreground text-xs font-medium mb-3">
                        Access Levels
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">View:</span> Read-only access
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">Manage:</span> Edit and configure
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">Execute:</span> Perform actions
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-foreground font-medium mb-2">
                    Select a role to view details
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Click on any role to see its permissions and access levels
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 text-sm font-medium mb-1">
                Predefined Roles
              </p>
              <p className="text-blue-700 text-sm">
                These roles are available by default. You can customize permissions to match your operational needs. All changes are audit-logged.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
