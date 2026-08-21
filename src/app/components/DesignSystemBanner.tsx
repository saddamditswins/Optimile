/**
 * OptiMile Design System Banner
 * Quick reference for standardization rules
 */

import { Info } from 'lucide-react';

export function DesignSystemBanner() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-blue-900 font-semibold mb-2">
            OptiMile Design System - Global Standardization
          </h4>
          <div className="text-blue-800 text-sm space-y-1">
            <p>
              <strong>Core Principle:</strong> "Same system, different responsibility"
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Typography:</strong> One font family, consistent hierarchy</li>
              <li><strong>Colors:</strong> Green=Success, Amber=Warning, Red=Critical, Blue=Primary, Gray=Disabled</li>
              <li><strong>Layout:</strong> Left sidebar (256px), unified card grid, 8px spacing</li>
              <li><strong>Buttons:</strong> Primary (blue), Secondary (outlined), Destructive (red)</li>
              <li><strong>Roles differ by:</strong> Permissions, data scope, actions - NOT design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
