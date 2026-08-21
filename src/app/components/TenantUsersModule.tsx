import { useState } from 'react';
import { Plus, Users, X, CheckCircle, Shield, Eye, AlertCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string | null;
  status: 'Active' | 'Invited' | 'Draft' | 'Suspended';
  createdDate: string;
}

interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface TenantUsersModuleProps {
  setupMode?: boolean;
  onFirstUserAdded?: () => void;
  onFirstRoleAssigned?: () => void;
}

export function TenantUsersModule({ setupMode = false, onFirstUserAdded, onFirstRoleAssigned }: TenantUsersModuleProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'admin-1',
      name: 'You (Tenant Admin)',
      email: 'admin@acmecorp.com',
      role: 'Tenant Admin',
      status: 'Active',
      createdDate: '2026-01-01'
    }
  ]);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showUserDetailsDialog, setShowUserDetailsDialog] = useState(false);
  const [showAssignRoleDialog, setShowAssignRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const roleTemplates: RoleTemplate[] = [
    {
      id: 'operations-manager',
      name: 'Operations Manager',
      description: 'Oversees operational performance, approves changes, and reviews outcomes',
      permissions: ['view_all', 'approve_changes', 'view_reports', 'manage_escalations', 'view_analytics']
    },
    {
      id: 'dispatch-manager',
      name: 'Dispatch Manager',
      description: 'Manages daily operations, assigns routes, and monitors delivery execution',
      permissions: ['view_routes', 'edit_routes', 'assign_drivers', 'view_analytics', 'manage_deliveries']
    },
    {
      id: 'fleet-supervisor',
      name: 'Fleet Supervisor',
      description: 'Oversees field teams and provides real-time driver support',
      permissions: ['view_drivers', 'manage_fleet', 'view_routes', 'support_drivers', 'view_analytics']
    },
    {
      id: 'viewer',
      name: 'Viewer / Read-only',
      description: 'View-only access to dashboards and reports without edit permissions',
      permissions: ['view_dashboard', 'view_reports', 'view_analytics']
    }
  ];

  const handleSaveUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: null,
      status: 'Draft',
      createdDate: new Date().toLocaleDateString()
    };

    setUsers([...users, newUser]);
    setShowAddUserDialog(false);
    setNewUserName('');
    setNewUserEmail('');

    // If this is the first non-admin user and we're in setup mode, notify parent
    if (setupMode && users.length === 1 && onFirstUserAdded) {
      onFirstUserAdded();
    }
  };

  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserDetailsDialog(true);
  };

  const handleOpenAssignRole = () => {
    setShowUserDetailsDialog(false);
    setShowAssignRoleDialog(true);
    setSelectedRole('');
  };

  const handleAssignRole = () => {
    if (!selectedUser || !selectedRole) return;

    const roleName = roleTemplates.find(r => r.id === selectedRole)?.name || '';
    
    // Update user with role and change status to Invited
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, role: roleName, status: 'Invited' as const }
        : user
    );
    
    setUsers(updatedUsers);
    setShowAssignRoleDialog(false);
    setSelectedUser(null);
    setSelectedRole('');

    // Check if this is the first role assignment
    const hadNoRolesAssigned = users.filter(u => u.role && u.id !== 'admin-1').length === 0;
    if (hadNoRolesAssigned && onFirstRoleAssigned) {
      onFirstRoleAssigned();
    }
  };

  const getStatusBadge = (status: User['status']) => {
    const styles = {
      Active: 'bg-green-50 text-green-700 border-green-200',
      Invited: 'bg-blue-50 text-blue-700 border-blue-200',
      Draft: 'bg-amber-50 text-amber-700 border-amber-200',
      Suspended: 'bg-red-50 text-red-700 border-red-200'
    };
    return styles[status];
  };

  const draftUsersCount = users.filter(u => u.status === 'Draft').length;

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-foreground mb-1">Users</h1>
            <p className="text-muted-foreground text-sm">
              Manage team members and their access
            </p>
          </div>
          <button
            onClick={() => setShowAddUserDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Setup mode banner */}
          {setupMode && users.length === 1 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Users className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-900 text-sm font-medium mb-1">
                  Add at least one team member to continue
                </p>
                <p className="text-amber-700 text-sm">
                  Create users now and assign roles when ready.
                </p>
              </div>
            </div>
          )}

          {/* Draft users banner */}
          {draftUsersCount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 text-sm font-medium mb-1">
                  {draftUsersCount} user{draftUsersCount > 1 ? 's' : ''} pending role assignment
                </p>
                <p className="text-blue-700 text-sm">
                  Users need a role to receive invitations and access the platform.
                </p>
              </div>
            </div>
          )}

          {/* Users Table */}
          <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Assigned Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id} className={`transition-colors ${user.status === 'Draft' ? 'bg-amber-50/30' : 'hover:bg-muted/50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="group relative">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                        {user.status === 'Draft' && (
                          <div className="absolute left-0 top-full mt-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <div className="bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                              Assign a role to activate this user
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role ? (
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-foreground">{user.role}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">None assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.id !== 'admin-1' && (
                        <button
                          onClick={() => handleViewUserDetails(user)}
                          className="flex items-center gap-1 text-sm text-primary hover:text-blue-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add User Dialog */}
      {showAddUserDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl border border-border w-full max-w-2xl">
            {/* Dialog Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-foreground font-medium">Add User</h2>
              <button
                onClick={() => setShowAddUserDialog(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              {/* User Information */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g., John Smith"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="john.smith@acmecorp.com"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Helper Text */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-900 text-sm">
                  You can assign a role now or later. Users need a role to become active.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddUserDialog(false)}
                  className="flex-1 py-2 px-4 bg-muted hover:bg-accent text-foreground rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  disabled={!newUserName.trim() || !newUserEmail.trim()}
                  className="flex-1 py-2 px-4 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Save User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Dialog */}
      {showUserDetailsDialog && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl border border-border w-full max-w-2xl">
            {/* Dialog Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-foreground font-medium">User Details</h2>
              <button
                onClick={() => {
                  setShowUserDetailsDialog(false);
                  setSelectedUser(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              {/* User Information Section */}
              <div className="mb-6">
                <h3 className="text-foreground text-sm font-medium mb-4">User Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="text-sm text-foreground font-medium">{selectedUser.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm text-foreground">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Created Date</span>
                    <span className="text-sm text-foreground">{selectedUser.createdDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Role Assignment Section */}
              <div className="mb-6 bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-foreground text-sm font-medium">Assigned Role</h3>
                  {selectedUser.role && (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-foreground font-medium">{selectedUser.role}</span>
                    </div>
                  )}
                </div>
                {!selectedUser.role && (
                  <>
                    <div className="flex items-start gap-2 mb-4">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Users must have a role to access the platform.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenAssignRole}
                      className="w-full py-2 px-4 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Assign Role
                    </button>
                  </>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowUserDetailsDialog(false);
                  setSelectedUser(null);
                }}
                className="w-full py-2 px-4 bg-muted hover:bg-accent text-foreground rounded-lg transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Role Dialog */}
      {showAssignRoleDialog && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl border border-border w-full max-w-2xl">
            {/* Dialog Header */}
            <div className="px-6 py-4 border-b border-border">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                <p className="text-blue-900 text-sm font-medium">
                  Assign role for user: {selectedUser.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAssignRoleDialog(false);
                  setShowUserDetailsDialog(true);
                }}
                className="absolute top-4 right-6 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              {/* Role Templates */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Role <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {roleTemplates.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedRole === role.id
                          ? 'border-primary bg-blue-50'
                          : 'border-border bg-muted hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 mt-0.5 ${
                          selectedRole === role.id ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {selectedRole === role.id ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-current rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-foreground font-medium text-sm mb-1">{role.name}</div>
                          <div className="text-muted-foreground text-xs mb-2">{role.description}</div>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map((permission, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-background text-muted-foreground text-xs rounded border border-border"
                              >
                                {permission.replace('_', ' ')}
                              </span>
                            ))}
                            {role.permissions.length > 3 && (
                              <span className="px-2 py-0.5 text-muted-foreground text-xs">
                                +{role.permissions.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAssignRoleDialog(false);
                    setShowUserDetailsDialog(true);
                  }}
                  className="flex-1 py-2 px-4 bg-muted hover:bg-accent text-foreground rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignRole}
                  disabled={!selectedRole}
                  className="flex-1 py-2 px-4 bg-primary hover:bg-blue-700 text-primary-foreground rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Assign Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}