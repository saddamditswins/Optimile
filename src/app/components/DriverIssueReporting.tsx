import { useState } from 'react';
import { Camera, AlertCircle, MapPin, Truck, ShieldAlert, DoorClosed } from 'lucide-react';

type ReportingStep = 'category-selection' | 'evidence-capture' | 'submitted';

type IssueCategory = 
  | 'customer-unavailable'
  | 'access-blocked'
  | 'address-incorrect'
  | 'vehicle-issue'
  | 'safety-concern';

interface IssueCategoryConfig {
  id: IssueCategory;
  label: string;
  description: string;
  icon: any;
  color: string;
  evidenceRequired: boolean;
  evidenceLabel: string;
  evidenceWaivable?: boolean;
}

const issueCategories: IssueCategoryConfig[] = [
  {
    id: 'customer-unavailable',
    label: 'Customer Unavailable',
    description: 'Customer not present or no response',
    icon: DoorClosed,
    color: 'orange',
    evidenceRequired: true,
    evidenceLabel: 'Photo of location or door'
  },
  {
    id: 'access-blocked',
    label: 'Access Blocked',
    description: 'Gate, security, or entry denial',
    icon: AlertCircle,
    color: 'red',
    evidenceRequired: true,
    evidenceLabel: 'Photo of blocked access'
  },
  {
    id: 'address-incorrect',
    label: 'Address Incorrect',
    description: 'Location does not exist or wrong pin',
    icon: MapPin,
    color: 'purple',
    evidenceRequired: true,
    evidenceLabel: 'Photo of surroundings'
  },
  {
    id: 'vehicle-issue',
    label: 'Vehicle Issue',
    description: 'Breakdown, flat tire, or mechanical failure',
    icon: Truck,
    color: 'yellow',
    evidenceRequired: true,
    evidenceLabel: 'Photo of vehicle issue'
  },
  {
    id: 'safety-concern',
    label: 'Safety Concern',
    description: 'Unsafe area or threatening situation',
    icon: ShieldAlert,
    color: 'red',
    evidenceRequired: false,
    evidenceLabel: 'Photo (if safe to do so)',
    evidenceWaivable: true
  }
];

