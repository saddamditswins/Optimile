import { useState } from 'react';
import { Search, Plus, X, CheckCircle2, XCircle, AlertCircle, Clock, Truck, FileText, Wrench, Calendar, MapPin, ChevronRight, Package } from 'lucide-react';

type ComplianceStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'PENDING';
type MaintenanceStatus = 'OPERATIONAL' | 'SCHEDULED_MAINTENANCE' | 'UNSCHEDULED_ISSUE' | 'GROUNDED';
type AvailabilityIntent = 'AVAILABLE' | 'TEMP_UNAVAILABLE' | 'RESTRICTED' | 'NOT_SET';
type VehicleState = 'CREATED' | 'NON_COMPLIANT' | 'UNDER_MAINTENANCE' | 'READY';

interface Vehicle {
  id: string;
  registrationNumber: string;
  vehicleType: string;
  region: string;
  hub: string;
  weightCapacity: number;
  volumeCapacity: number;
  specialEquipment: string[];
  ownershipType: string;
  complianceStatus: ComplianceStatus;
  maintenanceStatus: MaintenanceStatus;
  availabilityIntent: AvailabilityIntent;
  vehicleState: VehicleState;
  availableForDispatch: boolean;
  complianceIssues?: string[];
  registrationExpiry?: string;
  insuranceExpiry?: string;
  inspectionExpiry?: string;
  nextMaintenanceDate?: string;
  createdDate: string;
}

