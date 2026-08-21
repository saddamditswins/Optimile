import { useState } from 'react';
import { AlertCircle, CheckCircle, Info, WifiOff, Clock } from 'lucide-react';

type NotificationType = 'execution-instruction' | 'status-update' | 'system-alert';
type NotificationStatus = 'pending' | 'acknowledged' | 'blocked';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  source: 'Dispatch' | 'System';
  timestamp: string;
  contextReference?: string;
  status: NotificationStatus;
  acknowledgedAt?: string;
  requiresAcknowledgment: boolean;
}

interface DriverNotificationsProps {
  onReportIssue?: (notificationId: string, context: any) => void;
}

export function DriverNotifications({ onReportIssue }: DriverNotificationsProps) {
  // Mock notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'N-001',
      type: 'execution-instruction',
      title: 'Proceed directly to next stop',
      source: 'Dispatch',
      timestamp: '10:15 AM',
      contextReference: 'Stop #3',
      status: 'pending',
      requiresAcknowledgment: true
    },
    {
      id: 'N-002',
      type: 'execution-instruction',
      title: 'Hold at current location',
      source: 'Dispatch',
      timestamp: '9:45 AM',
      contextReference: 'Route RT-2847',
      status: 'acknowledged',
      acknowledgedAt: '9:46 AM',
      requiresAcknowledgment: true
    },
    {
      id: 'N-003',
      type: 'status-update',
      title: 'Route updated',
      source: 'System',
      timestamp: '9:30 AM',
      contextReference: 'Route RT-2847',
      status: 'acknowledged',
      requiresAcknowledgment: false
    },
    {
      id: 'N-004',
      type: 'status-update',
      title: 'Shift ending in 30 minutes',
      source: 'System',
      timestamp: '9:00 AM',
      status: 'acknowledged',
      requiresAcknowledgment: false
    },
    {
      id: 'N-005',
      type: 'system-alert',
      title: 'GPS signal restored',
      source: 'System',
      timestamp: '8:45 AM',
      status: 'acknowledged',
      requiresAcknowledgment: false
    }
  ]);

  const handleAcknowledge = (notificationId: string) => {
    const now = new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId 
          ? { ...n, status: 'acknowledged' as NotificationStatus, acknowledgedAt: now }
          : n
      )
    );
  };

  const handleReportIssue = (notification: Notification) => {
    // Mark as blocked
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id 
          ? { ...n, status: 'blocked' as NotificationStatus }
          : n
      )
    );

    // Redirect to issue reporting with pre-filled context
    if (onReportIssue) {
      onReportIssue(notification.id, {
        instructionId: notification.id,
        contextReference: notification.contextReference,
        instructionTitle: notification.title
      });
    } else {
      alert(`Issue reporting would open with context:\nInstruction: ${notification.title}\nReference: ${notification.contextReference}`);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'execution-instruction':
        return AlertCircle;
      case 'status-update':
        return Info;
      case 'system-alert':
        return WifiOff;
    }
  };

  const getNotificationColor = (type: NotificationType, status: NotificationStatus) => {
    if (status === 'blocked') {
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'bg-red-100 text-red-600',
        badge: 'bg-red-100 text-red-700'
      };
    }

    if (status === 'acknowledged') {
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        icon: 'bg-gray-100 text-gray-500',
        badge: 'bg-gray-100 text-gray-600'
      };
    }

    switch (type) {
      case 'execution-instruction':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: 'bg-orange-100 text-orange-600',
          badge: 'bg-orange-100 text-orange-700'
        };
      case 'status-update':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'bg-blue-100 text-blue-600',
          badge: 'bg-blue-100 text-blue-700'
        };
      case 'system-alert':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          icon: 'bg-gray-100 text-gray-600',
          badge: 'bg-gray-100 text-gray-700'
        };
    }
  };

  const pendingNotifications = notifications.filter(n => n.status === 'pending');
  const acknowledgedNotifications = notifications.filter(n => n.status === 'acknowledged' || n.status === 'blocked');

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        {pendingNotifications.length > 0 && (
          <p className="text-sm text-orange-600 mt-1">
            {pendingNotifications.length} instruction{pendingNotifications.length !== 1 ? 's' : ''} need{pendingNotifications.length === 1 ? 's' : ''} acknowledgment
          </p>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        
        {/* Pending Instructions (Top Priority) */}
        {pendingNotifications.length > 0 && (
          <div className="mb-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
              Action Required
            </div>
            {pendingNotifications.map(notification => {
              const Icon = getNotificationIcon(notification.type);
              const colors = getNotificationColor(notification.type, notification.status);

              return (
                <div 
                  key={notification.id}
                  className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-5 mb-3`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-lg mb-1">
                        {notification.title}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{notification.source}</span>
                        <span>•</span>
                        <span>{notification.timestamp}</span>
                      </div>
                      {notification.contextReference && (
                        <div className="text-xs text-gray-500 mt-1">
                          {notification.contextReference}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAcknowledge(notification.id)}
                      className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl active:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Acknowledge
                    </button>
                    <button
                      onClick={() => handleReportIssue(notification)}
                      className="w-full bg-white border-2 border-gray-300 text-gray-900 font-medium py-3 rounded-xl active:bg-gray-50 transition-colors"
                    >
                      Report Issue
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Acknowledged / Past Notifications */}
        {acknowledgedNotifications.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
              Past Notifications
            </div>
            {acknowledgedNotifications.map(notification => {
              const Icon = getNotificationIcon(notification.type);
              const colors = getNotificationColor(notification.type, notification.status);

              return (
                <div 
                  key={notification.id}
                  className={`${colors.bg} border ${colors.border} rounded-2xl p-4 mb-2`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">
                        {notification.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{notification.source}</span>
                        <span>•</span>
                        <span>{notification.timestamp}</span>
                      </div>
                      {notification.contextReference && (
                        <div className="text-xs text-gray-500 mt-1">
                          {notification.contextReference}
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      {notification.status === 'acknowledged' && notification.acknowledgedAt && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                          <CheckCircle className="w-3 h-3" />
                          Acknowledged at {notification.acknowledgedAt}
                        </div>
                      )}
                      {notification.status === 'blocked' && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs text-red-700 bg-red-100 px-2 py-1 rounded">
                          <AlertCircle className="w-3 h-3" />
                          Blocked — Issue Raised
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Info className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
