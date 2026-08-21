import { Plus, CheckCircle, AlertTriangle, XCircle, Clock, Activity } from 'lucide-react';

export function TenantIntegrationsModule() {
  const integrations = [
    { 
      name: 'OrderMS Connector', 
      category: 'Order Management System', 
      status: 'connected', 
      lastSync: '2 minutes ago',
      trust: 'Trusted',
      uptime: '99.8%'
    },
    { 
      name: 'FleetTrack GPS', 
      category: 'Telematics / Driver Apps', 
      status: 'connected', 
      lastSync: '1 minute ago',
      trust: 'Trusted',
      uptime: '99.9%'
    },
    { 
      name: 'TransportHub TMS', 
      category: 'Transportation Management', 
      status: 'degraded', 
      lastSync: '45 minutes ago',
      trust: 'Limited',
      uptime: '94.2%'
    },
    { 
      name: 'RouteOptimizer API', 
      category: 'Other Data Feeds', 
      status: 'failed', 
      lastSync: '3 hours ago',
      trust: 'Suspended',
      uptime: '78.5%'
    },
    { 
      name: 'CustomerPortal Sync', 
      category: 'Order Management System', 
      status: 'not-connected', 
      lastSync: 'Never',
      trust: 'Not Configured',
      uptime: 'N/A'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-foreground">Integrations</h1>
            <p className="text-muted-foreground text-sm">Manage external system connections and data feeds</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm">
            <Plus className="w-5 h-5" />
            <span>Add Integration</span>
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
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">5</p>
              <p className="text-muted-foreground text-sm">Total Integrations</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">2</p>
              <p className="text-muted-foreground text-sm">Connected & Healthy</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">1</p>
              <p className="text-muted-foreground text-sm">Degraded Performance</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-2xl text-foreground mb-1">1</p>
              <p className="text-muted-foreground text-sm">Failed Connection</p>
            </div>
          </div>

          {/* Integration Categories */}
          <div>
            <h2 className="text-foreground mb-4">Integration Inventory</h2>
            
            {/* Order Management Systems */}
            <div className="mb-6">
              <h3 className="text-foreground text-sm mb-3 px-2">Order Management Systems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.filter(i => i.category === 'Order Management System').map((integration, index) => (
                  <IntegrationCard key={index} integration={integration} />
                ))}
              </div>
            </div>

            {/* Transportation Management */}
            <div className="mb-6">
              <h3 className="text-foreground text-sm mb-3 px-2">Transportation Management Systems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.filter(i => i.category === 'Transportation Management').map((integration, index) => (
                  <IntegrationCard key={index} integration={integration} />
                ))}
              </div>
            </div>

            {/* Telematics */}
            <div className="mb-6">
              <h3 className="text-foreground text-sm mb-3 px-2">Telematics / Driver Apps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.filter(i => i.category === 'Telematics / Driver Apps').map((integration, index) => (
                  <IntegrationCard key={index} integration={integration} />
                ))}
              </div>
            </div>

            {/* Other Data Feeds */}
            <div className="mb-6">
              <h3 className="text-foreground text-sm mb-3 px-2">Other Data Feeds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.filter(i => i.category === 'Other Data Feeds').map((integration, index) => (
                  <IntegrationCard key={index} integration={integration} />
                ))}
              </div>
            </div>
          </div>

          {/* Integration Health Monitoring */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-foreground mb-4">Integration Health & Monitoring</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Integration</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Uptime (30d)</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Last Sync</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Trust Level</th>
                    <th className="px-4 py-3 text-left text-foreground text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {integrations.map((integration, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-foreground">{integration.name}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={integration.status} />
                      </td>
                      <td className="px-4 py-3 text-foreground">{integration.uptime}</td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{integration.lastSync}</td>
                      <td className="px-4 py-3">
                        <TrustBadge trust={integration.trust} />
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-primary hover:text-blue-700 text-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Integration Card Component
function IntegrationCard({ integration }: { integration: any }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Activity className="w-6 h-6 text-blue-600" />
        </div>
        <StatusBadge status={integration.status} />
      </div>
      
      <h3 className="text-foreground mb-2">{integration.name}</h3>
      <p className="text-muted-foreground text-sm mb-4">{integration.category}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Sync:</span>
          <span className="text-foreground">{integration.lastSync}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Trust Level:</span>
          <TrustBadge trust={integration.trust} />
        </div>
      </div>
      
      <div className="flex gap-2">
        {integration.status === 'not-connected' ? (
          <button className="flex-1 px-3 py-2 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg text-sm transition-colors">
            Configure
          </button>
        ) : (
          <>
            <button className="flex-1 px-3 py-2 border border-border hover:bg-accent text-foreground rounded-lg text-sm transition-colors">
              View Details
            </button>
            {integration.status === 'degraded' || integration.status === 'failed' ? (
              <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                Run Test
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const config = {
    connected: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Connected', icon: CheckCircle },
    degraded: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Degraded', icon: AlertTriangle },
    failed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Failed', icon: XCircle },
    'not-connected': { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', label: 'Not Connected', icon: Clock }
  };

  const { bg, text, border, label, icon: Icon } = config[status as keyof typeof config] || config['not-connected'];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 ${bg} ${text} border ${border} rounded text-xs`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

// Trust Badge Component
function TrustBadge({ trust }: { trust: string }) {
  const config = {
    'Trusted': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    'Limited': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'Suspended': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    'Not Configured': { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' }
  };

  const { bg, text, border } = config[trust as keyof typeof config] || config['Not Configured'];

  return (
    <span className={`px-2 py-1 ${bg} ${text} border ${border} rounded text-xs`}>
      {trust}
    </span>
  );
}
