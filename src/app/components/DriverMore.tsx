import { useState } from 'react';
import { User, ChevronRight, Bell, HelpCircle, LogOut } from 'lucide-react';
import { DriverProfile } from './DriverProfile';
import { DriverNotifications } from './DriverNotifications';

interface DriverMoreProps {
  onNavigate?: (screen: string) => void;
}

type MoreScreen = 'menu' | 'profile' | 'notifications';

export function DriverMore({ onNavigate }: DriverMoreProps) {
  const [currentScreen, setCurrentScreen] = useState<MoreScreen>('menu');

  if (currentScreen === 'profile') {
    return (
      <div className="h-full">
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button 
            onClick={() => setCurrentScreen('menu')}
            className="text-blue-600 text-sm font-medium"
          >
            ← Back
          </button>
        </div>
        <DriverProfile />
      </div>
    );
  }

  if (currentScreen === 'notifications') {
    return (
      <div className="h-full">
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button 
            onClick={() => setCurrentScreen('menu')}
            className="text-blue-600 text-sm font-medium"
          >
            ← Back
          </button>
        </div>
        <DriverNotifications 
          onReportIssue={(notificationId, context) => {
            // In production, this would navigate to Issue Reporting
            // with pre-filled context
            alert(`Redirecting to Issue Reporting\n\nContext:\n${JSON.stringify(context, null, 2)}`);
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">More</h1>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-2">
        {/* Profile */}
        <button
          onClick={() => setCurrentScreen('profile')}
          className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 active:bg-gray-50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-gray-900">Profile & Shift</div>
            <div className="text-sm text-gray-500">View your details</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Notifications */}
        <button
          onClick={() => setCurrentScreen('notifications')}
          className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 active:bg-gray-50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <Bell className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-gray-900">Notifications</div>
            <div className="text-sm text-gray-500">View alerts & updates</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Help */}
        <button
          onClick={() => alert('Help & Support - Coming Soon')}
          className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 active:bg-gray-50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-gray-900">Help & Support</div>
            <div className="text-sm text-gray-500">Get assistance</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Logout Button */}
      <div className="p-4 mt-4">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to log out?')) {
              window.location.reload();
            }
          }}
          className="w-full bg-white border-2 border-red-200 text-red-600 rounded-2xl p-4 flex items-center justify-center gap-3 active:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Log Out</span>
        </button>
      </div>
    </div>
  );
}