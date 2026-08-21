import { useState } from 'react';
import { Package, Navigation, CheckCircle, AlertCircle, Clock, MapPin } from 'lucide-react';
import { DriverStopExecution } from './DriverStopExecution';

type DriverState = 
  | 'no-assignment'
  | 'assignment-received'
  | 'en-route'
  | 'at-stop'
  | 'executing-stop'
  | 'issue-reported'
  | 'completed';

interface DriverTodaysWorkProps {
  onNavigate?: (screen: string) => void;
}

export function DriverTodaysWork({ onNavigate }: DriverTodaysWorkProps) {
  // For demo purposes, allow state switching
  const [currentState, setCurrentState] = useState<DriverState>('no-assignment');
  const [showStateSelector, setShowStateSelector] = useState(false);
  const [criticalInstruction, setCriticalInstruction] = useState<{
    id: string;
    title: string;
    contextRef: string;
  } | null>({
    id: 'CRIT-001',
    title: 'Proceed directly to next stop',
    contextRef: 'Stop #3'
  });

  // Mock data
  const assignmentData = {
    routeId: 'RT-2847',
    totalStops: 12,
    shiftStart: '8:00 AM'
  };

  const currentStopData = {
    stopNumber: 3,
    totalStops: 12,
    address: '742 Evergreen Terrace',
    customerName: 'Simpson',
    instructions: 'Leave at door. Ring bell.'
  };

  const handleAcknowledgeCritical = () => {
    setCriticalInstruction(null);
    alert('Instruction acknowledged');
  };

  // If in execution mode, show the execution flow
  if (currentState === 'executing-stop') {
    return (
      <DriverStopExecution
        stopData={currentStopData}
        onComplete={() => {
          // After successful completion, go to next stop or completed
          if (currentStopData.stopNumber === assignmentData.totalStops) {
            setCurrentState('completed');
          } else {
            setCurrentState('en-route');
          }
        }}
        onIssueReported={() => {
          setCurrentState('issue-reported');
        }}
      />
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Demo State Selector - Remove in production */}
      <div className="bg-yellow-50 border-b border-yellow-200 p-2">
        <button 
          onClick={() => setShowStateSelector(!showStateSelector)}
          className="text-xs text-yellow-800 font-medium w-full text-left"
        >
          Demo Mode: {currentState.replace('-', ' ').toUpperCase()} (tap to change)
        </button>
        {showStateSelector && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button onClick={() => { setCurrentState('no-assignment'); setShowStateSelector(false); }} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">No Assignment</button>
            <button onClick={() => { setCurrentState('assignment-received'); setShowStateSelector(false); }} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Assignment Received</button>
            <button onClick={() => { setCurrentState('en-route'); setShowStateSelector(false); }} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">En Route</button>
            <button onClick={() => { setCurrentState('at-stop'); setShowStateSelector(false); }} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">At Stop</button>
            <button onClick={() => { setCurrentState('executing-stop'); setShowStateSelector(false); }} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Executing Stop</button>
            <button onClick={() => { setCurrentState('issue-reported'); setShowStateSelector(false); }} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Issue Reported</button>
            <button onClick={() => { setCurrentState('completed'); setShowStateSelector(false); }} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Completed</button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        
        {/* Critical Instruction Banner (High Priority - Shows Above Content) */}
        {criticalInstruction && (currentState === 'en-route' || currentState === 'at-stop') && (
          <div className="w-full mb-4 bg-orange-500 border-2 border-orange-600 rounded-2xl p-5 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-white text-xs font-semibold uppercase mb-1">
                  Critical Instruction
                </div>
                <div className="text-white font-semibold text-lg mb-1">
                  {criticalInstruction.title}
                </div>
                <div className="text-orange-100 text-sm">
                  {criticalInstruction.contextRef}
                </div>
              </div>
            </div>
            <button
              onClick={handleAcknowledgeCritical}
              className="w-full bg-white text-orange-600 font-semibold py-3 rounded-xl active:bg-orange-50 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Acknowledge
            </button>
          </div>
        )}
        
        {/* STATE 1: NO ASSIGNMENT (WAITING) */}
        {currentState === 'no-assignment' && (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              No assignment yet
            </h1>
            <p className="text-gray-600 text-lg">
              You'll be notified when work is assigned
            </p>
          </div>
        )}

        {/* STATE 2: ASSIGNMENT RECEIVED (READY) */}
        {currentState === 'assignment-received' && (
          <div className="w-full">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 text-center">
              <div className="text-gray-600 text-sm mb-2">Assignment</div>
              <div className="text-3xl font-semibold text-gray-900 mb-4">
                {assignmentData.routeId}
              </div>
              <div className="text-gray-600 text-lg">
                {assignmentData.totalStops} stops
              </div>
            </div>

            <button 
              onClick={() => setCurrentState('en-route')}
              className="w-full bg-blue-600 text-white text-xl font-semibold py-5 rounded-2xl active:bg-blue-700 transition-colors"
            >
              Start Work
            </button>

            <div className="text-center text-gray-500 text-sm mt-4">
              Shift started at {assignmentData.shiftStart}
            </div>
          </div>
        )}

        {/* STATE 3: EN ROUTE (NAVIGATION FOCUS) */}
        {currentState === 'en-route' && (
          <div className="w-full">
            <div className="mb-2 text-center">
              <div className="text-gray-600 text-sm mb-1">Next Stop</div>
              <div className="text-blue-600 text-sm font-medium">Stop {currentStopData.stopNumber} of {assignmentData.totalStops}</div>
            </div>

            {/* Embedded Navigation Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4">
              {/* Static Map Preview */}
              <div className="relative bg-gray-100 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                    2.3 miles away
                  </div>
                </div>
              </div>

              {/* Destination Info */}
              <div className="p-5">
                <div className="text-sm text-gray-500 mb-1">Destination</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {currentStopData.address}
                </div>
                <div className="text-gray-600">
                  Customer: {currentStopData.customerName}
                </div>
              </div>
            </div>

            {/* Navigation Actions */}
            <button 
              onClick={() => {
                // Handoff to external navigation app
                const address = encodeURIComponent(currentStopData.address);
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                
                if (isMobile) {
                  // Try to open native maps app
                  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
                  window.open(mapsUrl, '_blank');
                } else {
                  // Desktop fallback
                  window.open(`https://www.google.com/maps/search/${address}`, '_blank');
                }
              }}
              className="w-full bg-blue-600 text-white text-xl font-semibold py-5 rounded-2xl active:bg-blue-700 transition-colors mb-3 flex items-center justify-center gap-3"
            >
              <Navigation className="w-6 h-6" />
              Navigate
            </button>

            <button 
              onClick={() => setCurrentState('at-stop')}
              className="w-full bg-white border-2 border-gray-300 text-gray-900 text-lg font-medium py-4 rounded-2xl active:bg-gray-50 transition-colors"
            >
              I've Arrived
            </button>

            <div className="text-center text-xs text-gray-500 mt-4">
              Tap Navigate to open in maps app
            </div>
          </div>
        )}

        {/* STATE 4: AT STOP (EXECUTION FOCUS) */}
        {currentState === 'at-stop' && (
          <div className="w-full">
            <div className="mb-2 text-center">
              <div className="text-gray-600 text-sm mb-1">Stop {currentStopData.stopNumber} of {assignmentData.totalStops}</div>
              <div className="text-green-600 text-sm font-medium">At Location</div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="text-2xl font-semibold text-gray-900 mb-3">
                {currentStopData.address}
              </div>
              <div className="text-gray-600 mb-4">
                Customer: {currentStopData.customerName}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-sm text-blue-900 font-medium mb-1">Instructions</div>
                <div className="text-blue-800">
                  {currentStopData.instructions}
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                // Launch the full execution flow
                setCurrentState('executing-stop');
              }}
              className="w-full bg-green-600 text-white text-xl font-semibold py-5 rounded-2xl active:bg-green-700 transition-colors mb-4 flex items-center justify-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              Complete Stop
            </button>

            <button 
              onClick={() => {
                // Launch execution flow in issue mode
                setCurrentState('executing-stop');
              }}
              className="w-full bg-white border-2 border-gray-300 text-gray-900 text-lg font-medium py-4 rounded-2xl active:bg-gray-50 transition-colors"
            >
              Report Issue
            </button>
          </div>
        )}

        {/* STATE 5: ISSUE REPORTED (BLOCKED) */}
        {currentState === 'issue-reported' && (
          <div className="w-full text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-orange-600" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              Issue reported
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Awaiting instructions
            </p>

            <button 
              onClick={() => {
                alert('Viewing issue details (read-only)');
              }}
              className="w-full bg-white border-2 border-gray-300 text-gray-900 text-lg font-medium py-4 rounded-2xl active:bg-gray-50 transition-colors"
            >
              View Issue Details
            </button>
          </div>
        )}

        {/* STATE 6: ALL STOPS COMPLETED */}
        {currentState === 'completed' && (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              All work completed
            </h1>
            <p className="text-gray-600 text-lg">
              You're done for this shift
            </p>
          </div>
        )}

      </div>
    </div>
  );
}