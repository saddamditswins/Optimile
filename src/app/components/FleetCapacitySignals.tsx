import { useState } from 'react';
import { Info, TrendingUp, TrendingDown, Users, Truck, Award, AlertTriangle, ChevronRight, RefreshCw } from 'lucide-react';

type TimeWindow = 'current-shift' | 'next-shift' | 'next-24h';
type ForecastBasis = 'planned-demand' | 'historical-average' | 'system-forecast';

export function FleetCapacitySignals() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('next-shift');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [forecastBasis, setForecastBasis] = useState<ForecastBasis>('system-forecast');

  // Mock data - in production this would come from a forecast service
  const capacityData = {
    drivers: {
      required: 42,
      eligible: 38,
      surplus: -4,
      constraints: {
        hosBlocked: 6,
        licenseExpiry: 2,
        missingCertifications: 3,
        onLeave: 4,
        regionMismatch: 1,
      },
    },
    vehicles: {
      required: 45,
      eligible: 41,
      surplus: -4,
      constraints: {
        underMaintenance: 5,
        grounded: 2,
        complianceExpired: 3,
        capacityRestricted: 1,
        equipmentMismatch: 2,
      },
    },
    skillGaps: [
      { capability: 'Hazmat Certification', shortfall: 2 },
      { capability: 'CDL-A License', shortfall: 1 },
      { capability: 'Refrigerated Transport', shortfall: 3 },
    ],
    upcomingRisks: [
      { timeframe: 'Tomorrow 6AM-2PM', region: 'Northeast', issue: 'Driver shortage projected', severity: 'moderate' },
      { timeframe: 'Wed 2PM-10PM', region: 'Boston Hub-01', issue: 'Vehicle maintenance peak', severity: 'low' },
      { timeframe: 'Thu 6AM-2PM', region: 'Northeast', issue: 'Certification gap trend', severity: 'moderate' },
    ],
  };

  const lastUpdated = 'Just now';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground mb-1">Capacity & Constraint Signals</h1>
            <p className="text-sm text-muted-foreground">Monitor fleet supply readiness and detect capacity shortfalls</p>
          </div>

          {/* LAYER 0 - Context & Forecast Window */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Forecast Configuration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Updated {lastUpdated}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Time Window */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Time Window</label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="current-shift">Current Shift</option>
                  <option value="next-shift">Next Shift</option>
                  <option value="next-24h">Next 24 Hours</option>
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

              {/* Forecast Basis */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Forecast Basis</label>
                <select
                  value={forecastBasis}
                  onChange={(e) => setForecastBasis(e.target.value as ForecastBasis)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="planned-demand">Planned Demand</option>
                  <option value="historical-average">Historical Average</option>
                  <option value="system-forecast">System Forecast</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* LAYER 1 - Capacity vs Demand Snapshot */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Capacity vs Demand Snapshot</h2>
            <span className="text-xs text-muted-foreground">(Aggregate signal)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Driver Capacity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Driver Capacity</h3>
                  <p className="text-xs text-muted-foreground">System-eligible drivers</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Required</p>
                  <p className="text-2xl font-semibold text-foreground">{capacityData.drivers.required}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Eligible</p>
                  <p className="text-2xl font-semibold text-foreground">{capacityData.drivers.eligible}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Surplus/Shortfall</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-2xl font-semibold ${capacityData.drivers.surplus >= 0 ? 'text-green-700' : 'text-amber-700'}`}>
                      {capacityData.drivers.surplus >= 0 ? '+' : ''}{capacityData.drivers.surplus}
                    </p>
                    {capacityData.drivers.surplus < 0 ? (
                      <TrendingDown className="w-5 h-5 text-amber-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>
              </div>

              {capacityData.drivers.surplus < 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-900">
                    Driver capacity is below forecasted demand. Review constraint signals below.
                  </p>
                </div>
              )}
            </div>

            {/* Vehicle Capacity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Vehicle Capacity</h3>
                  <p className="text-xs text-muted-foreground">System-eligible vehicles</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Required</p>
                  <p className="text-2xl font-semibold text-foreground">{capacityData.vehicles.required}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Eligible</p>
                  <p className="text-2xl font-semibold text-foreground">{capacityData.vehicles.eligible}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Surplus/Shortfall</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-2xl font-semibold ${capacityData.vehicles.surplus >= 0 ? 'text-green-700' : 'text-amber-700'}`}>
                      {capacityData.vehicles.surplus >= 0 ? '+' : ''}{capacityData.vehicles.surplus}
                    </p>
                    {capacityData.vehicles.surplus < 0 ? (
                      <TrendingDown className="w-5 h-5 text-amber-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>
              </div>

              {capacityData.vehicles.surplus < 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-900">
                    Vehicle capacity is below forecasted demand. Review constraint signals below.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* LAYER 2 - Driver Constraint Signals */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Driver Constraint Signals</h2>
            <span className="text-xs text-muted-foreground">(Read-only breakdown)</span>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Breakdown of why drivers are blocked from dispatch eligibility
              </p>
            </div>
            <div className="divide-y divide-border">
              <ConstraintRow 
                label="Blocked by HOS Limits"
                count={capacityData.drivers.constraints.hosBlocked}
                description="Drivers who have reached hours-of-service limits"
              />
              <ConstraintRow 
                label="Blocked by License Expiry"
                count={capacityData.drivers.constraints.licenseExpiry}
                description="Drivers with expired or expiring licenses"
              />
              <ConstraintRow 
                label="Missing Certifications"
                count={capacityData.drivers.constraints.missingCertifications}
                description="Drivers lacking required certifications"
              />
              <ConstraintRow 
                label="On Leave / Absence"
                count={capacityData.drivers.constraints.onLeave}
                description="Drivers declared unavailable"
              />
              <ConstraintRow 
                label="Region / Hub Mismatch"
                count={capacityData.drivers.constraints.regionMismatch}
                description="Drivers assigned to different region/hub"
              />
            </div>
          </div>
        </section>

        {/* LAYER 3 - Vehicle Constraint Signals */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Vehicle Constraint Signals</h2>
            <span className="text-xs text-muted-foreground">(Read-only breakdown)</span>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Breakdown of why vehicles are blocked from dispatch eligibility
              </p>
            </div>
            <div className="divide-y divide-border">
              <ConstraintRow 
                label="Under Maintenance"
                count={capacityData.vehicles.constraints.underMaintenance}
                description="Vehicles in scheduled or unscheduled maintenance"
              />
              <ConstraintRow 
                label="Grounded"
                count={capacityData.vehicles.constraints.grounded}
                description="Vehicles grounded due to safety issues"
              />
              <ConstraintRow 
                label="Compliance Expired"
                count={capacityData.vehicles.constraints.complianceExpired}
                description="Vehicles with expired registration, insurance, or inspection"
              />
              <ConstraintRow 
                label="Capacity Restricted"
                count={capacityData.vehicles.constraints.capacityRestricted}
                description="Vehicles with temporary capacity restrictions"
              />
              <ConstraintRow 
                label="Equipment Mismatch"
                count={capacityData.vehicles.constraints.equipmentMismatch}
                description="Vehicles lacking required special equipment"
              />
            </div>
          </div>
        </section>

        {/* LAYER 4 - Skill & Capability Mismatches */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Skill & Capability Mismatches</h2>
            <span className="text-xs text-muted-foreground">(Signal only)</span>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Gaps between required capabilities and available supply
              </p>
            </div>
            {capacityData.skillGaps.length > 0 ? (
              <div className="divide-y divide-border">
                {capacityData.skillGaps.map((gap, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{gap.capability}</p>
                        <p className="text-xs text-muted-foreground">Capability requirement not met</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-amber-700">-{gap.shortfall}</p>
                      <p className="text-xs text-muted-foreground">Shortfall</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No skill gaps detected for selected time window</p>
              </div>
            )}
          </div>
        </section>

        {/* LAYER 5 - Upcoming Risk Flags */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Upcoming Risk Flags</h2>
            <span className="text-xs text-muted-foreground">(Forward-looking)</span>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Projected capacity constraints and emerging shortage patterns
              </p>
            </div>
            {capacityData.upcomingRisks.length > 0 ? (
              <div className="divide-y divide-border">
                {capacityData.upcomingRisks.map((risk, idx) => (
                  <div key={idx} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                          risk.severity === 'moderate' ? 'text-amber-600' : 'text-blue-600'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{risk.issue}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {risk.timeframe} · {risk.region}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        risk.severity === 'moderate' 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {risk.severity === 'moderate' ? 'Moderate' : 'Low'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No upcoming risks detected</p>
              </div>
            )}
          </div>
        </section>

        {/* LAYER 6 - Investigation Links */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Investigation Links</h2>
            <span className="text-xs text-muted-foreground">(Navigation only)</span>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Navigate to fleet management modules to investigate root causes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  // Navigate to Drivers Management filtered by constraints
                  console.log('Navigate to Drivers Management (filtered)');
                }}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Drivers Management</p>
                    <p className="text-xs text-muted-foreground">View blocked drivers</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              </button>

              <button
                onClick={() => {
                  // Navigate to Vehicles Management filtered by constraints
                  console.log('Navigate to Vehicles Management (filtered)');
                }}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Vehicles Management</p>
                    <p className="text-xs text-muted-foreground">View blocked vehicles</p>
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
              <p className="font-medium mb-1">This module provides signals only</p>
              <p className="text-blue-700">
                Capacity & Constraint Signals is a monitoring and forecasting tool. It does not provide resolution actions. 
                Dispatch planning and operational execution remain the responsibility of downstream roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Constraint Row Component
function ConstraintRow({ label, count, description }: { label: string; count: number; description: string }) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-foreground">{count}</p>
        <p className="text-xs text-muted-foreground">Blocked</p>
      </div>
    </div>
  );
}
