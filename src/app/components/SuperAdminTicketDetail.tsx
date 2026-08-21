import { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Flag, ExternalLink, FileText } from 'lucide-react';

interface SuperAdminTicketDetailProps {
  ticketId: string;
  onClose: () => void;
  onNavigateToTenant: () => void;
}

export function SuperAdminTicketDetail({ ticketId, onClose, onNavigateToTenant }: SuperAdminTicketDetailProps) {
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  const [actionReason, setActionReason] = useState('');

  // Mock ticket data
  const ticket = {
    id: ticketId,
    tenantName: 'GlobalLogistics Corp',
    tenantId: 'TNT-7892',
    tenantStatus: 'Active',
    category: 'Subscription',
    priority: 'Critical',
    status: 'Open',
    createdDate: '2026-01-04T10:30:00',
    slaDeadline: '2026-01-05T10:30:00',
    description: 'We are unable to add new users to our account despite being on the Enterprise plan which should allow unlimited users. When attempting to invite new users, we receive an error message: "User limit exceeded." This is blocking our onboarding of 15 new delivery coordinators scheduled to start on Monday.',
    attachments: [
      { name: 'screenshot-error.png', size: '245 KB' },
      { name: 'user-list-export.csv', size: '12 KB' }
    ],
    tags: ['user-management', 'plan-limits', 'urgent'],
    subscriptionPlan: 'Enterprise (v4.1)',
    aiAccess: 'Allowed',
    // Pattern & History
    tenantTicketsLast30Days: 4,
    similarTicketsLast30Days: 12
  };

  const handleAction = (action: string) => {
    setShowConfirmation(action);
  };

  const executeAction = () => {
    // In real app, would call API
    alert(`Action executed: ${showConfirmation}\nReason: ${actionReason}`);
    setShowConfirmation(null);
    setActionReason('');
    if (showConfirmation === 'resolve') {
      onClose();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-50 text-red-700 border border-red-200';
      case 'High': return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Low': return 'bg-blue-50 text-blue-700 border border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Acknowledged': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'In Progress': return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'Resolved': return 'bg-green-50 text-green-700 border border-green-200';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-foreground text-xl">Ticket Detail</h2>
              <p className="text-muted-foreground text-sm">Read-only governance view</p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              
              {/* SECTION A — TICKET SUMMARY */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-foreground mb-4">Ticket Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">Ticket ID</p>
                    <p className="text-foreground text-lg">{ticket.id}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">Category</p>
                    <p className="text-foreground">{ticket.category}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">Priority</p>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">Current Status</p>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">Created Date</p>
                    <p className="text-foreground">{new Date(ticket.createdDate).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">SLA Deadline</p>
                    <p className="text-red-600">{new Date(ticket.slaDeadline).toLocaleString()}</p>
                    <p className="text-red-500 text-xs mt-1">Breached 18 hours ago</p>
                  </div>
                </div>
              </div>

              {/* SECTION B — TENANT CONTEXT */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-foreground mb-4">Tenant Context</h3>
                <p className="text-muted-foreground text-sm mb-4">Ensure decisions are context-aware</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">Tenant Name</p>
                    <p className="text-foreground">{ticket.tenantName}</p>
                    <p className="text-muted-foreground text-xs mt-1">{ticket.tenantId}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">Tenant Status</p>
                    <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                      {ticket.tenantStatus}
                    </span>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">Subscription Plan</p>
                    <p className="text-foreground">{ticket.subscriptionPlan}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm mb-1">AI Access Status</p>
                    <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                      {ticket.aiAccess}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION C — TICKET DESCRIPTION */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-foreground mb-4">Ticket Description</h3>
                
                <div className="p-4 bg-muted rounded-lg mb-4">
                  <p className="text-foreground whitespace-pre-wrap">{ticket.description}</p>
                </div>

                {/* Attachments */}
                <div className="mb-4">
                  <p className="text-foreground mb-2">Attachments</p>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-foreground text-sm">{attachment.name}</p>
                          <p className="text-muted-foreground text-xs">{attachment.size}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-foreground mb-2">System-Assigned Tags (Read-Only)</p>
                  <div className="flex flex-wrap gap-2">
                    {ticket.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION D — PATTERN & HISTORY */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-foreground mb-4">Pattern & History</h3>
                <p className="text-muted-foreground text-sm mb-4">Help identify recurring or systemic issues</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                      <span className="text-amber-900">Tenant Pattern</span>
                    </div>
                    <p className="text-amber-700 text-sm mb-1">
                      This tenant has raised <strong>{ticket.tenantTicketsLast30Days} tickets</strong> in the last 30 days
                    </p>
                    <p className="text-amber-600 text-xs">Above average — may indicate tenant health risk</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-blue-700" />
                      <span className="text-blue-900">Similar Tickets</span>
                    </div>
                    <p className="text-blue-700 text-sm mb-1">
                      <strong>{ticket.similarTicketsLast30Days} similar tickets</strong> across all tenants (last 30 days)
                    </p>
                    <p className="text-blue-600 text-xs">May indicate systemic platform issue</p>
                  </div>
                </div>
              </div>

              {/* SECTION E — GOVERNANCE ACTIONS */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-foreground mb-4">Governance Actions</h3>
                <p className="text-muted-foreground text-sm mb-4">All actions require confirmation and are audit-logged</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAction('acknowledge')}
                    className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-foreground">Acknowledge Ticket</span>
                  </button>

                  <button
                    onClick={() => handleAction('escalate')}
                    className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-foreground">Escalate to Internal Team</span>
                  </button>

                  <button
                    onClick={() => handleAction('flag')}
                    className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                    <span className="text-foreground">Flag Tenant for Review</span>
                  </button>

                  <button
                    onClick={onNavigateToTenant}
                    className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-foreground">View in Tenant Management</span>
                  </button>

                  <button
                    onClick={() => handleAction('resolve')}
                    className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors md:col-span-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Ticket as Resolved</span>
                  </button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 text-sm">
                    <strong>Note:</strong> Super Admins never reply directly to tickets. All communication is handled through internal support channels.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border bg-muted flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-foreground">Confirm Action</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-muted-foreground text-sm mb-3">
                You are about to: <strong>{showConfirmation}</strong>
              </p>
              <label className="block text-sm text-foreground mb-2">
                Reason {showConfirmation === 'resolve' ? '(Required)' : '(Optional)'}
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter reason for audit trail..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmation(null);
                  setActionReason('');
                }}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                disabled={showConfirmation === 'resolve' && !actionReason}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
