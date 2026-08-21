import { useState } from 'react';
import { Package, AlertCircle, MoreHorizontal } from 'lucide-react';
import { DriverTodaysWork } from './DriverTodaysWork';
import { DriverIssueReporting } from './DriverIssueReporting';
import { DriverProfile } from './DriverProfile';
import { DriverMore } from './DriverMore';

type DriverScreen = 'work' | 'issues' | 'more';

export function DriverMobileApp() {
  const [activeScreen, setActiveScreen] = useState<DriverScreen>('work');

  return (
    <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeScreen === 'work' && (
          <DriverTodaysWork onNavigate={(screen) => {
            if (screen === 'issues') {
              setActiveScreen('issues');
            }
          }} />
        )}
        
        {activeScreen === 'issues' && (
          <DriverIssueReporting />
        )}
        
        {activeScreen === 'more' && (
          <DriverMore onNavigate={(screen) => {
            if (screen === 'profile') {
              // DriverMore will handle showing profile internally
            }
          }} />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-3">
          {/* Work */}
          <button
            onClick={() => setActiveScreen('work')}
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeScreen === 'work'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Package className="w-6 h-6" />
            <span className="text-xs font-medium">Work</span>
          </button>

          {/* Issues */}
          <button
            onClick={() => setActiveScreen('issues')}
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeScreen === 'issues'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <AlertCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Issues</span>
          </button>

          {/* More */}
          <button
            onClick={() => setActiveScreen('more')}
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeScreen === 'more'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MoreHorizontal className="w-6 h-6" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}