import { useState } from 'react';
import { StopMarker, Stop } from './StopMarker';
import { AlertTriangle } from 'lucide-react';

interface MapCanvasProps {
  routeId: string;
  onStopHover: (stopId: string | null) => void;
  onStopClick?: (stopId: string) => void;
  hoveredStop: string | null;
}

export function MapCanvas({ routeId, onStopHover, onStopClick, hoveredStop }: MapCanvasProps) {
  // Mock stops data with coordinates
  const stops: Stop[] = [
    { id: '1', sequenceNumber: 1, x: 120, y: 580, status: 'Completed', customerId: 'C-8472', customerName: 'Acme Corp', slaWindow: '6:30-8:00 AM', delay: 0 },
    { id: '2', sequenceNumber: 2, x: 180, y: 520, status: 'Completed', customerId: 'C-9215', customerName: 'Tech Solutions Inc', slaWindow: '7:00-8:30 AM', delay: 0, isVIP: true },
    { id: '3', sequenceNumber: 3, x: 250, y: 460, status: 'Completed', customerId: 'C-7341', customerName: 'Business Center', slaWindow: '7:30-9:00 AM', delay: 0 },
    { id: '4', sequenceNumber: 4, x: 310, y: 420, status: 'Completed', customerId: 'C-4582', customerName: 'Metro Plaza', slaWindow: '8:00-9:30 AM', delay: 0 },
    { id: '5', sequenceNumber: 5, x: 380, y: 380, status: 'Completed', customerId: 'C-6193', customerName: 'City Mall', slaWindow: '8:30-10:00 AM', delay: 0 },
    { id: '6', sequenceNumber: 6, x: 450, y: 340, status: 'Completed', customerId: 'C-2847', customerName: 'Plaza District', slaWindow: '9:00-10:30 AM', delay: 0 },
    { id: '7', sequenceNumber: 7, x: 520, y: 300, status: 'Completed', customerId: 'C-9172', customerName: 'North Center', slaWindow: '9:30-11:00 AM', delay: 0 },
    { id: '8', sequenceNumber: 8, x: 590, y: 260, status: 'Completed', customerId: 'C-3654', customerName: 'Summit Tower', slaWindow: '10:00-11:30 AM', delay: 5 },
    { id: '9', sequenceNumber: 9, x: 660, y: 240, status: 'Completed', customerId: 'C-8219', customerName: 'Enterprise Hub', slaWindow: '10:15-11:45 AM', delay: 8 },
    { id: '10', sequenceNumber: 10, x: 730, y: 220, status: 'Completed', customerId: 'C-5673', customerName: 'Tech Park', slaWindow: '10:30-12:00 PM', delay: 12 },
    { id: '11', sequenceNumber: 11, x: 800, y: 200, status: 'Completed', customerId: 'C-7284', customerName: 'Innovation Square', slaWindow: '10:45-12:15 PM', delay: 15 },
    { id: '12', sequenceNumber: 12, x: 870, y: 180, status: 'Failed', customerId: 'C-3891', customerName: 'Downtown Market', slaWindow: '10:00-11:00 AM', delay: 25, riskNote: 'Customer unavailable' },
    { id: '13', sequenceNumber: 13, x: 920, y: 160, status: 'At Risk', customerId: 'C-5624', customerName: 'Premium Office', slaWindow: '10:30-12:00 PM', delay: 22, isVIP: true, riskNote: 'Critical - SLA breach in 8 min' },
    { id: '14', sequenceNumber: 14, x: 960, y: 220, status: 'At Risk', customerId: 'C-7823', customerName: 'City Center Retail', slaWindow: '11:00-12:30 PM', delay: 22, riskNote: 'High risk due to upstream delays' },
    { id: '15', sequenceNumber: 15, x: 1000, y: 280, status: 'At Risk', customerId: 'C-4127', customerName: 'Enterprise Solutions', slaWindow: '11:30-1:00 PM', delay: 18, riskNote: 'Medium risk - reduced buffer' },
    { id: '16', sequenceNumber: 16, x: 1040, y: 340, status: 'Pending', customerId: 'C-2956', customerName: 'Global Tech', slaWindow: '12:00-1:30 PM', delay: 0, isVIP: true },
    { id: '17', sequenceNumber: 17, x: 1080, y: 400, status: 'Pending', customerId: 'C-6734', customerName: 'Metro Wholesale', slaWindow: '12:30-2:00 PM', delay: 0 },
    { id: '18', sequenceNumber: 18, x: 1120, y: 460, status: 'Pending', customerId: 'C-8145', customerName: 'Summit Logistics', slaWindow: '1:00-2:30 PM', delay: 0 },
    { id: '19', sequenceNumber: 19, x: 1080, y: 520, status: 'Pending', customerId: 'C-4923', customerName: 'Harbor Point', slaWindow: '1:15-2:45 PM', delay: 0 },
    { id: '20', sequenceNumber: 20, x: 1020, y: 560, status: 'Pending', customerId: 'C-7156', customerName: 'Coastal Center', slaWindow: '1:30-3:00 PM', delay: 0 },
  ];

  // Driver's current position (between stop 15 and 16)
  const driverPosition = { x: 1015, y: 305 };

  // Traffic/disruption zones
  const disruptionZones = [
    { x: 680, y: 210, width: 180, height: 60, label: 'Traffic Congestion', severity: 'high' },
    { x: 920, y: 140, width: 100, height: 100, label: 'Bottleneck Zone', severity: 'critical' }
  ];

  // Generate route path
  const generateRoutePath = () => {
    const pathPoints = stops.map(stop => `${stop.x},${stop.y}`).join(' ');
    return pathPoints;
  };

  // Split path into completed and remaining
  const completedStops = stops.filter(s => s.status === 'Completed' || s.status === 'Failed');
  const remainingStops = stops.filter(s => s.status === 'Pending' || s.status === 'At Risk');

  const generateCompletedPath = () => {
    return completedStops.map(stop => `${stop.x},${stop.y}`).join(' ');
  };

  const generateRemainingPath = () => {
    // Include the last completed stop to connect
    const lastCompleted = completedStops[completedStops.length - 1];
    const allPoints = [lastCompleted, ...remainingStops];
    return allPoints.map(stop => `${stop.x},${stop.y}`).join(' ');
  };

  return (
    <div className="w-full h-full bg-slate-100 relative overflow-hidden">
      {/* Simulated Map Background */}
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1200 650"
        style={{ 
          background: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)'
        }}
      >
        {/* Grid lines for map effect */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="1200" height="650" fill="url(#grid)" />

        {/* Simulated streets/roads */}
        <line x1="100" y1="600" x2="1100" y2="150" stroke="#94a3b8" strokeWidth="8" opacity="0.3" />
        <line x1="150" y1="150" x2="1150" y2="550" stroke="#94a3b8" strokeWidth="6" opacity="0.3" />
        <line x1="400" y1="100" x2="400" y2="600" stroke="#94a3b8" strokeWidth="5" opacity="0.2" />
        <line x1="800" y1="100" x2="800" y2="600" stroke="#94a3b8" strokeWidth="5" opacity="0.2" />

        {/* Disruption Zones */}
        {disruptionZones.map((zone, index) => (
          <g key={index}>
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              fill={zone.severity === 'critical' ? '#fee2e2' : '#fed7aa'}
              stroke={zone.severity === 'critical' ? '#ef4444' : '#f97316'}
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.4"
              rx="8"
            />
            <text
              x={zone.x + zone.width / 2}
              y={zone.y + zone.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs"
              fill={zone.severity === 'critical' ? '#991b1b' : '#9a3412'}
              fontWeight="600"
            >
              {zone.label}
            </text>
          </g>
        ))}

        {/* Completed Route Path */}
        <polyline
          points={generateCompletedPath()}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Remaining Route Path */}
        <polyline
          points={generateRemainingPath()}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeDasharray="8 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* Driver Current Position */}
        <g>
          {/* Pulse effect */}
          <circle
            cx={driverPosition.x}
            cy={driverPosition.y}
            r="20"
            fill="#3b82f6"
            opacity="0.2"
          >
            <animate
              attributeName="r"
              from="15"
              to="25"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.4"
              to="0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Driver marker */}
          <circle
            cx={driverPosition.x}
            cy={driverPosition.y}
            r="10"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="3"
          />
          
          {/* Direction indicator */}
          <path
            d={`M ${driverPosition.x} ${driverPosition.y - 10} L ${driverPosition.x + 4} ${driverPosition.y - 4} L ${driverPosition.x} ${driverPosition.y - 6} L ${driverPosition.x - 4} ${driverPosition.y - 4} Z`}
            fill="white"
          />
        </g>
      </svg>

      {/* Stop Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {stops.map((stop) => (
          <div 
            key={stop.id}
            className="pointer-events-auto"
            style={{
              position: 'absolute',
              left: `${(stop.x / 1200) * 100}%`,
              top: `${(stop.y / 650) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <StopMarker
              stop={stop}
              isHovered={hoveredStop === stop.id}
              onHover={() => onStopHover(stop.id)}
              onLeave={() => onStopHover(null)}
              onClick={() => onStopClick?.(stop.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
