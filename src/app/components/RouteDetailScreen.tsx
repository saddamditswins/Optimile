import { useState } from 'react';
import { 
  ArrowLeft,
  Clock,
  User,
  Truck,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Map,
  Wrench,
  Radio,
  Battery,
  Package
} from 'lucide-react';
import { ExecutionTimeline } from './ExecutionTimeline';
import { StopsExecutionList } from './StopsExecutionList';
import { DriverContextPanel } from './DriverContextPanel';

interface RouteDetailScreenProps {
  routeId: string;
  onBack: () => void;
  onOpenMap?: () => void;
}

export function RouteDetailScreen({ routeId, onBack, onOpenMap }: RouteDetailScreenProps) {
  // Mock route data
  const routeData = {
    routeId: 'RT-2847',
    driverName: 'Driver #247',
    driverStatus: 'On Route' as const,
    vehicleId: 'VH-4521',
    healthStatus: 'At Risk' as const,
    shiftStart: '6:00 AM',
    shiftEnd: '2:00 PM',
    currentTime: '11:23 AM',
    shiftTimeRemaining: 163, // minutes
    delayMinutes: 22,
    bufferMinutes: -22, // negative means delay
    lastLocation: 'Downtown District, Main St & 5th Ave',
    lastLocationTime: '2 min ago',
    remainingCapacity: '12 packages',
    totalStops: 23,
    completedStops: 15,
    pendingStops: 7,
    failedStops: 1
  };

  const handleOpenMap = () => {
    if (onOpenMap) {
      onOpenMap();
    }
  };

  const handleOpenRecovery = () => {
    console.log('Open Recovery/Intervention module');
  };

  const getHealthStatusBadge = () => {
    switch (routeData.healthStatus) {
      case 'On Track':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-100 text-green-700 border border-green-200">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            <span>On Track</span>
          </span>
        );
      case 'At Risk':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-100 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-4 h-4" />
            <span>At Risk</span>
          </span>
        );
      case 'Breached':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-100 text-red-700 border border-red-200">
            <AlertTriangle className="w-4 h-4" />
            <span>Breached</span>
          </span>
        );
    }
  };

  const formatTimeRemaining = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
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
                  <h1 className="text-slate-900">{routeData.routeId}</h1>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-200">
                    EXECUTION VIEW
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  Complete route execution and performance detail
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenMap}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Map className="w-4 h-4 text-slate-700" />
                <span className="text-slate-700 text-sm">Route Map</span>
              </button>
              <button
                onClick={handleOpenRecovery}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Wrench className="w-4 h-4" />
                <span className="text-sm">Recovery Options</span>
              </button>
            </div>
          </div>

          {/* Context Indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">Wednesday, Dec 31, 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700">Morning Shift ({routeData.shiftStart} - {routeData.shiftEnd})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Current Time:</span>
              <span className="text-slate-900">{routeData.currentTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Route Summary Panel */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 p-6">
            <h2 className="text-slate-900 mb-4">Route Summary</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {/* Driver */}
              <div>
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
                  <User className="w-4 h-4" />
                  <span>Assigned Driver</span>
                </div>
                <div className="text-slate-900">{routeData.driverName}</div>
              </div>

              {/* Vehicle */}
              <div>
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
                  <Truck className="w-4 h-4" />
                  <span>Vehicle</span>
                </div>
                <div className="text-slate-900">{routeData.vehicleId}</div>
              </div>

              {/* Health Status */}
              <div>
                <div className="text-slate-600 text-sm mb-2">Health Status</div>
                <div>{getHealthStatusBadge()}</div>
              </div>

              {/* Shift Time Remaining */}
              <div>
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Shift Time Remaining</span>
                </div>
                <div className="text-slate-900">{formatTimeRemaining(routeData.shiftTimeRemaining)}</div>
              </div>

              {/* Delay/Buffer Status */}
              <div>
                <div className="text-slate-600 text-sm mb-2">Current Status</div>
                {routeData.bufferMinutes < 0 ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-red-700">{Math.abs(routeData.bufferMinutes)} min delay</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-700">{routeData.bufferMinutes} min buffer</span>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
                  <Package className="w-4 h-4" />
                  <span>Stops Progress</span>
                </div>
                <div className="text-slate-900">
                  {routeData.completedStops} / {routeData.totalStops} completed
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column: Timeline and Stops */}
            <div className="xl:col-span-2 space-y-6">
              {/* Execution Timeline */}
              <ExecutionTimeline 
                completedStops={routeData.completedStops}
                totalStops={routeData.totalStops}
                delayMinutes={routeData.delayMinutes}
              />

              {/* Stops Execution List */}
              <StopsExecutionList routeId={routeData.routeId} />
            </div>

            {/* Right Column: Driver Context */}
            <div className="xl:col-span-1">
              <DriverContextPanel
                driverName={routeData.driverName}
                driverStatus={routeData.driverStatus}
                lastLocation={routeData.lastLocation}
                lastLocationTime={routeData.lastLocationTime}
                remainingCapacity={routeData.remainingCapacity}
                shiftTimeRemaining={routeData.shiftTimeRemaining}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
