import { useState } from 'react';
import { CheckCircle, Camera, FileSignature, AlertCircle, MapPin } from 'lucide-react';

type ExecutionStep = 
  | 'arrival-confirmation'
  | 'delivery-action'
  | 'delivery-completed'
  | 'issue-selection'
  | 'issue-submitted';

interface DriverStopExecutionProps {
  stopData: {
    stopNumber: number;
    totalStops: number;
    address: string;
    customerName: string;
    instructions: string;
  };
  onComplete: () => void;
  onIssueReported: () => void;
}

export function DriverStopExecution({ stopData, onComplete, onIssueReported }: DriverStopExecutionProps) {
  const [currentStep, setCurrentStep] = useState<ExecutionStep>('arrival-confirmation');
  const [proofCaptured, setProofCaptured] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [issueNote, setIssueNote] = useState('');

  const issueOptions = [
    'Customer unavailable',
    'Access blocked',
    'Address incorrect',
    'Vehicle issue',
    'Safety concern'
  ];

  // STEP 1: ARRIVAL CONFIRMATION
  if (currentStep === 'arrival-confirmation') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
            Arrived at stop
          </h1>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 w-full text-center">
            <div className="text-gray-600 text-sm mb-2">Stop {stopData.stopNumber} of {stopData.totalStops}</div>
            <div className="text-2xl font-semibold text-gray-900 mb-2">
              {stopData.address}
            </div>
            <div className="text-gray-600">
              {stopData.customerName}
            </div>
          </div>

          <button 
            onClick={() => {
              // Timestamp arrival
              setCurrentStep('delivery-action');
            }}
            className="w-full bg-blue-600 text-white text-xl font-semibold py-5 rounded-2xl active:bg-blue-700 transition-colors"
          >
            Confirm Arrival
          </button>
        </div>
      </div>
    );
  }

  // STEP 2: DELIVERY ACTION (HAPPY PATH)
  if (currentStep === 'delivery-action') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-md mx-auto w-full">
            <div className="text-center mb-6">
              <div className="text-gray-600 text-sm mb-2">Stop {stopData.stopNumber} of {stopData.totalStops}</div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Deliver package
              </h1>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
              <div className="text-sm text-gray-500 mb-1">Customer</div>
              <div className="text-xl font-semibold text-gray-900 mb-4">
                {stopData.customerName}
              </div>
              <div className="text-sm text-gray-500 mb-1">Address</div>
              <div className="text-gray-900">
                {stopData.address}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <div className="text-sm text-blue-900 font-medium mb-2">Instructions</div>
              <div className="text-blue-800">
                {stopData.instructions}
              </div>
            </div>

            {/* Proof Capture */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="text-sm font-medium text-gray-900 mb-4">Required Proof</div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => {
                    // Simulate signature capture
                    alert('Opening signature pad...');
                    setProofCaptured(true);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    proofCaptured 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 bg-white active:bg-gray-50'
                  }`}
                >
                  <FileSignature className={`w-8 h-8 mx-auto mb-2 ${proofCaptured ? 'text-green-600' : 'text-gray-600'}`} />
                  <div className="text-sm font-medium text-gray-900">Signature</div>
                  {proofCaptured && (
                    <div className="text-xs text-green-600 mt-1">✓ Captured</div>
                  )}
                </button>

                <button
                  onClick={() => {
                    // Simulate photo capture
                    alert('Opening camera...');
                    setProofCaptured(true);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    proofCaptured 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 bg-white active:bg-gray-50'
                  }`}
                >
                  <Camera className={`w-8 h-8 mx-auto mb-2 ${proofCaptured ? 'text-green-600' : 'text-gray-600'}`} />
                  <div className="text-sm font-medium text-gray-900">Photo</div>
                  {proofCaptured && (
                    <div className="text-xs text-green-600 mt-1">✓ Captured</div>
                  )}
                </button>
              </div>

              {!proofCaptured && (
                <div className="text-xs text-gray-500 text-center">
                  Capture signature or photo to continue
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  if (proofCaptured) {
                    // Timestamp completion
                    setCurrentStep('delivery-completed');
                  }
                }}
                disabled={!proofCaptured}
                className={`w-full text-xl font-semibold py-5 rounded-2xl transition-colors flex items-center justify-center gap-3 ${
                  proofCaptured
                    ? 'bg-green-600 text-white active:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="w-6 h-6" />
                Complete Delivery
              </button>

              <button 
                onClick={() => setCurrentStep('issue-selection')}
                className="w-full bg-white border-2 border-gray-300 text-gray-900 text-lg font-medium py-4 rounded-2xl active:bg-gray-50 transition-colors"
              >
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: DELIVERY COMPLETED (HAPPY PATH)
  if (currentStep === 'delivery-completed') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
            Delivery completed
          </h1>
          
          <p className="text-gray-600 text-lg mb-2 text-center">
            Stop successfully completed
          </p>
          
          <p className="text-gray-500 text-center mb-8">
            Proceed to next stop
          </p>

          <button 
            onClick={() => {
              // Return to Today's Work (en-route state)
              onComplete();
            }}
            className="w-full bg-blue-600 text-white text-xl font-semibold py-5 rounded-2xl active:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // STEP 2A: ISSUE SELECTION (ISSUE PATH)
  if (currentStep === 'issue-selection') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-md mx-auto w-full">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Report an issue
              </h1>
              <p className="text-gray-600">
                Select the reason you cannot complete this delivery
              </p>
            </div>

            {/* Issue Options */}
            <div className="space-y-3 mb-6">
              {issueOptions.map((issue) => (
                <button
                  key={issue}
                  onClick={() => setSelectedIssue(issue)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedIssue === issue
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 bg-white active:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedIssue === issue
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedIssue === issue && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{issue}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Optional Note */}
            {selectedIssue && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional note (optional)
                </label>
                <textarea
                  value={issueNote}
                  onChange={(e) => setIssueNote(e.target.value)}
                  placeholder="Add brief details..."
                  maxLength={100}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {issueNote.length}/100
                </div>
              </div>
            )}

            {/* Optional Photo */}
            {selectedIssue && (
              <div className="mb-6">
                <button
                  onClick={() => alert('Opening camera...')}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl bg-white active:bg-gray-50 transition-colors"
                >
                  <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-600">Add photo (optional)</div>
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  if (selectedIssue) {
                    // Submit issue with timestamp
                    setCurrentStep('issue-submitted');
                  }
                }}
                disabled={!selectedIssue}
                className={`w-full text-xl font-semibold py-5 rounded-2xl transition-colors ${
                  selectedIssue
                    ? 'bg-orange-600 text-white active:bg-orange-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Issue
              </button>

              <button 
                onClick={() => setCurrentStep('delivery-action')}
                className="w-full bg-white border-2 border-gray-300 text-gray-900 text-lg font-medium py-4 rounded-2xl active:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3A: ISSUE SUBMITTED (BLOCKED STATE)
  if (currentStep === 'issue-submitted') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-orange-600" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
            Issue reported
          </h1>
          
          <p className="text-gray-600 text-lg mb-2 text-center">
            We've received the issue
          </p>
          
          <p className="text-gray-500 text-center mb-8">
            Please wait for further instructions
          </p>

          {/* Read-only Issue Details */}
          <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="text-sm text-gray-500 mb-2">Issue Type</div>
            <div className="font-semibold text-gray-900 mb-4">
              {selectedIssue}
            </div>
            
            {issueNote && (
              <>
                <div className="text-sm text-gray-500 mb-2">Note</div>
                <div className="text-gray-700">
                  {issueNote}
                </div>
              </>
            )}
          </div>

          <button 
            onClick={() => {
              // Return to Today's Work (issue-reported state)
              onIssueReported();
            }}
            className="w-full bg-blue-600 text-white text-xl font-semibold py-5 rounded-2xl active:bg-blue-700 transition-colors"
          >
            Back to Today's Work
          </button>
        </div>
      </div>
    );
  }

  return null;
}
