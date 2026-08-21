/**
 * OptiMile Design System Showcase
 * Visual reference for standardized components
 */

import { Button } from './ui/Button';
import { StatusBadge } from './ui/StatusBadge';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import { Input, Textarea } from './ui/Input';
import { Alert } from './ui/Alert';
import { CheckCircle, AlertTriangle, AlertCircle, Settings, Mail, ArrowRight } from 'lucide-react';

export function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            OptiMile Design System
          </h1>
          <p className="text-gray-600">
            Unified components across all roles • Same system, different responsibility
          </p>
        </div>

        {/* Typography Scale */}
        <Card>
          <CardHeader title="Typography Scale" subtitle="Consistent hierarchy across all roles" />
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">Page Title (text-2xl)</p>
                <h1 className="text-2xl font-medium text-gray-900">The quick brown fox jumps</h1>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Section Header (text-xl)</p>
                <h2 className="text-xl font-medium text-gray-900">The quick brown fox jumps</h2>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Card Title (text-lg)</p>
                <h3 className="text-lg font-medium text-gray-900">The quick brown fox jumps</h3>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Body Text (text-base)</p>
                <p className="text-base text-gray-900">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Label (text-sm)</p>
                <p className="text-sm font-medium text-gray-900">The quick brown fox jumps</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Metadata (text-xs)</p>
                <p className="text-xs text-gray-600">The quick brown fox jumps over the lazy dog</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Semantic Colors */}
        <Card>
          <CardHeader 
            title="Semantic Color System" 
            subtitle="Colors have consistent meaning across all roles and modules"
          />
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <div className="bg-green-500 h-24 rounded-lg"></div>
                <p className="font-medium text-gray-900">Success / Green</p>
                <p className="text-sm text-gray-600">Completed, Protected, On Track</p>
              </div>
              <div className="space-y-2">
                <div className="bg-amber-500 h-24 rounded-lg"></div>
                <p className="font-medium text-gray-900">Warning / Amber</p>
                <p className="text-sm text-gray-600">Risk, Attention Needed</p>
              </div>
              <div className="space-y-2">
                <div className="bg-red-500 h-24 rounded-lg"></div>
                <p className="font-medium text-gray-900">Critical / Red</p>
                <p className="text-sm text-gray-600">Breach, Blocking, Failure</p>
              </div>
              <div className="space-y-2">
                <div className="bg-blue-500 h-24 rounded-lg"></div>
                <p className="font-medium text-gray-900">Primary / Blue</p>
                <p className="text-sm text-gray-600">Actions, Neutral Info</p>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-400 h-24 rounded-lg"></div>
                <p className="font-medium text-gray-900">Disabled / Gray</p>
                <p className="text-sm text-gray-600">Read-only, Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader title="Button Variants" subtitle="Standard interaction patterns" />
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Primary Actions</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
                    With Icon
                  </Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Secondary Actions</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="secondary" icon={<Settings className="w-5 h-5" />}>
                    With Icon
                  </Button>
                  <Button variant="secondary" disabled>Disabled</Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Destructive Actions</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="destructive">Delete</Button>
                  <Button variant="destructive" disabled>Disabled</Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Ghost Actions</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="ghost" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Badges */}
        <Card>
          <CardHeader title="Status Badges" subtitle="Semantic status indicators" />
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <StatusBadge variant="success" icon={<CheckCircle className="w-3.5 h-3.5" />}>
                Completed
              </StatusBadge>
              <StatusBadge variant="warning" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
                At Risk
              </StatusBadge>
              <StatusBadge variant="critical" icon={<AlertCircle className="w-3.5 h-3.5" />}>
                Blocked
              </StatusBadge>
              <StatusBadge variant="info">In Progress</StatusBadge>
              <StatusBadge variant="neutral">Read Only</StatusBadge>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader title="Alert Components" subtitle="Contextual messaging" />
          <CardContent>
            <div className="space-y-4">
              <Alert variant="success" title="Success">
                Operation completed successfully. All systems are protected.
              </Alert>
              <Alert variant="warning" title="Warning">
                This action requires attention. Review before proceeding.
              </Alert>
              <Alert variant="critical" title="Critical">
                SLA breach detected. Immediate action required.
              </Alert>
              <Alert variant="info" title="Information">
                New updates are available for review.
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Form Inputs */}
        <Card>
          <CardHeader title="Form Inputs" subtitle="Standard input controls" />
          <CardContent>
            <div className="space-y-6 max-w-2xl">
              <Input 
                label="Email Address"
                type="email"
                placeholder="user@company.com"
                icon={<Mail className="w-5 h-5" />}
                helperText="We'll never share your email"
              />
              
              <Input 
                label="Error State"
                type="text"
                placeholder="Enter value"
                error="This field is required"
              />
              
              <Input 
                label="Disabled Input"
                type="text"
                placeholder="Cannot edit"
                disabled
              />
              
              <Textarea 
                label="Description"
                placeholder="Enter detailed information..."
                helperText="Maximum 500 characters"
              />
            </div>
          </CardContent>
        </Card>

        {/* Card Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="standard">
            <CardHeader title="Standard Card" />
            <CardContent>
              <p className="text-gray-600">Default card style with shadow and border.</p>
            </CardContent>
          </Card>
          
          <Card variant="interactive">
            <CardHeader title="Interactive Card" />
            <CardContent>
              <p className="text-gray-600">Hover to see shadow increase. Used for clickable items.</p>
            </CardContent>
          </Card>
          
          <Card variant="compact">
            <CardHeader title="Compact Card" />
            <CardContent>
              <p className="text-gray-600">Reduced padding for dense layouts.</p>
            </CardContent>
          </Card>
        </div>

        {/* Design Principles */}
        <Card>
          <CardHeader title="Design Principles" />
          <CardContent>
            <div className="space-y-4">
              <Alert variant="info">
                <strong className="block mb-2">Same System, Different Responsibility</strong>
                <p className="mb-3">Users switching between roles should feel they're in the same product with different access levels.</p>
                
                <div className="space-y-2 text-sm">
                  <p><strong>✅ Roles MAY differ by:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Visible modules (permissions)</li>
                    <li>Enabled actions (authorization)</li>
                    <li>Data scope (access control)</li>
                    <li>Read-only vs editable state</li>
                  </ul>
                  
                  <p className="mt-3"><strong>❌ Roles MUST NOT differ by:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Fonts or typography</li>
                    <li>Color meanings (green always means success)</li>
                    <li>Layout structure (sidebar position)</li>
                    <li>Navigation placement</li>
                    <li>Interaction behavior (button states)</li>
                  </ul>
                </div>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