export function FleetVehiclesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState<'all' | VehicleState>('all');
  const [showCreateVehicle, setShowCreateVehicle] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Mock vehicle data
  const [vehicles] = useState<Vehicle[]>([
    {
      id: 'VEH-001',
      registrationNumber: 'ABC-1234',
      vehicleType: 'Box Truck - 26ft',
      region: 'Northeast',
      hub: 'Hub-Boston-01',
      weightCapacity: 26000,
      volumeCapacity: 1800,
      specialEquipment: ['Lift Gate', 'Climate Control'],
      ownershipType: 'Owned',
      complianceStatus: 'COMPLIANT',
      maintenanceStatus: 'OPERATIONAL',
      availabilityIntent: 'AVAILABLE',
      vehicleState: 'READY',
      availableForDispatch: true,
      registrationExpiry: '2025-12-15',
      insuranceExpiry: '2025-11-20',
      inspectionExpiry: '2025-09-10',
      nextMaintenanceDate: '2025-02-15',
      createdDate: '2024-01-10',
    },
    {
      id: 'VEH-002',
      registrationNumber: 'XYZ-5678',
      vehicleType: 'Cargo Van',
      region: 'Northeast',
      hub: 'Hub-Boston-01',
      weightCapacity: 9600,
      volumeCapacity: 450,
      specialEquipment: ['GPS Tracking'],
      ownershipType: 'Leased',
      complianceStatus: 'NON_COMPLIANT',
      complianceIssues: ['Insurance expired', 'Safety inspection overdue'],
      maintenanceStatus: 'OPERATIONAL',
      availabilityIntent: 'AVAILABLE',
      vehicleState: 'NON_COMPLIANT',
      availableForDispatch: false,
      registrationExpiry: '2026-03-20',
      insuranceExpiry: '2024-12-01',
      inspectionExpiry: '2024-11-15',
      createdDate: '2024-02-15',
    },
    {
      id: 'VEH-003',
      registrationNumber: 'DEF-9012',
      vehicleType: 'Box Truck - 24ft',
      region: 'Northeast',
      hub: 'Hub-Boston-02',
      weightCapacity: 24000,
      volumeCapacity: 1600,
      specialEquipment: ['Lift Gate'],
      ownershipType: 'Owned',
      complianceStatus: 'COMPLIANT',
      maintenanceStatus: 'SCHEDULED_MAINTENANCE',
      availabilityIntent: 'AVAILABLE',
      vehicleState: 'UNDER_MAINTENANCE',
      availableForDispatch: false,
      registrationExpiry: '2025-10-05',
      insuranceExpiry: '2025-09-15',
      inspectionExpiry: '2025-08-20',
      nextMaintenanceDate: '2025-01-08',
      createdDate: '2024-03-05',
    },
    {
      id: 'VEH-004',
      registrationNumber: 'GHI-3456',
      vehicleType: 'Refrigerated Truck',
      region: 'Northeast',
      hub: 'Hub-Boston-01',
      weightCapacity: 28000,
      volumeCapacity: 2000,
      specialEquipment: ['Refrigeration Unit', 'Lift Gate', 'Temperature Monitor'],
      ownershipType: 'Owned',
      complianceStatus: 'COMPLIANT',
      maintenanceStatus: 'OPERATIONAL',
      availabilityIntent: 'RESTRICTED',
      vehicleState: 'READY',
      availableForDispatch: false,
      registrationExpiry: '2026-05-10',
      insuranceExpiry: '2025-12-30',
      inspectionExpiry: '2025-11-05',
      nextMaintenanceDate: '2025-03-15',
      createdDate: '2024-01-20',
    },
    {
      id: 'VEH-005',
      registrationNumber: 'JKL-7890',
      vehicleType: 'Sprinter Van',
      region: 'Northeast',
      hub: 'Hub-Boston-02',
      weightCapacity: 5000,
      volumeCapacity: 350,
      specialEquipment: [],
      ownershipType: 'Leased',
      complianceStatus: 'PENDING',
      maintenanceStatus: 'OPERATIONAL',
      availabilityIntent: 'NOT_SET',
      vehicleState: 'CREATED',
      availableForDispatch: false,
      createdDate: '2025-01-05',
    },
    {
      id: 'VEH-006',
      registrationNumber: 'MNO-2468',
      vehicleType: 'Box Truck - 26ft',
      region: 'Northeast',
      hub: 'Hub-Boston-01',
      weightCapacity: 26000,
      volumeCapacity: 1800,
      specialEquipment: ['Lift Gate'],
      ownershipType: 'Owned',
      complianceStatus: 'COMPLIANT',
      maintenanceStatus: 'GROUNDED',
      availabilityIntent: 'TEMP_UNAVAILABLE',
      vehicleState: 'UNDER_MAINTENANCE',
      availableForDispatch: false,
      registrationExpiry: '2025-08-15',
      insuranceExpiry: '2025-10-20',
      inspectionExpiry: '2025-07-30',
      createdDate: '2024-04-10',
    },
  ]);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.vehicleType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterState === 'all' || vehicle.vehicleState === filterState;
    return matchesSearch && matchesFilter;
  });

  const getStateColor = (state: VehicleState) => {
    switch (state) {
      case 'READY': return 'text-green-700 bg-green-50 border-green-200';
      case 'CREATED': return 'text-gray-700 bg-gray-50 border-gray-200';
      case 'NON_COMPLIANT': return 'text-red-700 bg-red-50 border-red-200';
      case 'UNDER_MAINTENANCE': return 'text-amber-700 bg-amber-50 border-amber-200';
    }
  };

  const getStateLabel = (state: VehicleState) => {
    switch (state) {
      case 'READY': return 'Dispatch Eligible';
      case 'CREATED': return 'Not Dispatchable';
      case 'NON_COMPLIANT': return 'Blocked - Compliance';
      case 'UNDER_MAINTENANCE': return 'Blocked - Maintenance';
    }
  };

  const getStateIcon = (state: VehicleState) => {
    switch (state) {
      case 'READY': return CheckCircle2;
      case 'CREATED': return Clock;
      case 'NON_COMPLIANT': return XCircle;
      case 'UNDER_MAINTENANCE': return Wrench;
    }
  };

  const stateCounts = {
    all: vehicles.length,
    READY: vehicles.filter(v => v.vehicleState === 'READY').length,
    CREATED: vehicles.filter(v => v.vehicleState === 'CREATED').length,
    NON_COMPLIANT: vehicles.filter(v => v.vehicleState === 'NON_COMPLIANT').length,
    UNDER_MAINTENANCE: vehicles.filter(v => v.vehicleState === 'UNDER_MAINTENANCE').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">Vehicles Management</h1>
              <p className="text-sm text-muted-foreground">Manage vehicle records, compliance, and operational readiness</p>
            </div>
            <button
              onClick={() => setShowCreateVehicle(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Vehicle
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by registration number or vehicle type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterState('all')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterState === 'all'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-card text-muted-foreground border border-border hover:bg-muted'
                }`}
              >
                All ({stateCounts.all})
              </button>
              <button
                onClick={() => setFilterState('READY')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterState === 'READY'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-card text-muted-foreground border border-border hover:bg-muted'
                }`}
              >
                Eligible ({stateCounts.READY})
              </button>
              <button
                onClick={() => setFilterState('CREATED')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterState === 'CREATED'
                    ? 'bg-gray-50 text-gray-700 border border-gray-200'
                    : 'bg-card text-muted-foreground border border-border hover:bg-muted'
                }`}
              >
                Created ({stateCounts.CREATED})
              </button>
              <button
                onClick={() => setFilterState('NON_COMPLIANT')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterState === 'NON_COMPLIANT'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-card text-muted-foreground border border-border hover:bg-muted'
                }`}
              >
                Blocked ({stateCounts.NON_COMPLIANT})
              </button>
              <button
                onClick={() => setFilterState('UNDER_MAINTENANCE')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterState === 'UNDER_MAINTENANCE'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-card text-muted-foreground border border-border hover:bg-muted'
                }`}
              >
                Maintenance ({stateCounts.UNDER_MAINTENANCE})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="space-y-3">
          {filteredVehicles.map((vehicle) => {
            const StateIcon = getStateIcon(vehicle.vehicleState);
            return (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className="w-full bg-card border border-border rounded-lg p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{vehicle.registrationNumber}</h3>
                      <span className="text-sm text-muted-foreground">{vehicle.vehicleType}</span>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStateColor(vehicle.vehicleState)}`}>
                        <StateIcon className="w-3.5 h-3.5" />
                        {getStateLabel(vehicle.vehicleState)}
                      </div>
                      {vehicle.availableForDispatch && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Visible to Dispatch
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-5 gap-6 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-0.5">Region / Hub</p>
                        <p className="text-foreground">{vehicle.region} · {vehicle.hub}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">Capacity</p>
                        <p className="text-foreground">{(vehicle.weightCapacity / 1000).toFixed(1)}k lbs · {vehicle.volumeCapacity} cu ft</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">Ownership</p>
                        <p className="text-foreground">{vehicle.ownershipType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">Maintenance</p>
                        <p className="text-foreground">
                          {vehicle.maintenanceStatus === 'OPERATIONAL' && 'Operational'}
                          {vehicle.maintenanceStatus === 'SCHEDULED_MAINTENANCE' && 'Scheduled'}
                          {vehicle.maintenanceStatus === 'UNSCHEDULED_ISSUE' && 'Unscheduled'}
                          {vehicle.maintenanceStatus === 'GROUNDED' && 'Grounded'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">Availability</p>
                        <p className="text-foreground">
                          {vehicle.availabilityIntent === 'AVAILABLE' && 'Available'}
                          {vehicle.availabilityIntent === 'TEMP_UNAVAILABLE' && 'Unavailable'}
                          {vehicle.availabilityIntent === 'RESTRICTED' && 'Restricted'}
                          {vehicle.availabilityIntent === 'NOT_SET' && 'Not Set'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                </div>
              </button>
            );
          })}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground">No vehicles found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Create Vehicle Modal */}
      {showCreateVehicle && (
        <CreateVehicleModal
          onClose={() => setShowCreateVehicle(false)}
          onSave={(vehicle) => {
            console.log('Vehicle created:', vehicle);
            setShowCreateVehicle(false);
          }}
        />
      )}

      {/* Vehicle Detail View */}
      {selectedVehicle && (
        <VehicleDetailView
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onUpdateMaintenance={(maintenanceStatus) => {
            console.log('Maintenance updated:', maintenanceStatus);
          }}
          onUpdateAvailability={(availabilityIntent) => {
            console.log('Availability updated:', availabilityIntent);
          }}
        />
      )}
    </div>
  );
}

