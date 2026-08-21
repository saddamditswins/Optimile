import { useState } from 'react';
import { Info, Eye, Users, Truck, AlertCircle, ChevronRight, RefreshCw, Clock, TrendingUp } from 'lucide-react';

type TimeWindow = 'current-shift' | 'today' | 'last-24h';
type ExceptionStatus = 'active' | 'resolved';

interface DriverException {
  id: string;
  type: string;
  region: string;
  shift: string;
  status: ExceptionStatus;
  timestamp: string;
  description: string;
}

interface VehicleException {
  id: string;
  type: string;
  region: string;
  shift: string;
  status: ExceptionStatus;
  timestamp: string;
  description: string;
}

export function FleetExceptions() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('today');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string>('all');

  // Mock data - in production this would come from an exception tracking service
  const driverExceptions: DriverException[] = [
    {
      id: 'DRV-EXC-001',
      type: 'Driver No-Show',
      region: 'Northeast',
      shift: 'Morning 6AM-2PM',
      status: 'active',
      timestamp: '2025-01-06T06:15:00',
      description: 'Driver scheduled but did not report for shift',
    },
    {
      id: 'DRV-EXC-002',
      type: 'HOS Limit Reached During Shift',
      region: 'Northeast',
      shift: 'Morning 6AM-2PM',
      status: 'active',
      timestamp: '2025-01-06T11:30:00',
      description: 'Driver reached hours-of-service limit mid-shift',
    },
    {
      id: 'DRV-EXC-003',
      type: 'License Issue Discovered',
      region: 'Northeast',
      shift: 'Afternoon 2PM-10PM',
      status: 'resolved',
      timestamp: '2025-01-05T14:45:00',
      description: 'Driver license flagged during shift prep',
    },
    {
      id: 'DRV-EXC-004',
      type: 'Medical Emergency',
      region: 'Boston Hub-01',
      shift: 'Morning 6AM-2PM',
      status: 'resolved',
      timestamp: '2025-01-05T09:20:00',
      description: 'Driver reported medical issue requiring shift termination',
    },
  ];

  const vehicleExceptions: VehicleException[] = [
    {
      id: 'VEH-EXC-001',
      type: 'Vehicle Breakdown',
      region: 'Northeast',
      shift: 'Morning 6AM-2PM',
      status: 'active',
      timestamp: '2025-01-06T08:45:00',
      description: 'Vehicle experienced mechanical failure during operation',
    },
    {
      id: 'VEH-EXC-002',
      type: 'Maintenance Overrun',
      region: 'Boston Hub-02',
      shift: 'Morning 6AM-2PM',
      status: 'active',
      timestamp: '2025-01-06T05:30:00',
      description: 'Scheduled maintenance not completed before shift start',
    },
    {
      id: 'VEH-EXC-003',
      type: 'Equipment Failure',
      region: 'Northeast',
      shift: 'Afternoon 2PM-10PM',
      status: 'resolved',
      timestamp: '2025-01-05T15:10:00',
      description: 'Lift gate malfunction discovered during loading',
    },
    {
      id: 'VEH-EXC-004',
      type: 'Refrigeration System Failure',
      region: 'Boston Hub-01',
      shift: 'Morning 6AM-2PM',
      status: 'resolved',
      timestamp: '2025-01-05T07:20:00',
      description: 'Temperature control system failed for cold-chain vehicle',
    },
    {
      id: 'VEH-EXC-005',
      type: 'Unexpected Compliance Issue',
      region: 'Northeast',
      shift: 'Night 10PM-6AM',
      status: 'resolved',
      timestamp: '2025-01-04T22:15:00',
      description: 'Vehicle inspection flagged during routine check',
    },
  ];

  const filteredDriverExceptions = driverExceptions.filter(exc => {
    if (selectedRegion !== 'all' && !exc.region.toLowerCase().includes(selectedRegion.toLowerCase())) return false;
    if (selectedHub !== 'all' && !exc.region.toLowerCase().includes(selectedHub.toLowerCase())) return false;
    return true;
  });

  const filteredVehicleExceptions = vehicleExceptions.filter(exc => {
    if (selectedRegion !== 'all' && !exc.region.toLowerCase().includes(selectedRegion.toLowerCase())) return false;
    if (selectedHub !== 'all' && !exc.region.toLowerCase().includes(selectedHub.toLowerCase())) return false;
    return true;
  });

  const activeDriverExceptions = filteredDriverExceptions.filter(e => e.status === 'active').length;
  const activeVehicleExceptions = filteredVehicleExceptions.filter(e => e.status === 'active').length;
  const totalActiveExceptions = activeDriverExceptions + activeVehicleExceptions;

  // Correlation insights
  const correlationInsights = [
    {
      pattern: 'Recurring Maintenance Overruns',
      frequency: 3,
      impact: 'Vehicles not ready at shift start',
      suggestion: 'Review maintenance scheduling process',
    },
    {
      pattern: 'HOS Limit Mid-Shift',
      frequency: 2,
      impact: 'Drivers unavailable to complete assigned work',
      suggestion: 'Review shift planning against HOS forecasts',
    },
  ];

  const lastUpdated = 'Just now';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-foreground">Fleet Exceptions</h1>
              <span className="text-sm px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Read-only
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Monitor fleet-related execution issues for awareness and learning</p>
          </div>

          {/* LAYER 0 - Context & Scope */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Observation Scope</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Updated {lastUpdated}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Time Window */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Time Window</label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="current-shift">Current Shift</option>
                  <option value="today">Today</option>
                  <option value="last-24h">Last 24 Hours</option>
                </select>
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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">
        {/* LAYER 1 - Exception Summary */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Exception Summary</h2>
            <span className="text-xs text-muted-foreground">(High-level awareness)</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Driver-Related</p>
                  <p className="text-2xl font-semibold text-foreground">{activeDriverExceptions}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Active exceptions affecting execution</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Vehicle-Related</p>
                  <p className="text-2xl font-semibold text-foreground">{activeVehicleExceptions}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Active exceptions affecting execution</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Active</p>
                  <p className="text-2xl font-semibold text-foreground">{totalActiveExceptions}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Fleet exceptions impacting execution</p>
            </div>
          </div>
        </section>

        {/* LAYER 2 - Driver-Related Exceptions */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Driver-Related Exceptions</h2>
            <span className="text-xs text-muted-foreground">(Read-only list)</span>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Execution issues caused by driver constraints or availability changes
              </p>
            </div>
            {filteredDriverExceptions.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredDriverExceptions.map((exception) => (
                  <div key={exception.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-foreground">{exception.type}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            exception.status === 'active'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-gray-50 text-gray-600 border border-gray-200'
                          }`}>
                            {exception.status === 'active' ? 'Active' : 'Resolved'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{exception.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{exception.region} · {exception.shift}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(exception.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No driver-related exceptions for selected scope</p>
              </div>
            )}
          </div>
        </section>

        {/* LAYER 3 - Vehicle-Related Exceptions */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Vehicle-Related Exceptions</h2>
            <span className="text-xs text-muted-foreground">(Read-only list)</span>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Execution issues caused by vehicle constraints or operational changes
              </p>
            </div>
            {filteredVehicleExceptions.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredVehicleExceptions.map((exception) => (
                  <div key={exception.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-foreground">{exception.type}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            exception.status === 'active'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-gray-50 text-gray-600 border border-gray-200'
                          }`}>
                            {exception.status === 'active' ? 'Active' : 'Resolved'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{exception.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{exception.region} · {exception.shift}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(exception.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No vehicle-related exceptions for selected scope</p>
              </div>
            )}
          </div>
        </section>

        {/* LAYER 4 - Correlation Context */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Correlation Context</h2>
            <span className="text-xs text-muted-foreground">(Insights only)</span>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Patterns connecting exceptions to fleet readiness gaps
              </p>
            </div>
            {correlationInsights.length > 0 ? (
              <div className="divide-y divide-border">
                {correlationInsights.map((insight, idx) => (
                  <div key={idx} className="p-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{insight.pattern}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {insight.frequency} occurrences
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">Impact:</span> {insight.impact}
                        </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Learning:</span> {insight.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No correlation patterns detected</p>
              </div>
            )}
          </div>
        </section>

        {/* LAYER 5 - Investigation Links */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Investigation Links</h2>
            <span className="text-xs text-muted-foreground">(Navigation only)</span>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Navigate to fleet management modules to investigate upstream causes and prevent recurrence
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  // Navigate to Drivers Management
                  console.log('Navigate to Drivers Management');
                }}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Drivers Management</p>
                    <p className="text-xs text-muted-foreground">Review driver readiness</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              </button>

              <button
                onClick={() => {
                  // Navigate to Vehicles Management
                  console.log('Navigate to Vehicles Management');
                }}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Vehicles Management</p>
                    <p className="text-xs text-muted-foreground">Review vehicle readiness</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              </button>

              <button
                onClick={() => {
                  // Navigate to Fleet Activity Log
                  console.log('Navigate to Fleet Activity Log');
                }}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Fleet Activity Log</p>
                    <p className="text-xs text-muted-foreground">Review recent changes</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              </button>
            </div>
          </div>
        </section>

        {/* Information Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">This module provides awareness only</p>
              <p className="text-blue-700">
                Fleet Exceptions is a read-only monitoring tool for observing fleet-related execution issues. 
                It does not provide recovery or intervention actions. Exception resolution remains the responsibility 
                of Dispatch and Operations roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
