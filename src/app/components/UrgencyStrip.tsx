import { Clock, AlertTriangle } from 'lucide-react';

interface UrgentDelivery {
  id: string;
  entityId: string;
  timeRemaining: number; // minutes
  severity: 'critical' | 'high' | 'medium';
}

interface UrgencyStripProps {
  deliveries: UrgentDelivery[];
}

export function UrgencyStrip({ deliveries }: UrgencyStripProps) {
  const formatTimeRemaining = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getSeverityStyles = (severity: 'critical' | 'high' | 'medium') => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-100',
          border: 'border-red-300',
          text: 'text-red-700',
          indicator: 'bg-red-500'
        };
      case 'high':
        return {
          bg: 'bg-amber-100',
          border: 'border-amber-300',
          text: 'text-amber-700',
          indicator: 'bg-amber-500'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-100',
          border: 'border-yellow-300',
          text: 'text-yellow-700',
          indicator: 'bg-yellow-500'
        };
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-red-500 px-6 py-3 flex items-center gap-2 text-white">
        <AlertTriangle className="w-5 h-5" />
        <h3 className="text-sm">SLA Urgency Watch</h3>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
          {deliveries.length} approaching breach
        </span>
      </div>

      <div className="p-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {deliveries.map((delivery) => {
            const styles = getSeverityStyles(delivery.severity);
            return (
              <button
                key={delivery.id}
                className={`${styles.bg} ${styles.border} border rounded-lg px-4 py-3 min-w-[160px] hover:shadow-md transition-all duration-200 flex-shrink-0`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`${styles.text} text-sm`}>
                    {delivery.entityId}
                  </span>
                  <div className={`${styles.indicator} w-2 h-2 rounded-full`} />
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className={`w-4 h-4 ${styles.text}`} />
                  <span className={`${styles.text} text-xs`}>
                    {formatTimeRemaining(delivery.timeRemaining)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}