// Create Vehicle Modal Component
function CreateVehicleModal({ onClose, onSave }: { onClose: () => void; onSave: (vehicle: any) => void }) {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    vehicleType: '',
    region: '',
    hub: '',
    weightCapacity: '',
    volumeCapacity: '',
    specialEquipment: [] as string[],
    ownershipType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Create Vehicle</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Enter vehicle identity and capability details</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* System Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-900 font-medium mb-1">Vehicle will not be dispatchable yet</p>
                <p className="text-blue-700">
                  After creation, you'll need to declare maintenance status and availability, and ensure compliance before the vehicle becomes visible to Dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Vehicle Identity */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Vehicle Identity</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Registration Number *</label>
                <input
                  type="text"
                  required
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABC-1234"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Vehicle Type *</label>
                <select
                  required
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Box Truck - 26ft">Box Truck - 26ft</option>
                  <option value="Box Truck - 24ft">Box Truck - 24ft</option>
                  <option value="Box Truck - 20ft">Box Truck - 20ft</option>
                  <option value="Cargo Van">Cargo Van</option>
                  <option value="Sprinter Van">Sprinter Van</option>
                  <option value="Refrigerated Truck">Refrigerated Truck</option>
                  <option value="Flatbed Truck">Flatbed Truck</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Assignment */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Location Assignment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Region *</label>
                <select
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select region</option>
                  <option value="Northeast">Northeast</option>
                  <option value="Southeast">Southeast</option>
                  <option value="Midwest">Midwest</option>
                  <option value="West">West</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Hub *</label>
                <select
                  required
                  value={formData.hub}
                  onChange={(e) => setFormData({ ...formData, hub: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select hub</option>
                  <option value="Hub-Boston-01">Hub-Boston-01</option>
                  <option value="Hub-Boston-02">Hub-Boston-02</option>
                  <option value="Hub-NYC-01">Hub-NYC-01</option>
                </select>
              </div>
            </div>
          </div>

          {/* Capacity Attributes */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Capacity Attributes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Weight Capacity (lbs) *</label>
                <input
                  type="number"
                  required
                  value={formData.weightCapacity}
                  onChange={(e) => setFormData({ ...formData, weightCapacity: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="26000"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Volume Capacity (cu ft) *</label>
                <input
                  type="number"
                  required
                  value={formData.volumeCapacity}
                  onChange={(e) => setFormData({ ...formData, volumeCapacity: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1800"
                />
              </div>
            </div>
          </div>

          {/* Special Equipment */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Special Equipment (Optional)</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Lift Gate', 'Climate Control', 'Refrigeration Unit', 'GPS Tracking', 'Temperature Monitor', 'Hazmat Certified'].map((equipment) => (
                <label key={equipment} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.specialEquipment.includes(equipment)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, specialEquipment: [...formData.specialEquipment, equipment] });
                      } else {
                        setFormData({ ...formData, specialEquipment: formData.specialEquipment.filter(e => e !== equipment) });
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded border-border focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-foreground">{equipment}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ownership Type */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Ownership Type</h3>
            <select
              required
              value={formData.ownershipType}
              onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select ownership type</option>
              <option value="Owned">Owned</option>
              <option value="Leased">Leased</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Vehicle state will be: <span className="font-medium text-gray-700">CREATED</span></p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Vehicle
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Vehicle Detail View Component
function VehicleDetailView({ 
  vehicle, 
  onClose, 
  onUpdateMaintenance,
  onUpdateAvailability 
}: { 
  vehicle: Vehicle; 
  onClose: () => void;
  onUpdateMaintenance: (maintenanceStatus: MaintenanceStatus) => void;
  onUpdateAvailability: (availabilityIntent: AvailabilityIntent) => void;
}) {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  const StateIcon = getStateIcon(vehicle.vehicleState);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-lg font-semibold text-foreground">{vehicle.registrationNumber}</h2>
              <span className="text-sm text-muted-foreground">{vehicle.vehicleType}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStateColor(vehicle.vehicleState)}`}>
                <StateIcon className="w-3.5 h-3.5" />
                {getStateLabel(vehicle.vehicleState)}
              </div>
              {vehicle.availableForDispatch && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Visible to Dispatch
                </div>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Identity Information */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Vehicle Identity & Capabilities</h3>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Registration Number</p>
                <p className="text-sm text-foreground">{vehicle.registrationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Region / Hub</p>
                <p className="text-sm text-foreground">{vehicle.region} · {vehicle.hub}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ownership</p>
                <p className="text-sm text-foreground">{vehicle.ownershipType}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Capacity</p>
                </div>
                <p className="text-sm text-foreground"><span className="font-medium">{(vehicle.weightCapacity / 1000).toFixed(1)}k lbs</span> weight</p>
                <p className="text-sm text-foreground"><span className="font-medium">{vehicle.volumeCapacity} cu ft</span> volume</p>
              </div>
              {vehicle.specialEquipment.length > 0 && (
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-2">Special Equipment</p>
                  <div className="flex flex-wrap gap-1">
                    {vehicle.specialEquipment.map((equipment) => (
                      <span key={equipment} className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs">
                        {equipment}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Compliance Validation (READ-ONLY) */}
          <section className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground">Compliance Validation</h3>
                <span className="text-xs text-muted-foreground">(System-evaluated)</span>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${
                vehicle.complianceStatus === 'COMPLIANT' ? 'text-green-700 bg-green-50 border-green-200' :
                vehicle.complianceStatus === 'NON_COMPLIANT' ? 'text-red-700 bg-red-50 border-red-200' :
                'text-gray-700 bg-gray-50 border-gray-200'
              }`}>
                {vehicle.complianceStatus === 'COMPLIANT' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {vehicle.complianceStatus === 'NON_COMPLIANT' && <XCircle className="w-3.5 h-3.5" />}
                {vehicle.complianceStatus === 'PENDING' && <Clock className="w-3.5 h-3.5" />}
                {vehicle.complianceStatus}
              </div>
            </div>
            
            {vehicle.registrationExpiry && vehicle.insuranceExpiry && vehicle.inspectionExpiry && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-1">Registration Expiry</p>
                  <p className="text-sm text-foreground font-medium">{vehicle.registrationExpiry}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-1">Insurance Expiry</p>
                  <p className="text-sm text-foreground font-medium">{vehicle.insuranceExpiry}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-1">Inspection Expiry</p>
                  <p className="text-sm text-foreground font-medium">{vehicle.inspectionExpiry}</p>
                </div>
              </div>
            )}

            {vehicle.complianceIssues && vehicle.complianceIssues.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-medium text-red-900 mb-2">Compliance Issues</p>
                <ul className="space-y-1">
                  {vehicle.complianceIssues.map((issue, idx) => (
                    <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {vehicle.complianceStatus === 'COMPLIANT' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700">All regulatory requirements met. No manual override available.</p>
              </div>
            )}

            {vehicle.complianceStatus === 'PENDING' && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-sm text-gray-700">Compliance validation pending. Vehicle cannot be dispatched until validated.</p>
              </div>
            )}
          </section>

          {/* Maintenance Status (FLEET DECLARATION) */}
          <section className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground">Maintenance Status</h3>
                <span className="text-xs text-muted-foreground">(Fleet declaration)</span>
              </div>
              <button
                onClick={() => setShowMaintenanceModal(true)}
                className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors"
              >
                Update Status
              </button>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 mb-3">
              <p className="text-sm text-muted-foreground mb-1">Current Status</p>
              <p className="text-sm text-foreground font-medium">
                {vehicle.maintenanceStatus === 'OPERATIONAL' && 'Operational'}
                {vehicle.maintenanceStatus === 'SCHEDULED_MAINTENANCE' && 'Scheduled Maintenance'}
                {vehicle.maintenanceStatus === 'UNSCHEDULED_ISSUE' && 'Unscheduled Issue'}
                {vehicle.maintenanceStatus === 'GROUNDED' && 'Grounded'}
              </p>
              {vehicle.nextMaintenanceDate && (
                <p className="text-xs text-muted-foreground mt-1">Next maintenance: {vehicle.nextMaintenanceDate}</p>
              )}
            </div>

            {vehicle.maintenanceStatus !== 'OPERATIONAL' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-900">
                  <span className="font-medium">Maintenance Block:</span> Vehicle is hidden from Dispatch. 
                  Only "Operational" status allows dispatch eligibility.
                </p>
              </div>
            )}

            {vehicle.maintenanceStatus === 'OPERATIONAL' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700">Vehicle is operational and ready for consideration.</p>
              </div>
            )}
          </section>

          {/* Availability Declaration (INTENT ONLY) */}
          <section className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground">Availability Declaration</h3>
                <span className="text-xs text-muted-foreground">(Intent only)</span>
              </div>
              <button
                onClick={() => setShowAvailabilityModal(true)}
                className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors"
              >
                Update Availability
              </button>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 mb-3">
              <p className="text-sm text-muted-foreground mb-1">Current Intent</p>
              <p className="text-sm text-foreground font-medium">
                {vehicle.availabilityIntent === 'AVAILABLE' && 'Available'}
                {vehicle.availabilityIntent === 'TEMP_UNAVAILABLE' && 'Temporarily Unavailable'}
                {vehicle.availabilityIntent === 'RESTRICTED' && 'Restricted'}
                {vehicle.availabilityIntent === 'NOT_SET' && 'Not Set'}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-900">
                <span className="font-medium">Important:</span> Availability intent does not guarantee dispatch eligibility. 
                Availability does not override maintenance or compliance blocks.
              </p>
            </div>
          </section>

          {/* Dispatch Eligibility (SYSTEM-COMPUTED, NON-EDITABLE) */}
          <section className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                <h3 className="font-medium text-foreground">Dispatch Eligibility Resolution</h3>
                <span className="text-xs text-muted-foreground">(System-computed only)</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-3">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Compliance</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    vehicle.complianceStatus === 'COMPLIANT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {vehicle.complianceStatus === 'COMPLIANT' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {vehicle.complianceStatus === 'COMPLIANT' ? 'Pass' : 'Fail'}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Maintenance</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    vehicle.maintenanceStatus === 'OPERATIONAL' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {vehicle.maintenanceStatus === 'OPERATIONAL' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {vehicle.maintenanceStatus === 'OPERATIONAL' ? 'Pass' : 'Fail'}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Availability</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    vehicle.availabilityIntent === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {vehicle.availabilityIntent === 'AVAILABLE' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {vehicle.availabilityIntent === 'AVAILABLE' ? 'Pass' : 'Fail'}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Result</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    vehicle.availableForDispatch ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {vehicle.availableForDispatch ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {vehicle.availableForDispatch ? 'ELIGIBLE' : 'BLOCKED'}
                  </div>
                </div>
              </div>

              <div className={`text-center p-3 rounded-lg ${
                vehicle.availableForDispatch ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <p className="text-sm font-medium mb-1">
                  {vehicle.availableForDispatch ? '✓ Vehicle is visible to Dispatch' : '✗ Vehicle is hidden from Dispatch'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {vehicle.availableForDispatch 
                    ? 'All eligibility criteria met. Dispatcher can assign this vehicle to routes.'
                    : 'One or more eligibility criteria not met. Vehicle will not appear in Dispatch systems.'}
                </p>
              </div>
            </div>

            <div className="bg-white border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-900">
                <span className="font-medium">Governance Rule:</span> Dispatch eligibility is deterministic and auditable. 
                No manual override is permitted. Fleet Manager cannot force eligibility.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Maintenance Modal */}
      {showMaintenanceModal && (
        <MaintenanceModal
          currentMaintenance={vehicle.maintenanceStatus}
          onClose={() => setShowMaintenanceModal(false)}
          onSave={(maintenanceStatus) => {
            onUpdateMaintenance(maintenanceStatus);
            setShowMaintenanceModal(false);
          }}
        />
      )}

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <VehicleAvailabilityModal
          currentAvailability={vehicle.availabilityIntent}
          onClose={() => setShowAvailabilityModal(false)}
          onSave={(availabilityIntent) => {
            onUpdateAvailability(availabilityIntent);
            setShowAvailabilityModal(false);
          }}
        />
      )}
    </div>
  );
}

// Maintenance Modal Component
function MaintenanceModal({ 
  currentMaintenance, 
  onClose, 
  onSave 
}: { 
  currentMaintenance: MaintenanceStatus; 
  onClose: () => void;
  onSave: (maintenanceStatus: MaintenanceStatus) => void;
}) {
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceStatus>(currentMaintenance);

  const options: { value: MaintenanceStatus; label: string; description: string }[] = [
    { value: 'OPERATIONAL', label: 'Operational', description: 'Vehicle is fully operational and ready for dispatch consideration' },
    { value: 'SCHEDULED_MAINTENANCE', label: 'Scheduled Maintenance', description: 'Vehicle is undergoing planned maintenance' },
    { value: 'UNSCHEDULED_ISSUE', label: 'Unscheduled Issue', description: 'Vehicle has an unexpected issue requiring attention' },
    { value: 'GROUNDED', label: 'Grounded', description: 'Vehicle is grounded due to safety or major issues' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-lg w-full">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Update Maintenance Status</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Declare vehicle's operational readiness</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-amber-900">
              <span className="font-medium">Important:</span> Only "Operational" status allows dispatch eligibility. 
              Any other status will block the vehicle from Dispatch.
            </p>
          </div>

          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMaintenance(option.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedMaintenance === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-border hover:border-blue-200 hover:bg-blue-50/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  selectedMaintenance === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-border'
                }`}>
                  {selectedMaintenance === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-border px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedMaintenance)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Status
          </button>
        </div>
      </div>
    </div>
  );
}

// Vehicle Availability Modal Component
function VehicleAvailabilityModal({ 
  currentAvailability, 
  onClose, 
  onSave 
}: { 
  currentAvailability: AvailabilityIntent; 
  onClose: () => void;
  onSave: (availabilityIntent: AvailabilityIntent) => void;
}) {
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityIntent>(currentAvailability);

  const options: { value: AvailabilityIntent; label: string; description: string }[] = [
    { value: 'AVAILABLE', label: 'Available', description: 'Vehicle is intended for dispatch consideration' },
    { value: 'TEMP_UNAVAILABLE', label: 'Temporarily Unavailable', description: 'Vehicle is temporarily unavailable for operational reasons' },
    { value: 'RESTRICTED', label: 'Restricted', description: 'Vehicle has temporary restrictions or limited use cases' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-lg w-full">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Update Availability Intent</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Declare vehicle's availability status</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-amber-900">
              <span className="font-medium">Important:</span> This is an intent declaration only. 
              Availability does not override maintenance or compliance blocks.
            </p>
          </div>

          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAvailability(option.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAvailability === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-border hover:border-blue-200 hover:bg-blue-50/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  selectedAvailability === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-border'
                }`}>
                  {selectedAvailability === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-border px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedAvailability)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
}

function getStateIcon(state: VehicleState) {
  switch (state) {
    case 'READY': return CheckCircle2;
    case 'CREATED': return Clock;
    case 'NON_COMPLIANT': return XCircle;
    case 'UNDER_MAINTENANCE': return Wrench;
  }
}

function getStateColor(state: VehicleState) {
  switch (state) {
    case 'READY': return 'text-green-700 bg-green-50 border-green-200';
    case 'CREATED': return 'text-gray-700 bg-gray-50 border-gray-200';
    case 'NON_COMPLIANT': return 'text-red-700 bg-red-50 border-red-200';
    case 'UNDER_MAINTENANCE': return 'text-amber-700 bg-amber-50 border-amber-200';
  }
}

function getStateLabel(state: VehicleState) {
  switch (state) {
    case 'READY': return 'Dispatch Eligible';
    case 'CREATED': return 'Not Dispatchable';
    case 'NON_COMPLIANT': return 'Blocked - Compliance';
    case 'UNDER_MAINTENANCE': return 'Blocked - Maintenance';
  }
}
