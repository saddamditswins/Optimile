import {
  Truck,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  Shield,
  Wrench,
  FileText,
  ChevronDown,
  TrendingUp,
  Info,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface FleetSupervisorDashboardProps {
  onNavigate?: (screen: string) => void;
}

export function FleetSupervisorDashboard({ onNavigate }: FleetSupervisorDashboardProps = {}) {
  const [timeScope, setTimeScope] = useState<'current-shift' | 'next-shift' | 'today'>('current-shift');
  const [regionFilter, setRegionFilter] = useState<string>('all-regions');

  // Mock data
  const contextData = {
    currentDate: 'Wednesday, December 31, 2025',
    currentShift: 'Morning Shift (6:00 AM - 2:00 PM)',
    region: 'Northeast Region',
    hub: 'Central Depot',
    dataFreshness: 'Last synced 3 minutes ago'
  };

  // LAYER 1 — OVERALL FLEET READINESS STATUS
  const overallReadiness = {
    driversReady: 24,
    driversUnavailable: 6,
    driversAtRisk: 3,
    vehiclesOperational: 28,
    vehiclesUnderMaintenance: 4
  };

  // LAYER 2 — DRIVER READINESS SNAPSHOT
  const driverReadiness = {
    totalDrivers: 33,
    eligibleAndAvailable: 24,
    blockedByHOS: 2,
    blockedByCertification: 1,
    onLeave: 6
  };

  // LAYER 3 — VEHICLE READINESS SNAPSHOT
  const vehicleReadiness = {
    totalVehicles: 32,
    operational: 28,
    underMaintenance: 3,
    grounded: 1,
    capacityRestricted: 2
  };

  // LAYER 4 — COMPLIANCE & SAFETY RISKS
  const complianceRisks = {
    driversNearingHOSLimit: [
      { driverId: 'DRV-247', name: 'James Wilson', hoursRemaining: '1.5 hours', shift: 'Morning' },
      { driverId: 'DRV-189', name: 'Maria Santos', hoursRemaining: '2 hours', shift: 'Morning' }
    ],
    expiringCertifications: [
      { driverId: 'DRV-312', name: 'David Park', certification: 'CDL Class B', expiresIn: '5 days' }
    ],
    vehiclesNearingInspection: [
      { vehicleId: 'VEH-445', type: 'Box Truck', inspection: 'State Inspection', dueIn: '3 days' }
    ]
  };

  // LAYER 5 — CAPACITY & CONSTRAINT WARNINGS
  const capacityWarnings = [
    {
      type: 'driver-shortfall',
      severity: 'medium',
      message: 'Afternoon shift: 2 drivers short of typical demand',
      shift: 'Afternoon (2:00 PM - 10:00 PM)',
      region: 'Northeast'
    },
    {
      type: 'skill-mismatch',
      severity: 'low',
      message: 'Only 1 refrigerated vehicle operator available tomorrow',
      shift: 'Tomorrow Morning',
      region: 'Northeast'
    }
  ];

  // LAYER 6 — FLEET EXCEPTIONS (READ-ONLY)
  const fleetExceptions = [
    {
      id: 'FLT-EXC-2847',
      type: 'driver-unavailable',
      timestamp: '11:30 AM',
      description: 'DRV-247 marked unavailable mid-shift due to vehicle breakdown',
      affectedEntity: 'DRV-247 (James Wilson)'
    },
    {
      id: 'FLT-EXC-2821',
      type: 'vehicle-issue',
      timestamp: '9:15 AM',
      description: 'VEH-112 reported mechanical issue, moved to maintenance',
      affectedEntity: 'VEH-112 (Cargo Van)'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-slate-900 font-medium">Fleet Readiness</h1>
                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300 uppercase font-medium">
                  Fleet Supervisor
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                Driver and vehicle availability, compliance, and capacity signals
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600">Hub</div>
                <div className="text-slate-900 text-sm">{contextData.hub}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">

          {/* LAYER 0 — CONTEXT & SCOPE */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Date</span>
                </div>
                <div className="text-sm text-slate-900">{contextData.currentDate}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Current Shift</span>
                </div>
                <div className="text-sm text-slate-900">{contextData.currentShift}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Region</span>
                </div>
                <div className="text-sm text-slate-900">{contextData.region}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Data Sync</span>
                </div>
                <div className="text-sm text-slate-900">{contextData.dataFreshness}</div>
              </div>
            </div>

            {/* Scope Selectors */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-sm text-slate-700 font-medium">View:</span>
              
              <div className="relative">
                <select
                  value={timeScope}
                  onChange={(e) => setTimeScope(e.target.value as any)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="current-shift">Current Shift</option>
                  <option value="next-shift">Next Shift</option>
                  <option value="today">Today (All Shifts)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="all-regions">All Regions</option>
                  <option value="northeast">Northeast Region</option>
                  <option value="southeast">Southeast Region</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* LAYER 1 — OVERALL FLEET READINESS STATUS */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <h2 className="text-slate-900 font-medium mb-4">Overall Fleet Readiness</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div className="text-xs text-green-700">Drivers Ready</div>
                </div>
                <div className="text-3xl text-green-700 font-medium">{overallReadiness.driversReady}</div>
              </div>

              <div className="p-4 bg-slate-100 rounded-lg border border-slate-300">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-slate-600" />
                  <div className="text-xs text-slate-700">Drivers Unavailable</div>
                </div>
                <div className="text-3xl text-slate-700 font-medium">{overallReadiness.driversUnavailable}</div>
              </div>

              <div className="p-4 bg-slate-100 rounded-lg border border-slate-300">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-slate-600" />
                  <div className="text-xs text-slate-700">Drivers At Risk</div>
                </div>
                <div className="text-3xl text-slate-700 font-medium">{overallReadiness.driversAtRisk}</div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-green-600" />
                  <div className="text-xs text-green-700">Vehicles Operational</div>
                </div>
                <div className="text-3xl text-green-700 font-medium">{overallReadiness.vehiclesOperational}</div>
              </div>

              <div className="p-4 bg-slate-100 rounded-lg border border-slate-300">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-4 h-4 text-slate-600" />
                  <div className="text-xs text-slate-700">Vehicles Under Maintenance</div>
                </div>
                <div className="text-3xl text-slate-700 font-medium">{overallReadiness.vehiclesUnderMaintenance}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LAYER 2 — DRIVER READINESS SNAPSHOT */}
            <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
                <h2 className="text-slate-900 font-medium">Driver Readiness</h2>
                <button 
                  onClick={() => onNavigate?.('fleet-drivers')}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors border border-blue-300 text-sm"
                >
                  <Users className="w-4 h-4" />
                  <span>Manage Drivers</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Total Drivers</span>
                    <span className="text-2xl text-slate-900 font-medium">{driverReadiness.totalDrivers}</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Eligible & Available</span>
                    <span className="text-2xl text-green-700 font-medium">{driverReadiness.eligibleAndAvailable}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-600 font-medium uppercase">Blocked Drivers</div>
                  
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-700">HOS Limits</span>
                    <span className="text-lg text-slate-900 font-medium">{driverReadiness.blockedByHOS}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-700">Certification Expiry</span>
                    <span className="text-lg text-slate-900 font-medium">{driverReadiness.blockedByCertification}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-700">Leave / Absence</span>
                    <span className="text-lg text-slate-900 font-medium">{driverReadiness.onLeave}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LAYER 3 — VEHICLE READINESS SNAPSHOT */}
            <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
                <h2 className="text-slate-900 font-medium">Vehicle Readiness</h2>
                <button 
                  onClick={() => onNavigate?.('fleet-vehicles')}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors border border-blue-300 text-sm"
                >
                  <Truck className="w-4 h-4" />
                  <span>Manage Vehicles</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Total Vehicles</span>
                    <span className="text-2xl text-slate-900 font-medium">{vehicleReadiness.totalVehicles}</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Operational</span>
                    <span className="text-2xl text-green-700 font-medium">{vehicleReadiness.operational}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-600 font-medium uppercase">Non-Operational Vehicles</div>
                  
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-700">Under Maintenance</span>
                    <span className="text-lg text-slate-900 font-medium">{vehicleReadiness.underMaintenance}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-700">Grounded / Non-Compliant</span>
                    <span className="text-lg text-slate-900 font-medium">{vehicleReadiness.grounded}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-700">Capacity Restricted</span>
                    <span className="text-lg text-slate-900 font-medium">{vehicleReadiness.capacityRestricted}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 4 — COMPLIANCE & SAFETY RISKS */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-slate-700" />
              <h2 className="text-slate-900 font-medium">Compliance & Safety Risks</h2>
            </div>

            <div className="space-y-4">
              {/* Drivers Nearing HOS Limit */}
              <div>
                <div className="text-xs text-slate-600 font-medium uppercase mb-2">Drivers Nearing HOS Limit</div>
                {complianceRisks.driversNearingHOSLimit.length > 0 ? (
                  <div className="space-y-2">
                    {complianceRisks.driversNearingHOSLimit.map((driver) => (
                      <div key={driver.driverId} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-slate-900 font-medium">{driver.name}</div>
                            <div className="text-xs text-slate-600">{driver.driverId} • {driver.shift}</div>
                          </div>
                          <div className="text-sm text-slate-700 font-medium">{driver.hoursRemaining}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600">
                    No drivers currently at risk
                  </div>
                )}
              </div>

              {/* Expiring Certifications */}
              <div>
                <div className="text-xs text-slate-600 font-medium uppercase mb-2">Expiring Licenses / Certifications</div>
                {complianceRisks.expiringCertifications.length > 0 ? (
                  <div className="space-y-2">
                    {complianceRisks.expiringCertifications.map((cert) => (
                      <div key={cert.driverId} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-slate-900 font-medium">{cert.name}</div>
                            <div className="text-xs text-slate-600">{cert.driverId} • {cert.certification}</div>
                          </div>
                          <div className="text-sm text-slate-700 font-medium">Expires in {cert.expiresIn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600">
                    No expiring certifications
                  </div>
                )}
              </div>

              {/* Vehicles Nearing Inspection */}
              <div>
                <div className="text-xs text-slate-600 font-medium uppercase mb-2">Vehicles Nearing Inspection / Compliance Expiry</div>
                {complianceRisks.vehiclesNearingInspection.length > 0 ? (
                  <div className="space-y-2">
                    {complianceRisks.vehiclesNearingInspection.map((vehicle) => (
                      <div key={vehicle.vehicleId} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-slate-900 font-medium">{vehicle.type}</div>
                            <div className="text-xs text-slate-600">{vehicle.vehicleId} • {vehicle.inspection}</div>
                          </div>
                          <div className="text-sm text-slate-700 font-medium">Due in {vehicle.dueIn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600">
                    No vehicles at risk
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LAYER 5 — CAPACITY & CONSTRAINT WARNINGS */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-slate-700" />
                <h2 className="text-slate-900 font-medium">Capacity & Constraint Warnings</h2>
              </div>
              <button 
                onClick={() => onNavigate?.('fleet-capacity')}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors border border-blue-300 text-sm"
              >
                <span>View Full Report</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {capacityWarnings.length > 0 ? (
              <div className="space-y-3">
                {capacityWarnings.map((warning, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        warning.severity === 'high' ? 'bg-slate-200' :
                        warning.severity === 'medium' ? 'bg-slate-100' :
                        'bg-slate-50'
                      }`}>
                        <AlertTriangle className={`w-4 h-4 ${
                          warning.severity === 'high' ? 'text-slate-700' :
                          warning.severity === 'medium' ? 'text-slate-600' :
                          'text-slate-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-900 font-medium mb-1">{warning.message}</div>
                        <div className="text-xs text-slate-600">
                          {warning.shift} • {warning.region}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>No capacity constraints identified for current scope</span>
                </div>
              </div>
            )}
          </div>

          {/* LAYER 6 — FLEET EXCEPTIONS (READ-ONLY) */}
          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-700" />
                <h2 className="text-slate-900 font-medium">Fleet Exceptions</h2>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded uppercase">
                  Read-Only
                </span>
              </div>
              <button 
                onClick={() => onNavigate?.('fleet-exceptions')}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors border border-blue-300 text-sm"
              >
                <span>View All Exceptions</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {fleetExceptions.length > 0 ? (
              <div className="space-y-3">
                {fleetExceptions.map((exception) => (
                  <div key={exception.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-900 font-mono">{exception.id}</span>
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded uppercase">
                          {exception.type.replace('-', ' ')}
                        </span>
                      </div>
                      <span className="text-xs text-slate-600">{exception.timestamp}</span>
                    </div>
                    <div className="text-sm text-slate-900 mb-1">{exception.description}</div>
                    <div className="text-xs text-slate-600">Affected: {exception.affectedEntity}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600">
                No fleet exceptions recorded for current scope
              </div>
            )}
          </div>

          {/* Role Scope Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-900 text-sm font-medium mb-1">Fleet Supervisor Scope</div>
                <p className="text-blue-800 text-sm">
                  This dashboard provides readiness-only visibility. Fleet Supervisors control driver and vehicle 
                  availability, compliance status, and signal capacity constraints upstream. Delivery assignment, 
                  routing, recovery, and SLA management are handled by Dispatch Managers and Operations Managers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}