import { Bell, Settings, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export function TenantNotificationsModule() {
  const alertTypes = [
    { name: 'Driver Delay Alert', category: 'Execution Risk', severity: 'High', routing: 'Yes', escalation: 'Yes', status: 'Active' },
    { name: 'SLA Breach Warning', category: 'SLA Breach', severity: 'Critical', routing: 'Yes', escalation: 'Yes', status: 'Active' },
    { name: 'Route Deviation Alert', category: 'Execution Risk', severity: 'Medium', routing: 'Yes', escalation: 'No', status: 'Active' },
    { name: 'Integration Health Degraded', category: 'Integration Health', severity: 'High', routing: 'Yes', escalation: 'Yes', status: 'Active' },
    { name: 'Capacity Warning', category: 'Execution Risk', severity: 'Medium', routing: 'No', escalation: 'No', status: 'Disabled' },
    { name: 'System Performance Alert', category: 'System & Platform', severity: 'Low', routing: 'Yes', escalation: 'No', status: 'Active' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 sm:px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-foreground">Notifications & Escalation</h1>
            <p className="text-muted-foreground text-sm">Configure alert routing and escalation policies</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm self-start sm:self-auto">
            <Settings className="w-5 h-5" />
            <span>Configure Policies</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">24</p>
              <p className="text-muted-foreground text-sm">Total Alert Types</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">18</p>
              <p className="text-muted-foreground text-sm">Alerts with Escalation</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">3</p>
              <p className="text-muted-foreground text-sm">Unassigned Alert Types</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">12 min</p>
              <p className="text-muted-foreground text-sm">Avg Escalation Time</p>
            </div>
          </div>

          {/* Alert Categories Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground">Execution Risk Alerts</h3>
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-2">12</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Alert Types</span>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                  Complete
                </span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground">SLA Breach Alerts</h3>
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-2">6</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Alert Types</span>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                  Complete
                </span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground">Integration Health</h3>
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Settings className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-2">4</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Alert Types</span>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs">
                  Incomplete
                </span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground">System & Platform</h3>
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-slate-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-2">2</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Alert Types</span>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                  Complete
                </span>
              </div>
            </div>
          </div>

          {/* Alert Types Configuration Table */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-foreground">Alert Types Configuration</h2>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-2 border border-border hover:bg-accent rounded-lg text-sm transition-colors">
                  Filter by Category
                </button>
                <button className="px-3 py-2 border border-border hover:bg-accent rounded-lg text-sm transition-colors">
                  Filter by Severity
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Alert Name</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Category</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Severity</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Routing Configured</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Escalation Enabled</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {alertTypes.map((alert, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-foreground">{alert.name}</td>
                      <td className="px-4 py-3 text-foreground">{alert.category}</td>
                      <td className="px-4 py-3">
                        <SeverityBadge severity={alert.severity} />
                      </td>
                      <td className="px-4 py-3">
                        {alert.routing === 'Yes' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {alert.escalation === 'Yes' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-400" />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          alert.status === 'Active'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-slate-50 text-slate-600 border border-slate-200'
                        }`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-primary hover:text-blue-700 text-sm">Configure</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Escalation Policy Overview */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Escalation Policy Configuration</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-blue-900">Critical SLA Breach</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 border border-blue-300 rounded text-xs">3 Levels</span>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">Level 1:</span>
                    <span>Dispatch Manager → Wait 5 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">Level 2:</span>
                    <span>Operations Manager → Wait 10 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">Level 3:</span>
                    <span>Regional Director → Final</span>
                  </div>
                </div>
                <button className="mt-3 text-primary hover:text-blue-700 text-sm">Edit Policy</button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-amber-900">Driver Delay High Risk</h3>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded text-xs">2 Levels</span>
                </div>
                <div className="space-y-2 text-sm text-amber-800">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600">Level 1:</span>
                    <span>Dispatch Manager → Wait 8 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600">Level 2:</span>
                    <span>Operations Manager → Final</span>
                  </div>
                </div>
                <button className="mt-3 text-primary hover:text-blue-700 text-sm">Edit Policy</button>
              </div>
            </div>
          </div>

          {/* Quiet Hours & Throttling */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Quiet Hours & Throttling</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-foreground text-sm mb-3">Quiet Hours Configuration</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-foreground">Quiet Hours Enabled</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-foreground text-sm mb-2">Time Range (Northeast)</p>
                    <p className="text-muted-foreground text-sm">22:00 - 06:00</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-foreground text-sm mb-2">Exceptions</p>
                    <p className="text-muted-foreground text-sm">Critical alerts bypass quiet hours</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground text-sm mb-3">Throttling Rules</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-foreground text-sm mb-2">Max Alerts Per Hour</p>
                    <p className="text-muted-foreground text-sm">50 alerts</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-foreground text-sm mb-2">Group Similar Alerts</p>
                    <p className="text-muted-foreground text-sm">Enabled (5 min window)</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-foreground text-sm mb-2">Cool-down Period</p>
                    <p className="text-muted-foreground text-sm">3 minutes between similar alerts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Severity Badge Component
function SeverityBadge({ severity }: { severity: string }) {
  const config = {
    'Critical': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    'High': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    'Medium': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'Low': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  };

  const { bg, text, border } = config[severity as keyof typeof config] || config.Low;

  return (
    <span className={`px-2 py-1 ${bg} ${text} border ${border} rounded text-xs`}>
      {severity}
    </span>
  );
}
