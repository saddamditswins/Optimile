import { Mail, Phone, MessageSquare, Book, ExternalLink, HelpCircle } from 'lucide-react';

export function TenantSupportModule() {
  const supportChannels = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      action: 'Send Email',
      link: 'mailto:support@optimile.com',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      action: 'Start Chat',
      link: '#',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Call us during business hours (9 AM - 6 PM EST)',
      action: 'Call Now',
      link: 'tel:+1-800-OPTIMILE',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const resources = [
    {
      icon: <Book className="w-5 h-5" />,
      title: 'Documentation',
      description: 'Browse guides and tutorials',
      link: '#'
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: 'Knowledge Base',
      description: 'Find answers to common questions',
      link: '#'
    },
    {
      icon: <ExternalLink className="w-5 h-5" />,
      title: 'Video Tutorials',
      description: 'Watch step-by-step videos',
      link: '#'
    }
  ];

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-foreground mb-1">Contact & Support</h1>
          <p className="text-muted-foreground text-sm">
            Get help and connect with our support team
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Support Channels */}
          <div className="mb-8">
            <h2 className="text-foreground text-sm font-medium mb-4">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportChannels.map((channel, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-12 h-12 ${channel.color} rounded-lg flex items-center justify-center mb-4`}>
                    {channel.icon}
                  </div>
                  <h3 className="text-foreground font-medium mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {channel.description}
                  </p>
                  <a
                    href={channel.link}
                    className="inline-flex items-center gap-2 text-primary hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    {channel.action}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="mb-8">
            <h2 className="text-foreground text-sm font-medium mb-4">Resources</h2>
            <div className="bg-card rounded-lg shadow-sm border border-border divide-y divide-border">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="flex items-center justify-between p-4 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      {resource.icon}
                    </div>
                    <div>
                      <div className="text-foreground font-medium text-sm mb-1">
                        {resource.title}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {resource.description}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h2 className="text-foreground text-sm font-medium mb-4">Account Information</h2>
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Tenant Name</span>
                  <span className="text-sm text-foreground font-medium">ACME Corporation</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Account ID</span>
                  <span className="text-sm text-foreground font-mono">TNT-2026-001</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Support Plan</span>
                  <span className="px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-medium">
                    Enterprise
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Primary Contact</span>
                  <span className="text-sm text-foreground">admin@acmecorp.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 text-sm font-medium mb-1">
                Need urgent assistance?
              </p>
              <p className="text-blue-700 text-sm">
                For critical issues affecting your operations, please call our 24/7 emergency hotline at +1-800-OPTIMILE-911.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
