import { useState } from 'react';
import { Info, Filter, Download, X, Lock, FileText, Database } from 'lucide-react';

type EntityType = 'all' | 'driver' | 'vehicle';
type ChangeType = 'all' | 'creation' | 'status-change' | 'availability-update' | 'compliance-update' | 'maintenance-declaration';
type Source = 'manual' | 'system';

interface ActivityRecord {
  id: string;
  timestamp: string;
  entityType: 'driver' | 'vehicle';
  entityId: string;
  changeType: string;
  fieldAffected: string;
  previousValue: string;
  newValue: string;
  changedBy: string;
  userRole: string;
  source: Source;
  systemValidation: 'passed' | 'flagged';
}

export function FleetActivityLog() {
  const [dateFrom, setDateFrom] = useState<string>('2025-01-01');
  const [dateTo, setDateTo] = useState<string>('2025-01-06');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [entityFilter, setEntityFilter] = useState<EntityType>('all');
  const [changeTypeFilter, setChangeTypeFilter] = useState<ChangeType>('all');
  const [selectedRecord, setSelectedRecord] = useState<ActivityRecord | null>(null);

  // Mock data - in production this would come from an immutable audit log
  const activityRecords: ActivityRecord[] = [
    {
      id: 'LOG-2025-001234',
      timestamp: '2025-01-06T08:45:23.412Z',
      entityType: 'driver',
      entityId: 'DRV-00847',
      changeType: 'Status Change',
      fieldAffected: 'dispatch_eligibility',
      previousValue: 'Eligible',
      newValue: 'Blocked',
      changedBy: 'Sarah Mitchell',
      userRole: 'Fleet Supervisor',
      source: 'manual',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001233',
      timestamp: '2025-01-06T08:30:15.127Z',
      entityType: 'vehicle',
      entityId: 'VEH-01523',
      changeType: 'Maintenance Declaration',
      fieldAffected: 'maintenance_status',
      previousValue: 'Operational',
      newValue: 'Under Maintenance',
      changedBy: 'James Rodriguez',
      userRole: 'Fleet Supervisor',
      source: 'manual',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001232',
      timestamp: '2025-01-06T07:15:08.893Z',
      entityType: 'driver',
      entityId: 'DRV-00921',
      changeType: 'Compliance Update',
      fieldAffected: 'certification_expiry',
      previousValue: '2025-06-15',
      newValue: '2026-06-15',
      changedBy: 'System Automation',
      userRole: 'System',
      source: 'system',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001231',
      timestamp: '2025-01-06T06:00:02.156Z',
      entityType: 'driver',
      entityId: 'DRV-01042',
      changeType: 'Availability Update',
      fieldAffected: 'shift_availability',
      previousValue: 'Available',
      newValue: 'On Leave',
      changedBy: 'Michael Chen',
      userRole: 'Fleet Supervisor',
      source: 'manual',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001230',
      timestamp: '2025-01-05T16:45:33.421Z',
      entityType: 'vehicle',
      entityId: 'VEH-01687',
      changeType: 'Status Change',
      fieldAffected: 'operational_status',
      previousValue: 'Grounded',
      newValue: 'Eligible',
      changedBy: 'Sarah Mitchell',
      userRole: 'Fleet Supervisor',
      source: 'manual',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001229',
      timestamp: '2025-01-05T15:20:11.678Z',
      entityType: 'driver',
      entityId: 'DRV-00654',
      changeType: 'Compliance Update',
      fieldAffected: 'hos_limit',
      previousValue: '5.2 hours remaining',
      newValue: '0.0 hours remaining',
      changedBy: 'System Automation',
      userRole: 'System',
      source: 'system',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001228',
      timestamp: '2025-01-05T14:10:45.234Z',
      entityType: 'vehicle',
      entityId: 'VEH-01452',
      changeType: 'Compliance Update',
      fieldAffected: 'inspection_date',
      previousValue: '2024-11-15',
      newValue: '2025-01-05',
      changedBy: 'James Rodriguez',
      userRole: 'Fleet Supervisor',
      source: 'manual',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001227',
      timestamp: '2025-01-05T13:30:27.891Z',
      entityType: 'driver',
      entityId: 'DRV-00312',
      changeType: 'Creation',
      fieldAffected: 'driver_record',
      previousValue: 'N/A',
      newValue: 'Active',
      changedBy: 'Sarah Mitchell',
      userRole: 'Fleet Supervisor',
      source: 'manual',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001226',
      timestamp: '2025-01-05T11:15:02.543Z',
      entityType: 'vehicle',
      entityId: 'VEH-01734',
      changeType: 'Maintenance Declaration',
      fieldAffected: 'maintenance_status',
      previousValue: 'Under Maintenance',
      newValue: 'Operational',
      changedBy: 'Michael Chen',
      userRole: 'Fleet Supervisor',
      source: 'manual',
      systemValidation: 'passed',
    },
    {
      id: 'LOG-2025-001225',
      timestamp: '2025-01-05T09:45:18.167Z',
      entityType: 'driver',
      entityId: 'DRV-00523',
      changeType: 'Status Change',
      fieldAffected: 'dispatch_eligibility',
      previousValue: 'Blocked',
      newValue: 'Eligible',
      changedBy: 'Sarah Mitchell',
      userRole: 'Fleet Supervisor',
      source: 'manual',
      systemValidation: 'passed',
    },
  ];

  const filteredRecords = activityRecords.filter(record => {
    if (entityFilter !== 'all' && record.entityType !== entityFilter) return false;
    if (changeTypeFilter !== 'all') {
      const typeMatch = record.changeType.toLowerCase().replace(' ', '-');
      if (typeMatch !== changeTypeFilter) return false;
    }
    return true;
  });

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting ${filteredRecords.length} records as ${format.toUpperCase()}`);
    // In production, this would trigger actual export
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-foreground">Fleet Activity Log</h1>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300 flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                Immutable Records
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Authoritative audit trail of all fleet-side changes affecting readiness and eligibility</p>
          </div>

          {/* Ledger Context - Filters */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Record Scope</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Date Range */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Date From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2">Date To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Regions</option>
                  <option value="northeast">Northeast</option>
                  <option value="southeast">Southeast</option>
                  <option value="midwest">Midwest</option>
                  <option value="west">West</option>
                </select>
              </div>

              {/* Hub */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Hub</label>
                <select
                  value={selectedHub}
                  onChange={(e) => setSelectedHub(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Hubs</option>
                  <option value="hub-boston-01">Hub-Boston-01</option>
                  <option value="hub-boston-02">Hub-Boston-02</option>
                  <option value="hub-nyc-01">Hub-NYC-01</option>
                </select>
              </div>

              {/* Entity Type */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Entity Type</label>
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value as EntityType)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Entities</option>
                  <option value="driver">Drivers</option>
                  <option value="vehicle">Vehicles</option>
                </select>
              </div>

              {/* Change Type */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Change Type</label>
                <select
                  value={changeTypeFilter}
                  onChange={(e) => setChangeTypeFilter(e.target.value as ChangeType)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Changes</option>
                  <option value="creation">Creation</option>
                  <option value="status-change">Status Change</option>
                  <option value="availability-update">Availability Update</option>
                  <option value="compliance-update">Compliance Update</option>
                  <option value="maintenance-declaration">Maintenance Declaration</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Database className="w-3.5 h-3.5" />
                <span>These records are system-generated and cannot be modified.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport('csv')}
                  className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Activity Ledger Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden overflow-x-auto">
          {/* Table Header */}
          <div className="border-b border-border bg-muted/30 min-w-[960px]">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground">
              <div className="col-span-2">Timestamp (UTC)</div>
              <div className="col-span-1">Entity Type</div>
              <div className="col-span-1">Entity ID</div>
              <div className="col-span-1">Change Type</div>
              <div className="col-span-2">Field Affected</div>
              <div className="col-span-1">Previous Value</div>
              <div className="col-span-1">New Value</div>
              <div className="col-span-2">Changed By</div>
              <div className="col-span-1">Source</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border min-w-[960px]">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <button
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className="w-full grid grid-cols-12 gap-4 px-4 py-3 text-xs text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="col-span-2 font-mono text-foreground">
                    {new Date(record.timestamp).toLocaleString('en-US', { 
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    })}
                  </div>
                  <div className="col-span-1">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      record.entityType === 'driver'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {record.entityType === 'driver' ? 'Driver' : 'Vehicle'}
                    </span>
                  </div>
                  <div className="col-span-1 font-mono text-foreground">{record.entityId}</div>
                  <div className="col-span-1 text-muted-foreground">{record.changeType}</div>
                  <div className="col-span-2 text-foreground">{record.fieldAffected}</div>
                  <div className="col-span-1 text-muted-foreground truncate">{record.previousValue}</div>
                  <div className="col-span-1 text-foreground truncate font-medium">{record.newValue}</div>
                  <div className="col-span-2 text-muted-foreground">
                    {record.changedBy}
                    <span className="text-muted-foreground/70"> ({record.userRole})</span>
                  </div>
                  <div className="col-span-1">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      record.source === 'system'
                        ? 'bg-gray-100 text-gray-700 border border-gray-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      {record.source === 'system' ? 'System' : 'Manual'}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-sm text-muted-foreground">No records match the selected criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Record Count */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-muted-foreground">
          <span>Displaying {filteredRecords.length} of {activityRecords.length} total records</span>
          <span>Records retention: 7 years per regulatory requirements</span>
        </div>

        {/* Information Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Audit and Compliance Record</p>
              <p className="text-blue-700">
                This ledger contains immutable, system-generated records of all fleet-side changes. 
                Historical records cannot be modified, deleted, or annotated. Access is role-based and 
                all viewing activity is logged for compliance purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b border-border p-6 flex items-center justify-between sticky top-0 bg-card">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-foreground">Activity Record</h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200 font-mono">
                    {selectedRecord.id}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Immutable system record · Read-only</p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Timestamp */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Full Timestamp</label>
                <p className="text-sm font-mono text-foreground bg-muted/30 px-3 py-2 rounded border border-border">
                  {selectedRecord.timestamp}
                </p>
              </div>

              {/* Entity Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Entity Type</label>
                  <p className="text-sm text-foreground">
                    {selectedRecord.entityType === 'driver' ? 'Driver' : 'Vehicle'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Entity ID</label>
                  <p className="text-sm font-mono text-foreground">{selectedRecord.entityId}</p>
                </div>
              </div>

              {/* Change Details */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Change Type</label>
                <p className="text-sm text-foreground">{selectedRecord.changeType}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Field Affected</label>
                <p className="text-sm font-mono text-foreground">{selectedRecord.fieldAffected}</p>
              </div>

              {/* Before/After Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Previous Value</label>
                  <p className="text-sm text-foreground bg-red-50 border border-red-200 px-3 py-2 rounded">
                    {selectedRecord.previousValue}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">New Value</label>
                  <p className="text-sm text-foreground bg-green-50 border border-green-200 px-3 py-2 rounded font-medium">
                    {selectedRecord.newValue}
                  </p>
                </div>
              </div>

              {/* User & Source */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Changed By</label>
                  <p className="text-sm text-foreground">{selectedRecord.changedBy}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">User Role</label>
                  <p className="text-sm text-foreground">{selectedRecord.userRole}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Change Source</label>
                  <p className="text-sm text-foreground capitalize">{selectedRecord.source}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">System Validation</label>
                  <p className="text-sm text-foreground capitalize">{selectedRecord.systemValidation}</p>
                </div>
              </div>

              {/* Immutability Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-700">
                    <p className="font-medium mb-1">Immutable Record</p>
                    <p className="text-gray-600">
                      This record is part of the authoritative audit trail and cannot be edited, 
                      deleted, or annotated. All values shown represent the exact state at the time 
                      of the change event.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border p-4 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
