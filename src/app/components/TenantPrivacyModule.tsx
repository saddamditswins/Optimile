import { Shield, Database, Lock, FileCheck, AlertTriangle, CheckCircle } from 'lucide-react';

export function TenantPrivacyModule() {
  const dataCategories = [
    { name: 'Orders', sensitivity: 'Medium', containsPII: 'Yes', regulatory: 'GDPR', retention: '7 years' },
    { name: 'Routes', sensitivity: 'Low', containsPII: 'No', regulatory: 'Internal', retention: '3 years' },
    { name: 'Stops', sensitivity: 'High', containsPII: 'Yes', regulatory: 'GDPR', retention: '7 years' },
    { name: 'Driver Data', sensitivity: 'High', containsPII: 'Yes', regulatory: 'GDPR, Local Law', retention: '10 years' },
    { name: 'User Activity', sensitivity: 'Medium', containsPII: 'Yes', regulatory: 'GDPR', retention: '2 years' },
    { name: 'Audit Logs', sensitivity: 'Medium', containsPII: 'No', regulatory: 'Internal', retention: '5 years' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 sm:px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-foreground">Data & Privacy</h1>
            <p className="text-muted-foreground text-sm">Manage data governance, retention, and privacy controls</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm self-start sm:self-auto">
            <FileCheck className="w-5 h-5" />
            <span>Generate Compliance Report</span>
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
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">6</p>
              <p className="text-muted-foreground text-sm">Retention Policies</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">4</p>
              <p className="text-muted-foreground text-sm">Anonymization Rules</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">6</p>
              <p className="text-muted-foreground text-sm">Data Categories</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">Compliant</p>
              <p className="text-muted-foreground text-sm">Compliance Status</p>
            </div>
          </div>

          {/* Data Categories & Classification */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h2 className="text-foreground">Data Categories & Classification</h2>
              <button className="text-primary hover:text-blue-700 text-sm self-start sm:self-auto">Edit Classification</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Data Category</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Data Sensitivity</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Contains PII</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Regulatory Tag</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Retention Period</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dataCategories.map((category, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-foreground">{category.name}</td>
                      <td className="px-4 py-3">
                        <SensitivityBadge sensitivity={category.sensitivity} />
                      </td>
                      <td className="px-4 py-3">
                        {category.containsPII === 'Yes' ? (
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-foreground text-sm">{category.regulatory}</td>
                      <td className="px-4 py-3 text-foreground text-sm">{category.retention}</td>
                      <td className="px-4 py-3">
                        <button className="text-primary hover:text-blue-700 text-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Retention Policies */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h2 className="text-foreground">Retention Policy Configuration</h2>
              <button className="px-4 py-2 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg text-sm transition-colors self-start sm:self-auto">
                Add Policy
              </button>
            </div>

            <div className="space-y-3">
              {[
                { category: 'Orders', duration: '7 years', trigger: 'Delivery Completed', status: 'Active', tier: 'Cold' },
                { category: 'Driver Data', duration: '10 years', trigger: 'Account Deactivated', status: 'Active', tier: 'Archived' },
                { category: 'User Activity', duration: '2 years', trigger: 'Event Timestamp', status: 'Active', tier: 'Hot' },
                { category: 'Audit Logs', duration: '5 years', trigger: 'Event Timestamp', status: 'Active', tier: 'Cold' }
              ].map((policy, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-foreground">{policy.category}</h3>
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                        {policy.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <span>Duration: {policy.duration}</span>
                      <span>Trigger: {policy.trigger}</span>
                      <span>Storage: {policy.tier}</span>
                    </div>
                  </div>
                  <button className="text-primary hover:text-blue-700 text-sm self-start sm:self-auto">Edit Policy</button>
                </div>
              ))}
            </div>
          </div>

          {/* Anonymization Rules */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h2 className="text-foreground">Anonymization & De-identification Rules</h2>
              <button className="px-4 py-2 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg text-sm transition-colors self-start sm:self-auto">
                Add Rule
              </button>
            </div>

            <div className="space-y-3">
              {[
                { category: 'Driver Data', field: 'Name', method: 'Pseudonymization', trigger: 'After 90 days', reversible: 'No' },
                { category: 'Stops', field: 'Address', method: 'Masking', trigger: 'After 180 days', reversible: 'No' },
                { category: 'User Activity', field: 'Phone', method: 'Hashing', trigger: 'After 60 days', reversible: 'No' },
                { category: 'Orders', field: 'GPS Coordinates', method: 'Deletion', trigger: 'After 1 year', reversible: 'No' }
              ].map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div>
                      <p className="text-foreground text-sm">{rule.category}</p>
                      <p className="text-muted-foreground text-xs">{rule.field}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Method</p>
                      <p className="text-foreground text-sm">{rule.method}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Trigger</p>
                      <p className="text-foreground text-sm">{rule.trigger}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Reversible</p>
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded text-xs">
                        {rule.reversible}
                      </span>
                    </div>
                    <div className="flex items-center justify-end">
                      <button className="text-primary hover:text-blue-700 text-sm">Edit Rule</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Lifecycle Jobs */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Data Deletion & Lifecycle Jobs</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Job Type</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Data Category</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Schedule</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Last Run</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Records Affected</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { type: 'Retention', category: 'Orders', schedule: 'Daily', lastRun: '2 hours ago', records: '1,247', status: 'Success' },
                    { type: 'Anonymization', category: 'Driver Data', schedule: 'Weekly', lastRun: '3 days ago', records: '89', status: 'Success' },
                    { type: 'Deletion', category: 'User Activity', schedule: 'Monthly', lastRun: '12 days ago', records: '5,632', status: 'Success' },
                    { type: 'Anonymization', category: 'Stops', schedule: 'Daily', lastRun: '1 hour ago', records: '0', status: 'Partial' }
                  ].map((job, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-foreground">{job.type}</td>
                      <td className="px-4 py-3 text-foreground">{job.category}</td>
                      <td className="px-4 py-3 text-foreground text-sm">{job.schedule}</td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{job.lastRun}</td>
                      <td className="px-4 py-3 text-foreground text-sm">{job.records}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          job.status === 'Success' 
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : job.status === 'Partial'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-primary hover:text-blue-700 text-sm">View Logs</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Summary */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Compliance & Regulatory Mapping</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-green-900">GDPR Compliance</h3>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex items-center justify-between">
                    <span>Retention Policies</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Anonymization</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Export Controls</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Logging</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-blue-900">Internal Data Policy</h3>
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center justify-between">
                    <span>Access Controls</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Encryption at Rest</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Regular Backups</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Incident Response</span>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
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

// Sensitivity Badge Component
function SensitivityBadge({ sensitivity }: { sensitivity: string }) {
  const config = {
    'High': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    'Medium': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'Low': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
  };

  const { bg, text, border } = config[sensitivity as keyof typeof config] || config.Low;

  return (
    <span className={`px-2 py-1 ${bg} ${text} border ${border} rounded text-xs`}>
      {sensitivity}
    </span>
  );
}