export function DriverIssueReporting() {
  const [currentStep, setCurrentStep] = useState<ReportingStep>('category-selection');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | null>(null);
  const [evidenceCaptured, setEvidenceCaptured] = useState(false);
  const [evidenceWaived, setEvidenceWaived] = useState(false);
  const [issueNote, setIssueNote] = useState('');

  const categoryConfig = selectedCategory 
    ? issueCategories.find(c => c.id === selectedCategory)
    : null;

  // STEP 1: CATEGORY SELECTION
  if (currentStep === 'category-selection') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Report Issue</h1>
          <p className="text-gray-600 text-sm mt-1">Select the issue category</p>
        </div>

        {/* Category Cards */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {issueCategories.map((category) => {
            const Icon = category.icon;
            const colorClasses = {
              orange: 'bg-orange-100 text-orange-600 border-orange-200',
              red: 'bg-red-100 text-red-600 border-red-200',
              purple: 'bg-purple-100 text-purple-600 border-purple-200',
              yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200'
            };

            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentStep('evidence-capture');
                }}
                className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 active:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 text-lg mb-1">
                      {category.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {category.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // STEP 2: EVIDENCE CAPTURE
  if (currentStep === 'evidence-capture' && categoryConfig) {
    const Icon = categoryConfig.icon;
    const canSubmit = !categoryConfig.evidenceRequired || evidenceCaptured || evidenceWaived;

    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <button 
            onClick={() => {
              setCurrentStep('category-selection');
              setSelectedCategory(null);
              setEvidenceCaptured(false);
              setEvidenceWaived(false);
              setIssueNote('');
            }}
            className="text-blue-600 text-sm font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 max-w-md mx-auto w-full">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Report an issue
          </h1>

          {/* Selected Category Display */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-6">
            <div className="text-sm text-gray-500 mb-2">Issue Category</div>
            <div className="flex items-center gap-3">
              <Icon className="w-6 h-6 text-gray-700" />
              <div className="font-semibold text-gray-900 text-lg">
                {categoryConfig.label}
              </div>
            </div>
          </div>

          {/* Evidence Capture Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {categoryConfig.evidenceRequired ? 'Required Evidence' : 'Evidence (Optional)'}
                </div>
                <div className="text-sm text-gray-600">
                  {categoryConfig.evidenceLabel}
                </div>
              </div>
              {categoryConfig.evidenceRequired && !evidenceWaived && (
                <div className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded">
                  Required
                </div>
              )}
            </div>

            <button
              onClick={() => {
                // Simulate camera capture
                alert('Opening camera...');
                setEvidenceCaptured(true);
              }}
              className={`w-full p-6 rounded-2xl border-2 transition-all ${
                evidenceCaptured
                  ? 'border-green-500 bg-green-50'
                  : 'border-dashed border-gray-300 bg-gray-50 active:bg-gray-100'
              }`}
            >
              <Camera className={`w-12 h-12 mx-auto mb-3 ${evidenceCaptured ? 'text-green-600' : 'text-gray-400'}`} />
              <div className={`text-sm font-medium ${evidenceCaptured ? 'text-green-700' : 'text-gray-600'}`}>
                {evidenceCaptured ? '✓ Photo Captured' : 'Tap to Capture Photo'}
              </div>
            </button>

            {/* Safety Concern Waiver Option */}
            {categoryConfig.evidenceWaivable && !evidenceCaptured && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={evidenceWaived}
                    onChange={(e) => setEvidenceWaived(e.target.checked)}
                    className="mt-1 w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Unsafe to capture photo
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Check this if it's not safe to take a photo
                    </div>
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Optional Note */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Additional note (optional)
            </label>
            <textarea
              value={issueNote}
              onChange={(e) => setIssueNote(e.target.value)}
              placeholder="Add a short note..."
              maxLength={100}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {issueNote.length}/100
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={() => {
              if (canSubmit) {
                // Timestamp and submit issue
                setCurrentStep('submitted');
              }
            }}
            disabled={!canSubmit}
            className={`w-full text-xl font-semibold py-5 rounded-2xl transition-colors ${
              canSubmit
                ? 'bg-orange-600 text-white active:bg-orange-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Issue
          </button>

          {!canSubmit && (
            <div className="text-center text-sm text-gray-600 mt-3">
              Photo evidence required to submit
            </div>
          )}

          {/* Vehicle Issue Warning */}
          {categoryConfig.id === 'vehicle-issue' && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <div className="text-sm text-yellow-900">
                <strong>Note:</strong> Vehicle issues may affect multiple stops. You will not be able to proceed after submission.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // STEP 3: SUBMITTED (LOCKED STATE)
  if (currentStep === 'submitted' && categoryConfig) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-orange-600" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
            Issue submitted
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
              {categoryConfig.label}
            </div>
            
            {issueNote && (
              <>
                <div className="text-sm text-gray-500 mb-2">Note</div>
                <div className="text-gray-700 mb-4">
                  {issueNote}
                </div>
              </>
            )}

            <div className="text-sm text-gray-500 mb-2">Evidence</div>
            <div className="text-gray-700">
              {evidenceCaptured && '✓ Photo attached'}
              {evidenceWaived && '⚠️ Photo waived (safety)'}
              {!evidenceCaptured && !evidenceWaived && 'No evidence required'}
            </div>
          </div>

          <button 
            onClick={() => {
              // Reset form
              setCurrentStep('category-selection');
              setSelectedCategory(null);
              setEvidenceCaptured(false);
              setEvidenceWaived(false);
              setIssueNote('');
            }}
            className="w-full bg-blue-600 text-white text-xl font-semibold py-5 rounded-2xl active:bg-blue-700 transition-colors"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return null;
}