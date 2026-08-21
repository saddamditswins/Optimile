import { useState } from 'react';
import { Search, Filter, Calendar, User, Shield, Settings, HelpCircle, Clock } from 'lucide-react';

interface ActivityRecord {
  id: string;
  timestamp: string;
  action: string;
  entityType: 'User' | 'Role' | 'Setting' | 'Support';
  entityName: string;
  performedBy: string;
  description: string;
  date: string;
}

export function TenantActivityLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('all');
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('all');
  const [performedByFilter, setPerformedByFilter] = useState<string>('all');

  // Sample activity data grouped by dates
  const activityRecords: ActivityRecord[] = [
    {
      id: 'act-001',
      timestamp: '10:32 AM',
      action: 'Role Assigned',
      entityType: 'User',
      entityName: 'John Doe',
      performedBy: 'Sarah Chen',
      description: "Role 'Dispatch Manager' assigned to user John Doe",
      date: 'today'
    },
    {
      id: 'act-002',
      timestamp: '09:15 AM',
      action: 'User Created',
      entityType: 'User',
      entityName: 'Michael Torres',
      performedBy: 'Sarah Chen',
      description: 'New user Michael Torres created in Draft status',
      date: 'today'
    },
    {
      id: 'act-003',
      timestamp: '08:47 AM',
      action: 'Setting Updated',
      entityType: 'Setting',
      entityName: 'Company Settings',
      performedBy: 'Sarah Chen',
      description: 'Company name updated from "Acme Logistics" to "Acme Last-Mile"',
      date: 'today'
    },
    {
      id: 'act-004',
      timestamp: '04:23 PM',
      action: 'Role Unassigned',
      entityType: 'User',
      entityName: 'Emily Watson',
      performedBy: 'Sarah Chen',
      description: "Role 'Fleet Supervisor' removed from user Emily Watson",
      date: 'yesterday'
    },
    {
      id: 'act-005',
      timestamp: '02:18 PM',
      action: 'User Activated',
      entityType: 'User',
      entityName: 'David Park',
      performedBy: 'Sarah Chen',
      description: 'User David Park activated from Draft status',
      date: 'yesterday'
    },
    {
      id: 'act-006',
      timestamp: '11:05 AM',
      action: 'Permission Modified',
      entityType: 'Role',
      entityName: 'Operations Manager',
      performedBy: 'Sarah Chen',
      description: "Permission 'Audit Access' enabled for role Operations Manager",
      date: 'yesterday'
    },
    {
      id: 'act-007',
      timestamp: '03:42 PM',
      action: 'Support Request',
      entityType: 'Support',
      entityName: 'Integration Setup',
      performedBy: 'Sarah Chen',
      description: 'Support ticket submitted for API integration assistance',
      date: '2026-12-04'
    },
    {
      id: 'act-008',
      timestamp: '01:30 PM',
      action: 'User Created',
      entityType: 'User',
      entityName: 'Lisa Anderson',
      performedBy: 'Sarah Chen',
      description: 'New user Lisa Anderson created in Draft status',
      date: '2026-12-04'
    },
    {
      id: 'act-009',
      timestamp: '10:15 AM',
      action: 'Role Assigned',
      entityType: 'User',
      entityName: 'Lisa Anderson',
      performedBy: 'Sarah Chen',
      description: "Role 'Operations Manager' assigned to user Lisa Anderson",
      date: '2026-12-04'
    }
  ];

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'User':
        return <User className="w-4 h-4" />;
      case 'Role':
        return <Shield className="w-4 h-4" />;
      case 'Setting':
        return <Settings className="w-4 h-4" />;
      case 'Support':
        return <HelpCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getDateLabel = (date: string) => {
    if (date === 'today') return 'Today (6 Jan 2026)';
    if (date === 'yesterday') return 'Yesterday (5 Jan 2026)';
    return '4 Jan 2026';
  };

  // Filter records
  const filteredRecords = activityRecords.filter((record) => {
    const matchesSearch = 
      searchQuery === '' ||
      record.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.performedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEntityType = entityTypeFilter === 'all' || record.entityType === entityTypeFilter;
    const matchesActionType = actionTypeFilter === 'all' || record.action === actionTypeFilter;
    const matchesPerformedBy = performedByFilter === 'all' || record.performedBy === performedByFilter;

    return matchesSearch && matchesEntityType && matchesActionType && matchesPerformedBy;
  });

  // Group by date
  const groupedRecords: { [key: string]: ActivityRecord[] } = {};
  filteredRecords.forEach((record) => {
    if (!groupedRecords[record.date]) {
      groupedRecords[record.date] = [];
    }
    groupedRecords[record.date].push(record);
  });

  const dateOrder = ['today', 'yesterday', '2026-12-04'];

  // Get unique values for filters
  const uniquePerformers = Array.from(new Set(activityRecords.map(r => r.performedBy)));
  const uniqueActions = Array.from(new Set(activityRecords.map(r => r.action)));

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Activity Log</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Chronological record of administrative actions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b bg-card">
        <div className="px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by user, role, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Entity Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={entityTypeFilter}
                onChange={(e) => setEntityTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Types</option>
                <option value="User">User</option>
                <option value="Role">Role</option>
                <option value="Setting">Setting</option>
                <option value="Support">Support</option>
              </select>
            </div>

            {/* Action Type Filter */}
            <div>
              <select
                value={actionTypeFilter}
                onChange={(e) => setActionTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Actions</option>
                {uniqueActions.map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>

            {/* Performed By Filter */}
            <div>
              <select
                value={performedByFilter}
                onChange={(e) => setPerformedByFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Performers</option>
                {uniquePerformers.map((performer) => (
                  <option key={performer} value={performer}>
                    {performer}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          {Object.keys(groupedRecords).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Clock className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No activity recorded yet</p>
            </div>
          ) : (
            <div className="space-y-8">
              {dateOrder.map((date) => {
                if (!groupedRecords[date] || groupedRecords[date].length === 0) return null;

                return (
                  <div key={date}>
                    {/* Date Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <h2 className="text-sm font-medium text-foreground">
                        {getDateLabel(date)}
                      </h2>
                      <div className="flex-1 h-px bg-border"></div>
                    </div>

                    {/* Activity Grid */}
                    <div className="bg-card border rounded-lg overflow-hidden">
                      {/* Table Header */}
                      <div className="grid grid-cols-[100px_150px_120px_180px_150px_1fr] gap-4 px-6 py-3 bg-muted/30 border-b text-xs font-medium text-muted-foreground">
                        <div>Time</div>
                        <div>Action</div>
                        <div>Entity Type</div>
                        <div>Entity Name</div>
                        <div>Performed By</div>
                        <div>Description</div>
                      </div>

                      {/* Activity Rows */}
                      <div className="divide-y">
                        {groupedRecords[date].map((record) => (
                          <div
                            key={record.id}
                            className="grid grid-cols-[100px_150px_120px_180px_150px_1fr] gap-4 px-6 py-4 text-sm hover:bg-muted/20 transition-colors"
                          >
                            <div className="text-muted-foreground">{record.timestamp}</div>
                            <div className="font-medium text-foreground">{record.action}</div>
                            <div className="flex items-center gap-2 text-foreground">
                              {getEntityIcon(record.entityType)}
                              <span>{record.entityType}</span>
                            </div>
                            <div className="text-foreground">{record.entityName}</div>
                            <div className="text-muted-foreground">{record.performedBy}</div>
                            <div className="text-muted-foreground">{record.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
