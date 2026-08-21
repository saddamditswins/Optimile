import { FileText, Search, Filter, Download, Clock, User, Settings, Database, Bell, Shield } from 'lucide-react';

export function TenantAuditModule() {
  const recentChanges = [
    { timestamp: '2 hours ago', module: 'Users', type: 'User Added', object: 'john.doe@acme.com', severity: 'Medium', changedBy: 'Sarah Johnson' },
    { timestamp: '5 hours ago', module: 'Integrations', type: 'Status Change', object: 'TransportHub TMS', severity: 'High', changedBy: 'System' },
    { timestamp: '1 day ago', module: 'Settings', type: 'SLA Modified', object: 'Premium Delivery SLA', severity: 'High', changedBy: 'Michael Chen' },
    { timestamp: '1 day ago', module: 'Notifications', type: 'Routing Updated', object: 'Driver Delay Alert', severity: 'Medium', changedBy: 'Sarah Johnson' },
    { timestamp: '2 days ago', module: 'Data & Privacy', type: 'Policy Activated', object: 'Order Retention Policy', severity: 'High', changedBy: 'Emily Rodriguez' },
    { timestamp: '3 days ago', module: 'Users', type: 'Role Changed', object: 'david.park@acme.com', severity: 'High', changedBy: 'Sarah Johnson' },
    { timestamp: '3 days ago', module: 'Integrations', type: 'Connection Test', object: 'OrderMS Connector', severity: 'Low', changedBy: 'Michael Chen' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-foreground">Audit Super-View</h1>
            <p className="text-muted-foreground text-sm">Track all governance events and configuration changes</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm">
            <Download className="w-5 h-5" />
            <span>Export Audit Log</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">147</p>
              <p className="text-muted-foreground text-sm">Changes (7 days)</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">23</p>
              <p className="text-muted-foreground text-sm">Policy Changes</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">12</p>
              <p className="text-muted-foreground text-sm">User Access Changes</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">8</p>
              <p className="text-muted-foreground text-sm">Integration Changes</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">6</p>
              <p className="text-muted-foreground text-sm">Alert Config Changes</p>
            </div>
          </div>

          {/* Audit Coverage */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Audit Coverage by Module</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { module: 'Settings', icon: Settings, status: 'Complete' },
                { module: 'Users', icon: User, status: 'Complete' },
                { module: 'Integrations', icon: Database, status: 'Complete' },
                { module: 'Notifications', icon: Bell, status: 'Complete' },
                { module: 'Privacy', icon: Shield, status: 'Complete' },
                { module: 'Operations', icon: FileText, status: 'Partial' },
                { module: 'Dashboard', icon: FileText, status: 'Complete' },
                { module: 'Audit', icon: FileText, status: 'Complete' }
              ].map((item, index) => (
                <div key={index} className="p-3 border border-border rounded-lg hover:bg-accent transition-colors">
                  <item.icon className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-foreground text-sm mb-1">{item.module}</p>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    item.status === 'Complete'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search audit entries..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
                <span>Module</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors">
                <Clock className="w-5 h-5" />
                <span>Last 7 Days</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors">
                <User className="w-5 h-5" />
                <span>All Users</span>
              </button>
            </div>
          </div>

          {/* Recent Critical Changes */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Recent Critical Changes</h2>
            <div className="space-y-3">
              {recentChanges.filter(c => c.severity === 'High').map((change, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-amber-200 bg-amber-50 rounded-lg">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-foreground">{change.type}</h3>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded text-xs">
                        {change.severity}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs">
                        {change.module}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{change.object}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {change.timestamp}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {change.changedBy}
                      </span>
                    </div>
                  </div>
                  <button className="text-primary hover:text-blue-700 text-sm">View Details</button>
                </div>
              ))}
            </div>
          </div>

          {/* Unified Audit Timeline */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground">Unified Audit Timeline</h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-border hover:bg-accent rounded-lg text-sm transition-colors">
                  Filter by Severity
                </button>
                <button className="px-3 py-2 border border-border hover:bg-accent rounded-lg text-sm transition-colors">
                  Filter by Actor
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Timestamp</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Module</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Change Type</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Object Affected</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Severity</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Changed By</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentChanges.map((change, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-muted-foreground text-sm">{change.timestamp}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs">
                          {change.module}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">{change.type}</td>
                      <td className="px-4 py-3 text-foreground">{change.object}</td>
                      <td className="px-4 py-3">
                        <SeverityBadge severity={change.severity} />
                      </td>
                      <td className="px-4 py-3 text-foreground">{change.changedBy}</td>
                      <td className="px-4 py-3">
                        <button className="text-primary hover:text-blue-700 text-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Access & Authority Change Audit */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Access & Authority Change Audit</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-600 text-sm mb-1">Role Changes</p>
                <p className="text-2xl text-blue-900">7</p>
                <p className="text-blue-600 text-xs mt-1">Last 30 days</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm mb-1">Scope Expansions</p>
                <p className="text-2xl text-green-900">3</p>
                <p className="text-green-600 text-xs mt-1">Last 30 days</p>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-600 text-sm mb-1">Suspensions</p>
                <p className="text-2xl text-amber-900">2</p>
                <p className="text-amber-600 text-xs mt-1">Last 30 days</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">User</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Change Type</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Before</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">After</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Changed By</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { user: 'david.park@acme.com', type: 'Role', before: 'Fleet Supervisor', after: 'Dispatch Manager', changedBy: 'Sarah Johnson', time: '3 days ago' },
                    { user: 'lisa.wang@acme.com', type: 'Scope', before: 'Central Region', after: 'Central, West Regions', changedBy: 'Michael Chen', time: '5 days ago' },
                    { user: 'john.smith@acme.com', type: 'Suspension', before: 'Active', after: 'Suspended', changedBy: 'Sarah Johnson', time: '1 week ago' }
                  ].map((entry, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-foreground">{entry.user}</td>
                      <td className="px-4 py-3 text-foreground">{entry.type}</td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{entry.before}</td>
                      <td className="px-4 py-3 text-foreground">{entry.after}</td>
                      <td className="px-4 py-3 text-foreground">{entry.changedBy}</td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{entry.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Snapshot */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground">Compliance Snapshot & Evidence Pack</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                <Download className="w-5 h-5" />
                <span>Generate Evidence Pack</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-foreground text-sm mb-3">Compliance Checklist</h3>
                <div className="space-y-2">
                  {[
                    { item: 'Retention Policies Active', status: true },
                    { item: 'Anonymization Rules Active', status: true },
                    { item: 'Export Controls Enforced', status: true },
                    { item: 'Audit Logging Enabled', status: true }
                  ].map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-foreground text-sm">{check.item}</span>
                      {check.status ? (
                        <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs">
                          Inactive
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-foreground text-sm mb-3">Evidence Summary</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-900 text-sm mb-1">Linked Audit Logs</p>
                    <p className="text-2xl text-blue-900">1,247</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-900 text-sm mb-1">Policy Summaries</p>
                    <p className="text-2xl text-green-900">18</p>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-900 text-sm mb-1">Last Generated</p>
                    <p className="text-amber-900">Dec 15, 2025</p>
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
    'High': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
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
