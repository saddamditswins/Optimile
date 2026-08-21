import { useState } from 'react';
import { Search, Plus, X, CheckCircle2, XCircle, AlertCircle, Clock, User, FileText, Calendar, MapPin, ChevronRight } from 'lucide-react';

type ComplianceStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'PENDING';
type AvailabilityIntent = 'AVAILABLE' | 'ON_LEAVE' | 'RESTRICTED' | 'TEMP_UNAVAILABLE' | 'NOT_SET';
type HOSStatus = 'COMPLIANT' | 'AT_RISK' | 'BLOCKED';
type DriverState = 'CREATED' | 'NON_COMPLIANT' | 'AT_RISK' | 'READY';

interface Driver {
  id: string;
  name: string;
  employeeId: string;
  region: string;
  hub: string;
  licenseType: string;
  licenseExpiry: string;
  certifications: string[];
  complianceStatus: ComplianceStatus;
  availabilityIntent: AvailabilityIntent;
  hosStatus: HOSStatus;
  driverState: DriverState;
  availableForDispatch: boolean;
  complianceIssues?: string[];
  hosHoursRemaining?: number;
  nextRestRequired?: string;
  createdDate: string;
}

export function FleetDriversManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState<'all' | DriverState>('all');
  const [showCreateDriver, setShowCreateDriver] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Mock driver data
  const [drivers] = useState<Driver[]>([
    {
      id: 'DRV-001',
      name: 'Michael Chen',
      employeeId: 'EMP-2847',
      region: 'Northeast',
      hub: 'Hub-Boston-01',
      licenseType: 'CDL-A',
      licenseExpiry: '2025-08-15',
      certifications: ['Hazmat', 'Tanker'],
      complianceStatus: 'COMPLIANT',
      availabilityIntent: 'AVAILABLE',
      hosStatus: 'COMPLIANT',
      driverState: 'READY',
      availableForDispatch: true,
      hosHoursRemaining: 8.5,
      createdDate: '2024-01-15',
    },
    {
      id: 'DRV-002',
      name: 'Sarah Johnson',
      employeeId: 'EMP-2848',
      region: 'Northeast',
      hub: 'Hub-Boston-01',
      licenseType: 'CDL-B',
      licenseExpiry: '2024-11-20',
      certifications: ['Passenger'],
      complianceStatus: 'NON_COMPLIANT',
      complianceIssues: ['License expiring in 45 days', 'Missing medical certificate'],
      availabilityIntent: 'AVAILABLE',
      hosStatus: 'COMPLIANT',
      driverState: 'NON_COMPLIANT',
      availableForDispatch: false,
      hosHoursRemaining: 10,
      createdDate: '2024-02-20',
    },
    {
      id: 'DRV-003',
      name: 'David Martinez',
      employeeId: 'EMP-2849',
      region: 'Northeast',
      hub: 'Hub-Boston-02',
      licenseType: 'CDL-A',
      licenseExpiry: '2026-03-10',
      certifications: ['Hazmat'],
      complianceStatus: 'COMPLIANT',
      availabilityIntent: 'AVAILABLE',
      hosStatus: 'AT_RISK',
      driverState: 'AT_RISK',
      availableForDispatch: false,
      hosHoursRemaining: 2.5,
      nextRestRequired: '2025-01-07T14:00:00',
      createdDate: '2024-03-10',
    },
    {
      id: 'DRV-004',
      name: 'Jessica Williams',
      employeeId: 'EMP-2850',
      region: 'Northeast',
      hub: 'Hub-Boston-01',
      licenseType: 'CDL-A',
      licenseExpiry: '2025-12-05',
      certifications: ['Hazmat', 'Doubles/Triples'],
      complianceStatus: 'COMPLIANT',
      availabilityIntent: 'ON_LEAVE',
      hosStatus: 'COMPLIANT',
      driverState: 'READY',
      availableForDispatch: false,
      hosHoursRemaining: 11,
      createdDate: '2024-01-05',
    },
    {
      id: 'DRV-005',
      name: 'Robert Taylor',
      employeeId: 'EMP-2851',
      region: 'Northeast',
      hub: 'Hub-Boston-02',
      licenseType: 'CDL-B',
      licenseExpiry: '2027-01-15',
      certifications: [],
      complianceStatus: 'PENDING',
      availabilityIntent: 'NOT_SET',
      hosStatus: 'COMPLIANT',
      driverState: 'CREATED',
      availableForDispatch: false,
      createdDate: '2025-01-06',
    },
  ]);

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterState === 'all' || driver.driverState === filterState;
    return matchesSearch && matchesFilter;
  });

  const getStateColor = (state: DriverState) => {
    switch (state) {
      case 'READY': return 'text-green-700 bg-green-50 border-green-200';
      case 'CREATED': return 'text-gray-700 bg-gray-50 border-gray-200';
      case 'NON_COMPLIANT': return 'text-red-700 bg-red-50 border-red-200';
      case 'AT_RISK': return 'text-amber-700 bg-amber-50 border-amber-200';
    }
  };

  const getStateLabel = (state: DriverState) => {
    switch (state) {
      case 'READY': return 'Dispatch Eligible';
      case 'CREATED': return 'Not Dispatchable';
      case 'NON_COMPLIANT': return 'Blocked - Compliance';
      case 'AT_RISK': return 'Blocked - HOS';
    }
  };

  const getStateIcon = (state: DriverState) => {
    switch (state) {
      case 'READY': return CheckCircle2;
      case 'CREATED': return Clock;
      case 'NON_COMPLIANT': return XCircle;
      case 'AT_RISK': return AlertCircle;
    }
  };

  const stateCounts = {
    all: drivers.length,
    READY: drivers.filter(d => d.driverState === 'READY').length,
    CREATED: drivers.filter(d => d.driverState === 'CREATED').length,
    NON_COMPLIANT: drivers.filter(d => d.driverState === 'NON_COMPLIANT').length,
    AT_RISK: drivers.filter(d => d.driverState === 'AT_RISK').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">Drivers Management</h1>
              <p className="text-sm text-muted-foreground">Manage driver records, compliance, and availability intent</p>
            </div>
            <button
              onClick={() => setShowCreateDriver(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Driver
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or employee ID..."
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
                onClick={() => setFilterState('AT_RISK')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterState === 'AT_RISK'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-card text-muted-foreground border border-border hover:bg-muted'
                }`}
              >
                At Risk ({stateCounts.AT_RISK})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Driver List */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="space-y-3">
          {filteredDrivers.map((driver) => {
            const StateIcon = getStateIcon(driver.driverState);
            return (
              <button
                key={driver.id}
                onClick={() => setSelectedDriver(driver)}
                className="w-full bg-card border border-border rounded-lg p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{driver.name}</h3>
                      <span className="text-sm text-muted-foreground">{driver.employeeId}</span>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStateColor(driver.driverState)}`}>
                        <StateIcon className="w-3.5 h-3.5" />
                        {getStateLabel(driver.driverState)}
                      </div>
                      {driver.availableForDispatch && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Visible to Dispatch
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-6 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-0.5">Region / Hub</p>
                        <p className="text-foreground">{driver.region} · {driver.hub}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">License</p>
                        <p className="text-foreground">{driver.licenseType} · Exp {driver.licenseExpiry}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">Availability Intent</p>
                        <p className="text-foreground">
                          {driver.availabilityIntent === 'AVAILABLE' && 'Available'}
                          {driver.availabilityIntent === 'ON_LEAVE' && 'On Leave'}
                          {driver.availabilityIntent === 'RESTRICTED' && 'Restricted'}
                          {driver.availabilityIntent === 'TEMP_UNAVAILABLE' && 'Temp Unavailable'}
                          {driver.availabilityIntent === 'NOT_SET' && 'Not Set'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">HOS Remaining</p>
                        <p className="text-foreground">
                          {driver.hosHoursRemaining !== undefined ? `${driver.hosHoursRemaining}h` : 'N/A'}
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

        {filteredDrivers.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground">No drivers found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Create Driver Modal */}
      {showCreateDriver && (
        <CreateDriverModal
          onClose={() => setShowCreateDriver(false)}
          onSave={(driver) => {
            console.log('Driver created:', driver);
            setShowCreateDriver(false);
          }}
        />
      )}

      {/* Driver Detail View */}
      {selectedDriver && (
        <DriverDetailView
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
          onUpdateAvailability={(availabilityIntent) => {
            console.log('Availability updated:', availabilityIntent);
          }}
        />
      )}
    </div>
  );
}

// Create Driver Modal Component
function CreateDriverModal({ onClose, onSave }: { onClose: () => void; onSave: (driver: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    region: '',
    hub: '',
    licenseType: '',
    licenseExpiry: '',
    certifications: [] as string[],
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
            <h2 className="text-lg font-semibold text-foreground">Create Driver</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Enter driver identity and compliance details</p>
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
                <p className="text-blue-900 font-medium mb-1">Driver will not be dispatchable yet</p>
                <p className="text-blue-700">
                  After creation, you'll need to declare availability and ensure compliance before the driver becomes visible to Dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Personal Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Employee ID *</label>
                <input
                  type="text"
                  required
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="EMP-XXXX"
                />
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

          {/* License Details */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">License Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">License Type *</label>
                <select
                  required
                  value={formData.licenseType}
                  onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="CDL-A">CDL-A</option>
                  <option value="CDL-B">CDL-B</option>
                  <option value="CDL-C">CDL-C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">License Expiry *</label>
                <input
                  type="date"
                  required
                  value={formData.licenseExpiry}
                  onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Certifications (Optional)</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Hazmat', 'Tanker', 'Doubles/Triples', 'Passenger'].map((cert) => (
                <label key={cert} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.certifications.includes(cert)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, certifications: [...formData.certifications, cert] });
                      } else {
                        setFormData({ ...formData, certifications: formData.certifications.filter(c => c !== cert) });
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded border-border focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-foreground">{cert}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Driver state will be: <span className="font-medium text-gray-700">CREATED</span></p>
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
                Create Driver
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Driver Detail View Component
function DriverDetailView({ 
  driver, 
  onClose, 
  onUpdateAvailability 
}: { 
  driver: Driver; 
  onClose: () => void;
  onUpdateAvailability: (availability: AvailabilityIntent) => void;
}) {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  const StateIcon = getStateIcon(driver.driverState);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-lg font-semibold text-foreground">{driver.name}</h2>
              <span className="text-sm text-muted-foreground">{driver.employeeId}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStateColor(driver.driverState)}`}>
                <StateIcon className="w-3.5 h-3.5" />
                {getStateLabel(driver.driverState)}
              </div>
              {driver.availableForDispatch && (
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
              <User className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Identity Information</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Employee ID</p>
                <p className="text-sm text-foreground">{driver.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Region</p>
                <p className="text-sm text-foreground">{driver.region}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hub</p>
                <p className="text-sm text-foreground">{driver.hub}</p>
              </div>
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
                driver.complianceStatus === 'COMPLIANT' ? 'text-green-700 bg-green-50 border-green-200' :
                driver.complianceStatus === 'NON_COMPLIANT' ? 'text-red-700 bg-red-50 border-red-200' :
                'text-gray-700 bg-gray-50 border-gray-200'
              }`}>
                {driver.complianceStatus === 'COMPLIANT' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {driver.complianceStatus === 'NON_COMPLIANT' && <XCircle className="w-3.5 h-3.5" />}
                {driver.complianceStatus === 'PENDING' && <Clock className="w-3.5 h-3.5" />}
                {driver.complianceStatus}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">License Type</p>
                <p className="text-sm text-foreground font-medium">{driver.licenseType}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">License Expiry</p>
                <p className="text-sm text-foreground font-medium">{driver.licenseExpiry}</p>
              </div>
            </div>

            {driver.certifications.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {driver.certifications.map((cert) => (
                    <span key={cert} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {driver.complianceIssues && driver.complianceIssues.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-medium text-red-900 mb-2">Compliance Issues</p>
                <ul className="space-y-1">
                  {driver.complianceIssues.map((issue, idx) => (
                    <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {driver.complianceStatus === 'COMPLIANT' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700">All regulatory requirements met. No manual override available.</p>
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
                {driver.availabilityIntent === 'AVAILABLE' && 'Available'}
                {driver.availabilityIntent === 'ON_LEAVE' && 'On Leave'}
                {driver.availabilityIntent === 'RESTRICTED' && 'Restricted'}
                {driver.availabilityIntent === 'TEMP_UNAVAILABLE' && 'Temporarily Unavailable'}
                {driver.availabilityIntent === 'NOT_SET' && 'Not Set'}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-900">
                <span className="font-medium">Important:</span> Availability intent does not guarantee dispatch eligibility. 
                System will compute final eligibility based on compliance and HOS status.
              </p>
            </div>
          </section>

          {/* HOS / Fatigue Check (SYSTEM-COMPUTED) */}
          <section className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground">HOS / Fatigue Check</h3>
                <span className="text-xs text-muted-foreground">(System-computed)</span>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${
                driver.hosStatus === 'COMPLIANT' ? 'text-green-700 bg-green-50 border-green-200' :
                driver.hosStatus === 'AT_RISK' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                'text-red-700 bg-red-50 border-red-200'
              }`}>
                {driver.hosStatus === 'COMPLIANT' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {driver.hosStatus === 'AT_RISK' && <AlertCircle className="w-3.5 h-3.5" />}
                {driver.hosStatus === 'BLOCKED' && <XCircle className="w-3.5 h-3.5" />}
                {driver.hosStatus}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">Hours Remaining</p>
                <p className="text-lg text-foreground font-semibold">
                  {driver.hosHoursRemaining !== undefined ? `${driver.hosHoursRemaining}h` : 'N/A'}
                </p>
              </div>
              {driver.nextRestRequired && (
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-1">Next Rest Required</p>
                  <p className="text-sm text-foreground font-medium">
                    {new Date(driver.nextRestRequired).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {driver.hosStatus === 'AT_RISK' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-900">
                  <span className="font-medium">Safety Block:</span> Driver will remain hidden from Dispatch until HOS compliance is restored. 
                  No manual override available.
                </p>
              </div>
            )}

            {driver.hosStatus === 'COMPLIANT' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700">HOS requirements met. No safety concerns.</p>
              </div>
            )}
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
                    driver.complianceStatus === 'COMPLIANT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {driver.complianceStatus === 'COMPLIANT' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {driver.complianceStatus === 'COMPLIANT' ? 'Pass' : 'Fail'}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Availability</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    driver.availabilityIntent === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {driver.availabilityIntent === 'AVAILABLE' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {driver.availabilityIntent === 'AVAILABLE' ? 'Pass' : 'Fail'}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">HOS</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    driver.hosStatus === 'COMPLIANT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {driver.hosStatus === 'COMPLIANT' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {driver.hosStatus === 'COMPLIANT' ? 'Pass' : 'Fail'}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Result</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    driver.availableForDispatch ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {driver.availableForDispatch ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {driver.availableForDispatch ? 'ELIGIBLE' : 'BLOCKED'}
                  </div>
                </div>
              </div>

              <div className={`text-center p-3 rounded-lg ${
                driver.availableForDispatch ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <p className="text-sm font-medium mb-1">
                  {driver.availableForDispatch ? '✓ Driver is visible to Dispatch' : '✗ Driver is hidden from Dispatch'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {driver.availableForDispatch 
                    ? 'All eligibility criteria met. Dispatcher can assign this driver.'
                    : 'One or more eligibility criteria not met. Driver will not appear in Dispatch systems.'}
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

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <AvailabilityModal
          currentAvailability={driver.availabilityIntent}
          onClose={() => setShowAvailabilityModal(false)}
          onSave={(availability) => {
            onUpdateAvailability(availability);
            setShowAvailabilityModal(false);
          }}
        />
      )}
    </div>
  );
}

// Availability Modal Component
function AvailabilityModal({ 
  currentAvailability, 
  onClose, 
  onSave 
}: { 
  currentAvailability: AvailabilityIntent; 
  onClose: () => void;
  onSave: (availability: AvailabilityIntent) => void;
}) {
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityIntent>(currentAvailability);

  const options: { value: AvailabilityIntent; label: string; description: string }[] = [
    { value: 'AVAILABLE', label: 'Available', description: 'Driver intends to work and is ready for assignment consideration' },
    { value: 'ON_LEAVE', label: 'On Leave', description: 'Driver is on scheduled leave or vacation' },
    { value: 'RESTRICTED', label: 'Restricted', description: 'Driver has temporary restrictions (light duty, limited hours, etc.)' },
    { value: 'TEMP_UNAVAILABLE', label: 'Temporarily Unavailable', description: 'Driver is temporarily unavailable (personal reasons, illness, etc.)' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-lg w-full">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Update Availability Intent</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Declare driver's availability status</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-amber-900">
              <span className="font-medium">Important:</span> This is an intent declaration only. 
              Final dispatch eligibility is computed by the system based on compliance and HOS status.
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

function getStateIcon(state: DriverState) {
  switch (state) {
    case 'READY': return CheckCircle2;
    case 'CREATED': return Clock;
    case 'NON_COMPLIANT': return XCircle;
    case 'AT_RISK': return AlertCircle;
  }
}

function getStateColor(state: DriverState) {
  switch (state) {
    case 'READY': return 'text-green-700 bg-green-50 border-green-200';
    case 'CREATED': return 'text-gray-700 bg-gray-50 border-gray-200';
    case 'NON_COMPLIANT': return 'text-red-700 bg-red-50 border-red-200';
    case 'AT_RISK': return 'text-amber-700 bg-amber-50 border-amber-200';
  }
}

function getStateLabel(state: DriverState) {
  switch (state) {
    case 'READY': return 'Dispatch Eligible';
    case 'CREATED': return 'Not Dispatchable';
    case 'NON_COMPLIANT': return 'Blocked - Compliance';
    case 'AT_RISK': return 'Blocked - HOS';
  }
}
