import { useState } from 'react';
import { 
  ArrowLeft,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  Radio,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { MapCanvas } from './MapCanvas';
import { MapSidePanel } from './MapSidePanel';

interface RouteMapViewProps {
  routeId: string;
  onBack: () => void;
  onStopClick?: (stopId: string) => void;
}

export function RouteMapView({ routeId, onBack, onStopClick }: RouteMapViewProps) {
  const [hoveredStop, setHoveredStop] = useState<string | null>(null);

  // Mock route data
  const routeData = {
    routeId: 'RT-2847',
    driverName: 'Driver #247',
    currentTime: '11:23 AM',
    totalStops: 23,
    completedStops: 15,
    currentLocation: {
      lat: 37.7849,
      lng: -122.4194,
      label: 'Downtown District'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-4 sm:px-6 py-4">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-slate-900">{routeData.routeId} - Route Map</h1>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-200">
                    SPATIAL VIEW
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  Geographic execution context and route progression
                </p>
              </div>
            </div>

            {/* Map Controls */}
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <ZoomIn className="w-4 h-4 text-slate-700" />
              </button>
              <button className="p-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <ZoomOut className="w-4 h-4 text-slate-700" />
              </button>
              <button className="p-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Maximize2 className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>

          {/* Context Indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">Current Time: {routeData.currentTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">{routeData.driverName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700">{routeData.currentLocation.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-600" />
              <span className="text-slate-700">
                {routeData.completedStops} / {routeData.totalStops} stops completed
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row lg:h-[calc(100vh-120px)]">
        {/* Map Canvas */}
        <div className="h-[50vh] lg:h-auto lg:flex-1 relative">
          <MapCanvas 
            routeId={routeId}
            onStopHover={setHoveredStop}
            onStopClick={onStopClick}
            hoveredStop={hoveredStop}
          />

          {/* Legend */}
          <div className="absolute bottom-6 left-6 bg-white rounded-xl border border-slate-200 shadow-lg p-4 max-w-xs">
            <div className="text-slate-900 text-sm mb-3">Map Legend</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                <span className="text-slate-700">Completed Stop</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-slate-400 rounded-full border-2 border-white shadow-sm" />
                <span className="text-slate-700">Pending Stop</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-sm" />
                <span className="text-slate-700">At Risk Stop</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
                <span className="text-slate-700">Critical/Failed Stop</span>
              </div>
              <div className="border-t border-slate-200 my-2" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-green-500" />
                <span className="text-slate-700">Completed Route Segment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-slate-400" />
                <span className="text-slate-700">Remaining Route Segment</span>
              </div>
              <div className="border-t border-slate-200 my-2" />
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-slate-700">Driver Current Location</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-3 h-3 text-orange-600" />
                <span className="text-slate-700">Traffic/Disruption Zone</span>
              </div>
            </div>
          </div>

          {/* Read-only Notice */}
          <div className="absolute top-6 left-6 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <Radio className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 text-sm">
              Read-only map view - Use Recovery module to modify route
            </span>
          </div>
        </div>

        {/* Side Panel */}
        <MapSidePanel 
          routeId={routeId}
          onStopClick={onStopClick}
        />
      </main>
    </div>
  );
}
